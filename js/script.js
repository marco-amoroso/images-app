/*jslint browser: true*/
/*global jQuery,Handlebars*/

(function ($) {
  var loadedIds = [];
  var tagList, tagStrict;

  window.imageApp = window.imageApp || {};

  function loadImages(page) {
    var url = window.imageApp.buildFlickrUrl(page, tagList, tagStrict),
      messageBox;

    // Show Loader
    $('.spinner').show();

    $.getJSON( url, function(data) {
      var source = $('#image-template').html(),
        template = Handlebars.compile(source),
        newPhotos = [];

      if (data.photos.pages === 0) {
        // Add a flag to stop any future requests
        $('.result').attr('data-load-images', 'false');
        messageBox = 'There are no photos that match this search criteria';
      
      } else {
        
        $.each(data.photos.photo, function() {
          if ($.inArray(this.id, loadedIds) === -1) {
            // The photo hasn't been loaded before then we add it to the queue
            newPhotos.push(this);
            // Keep track of what has been loaded already
            loadedIds.push(this.id);
          }
        });
        
        $('.result .list-image').append(template(newPhotos));

        // Update pagination information for the Infinite Scroll feature
        $('.result').attr('data-page', data.photos.page);

        // Check if the current page is equal to the total pages available 
        if (data.photos.page === data.photos.pages) {
          // Add a flag to stop any future requests
          $('.result').attr('data-load-images', 'false');
          
          messageBox = 'There are no more photos for this search';
        }
      }

      // Message Box if any
      if (messageBox) {
        $('.result__box').show().html(messageBox);
      }
      
      // Hide Loader
      $('.spinner').hide();

    });
  }
  window.imageApp.loadImages = loadImages;

  $(function () {
    var params = window.imageApp.getQueryParameters();

    // Tags
    if (params.tags) {
      
      var tagListValue = params.tags.replace(/[^\w\s]/gi, ' ');
      $('input[name=tags]').val(tagListValue);
      
      tagList = tagListValue.split(' ');

      var tagObj = {
        tags: tagList,
        separator: (params.strict === '1') ? '&' : 'or' 
      };

      // Update Tag List in Header
      var source = $('#tagslist-template').html();
      var template = Handlebars.compile(source);
      $('.tags-list').html(template(tagObj));
    }

    // Keep last search history
    if (params.strict === '1') {
      tagStrict = params.strict;
      $('input[name=strict]').attr('checked', true);  
    }

    //Preload images - Recent method
    loadImages();

    // Simple Infinite Scroll feature
    $(window).simpleInfiniteScroll({
      success: function () {
        
        // Check if we need to make the AJAX call
        var loadFlag = $('.result').attr('data-load-images');
        if (loadFlag === 'false') {
          return;
        }

        var pageCount = $('.result').attr('data-page');
        if (pageCount) {
          loadImages(parseInt(pageCount) + 1);
        }
      }
    });
  });
}(jQuery));
