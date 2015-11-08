(function () {
    "use strict";

    keylolApp.filter("userName", function () {
        return function (input, showAt) {
            if (showAt) {
                return "@" + input;
            } else {
                return input;
            }
        };
    });
})();