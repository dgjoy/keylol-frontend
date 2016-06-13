(function () {
    class PointCreatorController {
        constructor(close, $element, $animateCss, $timeout, $http, apiEndpoint, notification, window, utils) {
            $.extend(this, {
                close,
                $element,
                $animateCss,
                $timeout,
                $http,
                apiEndpoint,
                notification,
                window,
                utils,
            });

            this.vm = {
                SteamGame: { type: 'SteamGame' },
                OtherGame: { type: 'OtherGame' },
                Hardware: { type: 'Hardware' },
                Vendor: { type: 'Vendor' },
                Category: { type: 'Category' },
            };

            this.extra = {
                SteamGame: {},
                OtherGame: {},
                Hardware: {},
                Vendor: {},
                Category: {},
            };

            this.tabArray = [
                {
                    name: '游戏',
                },
                {
                    name: '硬件',
                },
                {
                    name: '厂商',
                },
                {
                    name: '类型',
                },
            ];
            this.gameTabArray = [
                {
                    name: 'Steam 游戏',
                },
                {
                    name: '其他游戏',
                },
            ];
            this.currentType = 0;
            this.currentGameType = 0;
            this.steamHeight = 82;
            this.nameOfPlatformPoints = utils.nameOfPlatformPoints.slice(1);
        }

        changeType(index, forGame) {
            if (forGame) {
                if (index !== this.currentGameType) {
                    this.updateHeight(this.currentGameType, index, forGame);
                    this.currentGameType = index;
                }
            } else {
                if (index !== this.currentType) {
                    this.updateHeight(this.currentType, index, forGame);
                    this.currentType = index;
                }
            }
        }

        updateHeight(current, next, forGame) {
            const $parent = forGame ? this.$element.find('.game-wrapper') : this.$element.find('.point-creator-wrapper');
            const contents = $parent.children('.swap-animation');
            const currentHeight = contents[current] ? contents[current].offsetHeight : 0;
            const nextHeight = contents[next] ? contents[next].offsetHeight : 0;

            const fromHeight = { height: `${currentHeight}px` };
            const toHeight = { height: `${nextHeight}px` };
            $parent.css(fromHeight);

            this.$animateCss($parent, {
                from: fromHeight,
                to: toHeight,
                easing: 'cubic-bezier(0.35, 0, 0.25, 1)',
                duration: 0.5,
            }).start().done(() => {
                $parent.css({ transition: '', height: '' });
            });
        }

        steamCapture () {
            if (this.captureLock) return;

            const link = this.extra.SteamGame.link || '';
            const matches = link.match(/^(?:(?:https?:\/\/)?store\.steampowered\.com\/app\/)?(\d+)\/*$/i);
            if (!matches) {
                this.extra.SteamGame.linkError = '商店地址格式错误';
                return;
            }

            const appId = parseInt(matches[1]);
            this.captureLock = true;
            this.$http.get(`${apiEndpoint}states/point-to-create/?steam_app_id=${appId}`).then(response => {
                console.log(response.data);
                if (!response.data.failed) {
                    this.extra.SteamGame.thumbnailImage = response.data.thumbnailImage;
                    this.extra.SteamGame.avatarImage = response.data.avatarImage;
                    this.extra.SteamGame.headerImage = response.data.headerImage;
                    this.vm.SteamGame.englishName = response.data.englishName;
                    this.vm.SteamGame.steamAppId = appId;
                    this.steamExpanded = true;
                    this.steamHeight = 500;
                } else {
                    this.extra.SteamGame.linkError = response.data.failReason;
                }
                this.captureLock = false;
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.captureLock = false;
            });
        }

        uploadImage ($file, $event, modelType, imageType) {
            if ($file) {
                this.extra[modelType][imageType]({
                    templateUrl: 'src/popup/upload-preview.html',
                    controller: 'UploadPreviewController as uploadPreview',
                    attachSide: 'left',
                    event: {
                        type: 'click',
                        currentTarget: $event.currentTarget,
                    },
                    align: 'top',
                    offsetX: 48,
                    offsetY: 6,
                    inputs: {
                        file: $file,
                        options: {
                            type: imageType,
                        },
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    if (result) {
                        this.vm[modelType][imageType] = result;
                    }
                });
            }
        }

        submit (type) {
            console.log(`${type} submit`, this.vm[type]);
            if (this.submitLock) {
                return;
            }

            this.submitLock = true;
            if (type === 'OtherGame') {
                const platformPoints = [];
                const idCodeOfPlatformPoints = this.utils.idCodeOfPlatformPoints.slice(1);
                for (let i = 0;i < this.extra.OtherGame.platformPoints.length;i++) {
                    const platformIdCode = idCodeOfPlatformPoints[this.extra.OtherGame.platformPoints[i]];
                    if (platformIdCode) {
                        platformPoints.push(platformIdCode);
                    }
                }
                this.vm.OtherGame.platformPoints = platformPoints;
            }

            this.$http.post(`${this.apiEndpoint}point`, this.vm[type]).then(response => {
                const pointObject = this.vm[type];
                if (type === 'SteamGame') {
                    $.extend(pointObject, this.extra[type]);
                }
                this.window.show({
                    templateUrl: 'src/windows/point-create-success.html',
                    controller: 'PointCreateSuccessController',
                    controllerAs: 'pointCreateSuccess',
                    inputs: {
                        pointObject,
                    },
                });
                this.close();
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }
    }

    keylolApp.controller('PointCreatorController', PointCreatorController);
}());
