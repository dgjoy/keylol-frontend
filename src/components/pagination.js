(function () {
    class PaginationController {
        constructor ($scope) {
            $scope.$watchGroup([() => {
                return this.current;
            }, () => {
                return this.total;
            }], () => {
                this.newPage = this.current;
                this.hasLeftEllipsis = this.current > 4;
                this.hasRightEllipsis = this.total - this.current > 4;


                this.leftPages = [];
                if (!this.hasLeftEllipsis) {
                    for (let i = 1; i < this.current; i++) {
                        this.leftPages.push(i);
                    }
                } else {
                    this.leftPages.push($scope.current - 1);
                }

                this.rightPages = [];
                if (!this.hasRightEllipsis) {
                    for (let j = this.current + 1; j <= $scope.total; j++) {
                        this.rightPages.push(j);
                    }
                } else {
                    this.rightPages.push(this.current + 1);
                    this.rightPages.push(this.current + 2);
                }
            });

            this.visiblePages = [1, 2, 3, 4, 5];
        }
        changePage (newPage) {
            if (newPage > this.total) {
                this.onPageChanged({ oldPage: this.current, newPage: this.total });
            } else if (newPage < 1) {
                this.onPageChanged({ oldPage: this.current, newPage: 1 });
            } else {
                this.onPageChanged({ oldPage: this.current, newPage });
            }
        }
    }

    keylolApp.component('pagination', {
        templateUrl: 'src/components/pagination.html',
        controller: PaginationController,
        controllerAs: 'pagination',
        bindings: {
            total: '<',
            current: '<',
            onPageChanged: '&',
            pageHref: '&',
        },
    });
}());
