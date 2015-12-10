(function () {
    "use strict";

    keylolApp.directive("simditor", [
        "upyun", "$timeout", "$compile",
        function (upyun, $timeout, $compile) {
            return {
                restrict: "A",
                require: "ngModel",
                scope: {
                    content: "=ngModel"
                },
                transclude: true,
                templateUrl: "components/directives/simditor.html",
                link: function (scope, element, attrs, ngModel) {
                    var options = {
                        modules: {
                            toolbar: {container: null},
                            "click-expand": true,
                            "float-toolbar": true
                        },
                        theme: "snow",
                        formats: ["bold", "italic", "underline", "link", "image"]
                    };
                    if (attrs.simditor)
                        $.extend(options, scope.$eval(attrs.simditor));
                    var contentArea = element.find("[simditor-content]")[0];
                    var editor = new Simditor({
                        textarea: contentArea
                    });
                }
            };
        }
    ]);
})();