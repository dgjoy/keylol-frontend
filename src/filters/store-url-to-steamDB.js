(function () {
    keylolApp.filter("storeUrlToSteamDB", () => {
        return function (input) {
            return `https://steamdb.info/app/${input}/`;
        };
    });
}());
