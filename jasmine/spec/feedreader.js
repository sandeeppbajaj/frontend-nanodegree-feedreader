/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This test loops through allFeeds object and makes sure
    * that each feed has a URL defined and is not empty
    */
    it('has all feeds with non-empty url defined for each feed', function () {
      for(var i = 0;i < allFeeds.length; i++){
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.trim()).toBeTruthy();
      }
    });


    /* This test loops through allFeeds object and makes sure
    * that each feed has a name defined and is not empty
    */
    it('has all feeds with non-empty name defined for each feed', function () {
      for(var i = 0;i < allFeeds.length; i++){
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.trim()).toBeTruthy();
      }
    });
  });

  /* This suite is all about the Menu
  * its visibility and non-visibility
  */
  describe('Menu', function () {
    var bodyElem;

    /* Beforeeach make sure that we refer body with variable named bodyElem
    */
    beforeEach(function () {
      bodyElem = $('body');
    });

    /* This test ensures that menu is hidden by default.
    */
    it('is hidden by default', function () {
      expect(bodyElem.hasClass('menu-hidden')).toBe(true);
    });

    /* This test ensures that menu changes visibility when menu icon is clicked
    */
    it('hides and shows menu when menu icon is clicked', function () {
      var menuIcon = $('.menu-icon-link');
      menuIcon.click();
      expect(bodyElem.hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect(bodyElem.hasClass('menu-hidden')).toBe(true);
    });
  });

  /* Test Suite for Initial Enteries
  */
  describe('Initial Enteries', function () {

    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /* This test ensures that feed container has atleast one entry of feed
     */
    it('has atleast one entry for the feed', function () {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  /* Test Suite for New Feed Selection
  */
  describe('New Feed Selection', function () {
    var content;

    /* Storing the content of default loadFeed and then loading different feed
     */
    beforeEach(function (done) {
      content = $('.feed .entry').html();
      loadFeed(1, done);
    });

    /* This test ensures that content of feed entries changed when loadFeed is called
     */
    it('changes the content when loadFeed is called with different selection', function () {
      var newContent = $('.feed .entry').html();
      expect(newContent).not.toEqual(content);
    });

    /* After each is reseting view with original call for Udacity feeds
     */
    afterEach(function (done) {
      loadFeed(0, done);
    });
  });
}());
