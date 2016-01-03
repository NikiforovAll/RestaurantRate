var restaurants = []; //temporary restaurants 
var testRest = [
    { Name: "Test0", address: "TestAdress0", stars: 1, ID: "1" },
    { Name: "Test1", address: "TestAdress1", stars: 2, ID: "2" },
    { Name: "Test2", address: "TestAdress2", stars: 3, ID: "3" },
    { Name: "Test3", address: "TestAdress3", stars: 4, ID: "4" },
    { Name: "Test4", address: "TestAdress4", stars: 5, ID: "5" },
    { Name: "Test5", address: "TestAdress5", stars: 1, ID: "6" },
    { Name: "Test6", address: "TestAdress6", stars: 2, ID: "7" },
    { Name: "Test7", address: "TestAdress7", stars: 3, ID: "8" },
    { Name: "Test8", address: "TestAdress8", stars: 4, ID: "9" },
    { Name: "Test9", address: "TestAdress8", stars: 5, ID: "10" }
];
//function testReviewFilling() {//Test filed for console
//    fillReview(1, "RestaurantForTesting", 3, 3, 3, "Lorem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor inreprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatatnon proident sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit,", "",
//     [
//        "http://lorempixel.com/400/100/",
//        "http://lorempixel.com/400/200/",
//        "http://lorempixel.com/400/300/",
//        "http://lorempixel.com/400/400/"
//    ]
//);
//}
var minRad = 700;
var maxRad = 2000;
var panel;
var activeRest = { marker: null, infoWindow: null };
var prevItem;
var availabletypes = ["restaurant", "bar", "cafe"];
var reviewItem;
var markersOnMap = false;
var _allRestaurants = [];
var _typeAhead;
function panelInit() {

    panel = $(".mainpanel");
    prevItem = $(".panel-item").first();
    //nearbyMarkerSearch(minRad);
    // Scroll init
    $(".content").mCustomScrollbar({
        theme: "rounded-dots-dark",
        scrollInertia: 100,
        scrollButtons: {
            enable: true
        }
    });
    $(".content1").mCustomScrollbar({
        theme: "rounded-dots-dark",
        scrollInertia: 100,
        scrollButtons: {
            enable: true
        }
    });
    // starPluginInit
    for (var j = 1; j <= 3; j++) {
        initStarRating("#input-id" + j);
    }
    $("#commentBtn").click(function () {
        $("#reviewComments").slideToggle();
    });
    getAllRestaurants(true);
    //populateGallery(testitems);
    //initGallery();
    //$("#orderByRating").click(function () {
    //    restaurantsSort();
    //    clearPanel();
    //    restaurants.forEach(function (el, i) {
    //        addToPanel(el, i);
    //    });
    //});
    $("#getFullList").click(function () {
        citySearch();
    });
    $("#radiusSearch").click(function () {

    });
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            toggleReview();
        }
    });
    $("#radiusSearch").change(function () {
        if ($(this).is(":checked")) {
            getAllRestaurantsInRadius(marker.position.lat(), marker.position.lng());
        } else {
            poppulateAllRestaurants();
        }
    });
};


function toggleFunc() {
    $(".showReview").click(toggleReview);
}

function toggleReview(source) {
    if (isDragging) {
    } else {
        var activeEl = getActivePanelElement();
        if (!!activeEl) {
            console.log(activeEl);
            //changing content stub
            //if (source.target)
            //    var tmp = $(source.target).closest(".panel-item-w").attr("id");
            //else {
            var activeElement = $(activeEl).closest(".panel-item-w").attr("id");
            //}
            console.log(activeElement);
            updateReview(activeElement);
            if (activeRest.marker)
                activeRest.marker.setAnimation(null);
            $("#review").slideDown();
            // infowindow
        } else {
            $("#review").slideUp();
            if (activeRest.marker)
                activeRest.marker.setAnimation(null);
            infoWindowRest.close();
        }
    }
}

function slideDownReview() {
    $("#review").slideUp();
    activeRest.marker.setAnimation(null);
    if (infoWindowRest)
        infoWindowRest.close();
}

function citySearch() {
    for (var j = 0; j < 3; j++) {
        restaurants = restaurants.concat(testRest);
    }
    restaurants.forEach(function (el) {
        addToPanel(el);
    });
}

