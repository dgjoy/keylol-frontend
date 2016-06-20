(function () {
    class UserEditPreferenceController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state) {
            pageHead.setTitle('个人 - 编辑 - 偏好 - 其乐');

            let fetchPromise;
            if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.user
                && stateTree.aggregation.user.basicInfo && stateTree.aggregation.user.basicInfo.idCode === $state.params.user_id_code)) {
                fetchPromise = pageLoad('aggregation.user.edit');
            } else {
                fetchPromise = pageLoad('aggregation.user', { entrance: 'Edit' });
            }

            fetchPromise.then(() => {
                const submitLink = `user/${stateTree.aggregation.user.basicInfo.id}`;
                $scope.theme = {
                    main: stateTree.aggregation.user.basicInfo.themeColor,
                    light: stateTree.aggregation.user.basicInfo.lightThemeColor,
                };

                const object = stateTree.aggregation.user.basicInfo;
                const preference = stateTree.aggregation.user.edit;

                $scope.reading = {
                    submitLink,
                    header: {
                        mainTitle: '阅读',
                        subTitle: '浏览体验的偏好',
                    },
                    list: [
                        {
                            title: '新窗打开',
                            subTitle: '强制所有链接在新选项卡打开',
                            type: 'switch',
                            key: 'openInNewWindow',
                            value: preference.openInNewWindow,
                        },
                        {
                            title: '主选外语',
                            subTitle: '出现游戏与厂商的名称时优先显示外语',
                            type: 'switch',
                            key:'useEnglishPointName',
                            value: preference.useEnglishPointName,
                        },
                    ],
                };
                $scope.community = {
                    submitLink,
                    header: {
                        mainTitle: '社交提醒',
                        subTitle: '在邮政中心接受这些信息',
                    },
                    list: [
                        {
                            title: '文章收到评论',
                            type: 'switch',
                            key: 'notifyOnArticleReplied',
                            value: preference.notifyOnArticleReplied,
                        },
                        {
                            title: '评论被回复',
                            type: 'switch',
                            key:'notifyOnCommentReplied',
                            value: preference.notifyOnCommentReplied,
                        },
                        {
                            title: '文章获得认可',
                            type: 'switch',
                            key:'notifyOnArticleLiked',
                            value: preference.notifyOnArticleLiked,
                        },
                        {
                            title: '评论获得认可',
                            type: 'switch',
                            key:'notifyOnCommentLiked',
                            value: preference.notifyOnCommentLiked,
                        },
                        {
                            title: '新听众',
                            type: 'switch',
                            key:'notifyOnSubscribed',
                            value: preference.notifyOnSubscribed,
                        },
                        // {
                        //     title: '邀请作评',
                        //     subTitle: '好友请求你分享某款游戏的体验',
                        //     type: 'switch',
                        //     key:'',
                        //     value: preference.
                        // },
                    ],
                };
                $scope.robot = {
                    submitLink,
                    header: {
                        mainTitle: '机器人互动',
                        subTitle: '通过 Steam 机器人接收这些信息',
                    },
                    list: [
                        {
                            title: '文章收到评论',
                            type: 'switch',
                            key:'steamNotifyOnArticleReplied',
                            value: preference.steamNotifyOnArticleReplied,
                        },
                        {
                            title: '评论被回复',
                            type: 'switch',
                            key:'steamNotifyOnCommentReplied',
                            value: preference.steamNotifyOnCommentReplied,
                        },
                        {
                            title: '文章获得认可',
                            type: 'switch',
                            key:'steamNotifyOnArticleLiked',
                            value: preference.steamNotifyOnArticleLiked,
                        },
                        {
                            title: '评论获得认可',
                            type: 'switch',
                            key:'steamNotifyOnCommentLiked',
                            value: preference.steamNotifyOnCommentLiked,
                        },
                        {
                            title: '新听众',
                            type: 'switch',
                            key:'steamNotifyOnSubscribed',
                            value: preference.steamNotifyOnSubscribed,
                        },
                        // {
                        //     title: '邀请作评',
                        //     subTitle: '好友请求你分享某款游戏的体验',
                        //     type: 'switch',
                        //     key:'',
                        //     value: preference.
                        // },
                        {
                            title: '萃选推选',
                            subTitle: '订阅提供优秀作品的推荐',
                            type: 'switch',
                            key:'steamNotifyOnSpotlighted',
                            value: preference.steamNotifyOnSpotlighted,
                        },
                        {
                            title: '系统公函',
                            type: 'switch',
                            key:'steamNotifyOnMissive',
                            value: preference.steamNotifyOnMissive,
                        },
                    ],
                };
            });

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('UserEditPreferenceController', UserEditPreferenceController);
}());
