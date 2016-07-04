(function () {
    class EditInfoController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state, utils, pointAttributes, moment, $location) {
            let fetchPromise;
            if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code)) {
                fetchPromise = pageLoad('aggregation.point.edit.info');
            } else {
                fetchPromise = pageLoad('aggregation.point', { entrance: 'EditInfo' });
            }

            fetchPromise.then(() => {
                if ($location.path().match(/\/point\/[^\/]*\/edit\/?$/)) {
                    pageHead.setTitle(
                        `编辑据点 - ${stateTree.aggregation.point.basicInfo.chineseName ? `${stateTree.aggregation.point.basicInfo.chineseName} - ` : ''}`
                        + `${stateTree.aggregation.point.basicInfo.englishName} - 其乐`);
                } else {
                    pageHead.setTitle(
                        `资料 - 编辑据点 - ${stateTree.aggregation.point.basicInfo.chineseName ?
                            `${stateTree.aggregation.point.basicInfo.chineseName} - ` : ''}`
                        + `${stateTree.aggregation.point.basicInfo.englishName} - 其乐`);
                }
                pageHead.setDescription(`${stateTree.aggregation.point.basicInfo.chineseName
                || stateTree.aggregation.point.basicInfo.englishName} 社区`);
                const keywords = [stateTree.aggregation.point.basicInfo.englishName, '编辑, steam, 杉果, 评测, 社区, 折扣, 史低'];
                if (stateTree.aggregation.point.basicInfo.chineseName) {
                    keywords.unshift(stateTree.aggregation.point.basicInfo.chineseName);
                }
                pageHead.setKeywords(keywords);

                const submitLink = `point/${stateTree.aggregation.point.basicInfo.id}`;
                $scope.theme = {
                    main: stateTree.aggregation.point.basicInfo.themeColor,
                    light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                };

                $scope.type = stateTree.aggregation.point.basicInfo.type;
                if ( $scope.type !== 'game' && $scope.type !== 'hardware') {
                    $scope.type = 'other';
                }

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

                if ( $scope.type === 'other') {
                    return;
                }

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

                if (stateTree.aggregation.point.edit.info.platformPoints === undefined) {
                    stateTree.aggregation.point.edit.info.platformPoints = [];
                }
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

                /**
                 * deal with relative obj
                 */
                const relative = {
                    submitLink,
                    header: {
                        mainTitle: '关联',
                        subTitle: '厂商、类型和系列信息',
                    },
                    list: null,
                };

                if ($scope.type !== 'hardware') {
                    relative.list = [
                        {
                            title: '要素',
                            keys: [],
                            type: 'checkbox',
                            value: '',
                            selects: [],
                            names: [],
                        },
                        {
                            title: '开发厂',
                            key: 'developerPoints',
                            type: 'point',
                            whitelist: ['vendor'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.developerPoints,
                        },
                        {
                            title: '发行商',
                            key: 'publisherPoints',
                            type: 'point',
                            whitelist: ['vendor'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.publisherPoints,
                        },
                        {
                            title: '代理',
                            key: 'resellerPoints',
                            type: 'point',
                            whitelist: ['vendor'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.resellerPoints,
                        },
                        {
                            title: '流派',
                            key: 'genrePoints',
                            type: 'point',
                            whitelist: ['category'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.genrePoints,
                        },
                        {
                            title: '特性',
                            key: 'tagPoints',
                            type: 'point',
                            whitelist: ['category'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.tagPoints,
                        },
                        {
                            title: '系列',
                            key: 'seriesPoints',
                            type: 'point',
                            whitelist: ['category'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.seriesPoints,
                        },
                    ];

                    const attributes = relative.list[0];
                    const attributeNameArray = [];
                    let attributeCount = 0;
                    for (const attr in pointAttributes) {
                        if (pointAttributes.hasOwnProperty(attr)) {
                            attributes.keys.push(attr);
                            attributes.names.push(pointAttributes[attr].text);
                            if (stateTree.aggregation.point.edit.info[attr]) {
                                attributes.selects.push(attributeCount);
                                attributeNameArray.push(pointAttributes[attr].text);
                            }
                            attributeCount++;
                        }
                    }
                    attributes.value = attributeNameArray.toString();
                } else {
                    relative.list = [
                        {
                            title: '制造商',
                            key: 'publisherPoints',
                            type: 'point',
                            whitelist: ['vendor'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.manufacturerPoints,
                        },
                        {
                            title: '特性',
                            key: 'tagPoints',
                            type: 'point',
                            whitelist: ['category'],
                            value: '',
                            selects: stateTree.aggregation.point.edit.info.tagPoints,
                        },
                    ];
                }

                for (let i = 1;i < relative.list.length;i++) {
                    const section = relative.list[i];
                    const nameArray = [];
                    for (let j = 0;j < stateTree.aggregation.point.edit.info[section.key].length;j++) {
                        nameArray.push(utils.getPreferredPointName(stateTree.aggregation.point.edit.info[section.key][j])[0]);
                    }
                    section.value = nameArray.toString();
                }

                $scope.relative = relative;
                
                $scope.schedule = {
                    submitLink,
                    header: {
                        mainTitle: '日程表',
                        subTitle: '公众事件的时间',
                    },
                    list: [
                        {
                            title: '据点成立',
                            type: 'date',
                            key: 'pointCreateTime',
                            value: stateTree.aggregation.point.edit.info.pointCreateTime ? moment(stateTree.aggregation.point.edit.info.pointCreateTime).format('YYYY-MM-DD') : '',
                            editDisabled: true,
                        },
                        {
                            title: '公开',
                            type: 'date',
                            key: 'publishDate',
                            value: stateTree.aggregation.point.edit.info.publishDate ? moment(stateTree.aggregation.point.edit.info.publishDate).format('YYYY-MM-DD') : '',
                        },
                        {
                            title: '预售',
                            type: 'date',
                            key: 'preOrderDate',
                            value: stateTree.aggregation.point.edit.info.preOrderDate ? moment(stateTree.aggregation.point.edit.info.preOrderDate).format('YYYY-MM-DD') : '',
                        },
                        {
                            title: '正式发行',
                            type: 'date',
                            key: 'releaseDate',
                            value: stateTree.aggregation.point.edit.info.releaseDate ? moment(stateTree.aggregation.point.edit.info.releaseDate).format('YYYY-MM-DD') : '',
                        },
                    ],
                };

                if ($scope.type === 'hardware') {
                    return;
                }
                /**
                 * deal with language obj
                 */
                const language = {
                    submitLink,
                    header: {
                        mainTitle: '原生语言',
                        subTitle: '游戏分发时的默认语言',
                    },
                    list: [
                        {
                            title: '英语',
                            fromKey: 'englishLanguage',
                            type: 'checkbox',
                            value: '',
                            selects: [],
                        },
                        {
                            title: '日语',
                            fromKey: 'japaneseLanguage',
                            type: 'checkbox',
                            value: '',
                            selects: [],
                        },
                        {
                            title: '简体中文',
                            fromKey: 'simplifiedChineseLanguage',
                            type: 'checkbox',
                            value: '',
                            selects: [],
                        },
                        {
                            title: '繁体中文',
                            fromKey: 'traditionalChineseLanguage',
                            type: 'checkbox',
                            value: '',
                            selects: [],
                        },
                    ],
                };

                if (stateTree.aggregation.point.edit.info.chineseAvailability === undefined) {
                    stateTree.aggregation.point.edit.info.chineseAvailability = {
                        thirdPartyLinks: [],
                    };
                }

                for (let i = 0;i < language.list.length;i++) {
                    const eachLanguage = language.list[i];
                    eachLanguage.keys = ['interface', 'subtitles', 'fullAudio'];
                    eachLanguage.names = ['界面', '字幕', '配音'];
                    const fromKey = eachLanguage.fromKey.slice(0, -8);
                    if (stateTree.aggregation.point.edit.info.chineseAvailability[fromKey]) {
                        const nameArray = [];
                        for (let j = 0;j < eachLanguage.keys.length;j++) {
                            if (stateTree.aggregation.point.edit.info.chineseAvailability[fromKey][eachLanguage.keys[j]]) {
                                nameArray.push(eachLanguage.names[j]);
                                eachLanguage.selects.push(j);
                            }
                        }
                        eachLanguage.value = nameArray.toString();
                    }
                }

                $scope.language = language;

                /**
                 * deal with chinese obj
                 */
                const chinese = {
                    submitLink,
                    updateObject: {
                        chineseThirdPartyLinks: stateTree.aggregation.point.edit.info.chineseAvailability.thirdPartyLinks,
                    },
                    addAttribute: {
                        type: 'attribute',
                        title: '汉化组织名称',
                        value: '',
                        text: '添加汉化团体',
                        itemBasic: {
                            value: '',
                            type: 'text',
                            key: 'link',
                        },
                    },
                    header: {
                        mainTitle: '华语可用度',
                        subTitle: '游戏对中文的支持程度',
                    },
                    list: [
                        {
                            title: '天邈汉化链接',
                            type: 'text',
                            key: 'link',
                            value: '',
                        },
                        {
                            title: '蒹葭汉化链接',
                            type: 'text',
                            key: 'link',
                            value: '',
                        },
                        {
                            title: '起源汉化链接',
                            type: 'text',
                            key: 'link',
                            value: '',
                        },
                    ],
                };

                for (let i = 0;i < stateTree.aggregation.point.edit.info.chineseAvailability.thirdPartyLinks.length;i++) {
                    const thirdPartyLink = stateTree.aggregation.point.edit.info.chineseAvailability.thirdPartyLinks[i];
                    switch (thirdPartyLink.title) {
                        case '天邈汉化链接':
                            chinese.list[0].value = thirdPartyLink.link;
                            chinese.list[0].index = i;
                            break;
                        case '蒹葭汉化链接':
                            chinese.list[1].value = thirdPartyLink.link;
                            chinese.list[1].index = i;
                            break;
                        case '起源汉化链接':
                            chinese.list[2].value = thirdPartyLink.link;
                            chinese.list[2].index = i;
                            break;
                        default:
                            chinese.list.push({
                                title: thirdPartyLink.title,
                                value: thirdPartyLink.link,
                                type: 'text',
                                key: 'link',
                                index: i,
                            });
                    }
                }

                $scope.chinese = chinese;
            });

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('EditInfoController', EditInfoController);
}());