function nearbyMarkerSearch(r) {
    restaurants = [];
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({

        location: marker.getPosition(),
        radius: r,
        types: availabletypes
    }, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearPanel();
            for (var i = 0; i < results.length; i++) {
                var request = { reference: results[i].reference };
                initRestMarker(1, results[i].geometry.location, i);

                service.getDetails(request, function (details, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {

                        var tmpItem = {
                            Name: details.name,
                            stars: (details.rating === undefined) ? 0 : details.rating,
                            address: details.address_components[1].long_name + ", " + details.address_components[0].long_name,//.replace("вулиця","")
                            ID: 0
                        };
                        restaurants.push(tmpItem);
                        addToPanel(tmpItem);

                    }

                });
                // restaurantsSort();
            }
        }
    });
}
function geocodeAddress(geocoder, address, ID, name) {

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            //console.log(results[0].geometry.location.lat());
            initRestMarker(1, results[0].geometry.location, ID, name);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
function poppulateAllRestaurants() {
    clearPanel();
    restaurants = _allRestaurants;
    _allRestaurants.forEach(function (el) {
        addToPanel(el);
    });
}
function getAllRestaurants(ismarkerInit) {
    restaurants = [];
    $.ajax({
        url: "/Home/GetAllRestaurants",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (answer) {
            console.log(answer.result);
            var geocoder = new google.maps.Geocoder();
            var tmpRest = answer.result;
            tmpRest = tmpRest.sort(function (el1, el2) {
                return (el1.InteriorRate * 0.3 + el1.KitchenRate * 0.4 + el1.MaintenanceRate * 0.3) -
                    (el2.InteriorRate * 0.3 + el2.KitchenRate * 0.4 + el2.MaintenanceRate * 0.3);
            });
            tmpRest.forEach(function (el) {
                var tmp = el.RestaurantIDNameFullAddress;
                var currRest = {
                    stars: el.InteriorRate * 0.3 + el.KitchenRate * 0.4 + el.MaintenanceRate * 0.3,
                    address: tmp.Address,
                    Name: tmp.Name,
                    ID: tmp.RestarauntID
                };
                //console.log(window.Typeahead["#editRestName"].source);
                restaurants.push(currRest);
                _allRestaurants.push(currRest);
                addToPanel(currRest);
                initRestMarker(el.RestarauntType, { lng: parseFloat(el.Latitude.replace(",", ".")), lat: parseFloat(el.Longitude.replace(",", ".")) }, tmp.RestarauntID, tmp.Name);
            });
            typeAhead(restaurants);
        },
        error: function () {
            console.log('Такие нюансы-романсы.. :(');
        },
        timeout: 10000
    });
}

function getAllRestaurantsInRadius(lat, long) {
    restaurants = [];
    clearPanel();
    $.ajax({
        url: "/Home/GetRestaurantsWithinRadius",
        data: JSON.stringify({ "Longitude": long, "Latitude": lat }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (answer) {
            console.log(answer.result);
            var tmpRest = answer.result;
            tmpRest = tmpRest.sort(function (el1, el2) {
                //console.log("calling async");
                return -1.0 * (el1.InteriorRate * 0.3 + el1.KitchenRate * 0.4 + el1.MaintenanceRate * 0.3) +
                (el2.InteriorRate * 0.3 + el2.KitchenRate * 0.4 + el2.MaintenanceRate * 0.3);
            });
            console.log(tmpRest);
            tmpRest.forEach(function (el) {
                var tmp = el.RestaurantIDNameFullAddress;
                //console.log(tmp.Name);
                var currRest = {
                    stars: el.InteriorRate * 0.3 + el.KitchenRate * 0.4 + el.MaintenanceRate * 0.3,
                    address: tmp.Address,
                    Name: tmp.Name,
                    ID: tmp.RestarauntID
                };
                restaurants.push(currRest);
                addToPanel(currRest);
            });
        },
        error: function () {

            console.log('Такие нюансы-романсы.. :(');
        },
        timeout: 10000
    });
}

function updateReview(restID) {

    $.ajax({
        url: "/Home/GetRestaurantInfo",
        data: JSON.stringify({ "restarauntID": restID }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (answer) {
            var tmp = answer.result;
            console.log(tmp);
            fillReview(restID, tmp.Name, tmp.KitchenRate, tmp.InteriorRate, tmp.MaintenanceRate, tmp.Review, tmp.AddedDate, tmp.Images.map(function (el) { return el.Url }));
            //console.log({ lat: parseFloat(tmp.Latitude.replace(",", ".")), lng: parseFloat(tmp.Longitude.replace(",", ".")) });
            //{ lng: parseFloat(tmp.Latitude.replace(",", ".")), lat: parseFloat(tmp.Longitude.replace(",", ".")) }
            var latlangMarkerPos = { lng: parseFloat(tmp.Latitude.replace(",", ".")), lat: parseFloat(tmp.Longitude.replace(",", ".")) };
            map.setCenter(latlangMarkerPos);
            //map.setCenterWithOffset(latlangMarkerPos, 0,0);
            map_recenter(latlangMarkerPos, $(window).width() / 2.8, 0);
            var activeEl = markers.filter(function (el) {
                return (el.get('ID') == restID ? true : false);
            })[0];
            activeRest.marker = activeEl;
            activeEl.setAnimation(google.maps.Animation.BOUNCE);
        },
        error: function () {
            console.log('Такие нюансы-романсы.. :(');
        },
        timeout: 10000
    });
}


function map_recenter(latlng, offsetx, offsety) {
    var point1 = map.getProjection().fromLatLngToPoint(
         (latlng instanceof google.maps.LatLng) ? latlng : map.getCenter()
     );
    var point2 = new google.maps.Point(
        ((typeof (offsetx) == 'number' ? offsetx : 0) / Math.pow(2, map.getZoom())) || 0,
        ((typeof (offsety) == 'number' ? offsety : 0) / Math.pow(2, map.getZoom())) || 0
    );
    map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
        point1.x - point2.x,
        point1.y + point2.y
    )));
    //map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
    //    point1.x - point2.x,
    //    point1.y + point2.y
    //)));
}
function fillReview(ID, name, foodRate, styleRate, serviceRate, reviewContext, currDate, Images) {
    starChangeValue(foodRate + 0.5, "input-id1");
    starChangeValue(styleRate + 0.5, "input-id2");
    starChangeValue(serviceRate + 0.5, "input-id3");
    var body = $("#reviewContext");
    body.html("<h4>" + name + "</h2>" + "<hr>");
    if (reviewContext) {
        body.append(reviewContext);
    }
    var strDate = "";
    //if (currDate === "") {
    //    var strDate = new Date().toJSON().slice(0, 10);
    //} else {
    var jDateStr = new Date(parseInt(currDate.substr(6)));
    strDate = jDateStr.getDate().toString() + "/" + jDateStr.getMonth().toString() + "/" + jDateStr.getFullYear().toString();
    //strDate = currDate;
    //}
    console.log(strDate);
    $("#reviewDate").text(strDate);
    fillShareButton(ID, reviewContext, name, Images[0]);
    fillGalleryFromQuery(ID);
    fillChat(ID);
}
function fillGalleryFromQuery(restID) {

    $.ajax({
        url: "/Home/GetRestaurantGallery",
        data: JSON.stringify({ "restarauntID": restID }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (answer) {
            var tmp = answer.result;
            populateGallery(tmp.map(function (el) {
                return el.Url;
            }));
        },
        error: function () {
            console.log('Такие нюансы-романсы.. :(');
        },
        timeout: 10000
    });
}

function fillShareButton(ID, desc, name, Image) {
    $("#shareContent").empty();
    $("#shareContent").append(VK.Share.button({
        title: name,
        url: "http://rest-rate.azurewebsites.net" + "/" + ID,
        image: Image,
        description: desc
    }, {
        type: "round",
        text: "Поделится"
    }));
    var facebookUrl = {
        url: "",
        imgPath: "",
        desc: ""
    };
    facebookUrl.url = "http://rest-rate.azurewebsites.net";
    facebookUrl.imgPath = Image;
    facebookUrl.desc = desc;
    var body = "http://www.facebook.com/sharer.php?u=" + facebookUrl.url + "&media=" + facebookUrl.imgPath + "&description=" + facebookUrl.desc;
    var tmp = $("a[name=\"fb_share\"]");
    //console.log(tmp);
    tmp.attr("href", body);
}
function fillChat(pageID) {
    $("#vk_comments").empty();
    VK.init({ apiId: 5196098, onlyWidgets: true });
    var tmp = 538;// ($("#reviewComments").width())*4;
    VK.Widgets.Comments("vk_comments", { limit: 5, width: tmp, attach: "*" }, pageID);
}

function typeAhead(source) {
    var _options = {
        input: null,
        minLength: 0, // Modified feature, now accepts 0 to search on focus
        maxItem: 6, // Modified feature, now accepts 0 as "Infinity" meaning all the results will be displayed
        dynamic: false,
        delay: 300,
        order: "asc", // ONLY sorts the first "display" key
        offset: false,
        hint: true, // -> Improved feature, Added support for excessive "space" characters
        accent: false,
        highlight: true,
        group: false, // -> Improved feature, Array second index is a custom group title (html allowed)
        groupOrder: null, // -> New feature, order groups "asc", "desc", Array, Function
        maxItemPerGroup: null, // -> Renamed option
        dropdownFilter: false, // -> Renamed option, true will take group options string will filter on object key
        dynamicFilter: null, // -> New feature, filter the typeahead results based on dynamic value, Ex: Players based on TeamID
        backdrop: false,
        cache: sessionStorage, // -> Improved option, true OR 'localStorage' OR 'sessionStorage'
        ttl: 3600000,
        compression: false, // -> Requires LZString library
        suggestion: false, // -> *Coming soon* New feature, save last searches and display suggestion on matched characters
        searchOnFocus: true, // -> New feature, display search results on input focus
        resultContainer: null, // -> New feature, list the results inside any container string or jQuery object
        generateOnLoad: false, // -> New feature, forces the source to be generated on page load even if the input is not focused!
        mustSelectItem: true, // -> New option, the submit function only gets called if an item is selected
        href: null, // -> New feature, String or Function to format the url for right-click & open in new tab on link results
        display: ["Name"], // -> Improved feature, allows search in multiple item keys ["display1", "display2"]
        template: '<span>' +
            "<span class=\"name\"><b>{{Name}}</b></span><br />" +
            "</span>",
        emptyTemplate: function (query) {
            if (query.length > 0) {
                return "No results found for \"" + query + "\"";
            }
        },
        correlativeTemplate: false, // -> New feature, compile display keys, enables multiple key search from the template string
        source:
            source,
        callback: {
            onInit: null,
            onReady: null, // -> New callback, when the Typeahead initial preparation is completed
            onSearch: null, // -> New callback, when data is being fetched & analyzed to give search results
            onResult: null,
            onLayoutBuiltBefore: null, // -> New callback, when the result HTML is build, modify it before it get showed
            onLayoutBuiltAfter: null, // -> New callback, modify the dom right after the results gets inserted in the result container
            onNavigate: null, // -> New callback, when a key is pressed to navigate the results
            onMouseEnter: null,
            onMouseLeave: null,
            onClickBefore: null, // -> Improved feature, possibility to e.preventDefault() to prevent the Typeahead behaviors
            onClickAfter: null, // -> New feature, happens after the default clicked behaviors has been executed
            onSendRequest: null, // -> New callback, gets called when the Ajax request(s) are sent
            onReceiveRequest: null, // -> New callback, gets called when the Ajax request(s) are all received
            onSubmit: null,
            onClick: function (node, a, obj, e) {
                var id = obj.ID;
                var str = "#" + id;
                $(str).remove();
                addToPanel(obj);
                $(str).click();
                updateReview(id);
                $(str).scrollTo();
                toggleReview();
            }
        },
        selector: {
            container: "typeahead-container",
            group: "typeahead-group",
            result: "typeahead-result",
            list: "typeahead-list",
            display: "typeahead-display",
            query: "typeahead-query",
            filter: "typeahead-filter",
            filterButton: "typeahead-filter-button",
            filterValue: "typeahead-filter-value",
            dropdown: "typeahead-dropdown",
            dropdownCarret: "typeahead-caret",
            button: "typeahead-button",
            backdrop: "typeahead-backdrop",
            hint: "typeahead-hint"
        },
        debug: true
    };
    _typeAhead = $("#SearchRestName").typeahead(_options);
}



function togglePanel(e) {
    {
        var target = $(e.target).closest(".panel-item");
        if (target.length === 0) {
            target = $(e.target).closest(".panel-item-w");
        }

        if (target.hasClass('panel-item-w')) {
            removeButton(target);
            //$("#review").slideUp();
            target.removeClass('panel-item-w');
            target.addClass('panel-item');
        } else {
            prevItem.removeClass('panel-item-w');
            prevItem.addClass("panel-item");
            removeButton(prevItem);
            target.removeClass("panel-item");
            target.addClass('panel-item-w');
            addButton(target);
        }
        prevItem = target;
    }
}

function addButton(item) {
    var button = "<button type=\"button\" class=\"showReview\" >+</button>";
    item.append(button);
    toggleFunc();
}

function removeButton(item) {
    $(".showReview").remove();
}
function restaurantsSort() {
    restaurants.sort(function (a, b) {
        return b.stars - a.stars;
    });
}
function clearPanel() {
    $(".panelItems>*").remove();
}
function addToPanel(item) {
    var stars = "<div>";
    for (var j = 0; j < 5; j++) {
        if (j < item.stars) {
            stars += "<span><img style =\"width:20px\"; src = '/Content/Images/Customer/starIcon.png'>" + "</span>";
        } else {
            stars += "<span><img style =\"width:20px\"; src = '/Content/Images/Customer/starIcon-empty.gif'>" + "</span>";
        }
    }
    stars += " </div>";
    var address = "<div>" + item.address + " </div > ";
    var name = "<div>" + item.Name + " </div > ";
    var src = "<div id =\"" + item.ID + "\" class=\"panel-item\">" + stars + name + address + "</div>";
    var $item = $(src);
    $item.click(togglePanel);
    $(".panelItems").prepend($item);
}

function getActivePanelElement() {
    if (prevItem.hasClass("panel-item-w")) {
        return prevItem;
    } else {
        return null;
    }

}

