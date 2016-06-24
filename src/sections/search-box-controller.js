(function () {
    class SearchBoxController {
        constructor ($scope, union, $timeout, $location) {
            $.extend(this, {
                union,
                $location,
                searchSelectorDisplayed: false,
                searchSelectorOptions: {
                    onSearching: this.onSearching,
                },
            });

            $scope.$watch(() => {
                return this.searchText;
            }, () => {
                if (this.delayGetResult) {
                    $timeout.cancel(this.delayGetResult);
                }
                if (this.searchText !== undefined) {
                    this.delayGetResult = $timeout(() => {
                        this.searchSelectorOptions.searchText = this.searchText;
                    }, 200);
                }
            });

            union.searchFilter = [
                {
                    type: 'point',
                    text: '据点',
                    active: true,
                },
                {
                    type: 'article',
                    text: '文章',
                },
                {
                    type: 'user',
                    text: '用户',
                },
            ];
        }
        onSearching  () {
            let searchType = '';
            for (let i = 0;i < this.union.searchFilter.length;i++) {
                if (this.union.searchFilter[i].active) {
                    searchType = this.union.searchFilter[i].type;
                }
            }
            if (this.searchText) {
                this.$location.url(`search/${searchType}/${encodeURIComponent(this.searchText)}`);
            }
        }
        showSearchSelector ($event) {
            this.searchSelectorDisplayed = true;
            this.showSearchSelectorPopup({
                templateUrl: 'src/popup/search-selector.html',
                controller: 'SearchSelectorController',
                attachSide: 'bottom',
                event: $event,
                align: 'right',
                inputs: { options: this.searchSelectorOptions },
            }).then(popup => {
                return popup.close;
            }).then(() => {
                this.searchSelectorDisplayed = false;
            });
        }
        getSearchResults ($event) {
            let searchText = '';
            if (this.searchText !== undefined) {
                searchText = this.searchText;
            }
            this.searchSelectorOptions.searchText = searchText;
            if (!this.searchSelectorDisplayed)
                this.showSearchSelector($.extend($event, { type: 'click', acceptCurrentTarget: true }));
        }
    }

    keylolApp.component('searchBox', {
        templateUrl: 'src/sections/search-box.html',
        controller: SearchBoxController,
        controllerAs: 'searchBox',
    });
}());
