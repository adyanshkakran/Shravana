import logging
from flask import current_app, jsonify
import json
import requests
import tempfile
import speech_recognition as sr
from pydub import AudioSegment
import os
from ..openai.service import generate_response
import re
from typing import Tuple, Optional


def log_http_response(response: requests.Response) -> None:
    """
    Log the details of an HTTP response.

    Args:
        response (requests.Response): The HTTP response object.
    """
    logging.info(f"Status: {response.status_code}")
    logging.info(f"Content-type: {response.headers.get('content-type')}")
    logging.info(f"Body: {response.text}")


def get_json_from_text(recipient: str, text: str) -> str:
    """
    Generate a JSON payload from text. Utility function to prepare payload for send message.

    Args:
        recipient (str): Recipient ID.
        text (str): Text message.

    Returns:
        str: JSON payload.
    """
    return json.dumps(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient,
            "type": "text",
            "text": {"preview_url": False, "body": text},
        }
    )


def send_message(data: str) -> Tuple[jsonify, int]:
    """
    Send a payload message (prepped using `get_json_from_text`) using the Meta API.

    Args:
        data (str): JSON data to be sent.

    Returns:
        tuple: JSON response and HTTP status code.
    """
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {current_app.config['META_ACCESS_TOKEN']}",
    }
    url = f"https://graph.facebook.com/{current_app.config['META_VERSION']}/{current_app.config['META_PHONE_NUMBER_ID']}/messages"
    try:
        response = requests.post(
            url, data=data, headers=headers, timeout=10
        )  # 10 seconds timeout as an example
        response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
    except requests.Timeout:
        logging.error("Timeout occurred while sending message")
        return jsonify({"status": "error", "message": "Request timed out"}), 408
    except (
        requests.RequestException
    ) as e:  # This will catch any general request exception
        logging.error(f"Request failed due to: {e}")
        return jsonify({"status": "error", "message": "Failed to send message"}), 500
    else:
        # Process the response as normal
        log_http_response(response)
        return response


def process_text_for_whatsapp(text: str) -> str:
    """
    Process text message for WhatsApp formatting. Utility function to prune OpenAI response.

    Args:
        text (str): Input text.

    Returns:
        str: Processed text.
    """
    pattern = r"\【.*?\】"
    text = re.sub(pattern, "", text).strip()
    pattern = r"\*\*(.*?)\*\*"
    replacement = r"*\1*"
    whatsapp_style_text = re.sub(pattern, replacement, text)
    return whatsapp_style_text


def process_whatsapp_text_message(text: str, wa_id: str, name: str) -> None:
    """
    Given a text message, pass it to the OpenAI agent to obtain a response and send the response back to the user.

    Args:
        text (str): Text message.
        wa_id (str): WhatsApp ID.
        name (str): User name.
    """
    response = generate_response(text, wa_id, name)
    response = process_text_for_whatsapp(response)
    data = get_json_from_text(current_app.config["RECIPIENT_WAID"], response)
    send_message(data)


def translate_audio_to_english(wav_file_path: str) -> str:
    """
    Translate an audio file (given in .wav format) to English text.

    Args:
        wav_file_path (str): Path to the WAV audio file.

    Returns:
        str: Translated text.
    """
    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_file_path) as source:
        audio_data = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio_data)
    except sr.UnknownValueError:
        return "Google Speech Recognition could not understand the audio"
    except sr.RequestError as e:
        return f"Could not request results from Google Speech Recognition service; {e}"


def process_whatsapp_audio_message(body: dict, wa_id: str, name: str) -> None:
    """
    Given an audio file (in .ogg format), convert it to .wav, transcribe it and send it to `process_whatsapp_text_message` for processing and delivery.

    Args:
        body (dict): WhatsApp message body.
        wa_id (str): WhatsApp ID.
        name (str): User name.
    """
    headers = {
        "Authorization": f"Bearer {current_app.config['META_ACCESS_TOKEN']}",
    }
    # Obtain audio file download link
    media_id = body["entry"][0]["changes"][0]["value"]["messages"][0]["audio"]["id"]
    url = f"https://graph.facebook.com/{current_app.config['META_VERSION']}/{media_id}"
    media_url = requests.get(url, headers=headers).json().get("url")

    # Download audio file to local
    response = requests.get(media_url, headers=headers)
    with tempfile.NamedTemporaryFile(
        suffix=".ogg", delete=False, dir=current_app.instance_path
    ) as tmp_file:
        ogg_file_path = tmp_file.name
        tmp_file.write(response.content)

    # Convert it from ogg to wav
    ogg_audio = AudioSegment.from_file(ogg_file_path, format="ogg")
    wav_file_path = ogg_file_path[:-3] + "wav"
    ogg_audio.export(wav_file_path, format="wav")

    # Perform speech-to-text to convert the file to text
    transcribed_text = translate_audio_to_english(wav_file_path)

    # Cleanup + forward
    os.unlink(ogg_file_path)
    os.unlink(wav_file_path)
    process_whatsapp_text_message(transcribed_text, wa_id, name)


def process_whatsapp_message(body: dict) -> None:
    """
    Process incoming WhatsApp message of any type.

    Args:
        body (dict): WhatsApp message body.
    """
    wa_id = body["entry"][0]["changes"][0]["value"]["contacts"][0]["wa_id"]
    name = body["entry"][0]["changes"][0]["value"]["contacts"][0]["profile"]["name"]
    msg_type = body["entry"][0]["changes"][0]["value"]["messages"][0].get("type")

    if msg_type == "text":
        text = body["entry"][0]["changes"][0]["value"]["messages"][0]["text"]["body"]
        process_whatsapp_text_message(text, wa_id, name)
    elif msg_type == "audio":
        process_whatsapp_audio_message(body, wa_id, name)
    else:
        data = get_json_from_text(
            current_app.config["RECIPIENT_WAID"],
            "This message type is not supported by Shravana yet. Please only send us audio or text messages.",
        )
        send_message(data)


def is_valid_whatsapp_message(body: dict) -> bool:
    """
    Check if the incoming webhook event has a valid WhatsApp message structure.

    Args:
        body (dict): Webhook event body.

    Returns:
        bool: True if the message is valid, False otherwise.
    """
    return (
        body.get("object")
        and body.get("entry")
        and body["entry"][0].get("changes")
        and body["entry"][0]["changes"][0].get("value")
        and body["entry"][0]["changes"][0]["value"].get("messages")
        and body["entry"][0]["changes"][0]["value"]["messages"][0]
    )
