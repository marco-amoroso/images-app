/*jslint browser: true*/
/*global jQuery,Handlebars,apiKey*/

(function ($) {
  var loadedIds = [];

  function loadImages(page) {
    var perPage = 36; // divisible by 2,3 and 4.
    page = page || 1;
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&page=' + page + '&per_page=' + perPage + '&api_key=' + apiKey +'&tags=coffee&format=json&nojsoncallback=1';

    $.getJSON( url, function(data) {
      var source = $('#image-template').html(),
        template = Handlebars.compile(source),
        newPhotos = [];

      $.each(data.photos.photo, function() {
        if ($.inArray(this.id, loadedIds) === -1) {
          
          // The photo hasn't been loaded before then we add it to the queue
          newPhotos.push(this);

          // Keep track of what has been loaded already
          loadedIds.push(this.id);
        }
      });
      
      // Hide Loader
      $('.spinner').hide();

      $('.result').append(template(newPhotos));

      // Add pagination information for the Infinite Scroll feature
      var pageCount = data.photos.page;
      $('.result').attr('data-page', pageCount);
    });
  }

  // Simple Infinite Scroll feature
  $(window).simpleInfiniteScroll({
    success: function () {
      // Show Loader
      $('.spinner').show();
      
      var pageCount = $('.result').attr('data-page');
      loadImages(parseInt(pageCount) + 1);
    }
  });

  loadImages();
}(jQuery));