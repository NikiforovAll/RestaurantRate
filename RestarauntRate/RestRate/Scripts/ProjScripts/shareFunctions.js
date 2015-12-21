// Show BootStrap information pop-up window
function informationWindow(title, message, fields) {
    BootstrapDialog.show({
        title: title,
        message: message,
        closable: false,
        buttons: [{
            label: 'Close',
            hotkey: 13,
            action: function (dialogItself) {
                dialogItself.close();
                if (fields) {
                    if (fields['modal']) {
                        $(fields['modal']).modal(fields['action']);
                    }
                    if (fields['location']) {
                        window.location.href = fields['location'];
                    }
                    if (fields['user'] == '') {
                        $('input[name="username"]').addClass("incorrect_data")
                        $('input[name="username"]').focus();
                    }
                    if (fields['confirm'] == '') {
                        $('input[name="passwordConfirm"]').addClass("incorrect_data")
                        $('input[name="passwordConfirm"]').focus();
                    }
                    if (fields['pass'] == '') {
                        $('input[name="password"]').addClass("incorrect_data")
                        $('input[name="password"]').focus();
                    }
                    if (fields['email'] == '') {
                        $('input[name="email"]').addClass("incorrect_data")
                        $('input[name="email"]').focus();
                    }
                    if (fields['restName'] == '') {
                        $('input[name="restName"]').addClass("incorrect_data")
                        $('input[name="restName"]').focus();
                    }
                    if (fields['user'] == '' && fields['pass'] == '' && fields['email'] == '') {
                        $('input[name="email"]').focus();
                    }
                    else if (fields['email'] == '' && fields['user'] == '') {
                        $('input[name="email"]').focus();
                    }
                    else if (fields['email'] == '' && fields['pass'] == '') {
                        $('input[name="email"]').focus();
                    }
                    else if (fields['user'] == '' && fields['pass'] == '') {
                        $('input[name="username"]').focus();
                    }
                }
                $("#spiner").detach();
            }
        }]
    });
}

// Email validation
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

// Username validation
function validateUser(name) {
    var re = /^[a-zA-Z0-9.\-_$@*!]{1,32}$/i;
    return re.test(name);
}

// Password validation
function validatePass(pass) {
    var re = /^[a-zA-Z0-9.\-_$@*!]{6,32}$/i;
    return re.test(pass);
}

// Deattach class "Incorrect data" from empty or changed input fields
$("input").change(function () {
    if ($(this).hasClass("incorrect_data")) {
        if (this.value != '') {
            $(this).removeClass("incorrect_data");
        }
    }
}).trigger("change");

// Change panel location after resize window
$(window).resize(function () {
    $('.vertical-offset').css({
        top: ($(document).height() - $('.panel').outerHeight()) / 2
    });
    $(window).resize();
});

// Locate panel on center by vertical
$(document).ready(function () {
    $('.vertical-offset').css({
        top: ($(document).height() - $('.panel').outerHeight()) / 2
    });
});