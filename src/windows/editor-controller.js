(function () {
    class EditorController {
        constructor(close) {
            $.extend(this,{
                close,
            });

            this.isSummaryOpened = false;
            this.isRepostOpened = false;
        }
        exit() {
            this.close();
        }
        toggleSummary() {
            this.isSummaryOpened = !this.isSummaryOpened;
        }
        toggleRepost() {
            this.isRepostOpened = !this.isRepostOpened;
        }
    }
    keylolApp.controller('EditorController', EditorController);
}());
