(function () {
    keylolApp.controller('SiteFooterController', [
        '$scope', '$element', '$window',
        function ($scope, $element, $window) {
            $scope.scrollToTop = function () {
                $('html,body').animate({
                    scrollTop: 0,
                });
            };

            const $$window = $($window);
            $$window.scroll(() => {
                if (!$scope.canScrollTop && $$window.scrollTop() + $$window.height() > $element.offset().top + $element.height() + 100) {
                    $scope.canScrollTop = true;
                } else if ($scope.canScrollTop && $$window.scrollTop() + $$window.height() <= $element.offset().top + $element.height() + 100) {
                    $scope.canScrollTop = false;
                }
            });
            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll');
                cancelListenRoute();
            });
        },
    ]);
}());
