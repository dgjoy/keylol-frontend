(function () {
    class SectionTimelineController {
        constructor ($scope, $location, $window, window, $http, apiEndpoint, notification) {
            $.extend(this, {
                $location,
                window,
                $http,
                apiEndpoint,
                notification,
            });
            this.columnCount = 'two';
            this.leftCards = [];
            this.rightCards = [];
            this.preferLeft = false;
            this.setTwoColumn();
            this.first = true;
            this.end = false;

            const $$window = $($window);

            const scrollHandler = $$window.bind('scroll', () => {
                if (!this.first && !this.end && !this.loadLock) {
                    if ($(document).scrollTop() + $$window.height() >= $(document).height()) {
                        this.load();
                    }
                }
            });

            $scope.$on('$destroy',() => {
                $$window.unbind('scroll', scrollHandler);
            });
        }

        setTwoColumn (start = 0) {
            console.log(start, this.cards);
            for (let i = start;i < this.cards.length;i++) {
                if (this.preferLeft) {
                    this.leftCards.push(this.cards[i]);
                } else {
                    this.rightCards.push(this.cards[i]);
                }
                this.preferLeft = !this.preferLeft;
            }
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
            if (!this.end && !this.loadLock) {
                this.loadLock = true;
                const nowLength = this.cards.length;
                this.$http.get(`${this.apiEndpoint}/states/entrance/timeline/cards`, {
                    params: {
                        before: this.cards[nowLength - 1].feedId,
                        take: 12,
                    },
                }).then(response => {
                    Array.prototype.push.apply(this.cards, response.data);
                    this.setTwoColumn(nowLength);
                    if (response.data.length < 12) {
                        this.end = true;
                    }
                    this.loadLock = false;
                }, response => {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    this.loadLock = false;
                });
            }
        }
    }

    keylolApp.component('sectionTimeline', {
        templateUrl: 'src/sections/section-timeline.html',
        controller: SectionTimelineController,
        controllerAs: 'sectionTimeline',
        bindings: {
            cards: '<',
        },
    });
}());
