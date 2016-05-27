(function () {
    class UserEditPreferenceController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('个人 - 编辑 - 资料 - 其乐');

            $scope.reading = {
                header: {
                    mainTitle: '阅读',
                    subTitle: '浏览体验的偏好',
                },
                list: [
                    {
                        title: '新窗打开',
                        subTitle: '强制所有链接在新选项卡打开',
                        type: 'switch',
                    },
                    {
                        title: '主选外语',
                        subTitle: '出现游戏与厂商的名称时优先显示外语',
                        type: 'switch',
                    },
                ],
            };
            $scope.community = {
                header: {
                    mainTitle: '社交提醒',
                    subTitle: '在邮政中心接受这些信息',
                },
                list: [
                    {
                        title: '文章收到评论',
                        type: 'switch',
                    },
                    {
                        title: '评论被回复',
                        type: 'switch',
                    },
                    {
                        title: '文章获得认可',
                        type: 'switch',
                    },
                    {
                        title: '评论获得认可',
                        type: 'switch',
                    },
                    {
                        title: '邀请作评',
                        subTitle: '好友请求你分享某款游戏的体验',
                        type: 'switch',
                    },
                ],
            };
            $scope.robot = {
                header: {
                    mainTitle: '机器人互动',
                    subTitle: '通过 Steam 机器人接收这些信息',
                },
                list: [
                    {
                        title: '文章收到评论',
                        type: 'switch',
                    },
                    {
                        title: '评论被回复',
                        type: 'switch',
                    },
                    {
                        title: '文章获得认可',
                        type: 'switch',
                    },
                    {
                        title: '评论获得认可',
                        type: 'switch',
                    },
                    {
                        title: '邀请作评',
                        subTitle: '好友请求你分享某款游戏的体验',
                        type: 'switch',
                    },
                    {
                        title: '萃选推选',
                        subTitle: '订阅提供优秀作品的推荐',
                        type: 'switch',
                    },
                    {
                        title: '系统公函',
                        type: 'switch',
                    },
                ],
            };

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('UserEditPreferenceController', UserEditPreferenceController);
}());
