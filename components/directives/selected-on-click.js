(function () {
    "use strict";

    keylolApp.directive("selectedOnClick", [
        function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    element.on('click', function () {
                        this.setSelectionRange(0, this.value.length)
                    });
                }
            };
        }
    ]);
})();
