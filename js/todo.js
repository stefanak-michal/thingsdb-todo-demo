$(function () {

    if (sessionStorage.getItem('token') === null) window.location.href = "./index.html";

    const thingsdb = new ThingsDB();

    thingsdb.connect()
        .then(() => thingsdb.authToken(sessionStorage.getItem('token')))
        .then(() => thingsdb.run('@:stuff', 'list_todo', [parseInt(location.search.match(/id=(\d+)/)[1])]))
        .then(todo => {
            $('h1').text('Todo: ' + todo.name);
            todo.items.forEach(item => {
                const li = $('<li>');
                li.append($('<input>', {type: 'checkbox', id: item['#'], checked: item.checked }));
                li.append($('<label>', {for: item['#']}).text(item.description));
                $('#items').append(li);
            });
        })
        .catch(console.error);

    $('#items').on('change', ':checkbox', function () {
        thingsdb.run('@:stuff', 'mark_item', [parseInt(this.id), $(this).is(':checked')]).catch(console.error);
    });

    $('#delete-todo').on('click', () => {
        if (confirm('Are you sure?')) {
            thingsdb.run('@:stuff', 'delete_todo', [parseInt(location.search.match(/id=(\d+)/)[1])]).then(() => {
                window.location.href = "./overview.html";
            }).catch(console.error);
        }
    });

});
