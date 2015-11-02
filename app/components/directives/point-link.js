(function () {
    "use strict";

    keylolApp.directive("pointLink", [
        function () {
            return {
                restrict: "E",
                templateUrl: "components/directives/point-link.html",
                scope: {
                    idCode: "=",
                    pointName: "="
                },
                link: function (scope) {
                    scope.linkHover = function ($event) {
                        scope.cardPopup =  scope.showPointCard({
                            templateUrl: "components/popup/point-preview-card.html",
                            controller: "PointPreviewCardController",
                            event: $event,
                            attachSide: "bottom",
                            align: "left",
                            inputs: {
                                idCode: scope.idCode
                            }
                        });
                    };
                    scope.stopShowPointCard = function() {
                        if (scope.cardPopup) {
                            scope.cardPopup.then(function (popup) {
                                popup.closeNow();
                            });
                        }
                    }
                }
            };
        }
    ]);
})();