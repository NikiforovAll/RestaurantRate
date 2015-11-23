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

    // Scroll init
    $(".content").mCustomScrollbar({
        theme: "rounded-dots-dark",
        scrollInertia:100,
        scrollButtons: {
            enable: true
        }
    });
    //TODO search lang
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
            clearPanel();
            console.log()
            for (var i = 0; i < results.length; i++) {

               //restaurants.push({
               //     Name: results[i].name,
               //     stars: results[i].rating,
               //     adress:   
                // });
                
                var request = { reference: results[i].reference };
                service.getDetails(request, function (details, status) {
                    var tmpItem = {
                        Name: details.name,
                        stars: (details.rating === undefined) ? 0 : details.rating,
                        adress: details.address_components[1].long_name+", "+details.address_components[0].long_name//.replace("вулиця","")
                    };
                    restaurants.push(tmpItem);

                    addToPanel(tmpItem);

                });
                //TODO make async sort
                restaurants.sort(function (a, b) { return a.rating - b.rating });

                //console.log(results[i].address_components.street_address);
            }
            //initPanel(restaurants);

        }
        //initPanel(restaurants);
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
    //for (var i = 0; i < items.length; i++) {
    //    addToPanel(items[i]);
    //}
    //$(".panel-item").click(togglePanel);


}

function clearPanel() {
    $(".panelItems>*").remove();
}
function addToPanel(item) {
    var stars = "<div>";
    for (var j = 0; j < 5; j++) {
        if (j < item.stars) {
            stars += "<span><img style =\"width:20px\"; src =\"/Content/Images/Customer/starIcon.png\">" + "</span>";
        } else {
            stars += "<span><img style =\"width:20px\"; src =\"/Content/Images/Customer/starIcon-empty.gif\">" + "</span>";
        }
    }
    stars += " </div>";
    var adress = "<div>" + item.adress + " </div > ";
    var name = "<div>" + item.Name + " </div > ";
    var src = "<div class=\"panel-item\">" + stars + name + adress + "</div>";
    var $item = $(src);
    $item.click(togglePanel);
    $(".panelItems").append($item);
}

// test 