(function () {
    "use strict";

    keylolApp.filter("coverUrl", [
        "$filter",
        function ($filter) {
            return function (input) {
                return $filter("uriRelocate")(input);
            };
        }
    ]);
})();