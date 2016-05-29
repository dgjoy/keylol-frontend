(function () {
    class EditorController {
        constructor() {
            this.isSummaryOpened = false;
            this.isRepostOpened = false;
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
