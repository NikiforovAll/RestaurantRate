var tmp;
var galleryItems = [];

function initGallery(i) {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array

    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };
    
    // tmp1 = galleryItems.slice(0, i);
    // tmp2 = galleryItems.slice(i+1, galleryItems.length);
    var tmp = galleryItems;
    for (var j = 0; j < galleryItems.length - i -1; j++) {
        tmp = shiftRight(tmp);
    }
    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default,tmp, options);
    //gallery.goTo(i);
    gallery.init();
}

function shiftRight(arr) {
    var temp = new Array();
    temp.push(arr[arr.length - 1]);
    for (var i = 0; i <= arr.length - 2; i++) temp.push(arr[i]);
    return temp;
}

function populateGallery(links) {
    galleryItems = [];
    $(".my-gallery").empty();
    for (var j = 0; j < links.length; j++) {
        var img = new Image();
        img.onload= function ()
        {
            galleryItems.push({
                src: this.src,
                w: this.width,
                h: this.height
            });
        };
        img.src = links[j];
      
    }
    var row = "";
    var row_el;
    var item;
    for (var i = 0; i < links.length; i++) {
        //refilling logic??
        if (i % 2 === 0) {
            row_el = $("<div class=\"Row\"></div>");

        }
        var val = $("<div class=\"Column gallery-Img\"></div>").appendTo(row_el);

        var val1 = $("<img src=\"" + links[i] + "\"" + " itemprop=\"thumbnail\" alt=\"Image description\" />");
        val1.attr("id", "gimg"+i);
        val1.click(function(source) {
            var tmp = $(source.target).attr("id").replace("gimg", "");
            //alert(tmp);
            initGallery(tmp);
        });
        var val2 = val1.prependTo(val);
        $(".my-gallery").append(row_el);
        //indexing

        //row += "<div class=\"Column gallery-Img\">";
        //row += "<figure itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">";
        //row += "<img src=\""+  links[i].src + "\"" + " itemprop=\"thumbnail\" alt=\"Image description\" />";
        //row += "</figure>";
        //row += "</div>";
        //if (i % 2 === 1) {
        //    row += "<\div>";
        //    item = $(row);
        //    item.click(initGallery);
        //    $(".my-gallery").append(row);

        //}
        //else if (i === links.length - 1) {
        //    row += "<\div>";
        //    item = $(row);
        //    item.click(initGallery);
        //    $(".my-gallery").append(row);
        //    }
    }
    
    
}

