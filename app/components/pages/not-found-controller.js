(function () {
    "use strict";

    keylolApp.controller("NotFoundController", [
        "pageTitle",
        function (pageTitle) {
            pageTitle.set("404 Not Found - 其乐");
        }
    ]);
})();