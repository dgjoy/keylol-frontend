(function () {
    class ReviewWithTextController {
        constructor () {
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
