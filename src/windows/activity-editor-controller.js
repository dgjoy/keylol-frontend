(function () {
    class ActivityEditorController {
        constructor(close, type) {
            $.extend(this,{
                close,
                type,
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
