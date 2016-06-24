(function () {
    class PointHeaderMenuController {
        constructor (actions, close, stateTree) {
            this.menu = {
                items: [
                    {
                        type: 'item',
                        text: '编辑',
                        clickAction () {
                            actions[0]();
                            close();
                        },
                    },
                ],
            };

            if (stateTree.currentUser.roles.indexOf('Operator') > -1 && actions.length > 1) {
                this.menu.items.push({
                    type: 'item',
                    text: '推送',
                    clickAction () {
                        actions[1]();
                        close();
                    },
                });
            }
        }
    }

    keylolApp.controller('PointHeaderMenuController', PointHeaderMenuController);
}());
