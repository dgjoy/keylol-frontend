(function () {
    keylolApp.controller("SearchBoxController", [
        "$scope", "union", "$timeout", "$location",
        ($scope, union, $timeout, $location) => {
            $scope.onSearching = function () {
                let searchType = "";
                for (let i = 0;i < union.searchFilter.length;i++) {
                    if (union.searchFilter[i].active) {
                        searchType = union.searchFilter[i].type;
                    }
                }
                if ($scope.searchText) {
                    $location.url(`search/${searchType}/${encodeURIComponent($scope.searchText)}`);
                }
            };

            let searchSelectorDisplayed = false;
            const searchSelectorOptions = {
                onSearching: $scope.onSearching,
            };
            function showSearchSelector ($event) {
                searchSelectorDisplayed = true;
                $scope.showSearchSelectorPopup({
                    templateUrl: "components/popup/search-selector.html",
                    controller: "SearchSelectorController",
                    attachSide: "bottom",
                    event: $event,
                    align: "right",
                    inputs: { options: searchSelectorOptions },
                }).then(popup => {
                    return popup.close;
                }).then(() => {
                    searchSelectorDisplayed = false;
                });
            }

            $scope.getSearchResults = function ($event) {
                let searchText = "";
                if ($scope.searchText !== undefined) {
                    searchText = $scope.searchText;
                }
                searchSelectorOptions.searchText = searchText;
                if (!searchSelectorDisplayed)
                    showSearchSelector($.extend($event, { type: "click", acceptCurrentTarget: true }));
            };

            $scope.$watch("searchText", () => {
                if ($scope.delayGetResult) {
                    $timeout.cancel($scope.delayGetResult);
                }
                if ($scope.searchText !== undefined) {
                    $scope.delayGetResult = $timeout(() => {
                        searchSelectorOptions.searchText = $scope.searchText;
                    }, 200);
                }
            });

            union.searchFilter = [
                {
                    type: "point",
                    text: "据点",
                    active: true,
                },
                {
                    type: "article",
                    text: "文章",
                },
                {
                    type: "user",
                    text: "用户",
                },
            ];
        },
    ]);
}());
