from openai import OpenAI
import shelve
from dotenv import load_dotenv
import os
import time
import logging
import backoff
from typing import Optional

# Fetch OpenAI API key and Assistant ID from environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID")

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)


# Use context manager to ensure the shelf file is closed properly
def check_if_thread_exists(wa_id: str) -> Optional[str]:
    """
    Check if a thread exists for the given WhatsApp ID.

    Args:
        wa_id (str): WhatsApp ID to check.

    Returns:
        Optional[str]: The thread ID if it exists, otherwise None.
    """
    with shelve.open("threads_db") as threads_shelf:
        return threads_shelf.get(wa_id, None)


def store_thread(wa_id: str, thread_id: str) -> None:
    """
    Store the thread ID for the given WhatsApp ID.

    Args:
        wa_id (str): WhatsApp ID.
        thread_id (str): Thread ID.
    """
    with shelve.open("threads_db", writeback=True) as threads_shelf:
        threads_shelf[wa_id] = thread_id


@backoff.on_predicate(backoff.expo, max_time=60)
def thread_run_exp_backoff(thread_id: str, run_id: str) -> bool:
    """
    Check if the assistant run is completed.

    Args:
        thread_id (str): Thread ID.
        run_id (str): Run ID.

    Returns:
        bool: True if completed, False otherwise.
    """
    run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
    return run.status == "completed"

def run_assistant(thread, name: str) -> str:
    """
    Run the OpenAI assistant in a thread.

    Args:
        thread: The thread object.
        name (str): User's name.

    Returns:
        str: Generated message.
    """
    # Retrieve the Assistant
    assistant = client.beta.assistants.retrieve(OPENAI_ASSISTANT_ID)

    # Run the assistant
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id,
        # instructions=f"You are having a conversation with {name}", # Consider providing with extra-context in future maybe?
    )

    # Wait for thread run using exponential backoff
    thread_run_exp_backoff(thread.id, run.id)

    # Retrieve the Messages
    messages = client.beta.threads.messages.list(thread_id=thread.id)
    new_message = messages.data[0].content[0].text.value
    logging.info(f"Generated message: {new_message}")
    return new_message


def generate_response(message_body: str, wa_id: str, name: str) -> str:
    """
    Generate a response from the OpenAI assistant based on the user's message.

    Args:
        message_body (str): The user's message.
        wa_id (str): WhatsApp ID of the user.
        name (str): User's name.

    Returns:
        str: Generated response message.
    """
    # Check if there is already a thread_id for the wa_id
    # thread_id = check_if_thread_exists(wa_id)
    thread_id = None

    # If a thread doesn't exist, create one and store it
    if thread_id is None:
        logging.info(f"Creating new thread for {name} with wa_id {wa_id}")
        thread = client.beta.threads.create()
        store_thread(wa_id, thread.id)
        thread_id = thread.id

    # Otherwise, retrieve the existing thread
    else:
        logging.info(f"Retrieving existing thread for {name} with wa_id {wa_id}")
        thread = client.beta.threads.retrieve(thread_id)

    # Add message to thread
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=message_body,
    )

    # Run the assistant and get the new message
    new_message = run_assistant(thread, name)
    return new_message
