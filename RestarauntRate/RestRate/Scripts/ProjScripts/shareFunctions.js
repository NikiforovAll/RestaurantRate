function informationWindow(title, message, fields) {
  BootstrapDialog.show({
    title: title,
    message: message,
    closable: false,
    buttons: [{
      label: 'Close',
      hotkey: 13,
      action: function(dialogItself){
        dialogItself.close();
        if (fields) {
          if (fields['user'] == '') {
            $('input[name="username"]').addClass("incorrect_data")
            $('input[name="username"]').focus();
          }
          if (fields['pass'] == '') {
            $('input[type="password"]').addClass("incorrect_data")
            $('input[type="password"]').focus();
          }
          if (fields['email'] == '') {
            $('input[name="email"]').addClass("incorrect_data")
            $('input[name="email"]').focus();
          }
          if (fields['user'] == '' && fields['pass'] == '' && fields['email'] == ''){
            $('input[name="email"]').focus();
          }
          else if (fields['email'] == '' && fields['user'] == '') {
            $('input[name="email"]').focus();
          }
          else if (fields['email'] == '' && fields['pass'] == '') {
            $('input[name="email"]').focus();
          }
          else if (fields['user'] == '' && fields['pass'] == ''){
            $('input[name="user"]').focus();
          }
        }
      }
    }]
  });
}

$("input").change(function () {
  var value = this.value;
  if (value != '') {
    $(this).removeClass("incorrect_data");
  }
}).trigger("change");

// Email validation
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

$(window).resize( function() {
  $('.vertical-offset').css({
    top: ($(document).height() - $('.panel').outerHeight())/2
  });
  $(window).resize();
});

$('.vertical-offset').css({
  top: ($(document).height() - $('.panel').outerHeight())/2
});
