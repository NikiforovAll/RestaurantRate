// Show modal form for change password
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

// Show modal form to add new restaurant
$("#add").click(function () {
    $('#gridSystemModalLabel').val("Adding new restaurant");
    $('#RestID').val('');
    $('#formRestAddr').val('');
    $('#Longtitude').val('');
    $('#Latitude').val('');
    $('#formRestLocation').val('Odessa city');
    $('#formRestRegion').val('Odessa region');
    $('#formRestCountry').val('Ukraine');
    $('#formKitchenRate').rating('update', 0);
    $('#formServiceRate').rating('update', 0);
    $('#formInteriorRate').rating('update', 0);
    $('#formReview').val('');
    $("#photosInput").fileinput('refresh', {
        initialPreview: [],
    });

    $(".editRestaurant").unbind();
    $('.editRestaurant').removeClass('editRestaurant').addClass("addRestaurant");
    $(".addRestaurant").bind("click", function () {
        var restName = $('#formRestName').val();
        var restAddress = $('#formRestAddr').val();
        var restLocation = $('#formRestLocation').val();
        var coordinates = geocodeAddress(restAddress + ', ' + restLocation);
        if (!coordinates) {
            coordinates = { lat: 46.4883915, lng: 30.721056599999997 };
		}
        console.log(coordinates); // { lat: 46.4883915, lng: 30.721056599999997 }
        var restType = 0    // TODO
        var restRegion = $('#formRestRegion').val();
        var restCountry = $('#formRestCountry').val();
        var restKitchenRate = $('#formKitchenRate').val();
        var restServicerate = $('#formServiceRate').val();
        var restInteriorRate = $('#formInteriorRate').val();
        var restReview = $('#formReview').val();
        if ((restName == '') || (restAddress == '') || (restLocation == '') || (restRegion == '') || (restCountry == '') || (restReview == '')) {
            informationWindow('Adding error!', "Please fill all the fields.", {
                'restNames': restName, 'restAddress': restAddress, 'restLocation': restLocation,
                'restRegion': restRegion, 'restCountry': restCountry, 'restReview': restReview
            });
        }
        else if (restAddress == '') {
            informationWindow('Changing error!', "Address field is empty!\nPlease, enter the restaurant address before saving changes.", {
                'restAddress': restAddress
            });
        }
        else if ((restKitchenRate == '') || (restServicerate == '') || (restInteriorRate == '')) {
            informationWindow('Changing error!', "The rates are absent!\nPlease, rate the establishment.");
        }
        else if (restReview == '') {
            informationWindow('Changing error!', "Review field is empty!\nPlease, enter the review before saving changes.", {
                'restReview': ''
            });
        }
        else{
            $.ajax({
                url: "/Admin/AddRestaurant",
                type: "POST",
                data: JSON.stringify(
                    {
                        'RestarauntData': { "KitchenRate": restKitchenRate, "MaintenanceRate": restServicerate, "InteriorRate": restInteriorRate, "Longtitude": coordinates['lat'], "Latitude": coordinates['lng'], "RestarauntType": restType},
                        'RestaurantLangData': { "Name": restName, "Address": restAddress, "Locality": restLocation, "Region": restRegion, "Country": restCountry, "Review": restReview }
                    }
                ),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                beforeSend: function () {
                    $(".addRestaurant").prepend("<i class='fa fa-spinner fa-spin' id='spiner'></i> ");
                    $(".btn, input").prop("disabled", true);
                },
                success: function (answer) {
                    if (answer['result'] == 'success') {
                        document.cookie = "id" + "=" + answer['id'] + "; "; // TODO coockie выдавать на ~60 секунд
                        setTimeout($('#photosInput').fileinput('upload'), 2000);
                        $(".btn, input").prop("disabled", false);   
                        informationWindow('Adding was successful!', 'Restaraunt was added successfully!');
                    }
                    else {
                        $(".btn, input").prop("disabled", false);
                        informationWindow('Adding failed!', 'Restaurant adding was failed.');
                    }
                },
                error: function () {
                    $(".btn, input").prop("disabled", false);
                    informationWindow('Adding failed!', 'Unknown error!\nMaybe DB is not working now. Please, try again later.');
                },
                timeout: 10000
            })
        }
    });
    if ($('#restName').val() == '') {
        informationWindow('Adding error!', 'Restaurant name field is empty! Please, enter a restaurant name before clicking "Add »"!', { 'restName': '' });
    }
    else {
        updateCountdown();
        $("textarea").removeClass("incorrect_data");
        $('#formRestName').val($('#restName').val());
        $("#removeRestaurant").hide();
        $("#myModal").modal({ backdrop: "static" });
    }
});

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
        $(".additionalAddress").slideDown(1000);

    }).on('click', '.btn-remove', function (e) {
        $(this).removeClass('btn-remove btn-danger').addClass('btn-add btn-success').html('<span class="glyphicon glyphicon-plus"></span>');
        $(".additionalAddress").slideUp(1000, function () {
            $('.additionalAddress').hide();
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
    $(".dropdown-toggle .hidden-xs").text(getCookie('username'));
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

//TODO сделать невозможным отправку на сервер файлов не имеющих нужное расширение.
// Addint Restaraunt end
$("#photosInput").fileinput({
    uploadUrl: "/Admin/Index",
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    uploadAsync: false,
    showUpload: false,
    showRemove: false,
    overwriteInitial: false,
    dropZoneEnabled: false,
    allowedFileTypes: ["image"],
    allowedPreviewTypes: ["image"],
    elErrorContainer: "#errorBlock",
    layoutTemplates: {
        actionUpload: '',
        indicatorNew: '',
        indicatorSuccess: '',
        indicatorError: ''
    },
    maxFileSize: 5000,
    maxFileCount: 10
});