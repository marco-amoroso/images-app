describe("Flickr API Url builder", function() {
  // Mocking api key
  apiKey = 'abcd';

  describe("default API call without tags", function() {
    it("should use the default method getRecent", function() {
      var expected = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=36&page=1&api_key=abcd&format=json&tag_mode=any&nojsoncallback=1';
      var output = window.imageApp.buildFlickrUrl();
      expect(expected).toBe(output);
    });
  });    

  describe("API call with personalised tags", function() {
    it("should return the right API formatted url", function() {
      var expected = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=36&page=1&api_key=abcd&format=json&tag_mode=any&nojsoncallback=1&tags=coffee%2Clatte';
      var output = window.imageApp.buildFlickrUrl('1','coffee,latte');
      expect(expected).toBe(output);
    });
  });

  describe("API call with personalised tags and strict search - all tags must present", function() {
    it("should return the right API formatted url", function() {
      var expected = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=36&page=1&api_key=abcd&format=json&tag_mode=all&nojsoncallback=1&tags=coffee%2Clatte';
      var output = window.imageApp.buildFlickrUrl('1','coffee,latte','1');
      expect(expected).toBe(output);
    });
  });
});