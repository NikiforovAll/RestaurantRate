function initStarRating(strId) {
    var el = $(strId).rating({
        min: 1, max: 5, step: 1,
        size: 'lg', showClear: false,
        showCaption: true,
        glyphicon: true
        , rtl: true
    });
    el.rating("update",parseInt(strId.substr(strId.length-1,1))+1);
}