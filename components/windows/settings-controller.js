(function () {
    "use strict";

    keylolApp.controller("SettingsController", [
        "$scope", "close", "utils", "$http", "union", "apiEndpoint", "base64", "Upload", "$q", "notification", "$element",
        "$timeout", "upyun", "window", "options",
        function ($scope, close, utils, $http, union, apiEndpoint, base64, Upload, $q, notification, $element,
                  $timeout, upyun, window, options) {
            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;
            $scope.page = options.page || "profiles";
            $scope.uniqueIds = {};
            for (var i = 0; i < 22; ++i) {
                $scope.uniqueIds[i] = utils.uniqueId();
            }
            $scope.union = union;
            $scope.files = {};

            $scope.resync = function () {
                window.show({
                    templateUrl: "components/windows/sync-loading.html",
                    controller: "SyncLoadingController",
                    inputs: {
                        options: {}
                    }
                });
                close();
            };

            $scope.vm = {
                ProfilePointBackgroundImage: "",
                Password: "",
                NewPassword: "",
                ConfirmPassword: ""
            };
            var originalVM = {};
            var updateVM = function (user) {
                $.extend($scope.vm, {
                    GamerTag: user.GamerTag,
                    AvatarImage: user.AvatarImage,
                    Email: user.Email,
                    ProfilePointBackgroundImage: user.ProfilePointBackgroundImage,

                    AutoShareOnAcquiringNewGame: user.AutoShareOnAcquiringNewGame,
                    AutoShareOnAddingFavorite: user.AutoShareOnAddingFavorite,
                    AutoShareOnAddingNewFriend: user.AutoShareOnAddingNewFriend,
                    AutoShareOnAddingVideo: user.AutoShareOnAddingVideo,
                    AutoShareOnCreatingGroup: user.AutoShareOnCreatingGroup,
                    AutoShareOnJoiningGroup: user.AutoShareOnJoiningGroup,
                    AutoShareOnPublishingReview: user.AutoShareOnPublishingReview,
                    AutoShareOnUnlockingAchievement: user.AutoShareOnUnlockingAchievement,
                    AutoShareOnUpdatingWishlist: user.AutoShareOnUpdatingWishlist,
                    AutoShareOnUploadingScreenshot: user.AutoShareOnUploadingScreenshot,

                    LockoutEnabled: user.LockoutEnabled,

                    AutoSubscribeEnabled: user.AutoSubscribeEnabled,
                    AutoSubscribeDaySpan: user.AutoSubscribeDaySpan,

                    SteamId: user.SteamId,
                    SteamId64: user.SteamId64,
                    SteamProfileName: user.SteamProfileName,
                    StatusClaim: user.StatusClaim,
                    StaffClaim: user.StaffClaim
                });
                $.extend(originalVM, $scope.vm);
            };
            var isVMDirty = function (key) {
                return $scope.vm[key] !== originalVM[key];
            };
            updateVM(union.$localStorage.user);

            $http.get(apiEndpoint + "user/" + union.$localStorage.login.UserId, {
                params: {
                    claims: true,
                    security: true,
                    profilePointBackgroundImage: true,
                    steam: true,
                    steamBot: true,
                    moreOptions: true
                }
            }).then(function (response) {
                var user = response.data;
                updateVM(user);
                $.extend(union.$localStorage.user, user);
            });

            var geetestResult;
            var geetest = utils.createGeetest("float");
            $scope.geetestId = geetest.id;
            geetest.ready.then(function (gee) {
                $timeout(function () {
                    var geetestDom = $("#geetest-" + geetest.id, $element);
                    gee.appendTo(geetestDom);
                });
            });
            var useGeetestResult = function (gee) {
                geetestResult = gee.getValidate();
                $scope.vm.GeetestChallenge = geetestResult.geetest_challenge;
                $scope.vm.GeetestSeccode = geetestResult.geetest_seccode;
                $scope.vm.GeetestValidate = geetestResult.geetest_validate;
            };
            geetest.success.then(useGeetestResult);

            $scope.cancel = function () {
                close();
            };

            $scope.setPage = function (page) {
                $scope.page = page;
            };

            $scope.optionsInPageChanged = function (page) {
                var keys = [];
                switch (page) {
                    case "profiles":
                        keys = [
                            "GamerTag",
                            "Email",
                            "AvatarImage",
                            "ProfilePointBackgroundImage"
                        ];
                        break;
                    case "platform":
                        keys = [
                            "AutoShareOnAcquiringNewGame",
                            "AutoShareOnAddingFavorite",
                            "AutoShareOnAddingNewFriend",
                            "AutoShareOnAddingVideo",
                            "AutoShareOnCreatingGroup",
                            "AutoShareOnJoiningGroup",
                            "AutoShareOnPublishingReview",
                            "AutoShareOnUnlockingAchievement",
                            "AutoShareOnUpdatingWishlist",
                            "AutoShareOnUploadingScreenshot"
                        ];
                        break;
                    case "security":
                        keys = [
                            "LockoutEnabled",
                            "EmailNotifyOnAdvertisement",
                            "EmailNotifyOnArticleReplied",
                            "EmailNotifyOnCommentReplied",
                            "EmailNotifyOnEditorRecommended",
                            "EmailNotifyOnMessageReceived",
                            "NewPassword"
                        ];
                        break;
                    case "preferences":
                        keys = [
                            "AutoSubscribeEnabled",
                            "AutoSubscribeDaySpan"
                        ];
                        break;
                }
                return keys.some(function (key) {
                    return isVMDirty(key);
                });
            };

            $scope.optionsInPageError = function (page) {
                var keys = [];
                switch (page) {
                    case "profiles":
                        keys = [
                            "vm.GamerTag",
                            "vm.Email"
                        ];
                        break;
                    case "platform":
                        break;
                    case "security":
                        keys = [
                            "vm.Password",
                            "vm.NewPassword",
                            "vm.ConfirmPassword",
                            "authCode"
                        ];
                        break;
                    case "preferences":
                        break;
                }
                return keys.some(function (key) {
                    return $scope.error[key];
                });
            };

            var focusErrorPage = function () {
                var pages = ["profiles", "platform", "security", "preferences"];
                for (var pi in pages) {
                    if (pages.hasOwnProperty(pi) && $scope.optionsInPageError(pages[pi])) {
                        $scope.page = pages[pi];
                        break;
                    }
                }
            };

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                $scope.submitLock = true;
                $scope.error = {};
                utils.modelValidate.gamerTag($scope.vm.GamerTag, $scope.error, "vm.GamerTag");
                if (isVMDirty("NewPassword") || isVMDirty("LockoutEnabled")) {
                    if (!$scope.vm.Password) {
                        $scope.error["vm.Password"] = "Password cannot be empty.";
                    }
                    if (!geetestResult) {
                        $scope.error.authCode = true;
                    }
                    if ($scope.vm.NewPassword) {
                        if (utils.modelValidate.password($scope.vm.NewPassword, $scope.error, "vm.NewPassword")) {
                            if ($scope.vm.NewPassword !== $scope.vm.ConfirmPassword) {
                                $scope.error["vm.ConfirmPassword"] = "not match";
                            }
                        }
                    }
                }
                if (isVMDirty("Email")) {
                    if (form.email.$invalid) {
                        $scope.error["vm.Email"] = "Email is invalid.";
                    } else if (!$scope.vm.Email) {
                        $scope.error["vm.Email"] = "Email cannot be empty.";
                    }
                }
                if (!$.isEmptyObject($scope.error)) {
                    focusErrorPage();
                    $scope.submitLock = false;
                    return;
                }

                // Only submit dirty fields
                var dirtyFields = {};
                for (var key in $scope.vm) {
                    if ($scope.vm.hasOwnProperty(key) && isVMDirty(key)) {
                        dirtyFields[key] = $scope.vm[key];
                    }
                }
                if (!$scope.files.avatarImage && !$scope.files.profilePointBackgroundImage
                    && $.isEmptyObject(dirtyFields)) { // Nothing changed
                    notification.success("个人设定已更新");
                    close();
                    return;
                }

                var submit = function () {
                    $http.put(apiEndpoint + "user/" + union.$localStorage.login.UserId, dirtyFields)
                        .then(function () {
                            $.extend(union.$localStorage.user, dirtyFields);
                            notification.success("个人设定已更新");
                            close();
                        }, function (response) {
                            switch (response.status) {
                                case 400:
                                    $scope.error = response.data.ModelState;
                                    geetestResult = null;
                                    geetest.refresh().then(useGeetestResult);
                                    focusErrorPage();
                                    break;
                                default:
                                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                            }
                            $scope.submitLock = false;
                        });
                };

                if ($scope.files.avatarImage || $scope.files.profilePointBackgroundImage) {
                    notification.process("图像正在上传");
                    var policy = upyun.policy();
                    upyun.signature(policy).then(function (signature) {
                        var uploads = {};
                        if ($scope.files.avatarImage) {
                            uploads.avatarImage = upyun.upload($scope.files.avatarImage, policy, signature);
                            uploads.avatarImage.then(function (response) {
                                dirtyFields.AvatarImage = "keylol://" + response.data.url;
                            }, function () {
                                notification.error("头像上传失败");
                                $scope.submitLock = false;
                            });
                        }
                        if ($scope.files.profilePointBackgroundImage) {
                            uploads.profilePointBackgroundImage = upyun.upload($scope.files.profilePointBackgroundImage, policy, signature);
                            uploads.profilePointBackgroundImage.then(function (response) {
                                dirtyFields.ProfilePointBackgroundImage = "keylol://" + response.data.url;
                            }, function () {
                                notification.error("个人据点横幅上传失败");
                                $scope.submitLock = false;
                            });
                        }
                        $q.all(uploads).then(function () {
                            submit();
                        });
                    }, function () {
                        notification.error("文件上传验证失效");
                        $scope.submitLock = false;
                    });
                } else {
                    submit();
                }
            };

            $scope.logout = function () {
                notification.attention("从当前账户登出", [
                    {action: "登出", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        $http.delete(apiEndpoint + "login/current").then(function () {
                            delete union.$localStorage.login;
                            notification.success("已登出当前账户");
                            close();
                        }, function (response) {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        });
                    }
                });
            };
        }
    ]);
})();