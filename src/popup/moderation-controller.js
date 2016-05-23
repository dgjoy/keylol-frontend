(function () {
    class ModerationController {
        constructor (close, type, window) {
            this.moderationMenu = {
                items: [
                    {
                        type: 'item',
                        text: '调整内容',
                        clickAction () {
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
