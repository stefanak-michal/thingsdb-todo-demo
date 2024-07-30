//document ready
$(function () {

    if (sessionStorage.getItem('token') !== null) window.location.href = "./overview.html";

    $('form').on('submit', (e) => {
        e.preventDefault();
        const thingsdb = new ThingsDB();

        thingsdb.connect()
            .then(() => thingsdb.auth($('#email').val(), $('#password').val()))
            .then(() => thingsdb.run('@:stuff', 'login'))
            .then(token => {
                sessionStorage.setItem('token', token);
                window.location.href = './overview.html';
            })
            .catch(err => {
                $('#notification').text(err.error_msg);
            });
    });

});
