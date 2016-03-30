(function () {
    "use strict";

    keylolApp.directive("selectedOnHover", [
        function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    element.on('mouseenter', function () {
                        this.setSelectionRange(0, this.value.length)
                    });
                    element.on('mouseleave', function () {
                        this.setSelectionRange(0, 0)
                    });
                }
            };
        }
    ]);
})();
