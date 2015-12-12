﻿// Show modal form for change password
function changePassword() {
    $("#changePasswordForm").modal({ backdrop: "static" });
}

// Send post data to controller to change password
$("#changePassword").click(function () {
    var oldPass = $('#formOldPassword').val();
    var newPass = $('#formNewPassword').val(); 
    var newPassConfirm = $('#formNewPasswordConfirm').val();
    if (newPass != newPassConfirm) {
        informationWindow('Changing error!', "Password confirmation mismatch.\nPlease repeat you new password again.", { 'pass': '', 'confirm': '' });
    }
    else {   
        $.ajax({
            url: "/Admin/ChangePassword",
            type: "POST",
            data: JSON.stringify({ "UserInfo": { "OldPassword": oldPass, "NewPassword": newPass } }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            beforeSend: function () {
                $("#changePassword").prepend("<i class='fa fa-spinner fa-spin' id='spiner'></i> ");
                $(".btn, input").prop("disabled", true);
            },
            success: function (answer) {
                if (answer['result'] == 'success') {
                    $(".btn, input").prop("disabled", false);
                    informationWindow('Changing successful!', answer['message']);
                }
                else {
                    $(".btn, input").prop("disabled", false);
                    informationWindow('Changing error!', answer['message']);
                }
            },
            error: function () {
                $(".btn, input").prop("disabled", false);
                informationWindow('Changing error!', 'Unknown error!\nMaybe DB is not working now. Please, try again later.');
            },
            timeout: 10000
        });
    }
});

// Adding Restaraunt start
$("#addRestaurant").click(function () {
    var restName = $('#formRestName').val();
    var restAddress = $('#formRestAddr').val();
    var restLocation = $('#formRestLocation').val();
    var restRegion = $('#formRestRegion').val();
    var restCountry = $('#formRestCountry').val();
    var restKitchenRate = $('#formKitchenRate').val();
    var restServicerate = $('#formServiceRate').val();
    var restInteriorRate = $('#formInteriorRate').val();
    var restReview = $('#formReview').val();
     if ((restName == '') || (restAddress == '') || (restLocation == '') || (restRegion == '') || (restCountry == '')) {
         informationWindow('Changing error!', "Adding error.\nPlease fill all the fields.", {
             'restName': restName, 'restAddress': restAddress, 'restLocation': restLocation,
             'restRegion': restRegion, 'restCountry': restCountry
         });
     }
     else {
         /*$('#photosInput').fileinput({
             uploadExtraData: JSON.stringify({
                 'RestarauntData': { "KitchenRate": restKitchenRate, "MaintenanceRate": restServicerate, "InteriorRate": restInteriorRate },
                 'RestaurantLangData': { "Name": restName, "Address": restAddress, "Locality": restLocation, "Region": restRegion, "Country": restCountry, "Review": restReview }
             })
         });*/
            /* uploadExtraData: function () {
                 return {
                     "lol": $('#formRestName').val()
                 };
             }
         });*/
         $('#photosInput').fileinput('upload');
    /*    $.ajax({
            url: "/Admin/AddRestaurant",
            type: "POST",
            data: JSON.stringify({
                "RestarauntData": { "KitchenRate": restKitchenRate, "MaintenanceRate": restServicerate, "InteriorRate": restInteriorRate },
                "RestaurantLangData": { "Name": restName, "Address": restAddress, "Locality": restLocation, "Region": restRegion, "Country": restCountry, "Review": restReview }
            }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            beforeSend: function () {
                $("#changePassword").prepend("<i class='fa fa-spinner fa-spin' id='spiner'></i> ");
                $(".btn, input").prop("disabled", true);
            },
            success: function (answer) {
                if (answer['result'] == 'success') {
                   // $("<input id='restaurantId' value=" + answer['id'] + " />").appendTo('#imagesUpload');
                    $('#photosInput').fileinput('upload');
                    $(".btn, input").prop("disabled", false);
                 //   informationWindow('Adding was successful!', answer['message']);
                }
                else {
                    $(".btn, input").prop("disabled", false);
                    informationWindow('Adding failed!', answer['message']);
                }
            },
            error: function () {
                $(".btn, input").prop("disabled", false);
                informationWindow('Adding failed!', 'Unknown error!\nMaybe DB is not working now. Please, try again later.');
            },
            timeout: 10000
        })*/
    }
});

// Show modal form to add new restaurant
$("#add").click(function () {
    if ($('#restName').val() == '') {
        informationWindow('Adding error!', 'Restaurant name field is empty! Please, enter a restaurant name before clicking "Add »"!', { 'restName': '' });
    }
    else {
        var name = $('#restName').val();
        $('#formRestName').val(name);
        $("#myModal").modal({ backdrop: "static" });
    }
});

// Send post data to controller to add new restaurant
//$('#addRestaurant').click(function () {
//    
//});

// Update countdown to show how mush symbols left
function updateCountdown() {
    var remaining = 500 - jQuery('#formReview').val().length;
    jQuery('.help-block').text(remaining + ' characters left.');
}

// Open map to add restaurant
function openMap() {
    // TODO!
    $(".modal-content").after("<div id='map'></div>");

    console.log("map is opened!");
}

// Open/close additional address fields
$(function () {
    $(document).on('click', '.btn-add', function (e) {
        $(this).removeClass('btn-add btn-success').addClass('btn-remove btn-danger').html('<span class="glyphicon glyphicon-minus"></span>');
        $("<div class='additionalAddress' style='display:none'>\
            <div class='row form-group'>\
                <label class='control-label col-md-3'>City:</label>\
                <div class='col-md-9'>\
                    <input class='form-control' placeholder='Locality' id='formRestLocation' maxlength='80' type='text' value='Odessa city' />\
                </div>\
            </div>\
            <div class='row form-group'>\
                <label class='control-label col-md-3'>Region:</label>\
                <div class='col-md-9'>\
                    <input class='form-control' placeholder='Region' id='formRestRegion' maxlength='80' type='text' value='Odessa region' />\
                </div>\
            </div>\<div class='row form-group'>\
                <label class='control-label col-md-3'>Country:</label>\
                <div class='col-md-9'>\
                    <input class='form-control' placeholder='Country' id='formRestCountry' maxlength='80' type='text' value='Ukraine' />\
                </div>\
            </div>\
           </div>\
        ").insertAfter("#addressRestaurant");
        $(".additionalAddress").slideDown(1000);

    }).on('click', '.btn-remove', function (e) {
        $(this).removeClass('btn-remove btn-danger').addClass('btn-add btn-success').html('<span class="glyphicon glyphicon-plus"></span>');
        $(".additionalAddress").slideUp(1000, function () {
            $('.additionalAddress').remove();
        });
    });
});

// Count if char was entered to field
jQuery(document).ready(function ($) {
    updateCountdown();
    $('#formReview').change(updateCountdown);
    $('#formReview').keyup(updateCountdown);
});

var calculate = function () {
    var padding = ($(document).height() - $('.panel').outerHeight()) / 2;
    var min_padding = $('.navbar').outerHeight();
    if (padding < min_padding) {
        padding = min_padding + 5
    }
    return padding;
}

$(window).resize(function () {
    $('.vertical-offset').css({
        top: calculate()
    });
    $(window).resize();
});

$(document).ready(function () {
    $('.vertical-offset').css({
        top: calculate()
    });
    var cookies = document.cookie.split(';');
    var user = cookies[1].split('=')[1];
    $(".dropdown-toggle .hidden-xs").text(user);
});


//TODO сделать невозможным отправку на сервер файлов не имеющих нужное расширение.
// Addint Restaraunt end
    $("#photosInput").fileinput({
        uploadUrl: "/Admin/AddRestaurant",
        /*uploadExtraData: function () {
            return {
                extradata: JSON.stringify({ "KitchenRate": $('#formKitchenRate').val(), "MaintenanceRate": $('#formServiceRate').val() })
            };
        },*/
        uploadExtraData: function() {
            return {
                extradata: JSON.stringify({
                    'RestarauntInfo': {
                        'RestarauntData': { "KitchenRate": $('#formKitchenRate').val(), "MaintenanceRate": $('#formServiceRate').val(), "InteriorRate": $('#formInteriorRate').val() },
                        'RestaurantLangData': { "Name": $('#formRestName').val(), "Address": $('#formRestAddr').val(), "Locality": $('#formRestLocation').val(), "Region": $('#formRestRegion').val(), "Country": $('#formRestCountry').val(), "Review": $('#formReview').val() }
                    }
                })};
            },
        allowedFileExtensions: ['jpg', 'png', 'jpeg'],
        uploadAsync: false,
        showUpload: false,
        showRemove: false,
        overwriteInitial: true,
        dropZoneEnabled: false,
        allowedFileTypes: ["image"],
        allowedPreviewTypes: ["image"],
        elErrorContainer: "#errorBlock",
        layoutTemplates: {
            actionUpload: ''
        },
        maxFileSize: 5000,
        maxFileCount: 10,
    });/*.on("filebatchselected", function (event, files) {
   $('#photosInput').fileinput('upload');
});*/