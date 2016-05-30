(function () {
    class ActivityCardController {
        constructor($element, $timeout, $scope, $rootScope) {
            $.extend(this,{
                $element,
                $timeout,
            });
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
                inputs: { origin: { popup:this.showSharedPopup, event: $event } },
            });
        }
    }

    keylolApp.component('activityCard', {
        templateUrl: 'src/components/activity-card.html',
        controller: ActivityCardController,
        controllerAs: 'activityCard',
    });
}());
