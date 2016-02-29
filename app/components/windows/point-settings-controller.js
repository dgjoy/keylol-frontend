(function () {
    "use strict";

    keylolApp.controller("PointSettingsController", [
        "$scope", "close", "utils", "$http", "apiEndpoint", "base64", "Upload", "$q", "notification", "$timeout",
        "point", "$filter", "$location", "union", "$route",
        function ($scope, close, utils, $http, apiEndpoint, base64, Upload, $q, notification, $timeout,
                  point, $filter, $location, union, $route) {
            $scope.page = "basic";
            $scope.uniqueIds = {};
            for (var i = 0; i < 2; ++i) {
                $scope.uniqueIds[i] = utils.uniqueId();
            }
            $scope.files = {};

            var originalVM = {};
            $scope.vm = {
                ChineseName: point.ChineseName,
                DisplayAliases: point.DisplayAliases,
                EnglishAliases: point.EnglishAliases,
                ChineseAliases: point.ChineseAliases,
                Description: point.Description,

                DeveloperPointsId: [],
                PublisherPointsId: [],
                GenrePointsId: [],
                TagPointsId: [],
                MajorPlatformPointsId: [],
                MinorPlatformPointsId: [],
                SeriesPointsId: [],

                AvatarImage: point.AvatarImage,
                BackgroundImage: point.BackgroundImage,
                CoverImage: point.CoverImage
            };

            if(union.$localStorage.user.StaffClaim === 'operator'){
                $scope.isOperator = true;
                $scope.vm.EnglishName = point.EnglishName;
                $scope.vm.ReleaseDate = $filter("date")(point.ReleaseDate, "yyyy-MM-dd");

                $scope.vm.IdCode = point.IdCode;
                $scope.vm.NameInSteamStore = point.NameInSteamStore;
                $scope.vm.PreferredName = point.PreferredName;
            }else {
                $scope.point = point;
            }
            $scope.inline = {
                DeveloperPoints: point.DeveloperPoints,
                PublisherPoints: point.PublisherPoints,
                GenrePoints: point.GenrePoints,
                TagPoints: point.TagPoints,
                MajorPlatformPoints: point.MajorPlatformPoints,
                MinorPlatformPoints: point.MinorPlatformPoints,
                SeriesPoints: point.SeriesPoints
            };
            $.extend(originalVM, $scope.vm);

            for(var attr in $scope.inline){
                if($scope.inline.hasOwnProperty(attr)){
                    (function(relatedName){
                        $scope.$watchCollection("inline." + relatedName, function (newValue) {
                            $scope.vm[relatedName + "Id"] = [];
                            if (newValue)
                                for (var i = 0; i < newValue.length; ++i) {
                                    $scope.vm[relatedName + "Id"].push(newValue[i].Id);
                                }
                        });
                    })(attr);
                    var thisAttr = $scope.inline[attr];
                    originalVM[attr + "Id"] = [];
                    for (var j = 0; j < thisAttr.length; ++j) {
                        originalVM[attr + "Id"].push(thisAttr[j].Id);
                    }
                }
            }
            var isVMDirty = function (key) {
                if(typeof $scope.vm[key] !== "object"){
                    return $scope.vm[key] !== originalVM[key];
                }
                else {
                    for(var attr in $scope.vm[key]){
                        if($scope.vm[key][attr] !== originalVM[key][attr]){
                            return true;
                        }
                    }
                    return false;
                }
            };

            $scope.cancel = function () {
                close();
            };

            $scope.setPage = function (page) {
                $scope.page = page;
            };

            $scope.optionsInPageChanged = function (page) {
                var keys = [];
                switch (page) {
                    case "basic":
                        keys = [
                            "EnglishName",
                            "ChineseName",
                            "DisplayAliases",
                            "EnglishAliases",
                            "ChineseAliases",
                            "Description",
                            "ReleaseDate"
                        ];
                        break;
                    case "relationship":
                        keys = [
                            "DeveloperPointsId",
                            "PublisherPointsId",
                            "GenrePointsId",
                            "TagPointsId",
                            "MajorPlatformPointsId",
                            "MinorPlatformPointsId",
                            "SeriesPointsId"
                        ];
                        break;
                    case "images":
                        keys = [
                            "AvatarImage",
                            "BackgroundImage",
                            "CoverImage"
                        ];
                        break;
                    case "preferences":
                        keys = [
                            "IdCode",
                            "NameInSteamStore",
                            "PreferredName"
                        ];
                        break;
                }
                return keys.some(function (key) {
                    return isVMDirty(key);
                });
            };

            var submitLock = false;
            $scope.submit = function () {
                if (submitLock)
                    return;
                submitLock = true;

                var submit = function () {
                    $http.put(apiEndpoint + "normal-point/" + point.Id, $scope.vm)
                        .then(function () {
                            notification.success("据点信息已更新");
                            close();
                            if(!union.inEditor){
                                var idCode = $scope.vm.IdCode || point.IdCode;
                                if($location.url() === "/point/" + idCode){
                                    $route.reload();
                                }else {
                                    $location.url("point/" + idCode);
                                }
                            }
                        }, function (response) {
                            notification.error("未知错误", response);
                            submitLock = false;
                        });
                };

                if ($scope.files.avatarImage || $scope.files.backgroundImage || $scope.files.coverImage) {
                    notification.process("图像正在上传");
                    var options = {
                        bucket: "keylol",
                        "save-key": "{filemd5}{.suffix}",
                        expiration: Math.round(new Date().getTime() / 1000) + 90,
                        "content-length-range": "0,5242880"
                    };
                    var uploadEndpoint = "//v0.api.upyun.com/keylol";
                    var policy = base64.encode(JSON.stringify(options));
                    $http.post(apiEndpoint + "upload-signature", null, {params: {policy: policy}}).then(function (response) {
                        var uploads = {};
                        if ($scope.files.avatarImage) {
                            uploads.avatarImage = Upload.upload({
                                url: uploadEndpoint,
                                data: {
                                    file: $scope.files.avatarImage,
                                    policy: policy,
                                    signature: response.data
                                },
                                withCredentials: false
                            });
                            uploads.avatarImage.then(function (response) {
                                $scope.vm.AvatarImage = "keylol://" + response.data.url;
                            }, function () {
                                notification.error("据点图标上传失败。");
                                submitLock = false;
                            });
                        }
                        if ($scope.files.backgroundImage) {
                            uploads.backgroundImage = Upload.upload({
                                url: uploadEndpoint,
                                data: {
                                    file: $scope.files.backgroundImage,
                                    policy: policy,
                                    signature: response.data
                                },
                                withCredentials: false
                            });
                            uploads.backgroundImage.then(function (response) {
                                $scope.vm.BackgroundImage = "keylol://" + response.data.url;
                            }, function () {
                                notification.error("据点大图上传失败。");
                                submitLock = false;
                            });
                        }
                        if ($scope.files.coverImage) {
                            uploads.coverImage = Upload.upload({
                                url: uploadEndpoint,
                                data: {
                                    file: $scope.files.coverImage,
                                    policy: policy,
                                    signature: response.data
                                },
                                withCredentials: false
                            });
                            uploads.coverImage.then(function (response) {
                                $scope.vm.CoverImage = "keylol://" + response.data.url;
                            }, function () {
                                notification.error("据点封面上传失败。");
                                submitLock = false;
                            });
                        }
                        $q.all(uploads).then(function () {
                            submit();
                        });
                    }, function () {
                        notification.error("文件上传验证失效。");
                        submitLock = false;
                    });
                } else {
                    submit();
                }
            };
        }
    ]);
})();