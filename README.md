# ThingsDB ToDo demo

The goal of this project is to show power of using [ThingsDB](https://www.thingsdb.io/)
and [javascript driver](https://github.com/stefanak-michal/thingsdb.js) without any middleware or backend layer.

This demo offers:

- User registration, login, logout, change password and delete account
- Create Todo with items
- Check and uncheck items on Todo list
- Delete Todo list
  
You can read more about how I approached development of this demo and learn basics how to work with thingsDB at [dev.to](https://dev.to/stefanak-michal/let-me-explain-a-thingsdb-todo-app-demo-2n9g).

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Z8Z5ABMLW)

## How to run this demo

This demo requires ThingsDB instance (version ^1.6.6) with enabled websocket available at `localhost:9270`. You can use docker and create required container with commands:

```
docker pull ghcr.io/thingsdb/node:latest
```

```
docker run --name thingsdb -d -e THINGSDB_WS_PORT=9270 -p 9200:9200 -p 9270:9270 -v ~/thingsdb/data:/data -v ~/thingsdb/modules:/modules ghcr.io/thingsdb/node --init
```

After your ThingsDB instance is running, you just have to open `index.html` in your browser.

Main page also contains link to `install.html` which adds required stuff into ThingsDB. Installation expects default user "admin" with password "pass" be available.
