(function () {
    "use strict";

    keylolApp.controller("SearchBoxController", [
        "$scope", "union", "$timeout",
        function ($scope, union, $timeout) {
            $scope.onSearching = function(){
                console.log(union.searchFilter, $scope.searchText);
            };
            var bindElement;
            $scope.getSearchResults = function($event){
                var searchText = "";
                if($scope.searchText !== undefined){
                    searchText = $scope.searchText;
                }
                bindElement = $event.currentTarget;
                $scope.nowPopup = $scope.showSearchSelector({
                    templateUrl: "components/popup/search-selector.html",
                    controller: "SearchSelectorController",
                    attachSide: "bottom",
                    event: $event,
                    align: "left",
                    inputs: {
                        onSearching: $scope.onSearching,
                        searchText: searchText
                    }
                });
            };
            $scope.cancelWatch = $scope.$watch("searchText", function(){
                if($scope.delayGetResult){
                    $timeout.cancel($scope.delayGetResult);
                }
                if($scope.searchText !== undefined){
                    console.log($scope.searchText);
                    $scope.delayGetResult = $timeout(function(){
                        if($scope.nowPopup){
                            $scope.nowPopup.then(function (popup) {
                                popup.closeNow();
                            });
                        }
                        $scope.getSearchResults({
                            type: "click",
                            currentTarget: bindElement
                        });
                    }, 300);
                }
            });
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