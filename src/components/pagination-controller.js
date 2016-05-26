(function () {
    class PaginationController {
        constructor ($scope) {
            $scope.$watch(() => {
                return this.total;
            }, newTotal => {
                if (!this.pages) {
                    this.pages = [];
                }
                let pageNumber = 0;
                if (newTotal &&  newTotal > 0) {
                    pageNumber = parseInt((newTotal - 1) / 5) + 1;
                }

                if (pageNumber > this.pages.length) {
                    if (this.pages[this.pages.length - 1] && this.pages[this.pages.length - 1].length < 5) {
                        const notFullPage = this.pages[this.pages.length - 1];
                        for (let i = notFullPage.length;i < 5;i++) {
                            notFullPage.push(notFullPage[notFullPage.length - 1]);
                        }
                    }
                    for (let i = this.pages.length;i < pageNumber;i++) {
                        const insertArray = [];
                        for (let j = i * 5 + 1;j <= newTotal && insertArray.length < 5;j++) {
                            insertArray.push(j);
                        }
                        this.pages.push(insertArray);
                    }
                }
            });

            $scope.$watch(() => {
                return this.current;
            }, (newCurrent, oldCurrent) => {
                this.visibleIndex = parseInt((newCurrent - 1) / 5);
                this.isToNext = newCurrent > oldCurrent || this.visibleIndex === this.pages.length - 1;
            });
        }

        changePage (newPage) {
            if (newPage !== this.current) {
                if (!this.onPageChanged({ newPage, oldPage: this.current })) {
                    this.current = newPage;
                }
            }
        }

        previousPage () {
            if (this.visibleIndex > 0) {
                this.isToNext = false;
                this.visibleIndex--;
            }
        }

        nextPage () {
            if (this.visibleIndex < this.pages.length - 1) {
                this.isToNext = true;
                this.visibleIndex++;
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
        },
    });
}());
