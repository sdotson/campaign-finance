(function() {
    'use strict';

    angular.module('cfa.directives.cfaImage', [])
        .directive('cfaImage', cfaImage);

    cfaImage.$inject = [];
    function cfaImage() {
        return {
            restrict: "E",
            link: function(scope, element, attrs) {
                if (attrs.src) {
                    var img = new Image();
                    img.onload = function() {
                        element.addClass('active');
                    };
                    element.append(img);            
                    img.src = attrs.src;
                };  
            }
        }
    }

})();
