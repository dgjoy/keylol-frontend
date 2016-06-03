(function () {
    class ActivityEditorController {
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
    keylolApp.controller('ActivityEditorController', ActivityEditorController);
}());
