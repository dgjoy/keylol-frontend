(function () {
    "use strict";

    keylolApp.controller("PointSettingsController", [
        "$scope", "close", "utils", "$http", "union", "apiEndpoint", "base64", "Upload", "$q", "notification", "$element",
        "$timeout",
        function ($scope, close, utils, $http, union, apiEndpoint, base64, Upload, $q, notification, $element,
                  $timeout) {
            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;
            $scope.page = "basic";
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
                    case "basic":
                        keys = [
                            "GamerTag",
                            "Email",
                            "AvatarImage",
                            "ProfilePointBackgroundImage"
                        ];
                        break;
                    case "relationship":
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
                    case "images":
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
                    case "basic":
                        keys = [
                            "vm.GamerTag",
                            "vm.Email"
                        ];
                        break;
                    case "relationship":
                        break;
                    case "images":
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
                var pages = ["basic", "relationship", "images", "preferences"];
                for (var pi in pages) {
                    if (pages.hasOwnProperty(pi) && $scope.optionsInPageError(pages[pi])) {
                        $scope.page = pages[pi];
                        break;
                    }
                }
            };

            var submitLock = false;
            $scope.submit = function () {
                if (submitLock)
                    return;
                submitLock = true;
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
                    submitLock = false;
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
                                    notification.error("未知错误", response);
                            }
                            submitLock = false;
                        });
                };

                if ($scope.files.avatarImage || $scope.files.profilePointBackgroundImage) {
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
                                dirtyFields.AvatarImage = "keylol://avatars/" + response.data.url;
                            }, function () {
                                notification.error("头像上传失败。");
                                submitLock = false;
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
                            }, function () {
                                notification.error("个人据点横幅上传失败。");
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
                            notification.error("未知错误", response);
                        });
                    }
                });
            };
        }
    ]);
})();