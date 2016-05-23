(function () {
    class TimelineCardMenuController {
        constructor(content) {
            $.extend(this,{
               content,
            });

            this.menu = {
                items: [
                    {
                        text: '进入文章',
                        type: 'item',
                    },
                    {
                        text: '点过认可的用户',
                        type: 'item',
                    },
                    {
                        type: 'horizon',
                    },
                    {
                        text: '举报',
                        type: 'item',
                    },
                    {
                        type: 'horizon',
                    },
                    {
                        text: '退稿',
                        type: 'item',
                    },
                    {
                        text: '封存',
                        type: 'item',
                    },
                    {
                        text: '删除',
                        type: 'item',
                    },
                    {
                        text: '警告',
                        type: 'item',
                    },
                ],
            };
        }
    }

    keylolApp.controller('TimelineCardMenuController', TimelineCardMenuController);
}());
