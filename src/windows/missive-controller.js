(function () {
    keylolApp.controller('MissiveController', [
        '$scope', 'close', '$timeout', '$http', 'notification', 'messageTypes', 'message', 'moderationText',
        ($scope, close, $timeout, $http, notification, messageTypes, message, moderationText) => {
            $scope.cancel = function () {
                close();
            };
            const messageType = messageTypes[message.Type];
            $scope.messageId = message.Id;
            $scope.startTime = message.CreateTime;
            $scope.isSpotlight = message.Type === 'Spotlight';
            $scope.missiveName = messageType.name;
            $scope.missiveEnglishName = messageType.englishName;
            $scope.header = messageType.getHeader(message);
            $scope.footer = messageType.getFooter(message);
            $scope.reasons = message.Reasons;
            switch (message.Type) {
                case 'ArticleArchive':
                case 'CommentArchive':
                    $scope.totalReasons = moderationText.Archived.reasonTexts;
                    break;
                case 'ArticleWarning':
                case 'CommentWarning':
                    $scope.totalReasons = moderationText.Warned.reasonTexts;
                    break;
                case 'Rejection':
                    $scope.totalReasons = moderationText.Rejected.reasonTexts;
                    break;
                default:
                    $scope.totalReasons = [];
                    break;
            }
        },
    ]);
}());
