(function () {
    "use strict";

    keylolApp.controller("SiteFooterController", [
        "$scope", "$element", "$window",
        function ($scope, $element, $window) {
            $scope.scrollToTop = function () {
                $("body").animate({
                    scrollTop: 0
                });
            };

            var $$window = $($window);
            $$window.scroll(function () {
                if(!$scope.canScrollTop && $$window.scrollTop() + $$window.height() > $element.offset().top + $element.height() + 100){
                    $scope.canScrollTop = true;
                }else if($scope.canScrollTop && $$window.scrollTop() + $$window.height() <= $element.offset().top + $element.height() + 100){
                    $scope.canScrollTop = false;
                }
            });
            var cancelListenRoute = $scope.$on("$destroy", function () {
                $$window.unbind("scroll");
                cancelListenRoute();
            });
        }
    ]);
})();