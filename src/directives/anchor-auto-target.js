(function () {
    keylolApp.directive("a", () => {
        return {
            restrict: "E",
            link (scope, element, attrs) {
                attrs.$observe("href", () => {
                    const a = element[0];
                    if ((a.protocol.indexOf("http:") === 0 || a.protocol.indexOf("https:") === 0)
                        && location.host.indexOf(a.hostname) !== 0)
                        a.target = "_blank";
                });
            },
        };
    });
}());
