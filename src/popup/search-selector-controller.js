(function () {
    class SearchSelectorController {
        constructor($scope, union, $location, options, $http, apiEndpoint, notification, utils, window) {
            $.extend(this, {
                $location,
                options,
                $http,
                apiEndpoint,
                notification,
                utils,
                window,
            });

            this.onSearching = options.onSearching;
            this.union = union;
            this.filterArray = union.searchFilter;
            for (let i = 0;i < this.filterArray.length;i++) {
                if (this.filterArray[i].active === true) {
                    this.filterType = this.filterArray[i].type;
                    this.currentFilter = i;
                }
            }
            $scope.$watch(() => {
                return options.searchText;
            }, () => {
                this.getSearchResult(this.filterType);
            });
        }

        getSearchResult (filterType) {
            if (this.options.searchText) {
                this.resultArray = [];
                this.$http.get(`${this.apiEndpoint}states/search/${filterType}`, {
                    params: {
                        keyword: this.options.searchText,
                        search_all: false,
                    },
                }).then(response => {
                    if (response.data.results.length > 0) {
                        this.resultArray = response.data.results;
                        this.notFound = false;
                    } else {
                        delete this.resultArray;
                        this.notFound = true;
                    }
                    console.log(response.data);
                }, response => {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                });
            }
        }

        changeFilter ($index) {
            if (!this.filterArray[$index].active) {
                for (let i = 0;i < this.filterArray.length;i++) {
                    this.filterArray[i].active = false;
                }
                this.filterArray[$index].active = true;
                this.filterType = this.filterArray[$index].type;
                this.getSearchResult(this.filterType);
            }
        }

        jumpTo (url) {
            this.$location.url(url);
        }
    }

    keylolApp.controller('SearchSelectorController', SearchSelectorController);
}());
