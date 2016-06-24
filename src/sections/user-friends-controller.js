(function () {
    class UserFriendsController {
        constructor () {
            this.header = {
                mainTitle:'好友',
                subTitle: '一共与 9 位用户互相关注',
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
            ];
        }
    }

    keylolApp.component('userFriends', {
        templateUrl: 'src/sections/user-friends.html',
        controller: UserFriendsController,
        controllerAs: 'userFriends',
        bindings: {
            theme: '<',
        },
    });
}());
