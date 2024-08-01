# ThingsDB ToDo demo

The goal of this project is to show power of using [ThingsDB](https://www.thingsdb.io/)
and [javascript driver](https://github.com/stefanak-michal/thingsdb.js) without any middleware or backend layer.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Z8Z5ABMLW)

## How to run this demo

This demo requires ThingsDB instance. You can use docker and create required container with `ci/thingsdb.Dockerfile`. In
this file you can also find required console commands at the end as comments.

After your ThingsDB instance is running, you have to do following steps as admin (you can
use [ThingsGUI](https://github.com/thingsdb/ThingsGUI)).

1. Create new collection **auth** and run this code in it

    <details><summary>Code:</summary>

        // Procedures
        
        new_procedure('register', |email, password| {
            if (email.len() == 0 || password.len() == 0 || !is_email(email)) {
                raise('required values not provided');
            };
            thingsdb.query('@t', "
        if (has_user(email)) {
            raise('email already registered');
        };
        new_user(email);
        set_password(email, password);
        grant('@:stuff', email, RUN | CHANGE);
        ", {
                email:,
                password:,
            });
            nil;
        });
    </details>

2. Run this code inside of **stuff** collection.

    <details><summary>Code:</summary>

        // Types
        
        new_type('Item');
        new_type('Todo');
        
        set_type('Item', {
            description: 'str',
            checked: 'bool',
            todo: 'Todo?',
        });
        set_type('Todo', {
            name: 'str',
            items: '{Item}',
            user_id: 'int',
        });
        
        mod_type('Item', 'rel', 'todo', 'items');
        
        // Procedures
        
        new_procedure('add_todo_items', |todo_id, items| {
            todo = thing(todo_id);
            if (todo.user_id != user_info().load().user_id) {
                raise('Not yours');
            };
            todo.items.clear();
            items.each(|i| {
                item = Item{
                    checked: false,
                    description: i,
                };
                todo.items.add(item);
            });
        });
        new_procedure('create_todo', |name| {
            t = Todo{
                name:,
                user_id: user_info().load().user_id,
            };
            .todos.add(t);
            t.id();
        });
        new_procedure('delete_todo', |todo_id| {
            todo = thing(todo_id);
            if (todo.user_id != user_info().load().user_id) {
                raise('Not yours');
            };
            .todos.remove(todo);
        });
        new_procedure('delete_user', || {
            email = user_info().load().name;
            if (is_email(email)) {
                .todos.remove(|todo| todo.user_id == user_id);
                thingsdb.query('@t', 'del_user(email);', {email: });
            };
        });
        new_procedure('list_todo', |todo_id| {
            todo = thing(todo_id);
            if (todo.user_id != user_info().load().user_id) {
                raise('Not yours');
            };
            return todo, 2;
        });
        new_procedure('list_todos', || {
            user_id = user_info().load().user_id;
            .todos.filter(|t| t.user_id == user_id);
        });
        new_procedure('login', || {
            email = user_info().load().name;
            if (is_email(email)) {
                thingsdb.query('@t', "new_token(email, datetime().move('days', 1));", {email: })
                    .then(|token| token);
            };
        });
        new_procedure('mark_item', |item_id, checked| {
            item = thing(item_id);
            if (item.todo.user_id != user_info().load().user_id) {
                raise('Not yours');
            };
            item.checked = checked;
            nil;
        });
        new_procedure('update_password', |password| {
            email = user_info().load().name;
            if (is_email(email)) {
                thingsdb.query('@t', 'set_password(email, password);', {
                    email:,
                    password:,
                });
            };
        });
        
        .todos = set();
    </details>

3. Create user **aa** with required permission with this code:

    ```
    new_user('aa');
    grant('@:auth', 'aa', RUN);
    ```

4. Generate token for user **aa** with code `new_token('aa');` and use this token in the file `js/register.js` for
   method call `authToken`

5. Install module called **thingsdb**, create user **module_thingsdb** with required permissions and assign his token
   for that module with code:

    ```
    new_user('module_thingsdb');
    grant('@t', 'module_thingsdb', QUERY | CHANGE | GRANT);
    grant('@:stuff', 'module_thingsdb', CHANGE | GRANT);
    token = new_token('module_thingsdb');
    
    new_module("thingsdb", "github.com/thingsdb/module-go-thingsdb");
    set_module_conf("thingsdb", {
        token: token,
        host: "localhost",
    });
    ```

6. Done. Now you can open `index.html` and use the demo.

### User info

This demo is build with specific branch (version) of ThingsDB. You can read more about it
here https://github.com/thingsdb/ThingsDB/pull/386 .

**Why do I need that?**

I don't use any 3rd party auth system. Therefore because I use ThingsDB users system I need a way to identify logged
user so I can assign new todo to him and also to filter out his todos.
