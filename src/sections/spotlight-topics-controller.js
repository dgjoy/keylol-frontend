(function () {
    class SpotlightTopicsController {
        constructor() {
            this.topics = [1,2,3];
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

    }

    keylolApp.component('spotlightTopics', {
        templateUrl: 'src/sections/spotlight-topics.html',
        controller: SpotlightTopicsController,
        controllerAs: 'spotlightTopics',
    });
}());
