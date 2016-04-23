(function () {
    keylolApp.filter('couponShopUrl', ['$filter', $filter => {
        return input => {
            return $filter('uriRelocate')(input, 'coupon.shop.list');
        };
    }]);
}());
