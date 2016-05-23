(function () {
    keylolApp.controller('OperationFeedbackController', [
        '$scope', 'close', 'options', '$timeout',
        ($scope, close, options, $timeout) => {
            $scope.options = options;
            if ($scope.options.type !== 'attention') {
                $timeout(() => {
                    close();
                }, 2000);
            } else {
                $timeout(() => {
                    close();
                }, 5000);
            }
            $scope.close = function (result) {
                close(result);
            };
        },
    ]);
}());