(function () {
    "use strict";

    keylolApp.directive("simditor", [
        "upyun", "$interval", "$compile", "$timeout",
        function (upyun, $interval, $compile, $timeout) {
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
                            "alignment", "hr", "blockquote", "spoiler", "table", "|",
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

                    var updatePolicy = function () {
                        var policy = upyun.policy();
                        upyun.signature(policy).then(function (signature) {
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
                        $compile(element.find(".simditor-body").find("img"))(scope);
                        $timeout(function(){
                            simditor.trigger("valuechanged");
                        });
                    };

                    simditor.on("valuechanged", function () {
                        ngModel.$setViewValue(simditor.getValue());
                    });
                }
            };
        }
    ]);
})();