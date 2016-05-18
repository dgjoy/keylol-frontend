(function () {
    class VoteCircleController {
        constructor (utils) {
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
            if (this.grayBackground === true) {
                this.circles = new Array(5);
                this.voteColor = utils.getVoteColor(this.vote - 1);
            } else {
                this.circles = new Array(this.vote);
                this.voteColor = utils.getVoteColor(this.vote - 1);
            }
        }
    }

    keylolApp.component('voteCircle', {
        templateUrl: 'src/components/vote-circle.html',
        controller: VoteCircleController,
        controllerAs: 'voteCircle',
        bindings: {
            review: '<',
            disabled: '<',
            wholeWhite: '<',
            grayBackground: '<',
        },
    });
}());
