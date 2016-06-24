(function () {
    class ArticleModerationController {
        constructor (close, window, origin, article, stateTree) {
            function showOperationPanel (operationType) {
                return () => {
                    close();
                    const key = {
                        Archived: 'archived',
                        Warned: 'warned',
                        Rejected: 'rejected',
                        Spotlighted: 'spotlighted',
                    };

                    origin.popup({
                        templateUrl: 'src/popup/operation-panel.html',
                        controller: 'OperationPanelController as operationPanel',
                        event: origin.event,
                        attachSide: 'bottom',
                        align: 'center',
                        offsetX: 0,
                        offsetY: 20,
                        inputs: {
                            options: {
                                contentId: article.id,
                                contentType: 'article',
                                operationType,
                            },
                        },
                    }).then(popup => {
                        return popup.close;
                    }).then(result => {
                        if (result !== undefined) {
                            article[key[operationType]] = result;
                        }
                    });
                };
            }


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
                    // { type: 'horizon' },
                    // {
                    //     type: 'item',
                    //     text: '举报',
                    //     clickAction ($event) {
                    //         origin.popup({
                    //             templateUrl: 'src/popup/report-abuse.html',
                    //             controller: 'ReportAbuseController as reportAbuse',
                    //             event: $event,
                    //             attachSide: 'bottom',
                    //             align: 'center',
                    //             offsetX: 0,
                    //             offsetY: 20,
                    //             inputs: { content: 'hello' },
                    //         });
                    //         close();
                    //     },
                    // },
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
                                inputs: {
                                    options: {
                                        article,
                                    },
                                },
                            });
                            close();
                        },
                    },
                    {
                        text: `${article.archived ? '撤销' : ''}封存`,
                        type: 'item',
                        clickAction: showOperationPanel(`${article.archived ? 'Un' : ''}Archived`),
                    },
                ];

                if (stateTree.currentUser.roles.indexOf('Operator') > -1) {
                    Array.prototype.push.apply(this.moderationMenu.items, extraItems);
                    Array.prototype.push.apply(this.moderationMenu.items, [
                        {
                            text: `${article.rejected ? '撤销' : ''}退稿`,
                            type: 'item',
                            clickAction: showOperationPanel(`${article.rejected ? 'Un' : ''}Rejected`),
                        },
                        {
                            text: `${article.warned ? '撤销' : ''}警告`,
                            type: 'item',
                            clickAction: showOperationPanel(`${article.warned ? 'Un' : ''}Warned`),
                        },
                        {
                            type: 'item',
                            text: `${article.spotlighted ? '撤销' : ''}萃选`,
                            clickAction: showOperationPanel(`${article.spotlighted ? 'Un' : ''}Spotlighted`),
                        },
                        {
                            type: 'item',
                            text: `${article.push ? '撤销' : ''}推送`,
                            clickAction: () => {},
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
