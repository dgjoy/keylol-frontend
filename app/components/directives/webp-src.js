(function () {
    "use strict";

    keylolApp.directive("webpSrc", [
        "utils",
        function (utils) {
            return {
                restrict: "A",
                priority: 98,
                link: function (scope, element, attrs) {
                    attrs.$observe("webpSrc", function (value) {
                        if (/^(?:http:|https:)?\/\/(keylol|keylol-steam-cdn)\.b0\.upaiyun\.com\//i.test(value))
                            utils.supportWebp.then(function () {
                                if (value.indexOf("!") === -1)
                                    attrs.$set("src", value + "!webp");
                                else
                                    attrs.$set("src", value + ".webp");
                            }, function () {
                                attrs.$set("src", value);
                            });
                        else
                            attrs.$set("src", value);
                    });
                }
            };
        }
    ]);
})();