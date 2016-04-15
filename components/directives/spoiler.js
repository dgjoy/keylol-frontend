(function () {
    keylolApp.directive("spoiler", () => {
        return {
            restrict: "E",
            templateUrl: "components/directives/spoiler.html",
            transclude: true,
            link (scope, element) {
                element.addClass("actionable");
                element.click(() => {
                    element.addClass("expanded");
                    element.find(".hint").remove();
                    element.find(".content").children().unwrap();
                    element.off("click");
                });
            },
        };
    });
}());
