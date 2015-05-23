/*jslint browser: true*/
/*global window,Handlebars,jQuery*/

(function ($) {

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

  // Dynamic Tags
  // $(document).on('sumbit', '.tag-search', function(e){
  //   e.preventDefault();

  //   var tags = this.find('.tag-search--input').val();
  //   var list = tags.split(' ');

  //   console.log(list);
  // });

  $(function () {
    var params = getQueryParameters();
    
    var tagList = params.tags
      .replace(/[^\w\s]/gi, ' ')
      .split(' ');

    var source = $('#tagslist-template').html();
    var template = Handlebars.compile(source);

    //console.log(tagList);

    $('.tags-list').html(template(tagList));
  });

}(jQuery));
