(function () {
    keylolApp.directive("pagination", ["$location", $location => {
        return {
            restrict: "E",
            templateUrl: "src/directives/pagination.html",
            scope: {
                total: "=",
                current: "=",
                onPageChanged: "&",
                pageHref: "&",
            },
            link (scope) {
                scope.$watchGroup(["current", "total"], () => {
                    scope.newPage = scope.current;
                    scope.hasLeftEllipsis = scope.current > 4;
                    scope.hasRightEllipsis = scope.total - scope.current > 4;

                    scope.leftPages = [];
                    if (!scope.hasLeftEllipsis) {
                        for (let i = 1; i < scope.current; i++) {
                            scope.leftPages.push(i);
                        }
                    } else {
                        scope.leftPages.push(scope.current - 1);
                    }

                    scope.rightPages = [];
                    if (!scope.hasRightEllipsis) {
                        for (let j = scope.current + 1; j <= scope.total; j++) {
                            scope.rightPages.push(j);
                        }
                    } else {
                        scope.rightPages.push(scope.current + 1);
                        scope.rightPages.push(scope.current + 2);
                    }
                });

                scope.changePage = function (newPage) {
                    if (newPage > scope.total) {
                        scope.onPageChanged({ oldPage: scope.current, newPage: scope.total });
                    } else if (newPage < 1) {
                        scope.onPageChanged({ oldPage: scope.current, newPage: 1 });
                    } else {
                        scope.onPageChanged({ oldPage: scope.current, newPage });
                    }
                };

                scope.submit = function () {
                    if (scope.newPage === scope.current) {
                        return;
                    }
                    const newPageHref = scope.pageHref(scope.newPage);
                    if (newPageHref) {
                        $location.url(newPageHref);
                    } else {
                        scope.changePage(parseInt(scope.newPage));
                    }
                };
            },
        };
    }]);
}());
