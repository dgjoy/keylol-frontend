(function () {
    class EditStyleController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state) {
            pageHead.setTitle('据点 - 编辑 - 样式 - 其乐');

            let fetchPromise;
            if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code)) {
                fetchPromise = pageLoad('aggregation.point.edit.style');
            } else {
                fetchPromise = pageLoad('aggregation.point', { entrance: 'EditStyle' });
            }

            fetchPromise.then(() => {
                const submitLink = `point/${stateTree.aggregation.point.basicInfo.id}`;
                $scope.theme = {
                    main: stateTree.aggregation.point.basicInfo.themeColor,
                    light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                };

                $scope.images = {
                    submitLink,
                    header: {
                        mainTitle: '视像',
                        subTitle: '据点的图像和视频资源',
                    },
                    list: [
                        {
                            title: '页眉照片',
                            subTitle: '据点、来稿文章的顶部图片',
                            key: 'headerImage',
                            type: 'cover',
                            value: stateTree.aggregation.point.basicInfo.headerImage,
                        },
                        {
                            title: '头像图标',
                            key: 'avatarImage',
                            type: 'avatar',
                            value: stateTree.aggregation.point.basicInfo.avatarImage,
                        },
                        {
                            title: '媒体中心封面',
                            subTitle: '媒体中心的封面图片',
                            key: 'mediaHeaderImage',
                            type: 'cover',
                            value: stateTree.aggregation.point.edit.style.mediaHeaderImage,
                        },
                        {
                            title: '标题封面',
                            subTitle: '在评价卡片展示的图片',
                            key: 'titleCoverImage',
                            type: 'cover',
                            value: stateTree.aggregation.point.basicInfo.titleCoverImage,
                        },
                        {
                            title: '缩略图',
                            subTitle: '在列表中展示的游戏封面',
                            key: 'thumbnailImage',
                            type: 'thumbnail',
                            value: stateTree.aggregation.point.edit.style.thumbnailImage,
                        },
                    ],
                };
                $scope.themeDiy = {
                    submitLink,
                    header: {
                        mainTitle: '界面客制化',
                        subTitle: '自定义据点的配色和图案',
                    },
                    list: [
                        {
                            title: 'Logo',
                            subTitle: '导航栏的自定义图案标志',
                            key: 'logo',
                            type: 'logo',
                            value: stateTree.aggregation.point.basicInfo.logo,
                        },
                        {
                            title: '主题色',
                            subTitle: '代表据点的主题。为了衬托白色内容，主题色不应过亮或过淡',
                            key: 'themeColor',
                            type: 'color',
                            value: stateTree.aggregation.point.basicInfo.themeColor,
                            colorType: 'A',
                        },
                        {
                            title: '轻主题色',
                            subTitle: '用于醒目提醒。同样的，为了衬托白色内容，轻主题色亦不应过亮或过淡。',
                            key: 'lightThemeColor',
                            type: 'color',
                            value: stateTree.aggregation.point.basicInfo.lightThemeColor,
                            colorType: 'B',
                        },
                    ],
                };
            });

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('EditStyleController', EditStyleController);
}());
