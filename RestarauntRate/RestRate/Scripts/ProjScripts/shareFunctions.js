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
                    if (fields['restNames'] == '') {
                        $('#formRestName').addClass("incorrect_data")
                        $('#formRestName').focus();
                    }
                    if (fields['restAddress'] == '') {
                        $('#formRestAddr').addClass("incorrect_data")
                        $('#formRestAddr').focus();
                    }
                    if (fields['restLocation'] == '') {
                        $('#formRestLocation').addClass("incorrect_data")
                        $('#formRestLocation').focus();
                    }
                    if (fields['restRegion'] == '') {
                        $('#formRestRegion').addClass("incorrect_data")
                        $('#formRestRegion').focus();
                    }
                    if (fields['restCountry'] == '') {
                        $('#formRestCountry').addClass("incorrect_data")
                        $('#formRestCountry').focus();
                    }
                    if (fields['restReview'] == '') {
                        $('#formReview').addClass("incorrect_data")
                        $('#formReview').focus();
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
                    else if (fields['restNames'] == '' && fields['restAddress'] == '' && fields['restLocation'] == '' && fields['restRegion'] == '' && fields['restCountry'] == '' && fields['restReview'] == '') {
                        $('#formRestName').focus();
                    }
                    else if (fields['restAddress'] == '' && fields['restLocation'] == '' && fields['restRegion'] == '' && fields['restCountry'] == '' && fields['restReview'] == '') {
                        $('#formRestAddr').focus();
                    }
                    else if (fields['restLocation'] == '' && fields['restRegion'] == '' && fields['restCountry'] == '' && fields['restReview'] == '') {
                        $('#formRestLocation').focus();
                    }
                    else if (fields['restRegion'] == '' && fields['restCountry'] == '' && fields['restReview'] == '') {
                        $('#formRestRegion').focus();
                    }
                    else if (fields['restCountry'] == '' && fields['restReview'] == '') {
                        $('#formRestCountry').focus();
                    }
                    else if (fields['restAddress'] == '' && fields['restReview'] == '') {
                        $('#formRestAddr').focus();
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
    var re = /^[a-zA-Z0-9.\-_$@*!]*$/i;
    return re.test(name);
}

// Password validation
function validatePass(pass) {
    var re = /^[a-zA-Z0-9.\-_$@*!]*$/i;
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

$("textarea").change(function () {
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

// Update countdown to show how mush symbols left
function updateCountdown() {
    var remaining = 500 - jQuery('#formReview').val().length;
    jQuery('.help-block').text(remaining + ' characters left.');
}

// Get coordinates
function geocodeAddress(address) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            return { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
        }
    });
}

// Locate panel on center by vertical
$(document).ready(function () {
    $('.vertical-offset').css({
        top: ($(document).height() - $('.panel').outerHeight()) / 2
    });
});