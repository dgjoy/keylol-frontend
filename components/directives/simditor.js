(function () {
    keylolApp.directive("simditor", [
        "upyun", "$interval", "$compile", "$timeout",
        (upyun, $interval, $compile, $timeout) => {
            return {
                restrict: "A",
                require: "ngModel",
                scope: {
                    options: "=simditor",
                    content: "=ngModel",
                },
                templateUrl: "components/directives/simditor.html",
                link (scope, element, attrs, ngModel) {
                    const options = {
                        toolbar: [
                            "paragraph", "|",
                            "bold", "italic", "underline", "strikethrough", "|",
                            "alignment", "hr", "blockquote", "spoiler", "table", "|",
                            "link", "image",
                        ],
                        tabIndent: false,
                        defaultImage: "assets/images/image-placeholder.svg",
                        upload: {
                            url: "//v0.api.upyun.com/keylol",
                            params: {},
                            fileKey: "file",
                        },
                        pasteImage: true,
                    };
                    if (scope.options)
                        $.extend(options, scope.options);
                    options.textarea = element.find("textarea");
                    const simditor = new Simditor(options);

                    function updatePolicy () {
                        const policy = upyun.policy();
                        upyun.signature(policy).then(signature => {
                            $.extend(simditor.uploader.opts.params, {
                                policy,
                                signature,
                            });
                        });
                    }

                    updatePolicy();
                    const updatePolicyTimer = $interval(updatePolicy, 100000);

                    scope.$on("$destroy", () => {
                        $interval.cancel(updatePolicyTimer);
                        simditor.destroy();
                    });

                    ngModel.$render = function () {
                        simditor.setValue(ngModel.$viewValue);
                        $compile(element.find(".simditor-body").find("img"))(scope);
                        $timeout(() => {
                            simditor.trigger("valuechanged");
                        });
                    };

                    simditor.on("valuechanged",() => {
                        ngModel.$setViewValue(simditor.getValue());
                    });
                },
            };
        },
    ]);
})();