(function () {
    keylolApp.directive("missiveQuote", () => {
        return {
            restrict: "E",
            templateUrl: "src/directives/missive-quote.html",
            scope: { reasonText: "=" },
            link () {},
        };
    });
}());
