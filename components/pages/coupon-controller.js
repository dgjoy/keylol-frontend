/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("CouponController", [
        "pageHead", "$scope", "union", "$http", "notification", "$location",
        function (pageHead, $scope, union, $http, notification, $location) {
            if (!union.$localStorage.user) {
                $location.url("/");
                return;
            }
            pageHead.setTitle("文券 - 其乐");

            union.summary = {
                head: {
                    mainHead: union.$localStorage.user.UserName,
                    subHead: union.$localStorage.user.GamerTag
                },
                avatar: union.$localStorage.user.AvatarImage,
                background: union.$localStorage.user.ProfilePointBackgroundImage,
                pointSum: {
                    type: "个人",
                    readerNum: union.$localStorage.user.SubscriberCount,
                    articleNum: union.$localStorage.user.ArticleCount
                },
                id: union.$localStorage.user.Id,
                url: "user/" + union.$localStorage.user.IdCode
            };
            union.coupon = {}
        }
    ]);
})();