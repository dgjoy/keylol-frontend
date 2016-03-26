/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("PostOfficeController", [
        "pageTitle", "$scope", "union", "$http", "notification", "utils", "$timeout", "$location",
        function (pageTitle, $scope, union, $http, notification, utils, $timeout, $location) {
            if(!union.$localStorage.user){
                $location.url("/");
                return;
            }
            pageTitle.set("邮政中心 - 其乐");
            $scope.union = union;
            function changeActive(activeObject) {
                var actions = timeline.actions;
                for (var i = 0; i < actions.length; i++) {
                    actions[i].active = false;
                }
                activeObject.active = true;
            }

            var timeline = {
                title: {
                    mainTitle: "邮政中心",
                    subTitle: "Post Office"
                },
                loadAction: function () {
                    timeline.loadingLock = true;
                },
                loadingLock: true,
                notArticle: true,
                hasDeleteButton: true,
                clickable: true,
                entries: []
            };

            union.timeline = timeline;
            union.spolightActive = 0;
        }
    ]);
})();