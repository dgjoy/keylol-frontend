(function () {
    class TimelineCardMenuController {
        constructor(origin, close) {
            function showApproverList() {
                close();
                origin.popup({
                    templateUrl: 'src/popup/approver-list.html',
                    controller: 'ApproverListController as approverList',
                    event: origin.event,
                    attachSide: 'bottom',
                    align: 'center',
                    offsetX: 0,
                    offsetY: 20,
                    inputs: { content: 'hello' },
                });
            }

            function showReportAbuse() {
                close();
                origin.popup({
                    templateUrl: 'src/popup/report-abuse.html',
                    controller: 'ApproverListController as approverList',
                    event: origin.event,
                    attachSide: 'bottom',
                    align: 'center',
                    offsetX: 0,
                    offsetY: 20,
                    inputs: { content: 'hello' },
                });
            }

            this.menu = {
                items: [{
                    text: '进入文章',
                    type: 'item',
                },{
                    text: '点过认可的用户',
                    type: 'item',
                    clickAction: showApproverList,
                },{
                    type: 'horizon',
                },{
                    text: '举报',
                    type: 'item',
                    clickAction: showReportAbuse,
                },{
                    type: 'horizon',
                },{
                    text: '退稿',
                    type: 'item',
                },{
                    text: '封存',
                    type: 'item',
                },{
                    text: '删除',
                    type: 'item',
                },{
                    text: '警告',
                    type: 'item',
                }],
            };
        }
    }

    keylolApp.controller('TimelineCardMenuController', TimelineCardMenuController);
}());
