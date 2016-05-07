(function () {
    class SiteFooterController {
        constructor ($scope, $element, $window) {
            $.extend(this, {
                window,
            });

            const $$window = $($window);
            const scrollCallback = () => {
                if (!this.canScrollTop && $$window.scrollTop() + $$window.height() > $element.offset().top + $element.height() + 100) {
                    this.canScrollTop = true;
                } else if (this.canScrollTop && $$window.scrollTop() + $$window.height() <= $element.offset().top + $element.height() + 100) {
                    this.canScrollTop = false;
                }
            };
            $$window.scroll(scrollCallback);
            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });
        }
        scrollToTop () {
            $('html,body').animate({
                scrollTop: 0,
            });
        }
    }

    keylolApp.component('siteFooter', {
        templateUrl: 'src/sections/site-footer.html',
        controller: SiteFooterController,
        controllerAs: 'siteFooter',
    });
}());
