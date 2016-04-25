(function () {
    class PointVotesController {
        constructor (union, utils) {
            $.extend(this, {
                utils,
                point: union.point,
                circles: [new Array(1), new Array(2), new Array(3), new Array(4), new Array(5)],
            });
        }
    }

    keylolApp.component('pointVotes', {
        templateUrl: 'src/sections/point-votes.html',
        controller: PointVotesController,
        controllerAs: 'pointVotes',
    });
}());
