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
            },
            success: function (answer) {
                console.log(answer);
                if (answer['result'] == 'success') {
                    BootstrapDialog.alert({
                        title: 'Success',
                        message: 'Email was send!'
                    });
                    console.log("success");
                }
                else if (answer['result' == 'error']) {
                    BootstrapDialog.alert({
                        title: 'Error',
                        message: 'Wrong email address!'
                    });
                    console.log("error");
                }
                $("#spiner").detach();
            },
            error: function () {
                BootstrapDialog.alert({
                    title: 'Login error',
                    message: 'Unknown error!'
                });
                console.log("uknown error");
                $("#spiner").detach();
            },
            timeout: 10000
        });
    }
        else {
        BootstrapDialog.show({
            title: 'Restore error',
            message: 'E-mail is not correct!\nPlease, enter your real e-mail to restore!',
            closable: false,
            buttons: [{
                label: 'Close',
                hotkey: 13,
                action: function (dialogItself) {
                    dialogItself.close();
                    $('input[name="email"]').addClass("incorrect_data");
                    $("#spiner").detach();
                }
            }]
        });
    }
});

// Send login form
$('#LoginForm').submit(
function (event) {
    event.preventDefault();
    var user = document.forms["LoginForm"]["username"].value;
    var pass = document.forms["LoginForm"]["password"].value;
    if (user == '' || pass == '') {
        BootstrapDialog.show({
            title: 'Login error',
            message: 'Login or password field is empty!\nPlease, fill all the fields!',
            closable: false,
            buttons: [{
                label: 'Close',
                hotkey: 13,
                action: function (dialogItself) {
                    dialogItself.close();
                    if (user == '') {
                        $('input[name="username"]').addClass("incorrect_data")
                        $('input[name="username"]').focus();
                    }
                    if (pass == '') {
                        $('input[type="password"]').addClass("incorrect_data")
                        $('input[type="password"]').focus();
                    }
                    if (user == '' && pass == '') {
                        $('input[name="username"]').focus();
                    }
                }
            }]
        });
    }
    else {
        jQuery.ajaxSettings.traditional = true;
        $.ajax({
            url: "/Account/Login",
            type: "POST",
            data: JSON.stringify({ "UserName": user, "Password": pass }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            beforeSend: function () {
                $("#login").prepend("<i class='fa fa-spinner fa-spin' id='spiner'></i>");
                $("#login, input, .restoreLink").prop("disabled", true);
            },
            success: function (answer) {
                if (answer['result'] == 'success') {
                    window.location.href = "../Admin/Index";
                }
                else if (answer['result'] == 'error') {
                    BootstrapDialog.show({
                        title: 'Login error',
                        message: answer['message'],
                        closable: false,
                        buttons: [{
                            label: 'Close',
                            hotkey: 13,
                            action: function (dialogItself) {
                                dialogItself.close();
                                $('input[name="username"], input[type="password"]').addClass("incorrect_data")
                                $("#spiner").detach();
                                $('input[type="text"]').focus();
                                $("#login, input, .restoreLink").prop("disabled", false);
                            }
                        }]
                    });
                }
            },
            error: function () {
                BootstrapDialog.show({
                    title: 'Login error',
                    message: 'Unknown error!',
                    closable: false,
                    buttons: [{
                        label: 'Close',
                        hotkey: 13,
                        action: function (dialogItself) {
                            dialogItself.close();
                            $('input[name="username"], input[type="password"]').addClass("incorrect_data")
                            $("#spiner").detach();
                            $('input[name="username"]').focus();
                            $("#login, input, .restoreLink").prop("disabled", false);
                        }
                    }]
                });
            },
            timeout: 10000
        });
    }
});

// Change panel location after resize window
$(window).resize(function () {
    $('.vertical-offset').css({
        top: ($(document).height() - $('.panel').outerHeight()) / 2
    });
    $(window).resize();
});

// Locate panel on center by vertical
$('.vertical-offset').css({
    top: ($(document).height() - $('.panel').outerHeight()) / 2
});

// Email validation
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}