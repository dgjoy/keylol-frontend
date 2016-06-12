(function () {
    class ProductListController {
        constructor () {
            
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
