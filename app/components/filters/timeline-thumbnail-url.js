(function () {
    "use strict";

    keylolApp.filter("timelineThumbnailUrl", [
        "$filter",
        function ($filter) {
            return function (input) {
                return $filter("uriRelocate")(input, "timeline.thumbnail.new");
            };
        }
    ]);
})();