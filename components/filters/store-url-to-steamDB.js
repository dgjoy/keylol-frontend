(function () {
    "use strict";

    keylolApp.filter("storeUrlToSteamDB", function () {
        return function (input) {
            return "https://steamdb.info/app/" + input + "/";
        };
    });
})();