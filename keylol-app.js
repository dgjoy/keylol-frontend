(function () {
    "use strict";

    var app = angular.module("KeylolApp", [
        // Angular modules 
        //"ngAnimate",
        "ngRoute",
        "ngAnimate",

        // Custom modules

        // 3rd Party Modules
        "angularMoment",
        "ngStorage",
        "ngFileUpload",
        "ab-base64",
        "angulartics"
    ]);
    app.config([
        "$routeProvider", "$locationProvider", "utilsProvider", "pageTitleProvider", "$localStorageProvider",
        "$httpProvider", "$compileProvider", "$analyticsProvider", "$anchorScrollProvider",
        function ($routeProvider, $locationProvider, utilsProvider, pageTitleProvider, $localStorageProvider,
                  $httpProvider, $compileProvider, $analyticsProvider, $anchorScrollProvider) {
            $locationProvider.html5Mode(true);

            $anchorScrollProvider.disableAutoScrolling();
            $routeProvider.when("/", {
                templateUrl: "components/pages/home.html",
                controller: "HomeController"
            }).when("/home", {
                redirectTo: "/"
            }).when("/article/:author/:article", {
                templateUrl: "components/pages/article.html",
                controller: "ArticleController"
            }).when("/point/:pointIdCode", {
                templateUrl: "components/pages/point.html",
                controller: "PointController"
            }).when("/user/:userIdCode", {
                templateUrl: "components/pages/point.html",
                controller: "PointController"
            }).when("/latest", {
                templateUrl: "components/pages/search-results.html",
                controller: "AllArticlesController"
            }).when("/subscriptions", {
                templateUrl: "components/pages/search-results.html",
                controller: "SubscriptionsController"
            }).when("/readers", {
                templateUrl: "components/pages/search-results.html",
                controller: "ReadersController"
            }).when("/post-office", {
                templateUrl: "components/pages/post-office.html",
                controller: "PostOfficeController"
            }).when("/post-office/:type", {
                templateUrl: "components/pages/post-office.html",
                controller: "PostOfficeController"
            }).when("/search/:searchType/:keyword", {
                templateUrl: "components/pages/search-results.html",
                controller: "SearchResultsController"
            }).when("/related/:idCode/:type", {
                templateUrl: "components/pages/search-results.html",
                controller: "RelatedController"
            }).when("/coupon", {
                templateUrl: "components/pages/coupon.html",
                controller: "CouponController"
            }).otherwise({
                templateUrl: "components/pages/not-found.html",
                controller: "NotFoundController"
            });

            pageTitleProvider.setLoadingTitle("其乐 - 甄选并传递游戏的价值");

            utilsProvider.config({
                geetestId: "accdaf35b04e4ad5bf4980c7d30edf87"
            });

            $localStorageProvider.setKeyPrefix("keylol-");

            $httpProvider.defaults.withCredentials = true;

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|steam):/);

            window._czc = [];
            _czc.push(["_setAutoPageview", false]);

            $analyticsProvider.registerPageTrack(function (path) {
                _czc.push(["_trackPageview", path]);
            });

            $analyticsProvider.registerEventTrack(function (action, prop) {
                _czc.push([
                    "_trackEvent",
                    prop.category || "未分类",
                    action,
                    prop.label,
                    prop.value,
                    prop.nodeid
                ]);
            });
        }
    ]);
    app.run(["amMoment", function(amMoment) {
        amMoment.changeLocale("zh-cn");
    }]);
    app.constant("amTimeAgoConfig", {
        fullDateThreshold: 1,
        fullDateFormat: "YYYY-MM-DD HH:mm",
        titleFormat: "YYYY-MM-DD HH:mm:ss [GMT]Z"
    });
    app.constant("angularMomentConfig", {
        timezone: "Asia/Shanghai"
    });

    window.keylolApp = app;
})();