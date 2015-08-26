describe("home", function() {
  beforeEach(module("cfa.components.home"));

  describe("/ route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route, candidatesService) {
      $httpBackend.whenGET('components/home/home.html').respond('...');
      $httpBackend.expectGET('http://stuartdotson.com/sunlightapi/candidates_json.php').respond({});

      $rootScope.$apply(function() {
          $location.path('/');
      });
      
      expect($route.current.controller).toBe("HomeCtrl");
      expect($route.current.loadedTemplateUrl).toBe("components/home/home.html");

      $httpBackend.verifyNoOutstandingExpectation();
    }));
  });
});