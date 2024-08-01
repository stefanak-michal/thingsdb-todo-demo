# ThingsDB ToDo demo

The goal of this project is to show power of using [ThingsDB](https://www.thingsdb.io/)
and [javascript driver](https://github.com/stefanak-michal/thingsdb.js) without any middleware or backend layer.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Z8Z5ABMLW)

## How to run this demo

This demo requires ThingsDB instance with enabled websocket available at `localhost:9270`. You can use docker and create required container with `ci/thingsdb.Dockerfile`. In
this file you can also find required console commands at the end as comments.

After your ThingsDB instance is running, you just have to open `index.html` in your browser.

Main page also contains link to `install.html` which adds required stuff into ThingsDB. Installation expects default user "admin" with password "pass" be available.

### User info

This demo is build with specific branch (version) of ThingsDB. You can read more about it
here https://github.com/thingsdb/ThingsDB/pull/386 .

**Why do I need that?**

I don't use any 3rd party auth system. Therefore because I use ThingsDB users system I need a way to identify logged
user so I can assign new todo to him and also to filter out his todos.
