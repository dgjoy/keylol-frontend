(function () {
    function parseState(stName) {
        const pageName = stName.substr(9);
        return {
            replaceAttr: `${pageName}Page`,
            urlParam: `${pageName}-page`,
        };
    }

    keylolApp.factory('pageLoad', ($http, stateTree, apiEndpoint) => {
        return stName => {
            if (stateTree.empty) {
                return {
                    loadResultType: 'whole',
                    loadPromise: $http.get(`${apiEndpoint}states/[${stName}]/`).then(response => {
                        if (response.data.currentUser) {
                            _czc.push(['_setCustomVar', '登录用户',
                                `${response.data.currentUser.idCode}-${response.data.currentUser.userName}`, 1]);
                        }
                        return response;
                    }),
                };
            } else {
                const result = parseState(stName);
                return {
                    loadResultType: result.replaceAttr,
                    loadPromise: $http.get(`${apiEndpoint}states/${result.urlParam}`),
                };
            }
        };
    });
}());
