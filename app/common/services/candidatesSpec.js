describe('candidatesService', function() {
  var candidatesService,
    $httpBackend,
    entitiesURL = "http://transparencydata.com/api/1.0/entities.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=angular.callbacks._0&search=CLINTON,+HILLARY&type=politician",
    candidatesURL = 'http://stuartdotson.com/sunlightapi/candidates_json.php',
    contributorsURL = 'http://transparencydata.com/api/1.0/aggregates/pol/597e02e7d1b04d83976913da1b8e2998/contributors.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=angular.callbacks._1',
    industriesURL = 'http://transparencydata.com/api/1.0/aggregates/pol/597e02e7d1b04d83976913da1b8e2998/contributors/industries.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=angular.callbacks._2',
    typesURL = 'http://transparencydata.com/api/1.0/aggregates/pol/597e02e7d1b04d83976913da1b8e2998/contributors/type_breakdown.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=angular.callbacks._3';

    beforeEach(module('cfa.services.candidates'));

  beforeEach(inject(function($injector)  {
    candidatesService = $injector.get('candidatesService');
    $httpBackend = $injector.get('$httpBackend');

    jasmine.getJSONFixtures().fixturesPath = 'base/mocks';

    $httpBackend.whenGET(candidatesURL)
      .respond(
        getJSONFixture('candidates.json')
      );

    $httpBackend.whenGET(entitiesURL)
      .respond(
        getJSONFixture('entities.json')
      );

    $httpBackend.whenGET(contributorsURL)
      .respond(
        getJSONFixture('contributors.json')
      );

    $httpBackend.whenGET(industriesURL)
      .respond(
        getJSONFixture('industries.json')
      );

    $httpBackend.whenGET(typesURL)
      .respond(
        getJSONFixture('types.json')
      );

  }));

  it('should exist', function() {
    expect(candidatesService).toBeDefined();
  });

  it('should return list of candidates', function() {
    $httpBackend.expectGET(candidatesURL);

    candidatesService.getCandidates();
    $httpBackend.flush();

    expect(candidatesService.candidates.length).toBeGreaterThan(0);
    expect(candidatesService.candidates.length).toEqual(15);
  });

  xit('should return country object', function() {
    $httpBackend.expectGET(candidatesURL);

    candidatesService.getcandidates();
    $httpBackend.flush();
    candidatesService.getCountry('France');
    expect(candidatesService.currentCountry.countryName).toEqual('France');
    candidatesService.getCountry('asdfsdf');
    expect(candidatesService.currentCountry).toEqual(-1);

  });

  xit('should return country details', function() {
    candidatesService.getCountryDetails('Belgium', 'Brussels');
    $httpBackend.flush();
    
    expect(candidatesService.currentCountry.countryName).toEqual('Belgium');
    candidatesService.getCountry('asdfsdf');
    expect(candidatesService.currentCountry).toEqual(-1);

  });
  

});