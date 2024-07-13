$(function () {

    if (sessionStorage.getItem('token') === null) window.location.href = "./index.html";

    const thingsdb = new ThingsDB();

    thingsdb.connect()
        .then(() => thingsdb.authToken(sessionStorage.getItem('token')))
        .then(() => thingsdb.run('@:stuff', 'list_todos'))
        .then(todos => {
            console.log(todos);
        })
        .catch(console.error);

    $('#logout').on('click', () => {
        sessionStorage.removeItem('token');
        window.location.href = "./index.html";
    });

    (() => {
        const changePasswordDialog = $('dialog#change-password');
        $('#open-change-password').on('click', () => {
            changePasswordDialog[0].showModal();
        });

        changePasswordDialog
            .on('click', 'button:last-child', () => {
                changePasswordDialog[0].close();
            })
            .on('submit', 'form', (e) => {
                e.preventDefault();
                if ($('#password1').val() === $('#password2').val()) {
                    thingsdb.run('@t', 'update_password', [$('#password1').val()])
                        .then(() => {
                            changePasswordDialog[0].close();
                        })
                        .catch(console.error);
                }
            });
    })();

    $('#delete-account').on('click', () => {
        if (confirm('Are you sure you want to delete this account?')) {
            thingsdb.run('@t', 'delete_user')
                .then(() => {
                    sessionStorage.removeItem('token');
                    window.location.href = "./index.html";
                })
                .catch(console.error);
        }
    });

});