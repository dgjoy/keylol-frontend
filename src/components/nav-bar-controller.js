(function () {
    class NavBarController {
        constructor ($scope, stateTree, window, utils, $window, $timeout, union, $location) {
            $.extend(this, {
                stateTree,
                window,
                utils,
                $window,
                union,
                $location,
                searchSelectorDisplayed: false,
                searchSelectorOptions: {
                    onSearching: this.onSearching,
                },
            });

            if (!union.searchFilter) {
                union.searchFilter = [
                    {
                        type: 'point',
                        name: '据点',
                        active: true,
                    },
                    {
                        type: 'article',
                        name: '文章',
                    },
                    {
                        type: 'user',
                        name: '用户',
                    },
                ];
            }

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
        }

        showUserHub ($event) {
            this.showUserHubPopup({
                templateUrl: 'src/popup/user-hub.html',
                controller: 'UserHubController as userHub',
                event: $event,
                attachSide: 'left',
                align: 'top',
                offsetX: 50,
                offsetY: -5,
                fixedPosition: true,
                inputs: {},
            });
        }

        showLoginWindow (event) {
            this.window.show({
                event,
                templateUrl: 'src/windows/login.html',
                controller: 'LoginController',
                controllerAs: 'login',
                inputs: { startPage: 0 },
            });
        }

        showRegistrationWindow (event) {
            this.window.show({
                event,
                templateUrl: 'src/windows/registration.html',
                controller: 'RegistrationController',
                controllerAs: 'registration',
            });
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
                controllerAs: 'searchSelector',
                attachSide: 'bottom',
                event: $event,
                offsetY: 10,
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

    keylolApp.component('navBar', {
        templateUrl: 'src/components/nav-bar.html',
        controller: NavBarController,
        controllerAs: 'navBar',
        bindings: {
            theme: '<',
        },
    });
}());
