(function () {
    class SourceListController {
        constructor() {
            this.mainPoint = {
                avatarImage: 'keylol://37ba4e25767b3b4c1417f4c625e88492.jpg',
                chineseName: '刀塔',
                englishName: 'Dota 2',
                idCode: 'DOTA2',
            };

            this.points = [{
                avatarImage: 'keylol://8b471e9e7181c0c7c58828d31d6b08f5.png',
                chineseName: '角色扮演',
                englishName: 'RPG',
                idCode: 'RPLAY',
            },{
                avatarImage: 'keylol://4ed8e4862422e8a584fb6bee9f32fedd.jpg',
                chineseName: '刺客信条 2',
                englishName: 'Assassin\'s Creed 2',
                idCode: 'ASCR2',
            }];
        }
    }
    
    keylolApp.controller('SourceListController', SourceListController);
}());