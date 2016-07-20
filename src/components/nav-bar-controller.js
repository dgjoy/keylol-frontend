(function () {
    class NavBarController {
        constructor ($scope, stateTree, window, utils, $window, $timeout, union, $location, $element) {
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
                couponChanges: [],
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

            let couponChangeTimeout, messageCountChangeTimeout;

            $scope.$on('couponChanged', ($event, event, change, balance) => {
                if (stateTree.currentUser) {
                    const couponChangeFunction = () => {
                        this.couponChanges.push({
                            event,
                            change,
                            balance,
                        });
                        return $timeout(() => {
                            stateTree.currentUser.coupon = balance;
                        }, 1700);
                    };

                    if (!couponChangeTimeout) {
                        couponChangeTimeout =  $timeout(couponChangeFunction);
                    } else {
                        couponChangeTimeout = couponChangeTimeout.then(couponChangeFunction);
                    }
                }
            });

            function messageChangeAnimation () {
                // Ripple
                // Create ripple
                const $rippleContainer = $element.find('.message-count .ripple-container');
                const $ripple = $('<span class="ripple"><span class="active-circle"></span></span>');
                const $circle = $ripple.find('.active-circle');

                // Prepend ripple to element
                $rippleContainer.prepend($ripple);

                const pointOffset = {
                    left: $rippleContainer[0].offsetWidth / 2,
                    top: $rippleContainer[0].offsetHeight / 2,
                };

                // Set ripple size
                const size = Math.sqrt(
                    Math.pow(Math.max(Math.abs($rippleContainer[0].offsetWidth - pointOffset.left), pointOffset.left) * 2, 2)
                    + Math.pow(Math.max(Math.abs($rippleContainer[0].offsetHeight - pointOffset.top), pointOffset.top) * 2, 2));

                $ripple.css({
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${pointOffset.left - size / 2}px`,
                    top: `${pointOffset.top - size / 2}px`,
                });

                // Add animation effect
                $circle.css('background-color', '#fc3');
                $circle.addClass('animate-appear');
                return $timeout(() => {
                    $circle.addClass('animate-disappear');
                }, 600).then(() => {
                    $timeout(() => {
                        $ripple.remove();
                    }, 300);
                });
            }

            $scope.$on('unreadCountChanged', ($event, newCount) => {
                if (stateTree.currentUser) {
                    if (newCount > stateTree.currentUser.messageCount) {
                        messageChangeAnimation().then(() => {
                            stateTree.currentUser.messageCount = newCount;
                            this.messageCountChange = true;
                            if (messageCountChangeTimeout) {
                                $timeout.cancel(messageCountChangeTimeout);
                            }
                            messageCountChangeTimeout = $timeout(() => {
                                this.messageCountChange = false;
                            }, 1500);
                        });
                    } else {
                        stateTree.currentUser.messageCount = newCount;
                    }
                }
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
            logoType: '<',
        },
    });
}());
