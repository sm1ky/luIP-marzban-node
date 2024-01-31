# luIP-marzban-node
Версия LuIP-marzban для использования с нодами [Python]

## Внимание
Прежде чем настраивать скрипт, помните что нужно настроить хотя-бы ssh (ufw allow ssh) доступ перед включением ufw (ufw enable) иначе придется лезть через VNC :)

И не забудье разрешить порт указанный в .env (По стандарту 3000)

Инструкции: 

Main: https://docs.marzban.ru/advanced/ufw_main_panel/

Node: https://docs.marzban.ru/advanced/ufw_node/

## Установка

Если у вас нет установленного node.js на вашем сервере, установите его с помощью nvm

Если у вас нет установленного python3.11 на вашем сервере, установите его с помощью apt

#### Установка Node.js
```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  source ~/.bashrc
  nvm install --lts
```

#### Установка Python3.11
```bash
  DEBIAN_FRONTEND=noninteractive sudo apt-get -y install python3.11 python3.11-venv
```


#### Установка luIP-marzban (Если ранее она не была установлена)
[Репозиторий && документация](https://github.com/sm1ky/luIP-marzban.git)
```bash
  git clone https://github.com/sm1ky/luIP-marzban.git
  cd luIP-marzban
  cp .env.example .env
  npm install
```


#### Установка luIP-marzban-node
```bash
  git clone https://github.com/sm1ky/luIP-marzban-node.git
  cd luIP-marzban-node
  cp .env.example .env
```


#### Установка других зависимостей

```bash
  DEBIAN_FRONTEND=noninteractive sudo apt-get update
  DEBIAN_FRONTEND=noninteractive sudo apt-get install -y ufw
  DEBIAN_FRONTEND=noninteractive sudo apt-get install -y dsniff
  DEBIAN_FRONTEND=noninteractive sudo apt-get install -y gawk
  DEBIAN_FRONTEND=noninteractive sudo apt-get install -y csvtool
  npm install pm2 -g
```


## Файл .env luIP-marzban-node 
```bash
  # Откройте папку проекта, затем выполните следующую команду
  nano .env
```


## Разрешение на использование ipban.sh && ipunban.sh && restore_banned_ips.sh && unbanall.sh
Для того чтобы файлы работали, необходимо дать разрешение на их использование.
```bash
  # Откройте папку проекта, затем выполните следующую команду
  chmod +x scripts/ipban.sh
  chmod +x scripts/ipunban.sh
  chmod +x scripts/restore.sh
  chmod +x scripts/unbanall.sh
```


#### Настройки 
| Параметр | Описание                |
| :-------- | :------------------------- |
| `URL` | Введите адрес основного сервера, например: https://sub.example.com или https://example.com или http://1.1.1.1.  |
| `PORT` | Порт 3000 - это порт сервера luIP-marzban по умолчанию. |
| `USERNAME` | Установите это значение равным значению переменной API_LOGIN[0], то есть логин, находящейся в файле env luIP-marzban. |
| `PASSWORD` | Установите это значение равным значению переменной API_LOGIN[1], то есть пароль, находящейся в файле env luIP-marzban. |
| `SOCKETPATH` | Установите это значение равным значению переменной LISTEN_PATH, находящейся в файле env luIP-marzban. |
| `APIPATH` | Установите это значение равным значению переменной API_PATH, находящейся в файле env luIP-marzban. |

## Создание виртуальной среды для правильной работы && установка зависимостей
```bash
  # Откройте папку проекта, затем выполните следующую команду
  python3.11 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
```

## ВНИМАНИЕ!!!
Перед запуском pm2 замените interpreter в файле pm2.config.js на ваш путь к python в виртуальной среде. 
Пример `"/root/luIP-marzban-node/venv/bin/python"`

## Запуск проекта
После настройки проекта запустите его в докере
```bash
  # Откройте папку проекта, затем выполните следующую команду
  pm2 start pm2.config.js
```

## Перезапуск проекта
После настройки проекта запустите его в докере
```bash
  # Откройте папку проекта, затем выполните следующую команду
  pm2 kill && pm2 flush && pm2 start pm2.config.js
```

## Остановка проекта
После настройки проекта запустите его в докере
```bash
  # Откройте папку проекта, затем выполните следующую команду
  pm2 kill && pm2 flush
```

## Примечание
1. На основном сервере в файле .env, расположенном в luIP-marzban, значение переменной API_ENABLE должно быть true.

   
## Пожертвовать
Если вам нравится и это работает для вас, вы можете сделать пожертвование на поддержку, разработку и улучшение luIP-marzban для русскоговорящих людей. Желаем вам всего наилучшего

1. Tron: `TSrhAJEYqYHzuGYjsUqC46mmCx7Jp27dvX`
2. Тинькофф: `2200700951484392`
