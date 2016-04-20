(function () {
    keylolApp.directive("articleImageSrc", [
        "utils", "$filter",
        (utils, $filter) => {
            return {
                restrict: "A",
                priority: 98,
                link (scope, element, attrs) {
                    attrs.$observe("articleImageSrc", value => {
                        if (/\.svg|gif$/i.test(value)) {
                            attrs.$set("src", $filter("uriRelocate")(value));
                            return;
                        }
                        const destination = $filter("uriRelocate")(value, "article.image");
                        if (/^(?:http:|https:)?\/\/(storage|steamcdn)\.keylol\.com\//i.test(destination))
                            utils.supportWebp.then(() => {
                                attrs.$set("src", `${destination}.webp`);
                            }, () => {
                                attrs.$set("src", destination);
                            });
                        else
                            attrs.$set("src", destination);
                    });
                },
            };
    }]);
}());
