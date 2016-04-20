(function () {
    keylolApp.filter("storeUrlToSteamStore", () => {
        return function (input) {
            return `http://store.steampowered.com/app/${input}/`;
        };
    });
}());
