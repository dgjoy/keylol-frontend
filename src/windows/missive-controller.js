(function () {
    class MissiveController {
        constructor(close, $sce, object, moderationText, stateTree) {
            $.extend(this,{
                close,
                object,
                $sce,
                stateTree,
            });

            switch (object.messageType.name) {
                case '封存通告':
                    this.reasons = moderationText.Archived.reasonTexts;
                    break;
                case '惩教警告':
                    this.reasons = moderationText.Warned.reasonTexts;
                    break;
                case '退稿函':
                    this.reasons = moderationText.Rejected.reasonTexts;
                    break;
                default:
                    this.reasons = [];
                    break;
            }
        }
        exit() {
            this.close();
        }
        
    }
    keylolApp.controller('MissiveController', MissiveController);
}());
