(function () {
    class EditInfoController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state, utils) {
            pageHead.setTitle('据点 - 编辑 - 资料 - 其乐');

            let fetchPromise;
            if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code)) {
                fetchPromise = pageLoad('aggregation.point.edit.info');
            } else {
                fetchPromise = pageLoad('aggregation.point', { entrance: 'EditInfo' });
            }

            fetchPromise.then(() => {
                const submitLink = `point/${stateTree.aggregation.point.basicInfo.id}`;
                $scope.theme = {
                    main: stateTree.aggregation.point.basicInfo.themeColor,
                    light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                };

                $scope.basicInfo = {
                    submitLink,
                    header: {
                        mainTitle: '基本信息',
                        subTitle: '介绍据点的游戏主体',
                    },
                    list: [
                        {
                            title: '类型',
                            key: 'type',
                            value: `${utils.pointTypeHash[stateTree.aggregation.point.basicInfo.type]}据点`,
                            editDisabled: true,
                        },
                        {
                            title: '据点识别码',
                            key: 'idCode',
                            value: $state.params.point_id_code,
                            editDisabled: true,
                        },
                        {
                            title: '中文名',
                            key: 'chineseName',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.chineseName,
                        },
                        {
                            title: '外文名',
                            key: 'englishName',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.englishName,
                        },
                        {
                            title: '中文索引',
                            subTitle: '用中文搜索时的匹配关键字',
                            key: 'chineseAliases',
                            type: 'text',
                            value: stateTree.aggregation.point.edit.info.chineseAliases,
                        },
                        {
                            title: '英文索引',
                            subTitle: '用英文搜索时的匹配关键字',
                            key: 'englishAliases',
                            type: 'text',
                            value: stateTree.aggregation.point.edit.info.englishAliases,
                        },
                    ],
                };

                /**
                 * deal with ways obj
                 */
                const ways = {
                    submitLink,
                    header: {
                        mainTitle: '渠道',
                        subTitle: '游戏的分发方式',
                    },
                    list: [
                        {
                            title: '载体或平台',
                            key: 'platformPoints',
                            type: 'checkbox',
                            value: '',
                            selects: [],
                            names: utils.nameOfPlatformPoints,
                            values: utils.idCodeOfPlatformPoints,
                        },
                        {
                            title: 'Steam 商店链接',
                            subTitle: '商店价格会定期自动同步',
                            value: stateTree.aggregation.point.basicInfo.steamAppId ?
                                `http://store.steampowered.com/app/${stateTree.aggregation.point.basicInfo.steamAppId}/` : '',
                            key: 'steamAppId',
                            type: 'appId',
                            appId: stateTree.aggregation.point.basicInfo.steamAppId,
                            regex: /^(?:(?:https?:\/\/)?store\.steampowered\.com\/app\/)?(\d+)\/*$/i,
                        },
                        {
                            title: '杉果商店链接',
                            subTitle: '商店价格会定期自动同步',
                            value: stateTree.aggregation.point.basicInfo.sonkwoProductId ?
                                `http://www.sonkwo.com/products/${stateTree.aggregation.point.basicInfo.sonkwoProductId}` : '',
                            key: 'sonkwoProductId',
                            type: 'appId',
                            appId: stateTree.aggregation.point.basicInfo.sonkwoProductId,
                            regex: /^(?:(?:https?:\/\/)?(?:www\.)?sonkwo\.com\/products\/)?(\d+)\/*$/i,
                        },
                    ],
                    extraList: [
                        {
                            title: 'Origin 商店链接',
                            key: 'originLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.originLink,
                        },
                        {
                            title: 'Origin 商店价格',
                            key: 'originPrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.originPrice,
                        },
                        {
                            title: 'uPlay 商店链接',
                            key: 'uplayLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.uplayLink,
                        },
                        {
                            title: 'uPlay 商店价格',
                            key: 'uplayPrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.uplayPrice,
                        },
                        {
                            title: 'PlayStation 商店链接',
                            key: 'playStationLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.playStationLink,
                        },
                        {
                            title: 'PlayStation 商店价格',
                            key: 'playStationPrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.playStationPrice,
                        },
                        {
                            title: 'XBox 商店链接',
                            key: 'xboxLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.xboxLink,
                        },
                        {
                            title: 'XBox 商店价格',
                            key: 'xboxPrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.xboxPrice,
                        },
                        {
                            title: 'Windows 商店链接',
                            key: 'windowsStoreLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.windowsStoreLink,
                        },
                        {
                            title: 'Windows 商店价格',
                            key: 'windowsStorePrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.windowsStorePrice,
                        },
                        {
                            title: 'App Store 商店链接',
                            key: 'appStoreLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.appStoreLink,
                        },
                        {
                            title: 'App Store 商店价格',
                            key: 'appStorePrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.appStorePrice,
                        },
                        {
                            title: '谷歌 Play 商店链接',
                            key: 'googlePlayLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.googlePlayLink,
                        },
                        {
                            title: '谷歌 Play 商店价格',
                            key: 'googlePlayPrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.googlePlayPrice,
                        },
                        {
                            title: 'GOG 商店链接',
                            key: 'gogLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.gogLink,
                        },
                        {
                            title: 'GOG 商店价格',
                            key: 'gogPrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.gogPrice,
                        },
                        {
                            title: '战网商店链接',
                            key: 'battleNetLink',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.battleNetLink,
                        },
                        {
                            title: '战网商店价格',
                            key: 'battleNetPrice',
                            type: 'text',
                            value: stateTree.aggregation.point.basicInfo.battleNetPrice,
                        },
                    ],
                };

                const platformPoints = ways.list[0];
                const nameArray = [];
                for (let i = 0;i < stateTree.aggregation.point.edit.info.platformPoints.length;i++) {
                    const idCode = stateTree.aggregation.point.edit.info.platformPoints[i];
                    const index = utils.idCodeOfPlatformPoints.indexOf(idCode);
                    if (index > -1) {
                        platformPoints.selects.push(index);
                        nameArray.push(utils.nameOfPlatformPoints[index]);
                    }
                }
                platformPoints.value = nameArray.toString();

                const upArray = [];
                for (let i = 0;i < ways.extraList.length;i++) {
                    if (stateTree.aggregation.point.basicInfo[ways.extraList[i].key]) {
                        upArray.push(ways.extraList[i]);
                    }
                }
                for (let i = 0;i < upArray.length;i++) {
                    const index = ways.extraList.indexOf(upArray[i]);
                    if (index > -1) {
                        ways.list.push(ways.extraList.splice(index, 1)[0]);
                    }
                }

                $scope.ways = ways;

                $scope.relative = {
                    submitLink,
                    header: {
                        mainTitle: '关联',
                        subTitle: '厂商、类型和系列信息',
                    },
                    list: [
                        {
                            title: '要素',
                            content: '多人游戏、合作',
                        },
                        {
                            title: '开发厂',
                            content: 'Valve',
                        },
                        {
                            title: '发行商',
                            content: 'Valve',
                        },
                        {
                            title: '代理',
                            content: '完美世界',
                        },
                        {
                            title: '流派',
                            content: '免费游戏、动作、策略',
                        },
                        {
                            title: '特性',
                            content: '团队导向、免费游戏、多人、MOBA、策略',
                        },
                        {
                            title: '系列',
                            content: '信仰',
                        },
                    ],
                };
                $scope.schedule = {
                    submitLink,
                    header: {
                        mainTitle: '日程表',
                        subTitle: '公众事件的时间',
                    },
                    list: [
                        {
                            title: '据点成立',
                            content: '2015-11-31',
                        },
                        {
                            title: '公开',
                            content: '2010-10-13',
                        },
                        {
                            title: '预售',
                            content: '2011-07-05',
                        },
                        {
                            title: '正式发行',
                            content: '2013-7-9',
                        },
                    ],
                };
                $scope.language = {
                    submitLink,
                    header: {
                        mainTitle: '原生语言',
                        subTitle: '游戏分发时的默认语言',
                    },
                    list: [
                        {
                            title: '英语',
                            content: '界面、字幕、配音',
                        },
                        {
                            title: '日语',
                            content: '界面、字幕、配音',
                        },
                        {
                            title: '简体中文',
                            content: '界面、字幕、配音',
                        },
                        {
                            title: '繁体中文',
                            content: '界面、字幕、配音',
                        },
                    ],
                };
                $scope.chinese = {
                    submitLink,
                    header: {
                        mainTitle: '华语可用度',
                        subTitle: '游戏对中文的支持程度',
                    },
                    list: [
                        {
                            title: '天邈汉化链接',
                        },
                        {
                            title: '蒹葭汉化链接',
                        },
                        {
                            title: '起源汉化链接',
                        },
                    ],
                };
            });

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('EditInfoController', EditInfoController);
}());
