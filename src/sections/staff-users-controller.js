﻿(function () {
    class StaffUsersController {
        constructor () {
            this.types = [
                {
                    mainTitle: '厂商职员',
                    subTitle: '入驻其乐的游戏业者',
                },
                {
                    mainTitle: '驻点职员',
                    subTitle: '驻守在此据点的站务职员',
                },
            ];
            this.fromVendor = [
                {
                    avatarImage: 'keylol://114e52f578ff0d1de3efac2b799052ad.jpg',
                    backgroundImage: '',
                    idCode: 'LEEEE',
                    userName: 'Lee',
                    role: 'Valve',
                },
                {
                    avatarImage: 'keylol://d526aa7807cd84b7fec57be32b391614.jpg',
                    backgroundImage: 'keylol://302452746fad6e9625f98f10f5c61efe.jpg',
                    idCode: 'STACK',
                    userName: 'Stackia',
                    role: 'Valve',
                },
                {
                    avatarImage: 'keylol://steam/avatars/793ec8856dd800fcc928790cb2fa4072b3f0f19e',
                    backgroundImage: 'keylol://00fc37eacee43d39324535b1ffe28091.jpg',
                    idCode: '51018',
                    userName: 'AttackOnPika',
                    role: 'Valve',
                },
                {
                    avatarImage: 'keylol://steam/avatars/630d9298da67f8ce43a83fef4c2edae74bbfb8c9',
                    backgroundImage: 'keylol://cd60afe6c2c7ba1c357ecef26bb212c7.jpg',
                    idCode: 'CHENG',
                    userName: '程小峰',
                    role: '完美世界',
                },
                {
                    avatarImage: 'keylol://fd0dfd38572adff068251606aa282b3f.jpg',
                    backgroundImage: 'keylol://8df3ee9f22f95d2c5157aeef8e93a42e.jpg',
                    idCode: 'HILOA',
                    userName: 'Npc之舟',
                    role: '完美世界',
                },
            ];
            this.staying = [
                {
                    avatarImage: 'keylol://steam/avatars/c33ba8a8af10886892ce3d06bb1ef343109df350',
                    backgroundImage: 'keylol://7c308d299ed4ba5ae248e285ff6b8980.jpg',
                    idCode: 'Z9566',
                    userName: '罐头霜',
                    role: '运维职员',
                },
                {
                    avatarImage: 'keylol://steam/avatars/aa006d4419501124cadea6a2b99175e2e0977960',
                    backgroundImage: '',
                    idCode: 'INDIE',
                    userName: 'indienova',
                    role: '调度职员',
                },
                {
                    avatarImage: 'keylol://steam/avatars/9df5b591a2897ae3859b27056b28eb6c364d8cf1',
                    backgroundImage: 'keylol://809f685835dd37956cc175f190fbbee8.jpg',
                    idCode: '61825',
                    userName: 'Setree',
                    role: '调度职员',
                },
            ];
        }
    }

    keylolApp.component('staffUsers', {
        templateUrl: 'src/sections/staff-users.html',
        controller: StaffUsersController,
        controllerAs: 'staffUsers',
        bindings: {
            theme: '<',
        },
    });
}());
