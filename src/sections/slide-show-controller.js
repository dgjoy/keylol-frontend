(function () {
    class SlideShowController {
        constructor($timeout) {
            $.extend(this,{
                $timeout,
            });
            this.index = 0;
            this.oldIndex = -1;
            this.isMoveUp = false;
            this.resetTimer();
        }
        
        slideTo(index) {
            if (index === this.index)
                return ;

            this.isMoveUp = (index < this.index);
            this.oldIndex = this.index;
            this.index = index;

            this.resetTimer();
        }

        resetTimer() {
            if (this.timer !== undefined) {
                this.$timeout.cancel(this.timer);
            }
            this.timer = this.$timeout(() => {
                if (this.index < this.indexCount - 1) {
                    this.slideTo(this.index + 1);
                } else {
                    this.slideTo(0);
                }
            },15000);
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

    keylolApp.component('slideShow', {
        templateUrl: 'src/sections/slide-show.html',
        controller: SlideShowController,
        controllerAs: 'slideShow',
        bindings: {
            slides: '<',
        },
    });
}());
