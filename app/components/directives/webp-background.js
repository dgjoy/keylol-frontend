(function () {
    "use strict";

    keylolApp.directive("webpBackground", [
        "utils",
        function (utils) {
            return {
                restrict: "A",
                priority: 98,
                link: function (scope, element, attrs) {
                    attrs.$observe("webpBackground", function (value) {
                        if (/^(?:http:|https:)?\/\/(keylol|keylol-steam-cdn)\.b0\.upaiyun\.com\//i.test(value))
                            utils.supportWebp.then(function () {
                                if (value.indexOf("!") === -1)
                                    element.css("background-image", "url(" + value + "!webp" + ")");
                                else
                                    element.css("background-image", "url(" + value + ".webp" + ")");
                            }, function () {
                                element.css("background-image", "url(" + value + ")");
                            });
                        else
                            element.css("background-image", "url(" + value + ")");
                    });
                }
            };
        }
    ]);
})();