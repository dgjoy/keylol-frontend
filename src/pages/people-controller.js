(function () {
    class PeopleController {
        constructor($scope, pageHead, stateTree, $state, $location, pageLoad, $stateParams) {
            if ($stateParams.route !== undefined) {
                switch ($stateParams.route.toLowerCase()) {
                    case 'friend':
                        $scope.currentPage = 0;
                        break;
                    case 'subscribeduser':
                        $scope.currentPage = 1;
                        break;
                    case 'subscriber':
                        $scope.currentPage = 2;
                        break;
                }
            }

            $scope.changePage =  index => {
                $scope.currentPage = index;
            };

            let fetchPromise;
            if (!$location.path().match(/\/user\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.user
                    && stateTree.aggregation.user.basicInfo && stateTree.aggregation.user.basicInfo.idCode === $state.params.user_id_code) ) {
                    fetchPromise = pageLoad('aggregation.user.people');
                } else {
                    fetchPromise = pageLoad('aggregation.user', { entrance: 'People' });
                }
                fetchPromise.then(() => {
                    pageHead.setTitle(`${stateTree.aggregation.user.basicInfo.userName} - 人脉 - 其乐`);
                    $scope.theme = {
                        main: stateTree.aggregation.user.basicInfo.themeColor,
                        light: stateTree.aggregation.user.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.user.basicInfo.logo,
                    };

                    const object = stateTree.aggregation.user.basicInfo;
                    const people = stateTree.aggregation.user.people;

                    $scope.tabArray = [
                        { name: `${object.friendCount} 位好友` },
                        { name: `已关注 ${object.subscribedUserCount} 人` },
                        { name: `${object.subscriberCount} 位听众` },
                    ];

                    $scope.target_id = object.id;
                    $scope.modules = [
                        {
                            header: {
                                mainTitle: '好友',
                                subTitle: `${object.userName} 一共与 ${object.friendCount} 位用户互相关注`,
                            },
                            list: people.friends,
                            totalPage: people.friendPageCount,
                            api: 'states/aggregation/user/people/friends',
                        },
                        {
                            header: {
                                mainTitle: '关注',
                                subTitle: `${object.userName} 已关注 ${object.subscribedUserCount} 人`,
                            },
                            list: people.subscribedUsers,
                            totalPage: people.subscribedUserPageCount,
                            api: 'states/aggregation/user/people/subscribed-users',
                        },
                        {
                            header: {
                                mainTitle: '听众',
                                subTitle: `${object.userName} 有 ${object.subscriberCount} 位听众`,
                            },
                            list: people.subscribers,
                            totalPage: people.subscriberPageCount,
                            api: 'states/aggregation/user/people/subscribers',
                        },
                    ];
                });
            }

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('PeopleController', PeopleController);
}());
