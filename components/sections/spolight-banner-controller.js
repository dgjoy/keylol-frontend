(function () {
    "use strict";

    keylolApp.controller("SpolightBannerController", [
        "$scope", "window", "$http", "notification",
        function ($scope, window, $http, notification) {
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
    ]);
})();