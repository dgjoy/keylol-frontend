(function () {
    keylolApp.controller("SpotlightBannerController", [
        "$scope", "window", "$http", "notification", "$location", "union",
        ($scope, window, $http, notification, $location, union) => {
            if ($location.url().substr(1, 11) === "post-office") {
                $scope.banner = [{
                    imageSrc: "assets/images/spotlight/post-office-l.png",
                    imageSrcActive: "assets/images/spotlight/post-office-l-active.png",
                    link: "post-office/acknowledgement",
                }, {
                    imageSrc: "assets/images/spotlight/post-office-m.png",
                    imageSrcActive: "assets/images/spotlight/post-office-m-active.png",
                    link: "post-office/comment",
                }, {
                    imageSrc: "assets/images/spotlight/post-office-r.png",
                    imageSrcActive: "assets/images/spotlight/post-office-r-active.png",
                    link: "post-office/missive",
                }];
                if (typeof union.spolightActive === "number") {
                    $scope.banner[union.spolightActive].imageSrc = $scope.banner[union.spolightActive].imageSrcActive;
                }
            } else {
                const originBanner = [
                    {
                        imageSrc: "assets/images/spotlight/welcome.png",
                        link: "article/LEEEE/8",
                    }, {
                        imageSrc: "assets/images/spotlight/touch-fish-community.png",
                        link: "article/LEEEE/4",
                    }, {
                        imageSrc: "assets/images/spotlight/cool-t-shirt.png",
                        link: "article/LEEEE/10",
                    }, {
                        imageSrc: "assets/images/spotlight/zhihu-keylol.png",
                        link: "article/HILOA/15",
                    },
                ];
                $scope.banner = [];
                for (let i = 0; i < 3; i++) {
                    $scope.banner = $scope.banner.concat(originBanner.splice(Math.floor(Math.random() * originBanner.length), 1));
                }
            }
        },
    ]);
}());
