(function () {
    class RightMenusController {
        constructor ($scope, $element, $window, stateTree, window ,utils) {
            $.extend(this, {
                stateTree,
            });
            const $$window = $($window);
            const $wrapper = $element.children('.wrapper');
            const scrollCallback = () => {
                let newPosition;
                const shouldWindowScrollTop = $$window.scrollTop() + 94;
                const elementOffsetTop = $element.offset().top;
                const shouldWrapperHeight = $wrapper.height() + 50;
                const $elementHeight = $element.height();
                if (shouldWindowScrollTop < elementOffsetTop || shouldWrapperHeight === $elementHeight) {
                    newPosition = '';
                } else if (shouldWindowScrollTop + shouldWrapperHeight < elementOffsetTop + $elementHeight) {
                    newPosition = 'fixed-top';
                } else {
                    newPosition = 'absolute-bottom';
                }
                if (this.position !== newPosition) {
                    $scope.$apply(() => {
                        this.position = newPosition;
                    });
                }
            };
            $$window.scroll(scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });

            this.writtingMenu = {
                items: [
                    {
                        type: 'item',
                        icon: 'new-article',
                        text: '新文章',
                        clickAction() {
                            window.show({
                                templateUrl: 'src/windows/editor.html',
                                controller: 'EditorController',
                                controllerAs: 'editor',
                                inputs: {
                                    options: {},
                                },
                            });
                        },
                    },
                    {
                        type: 'item',
                        icon: 'coffe',
                        text: '发表动态',
                        clickAction(event) {
                            window.show({
                                event,
                                templateUrl: 'src/windows/activity-editor.html',
                                controller: 'ActivityEditorController',
                                controllerAs: 'activityEditor',
                                inputs: {
                                    options: {},
                                },
                            });
                        },
                    },
                    // {
                    //     type: 'item',
                    //     icon: 'file',
                    //     text: '草稿',
                    //     subText: stateTree.currentUser ? stateTree.currentUser.draftCount : undefined,
                    // },
                ],
            };
            this.personalMenu = {
                items: [
                    {
                        type: 'item',
                        icon: 'map',
                        text: '开设新据点',
                        clickAction (event) {
                            window.show({
                                event,
                                templateUrl: 'src/windows/point-creator.html',
                                controller: 'PointCreatorController',
                                controllerAs: 'pointCreator',
                            });
                        },
                    },
                    {
                        type: 'item',
                        icon: 'user',
                        text: '邀请好友加入其乐',
                        clickAction (event) {
                            window.show({
                                event,
                                templateUrl: 'src/windows/friend-invitation.html',
                                controller: 'FriendInvitationController',
                                controllerAs: 'friendInvitation',
                            });
                        },
                    },
                    // {
                    //     type: 'item',
                    //     icon: 'cuc',
                    //     text: '客务中心',
                    // },
                ],
            };
            this.registerMenu = {
                header: {
                    main: '加入其乐',
                    sub: '同步平台的玩家数据',
                },
                items: [
                    {
                        type: 'item',
                        icon: 'dtb-steam',
                        text: 'Steam',
                        clickAction (event) {
                            utils.openRegistration(event);
                        },
                    },
                    {
                        type: 'item',
                        icon: 'dtb-playstation',
                        text: 'PSN（暂未开放）',
                        disabled: true,
                    },
                    {
                        type: 'item',
                        icon: 'dtb-xbox',
                        text: 'Xbox Live（暂未开放）',
                        disabled: true,
                    },
                    {
                        type: 'item',
                        icon: 'register',
                        text: '无平台（暂未开放）',
                        disabled: true,
                    },
                ],
            };
            this.loginMenu = {
                header: {
                    main: '登录',
                    sub: '已注册用户',
                },
                items: [
                    {
                        type: 'item',
                        icon: 'login-steam-bot',
                        text: 'Steam 机器人',
                        clickAction (event) {
                            window.show({
                                event,
                                templateUrl: 'src/windows/login.html',
                                controller: 'LoginController',
                                controllerAs: 'login',
                                inputs: {
                                    startPage: 0,
                                },
                            });
                        },
                    },
                    // {
                    //     type: 'item',
                    //     icon: 'login-steam-web-api',
                    //     text: 'Steam 网页 API',
                    // },
                    {
                        type: 'item',
                        icon: 'login-steamcn',
                        text: '蒸汽动力',
                        clickAction (event) {
                            window.show({
                                event,
                                templateUrl: 'src/windows/login.html',
                                controller: 'LoginController',
                                controllerAs: 'login',
                                inputs: {
                                    startPage: 1,
                                },
                            });
                        },
                    },
                    {
                        type: 'item',
                        icon: 'login-passcode',
                        text: '口令组合',
                        clickAction (event) {
                            window.show({
                                event,
                                templateUrl: 'src/windows/login.html',
                                controller: 'LoginController',
                                controllerAs: 'login',
                                inputs: {
                                    startPage: 2,
                                },
                            });
                        },
                    },
                ],
            };
        }
    }

    keylolApp.component('rightMenus', {
        templateUrl: 'src/sections/right-menus.html',
        controller: RightMenusController,
        controllerAs: 'rightMenus',
        bindings: {
            author: '<',
            point: '<',
            rating: '<',
        },
    });
}());
