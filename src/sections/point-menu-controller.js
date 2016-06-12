
(function () {
    class pointMenuController {
        constructor($scope, $window, $timeout) {

            const arr = [
                this.object.oneStarCount,
                this.object.twoStarCount,
                this.object.threeStarCount,
                this.object.fourStarCount,
                this.object.fiveStarCount,
            ];

            let total = 0;
            for (let i = 0;i !== arr.length; i++) {
                total += arr[i];
            }

            if (this.object.type === 'game' || this.object.type === 'hardware') {
                this.specialMenu = {
                    header: {
                        type: 'point',
                        voteStats: {
                            '1': arr[0],
                            '2': arr[1],
                            '3': arr[2],
                            '4': arr[3],
                            '5': arr[4],
                        },
                        totalEvaluate: total,
                        votePercent: this.object.averageRating.toFixed(1),
                        titleCoverImage: this.object.titleCoverImage,
                    },
                    items: [],
                };
                if (this.object.steamAppId) {
                    this.specialMenu.items.push({
                        type: 'item',
                        icon: 'dtb-steam',
                        text: 'Steam',
                        link: `http://store.steampowered.com/app/${this.object.steamAppId}`,
                    });
                }

                const platforms = [
                    ['sonkwo','dtb-sonkwo','杉果'],
                    ['appStore','dtb-app-store','App Store'],
                    ['battleNet','dtb-battlenet','战网'],
                    ['gog','dtb-gogdotcom', 'GOG'],
                    ['googlePlay','dtb-google-play', 'Google Play'],
                    ['origin','dtb-origin','Origin'],
                    ['playStation','dtb-playstation', 'Play Station'],
                    ['uplay','dtb-uplay', 'Uplay'],
                    ['windowsStore','dtb-windows-store', 'Windows Store'],
                    ['xbox','dtb-xbox', 'Xbox'],
                ];
                for (let i = 0;i !== platforms.length; i++) {
                    if (this.object[`${platforms[i][0]}Link`] && this.object[`${platforms[i][0]}Link`] !== '') {
                        this.specialMenu.items.push(                        {
                            type: 'item',
                            icon: platforms[i][1],
                            text: platforms[i][2],
                            link: this.object[`${platforms[i][0]}Link`],
                        });
                    }
                }

            } else {
                let gameCount = '';
                switch (this.object.type) {
                    case 'category': 
                        gameCount = `此类共 ${this.object.productCount} 部作品`;
                        break;
                    case 'platform':
                        gameCount = `平台上共 ${this.object.productCount} 部作品`;
                        break;
                    case 'vendor':
                        gameCount = `旗下共 ${this.object.productCount} 部作品`;
                        break;
                }

                this.specialMenu = {
                    header: {
                        type: 'point-other',
                        gameCount,
                        votePercent: this.object.averageRating.toFixed(1),
                        titleCoverImage: this.object.titleCoverImage,
                    },
                };
            }

            // 没有封面时的替代
            if (!this.specialMenu.header.titleCoverImage) {
                this.specialMenu.header.point = {
                    avatarImage: this.object.avatarImage,
                    chineseName: this.object.chineseName,
                    englishName: this.object.englishName,
                };
            }
        }
    }

    keylolApp.component('pointMenu', {
        templateUrl: 'src/sections/point-menu.html',
        controller: pointMenuController,
        controllerAs: 'pointMenu',
        bindings: {
            theme: '<',
            object: '<',
        },
    });
}());
