(function () {
    class RightMenusController {
        constructor ($scope, $element, $window, stateTree) {
            $.extend(this, {
                stateTree,
            });
            const $$window = $($window);
            const scrollCallback = () => {
                const newIsFixedTop = $$window.scrollTop() + 94 >= $element.offset().top;
                if (this.hasShadow !== newIsFixedTop) {
                    $scope.$apply(() => {
                        this.isFixedTop = newIsFixedTop;
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
            this.loginMenu = {
                header: {
                    main: '登录',
                    sub: '已注册用户',
                },
                items: [
                    {
                        type: 'item',
                        icon: 'Map',
                        text: 'Steam 机器人',
                    },
                    {
                        type: 'item',
                        icon: 'User',
                        text: 'Steam 网页 API',
                    },
                    {
                        type: 'item',
                        icon: 'CuC',
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
    });
}());
