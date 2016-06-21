(function () {
    class TimelineCardController {
        constructor($element, $timeout, $scope, $rootScope) {
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

        showSourceList($event) {
            this.showSharedPopup({
                templateUrl: 'src/popup/source-list.html',
                controller: 'SourceListController as sourceList',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: 20,
            });
        }

        showMenu($event) {
            this.showSharedPopup({
                templateUrl: 'src/popup/timeline-card-menu.html',
                controller: 'TimelineCardMenuController as timelineCardMenu',
                event: $event,
                attachSide: 'right',
                align: 'top',
                offsetX: -220,
                offsetY: 0,
                inputs: {
                    origin: {
                        popup: this.showSharedPopup,
                        event: $event,
                    },
                },
            });
        }
    }

    keylolApp.component('timelineCard', {
        templateUrl: 'src/components/timeline-card.html',
        controller: TimelineCardController,
        controllerAs: 'timelineCard',
    });
}());
