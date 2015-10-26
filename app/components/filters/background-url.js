(function () {
    "use strict";

    keylolApp.filter("backgroundUrl", function () {
        return function (input) {
            return "//keylol.b0.upaiyun.com/" + input + "!profile.point.background";
        };
    });
})();