(function () {
    "use strict";

    keylolApp.controller("AlphaEntranceController", [
        "pageTitle", "$scope", "$timeout", "$rootScope",
        function (pageTitle, $scope, $timeout, $rootScope) {
            pageTitle.set("内测 - 其乐");
            $scope.secondAnimate = false;
            var activeLock = 0;
            $scope.active = 0;
            var activeTimeout;
            $(window).scroll(function(){
                $scope.$apply(function(){
                    if($scope.secondAnimate == false){
                        if($(window).scrollTop() >= 538){
                            $scope.secondAnimate = true;
                        }
                    }
                    if($(window).scrollTop() < 1152){
                        $scope.active = 0;
                        activeLock = 0;
                    }else if($(window).scrollTop() > 2077){
                        $scope.active = 6;
                        activeLock = 6;
                    }else{
                        if($(window).scrollTop() < 1337){
                            changeActive(1);
                        }else if($(window).scrollTop() < 1522){
                            changeActive(2);
                        }else if($(window).scrollTop() < 1707){
                            changeActive(3);
                        }else if($(window).scrollTop() < 1892){
                            changeActive(4);
                        }else{
                            changeActive(5);
                        }
                    }

                });
            });

            var cancelListenRoute = $rootScope.$on("$routeChangeStart", function(){
                $(window).unbind("scroll");
                cancelListenRoute();
            });

            var changeActive = function(index){
                if(activeLock != index){
                    activeLock = index;
                    if(activeTimeout){
                        $timeout.cancel(activeTimeout);
                    }
                    activeTimeout = $timeout(function(){
                        $scope.active = index;
                    }, 100);
                }
            }
        }
    ]);
})();