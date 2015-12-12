$("#Save").click(function () {
    var formData = new FormData($('form')[0]);
    console.log("lol");
    $.ajax({
        url: "/Home/Upload",  //my ASP.NET MVC method
        type: 'POST',
        // handle the progress report
        xhr: function () {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Check if upload property exists
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },

        // Form data
        data: formData,

        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false,
        timeout: 3000
    })
    .done(function () {
        alert("success");
    })
    .fail(function () {
        alert("error");
    });
});

function progressHandlingFunction(e) {
    if (e.lengthComputable) {
        $('progress').attr({ value: e.loaded, max: e.total });
    }
}