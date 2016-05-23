(function () {
    class PushEntryController {
        constructor(type) {
            switch (type) {
                case 'slideShow':
                    this.subTitle = '入口 - 广场 - 四格幻灯片';
                    break;
            }
        }
    }

    keylolApp.controller('PushEntryController', PushEntryController);
}());
