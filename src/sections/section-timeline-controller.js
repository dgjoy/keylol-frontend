(function () {
    class SectionTimelineController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.columnCount = 'two';
            this.cards = ['l','l','r'];

            if (this.columnCount === 'two') {
                this.leftCards = ['l', 'l'];
                this.rightCards = ['r'];
            }
        }

        load() {
            if (this.columnCount === 'two') {
                this.leftCards.push(['l']);
                this.rightCards.push(['r', 'r']);
            } else {
                this.cards.push('l');
            }
        }
    }

    keylolApp.component('sectionTimeline', {
        templateUrl: 'src/sections/section-timeline.html',
        controller: SectionTimelineController,
        controllerAs: 'sectionTimeline',
    });
}());
