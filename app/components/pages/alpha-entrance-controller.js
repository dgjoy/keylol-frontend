(function () {
    "use strict";

    keylolApp.controller("AlphaEntranceController", [
        "pageTitle", "$scope",
        function (pageTitle, $scope) {
            pageTitle.set("内测 - 其乐");
            $scope.secondAnimate = false;
            $(window).scroll(function(){
                if($scope.secondAnimate == false){
                    $scope.$apply(function(){
                        if($(window).scrollTop() >= 768){
                            $scope.secondAnimate = true;
                        }
                    });
                }
            });
        }
    ]);
})();