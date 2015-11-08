(function () {
    "use strict";

    keylolApp.filter("backgroundUrl", function () {
        return function (input) {
            return input
                ? "//keylol.b0.upaiyun.com/" + input + "!profile.point.background"
                : "//keylol.b0.upaiyun.com/991a9466477b8f5b49dbd034fc93bcd5.jpg!profile.point.background";
        };
    });
})();