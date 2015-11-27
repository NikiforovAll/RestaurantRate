// Email validation
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

$('#registerForm').submit(
function (event) {
    event.preventDefault();
    var email = $(this).find('input[name="email"]').val();
    var user = $(this).find('input[name="username"]').val();
    var pass = $(this).find('input[name="password"]').val();
    if (user == '' || pass == '' || email == '') {
        informationWindow('Register error.', 'Some fields are empty...\nPlease, fill all fields.', {'user': user, 'pass': pass, 'email': email});
    }
    else if (!validateEmail(email)) {
        informationWindow('Register error.', 'E-mail field is not correct.\nPlease, write correct e-mail.', {'email': ''});
    }
    else {
        $.ajax({
            type: "POST",
            url: "/Account/Register",
            data: JSON.stringify({ "UserName": user, "Password": pass, "Email": email }),
            contentType: "application/json; charset=utf-8",
            beforeSend:function() {
                $("#login").prepend("<i class='fa fa-spinner fa-spin' id='spiner'></i>");
                $("#register, input").prop("disabled", true);
            },
            success: function(answer){
                if (answer['result'] == 'success') {
                    var url = "../Account/Login";
                    informationWindow('Register successful.', answer['message'], { 'location': url });
                }
                else {
                    informationWindow('Register error.', answer['message'], { 'user': '', 'pass': '', 'email': '' });
                }
                $("#register, input").prop("disabled", false);
            },
            error: function() {
                informationWindow('Register error.', 'Something wrong was happend!\nPlease, try later.');
                $("#register, input").prop("disabled", false);
            },
            timeout: 10000
        });
    }
});
