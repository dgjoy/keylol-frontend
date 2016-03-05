(function () {
    "use strict";

    keylolApp.filter("coverUrl", [
        "$filter",
        function ($filter) {
            return function (input, size) {
                var sizeVersion;
                switch (size) {
                    case "big":
                        sizeVersion = "cover.image.big";
                        break;

                    default:
                        sizeVersion = "cover.image.small";
                        break;
                }
                return $filter("uriRelocate")(input, sizeVersion);
            };
        }
    ]);
})();