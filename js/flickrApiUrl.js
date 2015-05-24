/*jslint browser: true*/
/*global apiKey*/

(function () {
  
  window.imageApp = window.imageApp || {};

  /**
   * Buidls the Flickr API request
   * There are 2 main methods, the `getRecent` one and the `search` method.
   * The `getecent` is used on the first load and it uses no tags, while the
   * method `search` requires the use of tags.
   * @param {string} page Optional Pagination (default 1)
   * @param {array} tags Optional List of tags (default none)
   * @param {string} strict Optional Flag  
   * @returns {Object}
   */
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
}());
