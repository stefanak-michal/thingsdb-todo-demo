//document ready
$(function () {

    $('form').on('submit', (e) => {
        e.preventDefault();
        const thingsdb = new ThingsDB();

        thingsdb.connect()
            .then(() => thingsdb.auth($('#email').val(), $('#password').val()))
            .then(() => thingsdb.run('@t', 'login'))
            .then(token => {
                sessionStorage.setItem('token', token);
                window.location.href = './overview.html';
            })
            .catch(err => {
                $('#notification').text(err.error_msg);
            });
    });

});
