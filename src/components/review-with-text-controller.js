(function () {
    class ReviewWithTextController {
        constructor () {
            if (this.review < 2) {
                this.vote = 1;
            } else if (this.review < 4) {
                this.vote = 2;
            } else if (this.review < 6) {
                this.vote = 3;
            } else if (this.review < 8) {
                this.vote = 4;
            } else if (this.review >= 8) {
                this.vote = 5;
            }
        }
    }

    keylolApp.component('reviewWithText', {
        templateUrl: 'src/components/review-with-text.html',
        controller: ReviewWithTextController,
        controllerAs: 'reviewWithText',
        bindings: {
            review: '<',
        },
    });
}());
