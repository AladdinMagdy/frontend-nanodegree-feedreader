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


    it('URL is not empty', function() {
      allFeeds.forEach(function(el) {
        expect(el.url).toBeDefined();
        expect(el.url).not.toBe('');
      })
    });


    it('Name is not empty', function() {
      allFeeds.forEach(function(el) {
        expect(el.name).toBeDefined();
        expect(el.name).not.toBe('');
      })
    });
  });


  describe('The menu', function() {


    it('Menu is hidden', function() {
      var b = document.getElementsByTagName('body')[0];
      expect(b.classList.contains('menu-hidden')).toBe(true);
    });


    it('Menu is hidden/visible on click', function() {
      var b = document.getElementsByTagName('body')[0];
      var classAvailable = b.classList.contains('menu-hidden');
      var menu = document.getElementsByClassName('menu-icon-link');

      menu.click();
      expect(classAvailable).toBe(true);
      menu.click();
      expect(classAvailable).toBe(false);

    });

  });


  describe('Initial Entries', function() {


    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('loadFeed() completed its work', function() {
      var feed = document.getElementsByClassName('feed')[0];
      expect(feed.innerHTML).not.toBe('');
      expect(feed.innerHTML).toContain('<article class="entry">');
    });

  });

  describe('New Feed Selection', function() {

    var oldOne,
      newOne;

    beforeEach(function(done) {

      loadFeed(0, function() {
        oldOne = document.getElementsByClassName('feed')[0].innerHTML;

        loadFeed(1, function() {
          newOne = document.getElementsByClassName('feed')[0].innerHTML;
          done();
        });

      });
    });

    it('Content changes when a new feed is loaded by loadFeed()', function() {
      expect(oldOne).not.toEqual(newOne);
    });

  });
}());
