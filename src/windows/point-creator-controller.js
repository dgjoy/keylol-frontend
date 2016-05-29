(function () {
    class PointCreatorController {
        constructor(close, $element, $animateCss, $timeout, $http, apiEndpoint, notification) {
            $.extend(this, {
                close,
                $element,
                $animateCss,
                $timeout,
                $http,
                apiEndpoint,
                notification,
            });

            this.vm = {
                SteamGame: {},
                OtherGame: {},
                Hardware: {},
                Vendor: {},
                Category: {},
            };

            this.extra = {
                SteamGame: {},
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
                    name: 'steam 游戏',
                },
                {
                    name: '其他游戏',
                },
            ];
            this.currentType = 0;
            this.currentGameType = 0;
            this.steamHeight = 82;
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
            const link = this.extra.SteamGame.link || '';
            const matches = link.match(/^(?:(?:https?:\/\/)?store\.steampowered\.com\/app\/)?(\d+)\/*$/i);
            if (!matches) {
                return;
            }

            const appId = parseInt(matches[1]);
            this.captureLock = true;
            this.$http.get(`${apiEndpoint}states/point-to-create/?steam_app_id=${appId}`).then(response => {
                console.log(response.data);
                if (!response.data.failed) {
                    this.extra.SteamGame.thumbnailImage = response.data.thumbnailImage;
                    this.extra.SteamGame.avatarImage = response.data.avatarImage;
                    this.vm.SteamGame.englishName = response.data.englishName;
                    this.steamExpanded = true;
                    this.steamHeight = 500;
                }
                this.captureLock = false;
            }, error => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' });
                this.captureLock = false;
            });
        }
    }

    keylolApp.controller('PointCreatorController', PointCreatorController);
}());
