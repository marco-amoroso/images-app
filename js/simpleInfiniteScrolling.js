/*global window,document,jQuery*/
(function ($) {

  $.fn.simpleInfiniteScroll = function(options) {
    var settings = $.extend({
      success: undefined, // callback function can be set via options
      failure: undefined // callback function can be set via options
    }, options);
  
    $(window).scroll(function() {
      if( $(window).scrollTop() == $(document).height() - $(window).height()) {
        // fire success callback
        if (settings.success) {
          settings.success(this);
        }
      } else {
        // fire failure callback
        if (settings.failure) {
          settings.failure(this);
        }
      }
    });
  };
}(jQuery));