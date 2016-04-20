(function () {
    keylolApp.controller("PointSettingsController", [
        "$scope", "close", "utils", "$http", "apiEndpoint", "base64", "upyun", "$q", "notification", "$timeout",
        "point", "isGame", "isJustCreated", "$filter", "$location", "union", "$route",
        ($scope, close, utils, $http, apiEndpoint, base64, upyun, $q, notification, $timeout,
        point, isGame, isJustCreated, $filter, $location, union, $route) => {
            $scope.page = "basic";
            $scope.uniqueIds = {};
            $scope.isGame = isGame;
            for (let i = 0; i < 2; ++i) {
                $scope.uniqueIds[i] = utils.uniqueId();
            }
            $scope.files = {};

            const originalVM = {};
            if (isGame) {
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
                    CoverImage: point.CoverImage,
                };
            } else {
                $scope.vm = {
                    ChineseName: point.ChineseName,
                    EnglishAliases: point.EnglishAliases,
                    ChineseAliases: point.ChineseAliases,
                    Description: point.Description,

                    AvatarImage: point.AvatarImage,
                    BackgroundImage: point.BackgroundImage,
                };
            }

            if (union.$localStorage.user.StaffClaim === "operator") {
                $scope.isOperator = true;
                $scope.vm.EnglishName = point.EnglishName;
                if (isGame) {
                    $scope.vm.ReleaseDate = $filter("date")(point.ReleaseDate, "yyyy-MM-dd");
                }

                $scope.vm.IdCode = point.IdCode;
                $scope.vm.NameInSteamStore = point.NameInSteamStore;
                $scope.vm.PreferredName = point.PreferredName;
            } else {
                $scope.point = point;
            }
            $.extend(originalVM, $scope.vm);

            if (isGame) {
                $scope.inline = {
                    DeveloperPoints: point.DeveloperPoints,
                    PublisherPoints: point.PublisherPoints,
                    GenrePoints: point.GenrePoints,
                    TagPoints: point.TagPoints,
                    MajorPlatformPoints: point.MajorPlatformPoints,
                    MinorPlatformPoints: point.MinorPlatformPoints,
                    SeriesPoints: point.SeriesPoints,
                };
                for (const attr in $scope.inline) {
                    if ($scope.inline.hasOwnProperty(attr)) {
                        $scope.$watchCollection(`inline.${attr}`, newValue => {
                            $scope.vm[`${attr}Id`] = [];
                            if (newValue)
                                for (let i = 0; i < newValue.length; ++i) {
                                    $scope.vm[`${attr}Id`].push(newValue[i].Id);
                                }
                        });
                        const thisAttr = $scope.inline[attr];
                        originalVM[`${attr}Id`] = [];
                        for (let j = 0; j < thisAttr.length; ++j) {
                            originalVM[`${attr}Id`].push(thisAttr[j].Id);
                        }
                    }
                }
            }

            function isVMDirty (key) {
                if (typeof $scope.vm[key] !== "object") {
                    return $scope.vm[key] !== originalVM[key];
                } else {
                    for (const attr in $scope.vm[key]) {
                        if ($scope.vm[key].hasOwnProperty(attr) && $scope.vm[key][attr] !== originalVM[key][attr]) {
                            return true;
                        }
                    }
                    return false;
                }
            }

            $scope.cancel = function () {
                close();
            };

            $scope.setPage = function (page) {
                $scope.page = page;
            };

            $scope.optionsInPageChanged = function (page) {
                let keys = [];
                switch (page) {
                    case "basic":
                        keys = [
                            "EnglishName",
                            "ChineseName",
                            "DisplayAliases",
                            "EnglishAliases",
                            "ChineseAliases",
                            "Description",
                            "ReleaseDate",
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
                            "SeriesPointsId",
                        ];
                        break;
                    case "images":
                        keys = [
                            "AvatarImage",
                            "BackgroundImage",
                            "CoverImage",
                        ];
                        break;
                    case "preferences":
                        keys = [
                            "IdCode",
                            "NameInSteamStore",
                            "PreferredName",
                        ];
                        break;
                }
                return keys.some(key => {
                    return isVMDirty(key);
                });
            };

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                if ($scope.vm.Description.length > 399) {
                    notification.error("部分文字内容超出字数限制，请酌情删改后再次提交");
                    return;
                }
                $scope.submitLock = true;

                if ($scope.vm.IdCode)
                    $scope.vm.IdCode = $scope.vm.IdCode.toUpperCase();
                function submit () {
                    $http.put(`${apiEndpoint}normal-point/${point.Id}`, $scope.vm)
                        .then(() => {
                            if (!isGame || !isJustCreated) {
                                notification.success("据点信息已更新");
                            } else {
                                if (union.inEditor) {
                                    notification.success("据点已开设，可以随时接收文章投稿");
                                } else {
                                    notification.success("据点已开设");
                                }
                            }
                            close();
                            if (!union.inEditor) {
                                const idCode = $scope.vm.IdCode || point.IdCode;
                                if ($location.url() === `/point/${idCode}`) {
                                    $route.reload();
                                } else {
                                    $location.url(`point/${idCode}`);
                                }
                            }
                        }, response => {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                            $scope.submitLock = false;
                        });
                }

                if ($scope.files.avatarImage || $scope.files.backgroundImage || $scope.files.coverImage) {
                    notification.process("图像正在上传");
                    const policy = upyun.policy();
                    upyun.signature(policy).then(signature => {
                        const uploads = {};
                        if ($scope.files.avatarImage) {
                            uploads.avatarImage = upyun.upload($scope.files.avatarImage, policy, signature);
                            uploads.avatarImage.then(response => {
                                $scope.vm.AvatarImage = `keylol://${response.data.url}`;
                                $scope.files.avatarImage = null;
                            }, () => {
                                notification.error("据点图标上传失败");
                                $scope.submitLock = false;
                            });
                        }
                        if ($scope.files.backgroundImage) {
                            uploads.backgroundImage = upyun.upload($scope.files.backgroundImage, policy, signature);
                            uploads.backgroundImage.then(response => {
                                $scope.vm.BackgroundImage = `keylol://${response.data.url}`;
                                $scope.files.backgroundImage = null;
                            }, () => {
                                notification.error("据点大图上传失败");
                                $scope.submitLock = false;
                            });
                        }
                        if ($scope.files.coverImage) {
                            uploads.coverImage = upyun.upload($scope.files.coverImage, policy, signature);
                            uploads.coverImage.then(response => {
                                $scope.vm.CoverImage = `keylol://${response.data.url}`;
                                $scope.files.coverImage = null;
                            }, () => {
                                notification.error("据点封面上传失败");
                                $scope.submitLock = false;
                            });
                        }
                        $q.all(uploads).then(() => {
                            submit();
                        });
                    }, () => {
                        notification.error("文件上传验证失效");
                        $scope.submitLock = false;
                    });
                } else {
                    submit();
                }
            };
        },
    ]);
}());
