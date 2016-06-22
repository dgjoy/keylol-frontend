(function () {
    class TimelineCardMenuController {
        constructor(origin, close, link) {
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
                    controller: 'ReportAbuseController as reportAbuse',
                    event: origin.event,
                    attachSide: 'bottom',
                    align: 'center',
                    offsetX: 0,
                    offsetY: 20,
                    inputs: { content: 'hello' },
                });
            }

            function showOperationPanel() {
                close();
                origin.popup({
                    templateUrl: 'src/popup/operation-panel.html',
                    controller: 'OperationPanelController as operationPanel',
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
                    link,
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
                    clickAction: showOperationPanel,
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
