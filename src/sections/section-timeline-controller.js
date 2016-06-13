(function () {
    class SectionTimelineController {
        constructor ($scope, $rootScope, $location, $window, window) {
            $.extend(this, {
                $rootScope,
                $location,
                window,
            });
            this.columnCount = 'two';
            this.cards = ['l','l','r'];

            if (this.columnCount === 'two') {
                this.leftCards = ['l', 'l'];
                this.rightCards = ['r'];
            }

            this.first = true;
            this.end = false;

            const $$window = $($window);

            const scrollHandler = $$window.bind('scroll', () => {
                if (!this.first && !this.end) {
                    if ($(document).scrollTop() + $$window.height() >= $(document).height()) {
                        this.load();
                    }
                }
            });

            $scope.$on('$destroy',() => {
                $$window.unbind('scroll',scrollHandler);
            });
        }

        showActivityEditor (event) {
            this.window.show({
                event,
                templateUrl: 'src/windows/activity-editor.html',
                controller: 'ActivityEditorController',
                controllerAs: 'activityEditor',
                inputs: {
                    options: {},
                },
            });
        }

        uploadImage ($file, $event) {
            if ($file) {
                this.window.show({
                    event,
                    templateUrl: 'src/windows/activity-editor.html',
                    controller: 'ActivityEditorController',
                    controllerAs: 'activityEditor',
                    inputs: {
                        options: {
                            file: $file,
                        },
                    },
                });
            }
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
