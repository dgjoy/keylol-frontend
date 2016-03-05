(function () {
    "use strict";

    keylolApp.filter("storeUrlToSteamDB", function () {
        return function (input) {
            var match = input.match(/(?:http:|https:)\/\/store\.steampowered\.com\/app\/(\d+)/i);
            if (match)
                return "https://steamdb.info/app/" + match[1] + "/";
        };
    });
})();