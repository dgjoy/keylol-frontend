(function () {
    "use strict";

    keylolApp.filter("backgroundUrl", [
        "$filter",
        function ($filter) {
            return function (input) {
                return $filter("uriRelocate")(input, "profile.point.background", "keylol://e2d611b9650daf5c08d307f24cf8b308.jpg");
            };
        }
    ]);
})();