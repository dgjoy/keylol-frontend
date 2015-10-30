(function () {
    "use strict";

    keylolApp.controller("AlphaEntranceController", [
        "pageTitle", "$scope", "$timeout",
        function (pageTitle, $scope, $timeout) {
            pageTitle.set("内测 - 其乐");
            $scope.secondAnimate = false;
            var activeLock = 0;
            $scope.active = 0;
            var activeTimeout;
            $(window).scroll(function(){
                $scope.$apply(function(){
                    if($scope.secondAnimate == false){
                        if($(window).scrollTop() >= 768){
                            $scope.secondAnimate = true;
                        }
                    }
                    if($(window).scrollTop() < 1300){
                        $scope.active = 0;
                    }else if($(window).scrollTop() > 2200){
                        $scope.active = 6;
                    }else{
                        if($(window).scrollTop() < 1480){
                            changeActive(1);
                        }else if($(window).scrollTop() < 1660){
                            changeActive(2);
                        }else if($(window).scrollTop() < 1840){
                            changeActive(3);
                        }else if($(window).scrollTop() < 2020){
                            changeActive(4);
                        }else{
                            changeActive(5);
                        }
                    }

                });
            });

            var changeActive = function(index){
                if(activeLock != index){
                    activeLock = index;
                    if(activeTimeout){
                        $timeout.cancel(activeTimeout);
                    }
                    activeTimeout = $timeout(function(){
                        console.log($(window).scrollTop());
                        $scope.active = index;
                    }, 100);
                }
            }
        }
    ]);
})();