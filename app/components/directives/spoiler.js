(function () {
    "use strict";

    keylolApp.directive("spoiler", [
        function () {
            return {
                restrict: "E",
                templateUrl: "components/directives/spoiler.html",
                transclude: true,
                link: function (scope, element) {
                    element.addClass("actionable");
                    element.click(function () {
                        element.addClass("expanded");
                        element.find(".hint").remove();
                        element.find(".content").children().unwrap();
                        element.off("click");
                    });
                }
            };
        }
    ]);
})();