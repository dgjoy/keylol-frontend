(function () {
    class MissiveController {
        constructor(close, $sce, object, moderationText) {
            $.extend(this,{
                close,
                object,
                $sce,
            });

            console.log(object.type);

            switch (object.type) {
                case 'articleArchive':
                case 'commentArchive':
                    this.reasons = moderationText.Archived.reasonTexts;
                    break;
                case 'articleWarning':
                case 'commentWarning':
                    this.reasons = moderationText.Warned.reasonTexts;
                    break;
                case 'rejection':
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
