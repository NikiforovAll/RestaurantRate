// Show modal form for change password
function changePassword() {
    $("#changePasswordForm").modal({ backdrop: "static" });
}

// Send post data to controller to change password
//$("#changePassword").click(function () {
//    var oldPass = $('input[name="email"]').val();
//    var newPass = $('input[name="email"]').val();
//    var newPassRepeat = $('input[name="email"]').val();

// Show modal form to add new restaurant
$("#add").click(function () {
    if (document.getElementById('restName').value === '') {
        informationWindow('Adding error!', 'Restaurant name field is empty! Please, enter a restaurant name before clicking "Add »"!', {'restName': ''});
    }
    else {
        $("#myModal").modal({ backdrop: "static" });
    }
});

// Update countdown to show how mush symbols left
function updateCountdown() {
    var remaining = 500 - jQuery('#formReview').val().length;
    jQuery('.help-block').text(remaining + ' characters left.');
}

jQuery(document).ready(function ($) {
    updateCountdown();
    $('#formReview').change(updateCountdown);
    $('#formReview').keyup(updateCountdown);
});

$("#photosInput").fileinput({
    uploadUrl: '/admin/picture_upload.php', // you must set a valid URL here else you will get an error
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    overwriteInitial: false,
    maxFileSize: 2000,
    maxFilesNum: 10,
    maxFileCount: 10,
});

var calculate = function () {
    var padding = ($(document).height() - $('.panel').outerHeight()) / 2;
    var min_padding = $('.navbar').outerHeight();
    if (padding < min_padding) {
        padding = min_padding + 5
    }
    return padding
}

$(window).resize(function () {
    $('.vertical-offset').css({
        top: calculate()
    });
    $(window).resize();
});

$('.vertical-offset').css({
    top: calculate()
});