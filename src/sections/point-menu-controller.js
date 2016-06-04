
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
                    items: [
                        {
                            type: 'item',
                            icon: 'dtb-sonkwo',
                            text: '杉果',
                        },
                        {
                            type: 'item',
                            icon: 'dtb-steam',
                            text: 'Steam',
                        },
                    ],
                };
            } else {
                let gameCount = '';
                switch (this.object.type) {
                    case 'category': 
                        gameCount = `此类共 ${this.object.gameCount} 部作品`;
                        break;
                    case 'platform':
                        gameCount = `平台上共 ${this.object.gameCount} 部作品`;
                        break;
                    case 'vendor':
                        gameCount = `旗下共 ${this.object.gameCount} 部作品`;
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
