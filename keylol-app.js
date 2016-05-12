(function () {
    const app = angular.module('KeylolApp', [
        // Angular modules
        //'ngAnimate',
        'ngAnimate',

        // Custom modules

        // 3rd Party Modules
        'angularMoment',
        'ngStorage',
        'ngFileUpload',
        'ab-base64',
        'angulartics',
        'ui.router',
    ]);
    app.config(($stateProvider, $locationProvider, utilsProvider, pageHeadProvider, $localStorageProvider,
                $httpProvider, $compileProvider, $analyticsProvider, $anchorScrollProvider, $urlRouterProvider) => {
        $locationProvider.html5Mode(true);

        $anchorScrollProvider.disableAutoScrolling();
        $urlRouterProvider.otherwise('/404');
        $stateProvider
            // .state('home', {
            //     url: '/',
            //     templateUrl: 'src/pages/home.html',
            //     controller: 'HomeController',
            // })
            // // .when('/home', {
            // //     redirectTo: '/',
            // // })
            // .state('article', {
            //     url: '/article/:author/:article',
            //     templateUrl: 'src/pages/article.html',
            //     controller: 'ArticleController',
            // })
            // .state('point', {
            //     url: '/point/:pointIdCode',
            //     templateUrl: 'src/pages/point.html',
            //     controller: 'PointController',
            // })
            // .state('user', {
            //     url: '/user/:userIdCode',
            //     templateUrl: 'src/pages/point.html',
            //     controller: 'PointController',
            // })
            // .state('latest', {
            //     url: '/latest',
            //     templateUrl: 'src/pages/search-results.html',
            //     controller: 'AllArticlesController',
            // })
            // .state('subscriptions', {
            //     url: '/subscriptions',
            //     templateUrl: 'src/pages/search-results.html',
            //     controller: 'SubscriptionsController',
            // })
            // .state('readers', {
            //     url: '/readers',
            //     templateUrl: 'src/pages/search-results.html',
            //     controller: 'ReadersController',
            // })
            // .state('post-office', {
            //     url: '/post-office',
            //     templateUrl: 'src/pages/post-office.html',
            //     controller: 'PostOfficeController',
            // })
            // .state('post-office-type', {
            //     url: '/post-office/:type',
            //     templateUrl: 'src/pages/post-office.html',
            //     controller: 'PostOfficeController',
            // })
            // .state('search', {
            //     url: '/search/:searchType/:keyword',
            //     templateUrl: 'src/pages/search-results.html',
            //     controller: 'SearchResultsController',
            // })
            // .state('related', {
            //     url: '/related/:idCode/:type',
            //     templateUrl: 'src/pages/search-results.html',
            //     controller: 'RelatedController',
            // })
            // .state('coupon', {
            //     url: '/coupon',
            //     templateUrl: 'src/pages/coupon.html',
            //     controller: 'CouponController',
            // })
            // .state('discovery', {
            //     url: '/discovery',
            //     templateUrl: 'src/pages/discovery.html',
            //     controller: 'DiscoveryController',
            // })
            // .state('points', {
            //     url: '/points',
            //     templateUrl: 'src/pages/points.html',
            //     controller: 'PointsController',
            // })
            // .state('timeline', {
            //     url: '/timeline',
            //     templateUrl: 'src/pages/page-timeline.html',
            //     controller: 'PageTimelineController',
            // })
            // .state('not-found', {
            //     url: '404',
            //     templateUrl: 'src/pages/not-found.html',
            //     controller: 'NotFoundController',
            // })
            // state after refactoring
            .state('entrance', {
                url: '/',
                templateUrl: 'src/pages/entrance.html',
                controller ($state,union) {
                    if (union.$localStorage.Authorization) {
                        $state.go('entrance.loggedIn');
                    } else {
                        $state.go('entrance.public');
                    }
                },
            })
            .state('entrance.discovery', {
                url: 'discovery',
                templateUrl: 'src/pages/discovery.html',
                controller: 'DiscoveryController',
            })
            .state('entrance.public', {
                url: '',
                templateUrl: 'src/pages/discovery.html',
                controller: 'DiscoveryController',
            })
            .state('entrance.loggedIn', {
                url: '',
                templateUrl: 'src/pages/discovery.html',
                controller: 'DiscoveryController',
            })
            .state('entrance.points', {
                url: 'points',
                templateUrl: 'src/pages/points.html',
                controller: 'PointsController',
            })
        ;

        pageHeadProvider.setLoadingHead({
            title: '其乐 - 甄选并传递游戏的价值',
        });

        utilsProvider.config({
            geetestId: 'accdaf35b04e4ad5bf4980c7d30edf87',
        });

        $localStorageProvider.setKeyPrefix('keylol-');

        $httpProvider.defaults.withCredentials = true;

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|steam):/);

        window._czc = [];
        _czc.push(['_setAutoPageview', false]);

        $analyticsProvider.registerPageTrack(path => {
            _czc.push(['_trackPageview', path]);
        });

        $analyticsProvider.registerEventTrack((action, prop) => {
            _czc.push([
                '_trackEvent',
                prop.category || '未分类',
                action,
                prop.label,
                prop.value,
                prop.nodeid,
            ]);
        });
    });
    app.run(['amMoment', amMoment => {
        amMoment.changeLocale('zh-cn');
    }]);
    app.constant('amTimeAgoConfig', {
        fullDateThreshold: 1,
        fullDateFormat: 'YYYY-MM-DD HH:mm',
        titleFormat: 'YYYY-MM-DD HH:mm:ss [GMT]Z',
    });
    app.constant('angularMomentConfig', {
        timezone: 'Asia/Shanghai',
    });

    window.keylolApp = app;
}());
