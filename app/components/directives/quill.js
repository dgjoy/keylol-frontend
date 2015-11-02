(function () {
    "use strict";

    keylolApp.directive("quill", [
        "upyun", "$timeout",
        function (upyun, $timeout) {
            return {
                restrict: "A",
                require: "ngModel",
                scope: {
                    content: "=ngModel"
                },
                transclude: true,
                templateUrl: "components/directives/quill.html",
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
                    if (attrs.quill)
                        $.extend(options, scope.$eval(attrs.quill));
                    var toolbar = element.find("[quill-toolbar]")[0];
                    if (toolbar) {
                        options.modules.toolbar.container = toolbar;
                    } else {
                        delete options.modules.toolbar;
                    }
                    var contentArea = element.find("[quill-content]")[0];
                    var quill = new Quill(contentArea, options);
                    quill.addFormat("blockquote", {tag: "BLOCKQUOTE", type: "line", exclude: "subtitle"});
                    quill.addFormat("subtitle", {tag: "H1", prepare: "heading", type: "line", exclude: "blockquote"});
                    if (!scope.content) {
                        ngModel.$setViewValue(quill.getHTML());
                    }
                    ngModel.$render = function () {
                        quill.setHTML(ngModel.$viewValue || "");
                    };

                    quill.on("text-change", function () {
                        ngModel.$setViewValue(quill.getHTML());
                    });

                    var currentSelectionRange = {start: 0, end: 0};

                    quill.on("selection-change", function (range) {
                        if (range)
                            currentSelectionRange = range;
                    });

                    var noticeMessageTimeout;
                    var noticeMessage = function (message) {
                        scope.noticeMessage = message;
                        $timeout.cancel(noticeMessageTimeout);
                        noticeMessageTimeout = $timeout(function () {
                            scope.noticeMessage = null;
                        }, 3000);
                    };

                    scope.uploadImages = function (files) {
                        if (files) {
                            noticeMessage("图片上传中");
                            var insertIndex = currentSelectionRange.start;
                            var policy = upyun.policy();
                            upyun.signature(policy).then(function (signature) {
                                for (var i = files.length - 1; i >= 0; --i) {
                                    if (files[i]) {
                                        upyun.upload(files[i], policy, signature).then(function (response) {
                                            quill.insertEmbed(insertIndex, "image", "//keylol.b0.upaiyun.com/" + response.data.url);
                                        });
                                    }
                                }
                            });
                        }
                    };
                    noticeMessage("双击文本框扩展/收缩编辑区域");
                }
            };
        }
    ]);
})();