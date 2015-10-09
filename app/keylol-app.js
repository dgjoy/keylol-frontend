(function () {
    "use strict";

    var app = angular.module("KeylolApp", [
        // Angular modules 
        //"ngAnimate",
        "ngRoute",
        "ngAnimate",

        // Custom modules

        // 3rd Party Modules
        "jcs.angular-http-batch",
        "angularMoment",
        "ngStorage",
        "ngFileUpload",
        "ab-base64"
    ]);
    app.config([
        "$routeProvider", "$locationProvider", "utilsProvider", "pageTitleProvider", "$localStorageProvider",
        "$httpProvider", "$compileProvider",
        function ($routeProvider, $locationProvider, utilsProvider, pageTitleProvider, $localStorageProvider,
                  $httpProvider, $compileProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when("/", {
                templateUrl: "components/pages/home.html",
                controller: "HomeController"
            }).when("/article", {
                templateUrl: "components/pages/article.html",
                controller: "ArticleController"
            }).when("/point", {
                templateUrl: "components/pages/point.html",
                controller: "PointController"
            }).when("/post", {
                templateUrl: "components/pages/post.html",
                controller: "PostController"
            }).otherwise({
                templateUrl: "components/pages/not-found.html",
                controller: "NotFoundController"
            });

            pageTitleProvider.setLoadingTitle("载入中 - 其乐");

            utilsProvider.config({
                geetestId: "0c002064ef8f602ced7bccec08b8e10b"
            });

            $localStorageProvider.setKeyPrefix("keylol-");

            $httpProvider.defaults.withCredentials = true;

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|steam):/);
        }
    ]);
    app.constant("amTimeAgoConfig", {
        fullDateThreshold: 1,
        fullDateFormat: "YYYY-MM-DD hh:mm",
        titleFormat: "YYYY-MM-DD hh:mm:ss"
    });

    window.keylolApp = app;
})();