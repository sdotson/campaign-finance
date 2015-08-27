describe("candidate", function() {
  beforeEach(module("cfa.components.candidate"));

  describe("/candidate route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route, candidatesService) {
      $httpBackend.whenGET('components/home/home.html').respond('...');
      $httpBackend.expectGET('http://stuartdotson.com/sunlightapi/candidates_json.php').respond({});

      $rootScope.$apply(function() {
          $location.path('/');
      });
      expect($route.current.controller).toBe("CandidateCtrl");
      expect($route.current.loadedTemplateUrl).toBe("components/candidate/candidate.html");

      $rootScope.$apply(function() {
          $location.path('/asdfasdfasdfasdfsadfdsaf');
      });
      expect($route.current.controller).toBe("CandidateCtrl");
      expect($route.current.loadedTemplateUrl).toBe("components/candidate/candidate.html");

      $httpBackend.verifyNoOutstandingExpectation();
    }));
  });
});