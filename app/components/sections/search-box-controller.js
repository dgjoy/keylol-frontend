(function () {
    "use strict";

    keylolApp.controller("SearchBoxController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.onSearching = function(){
                console.log(union.searchFilter, $scope.searchText);
            };
            $scope.getSearchResults = function($event){
                $scope.nowPopup = $scope.showSearchSelector({
                    templateUrl: "components/popup/search-selector.html",
                    controller: "SearchSelectorController",
                    attachSide: "bottom",
                    event: $event,
                    align: "left",
                    offsetX: 0,
                    inputs: {
                        onSearching: $scope.onSearching
                    }
                });
            };
            union.searchFilter = [
                {
                    text: "据点",
                    active: true
                },
                {
                    text: "文章"
                },
                {
                    text: "用户"
                }
            ];
        }
    ]);
})();