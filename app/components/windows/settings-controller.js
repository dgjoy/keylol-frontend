(function () {
    "use strict";

    keylolApp.controller("SettingsController", [
        "$scope", "close", "utils", "$http", "union", "apiEndpoint", "base64", "Upload", "$q", "notification",
        function ($scope, close, utils, $http, union, apiEndpoint, base64, Upload, $q, notification) {
            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;
            $scope.page = "profiles";
            $scope.uniqueIds = {};
            for (var i = 0; i < 22; ++i) {
                $scope.uniqueIds[i] = utils.uniqueId();
            }
            $scope.union = union;
            $scope.files = {};

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

                    EmailNotifyOnAdvertisement: user.EmailNotifyOnAdvertisement,
                    EmailNotifyOnArticleReplied: user.EmailNotifyOnArticleReplied,
                    EmailNotifyOnCommentReplied: user.EmailNotifyOnCommentReplied,
                    EmailNotifyOnEditorRecommended: user.EmailNotifyOnEditorRecommended,
                    EmailNotifyOnMessageReceived: user.EmailNotifyOnMessageReceived,

                    MessageNotifyOnArticleLiked: user.MessageNotifyOnArticleLiked,
                    MessageNotifyOnArticleReplied: user.MessageNotifyOnArticleReplied,
                    MessageNotifyOnCommentLiked: user.MessageNotifyOnCommentLiked,
                    MessageNotifyOnCommentReplied: user.MessageNotifyOnCommentReplied,
                    MessageNotifyOnEditorRecommended: user.MessageNotifyOnEditorRecommended,

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
                    includeClaims: true,
                    includeSecurity: true,
                    includeProfilePointBackgroundImage: true,
                    includeSteam: true,
                    includeSteamBot: true,
                    includeMoreOptions: true
                }
            }).then(function (response) {
                var user = response.data;
                updateVM(user);
                union.$localStorage.user = user;
            });

            var geetestResult;
            var gee;
            $scope.geetestId = utils.createGeetest("float", function (result, geetest) {
                gee = geetest;
                geetestResult = result;
                $scope.vm.GeetestChallenge = geetestResult.geetest_challenge;
                $scope.vm.GeetestSeccode = geetestResult.geetest_seccode;
                $scope.vm.GeetestValidate = geetestResult.geetest_validate;
            });

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
                            "EmailNotifyOnAdvertisement",
                            "EmailNotifyOnArticleReplied",
                            "EmailNotifyOnCommentReplied",
                            "EmailNotifyOnEditorRecommended",
                            "EmailNotifyOnMessageReceived",
                            "MessageNotifyOnArticleLiked",
                            "MessageNotifyOnArticleReplied",
                            "MessageNotifyOnCommentLiked",
                            "MessageNotifyOnCommentReplied",
                            "MessageNotifyOnEditorRecommended"
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

            $scope.submit = function () {
                $scope.error = {};
                utils.modelValidate.gamerTag($scope.vm.GamerTag, $scope.error, "vm.GamerTag");
                if (isVMDirty("NewPassword") || isVMDirty("LockoutEnabled")) {
                    if (!$scope.vm.Password) {
                        $scope.error["vm.Password"] = "Password cannot be empty.";
                    }
                    if (typeof geetestResult === "undefined") {
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
                                    if ($scope.error.authCode) {
                                        gee.refresh();
                                    }
                                    focusErrorPage();
                                    break;
                                default:
                                    notification.error("未知错误");
                                    console.error(response.data);
                            }
                        });
                };

                if ($scope.files.avatarImage || $scope.files.profilePointBackgroundImage) {
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
                                dirtyFields.AvatarImage = "keylol://avatars/" + response.data.url;
                                notification.success("图像已上传，提交后将生效");
                            }, function () {
                                notification.error("头像上传失败。");
                            });
                        }
                        if ($scope.files.profilePointBackgroundImage) {
                            uploads.profilePointBackgroundImage = Upload.upload({
                                url: uploadEndpoint,
                                data: {
                                    file: $scope.files.profilePointBackgroundImage,
                                    policy: policy,
                                    signature: response.data
                                },
                                withCredentials: false
                            });
                            uploads.profilePointBackgroundImage.then(function (response) {
                                dirtyFields.ProfilePointBackgroundImage = response.data.url;
                                notification.success("图像已上传，提交后将生效");
                            }, function () {
                                notification.error("个人据点横幅上传失败。");
                            });
                        }
                        $q.all(uploads).then(function () {
                            submit();
                        });
                    }, function () {
                        notification.error("文件上传验证失效。");
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
                            notification.error("未知错误");
                            console.error(response.data);
                        });
                    }
                });
            };
        }
    ]);
})();