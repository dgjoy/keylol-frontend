(function () {
    class PointReviewController {
        constructor ($scope) {
            this.levelString = ['terrible', 'bad', 'not-bad', 'good', 'awesome'];
            this.reviewCircles = [{}, {}, {}, {}, {}];
            this.reviewLevel = -1;
            this.reviewString = '';
            $scope.$watch(() => {
                return this.bindReview;
            }, newValue => {
                if (newValue) {
                    this.setReview(newValue - 1, true);
                    this.returnDefault();
                }
            });
        }

        changeReview (i) {
            for (let j = 0; j < this.reviewCircles.length; j++) {
                this.reviewCircles[j].type = j <= i ? this.levelString[i] : '';
            }
        }

        returnDefault () {
            this.changeReview(this.reviewLevel);
        }

        setReview (i, changeDefault) {
            if (!this.onClickReview({ vote: i + 1 })) {
                this.reviewLevel = i;
                this.reviewString = this.levelString[i];
                if (!changeDefault) {
                    this.bindReview = i + 1;
                }
            }
        }
    }

    keylolApp.component('pointReview', {
        templateUrl: 'src/components/point-review.html',
        controller: PointReviewController,
        controllerAs: 'pointReview',
        bindings: {
            noString: '<',
            onClickReview: '&',
            bindReview: '=',
            isHollow: '<',
        },
    });
}());
