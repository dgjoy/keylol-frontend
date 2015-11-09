(function () {
    "use strict";

    keylolApp.directive("pointLink", [
        function () {
            return {
                restrict: "E",
                templateUrl: "components/directives/point-link.html",
                scope: {
                    idCode: "=",
                    pointName: "=",
                    type: "=",
                    avatarUrl: "="
                },
                link: function (scope, element) {
                    scope.funcs = {};
                    scope.linkHover = function ($event) {
                        if(scope.avatarUrl){
                            var avatarWidth = element.children().children().width();
                            scope.cardPopup =  scope.funcs.showPointCard({
                                templateUrl: "components/popup/point-preview-card.html",
                                controller: "PointPreviewCardController",
                                event: $event,
                                attachSide: "bottom",
                                align: "left",
                                offsetX: avatarWidth/2 - 39,
                                inputs: {
                                    idCode: scope.idCode,
                                    type: scope.type
                                }
                            });
                        } else {
                            scope.cardPopup =  scope.funcs.showPointCard({
                                templateUrl: "components/popup/point-preview-card.html",
                                controller: "PointPreviewCardController",
                                event: $event,
                                attachSide: "bottom",
                                align: "left",
                                inputs: {
                                    idCode: scope.idCode,
                                    type: scope.type
                                }
                            });
                        }
                    };
                }
            };
        }
    ]);
})();