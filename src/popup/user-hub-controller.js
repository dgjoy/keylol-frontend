(function () {
    class UserHubController {
        constructor (union) {
            $.extend(this, {
                union,
            });
            this.userHubMenu = {
                header: {
                    isUser: true,
                },
                items: [
                    {
                        type: 'item',
                        icon: 'book-open',
                        text: '已投文章',
                    },
                    {
                        type: 'item',
                        icon: 'coffe',
                        text: '动态',
                    },
                    {
                        type: 'item',
                        icon: 'bookmark',
                        text: '收藏夹',
                    },
                    {
                        type: 'horizon',
                    },
                    {
                        type: 'item',
                        icon: 'human-greeting',
                        text: '好友',
                    },
                    {
                        type: 'horizon',
                    },
                    {
                        type: 'item',
                        icon: 'account-card-details',
                        text: '信息与资料',
                    },
                    {
                        type: 'item',
                        icon: 'tune',
                        text: '调整偏好',
                    },
                ],
            };
        }
    }

    keylolApp.controller('UserHubController', UserHubController);
}());
