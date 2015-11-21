$("input").change(function () {
    var value = this.value;
    if (value != '') {
        $(this).removeClass("incorrect_data");
    }
}).trigger("change");

function changePassword() {
    $("#changePasswordForm").modal({ backdrop: "static" });
}

$("#add").click(function () {
    if (document.getElementById('restName').value === '') {
        BootstrapDialog.show({
            title: 'Adding error!',
            message: 'Restaurant name field is empty! Please, enter a restaurant name before clicking "Add »"!',
            closable: false,
            buttons: [{
                label: 'Close',
                hotkey: 13,
                action: function (dialogItself) {
                    dialogItself.close();
                    $('#restName').addClass("incorrect_data")
                    $('#restName').focus();
                }
            }]
        });
    }
    else {
        $("#myModal").modal({ backdrop: "static" });
    }
});

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