(function () {
    class IntelCategoriesController {
        constructor () {
            this.types = [
                {
                    mainTitle: '流派',
                    subTitle: '从游戏性质出发的分类方式',
                },
                {
                    mainTitle: '特性',
                    subTitle: '游戏中的要素和特色',
                },
            ];
            this.genre = [
                {
                    'id': 'ba6df5d5-72cd-4925-a11c-8488aceaa2dd',
                    'idCode': 'INDIE',
                    'avatarImage': 'keylol://ed36744dd2ee9eb6e7a2510c3a19c13d.png',
                    'chineseName': '独立游戏',
                    'englishName': 'Indie',
                    'gameCount': 179,
                },
                {
                    'id': '707251da-0907-4419-be72-6065fa13130d',
                    'idCode': 'ACTGM',
                    'avatarImage': 'keylol://ace3952797afd4d9e6259c41308152c7.png',
                    'chineseName': '动作',
                    'englishName': 'Action',
                    'gameCount': 177,
                },
                {
                    'id': '01ebc910-fbb0-4e39-9459-271a9ac64132',
                    'idCode': 'ADVGM',
                    'avatarImage': 'keylol://d18e6d34c90e0936a63e1777048b7fe0.png',
                    'chineseName': '冒险',
                    'englishName': 'Adventure',
                    'gameCount': 133,
                },
                {
                    'id': '522dba52-c681-4613-b61f-fa4fb0fcdfb4',
                    'idCode': 'RPLAY',
                    'avatarImage': 'keylol://8b471e9e7181c0c7c58828d31d6b08f5.png',
                    'chineseName': '角色扮演',
                    'englishName': 'RPG',
                    'gameCount': 121,
                },
            ];
            this.cate = [
                {
                    'id': 'ba6df5d5-72cd-4925-a11c-8488aceaa2dd',
                    'idCode': 'INDIE',
                    'avatarImage': 'keylol://ed36744dd2ee9eb6e7a2510c3a19c13d.png',
                    'chineseName': '独立游戏',
                    'englishName': 'Indie',
                    'gameCount': 179,
                },
                {
                    'id': '707251da-0907-4419-be72-6065fa13130d',
                    'idCode': 'ACTGM',
                    'avatarImage': 'keylol://ace3952797afd4d9e6259c41308152c7.png',
                    'chineseName': '动作',
                    'englishName': 'Action',
                    'gameCount': 177,
                },
                {
                    'id': '01ebc910-fbb0-4e39-9459-271a9ac64132',
                    'idCode': 'ADVGM',
                    'avatarImage': 'keylol://d18e6d34c90e0936a63e1777048b7fe0.png',
                    'chineseName': '冒险',
                    'englishName': 'Adventure',
                    'gameCount': 133,
                },
                {
                    'id': '522dba52-c681-4613-b61f-fa4fb0fcdfb4',
                    'idCode': 'RPLAY',
                    'avatarImage': 'keylol://8b471e9e7181c0c7c58828d31d6b08f5.png',
                    'chineseName': '角色扮演',
                    'englishName': 'RPG',
                    'gameCount': 121,
                },
            ];
        }
    }

    keylolApp.component('intelCategories', {
        templateUrl: 'src/sections/intel-categories.html',
        controller: IntelCategoriesController,
        controllerAs: 'intelCategories',
        bindings: {
            theme: '<',
        },
    });
}());
