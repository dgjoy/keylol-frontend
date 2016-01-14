(function () {
    "use strict";

    keylolApp.directive("articleImageSrc", [
        "utils", "$filter",
        function (utils, $filter) {
            return {
                restrict: "A",
                priority: 98,
                link: function (scope, element, attrs) {
                    attrs.$observe("articleImageSrc", function (value) {
                        var destination = $filter("uriRelocate")(value, "article.image");
                        if (/^(?:http:|https:)?\/\/(keylol|keylol-steam-cdn)\.b0\.upaiyun\.com\//i.test(destination))
                            utils.supportWebp.then(function () {
                                attrs.$set("src", destination + ".webp");
                            }, function () {
                                attrs.$set("src", destination);
                            });
                        else
                            attrs.$set("src", destination);
                    });
                }
            };
        }
    ]);
})();