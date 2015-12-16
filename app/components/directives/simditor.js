(function () {
    "use strict";

    keylolApp.directive("simditor", [
        "upyun", "$interval", "$compile",
        function (upyun, $interval, $compile) {
            return {
                restrict: "A",
                require: "ngModel",
                scope: {
                    options: "=simditor",
                    content: "=ngModel"
                },
                templateUrl: "components/directives/simditor.html",
                link: function (scope, element, attrs, ngModel) {
                    var options = {
                        toolbar: [
                            "paragraph", "|",
                            "bold", "italic", "underline", "strikethrough", "|",
                            "alignment", "hr", "blockquote", "table", "|",
                            "link", "image"
                        ],
                        tabIndent: false,
                        defaultImage: "assets/images/image-placeholder.svg",
                        upload: {
                            url: "//v0.api.upyun.com/keylol",
                            params: {},
                            fileKey: "file"
                        }
                    };
                    if (scope.options)
                        $.extend(options, scope.options);
                    options.textarea = element.find("textarea");
                    var simditor = new Simditor(options);

                    var updatePolicy = function (){
                        var policy = upyun.policy();
                        upyun.signature(policy).then(function(signature){
                            $.extend(simditor.uploader.opts.params, {
                                policy: policy,
                                signature: signature
                            });
                        });
                    };

                    updatePolicy();
                    var updatePolicyTimer = $interval(updatePolicy, 270000);

                    scope.$on("$destroy", function () {
                        $interval.cancel(updatePolicyTimer);
                        simditor.destroy();
                    });

                    ngModel.$render = function () {
                        simditor.setValue(ngModel.$viewValue);
                    };

                    simditor.on("valuechanged", function () {
                        ngModel.$setViewValue(simditor.getValue());
                    });
                }
            };
        }
    ]);
})();