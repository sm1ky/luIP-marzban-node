# luIP-marzban-node
Версия LuIP-marzban для использования с нодами

## Установка

Если у вас нет установленного node.js на вашем сервере, установите его с помощью nvm

#### Установка Node.js
```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  source ~/.bashrc
  nvm install --lts
```


#### Установка других зависимостей

```bash
  sudo apt-get update
  sudo apt-get install -y ufw
  sudo apt-get install -y dsniff
  sudo apt-get install -y gawk
  sudo apt-get install -y csvtool
  npm install pm2 -g
```

#### Устаановка luIP-marzban (Если ранее она не была установлена)
[Репозиторий && документация](https://github.com/sm1ky/luIP-marzban.git)
```bash
  git clone https://github.com/sm1ky/luIP-marzban.git
  cd luIP-marzban
  cp .env.example .env
  npm install
```


#### Устаановка luIP-marzban-node
```bash
  git clone https://github.com/sm1ky/luIP-marzban-node.git
  cd luIP-marzban-node
  cp .env.example .env
  npm install
```


## Файл .env luIP-marzban-node 
```bash
  # Откройте папку проекта, затем выполните следующую команду
  nano .env
```


#### Настройки 
| Параметр | Описание                |
| :-------- | :------------------------- |
| `PROVIDER_ADDR` | Введите адрес основного сервера, например: https://sub.example.com:3000 или https://example.com:3000. Порт 3000 - это порт сервера luIP-marzban по умолчанию.  |
| `PROVIDER_API_LOGIN` | Установите это значение равным значению переменной API_LOGIN, находящейся в файле env luIP-marzban. |
| `PROVIDER_API_PATH` | Установите это значение равным значению переменной API_PATH, находящейся в файле env luIP-marzban. |
| `PROVIDER_LISTEN_PATH` | Установите это значение равным значению переменной LISTEN_PATH, находящейся в файле env luIP-marzban. |


## Разрешение на использование ipban.sh && ipunban.sh && restore_banned_ips.sh && unbanall.sh
Для того чтобы файлы работали, необходимо дать разрешение на их использование.
```bash
  # Откройте папку проекта, затем выполните следующую команду
  chmod +x ./ipban.sh
  chmod +x ./ipunban.sh
  chmod +x ./restore_banned_ips.sh
  chmod +x ./unbanall.sh
```


## Запуск проекта
После настройки проекта запустите его
```bash
  # Откройте папку проекта, затем выполните следующую команду
  npm start

```

## Примечание
1. На основном сервере в файле .env, расположенном в luIP-marzban, значение переменной API_ENABLE должно быть true.

   
## Пожертвовать
Если вам нравится и это работает для вас, вы можете сделать пожертвование на поддержку, разработку и улучшение luIP-marzban для русскоговорящих людей. Желаем вам всего наилучшего

1. Tron: `TSrhAJEYqYHzuGYjsUqC46mmCx7Jp27dvX`
2. Тинькофф: `2200700951484392`

## Автор оригинального скрипта и его репозиторий
Автор: [mmdzdov](https://github.com/mmdzov)
Репозиторий: [luIP-marzban](https://github.com/mmdzov/luIP-marzban)
