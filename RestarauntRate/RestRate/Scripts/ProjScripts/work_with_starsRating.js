function initStarRating(strId) {
    var el = $(strId).rating({
        min: 1, max: 5, step: 1,
        size: 'xs',
        readonly:true,
        showClear: false,
        stars: 5,
        showCaption: false
        //glyphicon:false 
        //rtl: true
        //symbol: "\uf0f4",
        //glyphicon: false,
        //ratingClass: "rating-fa" // the rating class will ensure font awesome icon rendering
        //defaultCaption: "{rating} cups",
        //starCaptions: {}
    });
    
    el.rating("update", parseInt(strId.substr(strId.length - 1, 1)) + 2);
}