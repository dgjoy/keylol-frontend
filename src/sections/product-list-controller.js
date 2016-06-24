(function () {
    class ProductListController {
        constructor ($scope) {
            this.first = true;
            this.currentPage = 1;
            this.end = (this.object.cards.length <= 24);

            if (!this.end) {
                this.scrollHandler = $(window).on('scroll', () => {
                    if (!this.first && !this.end) {
                        if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
                            $scope.$apply(() => {
                                this.load();
                            });
                        }
                    }
                });

                $scope.$on('$destroy',() => {
                    $(window).unbind('scroll',this.scrollHandler);
                });
            }
        }

        load() {
            this.first = false;
            this.currentPage += 1;
            if (24 * this.currentPage > this.object.cards.length) {
                this.end = true;
                $(window).unbind('scroll',this.scrollHandler);
            }
        }
    }

    keylolApp.component('productList', {
        templateUrl: 'src/sections/product-list.html',
        controller: ProductListController,
        controllerAs: 'productList',
        bindings: {
            object: '<',
            type: '<',
            theme: '<',
        },
    });
}());
