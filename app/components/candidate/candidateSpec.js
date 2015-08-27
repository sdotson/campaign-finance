describe("candidate", function() {
  beforeEach(module("cfa.components.candidate"));
  beforeEach(module("cfa.services.candidates"));

  describe("/candidate route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route) {
      $httpBackend.whenGET('components/candidate/candidate.html').respond('...');
      $httpBackend.expectJSONP('http://transparencydata.org/api/1.0/entities.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=JSON_CALLBACK&search=JINDAL,%2520BOBBY&type=politician').respond({});

      $rootScope.$apply(function() {
          $location.path('/candidate/JINDAL,%20BOBBY');
      });
      expect($route.current.controller).toBe("CandidateCtrl");
      expect($route.current.loadedTemplateUrl).toBe("components/candidate/candidate.html");

      $httpBackend.verifyNoOutstandingExpectation();
    }));
  });
});