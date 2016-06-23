(function () {
    class TimelineCardMenuController {
        constructor(origin, close, options, stateTree, content, window) {
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
                items: [
                    // {
                    //     text: '点过认可的用户',
                    //     type: 'item',
                    //     clickAction: showApproverList,
                    // },
                    // {
                    //     type: 'horizon',
                    // },
                    // {
                    //     text: '举报',
                    //     type: 'item',
                    //     clickAction: showReportAbuse,
                    // },
                ],
            };

            if (options.link) {
                Array.prototype.unshift.apply(this.menu.items, [
                    {
                        text: '进入文章',
                        type: 'item',
                        link: options.link,
                    },
                    {
                        type: 'horizon',
                    },
                ]);
            }

            if (stateTree.currentUser) {
                const extraItems = [
                    {
                        type: 'item',
                        text: '封存',
                        clickAction ($event) {
                            origin.popup({
                                templateUrl: 'src/popup/operation-panel.html',
                                controller: 'OperationPanelController as operationPanel',
                                event: $event,
                                attachSide: 'bottom',
                                align: 'center',
                                offsetX: 0,
                                offsetY: 20,
                                inputs: { content: 'hello' },
                            });
                            close();
                        },
                    },
                ];

                if (content && options.inActivity) {
                    extraItems.unshift(
                        {
                            text: '编辑',
                            type: 'item',
                            clickAction () {
                                window.show({
                                    templateUrl: 'src/windows/activity-editor.html',
                                    controller: 'ActivityEditorController',
                                    controllerAs: 'activityEditor',
                                    inputs: {
                                        options: {
                                            activity: content,
                                        },
                                    },
                                });
                                close();
                            },
                        }
                    );
                }

                if (stateTree.currentUser.roles.indexOf('Operator') > -1) {
                    Array.prototype.push.apply(this.menu.items, extraItems);
                    Array.prototype.push.apply(this.menu.items, [
                        {
                            text: '退稿',
                            type: 'item',
                            clickAction: showOperationPanel,
                        },
                        {
                            text: '警告',
                            type: 'item',
                        },
                    ]);

                    if (content.contentType === 'article') {
                        Array.prototype.push.apply(this.menu.items, [
                            {
                                type: 'item',
                                text: '萃选',
                            },
                            {
                                type: 'item',
                                text: '推送',
                            },
                        ]);
                    }
                } else {
                    let authorId;
                    if (content.authorBasicInfo) {
                        authorId = content.authorBasicInfo.id;
                    } else if (content.author) {
                        authorId = content.authorBasicInfo.id;
                    }

                    if (stateTree.currentUser.id === authorId) {
                        Array.prototype.push.apply(this.menu.items, extraItems);
                    }
                }
            }
        }
    }

    keylolApp.controller('TimelineCardMenuController', TimelineCardMenuController);
}());
