/*jslint browser: true*/
/*global jQuery*/

(function ($) {
  // Check HTML5 History compatibility
  if(!!(window.history && history.pushState)) {
    $('.tag-search__history--forward').click(function(e){
      e.preventDefault();
      window.history.forward();
    });

    $('.tag-search__history--back').click(function(e){
      e.preventDefault();
      window.history.back();
    });
  } else {
    $('.tag-search__history').hide();
  }
}(jQuery));
