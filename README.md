# luIP-marzban-node
LuIP-marzban node version


## Installation

If you don't have node.js installed on your server, install it with nvm


#### Install Node.js
```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  source ~/.bashrc
  nvm install --lts
```

#### Install other requirements

```bash
  sudo apt-get install -y iptables
  sudo apt-get install gawk
  sudo apt-get install csvtool
  npm install pm2 -g
```


#### Install luIP-marzban
```bash
  git clone https://github.com/mmdzov/luIP-marzban-node.git
  cd luIP-marzban-node
  cp .env.example .env
  npm install
```


## luIP-marzban-node/.env file
```bash
  # Open the project folder, then execute the follow command
  nano .env
```


#### Provider configuration
| Parameter | Description                |
| :-------- | :------------------------- |
| `PROVIDER_ADDR` | Enter the main server address. e.g: https://sub.example.com:3000 or https://example.com:3000. Port 3000 is the default port of luIP-marzban server.  |
| `PROVIDER_API_LOGIN` | Set this value equal to the value of the API_LOGIN variable located in the env file of luIP-marzban. |
| `PROVIDER_API_PATH` | Set this value equal to the value of the API_PATH variable located in the env file of luIP-marzban. |
| `PROVIDER_LISTEN_PATH` | Set this value equal to the value of the LISTEN_PATH variable located in the env file of luIP-marzban. |


## Run the project
After configuring the project, run it
```bash
  # Open the project folder, then execute the follow command
  npm start

```
