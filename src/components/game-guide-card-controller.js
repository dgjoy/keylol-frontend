(function () {
    class GameGuideCardController {
        constructor($scope, pointAttributes, stateTree, utils) {
            this.subscribeSet = [
                {
                    text: '订阅',
                    type: 'theme',
                },
                {
                    text: '退订',
                    type: 'light-text',
                },
            ];
            this.subscribe = utils.subscribe;

            this.characteristics = [];
            for (const attr in this.card) {
                if (this.card.hasOwnProperty(attr)) {
                    if (pointAttributes[attr]) {
                        this.characteristics.push(pointAttributes[attr]);
                    }
                }
            }
            this.showTooltipPopup = new Array(this.characteristics.length);
            if (this.characteristics.length > 7) {
                this.characteristics = this.characteristics.slice(0, 7);
                this.characteristics.push({
                    icon: 'more',
                    text: '更多',
                });
            }

            this.categories = [1,2,3,4,5];

            $scope.stateTree = stateTree;
        }

        showTooltip($event, $index) {
            this.showTooltipPopup[$index]({
                templateUrl: 'src/popup/tooltip.html',
                controller: 'TooltipController as tooltip',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: 15,
                showDelay: 0,
                closeDelay: 0,
                inputs: { content: this.characteristics[$index].text },
            });
        }
    }

    keylolApp.component('gameGuideCard', {
        templateUrl: 'src/components/game-guide-card.html',
        controller: GameGuideCardController,
        controllerAs: 'gameGuideCard',
        bindings: {
            card: '<',
            bottomType: '<',
            theme: '<',
        },
    });
}());
