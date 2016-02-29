(function () {
    "use strict";

    keylolApp.filter("uriRelocate", [function () {
        var relocate = function (input, customVersion, fallback) {
            if (!input || typeof input !== "string") {
                if (fallback)
                    return relocate(fallback, customVersion);
                return null;
            }

            if (input.indexOf("keylol://") !== 0)
                return input;

            var suffix = customVersion ? "!" + customVersion : "";
            var match;
            if (match = input.match(/^keylol:\/\/([^\/]*)$/i))
                return "//storage.keylol.com/" + match[1] + suffix;
            if (match = input.match(/^keylol:\/\/steam\/app-backgrounds\/([^\/]*)$/i))
                return "//steamcdn.keylol.com/steam/apps/" + match[1] + "/page_bg_generated.jpg" + suffix;
            if (match = input.match(/^keylol:\/\/steam\/app-headers\/([^\/]*)$/i))
                return "//steamcdn.keylol.com/steam/apps/" + match[1] + "/header.jpg" + suffix;
            if (match = input.match(/^keylol:\/\/steam\/app-icons\/(\d+)-([^\/]*)$/i))
                return "//steamcdn.keylol.com/steamcommunity/public/images/apps/" + match[1] + "/" + match[2] + ".jpg" + suffix;
            if (match = input.match(/^keylol:\/\/steam\/avatars\/([^\/]*)$/i))
                return "//steamcdn.keylol.com/steamcommunity/public/images/avatars/" + match[1].substring(0, 2) + "/" + match[1] + "_full.jpg" + suffix;

            return null;
        };

        return relocate;
    }]);
})();