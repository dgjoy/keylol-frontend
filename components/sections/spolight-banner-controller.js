(function () {
    "use strict";

    keylolApp.controller("SpolightBannerController", [
        "$scope", "window", "$http", "notification", "$location", "union",
        function ($scope, window, $http, notification, $location, union) {
            if ($location.url().substr(1, 11) === "post-office") {
                $scope.banner = [{
                    imageSrc: "assets/images/spotlight/post-office-l.png",
                    imageSrcActive: "assets/images/spotlight/post-office-l-active.png",
                    link: "post-office/acknowledgement"
                }, {
                    imageSrc: "assets/images/spotlight/post-office-m.png",
                    imageSrcActive: "assets/images/spotlight/post-office-m-active.png",
                    link: "post-office/comment"
                }, {
                    imageSrc: "assets/images/spotlight/post-office-r.png",
                    imageSrcActive: "assets/images/spotlight/post-office-r-active.png",
                    link: "post-office/missive"
                }];
                if (typeof union.spolightActive === "number") {
                    $scope.banner[union.spolightActive].imageSrc = $scope.banner[union.spolightActive].imageSrcActive;
                }
            } else {
                var originBanner = [
                    {
                        imageSrc: "assets/images/spotlight/welcome.png",
                        link: "article/LEEEE/8"
                    }, {
                        imageSrc: "assets/images/spotlight/questionaire.png",
                        link: "https://form.mikecrm.com/f.php?t=nPm9VO"
                    }, {
                        imageSrc: "assets/images/spotlight/player-group.png",
                        link: "article/LEEEE/4"
                    }, {
                        imageSrc: "assets/images/spotlight/cool-t-shirt.png",
                        link: "article/LEEEE/10"
                    }
                ];
                $scope.banner = [];
                for (var i = 0; i < 3; i++) {
                    $scope.banner = $scope.banner.concat(originBanner.splice(Math.floor(Math.random() * originBanner.length), 1));
                }
            }
        }
    ]);
})();