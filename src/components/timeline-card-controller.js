(function () {
    class TimelineCardController {
        constructor($element) {
            // this.type = 'article';
            this.type = 'simple';
            this.state = 'close';
        }

        open() {
            this.state = 'open';
        }
    }

    keylolApp.component('timelineCard', {
        templateUrl: 'src/components/timeline-card.html',
        controller: TimelineCardController,
        controllerAs: 'timelineCard',
    });
}());
