(function () {
    keylolApp.factory('pageLoad', ($state, $stateParams, $http, stateTree, apiEndpoint, notification, $analytics, $q) => {
        return (stName, extraParams, useExtraParamsOnly) => {
            const result = stName.split('.');
            let params;
            if (useExtraParamsOnly) {
                params = extraParams;
            } else {
                params = $.extend({}, $stateParams);
                if (extraParams) {
                    $.extend(params, extraParams);
                }
            }

            if (stateTree.empty) {
                return $http.get(`${apiEndpoint}states/[${stName}]/`,{ params }).then(response => {
                    if (response.data.currentUser) {
                        $analytics.setUsername(`${response.data.currentUser.idCode}-${response.data.currentUser.userName}`);
                    }

                    $.extend(stateTree, response.data);
                    stateTree.empty = false;
                    let target = response.data;
                    for (let i = 0;i < result.length;i++) {
                        const tmp_result = result[i].replace(/(-\w)/ig,str => {
                            return str[1].toUpperCase();
                        });
                        target = target[tmp_result];
                    }
                    if (target && target.current) {
                        $state.go(`.${target.current}`, $stateParams, { location: false });
                    }

                    return target;
                }, response => {
                    notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                }).then(target => {
                    if ($.isEmptyObject(target)) {
                        $state.go('not-found', $stateParams, { location: false });
                        return $q.reject('404');
                    } else {
                        return target;
                    }
                });
            } else {
                let target = stateTree;
                let urlParams = '';
                for (let i = 0;i < result.length;i++) {
                    urlParams += `/${result[i]}`;
                    if (i !== result.length - 1) {
                        const tmp_result = result[i].replace(/(-\w)/ig,str => {
                            return str[1].toUpperCase();
                        });
                        if (!target[tmp_result]) {
                            target[tmp_result] = {};
                        }
                        target = target[tmp_result];
                    }
                }
                if (target.current === result[result.length - 1]) {
                    delete target.current;
                }
                
                return $http.get(`${apiEndpoint}states${urlParams}`,{ params }).then(response => {
                    target[result[result.length - 1]] = response.data;
                    target = target[result[result.length - 1]];
                    if (target.current) {
                        $state.go(`.${target.current}`, $stateParams, { location: false });
                    }

                    return target;
                }, response => {
                    notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                }).then(target => {
                    if ($.isEmptyObject(target)) {
                        $state.go('not-found', $stateParams, { location: false });
                        return $q.reject('404');
                    } else {
                        return target;
                    }
                });
            }
        };
    });
}());
