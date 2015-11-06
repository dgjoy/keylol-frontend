(function () {
    "use strict";

    keylolApp.controller("SearchBoxController", [
        "$scope", "union", "$timeout", "$location",
        function ($scope, union, $timeout, $location) {
            $scope.onSearching = function(){
                var searchType = "";
                for(var i in union.searchFilter){
                    if(union.searchFilter[i].active){
                        searchType = union.searchFilter[i].type;
                    }
                }
                if($scope.searchText){
                    $location.url("search/" + searchType + "/" + encodeURIComponent($scope.searchText));
                }
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