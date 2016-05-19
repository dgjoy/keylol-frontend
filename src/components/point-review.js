(function () {
    class PointReviewController {
        constructor () {
            this.levelString = ['terrible', 'bad', 'not-bad', 'good', 'awesome'];
            this.reviewCircles = [{}, {}, {}, {}, {}];
            this.reviewLevel = -1;
            this.reviewString = '';
            if (this.bindReview) {
                this.setReview(this.bindReview - 1);
                this.returnDefault();
            }
        }

        changeReview (i) {
            for (let j = 0; j < this.reviewCircles.length; j++) {
                this.reviewCircles[j].type = j <= i ? this.levelString[i] : '';
            }
        }

        returnDefault () {
            this.changeReview(this.reviewLevel);
        }

        setReview (i) {
            if (!this.onClickReview({ vote: i + 1 })) {
                this.reviewLevel = i;
                this.reviewString = this.levelString[i];
                if (this.bindReview) {
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
