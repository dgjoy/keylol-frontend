(function () {
    keylolApp.directive("bindHtmlCompile", ["$compile", $compile => {
        return {
            restrict: "A",
            link (scope, element, attrs) {
                scope.$watch(() => {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, value => {
                    // In case value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    let compileScope = scope;
                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    }
                    $compile(element.contents())(compileScope);
                });
            },
        };
    }]);
}());
