(function () {
    class ShortReviewController {
        constructor (stateTree) {
            $.extend(this, {
                stateTree,
            });
            this.type = {
                mainTitle: '简评',
                subTitle: '一共有 19 则附有评价的动态',
                theme: this.theme,
            };
            this.list = [
                {
                    avatarImage: '//steamcdn.keylol.com/steamcommunity/public/images/avatars/de/ded87a4333771cc0d045bd5051044d1a27b0e9ad_full.jpg',
                    username: '无限梦幻',
                    review: 9,
                    likeCount: 0,
                    content: '无兄弟不dota',
                },
                {
                    avatarImage: '//steamcdn.keylol.com/steamcommunity/public/images/avatars/11/114cd67c6b3432be6d01b82fd3d88dc4e8b40fc0_full.jpg',
                    username: 'zyctime',
                    review: 9,
                    likeCount: 0,
                    content: '值得去花时间😊、也值得去剁手',
                },
                {
                    avatarImage: '//steamcdn.keylol.com/steamcommunity/public/images/avatars/55/557cf95181395ad4bc067580e06d5c84f85a86f6_full.jpg',
                    username: 'mOuSer',
                    review: 9,
                    likeCount: 0,
                    content: '唯一一个敢说能玩一辈子的游戏。信仰无需多言。',
                },
                {
                    avatarImage: '//steamcdn.keylol.com/steamcommunity/public/images/avatars/17/1774b419d67576914de4da48a1d1330d32d6ec03_full.jpg',
                    username: 'Alisandar',
                    review: 9,
                    likeCount: 2,
                    content: '补刀定理：如果两个小兵同时没血，你跟你队友肯定会去补同一个兵，同时另一个被小兵摸死。肉山定理：当你对队友说出"对面可能在打肉山时"，屏幕上马上会出现“肉山已被对面击败”。',
                },
                {
                    avatarImage: '//steamcdn.keylol.com/steamcommunity/public/images/avatars/3c/3ce7fd0c1a5225790d67d90d4f1e60d2d29d2037_full.jpg',
                    username: 'Leaker',
                    review: 9,
                    likeCount: 0,
                    content: '无需多言',
                },
            ];
        }
    }

    keylolApp.component('shortReview', {
        templateUrl: 'src/sections/short-review.html',
        controller: ShortReviewController,
        controllerAs: 'shortReview',
        bindings: {
            theme: '<',
        },
    });
}());
