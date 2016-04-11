(function () {
    "use strict";

    keylolApp.provider("pageHead", function () {
        var _loadingHead = {};
        return {
            setLoadingHead: function (head) {
                if (head) {
                    _loadingHead = head;
                }
                return _loadingHead;
            },
            $get: [
                "$rootScope",
                function ($rootScope) {
                    return {
                        setTitle: function (title) {
                            $rootScope.pageHead.title = title;
                        },
                        setKeywords: function (keywords) {
                            if(typeof keywords === "string"){
                                $rootScope.pageHead.keywords = keywords;
                            }else if(typeof keywords === "object"){
                                $rootScope.pageHead.keywords = keywords.toString();
                            }
                        },
                        setDescription: function (description) {
                            $rootScope.pageHead.description = description;
                        },
                        loading: function () {
                            $rootScope.pageHead = _loadingHead;
                        }
                    };
                }
            ]
        };
    });
})();