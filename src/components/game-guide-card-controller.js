(function () {
    class GameGuideCardController {
        constructor() {
            this.characteristics = [1,2,3,4,5,6,7];
            if (this.characteristics.length > 7) {
                this.characteristics = this.characteristics.slice(0,7);
                this.characteristics.push(-1);
            }
            this.showTooltipPopup = new Array(this.characteristics.length);

            this.categories = [1,2,3,4,5];
        }

        showTooltip($event,$index) {
            this.showTooltipPopup[$index]({
                templateUrl: 'src/popup/tooltip.html',
                controller: 'TooltipController as tooltip',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: 0,
                showDelay: 0,
                closeDelay: 0,
                inputs: { content: '一段文字' },
            });
        }
    }

    keylolApp.component('gameGuideCard', {
        templateUrl: 'src/components/game-guide-card.html',
        controller: GameGuideCardController,
        controllerAs: 'gameGuideCard',
        bindings: {
            text: '@',
        },
    });
}());
