/**
 * Author: Allen Linatoc
 * Created: 10/7/2015 10:00 PM
 * 
 * 
 * Required:
 * 
 * - jQuery
 * - Bootstrap JS
 */

var Overlay = {
    
    current_id: null,
    
    visible: false,
   
    xhr: null,
    
    /**
     * Show an overlay
     * 
     * @param {int} _id Target "data-overlay" ID 
     * @param {string} _message [optional] The message to be shown
     * @param {XMLHttpRequest} _xhr [optional] XMLHttpRequest object to be stored
     */
    show: function(_id, _message, _xhr) 
    {
        if (_id == undefined)
            throw "Required parameter '_id' not specified.";
        
        if (!Overlay.visible)
            Overlay.visible = true;
        
        Overlay.current_id = _id;
        
        overlayElm = '[data-overlay="' + _id.trim('_') + '"]';
        var cancelBtn = overlayElm + ' ' + 'button[data-overlay-btn]';
        var messageLbl = overlayElm + ' ' + 'span[data-overlay-msg]';
        
        $(overlayElm).fadeIn(500);
        $(overlayElm).data('xhr', _xhr || null);
        Overlay.xhr = $(overlayElm).data('xhr');
        
        
        // Show CANCEL button if there's XHR object
        
        if ($(overlayElm).data('xhr'))
        {
            $(cancelBtn).show().on('click', function() {
                Overlay.hide(_id);
            });
        }
        
        
        // Show message, if there is, otherwise use default
        
        $(messageLbl).text(_message || "Processing your request");
    },
    
    /**
     * Hide an overlay
     * 
     * @param {int} _id Target "data-overlay" ID
     * @param {bool} _abort_xhr [optional] Boolean value if XHR request stored should be aborted. Default is TRUE.
     */
    hide: function(_id, _abort_xhr)
    {
        if (!Overlay.visible)
            return;
        
        overlayElm = '[data-overlay="' + _id.trim('_') + '"]';
        _abort_xhr =  _abort_xhr || true;
        var cancelBtn = overlayElm + ' ' + 'button[data-overlay-btn]';
        
        $(overlayElm).fadeOut(300);
        
        // If XHR should be aborted
        
        if (_abort_xhr === true && Overlay.xhr && Overlay.xhr.readystate != 4)
        {
            Overlay.xhr.abort();
        }
        
        
        // Reset event handler
        
        $(cancelBtn).off('click').hide();
        
        Overlay.xhr = null;
        Overlay.visible = false;
    }
    
};

$(document)

        .ready(function() {
    
            // Initially hide all overlay controls

            $('[data-overlay]').hide();
            $('button[data-overlay-btn]').hide();

        })
        
        .keyup(function(e) {
            
            if (Overlay.visible && e.keyCode == 27 && Overlay.xhr)
                Overlay.hide('overlay');
            
        });