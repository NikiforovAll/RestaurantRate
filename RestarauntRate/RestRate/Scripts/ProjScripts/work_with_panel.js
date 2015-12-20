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
//Test filed for console
//fillReview(1, "RestaurantForTesting", 3, 3, 3, "Lorem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor inreprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatatnon proident sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit,", "", [
//"http://lorempixel.com/400/100/",
//"http://lorempixel.com/400/200/",
//"http://lorempixel.com/400/300/",
//"http://lorempixel.com/400/400/"
//])
var minRad = 700;
var maxRad = 2000;
var panel;
var activeRest = { marker: null, infoWindow: null };
//var isItemChanged = false;
//var state = { color: "rgba(55, 47, 45,0.4)", marginLeft: "0%" }
var prevItem;
var availabletypes = ["restaurant", "bar", "cafe"];
var reviewItem;
var markersOnMap = false;
var _allRestaurants = [];

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
    for (var j = 1; j <= 3; j++) {
        initStarRating("#input-id" + j);
    }

    getAllRestaurants(true);

    //populateGallery(testitems);
    //TODO URL cohesion 

    //initGallery();

    //$(".reviewInfo").mCustomScrollbar({
    //    theme: "rounded-dots-dark",
    //    scrollInertia: 100,
    //    scrollButtons: {
    //        enable: true
    //    }
    //});

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
    $("#radiusSearch").click(function() {

    });
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            toggleReview();
        }
    });
    $("#radiusSearch").change(function() {
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
//TODO :add filling logic for review panel;
//TODO tost for not active revision action; finish review toggle logic 


function toggleReview(source) {
    if (isDragging) {
    } else {
        var activeEl = getActivePanelElement();
        if (!!activeEl) {

            //changing content stub
            var tmp = $(source.target).closest(".panel-item-w").attr("id");
            //console.log(tmp);
            updateReview(tmp);
            $("#review").slideDown();
            // infowindow

        } else {
            $("#review").slideUp();
            activeRest.marker.setAnimation(null);
            infoWindowRest.close();
        }
    }
}

function slideDownReview() {
    $("#review").slideUp();
    activeRest.marker.setAnimation(null);
    infoWindowRest.close();

}

function citySearch() {
    // TODO city search - get all restaurants;
    //nearbyMarkerSearch(maxRad); 
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
                //TODO make async sort
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
    _allRestaurants.forEach(function(el) {
        addToPanel(el);
    });
}
function getAllRestaurants(ismarkerInit) {
    restaurants = [];
    $.ajax({
        url: "/Home/GetAllRestaurants",
        //data: JSON.stringify({ "Longitude": 46.480679, "Latitude": 30.755164 }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (answer) {
            //console.log(answer.result); // для того чтобы увидеть JSON, который ты получил
            var geocoder = new google.maps.Geocoder();
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
                _allRestaurants.push(currRest);
                addToPanel(currRest);
                if (ismarkerInit) {
                geocodeAddress(geocoder, tmp.Address, tmp.RestarauntID, tmp.Name);
                
                }
            });
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
            //console.log(answer); // для того чтобы увидеть JSON, который ты получил
            var tmp = answer.result;
            console.log(tmp);
            fillReview(restID, tmp.Name, tmp.KitchenRate, tmp.InteriorRate, tmp.MaintenanceRate, tmp.Review, "", tmp.Images.map(function (el) { return el.Url }));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': tmp.Address }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    //console.log(results[0].geometry.location.lat());
                    map_recenter(results[0].geometry.location, $(window).width() / 3.8, 0);
                    var activeEl = markers.filter(function (el) {
                        return (el.get('ID') == restID ? true : false);
                    })[0];
                    activeRest.marker = activeEl;
                    activeEl.setAnimation(google.maps.Animation.BOUNCE);
                    //google.maps.event.trigger(activeEl, "click");
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
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
}
function fillReview(ID, name, foodRate, styleRate, serviceRate, reviewContext, currDate, Images) {
    starChangeValue(foodRate + 0.5, "input-id1");
    starChangeValue(styleRate + 0.5, "input-id2");
    starChangeValue(serviceRate + 0.5, "input-id3");
    var body = $("#reviewContext");
    body.html("<h4>" + name + "</h2>" + "<hr>");
    if (reviewContext) {
        body.append(reviewContext);
    } else {
        //body.html("");
    }
    var strDate = "";
    if (currDate === "") {
        var strDate = new Date().toJSON().slice(0, 10);
    }

    var date = $("#reviewDate").html("Visited on " + strDate);
    fillShareButton(ID, reviewContext, name, Images[0]);
    fillGalleryFromQuery(ID);
}
function fillGalleryFromQuery(restID) {

    $.ajax({
        url: "/Home/GetRestaurantGallery",
        data: JSON.stringify({ "restarauntID": restID }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (answer) {
            //console.log(answer); // для того чтобы увидеть JSON, который ты получил
            var tmp = answer.result;
            
            populateGallery(tmp.map(function(el) {
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
        text: "Share!"

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
function fillChat() {
    
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

        //if (target.css("background-color") === "rgb(255, 255, 255)") {
        //    target.css("background-color", state.color);
        //    target.css("margin-left", state.marginLeft);

        //} else {
        //    prevItem.css("background-color", state.color);
        //    prevItem.css("margin-left", state.marginLeft);
        //    target.css("background-color", "white");
        //    target.css("margin-left", "12%");
        //}

        prevItem = target;
    }
}

function addButton(item) {
    //<span><img src=\"/Content/Images/Customer/arrow1.png\" /></span>
    var button = "<button type=\"button\" class=\"showReview\" >R</button>";
    item.append(button);
    toggleFunc();
}

function removeButton(item) {
    $(".showReview").remove();
}
function restaurantsSort() {
    restaurants.sort(function (a, b) {
        //console.log("calling async");
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
    $(".panelItems").append($item);
}

function getActivePanelElement() {
    if (prevItem.hasClass("panel-item-w")) {
        return prevItem;
    } else {
        return null;
    }

}

