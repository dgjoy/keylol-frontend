(function () {
    keylolApp.provider('pageHead', () => {
        let _loadingHead = {};
        return {
            setLoadingHead (head) {
                if (head) {
                    _loadingHead = head;
                }
                return _loadingHead;
            },
            $get: ['$rootScope', $rootScope => {
                return {
                    setTitle (title) {
                        $rootScope.pageHead.title = title;
                    },
                    setKeywords (keywords) {
                        if (typeof keywords === 'string') {
                            $rootScope.pageHead.keywords = keywords;
                        } else if (typeof keywords === 'object') {
                            $rootScope.pageHead.keywords = keywords.toString();
                        }
                    },
                    setDescription(description) {
                        $rootScope.pageHead.description = description;
                    },
                    setNotFound(notFound = false) {
                        $rootScope.pageHead.notFound = notFound;
                    },
                    loading () {
                        $rootScope.pageHead = _loadingHead;
                    },
                };
            }],
        };
    });
}());
