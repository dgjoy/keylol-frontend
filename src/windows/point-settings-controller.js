(function () {
    class PointSettingsController {
        constructor($scope, close, utils, $http, apiEndpoint, base64, upyun, $q, notification, $timeout,
                    point, isGame, isJustCreated, $filter, $location, union, $state) {
            $.extend(this,{
                close,
                notification,
                $http,
                apiEndpoint,
                upyun,
                $q,
                isGame,
                point,
                isJustCreated,
                $location,
                union,
                $state,
            });

            this.page = 'basic';
            this.uniqueIds = {};
            this.isGame = isGame;
            for (let i = 0; i < 2; ++i) {
                this.uniqueIds[i] = utils.uniqueId();
            }
            this.files = {};

            const originalVM = {};
            if (isGame) {
                this.vm = {
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
                this.vm = {
                    ChineseName: point.ChineseName,
                    EnglishAliases: point.EnglishAliases,
                    ChineseAliases: point.ChineseAliases,
                    Description: point.Description,

                    AvatarImage: point.AvatarImage,
                    BackgroundImage: point.BackgroundImage,
                };
            }

            if (union.$localStorage.user.StaffClaim === 'operator') {
                this.isOperator = true;
                this.vm.EnglishName = point.EnglishName;
                if (isGame) {
                    this.vm.ReleaseDate = $filter('date')(point.ReleaseDate, 'yyyy-MM-dd');
                }

                this.vm.IdCode = point.IdCode;
                this.vm.NameInSteamStore = point.NameInSteamStore;
                this.vm.PreferredName = point.PreferredName;
            } else {
                this.point = point;
            }
            $.extend(originalVM, this.vm);

            if (isGame) {
                this.inline = {
                    DeveloperPoints: point.DeveloperPoints,
                    PublisherPoints: point.PublisherPoints,
                    GenrePoints: point.GenrePoints,
                    TagPoints: point.TagPoints,
                    MajorPlatformPoints: point.MajorPlatformPoints,
                    MinorPlatformPoints: point.MinorPlatformPoints,
                    SeriesPoints: point.SeriesPoints,
                };
                for (const attr in this.inline) {
                    if (this.inline.hasOwnProperty(attr)) {
                        $scope.$watchCollection(() => {
                            return this.inline[attr];
                        }, newValue => {
                            this.vm[`${attr}Id`] = [];
                            if (newValue)
                                for (let i = 0; i < newValue.length; ++i) {
                                    this.vm[`${attr}Id`].push(newValue[i].Id);
                                }
                        });
                        const thisAttr = this.inline[attr];
                        originalVM[`${attr}Id`] = [];
                        for (let j = 0; j < thisAttr.length; ++j) {
                            originalVM[`${attr}Id`].push(thisAttr[j].Id);
                        }
                    }
                }
            }

            this.submitLock = false;

            $.extend(this,{
                originalVM,
            });
        }

        optionsInPageChanged(page) {
            const originalVM = this.originalVM;

            const isVMDirty = (key) => {
                if (typeof this.vm[key] !== 'object') {
                    return this.vm[key] !== originalVM[key];
                } else {
                    for (const attr in this.vm[key]) {
                        if (this.vm[key].hasOwnProperty(attr) && this.vm[key][attr] !== originalVM[key][attr]) {
                            return true;
                        }
                    }
                    return false;
                }
            };

            let keys = [];
            switch (page) {
                case 'basic':
                    keys = [
                        'EnglishName',
                        'ChineseName',
                        'DisplayAliases',
                        'EnglishAliases',
                        'ChineseAliases',
                        'Description',
                        'ReleaseDate',
                    ];
                    break;
                case 'relationship':
                    keys = [
                        'DeveloperPointsId',
                        'PublisherPointsId',
                        'GenrePointsId',
                        'TagPointsId',
                        'MajorPlatformPointsId',
                        'MinorPlatformPointsId',
                        'SeriesPointsId',
                    ];
                    break;
                case 'images':
                    keys = [
                        'AvatarImage',
                        'BackgroundImage',
                        'CoverImage',
                    ];
                    break;
                case 'preferences':
                    keys = [
                        'IdCode',
                        'NameInSteamStore',
                        'PreferredName',
                    ];
                    break;
            }
            return keys.some(key => {
                return isVMDirty(key);
            });
        }

        cancel() {
            const close = this.close;

            close();
        }

        setPage(page) {
            this.page = page;
        }

        submit() {
            const close = this.close;
            const notification = this.notification;
            const $http = this.$http;
            const apiEndpoint = this.apiEndpoint;
            const point = this.point;
            const isJustCreated = this.isJustCreated;
            const union = this.union;
            const isGame = this.isGame;
            const $state = this.$state;
            const $location = this.$location;
            const upyun = this.upyun;
            const $q = this.$q;

            if (this.submitLock)
                return;
            if (this.vm.Description.length > 399) {
                notification.error('部分文字内容超出字数限制，请酌情删改后再次提交');
                return;
            }
            this.submitLock = true;

            if (this.vm.IdCode)
                this.vm.IdCode = this.vm.IdCode.toUpperCase();

            const submit = () => {
                $http.put(`${apiEndpoint}normal-point/${point.Id}`, this.vm)
                    .then(() => {
                        if (!isGame || !isJustCreated) {
                            notification.success('据点信息已更新');
                        } else {
                            if (union.inEditor) {
                                notification.success('据点已开设，可以随时接收文章投稿');
                            } else {
                                notification.success('据点已开设');
                            }
                        }
                        close();
                        if (!union.inEditor) {
                            const idCode = this.vm.IdCode || point.IdCode;
                            if ($location.url() === `/point/${idCode}`) {
                                $state.reload();
                            } else {
                                $location.url(`point/${idCode}`);
                            }
                        }
                    }, response => {
                        notification.error('发生未知错误，请重试或与站务职员联系', response);
                        this.submitLock = false;
                    });
            }

            if (this.files.avatarImage || this.files.backgroundImage || this.files.coverImage) {
                notification.process('图像正在上传');
                const policy = upyun.policy();
                upyun.signature(policy).then(signature => {
                    const uploads = {};
                    if (this.files.avatarImage) {
                        uploads.avatarImage = upyun.upload(this.files.avatarImage, policy, signature);
                        uploads.avatarImage.then(response => {
                            this.vm.AvatarImage = `keylol://${response.data.url}`;
                            this.files.avatarImage = null;
                        }, () => {
                            notification.error('据点图标上传失败');
                            this.submitLock = false;
                        });
                    }
                    if (this.files.backgroundImage) {
                        uploads.backgroundImage = upyun.upload(this.files.backgroundImage, policy, signature);
                        uploads.backgroundImage.then(response => {
                            this.vm.BackgroundImage = `keylol://${response.data.url}`;
                            this.files.backgroundImage = null;
                        }, () => {
                            notification.error('据点大图上传失败');
                            this.submitLock = false;
                        });
                    }
                    if (this.files.coverImage) {
                        uploads.coverImage = upyun.upload(this.files.coverImage, policy, signature);
                        uploads.coverImage.then(response => {
                            this.vm.CoverImage = `keylol://${response.data.url}`;
                            this.files.coverImage = null;
                        }, () => {
                            notification.error('据点封面上传失败');
                            this.submitLock = false;
                        });
                    }
                    $q.all(uploads).then(() => {
                        submit();
                    });
                }, () => {
                    notification.error('文件上传验证失效');
                    this.submitLock = false;
                });
            } else {
                submit();
            }
        }
    }
    
    keylolApp.controller('PointSettingsController', PointSettingsController);
}());
