(function () {
    class DiscoveryController {
        constructor (pageHead, $scope, union, $http, notification, window, utils, $timeout, $location, $rootScope, articleTypes) {
            $scope.writtingMenu = {
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
                    },
                ],
            };
            $scope.personalMenu = {
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
            $scope.registerMenu = {
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
            $scope.loginMenu = {
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

    keylolApp.controller('DiscoveryController', DiscoveryController);
}());
