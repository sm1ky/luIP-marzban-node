# luIP-marzban-node
Версия LuIP-marzban для использования с нодами [Python]

## Установка

Если у вас нет установленного docker на вашем сервере, установите его с помощью curl

#### Установка docker
```bash
  apt-get install curl
  curl -fsSL https://get.docker.com | sh
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


## Файл .env luIP-marzban-node 
```bash
  # Откройте папку проекта, затем выполните следующую команду
  nano .env
```


#### Настройки 
| Параметр | Описание                |
| :-------- | :------------------------- |
| `URL` | Введите адрес основного сервера, например: https://sub.example.com или https://example.com или http://1.1.1.1.  |
| `PORT` | Порт 3000 - это порт сервера luIP-marzban по умолчанию. |
| `USER` | Установите это значение равным значению переменной API_LOGIN, находящейся в файле env luIP-marzban. |
| `PASS` | Установите это значение равным значению переменной API_PATH, находящейся в файле env luIP-marzban. |
| `SOCKETPATH` | Установите это значение равным значению переменной LISTEN_PATH, находящейся в файле env luIP-marzban. |
| `APIPATH` | Установите это значение равным значению переменной API_PATH, находящейся в файле env luIP-marzban. |


## Запуск проекта
После настройки проекта запустите его в докере
```bash
  # Откройте папку проекта, затем выполните следующую команду
  docker compose up -d
```

## Перезапуск проекта
После настройки проекта запустите его в докере
```bash
  # Откройте папку проекта, затем выполните следующую команду
  docker compose restart
```

## Остановка проекта
После настройки проекта запустите его в докере
```bash
  # Откройте папку проекта, затем выполните следующую команду
  docker compose stop
```

## Примечание
1. На основном сервере в файле .env, расположенном в luIP-marzban, значение переменной API_ENABLE должно быть true.

   
## Пожертвовать
Если вам нравится и это работает для вас, вы можете сделать пожертвование на поддержку, разработку и улучшение luIP-marzban для русскоговорящих людей. Желаем вам всего наилучшего

1. Tron: `TSrhAJEYqYHzuGYjsUqC46mmCx7Jp27dvX`
2. Тинькофф: `2200700951484392`
