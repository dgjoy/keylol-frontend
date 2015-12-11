(function () {
    "use strict";

    keylolApp.filter("timelineThumbnailUrl", function () {
        return function (input) {
            if (!input)
                return "//keylol.b0.upaiyun.com/991a9466477b8f5b49dbd034fc93bcd5.jpg!timeline.thumbnail.new";
            var match = input.match(/^(?:(?:(?:http:|https:)?\/\/keylol\.b0\.upaiyun\.com\/)|(?:keylol:\/\/))(.*?)(?:!.*)?$/i);
            if (match)
                return "//keylol.b0.upaiyun.com/" + match[1] + "!timeline.thumbnail.new";
            else
                return input;
        };
    });
})();