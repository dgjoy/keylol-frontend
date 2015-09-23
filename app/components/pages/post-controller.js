/**
 * Created by Rex on 15/9/23.
 */
(function() {
    "use strict";

    keylolApp.controller("PostController", [
        "pageTitle", "$scope", "union",
        function(pageTitle, $scope, union) {
            pageTitle.set("邮政 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "邮政服务",
                    subHead: "Postal Services"
                },
                background: {
                    url: "//keylol.b0.upaiyun.com/post-summary-header.png!profile.point.background"
                },
                defaultSum: {
                    text: "社区功能页面"
                }
            };
        }
    ]);
})();