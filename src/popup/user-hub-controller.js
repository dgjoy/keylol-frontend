(function () {
    class UserHubController {
        constructor (stateTree) {
            this.userHubMenu = {
                header: {
                    type: 'user',
                },
                items: [
                    // {
                    //     type: 'item',
                    //     icon: 'book-open',
                    //     text: '已投文章',
                    // },
                    // {
                    //     type: 'item',
                    //     icon: 'coffe',
                    //     text: '动态',
                    // },
                    // {
                    //     type: 'item',
                    //     icon: 'bookmark',
                    //     text: '收藏夹',
                    // },
                    // {
                    //     type: 'horizon',
                    // },
                    {
                        type: 'item',
                        icon: 'human-greeting',
                        text: '人脉',
                        link: `user/${stateTree.currentUser.idCode}/people`,
                    },
                    {
                        type: 'horizon',
                    },
                    {
                        type: 'item',
                        icon: 'account-card-details',
                        text: '信息与资料',
                        link: `user/${stateTree.currentUser.idCode}/edit/info`,
                    },
                    {
                        type: 'item',
                        icon: 'tune',
                        text: '调整偏好',
                        link: `user/${stateTree.currentUser.idCode}/edit/preference`,
                    },
                ],
            };
        }
    }

    keylolApp.controller('UserHubController', UserHubController);
}());
