(function () {
    "use strict";

    keylolApp.filter("backgroundUrl", function () {
        return function (input) {
            if (!input)
                return "//keylol.b0.upaiyun.com/991a9466477b8f5b49dbd034fc93bcd5.jpg!profile.point.background";
            var match = input.match(/^(?:(?:(?:http:|https:)?\/\/keylol\.b0\.upaiyun\.com\/)|(?:keylol:\/\/))(.*?)(?:!.*)?$/i);
            if (match)
                return "//keylol.b0.upaiyun.com/" + match[1] + "!profile.point.background";
            else
                return "//keylol.b0.upaiyun.com/" + input + "!profile.point.background";
        };
    });
})();