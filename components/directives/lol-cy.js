(function () {
    "use strict";

    keylolApp.directive("lolCy", [
        function () {
            return {
                restrict: "A",
                priority: 98,
                link: function (scope, element, attrs) {
                    attrs.$observe("lolCy", function (value) {
                        attrs.$set('cy', value);
                    });
                }
            };
        }
    ]);
})();