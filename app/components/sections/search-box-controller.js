(function () {
    "use strict";

    keylolApp.controller("SearchBoxController", [
        "$scope", "union", "$timeout", "$location",
        function ($scope, union, $timeout, $location) {
            $scope.onSearching = function () {
                var searchType = "";
                for (var i in union.searchFilter) {
                    if (union.searchFilter[i].active) {
                        searchType = union.searchFilter[i].type;
                    }
                }
                if ($scope.searchText) {
                    $location.url("search/" + searchType + "/" + encodeURIComponent($scope.searchText));
                }
            };

            var searchSelectorDisplayed = false;
            var searchSelectorOptions = {
                onSearching: $scope.onSearching
            };
            var showSearchSelector = function ($event) {
                searchSelectorDisplayed = true;
                $scope.showSearchSelector({
                    templateUrl: "components/popup/search-selector.html",
                    controller: "SearchSelectorController",
                    attachSide: "bottom",
                    event: $event,
                    align: "left",
                    inputs: {
                        options: searchSelectorOptions
                    }
                }).then(function (popup) {
                    return popup.close;
                }).then(function () {
                    searchSelectorDisplayed = false;
                });
            };

            $scope.getSearchResults = function ($event) {
                var searchText = "";
                if ($scope.searchText !== undefined) {
                    searchText = $scope.searchText;
                }
                searchSelectorOptions.searchText = searchText;
                if (!searchSelectorDisplayed)
                    showSearchSelector($.extend($event, {type: "click", acceptCurrentTarget: true}));
            };

            $scope.$watch("searchText", function () {
                if ($scope.delayGetResult) {
                    $timeout.cancel($scope.delayGetResult);
                }
                if ($scope.searchText !== undefined) {
                    $scope.delayGetResult = $timeout(function () {
                        searchSelectorOptions.searchText = $scope.searchText;
                    }, 200);
                }
            });

            union.searchFilter = [
                {
                    type: "point",
                    text: "据点",
                    active: true
                },
                {
                    type: "article",
                    text: "文章"
                },
                {
                    type: "user",
                    text: "用户"
                }
            ];
        }
    ]);
})();