describe("getQueryParameters", function() {
  
  it('should return the list of parameters from any given URL', function() {
    var getQueryParameters = window.imageApp.getQueryParameters;

    expect(getQueryParameters('http://www.flickr.com?tags=coffee')).toEqual({'tags':'coffee'});
    expect(getQueryParameters('http://www.flickr.com?tags=coffee,latte&strict=1')).toEqual({'tags':'coffee,latte', 'strict':'1'});
    expect(getQueryParameters('http://www.flickr.com')).toEqual({});
  });
});