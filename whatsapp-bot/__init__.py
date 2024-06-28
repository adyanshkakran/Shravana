import os
from flask import Flask
from dotenv import load_dotenv
import logging
import sys


def create_app() -> None:
    """
    Create and configure the Flask application.

    Returns:
        app: Configured Flask application.
    """

    # Create and configure the Flask app
    app = Flask(__name__, instance_relative_config=True)
    load_dotenv()
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("APP_SECRET_KEY"),
        META_ACCESS_TOKEN=os.environ.get("META_ACCESS_TOKEN"),
        META_APP_ID=os.environ.get("META_APP_ID"),
        META_APP_SECRET=os.environ.get("META_APP_SECRET"),
        RECIPIENT_WAID=os.environ.get("RECIPIENT_WAID"),
        META_VERSION=os.environ.get("META_VERSION"),
        META_PHONE_NUMBER_ID=os.environ.get("META_PHONE_NUMBER_ID"),
        META_VERIFY_TOKEN=os.environ.get("META_VERIFY_TOKEN"),
        OPENAI_API_KEY=os.environ.get("OPENAI_API_KEY"),
        OPENAI_ASSISTANT_ID=os.environ.get("OPENAI_ASSISTANT_ID"),
        DATABASE_PATH=os.path.join(app.instance_path, "server.db"),
    )

    # Configure logging settings
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        stream=sys.stdout,
    )

    # Ensure that the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Register database to the app
    from . import db

    db.init_app(app)

    # Register webhooks callback
    from .meta.webhook import webhook_blueprint

    app.register_blueprint(webhook_blueprint)

    return app
