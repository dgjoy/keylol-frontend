(function () {
    keylolApp.directive("lolCy", () => {
        return {
            restrict: "A",
            priority: 98,
            link (scope, element, attrs) {
                attrs.$observe("lolCy", value => {
                    attrs.$set("cy", value);
                });
            },
        };
    });
}());
