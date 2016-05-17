(function () {
    class RightMenusController {
        constructor ($scope, $element, $window, stateTree) {
            $.extend(this, {
                stateTree,
            });
            const $$window = $($window);
            const $wrapper = $element.children('.wrapper');
            const scrollCallback = () => {
                let newPosition = '';
                const shouldWindowScrollTop = $$window.scrollTop() + 94;
                const elementOffsetTop = $element.offset().top;
                if (shouldWindowScrollTop + $wrapper.height() + 50 >= elementOffsetTop + $element.height()) {
                    newPosition = 'absolute-bottom';
                } else if (shouldWindowScrollTop >= elementOffsetTop) {
                    newPosition = 'fixed-top';
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
                        icon: 'New_Article',
                        text: '新文章',
                    },
                    {
                        type: 'item',
                        icon: 'File',
                        text: '草稿',
                        subText: stateTree.currentUser ? stateTree.currentUser.draftCount : undefined,
                    },
                ],
            };
            this.personalMenu = {
                items: [
                    {
                        type: 'item',
                        icon: 'Map',
                        text: '开设新据点',
                    },
                    {
                        type: 'item',
                        icon: 'User',
                        text: '邀请好友加入其乐',
                    },
                    {
                        type: 'item',
                        icon: 'CuC',
                        text: '客务中心',
                    },
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
                        icon: 'Steam',
                        text: 'Steam',
                    },
                    {
                        type: 'item',
                        icon: 'PlayStation',
                        text: 'PSN（暂未开放）',
                        disabled: true,
                    },
                    {
                        type: 'item',
                        icon: 'Google_Store',
                        text: 'Xbox Live（暂未开放）',
                        disabled: true,
                    },
                    {
                        type: 'item',
                        icon: 'Register',
                        text: '无平台注册',
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
                        icon: 'Login_Steam_BOT',
                        text: 'Steam 机器人',
                    },
                    {
                        type: 'item',
                        icon: 'Login_Steam_Web_API',
                        text: 'Steam 网页 API',
                    },
                    {
                        type: 'item',
                        icon: 'Login_Passcode',
                        text: '口令组合',
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
            specialMenu: '<',
        },
    });
}());
