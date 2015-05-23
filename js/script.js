/*jslint browser: true*/
/*global jQuery,Handlebars,apiKey*/
(function ($) {
  var page = 30;
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=' + page + '&api_key=' + apiKey +'&tags=coffee&format=json&nojsoncallback=1';

  $.getJSON( url, function(data) {
    var source   = $('#image-template').html();
    var template = Handlebars.compile(source);
    var context = data.photos.photo;
    
    $('#result').append(template(context));

    // Add pagination information # TODO: Pagination
    var pagination = data.photos.page;
    $('#result').attr('data-page', pagination);
  });
}(jQuery));