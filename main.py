import socketio
import time
from auth import get_token
import subprocess
from utils import ban_ip, unban_ips
from config import Config, load_config
import logging
import json

config: Config = load_config()

logger = logging.getLogger(__name__)

logging.basicConfig(
        level=logging.INFO,
        format="%(filename)s:%(lineno)d #%(levelname)-8s "
        "[%(asctime)s] - %(name)s - %(message)s",
    )

logging.getLogger("socketio").setLevel(logging.DEBUG)
logging.getLogger("engineio").setLevel(logging.DEBUG)

URL = f"{config.data.url}:{config.data.port}"

socket_server_url = f"{URL}"

api_key = get_token(url=URL, apipath=config.data.apipath, params={"username": f"{config.data.username}", "password": f"{config.data.password}"}) 

if api_key is not None and 'data' in api_key and api_key['data'] is not None and 'api_key' in api_key['data']:
    pass
else:
    logger.error('Invalid or missing api_key')


sio = socketio.Client()

@sio.event
def connect():
    logger.info(msg="Connected to the server")

@sio.event
def disconnect():
    logger.info(msg="Disconnected from the server")
    
@sio.event
def connect_error(data):
    logger.info(msg=f"Connection failed: {data}")

@sio.on("user:ip:ban")
def on_unban(data):
    logger.info(msg=f"Received ban event: {data}")
    data_dict = json.loads(data)
    ban_ip(data_dict)

@sio.on("user:ip:unban")
def on_unban(data):
    logger.info(msg=f"Received unban event: {data}")
    unban_ips()
    
@sio.on("*")
def any_event_handler(event, data):
    logger.info(msg=f"Received event '{event}': {data}")

def main():
    while True:
        try:
            logger.info(f"Connecting to server with api_key: {api_key['data']['api_key']}")
            sio.connect(
                f"{socket_server_url}",
                namespaces=[f'{config.data.socketpath}', '/'],
                headers={"api_key": f"{api_key['data']['api_key']}"}
            ) 
            logger.info(f"Connected to server with api_key: {api_key['data']['api_key']}")
            sio.wait()
        except Exception as e:
            logger.error(f"Error connecting to server: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
