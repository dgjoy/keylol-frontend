(function () {
    keylolApp.filter("timelineThumbnailUrl", ["$filter", $filter => {
        return input => {
            return $filter("uriRelocate")(input, "timeline.thumbnail.new", "keylol://e2d611b9650daf5c08d307f24cf8b308.jpg");
        };
    }]);
})();
