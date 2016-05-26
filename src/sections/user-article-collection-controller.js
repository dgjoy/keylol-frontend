(function () {
    class UserArticleCollectionController {
        constructor () {
            this.header = {
                mainTitle:'文选',
                subTitle: '一共发表 9 篇文章',
            };

            this.cards = [
                {
                    authorAvatarImage: 'keylol://e81748fb2d4357b8f019368b429dfb61.png',
                    authorIdCode: '23333',
                    authorUserName: 'ETred',
                    coverImage: 'keylol://4aaa44c7857ce38009c5a4a8607d9c28.png',
                    sidForAuthor: 1,
                    subtitle: '',
                    title: '萌萌巨兽，浅谈The Behemoth公司发展史',
                    commentCount: 4,
                    likeCount: 6,
                },
                {
                    authorAvatarImage: 'keylol://114e52f578ff0d1de3efac2b799052ad.jpg',
                    authorIdCode: 'LEEEE',
                    authorUserName: 'Lee',
                    coverImage: 'keylol://e1a909cd858db2e0c3e58dd75fc3912c.jpg',
                    sidForAuthor: 1,
                    subtitle: '',
                    title: '欢迎来到其乐',
                    commentCount: 50,
                    likeCount: 21,
                },
                {
                    authorAvatarImage: 'keylol://fd0dfd38572adff068251606aa282b3f.jpg',
                    authorIdCode: 'HILOA',
                    authorUserName: 'Npc之舟',
                    coverImage: 'keylol://695dff1d57ed363a0d5a37703e05a2a0.jpg',
                    sidForAuthor: 4,
                    subtitle: '',
                    title: '如何评价『帝国时代2』新dlc『非洲王国』？',
                    commentCount: 3,
                    likeCount: 3,
                },
                {
                    authorAvatarImage: 'keylol://steam/avatars/aa006d4419501124cadea6a2b99175e2e0977960',
                    authorIdCode: 'INDIE',
                    authorUserName: 'indienova',
                    coverImage: 'keylol://bbe6f9d14f0f5cf60ceb2c90e0537c61.jpg',
                    sidForAuthor: 6,
                    subtitle: '',
                    title: '西港独立社：媒体的自我审查之路',
                    commentCount: 1,
                    likeCount: 3,
                },
            ];
        }
    }

    keylolApp.component('userArticleCollection', {
        templateUrl: 'src/sections/user-article-collection.html',
        controller: UserArticleCollectionController,
        controllerAs: 'userArticleCollection',
        bindings: {
            theme: '<',
        },
    });
}());
