# ThingsDB ToDo demo

The goal of this project is to show power of using [ThingsDB](https://www.thingsdb.io/) and [javascript driver](https://github.com/stefanak-michal/thingsdb.js) without any middleware or backend layer.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Z8Z5ABMLW)

## WIP

Currently I hit roadblock. Because I don't want to use any middleware so I have to use ThingsDB user accounts. But if user logs in as some specific user and then he wants to do actions on collection, there is no way to tell who is the current logged user. 
There is ongoing discussion to allow `user_info` method in collections https://github.com/thingsdb/ThingsDB/pull/386 . 

**Why do I need that?**

I need a way to identify logged user so I can assign new todos to him and also to filter out his todos.

## ThingsDB data and structure

Currently available as `backup.tar.gz` file. 
