(function () {
    "use strict";

    keylolApp.controller("TimelineController", [
        "$scope", "union", "$location",
        function ($scope, union, $location) {
            $scope.headingDisplayMode = function (entry) {
                if (entry.source)
                    return "source";
                else
                    return "title";
            };
            $scope.data = union.timeline;

            $scope.clickTheBox = function () {
                $location.url("test");
            };

            $scope.expanded = false;
            var filterValues = ["『评』", "『研』", "『讯』", "『谈』", "『档』"];
            var filterOptions = [true, true, true, true, true];
            var filterStringModule = ["全部", "不看", "只看", "全部不看"];
            $scope.expandString = filterStringModule[0];
            $scope.expand = function ($event) {
                var popup = $scope.showFilter({
                    templateUrl: "components/popup/entry-filter.html",
                    controller: "EntryFilterController",
                    event: $event,
                    attachSide: "bottom",
                    align: "right",
                    offsetX: 5,
                    inputs: {
                        filterOptions: filterOptions
                    }
                });
                $scope.expanded = !$scope.expanded;
                if (popup) {
                    popup.then(function (popup) {
                        return popup.close;
                    }).then(function (result) {
                        if (result) {
                            filterOptions = result;
                            changeExpandString();
                        }
                        $scope.expanded = !$scope.expanded;
                    });
                }
            };
            function changeExpandString() {
                var optionsTrue = [];
                var optionsFalse = [];
                for (var i = 0; i < filterOptions.length; i++) {
                    if (filterOptions[i]) {
                        optionsTrue.push(i);
                    } else {
                        optionsFalse.push(i);
                    }
                }

                if (optionsTrue.length == 5) {
                    $scope.expandString = filterStringModule[0];
                } else if (optionsTrue.length >= 3) {
                    $scope.expandString = filterStringModule[1];
                    for (var falseIndex in optionsFalse) {
                        $scope.expandString += filterValues[optionsFalse[falseIndex]];
                    }
                } else if (optionsFalse.length == 5) {
                    $scope.expandString = filterStringModule[3];
                } else {
                    $scope.expandString = filterStringModule[2];
                    for (var trueIndex in optionsTrue) {
                        $scope.expandString += filterValues[optionsTrue[trueIndex]];
                    }
                }
            }
        }
    ]);
})();