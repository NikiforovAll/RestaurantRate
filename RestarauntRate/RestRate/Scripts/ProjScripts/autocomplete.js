var _options = {
    input: null,
    minLength: 0,           // Modified feature, now accepts 0 to search on focus
    maxItem: 100,             // Modified feature, now accepts 0 as "Infinity" meaning all the results will be displayed
    dynamic: false,
    delay: 300,
    order: "asc",            // ONLY sorts the first "display" key
    offset: false,
    hint: true,            // -> Improved feature, Added support for excessive "space" characters
    accent: false,
    highlight: true,
    group: false,           // -> Improved feature, Array second index is a custom group title (html allowed)
    groupOrder: null,       // -> New feature, order groups "asc", "desc", Array, Function
    maxItemPerGroup: null,  // -> Renamed option
    dropdownFilter: false,  // -> Renamed option, true will take group options string will filter on object key
    dynamicFilter: null,    // -> New feature, filter the typeahead results based on dynamic value, Ex: Players based on TeamID
    backdrop: false,
    cache: sessionStorage,           // -> Improved option, true OR 'localStorage' OR 'sessionStorage'
    ttl: 3600000,
    compression: false,     // -> Requires LZString library
    suggestion: false,      // -> *Coming soon* New feature, save last searches and display suggestion on matched characters
    searchOnFocus: true,   // -> New feature, display search results on input focus
    resultContainer: null,  // -> New feature, list the results inside any container string or jQuery object
    generateOnLoad: false,   // -> New feature, forces the source to be generated on page load even if the input is not focused!
    mustSelectItem: true,  // -> New option, the submit function only gets called if an item is selected
    href: null,             // -> New feature, String or Function to format the url for right-click & open in new tab on link results
    display: ["Name", "Address"],   // -> Improved feature, allows search in multiple item keys ["display1", "display2"]
    template:   '<span>' +
                    '<span class="name"><b>{{Name}}</b></span><br />' +
                    '<span class="location"><i>{{Address}}</i></span>' +
                '</span>',
    emptyTemplate: function (query) {
        if (query.length > 0) {
            return 'No results found for "' + query + '"';
        }
    },
    correlativeTemplate: false, // -> New feature, compile display keys, enables multiple key search from the template string
    source: {
        url: [{
            type: "POST",
            url: "/Admin/GetRestaraunts",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
        }, "result"]
    },
    callback: {
        onInit: null,
        onReady: null,      // -> New callback, when the Typeahead initial preparation is completed
        onSearch: null,     // -> New callback, when data is being fetched & analyzed to give search results
        onResult: null,
        onLayoutBuiltBefore: null,  // -> New callback, when the result HTML is build, modify it before it get showed
        onLayoutBuiltAfter: null,   // -> New callback, modify the dom right after the results gets inserted in the result container
        onNavigate: null,   // -> New callback, when a key is pressed to navigate the results
        onMouseEnter: null,
        onMouseLeave: null,
        onClickBefore: null,// -> Improved feature, possibility to e.preventDefault() to prevent the Typeahead behaviors
        onClickAfter: null, // -> New feature, happens after the default clicked behaviors has been executed
        onSendRequest: null,// -> New callback, gets called when the Ajax request(s) are sent
        onReceiveRequest: null,     // -> New callback, gets called when the Ajax request(s) are all received
        onSubmit: null,
        onClick: function (node, a, obj, e) {
            var preview = '';
            var previewConfig = [];
            var counter;
            $.ajax({
                url: "/Admin/GetRestarauntInfo",
                type: "POST",
                data: JSON.stringify({ 'restarauntID': parseInt(obj['RestarauntID']) }),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                //beforeSend: function () {
                //
                //},
                success: function (answer) {
                    if (answer['result']['Images'].length > 0) {
                        counter = answer['result']['Images'].length;
                        for (i = 0; i < counter; i++) {
                            preview += "<img style='height:160px' src='" + answer['result']['Images'][i]['Url'] + "'>,\n"
                            previewConfig.push({ caption: answer['result']['Images'][i]['Name'], url: "/Admin/ImageDelete", key: i });
                        };
                        $("#photosInput").fileinput('refresh', {
                            initialPreview: [preview],
                            initialPreviewConfig: previewConfig
                        });
                    }
                    else {
                        $("#photosInput").fileinput('refresh', {
                            initialPreview: []
                        });
                    }
                    $('#gridSystemModalLabel').val("Editting restaurant");
                    $('#formRestName').val(answer['result']['Name']);
                    $('#formRestAddr').val(answer['result']['Address']);
                    $('#formRestLocation').val(answer['result']['Locality']);
                    $('#formRestRegion').val(answer['result']['Region']);
                    $('#formRestCountry').val(answer['result']['Country']);
                    $('#formKitchenRate').rating('update', answer['result']['KitchenRate']);
                    $('#formServiceRate').rating('update', answer['result']['MaintenanceRate']);
                    $('#formInteriorRate').rating('update', answer['result']['InteriorRate']);
                    $('#formReview').val(answer['result']['Review']);
                    //TODO: NOT ADD BUTTON WHEN IT EXIST!
                    if ($('#addEditRestaurant').length != 0) {
                        $('<button type="button" class="btn btn-danger" id="removeRestaurant">Delete</button>').appendTo('#addEditRestaurant');
                    }
                    $("#myModal").modal({ backdrop: "static" });
                },
                //error: function () {
                //    $(".btn, input").prop("disabled", false);
                //    informationWindow('Adding failed!', 'Unknown error!\nMaybe DB is not working now. Please, try again later.');
                //},
                timeout: 7000
            });
        }
    },
    selector: {
        container: "typeahead-container",
        //group: "typeahead-group",
        result: "typeahead-result",
        list: "typeahead-list",
        //display: "typeahead-display",
        query: "typeahead-query",
        //filter: "typeahead-filter",
        //filterButton: "typeahead-filter-button",
        //filterValue: "typeahead-filter-value",
        //dropdown: "typeahead-dropdown",
        //dropdownCarret: "typeahead-caret",
        button: "typeahead-button",
        backdrop: "typeahead-backdrop",
        hint: "typeahead-hint"
    },
    debug: false
};

$(document).ready(function () {
    $("#editRestName").typeahead(_options);

    $('.showAll').click(function (event) {
        if ($('.typeahead-container').hasClass('result')) {
            $("#editRestName").blur();
            $('.typeahead-container').removeClass("result").removeClass("hint").removeClass("backdrop");
            $(this).removeClass('hideAll');
        } else {
            $("#editRestName").focus();
            $(this).addClass('hideAll');
        }
    });
});
