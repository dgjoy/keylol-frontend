(function () {
    class MissiveController {
        constructor(close, messageTypes, message, moderationText) {
            $.extend(this,{
                close,
            });
            
            const messageType = messageTypes[message.Type];
            
            this.messageId = message.Id;
            this.startTime = message.CreateTime;
            this.isSpotlight = message.Type === 'Spotlight';
            this.missiveName = messageType.name;
            this.missiveEnglishName = messageType.englishName;
            this.header = messageType.getHeader(message);
            this.footer = messageType.getFooter(message);
            this.reasons = message.Reasons;
            
            switch (message.Type) {
                case 'ArticleArchive':
                case 'CommentArchive':
                    this.totalReasons = moderationText.Archived.reasonTexts;
                    break;
                case 'ArticleWarning':
                case 'CommentWarning':
                    this.totalReasons = moderationText.Warned.reasonTexts;
                    break;
                case 'Rejection':
                    this.totalReasons = moderationText.Rejected.reasonTexts;
                    break;
                default:
                    this.totalReasons = [];
                    break;
            }
        }
        
        cancel() {
            const close = this.close;
            
            close();
        }
    }
    
    keylolApp.controller('MissiveController', MissiveController);
}());
