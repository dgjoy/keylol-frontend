(function () {
    class SectionTimelineController {
        constructor ($scope, $location, $window, window, $http, apiEndpoint, notification, $state, stateTree, utils) {
            $.extend(this, {
                $location,
                window,
                $http,
                apiEndpoint,
                notification,
                $state,
                stateTree,
            });
            this.openRegistration = utils.openRegistration;
            this.columnCount = 'two';
            this.leftCards = [];
            this.rightCards = [];
            this.preferLeft = false;
            this.setTwoColumn();
            this.first = true;
            this.end = this.cards.length < 6;

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
            if (this.stateTree.currentUser) {
                this.window.show({
                    event,
                    templateUrl: 'src/windows/activity-editor.html',
                    controller: 'ActivityEditorController',
                    controllerAs: 'activityEditor',
                    inputs: {
                        options: {
                            targetPoint: this.$state.current.name.substr(0, 17) === 'aggregation.point' ?
                                this.stateTree.aggregation.point.basicInfo : undefined,
                        },
                    },
                });
            } else {
                this.openRegistration(event);
            }
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
                            targetPoint: this.$state.current.name.substr(0, 17) === 'aggregation.point' ?
                                this.stateTree.aggregation.point.basicInfo : undefined,
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

                let getUrl = `${this.apiEndpoint}/states/entrance/timeline/cards`;
                const params = {
                    before: this.cards[nowLength - 1].feedId,
                    take: 12,
                };
                const currentStateName = this.$state.current.name;
                if (currentStateName.substr(0, 17) === 'aggregation.point') {
                    getUrl = `${this.apiEndpoint}/states/aggregation/point/timeline/cards`;
                    params.point_id = this.stateTree.aggregation.point.basicInfo.id;
                }
                if (currentStateName.substr(0, 16) === 'aggregation.user') {
                    getUrl = `${this.apiEndpoint}/states/aggregation/user/timeline/cards`;
                    params.user_id = this.stateTree.aggregation.user.basicInfo.id;
                }

                this.$http.get(getUrl, {
                    params,
                }).then(response => {
                    Array.prototype.push.apply(this.cards, response.data);
                    this.setTwoColumn(nowLength);
                    this.end = response.data.length < 6;
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
            theme: '<',
        },
    });
}());
