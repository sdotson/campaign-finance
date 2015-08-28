describe('directive: cfaImage', function() {
  var element, scope;

  beforeEach(module('campaignFinanceApp'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element =
        '<cfa-image src="./assets/images/clinton.jpg" class="summary-headshot"></cfa-image>';

    element = $compile(element)(scope);
    scope.$digest();


  }));

  it("should contain an image tag with the proper src", function() {
    expect(element.hasClass('active')).toBe(false);
    expect(element.find('img').length).toBe(1);
    expect(element.find('img').attr('src')).toBe('./assets/images/clinton.jpg');
  });
});