// Disable red boarders if input was changed 
$("input").change(function () {
    var value = this.value;
    if (value != '') {
        $(this).removeClass("incorrect_data");
    }
}).trigger("change");

// Open window to password restore
$(".restoreLink").click(function () {
    $("#passwordRestore").modal({ backdrop: "static" });
});

// Imitation click on #restoreButton when Enter is pressed 
$(document).ready(function () {
    $('input[name="email"]').keydown(function (event) {
        if (event.keyCode == 13) {
            $("#restoreButton").click();
        }
    });
});

// Send post data to controller to restore password
$("#restoreButton").click(function () {
    var email = $('input[name="email"]').val();
    if (validateEmail(email)) {
        $.ajax({
            type: "POST",
            url: "/Account/Restore",
            data: JSON.stringify({'Email': email}),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            beforeSend: function () {
                $("#restoreButton").prepend("<i class='fa fa-spinner fa-spin' id='spiner'></i> ");
                $("#restoreButton, input").prop("disabled", true);
            },
            success: function (answer) {
                if (answer['result'] == 'success') {
                    $("#restoreButton, input").prop("disabled", false);
                    informationWindow('Password restore', answer['message'], { 'modal': "#passwordRestore", 'action': 'hide' });
                }
                else {
                    $("#restoreButton, input").prop("disabled", false);
                    informationWindow('Password restore', answer['message'], { 'email': '' });
                }
            },
            error: function () {
                $("#restoreButton, input").prop("disabled", false);
                informationWindow('Password restore', 'Unknown error!\nMaybe DB is not working now. Please, try again later.')
            },
            timeout: 10000
        });
    }
    else {
        informationWindow('Password restore', 'E-mail is not correct!\nPlease, enter your real e-mail to restore!', {'email': ''});
    }
});

// Send login form
$('#LoginForm').submit(
function (event) {
    event.preventDefault();
    var user = document.forms["LoginForm"]["username"].value;
    var pass = document.forms["LoginForm"]["password"].value;
    if (user == '' || pass == '') {
        informationWindow('Login error', 'Login or password field is empty!\nPlease, fill all the fields!', {'user': user, 'pass': pass});
    }
    else {
        jQuery.ajaxSettings.traditional = true;
        $.ajax({
            url: "/Account/Login",
            type: "POST",
            data: JSON.stringify({"UserName": user, "Password": pass}),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            beforeSend: function () {
                $("#login").prepend("<i class='fa fa-spinner fa-spin' id='spiner'></i> ");
                $("#login, input, .restoreLink").prop("disabled", true);
            },
            success: function (answer) {
                if (answer['result'] == 'success') {
                    $("#login, input, .restoreLink").prop("disabled", false);
                    window.location.href = "../Admin/Index";
                }
                else {
                    $("#login, input, .restoreLink").prop("disabled", false);
                    informationWindow('Login error', answer['message'], { 'user': '', 'pass': '' });
                }
            },
            error: function () {
                $("#login, input, .restoreLink").prop("disabled", false);
                informationWindow('Login error', 'Unknown error!\nMaybe DB is not working now. Please, try again later.');
            },
            timeout: 10000
        });
    }
});