(function () {
    class TimelineCardController {
        constructor($element, $timeout) {
            $.extend(this,{
                $element,
                $timeout,
            });
            //this.type = 'article';
            this.type = 'simple';
            this.state = 'close';
            this.hasScroller = true;
            this.currentFloor = 0;
        }

        moveToFloor(index) {
            if (this.currentFloor === index) {
                this.currentFloor = 0;
                this.$timeout(() => {
                    this.currentFloor = index;
                });
            } else {
                this.currentFloor = index;
            }

            if (this.hasScroller) {
                if (this.scrollAnimation !== undefined) {
                    this.scrollAnimation.stop();
                }
                const e = this.$element.find('.review-list');
                this.scrollAnimation = e.animate({ scrollTop: e.find(`[data-floor-id='#${index}']`).position().top }, 1000);
            }
        }

        openReviewArea() {
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

        showSourceList($event) {
            this.showMenuPopup({
                templateUrl: 'src/popup/source-list.html',
                controller: 'SourceListController as sourceList',
                event: $event,
                attachSide: 'left',
                align: 'top',
                offsetX: 0,
                offsetY: 0,
                inputs: { content: 'hello' },
            });
        }

        showMenu($event) {
            this.showMenuPopup({
                templateUrl: 'src/popup/timeline-card-menu.html',
                controller: 'TimelineCardMenuController as timelineCardMenu',
                event: $event,
                attachSide: 'left',
                align: 'top',
                offsetX: 0,
                offsetY: 0,
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
