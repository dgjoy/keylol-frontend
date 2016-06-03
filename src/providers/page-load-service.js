(function () {
    keylolApp.factory('pageLoad', ($state, $http, stateTree, apiEndpoint, notification) => {
        return (stName, extraParams) => {
            const result = stName.split('.');
            const params = $state.params;
            if (extraParams) {
                $.extend(params, extraParams);
            }

            if (stateTree.empty) {
                return $http.get(`${apiEndpoint}states/[${stName}]/`,{ params }).then(response => {
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

                    return target;
                }, response => {
                    notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
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
                    return $http.get(`${apiEndpoint}states${urlParams}`,{ params }).then(response => {
                        target[result[result.length - 1]] = response.data;
                        target = target[result[result.length - 1]];
                        if (target.current) {
                            $state.go(`.${target.current}`, {}, { location: false });
                        }

                        return target;
                    }, response => {
                        notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    });
                }
            }
        };
    });
}());
