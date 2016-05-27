(function () {
    class UserEditInfoController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('个人 - 编辑 - 资料 - 其乐');

            $scope.basicInfo = {
                header: {
                    mainTitle: '基本信息',
                    subTitle: '个人基础档案',
                },
                list: [
                    {
                        title: '昵称',
                        subTitle: '每次修改后有 180 天的冷却时间',
                        content: '大刺猬呼噜',
                    },
                    {
                        title: '个人识别码',
                        content: 'HEDGE',
                        editDisabled: true,
                    },
                    {
                        title: '电邮地址',
                        content: 'big@hedge.hog',
                    },
                    {
                        title: '玩家标签',
                        subTitle: '用一句话概括你的游戏生涯',
                        content: '把刺猬抚顺以后他们会很呼噜'
                    },
                ],
            };
            $scope.relative = {
                header: {
                    mainTitle: '平台',
                    subTitle: '关联绑定和联动',
                },
                list: [
                    {
                        title: 'Steam 账号',
                        content: 'Biggy Hedge',
                        editDisabled: true,
                    },
                    {
                        title: 'Steam 机器人',
                        subTitle: '当前绑定的机器人信息',
                        content: '其乐机器人',
                        editDisabled: true,
                    },
                    {
                        title: '蒸汽动力账号',
                        content: 'leeberun',
                    },
                ],
            };
            $scope.vision = {
                header: {
                    mainTitle: '视像',
                    subTitle: '头像与页眉照片',
                },
                list: [
                    {
                        title: '页眉照片',
                        subTitle: '个人页面的顶部图片',
                    },
                    {
                        title: '头像图标',
                    },
                ],
            };

            $scope.design = {
                header: {
                    mainTitle: '界面定制化',
                    subTitle: '自定义个人页面的配色',
                },
                list: [
                    {
                        title: '主题色',
                        subTitle: '代表个人页的主题,为了衬托白色内容,主题色不应过亮或过淡.',
                    },
                    {
                        title: '轻主题色',
                        subTitle: '用于醒目提示.同样的,为了衬托白色内容,轻主题色亦不应过亮或过淡.',
                    },
                ],
            };

            $scope.security = {
                header: {
                    mainTitle: '安全信息',
                    subTitle: '设置登录口令和账号保护',
                },
                list: [
                    {
                        title: '口令',
                        subTitle: '设置后可以通过口令组合登录其乐',
                    },
                    {
                        title: '登录保护',
                        subTitle: '如果开启此项,使用口令登录失败连续十次时,锁定登录三十分钟将',
                        type: 'switch',
                    },
                ],
            };
            $scope.logout = {
                header: {
                    mainTitle: '登出',
                    subTitle: '注销当前账号',
                },
                list: [
                    {
                        title: '退出登录',
                    },
                ],
            };
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('UserEditInfoController', UserEditInfoController);
}());
