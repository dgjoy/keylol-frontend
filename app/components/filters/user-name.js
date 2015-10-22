(function () {
    "use strict";

    keylolApp.filter("userName", function () {
        return function (input, option) {
            if(option){
                return "@" + input;
            }else {
                return input;
            }
        };
    });
})();