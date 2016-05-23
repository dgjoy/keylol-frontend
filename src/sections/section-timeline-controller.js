(function () {
    class SectionTimelineController {
        constructor ($scope, $rootScope, $location) {
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

            this.first = true;
            this.end = false;

            const scrollHandler = $(window).on('scroll', () => {
                if (!this.first && !this.end) {
                    if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
                        $scope.$apply(() => {
                            this.load();
                        });
                    }
                }
            });

            $scope.$on('$destroy',() => {
               $(window).unbind('scroll',scrollHandler);
            });
        }

        load() {
            this.first = false;
            this.end = true;
            if (this.columnCount === 'two') {
                this.leftCards.push(1);
                this.rightCards.push(1);
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
