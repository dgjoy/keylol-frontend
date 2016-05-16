(function () {
    class SpotlightTopicsController {
        constructor() {
            this.index = 0;
            this.oldIndex = -1;
            this.isMoveUp = false;
        }

        slideTo(index) {
            if (index === this.index)
                return ;

            this.isMoveUp = (index < this.index);
            this.oldIndex = this.index;
            this.index = index;
        }
        
        showModeration ($event) {
            this.showModerationPopup({
                templateUrl: 'src/popup/moderation.html',
                controller: 'ModerationController as moderation',
                event: $event,
                attachSide: 'left',
                align: 'top',
                offsetX: 29,
                offsetY: -5,
                inputs: {},
            });
        }
    }

    keylolApp.component('spotlightTopics', {
        templateUrl: 'src/sections/spotlight-topics.html',
        controller: SpotlightTopicsController,
        controllerAs: 'spotlightTopics',
        bindings: {
            topics: '<',
        },
    });
}());
