(function () {
    "use strict";

    keylolApp.filter("timelineThumbnailUrl", function () {
        return function (input) {
            var match = input.match(/^(?:http:|https:)?\/\/keylol\.b0\.upaiyun\.com\/(.*?)(?:!.*)?$/i);
            if (match)
                return "//keylol.b0.upaiyun.com/" + match[1] + "!timeline.thumbnail";
            else
                return input;
        };
    });
})();