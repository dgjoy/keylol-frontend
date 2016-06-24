(function () {
    class GoodDetailController {
        constructor(close) {
            $.extend(this,{
                close,
            });
        }
        exit() {
            this.close();
        }
    }
    keylolApp.controller('GoodDetailController', GoodDetailController);
}());
