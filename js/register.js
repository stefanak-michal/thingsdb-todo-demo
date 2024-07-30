//document ready
$(function () {

    $('form').on('submit', (e) => {
        e.preventDefault();
        $('#notification').text('');

        if ($('#password1').val() !== $('#password2').val()) {
            $('#notification').text('Passwords do not match');
            return;
        }

        $('button').prop('disabled', true);
        const thingsdb = new ThingsDB();

        thingsdb.connect()
            .then(() => thingsdb.auth('aa', 'not_very_safe_password'))
            .then(() => thingsdb.run('@t', 'register', [$('#email').val(), $('#password1').val()]))
            .then(() => {
                $('#notification').text('You have been successfully registered. Continue to login. You will be automatically redirected in 3 seconds.');
                setTimeout(() => {
                    window.location.href = "./index.html";
                }, 3000);
            })
            .catch(err => {
                $('button').prop('disabled', false);
                $('#notification').text(err.error_msg);
            });
    });

});
