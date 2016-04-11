(function () {
    "use strict";

    keylolApp.filter("couponShopUrl", [
        "$filter",
        function ($filter) {
            return function (input) {
                return $filter("uriRelocate")(input, "coupon.shop.list");
            };
        }
    ]);
})();