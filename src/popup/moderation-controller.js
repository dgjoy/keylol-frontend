(function () {
    class ModerationController {
        constructor (union) {
            $.extend(this, {
                union,
            });
            this.moderationMenu = {
                items: [
                    {
                        type: 'item',
                        text: '调整内容',
                    },
                    {
                        type: 'item',
                        text: '推送新条目',
                    },
                ],
            };
        }
    }

    keylolApp.controller('ModerationController', ModerationController);
}());
