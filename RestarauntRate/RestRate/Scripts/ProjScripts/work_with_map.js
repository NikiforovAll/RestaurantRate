var map;
var marker;
var request;
var markerImage;
var startZoom = 15;
var draggButton = "draggableButton";
//default = DataArt geoloc
var coordinates = { lat: 46.480679, lng: 30.755164 };
var dragState = false;
var isDragging = false;
var markers = [];
var infoWindowRest;
//entry point
$(document).ready(function () {

    //$.ajax({
    //    url: "/Home/GetAllRestaurants",
    //    //data: JSON.stringify({ "Longitude": 46.480679, "Latitude": 30.755164 }), 
    //    type: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: 'json',
    //    success: function (answer) {
    //        console.log(answer); // для того чтобы увидеть JSON, который ты получил 
    //        answer.forEach(function (el) {
    //            var tmp = el.RestIDNameFullAddressRestIDNameFullAddress;
    //            addToPanel({
    //                stars: (el.InteriorRate + el.KitchenRate + el.MaintenanceRate) / 3.0,
    //                adress: tmp.Address,
    //                name: tmp.Name,
    //                ID: tmp.RestarauntID

    //            });
    //        });
    //    },
    //    error: function () {

    //        console.log('Такие нюансы-романсы.. :(');
    //    },
    //    timeout: 10000
    //});

    initLocation();
    sleep(1000);
    //initMap();

});

// initiation
//TODO marshal markers of restaurants

function initGMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: startZoom,
        minZoom: 13,
        maxZoom: 19,
        draggable: true,

        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['coordinate']
        }
    });
}
function initMap() {

    initGMap();
    initMarker();
    //map.addListener('zoom_changed', function() {
    //    console.log(map.getZoom());
    //});
    panelInit();
    //TODO buind the output results of geoloc after clicking 
    google.maps.event.addListener(map, 'click', function (event) {
        if (!isDragging) {
            //return coordinates 
            //console.log("Map listener: \n" + "Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
            // return adress
            var locName;
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'location': event.latLng }, function (results, status) {

                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        locName = results[0].formatted_address;
                    }
                    else {
                        locName = "Undefined";
                    }
                } else {
                    locName = "Couldn't find location. Error code: " + status;
                }
                console.log(locName);
            });
        }
    });
    //map.addListener('click', function () {
    //    var coord = map.getProjection().fromPointToLatLng(new google.maps.Point(pageX, pageY))
    //    console.log( coord.lng()+ " " +coord.lat());
    //});
}
function initRestMarker(markerType, coords, ID, text) {
    var imgStr = '/Content/Images/Customer/';
    //if (markerType === 1) {
    //    imgStr += 'r.png';
    //}
    imgStr +=markerType+'.png' 
    var markerImage = {
        url: imgStr,
        scaledSize: new google.maps.Size(50, 40)
    };
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: markerImage
    });
    marker.set('ID', ID);
    var contentString = "#" + ID + "<br>" + "<b>Sup</b>?";
    var infowindow = new google.maps.InfoWindow({
        content: "<div style=\"color:rgb(247, 234, 0);font-style: italic bold;padding:3px;font-size:1.5em\">" + text + "<div>"
    });
    marker.set('infoWindow', infowindow);
    marker.addListener('click', function () {

        if (infoWindowRest)
            infoWindowRest.close();
        infoWindowRest = this["infoWindow"];
        if (activeRest.marker)
        activeRest.marker.setAnimation(null);
        //infoWindows.push({ ID: ID, infowidnow:infowindow.open(map, marker) });
        infowindow.open(map, marker);
        updateReview(ID);
        $("#review").slideDown();
    });
    markers.push(marker);
};


function selectMarker() {
}
function initMarker() {

    var markerImage = {
        url: '/Content/Images/Customer/pin56.png',
        scaledSize: new google.maps.Size(60, 60)
    };
    marker = new google.maps.Marker({
        position: coordinates,
        draggable: dragState,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: markerImage
    });
    // bind event on default butt 
    $("#" + draggButton).bind("click", function () {
        //console.log("I was pushed");
        switchDraggable();
        updateLocation();
    });
    marker.addListener('position_changed', function () {
        setMapPosition();
    });
}

function initLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            marker.setPosition(coordinates);
            setMapPosition();
            //nearbyMarkerSearch(minRad);
            //initMap();
        }, showAlert, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }
    initMap();
}

// fetch position depending on your true geoLoc 
function updateLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
    }
    setMapPosition();
    //console.log(coordinates);
}

//  
function switchDraggable() {
    //console.log("switched");

    isDragging = !isDragging;
    //if (isDragging) {
    //    $(".reviewInfo button").trigger();
    //}
    if (marker.getDraggable()) {
        marker.setDraggable(false);
        //$("#" + draggButton).css("background-color", "#900");
        marker.setAnimation(null);
        if ($("#radiusSearch").is(":checked")) {
            getAllRestaurantsInRadius(marker.position.lat(), marker.position.lng());
        }
        //nearbyMarkerSearch(minRad);
    }
    else {
        $("#review").slideUp();
        //$("#" + draggButton).css("background-color", "green");
        if(activeRest.marker)
        activeRest.marker.setAnimation(null);
        if (infoWindowRest) {
            infoWindowRest.close();
        }
        marker.animation = google.maps.Animation.BOUNCE;
        marker.setDraggable(true);


    }

}
// centers the map on your marker 
function setMapPosition() {
    //map.setCenter(marker.getPosition());
    //more  smoother 
    map.panTo(marker.getPosition());
    //getAllRestaurants();
    // nearbyMarkerSearch();
    //initPanel();
}
//secondary
function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) { }
}
function showAlert() {
    //alert("Cannot find your location");
    //  initMap();
}


