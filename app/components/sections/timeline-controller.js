(function () {
    "use strict";

    keylolApp.controller("TimelineController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.headingDisplayMode = function (entry) {
                if (entry.source)
                    return "source";
                else
                    return "title";
            };
            $scope.data = union.timeline;

            $scope.expanded = false;
            var filterValues = ["『评』", "『研』", "『讯』", "『谈』", "『档』"];
            var filterOptions = [true, true, true, true, true];
            var filterStringModule = ["全部", "不看", "只看", "全部不看"];
            $scope.expandString = filterStringModule[0];
            union.filter = {
                filterOptions: filterOptions,
                onFilter: function () {
                    changeExpandString();
                }
            };
            $scope.expand = function ($event) {
                $scope.expanded = !$scope.expanded;
                var popup = $scope.showFilter({
                    templateUrl: 'components/popup/filter.html',
                    controller: 'FilterController',
                    event: $event,
                    attachSide: 'bottom',
                    align: 'right'
                });
                if (popup) {
                    popup.then(function (popup) {
                        return popup.close;
                    }).then(function (result) {
                        console.log("悬浮窗返回结果。");
                        console.log(result);
                    });
                }

            };
            function changeExpandString(){
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