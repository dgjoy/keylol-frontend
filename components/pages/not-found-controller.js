(function () {
    "use strict";

    keylolApp.controller("NotFoundController", [
        "pageHead",
        function (pageHead) {
            pageHead.setTitle("404 Not Found - 其乐");
            pageHead.setDescription("你不小心来到了一片荒芜之地……");
        }
    ]);
})();