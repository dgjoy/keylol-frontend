(function () {
    keylolApp.factory('pageLoad', ($state, $http, stateTree, apiEndpoint, notification) => {
        return stName => {
            const result = stName.split('.');

            if (stateTree.empty) {
                $http.get(`${apiEndpoint}states/[${stName}]/`,{ params:$state.params }).then(response => {
                    console.log(response.data);
                    if (response.data.currentUser) {
                        _czc.push(['_setCustomVar', '登录用户',
                            `${response.data.currentUser.idCode}-${response.data.currentUser.userName}`, 1]);
                    }

                    $.extend(stateTree, response.data);
                    stateTree.empty = false;
                    console.log(stateTree);
                    let target = response.data;
                    for (let i = 0;i < result.length;i++) {
                        target = target[result[i]];
                    }
                    if (target.current) {
                        $state.go(`.${target.current}`, {}, { location: false });
                    }
                }, error => {
                    console.log(error);
                });
            } else {
                let target = stateTree;
                let urlParams = '';
                for (let i = 0;i < result.length;i++) {
                    urlParams += `/${result[i]}`;
                    if (i !== result.length - 1) {
                        if (!target[result[i]]) {
                            target[result[i]] = {};
                        }
                        target = target[result[i]];
                    }
                }
                console.log(stateTree, result, urlParams);
                if (target.current === result[result.length - 1]) {
                    delete target.current;
                } else {
                    $http.get(`${apiEndpoint}states${urlParams}`,{ params:$state.params }).then(response => {
                        target[result[result.length - 1]] = response.data;
                        target = target[result[result.length - 1]];
                        if (target.current) {
                            $state.go(`.${target.current}`, {}, { location: false });
                        }
                    }, error => {
                        console.log(error);
                    });
                }
            }
        };
    });
}());
