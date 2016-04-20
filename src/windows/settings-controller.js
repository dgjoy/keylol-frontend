(function () {
    keylolApp.controller("SettingsController", [
        "$scope", "close", "utils", "$http", "union", "apiEndpoint", "base64", "Upload", "$q", "notification", "$element",
        "$timeout", "upyun", "window", "options",
        ($scope, close, utils, $http, union, apiEndpoint, base64, Upload, $q, notification, $element,
        $timeout, upyun, window, options) => {
            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;
            $scope.page = options.page || "profiles";
            $scope.uniqueIds = {};
            for (let i = 0; i < 22; ++i) {
                $scope.uniqueIds[i] = utils.uniqueId();
            }
            $scope.union = union;
            $scope.files = {};

            $scope.resync = function () {
                window.show({
                    templateUrl: "src/windows/sync-loading.html",
                    controller: "SyncLoadingController",
                    inputs: { options: {} },
                });
                close();
            };

            $scope.vm = {
                ProfilePointBackgroundImage: "",
                Password: "",
                NewPassword: "",
                ConfirmPassword: "",
            };
            const originalVM = {};
            function updateVM (user) {
                $.extend($scope.vm, {
                    GamerTag: user.GamerTag,
                    AvatarImage: user.AvatarImage,
                    Email: user.Email,
                    ProfilePointBackgroundImage: user.ProfilePointBackgroundImage,

                    SteamNotifyOnArticleReplied: user.SteamNotifyOnArticleReplied,
                    SteamNotifyOnCommentReplied: user.SteamNotifyOnCommentReplied,
                    SteamNotifyOnArticleLiked: user.SteamNotifyOnArticleLiked,
                    SteamNotifyOnCommentLiked: user.SteamNotifyOnCommentLiked,

                    LockoutEnabled: user.LockoutEnabled,

                    AutoSubscribeEnabled: user.AutoSubscribeEnabled,
                    AutoSubscribeDaySpan: user.AutoSubscribeDaySpan,

                    SteamId: user.SteamId,
                    SteamId64: user.SteamId64,
                    SteamProfileName: user.SteamProfileName,
                    StatusClaim: user.StatusClaim,
                    StaffClaim: user.StaffClaim,
                });
                $.extend(originalVM, $scope.vm);
            }
            function isVMDirty (key) {
                return $scope.vm[key] !== originalVM[key];
            }
            updateVM(union.$localStorage.user);

            $http.get(`${apiEndpoint}user/${union.$localStorage.login.UserId}`, {
                params: {
                    claims: true,
                    security: true,
                    profilePointBackgroundImage: true,
                    steam: true,
                    steamBot: true,
                    moreOptions: true,
                },
            }).then(response => {
                const user = response.data;
                updateVM(user);
                $.extend(union.$localStorage.user, user);
            });

            let geetestResult;
            const geetest = utils.createGeetest("float");
            $scope.geetestId = geetest.id;
            geetest.ready.then(gee => {
                $timeout(() => {
                    const geetestDom = $(`#geetest-${geetest.id}`, $element);
                    gee.appendTo(geetestDom);
                });
            });
            function useGeetestResult (gee) {
                geetestResult = gee.getValidate();
                $scope.vm.GeetestChallenge = geetestResult.geetest_challenge;
                $scope.vm.GeetestSeccode = geetestResult.geetest_seccode;
                $scope.vm.GeetestValidate = geetestResult.geetest_validate;
            }
            geetest.success.then(useGeetestResult);

            $scope.cancel = function () {
                close();
            };

            $scope.setPage = function (page) {
                $scope.page = page;
            };

            $scope.optionsInPageChanged = function (page) {
                let keys = [];
                switch (page) {
                    case "profiles":
                        keys = [
                            "GamerTag",
                            "Email",
                            "AvatarImage",
                            "ProfilePointBackgroundImage",
                        ];
                        break;
                    case "platform":
                        keys = [
                            "SteamNotifyOnArticleReplied",
                            "SteamNotifyOnCommentReplied",
                            "SteamNotifyOnArticleLiked",
                            "SteamNotifyOnCommentLiked",
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
                            "NewPassword",
                        ];
                        break;
                    case "preferences":
                        keys = [
                            "AutoSubscribeEnabled",
                            "AutoSubscribeDaySpan",
                        ];
                        break;
                }
                return keys.some(key => {
                    return isVMDirty(key);
                });
            };

            $scope.optionsInPageError = function (page) {
                let keys = [];
                switch (page) {
                    case "profiles":
                        keys = [
                            "vm.GamerTag",
                            "vm.Email",
                        ];
                        break;
                    case "platform":
                        break;
                    case "security":
                        keys = [
                            "vm.Password",
                            "vm.NewPassword",
                            "vm.ConfirmPassword",
                            "authCode",
                        ];
                        break;
                    case "preferences":
                        break;
                }
                return keys.some(key => {
                    return $scope.error[key];
                });
            };

            function focusErrorPage () {
                const pages = ["profiles", "platform", "security", "preferences"];
                for (const pi in pages) {
                    if (pages.hasOwnProperty(pi) && $scope.optionsInPageError(pages[pi])) {
                        $scope.page = pages[pi];
                        break;
                    }
                }
            }

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                $scope.submitLock = true;
                $scope.error = {};
                $timeout(() => {
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
                    const dirtyFields = {};
                    for (const key in $scope.vm) {
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

                    function submit () {
                        $http.put(`${apiEndpoint}user/${union.$localStorage.login.UserId}`, dirtyFields).then(() => {
                            $.extend(union.$localStorage.user, dirtyFields);
                            notification.success("个人设定已更新");
                            close();
                        }, response => {
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
                    }

                    if ($scope.files.avatarImage || $scope.files.profilePointBackgroundImage) {
                        notification.process("图像正在上传");
                        const policy = upyun.policy();
                        upyun.signature(policy).then(signature => {
                            const uploads = {};
                            if ($scope.files.avatarImage) {
                                uploads.avatarImage = upyun.upload($scope.files.avatarImage, policy, signature);
                                uploads.avatarImage.then(response => {
                                    dirtyFields.AvatarImage = `keylol://${response.data.url}`;
                                }, () => {
                                    notification.error("头像上传失败");
                                    $scope.submitLock = false;
                                });
                            }
                            if ($scope.files.profilePointBackgroundImage) {
                                uploads.profilePointBackgroundImage = upyun.upload($scope.files.profilePointBackgroundImage, policy, signature);
                                uploads.profilePointBackgroundImage.then(response => {
                                    dirtyFields.ProfilePointBackgroundImage = `keylol://${response.data.url}`;
                                }, () => {
                                    notification.error("个人据点横幅上传失败");
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
                });
            };

            $scope.logout = function () {
                notification.attention("从当前账户登出", [
                    { action: "登出", value: true },
                    { action: "取消" },
                ]).then(result => {
                    if (result) {
                        delete union.$localStorage.login;
                        $http.delete(`${apiEndpoint}login/current`).then(() => {
                            notification.success("已登出当前账户");
                            close();
                        }, response => {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        });
                    }
                });
            };
        },
    ]);
}());
