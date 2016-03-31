(function () {
    "use strict";

    keylolApp.filter("maxLength", function () {
        return function (input, length) {
            var output = input;
            if(output){
                if (output.length > length) {
                    output = output.slice(0, length - 1) + "…";
                }
            }

            return output;
        };
    });
})();