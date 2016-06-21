(function () {
    class ArticleModerationController {
        constructor (close, window, origin, article, stateTree) {
            this.moderationMenu = {
                items: [
                    {
                        type: 'item',
                        text: '所有来稿据点',
                        clickAction ($event) {
                            origin.popup({
                                templateUrl: 'src/popup/source-list.html',
                                controller: 'SourceListController as sourceList',
                                event: $event,
                                attachSide: 'bottom',
                                align: 'center',
                                offsetX: 0,
                                offsetY: 20,
                                inputs: {
                                    object: {
                                        attachedPoints: article.attachedPoints,
                                        mainPoint: article.pointBasicInfo,
                                    },
                                },
                            });
                            close();
                        },
                    },
                    { type: 'horizon' },
                    {
                        type: 'item',
                        text: '举报',
                        clickAction ($event) {
                            origin.popup({
                                templateUrl: 'src/popup/report-abuse.html',
                                controller: 'ReportAbuseController as reportAbuse',
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
                ],
            };

            if (stateTree.currentUser) {
                const extraItems = [
                    { type: 'horizon' },
                    {
                        type: 'item',
                        text: '编辑',
                        clickAction () {
                            window.show({
                                templateUrl: 'src/windows/editor.html',
                                controller: 'EditorController',
                                controllerAs: 'editor',
                            });
                            close();
                        },
                    },
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

                if (stateTree.currentUser.roles.indexOf('Operator') > -1) {
                    Array.prototype.push.apply(this.moderationMenu.items, extraItems);
                    Array.prototype.push.apply(this.moderationMenu.items, [
                        {
                            type: 'item',
                            text: '退稿',
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
                        {
                            type: 'item',
                            text: '警告',
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
                        {
                            type: 'item',
                            text: '萃选',
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
                        {
                            type: 'item',
                            text: '推送',
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
                    ]);
                } else if (stateTree.currentUser.id === article.authorBasicInfo.id) {
                    Array.prototype.push.apply(this.moderationMenu.items, extraItems);
                }
            }
        }
    }

    keylolApp.controller('ArticleModerationController', ArticleModerationController);
}());
