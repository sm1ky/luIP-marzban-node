import requests
from datetime import datetime, timedelta

class Api:
    def __init__(self, base_url, api_path):
        self.base_url = base_url
        self.api_path = api_path 

    def get_access_token(self, params):
        session_api_key = self.get_session_api_key()

        if session_api_key and not self.session_api_key_expired(session_api_key):
            return {"api_key": session_api_key["key"]}

        response = requests.post(f"{self.base_url}{self.api_path}/token", json=params)
        data = response.json()

        self.session_api_key_update({
            "key": data.get("api_key"),
            "expire_at": (datetime.utcnow() + timedelta(minutes=59)).timestamp() * 1000,
        })

        return data

    def get_session_api_key(self):
        pass

    def session_api_key_expired(self, session_api_key):
        pass

    def session_api_key_update(self, data):
        pass

def get_token(url, params, apipath):
    api = Api(base_url=url, api_path=apipath)
    data = api.get_access_token(params)
    return data
