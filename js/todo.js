$(function () {

    if (sessionStorage.getItem('token') === null) window.location.href = "./index.html";

    $('#add-item').on('click', function () {
        const items = $('.item');
        const i = Math.max(items.length ? items.map(function () {
            return this.id.match(/\d+$/)[0];
        }).get() : 0);

        const li = $('<li>');
        li.append($('<label>', {'for': 'item-' + i}));
        li.append($('<input>', {'type': 'text', 'id': 'item-' + i, 'class': 'item'}));
        li.append($('<a>', {'class': 'remove-item', 'data-id': 'item-' + i}).text('Remove'));

        $('#items').append(li);
    });

    $('ol').on('click', '.remove-item', function () {
        $(this).closest('li').remove();
    });

    $('form').on('submit', (e) => {
        e.preventDefault();
        $('#notification').text('');
        const items = $('.item');
        const thingsdb = new ThingsDB();

        thingsdb.connect()
            .then(() => thingsdb.authToken(sessionStorage.getItem('token')))
            .then(() => thingsdb.run('@:stuff', 'create_todo', [$('#name').val()]))
            .then((todo) => thingsdb.run('@:stuff', 'add_todo_items', [
                todo, items.length ? items.map(function () { return $(this).val(); }).get() : []
            ]))
            .then(() => { window.location.href = './overview.html'; })
            .catch(err => {
                $('#notification').text(err.error_msg);
            });

    });

});
