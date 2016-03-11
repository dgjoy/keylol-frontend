(function () {
    "use strict";

    keylolApp.filter("storeUrlToSteamStore", function () {
        return function (input) {
            return "http://store.steampowered.com/app/" + input + "/";
        };
    });
})();