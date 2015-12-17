(function () {
    "use strict";

    keylolApp.filter("timelineThumbnailUrl", [
        "utils",
        function (utils) {
        return function (input) {
            return utils.parseUri(input, "timeline.thumbnail.new",
                "//keylol.b0.upaiyun.com/991a9466477b8f5b49dbd034fc93bcd5.jpg!timeline.thumbnail.new");
        };
    }]);
})();