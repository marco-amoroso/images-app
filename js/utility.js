/*jslint browser: true*/
/*global jQuery*/

(function ($) {
  
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
}(jQuery));