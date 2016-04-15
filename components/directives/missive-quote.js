(function () {
    keylolApp.directive("missiveQuote", () => {
        return {
            restrict: "E",
            templateUrl: "components/directives/missive-quote.html",
            scope: { reasonText: "=" },
            link () {},
        };
    });
}());
