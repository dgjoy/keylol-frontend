(function () {
    "use strict";

    keylolApp.filter("backgroundUrl", [
        "$filter",
        function ($filter) {
            return function (input) {
                return $filter("uriRelocate")(input, "profile.point.background", "keylol://0f9b6041e0354a7ae741e2650fa0c066.jpg");
            };
        }
    ]);
})();