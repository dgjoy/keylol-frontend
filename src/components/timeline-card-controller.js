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
        
        showApproverList($event) {
            this.showApproverListPopup({
                templateUrl: 'src/popup/approver-list.html',
                controller: 'ApproverListController as approverList',
                event: $event,
                attachSide: 'right',
                align: 'bottom',
                offsetX: 60,
                offsetY: 120,
                showDelay: 0,
                closeDelay: 0,
                inputs: { content: 'hello' },
            });
        }
    }

    keylolApp.component('timelineCard', {
        templateUrl: 'src/components/timeline-card.html',
        controller: TimelineCardController,
        controllerAs: 'timelineCard',
    });
}());
