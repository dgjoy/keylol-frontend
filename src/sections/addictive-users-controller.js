(function () {
    class AddictiveUsersController {
        constructor () {
            this.types = {
                mainTitle: '坑中同仁',
                subTitle: '这些玩家已经不能自拔',
                theme: this.theme,
            };
            this.cards = [
                {
                    avatarImage: 'keylol://114e52f578ff0d1de3efac2b799052ad.jpg',
                    backgroundImage: '',
                    idCode: 'LEEEE',
                    userName: 'Lee',
                },
                {
                    avatarImage: 'keylol://steam/avatars/793ec8856dd800fcc928790cb2fa4072b3f0f19e',
                    backgroundImage: 'keylol://00fc37eacee43d39324535b1ffe28091.jpg',
                    idCode: '51018',
                    userName: 'AttackOnPika',
                },
                {
                    avatarImage: 'keylol://steam/avatars/630d9298da67f8ce43a83fef4c2edae74bbfb8c9',
                    backgroundImage: 'keylol://cd60afe6c2c7ba1c357ecef26bb212c7.jpg',
                    idCode: 'CHENG',
                    userName: '程小峰',
                },
                {
                    avatarImage: 'keylol://fd0dfd38572adff068251606aa282b3f.jpg',
                    backgroundImage: 'keylol://8df3ee9f22f95d2c5157aeef8e93a42e.jpg',
                    idCode: 'HILOA',
                    userName: 'Npc之舟',
                },
                {
                    avatarImage: 'keylol://d526aa7807cd84b7fec57be32b391614.jpg',
                    backgroundImage: 'keylol://302452746fad6e9625f98f10f5c61efe.jpg',
                    idCode: 'STACK',
                    userName: 'Stackia',
                },
                {
                    avatarImage: 'keylol://steam/avatars/c33ba8a8af10886892ce3d06bb1ef343109df350',
                    backgroundImage: 'keylol://7c308d299ed4ba5ae248e285ff6b8980.jpg',
                    idCode: 'Z9566',
                    userName: '罐头霜',
                },
                {
                    avatarImage: 'keylol://steam/avatars/aa006d4419501124cadea6a2b99175e2e0977960',
                    backgroundImage: '',
                    idCode: 'INDIE',
                    userName: 'indienova',
                },
                {
                    avatarImage: 'keylol://steam/avatars/9df5b591a2897ae3859b27056b28eb6c364d8cf1',
                    backgroundImage: 'keylol://809f685835dd37956cc175f190fbbee8.jpg',
                    idCode: '61825',
                    userName: 'Setree',
                },
            ];
        }
    }

    keylolApp.component('addictiveUsers', {
        templateUrl: 'src/sections/addictive-users.html',
        controller: AddictiveUsersController,
        controllerAs: 'addictiveUsers',
        bindings: {
            theme: '<',
        },
    });
}());
