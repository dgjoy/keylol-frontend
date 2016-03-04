(function () {
    "use strict";

    keylolApp.controller("CreatePointController", [
        "$scope", "close", "$http", "apiEndpoint", "utils", "notification", "vm",
        function ($scope, close, $http, apiEndpoint, utils, notification, vm) {
            $scope.radioId = [];
            for (var i = 0; i < 6; ++i) {
                $scope.radioId.push(utils.uniqueId());
            }

            var init = function () {
                if (vm) {
                    $scope.vm = $.extend({}, vm);
                    $scope.inline = {
                        avatarImageFull: vm.AvatarImage,
                        backgroundImageFull: vm.BackgroundImage,
                        associatedPoints: vm.AssociatedPoints
                    }
                } else {
                    $scope.vm = {
                        Type: "Game",
                        ChineseName: "",
                        EnglishName: "",
                        PreferredName: "Chinese",
                        ChineseAliases: "",
                        EnglishAliases: "",
                        IdCode: "",
                        StoreLink: ""
                    };
                    $scope.inline = {
                        avatarImageFull: "",
                        backgroundImageFull: "",
                        associatedPoints: []
                    }
                }
            };
            init();

            $scope.cancel = function () {
                close();
            };

            $scope.$watchCollection("inline.associatedPoints", function (newValue) {
                $scope.vm.AssociatedPointsId = [];
                if (newValue)
                    for (var i = 0; i < newValue.length; ++i) {
                        $scope.vm.AssociatedPointsId.push(newValue[i].Id);
                    }
            });

            var submitLock = false;
            $scope.submit = function () {
                if (submitLock)
                    return;
                submitLock = true;
                var regex = /^(?:http:|https:)?\/\/storage\.keylol\.com\/(.*?)(?:!.*)?$/i;
                var avatarMatch = $scope.inline.avatarImageFull.match(regex);
                $scope.vm.AvatarImage = avatarMatch ? "keylol://" + avatarMatch[1] : $scope.inline.avatarImageFull;
                var backgroundMatch = $scope.inline.backgroundImageFull.match(regex);
                $scope.vm.BackgroundImage = backgroundMatch ? "keylol://" + backgroundMatch[1] : $scope.inline.backgroundImageFull;
                if ($scope.vm.Type === "Game" && !/^http:\/\/store\.steampowered\.com\/app\/(\d+)\//i.test($scope.vm.StoreLink)) {
                    notification.error("商店链接输入有误，请检查");
                    submitLock = false;
                    return;
                }
                $scope.vm.IdCode = $scope.vm.IdCode.toUpperCase();
                if (vm) {
                    $http.put(apiEndpoint + "normal-point/" + $scope.vm.Id, $scope.vm).then(function () {
                        notification.success("据点编辑成功");
                        $.extend(vm, $scope.vm);
                        close();
                    }, function (response) {
                        if (response.status === 400) {
                            notification.error(response.data);
                        } else if (response.status === 404) {
                            notification.error("指定据点不存在");
                        }
                        submitLock = false;
                    });
                } else {
                    $http.post(apiEndpoint + "normal-point", $scope.vm).then(function () {
                        notification.success("据点创建成功");
                        submitLock = false;
                        init();
                    }, function (response) {
                        if (response.status === 400) {
                            notification.error(response.data);
                        } else {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        }
                        submitLock = false;
                    });
                }
            };
        }
    ]);
})();