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
        $urlRouterProvider.otherwise('/not-found');
        $stateProvider
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
            // state after refactoring
            .state('entrance', {
                url: '/',
                templateUrl: 'src/pages/entrance.html',
                controller ($location, pageLoad) {
                    if ($location.url() === '/') {
                        console.log('load entrance?');
                        pageLoad('entrance');
                    }
                },
                onExit (stateTree) {
                    console.log('exit entrance');
                    delete stateTree.entrance;
                },
            })
                .state('entrance.discovery', {
                    url: 'discovery',
                    templateUrl: 'src/pages/discovery.html',
                    controller: 'DiscoveryController',
                    onExit (stateTree) {
                        console.log('exit discovery');
                        delete stateTree.entrance.discovery;
                    },
                })
                .state('entrance.points', {
                    url: 'points',
                    onEnter (pageLoad) {
                        pageLoad('entrance.points');
                    },
                    onExit (stateTree) {
                        console.log('exit points');
                        delete stateTree.entrance.points;
                    },
                    templateUrl: 'src/pages/points.html',
                    controller: 'PointsController',
                })
                .state('entrance.timeline', {
                    url: 'timeline',
                    templateUrl: 'src/pages/page-timeline.html',
                    controller: 'PageTimelineController',
                })
            .state('postOffice',{
                url: '/post-office',
                templateUrl: 'src/pages/post-office.html',
                controller: 'PostOfficeController',
            })
                .state('postOffice.socialActivity',{
                    url: '/social-activity',
                    templateUrl: 'src/pages/social-activity.html',
                    controller: 'SocialActivityController',
                })
                    .state('postOffice.socialActivity.approve',{
                        url: '/approve',
                        templateUrl: 'src/pages/social-activity-approve.html',
                        controller: 'SocialActivityApproveController',
                    })
                    .state('postOffice.socialActivity.follower',{
                        url: '/follower',
                        templateUrl: 'src/pages/social-activity-follower.html',
                        controller: 'SocialActivityFollowerController',
                    })
                    .state('postOffice.socialActivity.invitation',{
                        url: '/invitation',
                        templateUrl: 'src/pages/social-activity-invitation.html',
                        controller: 'SocialActivityInvitationController',
                    })
                    .state('postOffice.socialActivity.reply',{
                        url: '/reply',
                        templateUrl: 'src/pages/social-activity-reply.html',
                        controller: 'SocialActivityReplyController',
                    })
                .state('postOffice.missive',{
                    url: '/missive',
                    templateUrl: 'src/pages/missives.html',
                    controller: 'MissivesController',
                })
            .state('coupon',{
                url: '/coupon',
                templateUrl: 'src/pages/coupon.html',
                controller: 'CouponController',
            })
                .state('coupon.detail',{
                    url: '/detail',
                    templateUrl: 'src/pages/coupon-detail.html',
                    controller: 'CouponDetailController',
                })
                .state('coupon.store',{
                    url: '/store',
                    templateUrl: 'src/pages/coupon-store.html',
                    controller: 'CouponStoreController',
                })
                .state('coupon.ranking',{
                    url: '/ranking',
                    templateUrl: 'src/pages/coupon-ranking.html',
                    controller: 'CouponRankingController',
                })
            .state('aggregation', {
                'abstract': true,
                template: '<div ui-view></div>',
                onExit (stateTree) {
                    console.log('exit aggregation');
                    delete stateTree.aggregation;
                },
            })
                .state('aggregation.point', {
                    url: '/point/:point_id_code',
                    templateUrl: 'src/pages/point.html',
                    controller: 'PointController',
                    onExit (stateTree) {
                        console.log('exit aggregation.point');
                        delete stateTree.aggregation.point;
                    },
                })
                    .state('aggregation.point.frontpage', {
                        url: '/frontpage',
                        templateUrl: 'src/pages/frontpage.html',
                        controller: 'FrontpageController',
                        onExit (stateTree) {
                            console.log('exit frontpage');
                            delete stateTree.aggregation.point.frontpage;
                        },
                    })
                    .state('aggregation.point.intel', {
                        url: '/intel',
                        templateUrl: 'src/pages/intel.html',
                        controller: 'IntelController',
                        onExit (stateTree) {
                            console.log('exit intel');
                            delete stateTree.aggregation.point.intel;
                        },
                    })
                    .state('aggregation.point.product', {
                        url: '/product',
                        templateUrl: 'src/pages/product.html',
                        controller: 'ProductController',
                        onExit (stateTree) {
                            console.log('exit product');
                            delete stateTree.aggregation.point.product;
                        },
                    })
                    .state('aggregation.point.timeline', {
                        url: '/timeline',
                        templateUrl: 'src/pages/page-timeline.html',
                        controller: 'PageTimelineController',
                    })
                    .state('aggregation.point.edit', {
                        url: '/edit',
                        templateUrl: 'src/pages/point-edit.html',
                        controller: 'PointEditController',
                        onExit (stateTree) {
                            console.log('exit point edit');
                            delete stateTree.aggregation.point.edit;
                        },
                    })
                        .state('aggregation.point.edit.info', {
                            url: '/info',
                            templateUrl: 'src/pages/edit-info.html',
                            controller: 'EditInfoController',
                            onExit (stateTree) {
                                console.log('exit point edit info');
                                delete stateTree.aggregation.point.edit.info;
                            },
                        })
                        .state('aggregation.point.edit.style', {
                            url: '/style',
                            templateUrl: 'src/pages/edit-style.html',
                            controller: 'EditStyleController',
                            onExit (stateTree) {
                                console.log('exit point edit style');
                                delete stateTree.aggregation.point.edit.style;
                            },
                        })
                        .state('aggregation.point.edit.log', {
                            url: '/log',
                            templateUrl: 'src/pages/edit-log.html',
                            controller: 'EditLogController',
                            onExit (stateTree) {
                                console.log('exit point edit log');
                                delete stateTree.aggregation.point.edit;
                            },
                        })
            .state('aggregation.user', {
                url: '/user/:user_id_Code',
                templateUrl: 'src/pages/user.html',
                controller: 'UserController',
                onExit (stateTree) {
                    console.log('exit aggregation.user');
                    delete stateTree.aggregation.user;
                },
            })
            .state('aggregation.user.dossier', {
                url: '/dossier',
                templateUrl: 'src/pages/dossier.html',
                controller: 'DossierController',
                onExit (stateTree) {
                    console.log('exit dossier');
                    delete stateTree.aggregation.user.dossier;
                },
            })
                .state('aggregation.user.people', {
                    url: '/people',
                    templateUrl: 'src/pages/people.html',
                    controller: 'PeopleController',
                    onExit (stateTree) {
                        console.log('exit people');
                        delete stateTree.aggregation.user.people;
                    },
                })
                .state('aggregation.user.edit', {
                    url: '/edit',
                    templateUrl: 'src/pages/user-edit.html',
                    controller: 'UserEditController',
                    onExit (stateTree) {
                        console.log('exit edit');
                    },
                })
                    .state('aggregation.user.edit.info', {
                        url: '/info',
                        templateUrl: 'src/pages/user-edit-info.html',
                        controller: 'UserEditInfoController',
                        onExit (stateTree) {
                            console.log('exit edit info');
                            delete stateTree.aggregation.user.edit;
                        },
                    })
                    .state('aggregation.user.edit.preference', {
                        url: '/preference',
                        templateUrl: 'src/pages/user-edit-preference.html',
                        controller: 'UserEditPreferenceController',
                        onExit (stateTree) {
                            console.log('exit edit preference');
                            delete stateTree.aggregation.user.edit;
                        },
                    })
            .state('content', {
                'abstract': true,
                template: '<div ui-view></div>',
                onExit (stateTree) {
                    console.log('exit content');
                    delete stateTree.content;
                },
            })
                .state('content.article', {
                    url: '/article/:author_id_code/:sid_for_author',
                    templateUrl: 'src/pages/article.html',
                    controller: 'ArticleController',
                    onExit (stateTree) {
                        console.log('exit article');
                        delete stateTree.content.article;
                    },
                })
                .state('content.activity', {
                    url: '/activity/:author_id_code/:sid_for_author',
                    templateUrl: 'src/pages/activity.html',
                    controller: 'ActivityController',
                    onExit (stateTree) {
                        console.log('exit activity');
                        delete stateTree.content.activity;
                    },
                })
            .state('not-found', {
                url: '/not-found',
                templateUrl: 'src/pages/not-found.html',
                controller: 'NotFoundController',
            });

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
