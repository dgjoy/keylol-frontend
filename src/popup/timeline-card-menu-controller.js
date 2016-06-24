(function () {
    class TimelineCardMenuController {
        constructor(origin, content, options, stateTree, close, window) {
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
                                contentId: content.contentId,
                                contentType: content.contentType,
                                operationType,
                            },
                        },
                    }).then(popup => {
                        return popup.close;
                    }).then(result => {
                        if (result !== undefined) {
                            content[key[operationType]] = result;
                        }
                    });
                };
            }

            if (options.inActivity) {
                content.contentId = content.id;
                content.contentType = 'activity';
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
                        text: `进入${content.contentType === 'activity' ? '动态' : '文章'}`,
                        type: 'item',
                        link: options.link,
                    },
                ]);
            }

            if (stateTree.currentUser) {
                const extraItems = [
                    {
                        type: 'horizon',
                    },
                    {
                        text: `${content.archived ? '撤销' : ''}封存`,
                        type: 'item',
                        clickAction: showOperationPanel(`${content.archived ? 'Un' : ''}Archived`),
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
                            text: `${content.rejected ? '撤销' : ''}退稿`,
                            type: 'item',
                            clickAction: showOperationPanel(`${content.rejected ? 'Un' : ''}Rejected`),
                        },
                        {
                            text: `${content.warned ? '撤销' : ''}警告`,
                            type: 'item',
                            clickAction: showOperationPanel(`${content.warned ? 'Un' : ''}Warned`),
                        },
                    ]);

                    if (content.contentType === 'article') {
                        Array.prototype.push.apply(this.menu.items, [
                            {
                                type: 'item',
                                text: `${content.spotlighted ? '撤销' : ''}萃选`,
                                clickAction: showOperationPanel(`${content.spotlighted ? 'Un' : ''}Spotlighted`),
                            },
                            {
                                type: 'item',
                                text: '推送',
                                clickAction ($event) {
                                    window.show({
                                        templateUrl: 'src/windows/article-pusher.html',
                                        controller: 'ArticlePusherController as articlePusher',
                                        inputs: {
                                            article: content,
                                        },
                                    });
                                    close();
                                },
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

        getText() {

        }

        // function showApproverList() {
        //     close();
        //     origin.popup({
        //         templateUrl: 'src/popup/approver-list.html',
        //         controller: 'ApproverListController as approverList',
        //         event: origin.event,
        //         attachSide: 'bottom',
        //         align: 'center',
        //         offsetX: 0,
        //         offsetY: 20,
        //         inputs: { content: 'hello' },
        //     });
        // }

        // function showReportAbuse() {
        //     close();
        //     origin.popup({
        //         templateUrl: 'src/popup/report-abuse.html',
        //         controller: 'ReportAbuseController as reportAbuse',
        //         event: origin.event,
        //         attachSide: 'bottom',
        //         align: 'center',
        //         offsetX: 0,
        //         offsetY: 20,
        //         inputs: { content: 'hello' },
        //     });
        // }
    }

    keylolApp.controller('TimelineCardMenuController', TimelineCardMenuController);
}());
