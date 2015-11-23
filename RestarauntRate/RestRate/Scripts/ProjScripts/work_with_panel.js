var restaurants = []; //temporary restaurants 
var testRest = [
    { Name: "Test0", adress: "TestAdress0", stars: 1 },
    { Name: "Test1", adress: "TestAdress1", stars: 2 },
    { Name: "Test2", adress: "TestAdress2", stars: 3 },
    { Name: "Test3", adress: "TestAdress3", stars: 4 }
];
var panel;
var state = { color: "rgba(55, 47, 45,0.4)", marginLeft: "0%" }
var prevItem;
var availabletypes = ['restaurant', 'bar', 'cafe'];


function panelInit() {

    panel = $(".mainpanel");
    prevItem = $(".panel-item").first();
    nearbyMarkerSearch();

};
function nearbyMarkerSearch() {
    restaurants = [];
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: marker.getPosition(),
        radius: 500,
        types:availabletypes
    }, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                restaurants.push({
                    Name: results[i].name,
                    adress: results[i].formatted_address,
                    stars: results[i].rating
                });
            }
        }
        initPanel(restaurants);
    });
}

function togglePanel(e) {
    {
        var target = $(e.target).closest(".panel-item");
        if (target.css("background-color") === "rgb(255, 255, 255)") {
           
            target.css("background-color", state.color);
            target.css("margin-left", state.marginLeft);
            
        } else {
            prevItem.css("background-color", state.color);
            prevItem.css("margin-left", state.marginLeft);
            target.css("background-color", "white");
            target.css("margin-left", "12%");
        }
        prevItem = target;
    }
}

function initPanel(items) {
    $(".panelItems>*").remove();
    for (var i = 0; i < items.length; i++) {
        var stars = "<div>";
        for (var j = 0; j < 5; j++) {
            if (j < items[i].stars) {
                stars += "<span><img style =\"width:20px\"; src =\"/Content/Images/Customer/starIcon.png\">" + "</span>";
            } else {
                stars += "<span><img style =\"width:20px\"; src =\"/Content/Images/Customer/starIcon-empty.gif\">" + "</span>";
            }
        }
        stars += " </div>";
        var adress = "<div>" + items[i].adress + " </div > ";
        var name = "<div>" + items[i].Name + " </div > ";
        var src = "<div class=\"panel-item\">" + stars + name + adress + "</div>";
        $(".panelItems").append(src);
    }
    $(".panel-item").click(togglePanel);

}

