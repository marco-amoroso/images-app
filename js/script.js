/*jslint browser: true*/
/*global jQuery,Handlebars,apiKey*/

(function ($) {
  var loadedIds = [];
  var tagList, tagStrict;

  window.imageApp = window.imageApp || {};
  
  /**
   * Returns all query string parameters
   * @param {string} src Optional URL
   * @returns {Object}
   */

  function getQueryParameters(src) {
    var source, result = {};

    if (src) {
      source = src;
    } else {
      source = window.location.search;
    }

    var params = source.split(/\?|\&/);
    params.shift();

    $.each(params, function () {
      var param = this.split('=');
      result[param[0]] = param[1];
    });

    return result;
  }
  window.imageApp.getQueryParameters = getQueryParameters;
  
  function buildFlickrUrl(page, tags, strict) {
    var base = 'https://api.flickr.com/services/rest/?';
    
    var options = {
      method: 'flickr.photos.getRecent', // Default - `flickr.photos.search` does not accept empty tags
      per_page : 36,
      page: 1,
      api_key: apiKey,
      format: 'json',
      tag_mode: 'any', // OR search
      nojsoncallback: '1'
    };

    if (tags) {
      options.method = 'flickr.photos.search';
      options.tags = tags;
    }

    if (page) {
      options.page = page;
    }

    if (strict === '1') {
      options.tag_mode = 'all'; // AND search
    }

    // Build URL parameters to attach to Base URL
    var search = '';
    for (var key in options) {
      if (search !== '' && key !== 0) {
        search += '&';
      }
      search += key + '=' + encodeURIComponent(options[key]);
    }
    
    return base + search;
  }
  window.imageApp.buildFlickrUrl = buildFlickrUrl;

  function loadImages(page) {
    var url = buildFlickrUrl(page, tagList, tagStrict);

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

      // Update pagination information for the Infinite Scroll feature
      var pageCount = data.photos.page;
      $('.result').attr('data-page', pageCount);
    });
  }

  $(function () {
    var params = getQueryParameters();
    
    tagList = params.tags
      .replace(/[^\w\s]/gi, ' ')
      .split(' ');

    tagStrict = params.strict;

    loadImages();

    if (tagList) {
      // Update Tag List in Header
      var source = $('#tagslist-template').html();
      var template = Handlebars.compile(source);
      $('.tags-list').html(template(tagList));  
    }
  });

  // Simple Infinite Scroll feature
  $(window).simpleInfiniteScroll({
    success: function () {
      // Show Loader
      $('.spinner').show();
      
      var pageCount = $('.result').attr('data-page');
      loadImages(parseInt(pageCount) + 1);
    }
  });
}(jQuery));