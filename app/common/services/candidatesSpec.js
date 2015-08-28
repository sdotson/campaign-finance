describe('candidatesService', function() {
  var candidatesService,
    $httpBackend,
    entitiesURL = "http://transparencydata.org/api/1.0/entities.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=JSON_CALLBACK&search=CLINTON,+HILLARY&type=politician",
    candidatesURL = 'http://stuartdotson.com/sunlightapi/candidates_json.php',
    contributorsURL = 'http://transparencydata.org/api/1.0/aggregates/pol/597e02e7d1b04d83976913da1b8e2998/contributors.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=JSON_CALLBACK',
    industriesURL = 'http://transparencydata.org/api/1.0/aggregates/pol/597e02e7d1b04d83976913da1b8e2998/contributors/industries.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=JSON_CALLBACK',
    typesURL = 'http://transparencydata.org/api/1.0/aggregates/pol/597e02e7d1b04d83976913da1b8e2998/contributors/type_breakdown.json?apikey=5fb0ee006d904354961ae1e83e80011b&callback=JSON_CALLBACK';

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
    var results;

    $httpBackend.expectGET(candidatesURL);

    candidatesService.getCandidates().then(function(response) {
      results = response;
    });

    $httpBackend.flush();

    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toEqual(25);
  });

  it('should return candidate details', function() {
    var results;

    jasmine.getJSONFixtures().fixturesPath = 'base/mocks';

    $httpBackend.expectJSONP(entitiesURL).respond(
        getJSONFixture('entities.json')
      );
    $httpBackend.expectJSONP(contributorsURL).respond(
        getJSONFixture('contributors.json')
      );;
    $httpBackend.expectJSONP(industriesURL).respond(
        getJSONFixture('industries.json')
      );;
    $httpBackend.expectJSONP(typesURL).respond(
        getJSONFixture('types.json')
      );;

    candidatesService.getCandidateDetails('CLINTON, HILLARY RODHAM').then(function(response) {
      results = response;
    });

    $httpBackend.flush();

    expect(results.contributors.length).toEqual(10);
    expect(results.industries.length).toEqual(10);
    expect(results.types.Individuals.length).toEqual(2);
    expect(results.types.PACs.length).toEqual(2);

  });
  

});