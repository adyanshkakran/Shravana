import sqlite3
import click
from flask import current_app, g, Flask
from typing import Optional, Any


def get_db() -> sqlite3.Connection:
    """
    Get the database connection.

    Returns:
        sqlite3.Connection: The SQLite database connection.
    """
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE_PATH"], detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
    return g.db


def open_new_cursor_db(db_path: str) -> sqlite3.Connection:
    """
    Open a new database connection with a custom database path.

    Args:
        db_path (str): Path to the database file.

    Returns:
        sqlite3.Connection: The SQLite database connection.
    """
    db = sqlite3.connect(db_path, detect_types=sqlite3.PARSE_DECLTYPES)
    db.row_factory = sqlite3.Row
    return db


def close_db(e: Optional[Any] = None) -> None:
    """
    Close the database connection.

    Args:
        e (Optional): Error object, if any.
    """
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db() -> None:
    """
    Initialize the database by creating tables using schema.sql.
    """
    db = get_db()
    with current_app.open_resource("schema.sql") as f:
        db.executescript(f.read().decode("utf8"))


@click.command("init-db")
def init_db_command() -> None:
    """
    Clears the existing database and creates new tables
    """
    init_db()
    click.echo("Initialized the database.")


def init_app(app: Flask) -> None:
    """
    Initialize the Flask application.

    Args:
        app (Flask): The Flask application instance.
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
