(function () {
    class VoteCircleController {
        constructor (utils) {
            this.circles = new Array(this.vote);
            this.voteColor = utils.getVoteColor(this.vote - 1);
        }
    }

    keylolApp.component('voteCircle', {
        templateUrl: 'src/components/vote-circle.html',
        controller: VoteCircleController,
        controllerAs: 'voteCircle',
        bindings: {
            vote: '<',
            disabled: '<',
            wholeWhite: '<',
        },
    });
}());
