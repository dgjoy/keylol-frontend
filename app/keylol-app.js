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
        "$httpProvider", "$compileProvider", "$analyticsProvider",
        function ($routeProvider, $locationProvider, utilsProvider, pageTitleProvider, $localStorageProvider,
                  $httpProvider, $compileProvider, $analyticsProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when("/home", {
                templateUrl: "components/pages/home.html",
                controller: "HomeController"
            }).when("/", {
                templateUrl: "components/pages/alpha-entrance.html",
                controller: "AlphaEntranceController"
            }).when("/article/:author/:article", {
                templateUrl: "components/pages/article.html",
                controller: "ArticleController"
            }).when("/point/:pointIdCode", {
                templateUrl: "components/pages/point.html",
                controller: "PointController"
            }).when("/user/:userIdCode", {
                templateUrl: "components/pages/point.html",
                controller: "PointController"
            }).when("/user/:userIdCode/publications", {
                templateUrl: "components/pages/point.html",
                controller: "PointController"
            }).when("/subscriptions", {
                templateUrl: "components/pages/search-results.html",
                controller: "SubscriptionsController"
            }).when("/readers", {
                templateUrl: "components/pages/search-results.html",
                controller: "ReadersController"
            }).when("/post", {
                templateUrl: "components/pages/post.html",
                controller: "PostController"
            }).when("/comments", {
                templateUrl: "components/pages/comments.html",
                controller: "CommentsController"
            }).when("/acknowledgements", {
                templateUrl: "components/pages/acknowledgements.html",
                controller: "AcknowledgementsController"
            }).when("/search/:searchType/:keyword", {
                templateUrl: "components/pages/search-results.html",
                controller: "SearchResultsController"
            }).otherwise({
                templateUrl: "components/pages/not-found.html",
                controller: "NotFoundController"
            });

            pageTitleProvider.setLoadingTitle("载入中 - 其乐");

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
    app.constant("amTimeAgoConfig", {
        fullDateThreshold: 1,
        fullDateFormat: "YYYY-MM-DD HH:mm",
        titleFormat: "YYYY-MM-DD HH:mm:ss"
    });
    app.constant("angularMomentConfig", {
        timezone: "+0800"
    });

    window.keylolApp = app;
})();