import socketio
import time
from auth import get_token
import subprocess
from utils import ban_ip, unban_ips
from config import Config, load_config

config: Config = load_config()

URL = f"{config.data.url}:{config.data.port}"

socket_server_url = f"{URL}{config.data.socketpath}"

api_key = get_token(url=URL, apipath=config.data.apipath, params={"username": f"{config.data.username}", "password": f"{config.data.password}"})

sio = socketio.Client()

@sio.event
def connect():
    print("Connected to the server")

@sio.event
def disconnect():
    print("Disconnected from the server")
    
# @sio.on("*")
# def any_event_handler(event, data):
#     print(f"Received event '{event}': {data}")

@sio.on("user:ip:ban")
def on_unban(data):
    command = ["bash", "ipban.sh"]
    subprocess.run(command, capture_output=True, text=True)
    print("Received ban event:", data)

@sio.on("user:ip:unban")
def on_unban(data):
    print("Received unban event:", data)



def main():
    while True:
        try:
            sio.connect(f"{socket_server_url}?api_key={api_key}")  
            sio.wait()
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
