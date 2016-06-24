(function () {
    class EditLogController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('据点 - 编辑 - 变更日志 - 其乐');

            $scope.logs = [
                {
                    title: '页眉照片',
                    subTitle: '据点、来稿文章的顶部图片',
                },
                {
                    title: '头像图标',
                },
                {
                    title: '媒体中心封面',
                    subTitle: '媒体中心的封面图片',
                },
                {
                    title: '标题封面',
                    subTitle: '在评价卡片展示的图片',
                },
                {
                    title: '缩略图',
                    subTitle: '在列表中展示的游戏封面',
                },
            ];

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('EditLogController', EditLogController);
}());
