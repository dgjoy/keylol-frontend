(function () {
    class PointCreatorController {
        constructor(close) {
            $.extend(this, {
                close,
            });

            this.vm = {
                steamGame: {},
                normalGame: {},
                hardware: {},
                vendor: {},
                category: {},
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
        }

        changeType(index, forGame) {
            if (forGame) {
                if (index !== this.currentGameType) {
                    this.isToNext = index > this.currentGameType;
                    this.currentGameType = index;
                }
            } else {
                if (index !== this.currentType) {
                    this.isToNext = index > this.currentType;
                    this.currentType = index;
                }
            }
        }

        steamCapture () {
            this.steamExpanded = true;
        }
    }

    keylolApp.controller('PointCreatorController', PointCreatorController);
}());
