(function () {
    class MissiveCardController {
        constructor(close) {
            $.extend(this,{
                close,
            });

            this.score = 1;
            this.content = '';
        }
        exit() {
            this.close();
        }
        
    }
    keylolApp.controller('MissiveCardController', MissiveCardController);
}());
