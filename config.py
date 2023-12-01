from dataclasses import dataclass
from dotenv import load_dotenv
import os

class ImproperlyConfigured(Exception):
    """Raises when a environment variable is missing."""

    def __init__(self, variable_name: str, *args, **kwargs):
        self.variable_name = variable_name
        self.message = f"Set the {variable_name} environment variable."
        super().__init__(self.message, *args, **kwargs)


def getenv(var_name: str, cast_to=str) -> str:
    """Gets an environment variable or raises an exception.

    Args:
        var_name: An environment variable name.
        cast_to: A type to cast.

    Returns:
        A value of the environment variable.

    Raises:
        ImproperlyConfigured: If the environment variable is missing.
    """
    try:
        value = os.environ[var_name]
        return cast_to(value)
    except KeyError:
        raise ImproperlyConfigured(var_name)
    except ValueError:
        raise ValueError(f"The value {value} can't be cast to {cast_to}.")

@dataclass
class luIPmarzban:
    url: str
    port: str 
    username: str
    password: str
    socketpath: str
    apipath: str
    
@dataclass
class Config:
    data: luIPmarzban
    
def load_config() -> Config:
    load_dotenv(dotenv_path='.env')
    return Config(
            data=luIPmarzban(
                url=getenv("URL"),
                port=getenv("PORT"),
                username=getenv("USERNAME"),
                password=getenv("PASSWORD"),
                socketpath=getenv("SOCKETPATH"),
                apipath=getenv("APIPATH")
            ),
    )