(function () {
    keylolApp.directive('pointLink',  () => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/point-link.html',
            scope: {
                idCode: '=',
                pointName: '=',
                type: '=',
                avatarUrl: '=',
                newPage: '=',
            },
            link (scope, element) {
                scope.funcs = {};
                scope.linkHover = $event => {
                    if (scope.avatarUrl) {
                        const avatarWidth = element.children().children().width();
                        scope.cardPopup = scope.funcs.showPointCard({
                            templateUrl: 'src/popup/point-preview-card.html',
                            controller: 'PointPreviewCardController',
                            event: $event,
                            attachSide: 'bottom',
                            align: 'left',
                            offsetX: avatarWidth / 2 - 39,
                            inputs: {
                                idCode: scope.idCode,
                                type: scope.type,
                            },
                        });
                    } else {
                        scope.cardPopup = scope.funcs.showPointCard({
                            templateUrl: 'src/popup/point-preview-card.html',
                            controller: 'PointPreviewCardController',
                            event: $event,
                            attachSide: 'bottom',
                            align: 'left',
                            inputs: {
                                idCode: scope.idCode,
                                type: scope.type,
                            },
                        });
                    }
                };
            },
        };
    });
}());
