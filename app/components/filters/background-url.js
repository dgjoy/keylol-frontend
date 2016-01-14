(function () {
    "use strict";

    keylolApp.filter("backgroundUrl", [
        "$filter",
        function ($filter) {
            return function (input) {
                return $filter("uriRelocate")(input, "profile.point.background", "keylol://991a9466477b8f5b49dbd034fc93bcd5.jpg");
            };
        }
    ]);
})();