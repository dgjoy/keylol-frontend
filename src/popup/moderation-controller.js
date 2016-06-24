(function () {
    class ModerationController {
        constructor (close, type, window, options) {
            this.moderationMenu = {
                items: [
                    {
                        type: 'item',
                        text: '调整内容',
                        clickAction () {
                            window.show({
                                templateUrl: 'src/windows/edit-show-case.html',
                                controller: 'EditShowCaseController',
                                controllerAs: 'editShowCase',
                                inputs: {
                                    type,
                                    options,
                                },
                            });
                            close();
                        },
                    },
                    {
                        type: 'item',
                        text: '推送新条目',
                        clickAction () {
                            window.show({
                                templateUrl: 'src/windows/push-entry.html',
                                controller: 'PushEntryController',
                                controllerAs: 'pushEntry',
                                inputs: {
                                    type,
                                    options,
                                },
                            });
                            close();
                        },
                    },
                ],
            };
        }
    }

    keylolApp.controller('ModerationController', ModerationController);
}());
