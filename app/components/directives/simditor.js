(function () {
    "use strict";

    keylolApp.directive("simditor", [
        "upyun", "$timeout", "$compile",
        function (upyun, $timeout, $compile) {
            return {
                restrict: "A",
                require: "ngModel",
                scope: {
                    options: "=simditor",
                    content: "=ngModel"
                },
                templateUrl: "components/directives/simditor.html",
                link: function (scope, element, attrs, ngModel) {
                    var options = {};
                    if (attrs.simditor)
                        $.extend(options, scope.options);
                    options.textarea = element.find("textarea");
                    var editor = new Simditor(options);

                    scope.$on("$destroy", function () {
                        editor.destroy();
                    });

                    ngModel.$render = function () {
                        editor.setValue(ngModel.$viewValue);
                    };

                    editor.on("valuechanged", function () {
                        ngModel.$setViewValue(editor.getValue());
                    });
                }
            };
        }
    ]);
})();