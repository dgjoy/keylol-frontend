(function () {
    class UserEditInfoController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state, $stateParams, utils) {

            let fetchPromise;
            if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.user
                && stateTree.aggregation.user.basicInfo && stateTree.aggregation.user.basicInfo.idCode === $state.params.user_id_code)) {
                fetchPromise = pageLoad('aggregation.user.edit');
            } else {
                fetchPromise = pageLoad('aggregation.user', { entrance: 'Edit' });
            }

            fetchPromise.then(() => {
                pageHead.setTitle(`${stateTree.aggregation.user.basicInfo.userName} - 编辑 - 资料 - 其乐`);
                if (!stateTree.currentUser || (stateTree.currentUser && stateTree.currentUser.id !==  stateTree.aggregation.user.basicInfo.id &&
                    $.inArray('Operator', stateTree.currentUser.roles) === -1)) {
                    $state.go('aggregation.user', $stateParams);
                    return ;
                }

                const submitLink = `user/${stateTree.aggregation.user.basicInfo.id}`;
                $scope.theme = {
                    main: stateTree.aggregation.user.basicInfo.themeColor,
                    light: stateTree.aggregation.user.basicInfo.lightThemeColor,
                };

                const object = stateTree.aggregation.user.basicInfo;
                const preference = stateTree.aggregation.user.edit;

                console.log(object, preference);
                $scope.basicInfo = {
                    submitLink,
                    header: {
                        mainTitle: '基本信息',
                        subTitle: '个人基础档案',
                    },
                    list: [
                        {
                            title: '昵称',
                            // subTitle: '每次修改后有 180 天的冷却时间',
                            type: 'text',
                            key: 'userName',
                            value: object.userName,
                            editDisabled: true,
                        },
                        {
                            title: '个人识别码',
                            value: object.idCode,
                            editDisabled: true,
                        },
                        {
                            title: '电邮地址',
                            type: 'text',
                            key: 'email',
                            value: preference.email,
                        },
                        {
                            title: '玩家标签',
                            subTitle: '用一句话概括你的游戏生涯',
                            type: 'text',
                            key: 'gamerTag',
                            value: object.gamerTag,
                        },
                    ],
                };
                $scope.relative = {
                    submitLink,
                    header: {
                        mainTitle: '平台',
                        subTitle: '关联绑定和联动',
                    },
                    list: [
                        {
                            title: 'Steam 账号',
                            type: 'link',
                            link: object.steamId ?
                                `http://steamcommunity.com/profiles/${utils.getSteamId64(object.steamId)}` : '',
                            value: object.steamProfileName,
                            editDisabled: true,
                        },
                        {
                            title: 'Steam 机器人',
                            subTitle: '当前绑定的机器人信息',
                            type: preference.steamBotLost ? 'lostBot' : 'link',
                            link: preference.steamBotSteamId ?
                                `http://steamcommunity.com/profiles/${utils.getSteamId64(preference.steamBotSteamId)}` : '',
                            addLink: `steam://friends/add/${utils.getSteamId64(preference.steamBotSteamId)}`,
                            value: preference.steamBotLost ? '已断开绑定' : preference.steamBotName,
                            editDisabled: true,
                        },
                        {
                            title: '蒸汽动力账号',
                            type: 'steamcn',
                            key: 'steamcn',
                            link: object.steamCnUid ? `http://steamcn.com/suid-${object.steamCnUid}` : undefined,
                            value: object.steamCnUserName,
                            editDisabled: !!object.steamCnUserName,
                        },
                    ],
                };
                $scope.vision = {
                    submitLink,
                    header: {
                        mainTitle: '视像',
                        subTitle: '头像与页眉照片',
                    },
                    list: [
                        {
                            title: '页眉照片',
                            subTitle: '个人页面的顶部图片',
                            key: 'headerImage',
                            type: 'cover',
                            value: object.headerImage,
                        },
                        {
                            title: '头像图标',
                            key: 'avatarImage',
                            type: 'avatar',
                            value: object.avatarImage,
                        },
                    ],
                };

                $scope.design = {
                    submitLink,
                    header: {
                        mainTitle: '界面定制化',
                        subTitle: '自定义个人页面的配色',
                    },
                    list: [
                        {
                            title: '主题色',
                            subTitle: '代表个人页的主题，为了衬托白色内容，主题色不应过亮或过淡。',
                            key: 'themeColor',
                            type: 'color',
                            value: object.themeColor,
                            colorType: 'A',
                        },
                        {
                            title: '轻主题色',
                            subTitle: '用于醒目提示。同样的，为了衬托白色内容，轻主题色亦不应过亮或过淡。',
                            key: 'lightThemeColor',
                            type: 'color',
                            value: object.lightThemeColor,
                            colorType: 'B',
                        },
                    ],
                };

                const role = $.inArray('Operator', stateTree.currentUser.roles) === -1 ? 'normal' : 'operator';

                let needPassword;
                if (role === 'normal') {
                    needPassword = true;
                } else {
                    needPassword = (stateTree.currentUser.id === stateTree.aggregation.user.basicInfo.id);
                }

                $scope.security = {
                    submitLink,
                    header: {
                        mainTitle: '安全信息',
                        subTitle: '设置登录口令和账号保护',
                    },
                    list: [
                        {
                            title: '口令',
                            subTitle: '设置后可以通过口令组合登录其乐',
                            key: 'newPassword',
                            type: 'password',
                            needPassword,
                        },
                        {
                            title: '登录保护',
                            subTitle: '如果开启此项，使用口令登录失败连续十次时，锁定登录三十分钟。',
                            type: 'switch',
                            key: 'lockoutEnabled',
                            value: preference.lockoutEnabled,
                        },
                    ],
                };


                if (!needPassword) {
                    $scope.logout = undefined;
                } else {
                    $scope.logout = {
                        header: {
                            mainTitle: '登出',
                            subTitle: '注销当前账号',
                        },
                        list: [
                            {
                                title: '退出登录',
                                type: 'logout',
                            },
                        ],
                    };
                }
            });

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('UserEditInfoController', UserEditInfoController);
}());
