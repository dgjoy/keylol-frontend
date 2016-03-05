(function () {
    "use strict";

    keylolApp.filter("timelineThumbnailUrl", [
        "$filter",
        function ($filter) {
            return function (input) {
                return $filter("uriRelocate")(input, "timeline.thumbnail.new", "keylol://e2d611b9650daf5c08d307f24cf8b308.jpg");
            };
        }
    ]);
})();