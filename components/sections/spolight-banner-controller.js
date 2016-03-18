(function () {
    "use strict";

    keylolApp.controller("SpolightBannerController", [
        "$scope", "window", "$http", "notification", "$location",
        function ($scope, window, $http, notification, $location) {
            if($location.url().substr(1,10) === "activities"){
                $scope.banner = [{
                    imageSrc: "assets/images/spotlight/activities-l-active.png",
                    link: "article/LEEEE/8"
                },{
                    imageSrc: "assets/images/spotlight/activities-m.png",
                    link: "article/LEEEE/8"
                },{
                    imageSrc: "assets/images/spotlight/activities-r.png",
                    link: "article/LEEEE/8"
                }];
            } else {
                var originBanner = [
                    {
                        imageSrc: "assets/images/spotlight/welcome.png",
                        link: "article/LEEEE/8"
                    },{
                        imageSrc: "assets/images/spotlight/questionaire.png",
                        link: "https://form.mikecrm.com/f.php?t=nPm9VO"
                    },{
                        imageSrc: "assets/images/spotlight/player-group.png",
                        link: "article/LEEEE/4"
                    }
                ];
                $scope.banner = [];
                for(var i = 0; i < 3;i++){
                    $scope.banner = $scope.banner.concat(originBanner.splice(Math.floor(Math.random()*originBanner.length),1));
                }
            }
        }
    ]);
})();