import base64
import requests

def get_service_id_asr(language):
    # Define the mapping of language to ASR service ID
    language_to_serviceid_asr = {
        "en": "ai4bharat/whisper-medium-en--gpu--t4",
        "te" : "ai4bharat/conformer-multilingual-dravidian-gpu--t4",
        # Add more languages as needed
    }
    return language_to_serviceid_asr.get(language, "")

def speech_to_text(audio_file_path, language='en'):
    # Read audio file as binary data
    with open(audio_file_path, 'rb') as f:
        audio_data = f.read()
    
    # Convert audio data to base64
    audio_base64 = base64.b64encode(audio_data).decode('utf-8')

    # Define Bhashini API details for ASR
    bhashini_headers = {
        "userID": "77161d42ac744a418834a9cb977d8580",
        "ulcaApiKey": "25c42d1915-5e2f-4099-91fd-901ac068d511",
        "Authorization": "DveTyi8IJRxMNJdbUI0EhiE1X0yQYmoIiNLafiNLYbr4K0JCmDxFasFbOQQgkz7w",
        "User-Agent": "PostmanRuntime/7.36.1",
        "Accept": "/",
        "Content-Type": "application/json"
    }

    # Prepare request to Bhashini API for ASR
    asr_url = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"
    asr_serviceid = get_service_id_asr(language)

    asr_body = {
        "pipelineTasks": [
            {
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": language
                    },
                    "serviceId": asr_serviceid,
                    "audioFormat": "ogg",  # Adjust audio format if needed
                    "samplingRate": 16000  # Adjust sampling rate if needed
                }
            }
        ],
        "inputData": {
            "audio": [
                {
                    "audioContent": audio_base64
                }
            ]
        }
    }

    # Make request to Bhashini API for ASR
    asr_response = requests.post(asr_url, headers=bhashini_headers, json=asr_body)
    if asr_response.status_code == 200:
        # Get ASR output from response
        asr_output = asr_response.json()['pipelineResponse'][0]['output'][0]['source']
        return asr_output
    else:
        print("Error processing audio for ASR:", asr_response.status_code)
        return None

if __name__ == "__main__":
    # Example usage
    audio_file_path = "Audio_2.ogg"  # Path to the audio file
    language = "en"  # Language of the audio (English in this example)

    # Perform ASR on the audio file
    transcription = speech_to_text(audio_file_path, language)
    if transcription:
        print("Transcription:", transcription)
        # api_endpoint = "http://0.0.0.0:8000/upload_transcription/"
        # data = {"transcription": transcription}
        # response = requests.post(api_endpoint, json=data)
        # if response.status_code == 200:
        #     print("Transcription uploaded successfully.")
        # else:
        #     print("Failed to upload transcription.")
    else:
        print("ASR failed.")