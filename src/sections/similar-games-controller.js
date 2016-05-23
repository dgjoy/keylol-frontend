(function () {
    class SimilarGamesController {
        constructor () {
            this.cards = [
                {
                    avatarImage: 'keylol://steam/app-icons/337950-eff7d6d5c6968412c4adbff53aa0433183a7d00b',
                    averageRating: 3.9,
                    chineseName: '',
                    englishName: 'The SKIES',
                    idCode: 'THESK',
                    titleCoverImage: '',
                },
                {
                    avatarImage: 'keylol://steam/app-icons/444640-a90a52c7b5ab5bf0813bfb2a76a0c9a3f548e2fc',
                    averageRating: 3.9,
                    chineseName: '',
                    englishName: 'Bloons TD Battles',
                    idCode: 'BLOON',
                    titleCoverImage: '',
                },
                {
                    avatarImage: 'keylol://steam/app-icons/301520-939ba382462f3816cf25bae02e3b5363904297d3',
                    averageRating: 3.9,
                    chineseName: '',
                    englishName: 'Robocraft',
                    idCode: 'ROBOC',
                    titleCoverImage: '',
                },
                {
                    avatarImage: 'keylol://steam/app-icons/431500-d0b368038fdf97982d9f577f2b697e6bc24b9249',
                    averageRating: 3.9,
                    chineseName: '',
                    englishName: 'Clash of the Monsters',
                    idCode: 'CLASH',
                    titleCoverImage: '',
                },
                {
                    avatarImage: 'keylol://steam/app-icons/370910-b303ac4e08ea30763257596112c13c0c4e4b0187',
                    averageRating: 3.9,
                    chineseName: '',
                    englishName: 'Kathy Rain',
                    idCode: 'KATHY',
                    titleCoverImage: '',
                },
                {
                    avatarImage: 'keylol://steam/app-icons/314970-f59e499005dcfbb2933c3701b9bed27e4ae8b2fd',
                    averageRating: 3.9,
                    chineseName: '',
                    englishName: 'Age of Conquest IV',
                    idCode: 'AGEOF',
                    titleCoverImage: '',
                },
            ];
            this.gameLeftPart = [];
            this.gameRightPart = [];
            if (this.cards) {
                for (let i = 0;i < this.cards.length;i++) {
                    if (i % 2 === 0) {
                        this.gameLeftPart.push(this.cards[i]);
                    } else {
                        this.gameRightPart.push(this.cards[i]);
                    }
                }
            }
            this.type = {
                mainTitle: '近畿',
                subTitle: '特色相邻的游戏',
                type: 'light-theme',
            };
        }
    }

    keylolApp.component('similarGames', {
        templateUrl: 'src/sections/similar-games.html',
        controller: SimilarGamesController,
        controllerAs: 'similarGames',
        bindings: {
            theme: '<',
        },
    });
}());
