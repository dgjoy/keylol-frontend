(function () {
    class TimelineCardController {
        constructor($element, $timeout, utils, stateTree, $http, apiEndpoint, notification, $state, $scope) {
            $.extend(this,{
                $element,
                $timeout,
                utils,
                stateTree,
                $http,
                apiEndpoint,
                notification,
            });
            this.state = 'close';
            this.hasScroller = true;
            this.currentFloor = 0;

            $timeout(() => {
                this.simpleMaxHeight = this.card.coverImage ? 300 : 100;
                this.simpleHeight = $element.find('.display-card>.shortcut>.simple>p').height();
                this.simpleHidden = this.simpleHeight > this.simpleMaxHeight;
            }, 3000);

            const currentStateName = $state.current.name;
            if (currentStateName.substr(0, 18) === 'entrance.discovery') {
                this.reviewLink = 'entrance/discovery/latest-activities';
            } else if (currentStateName.substr(0, 17) === 'entrance.timeline') {
                this.reviewLink = 'entrance/timeline/cards';
            } else if (currentStateName.substr(0, 17) === 'aggregation.point') {
                this.reviewLink = 'aggregation/point/timeline/cards';
            } else if (currentStateName.substr(0, 16) === 'aggregation.user') {
                this.reviewLink = 'aggregation/user/timeline/cards';
            }
        }

        simpleExpand() {
            this.simpleHidden = false;
        }

        moveToFloor(index) {
            if (this.currentFloor === index) {
                this.currentFloor = 0;
                this.$timeout(() => {
                    this.currentFloor = index;
                });
            } else {
                this.currentFloor = index;
            }

            if (this.hasScroller) {
                if (this.scrollAnimation !== undefined) {
                    this.scrollAnimation.stop();
                }
                const e = this.$element.find('.review-list');
                this.scrollAnimation = e.animate({ scrollTop: e.find(`[data-floor-id='#${index}']`).position().top }, 1000);
            }
        }

        openReviewArea() {
            if (this.card.contentType === 'activity') {
                this.$http.get(`${this.apiEndpoint}states/${this.reviewLink}[${this.card.contentId}]/comments`, {
                    params: {
                        take: 30,
                    },
                }).then(response => {
                    this.comments = response.data;
                    this.state = 'open';

                    this.$timeout(() => {
                        if (this.comments.length === 0) {
                            return;
                        }

                        const e = this.$element.find('.review-list');
                        e.animate({
                            scrollTop: e.find(`[data-floor-id='#${this.comments[this.comments.length - 1].sidForActivity}']`).position().top,
                        });
                    });
                }, response => {});
            } else {
                this.state = 'open';
            }
        }

        replyComment(comment) {
            if (!this.comment) {
                this.comment = `#${comment.sidForActivity} `;
            } else {
                this.comment += `\n#${comment.sidForActivity} `;
            }
            this.commentFocus = true;
        }

        doComment() {
            this.submitLock = true;
            const submitObj = {
                content: this.comment,
                activityId: this.card.contentId,
            };

            this.$http.post(`${this.apiEndpoint}activity-comment`,submitObj).then(response => {
                this.comments.push({
                    authorAvatarImage: this.stateTree.currentUser.avatarImage,
                    authorIdCode: this.stateTree.currentUser.idCode,
                    authorUserName: this.stateTree.currentUser.userName,
                    content: this.comment,
                    likeCount: 0,
                    publishTime: new Date().toISOString(),
                    sidForActivity: response.data,
                });
                this.comment = '';
                this.submitLock = false;
                this.$timeout(() => {
                    const e = this.$element.find('.review-list');
                    e.animate({
                        scrollTop: e.find(`[data-floor-id='#${response.data}']`).position().top,
                    });
                });
                this.notification.success({ message: '提交成功' });
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }

        showSourceList($event) {
            this.showSharedPopup({
                templateUrl: 'src/popup/source-list.html',
                controller: 'SourceListController as sourceList',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: 20,
            });
        }

        showMenu($event) {
            this.showSharedPopup({
                templateUrl: 'src/popup/timeline-card-menu.html',
                controller: 'TimelineCardMenuController as timelineCardMenu',
                event: $event,
                attachSide: 'right',
                align: 'top',
                offsetX: -220,
                offsetY: 0,
                inputs: {
                    origin: {
                        popup: this.showSharedPopup,
                        event: $event,
                    },
                    options: {
                        link: `${this.card.contentType}/${this.card.author.idCode}/${this.card.sidForAuthor}`,
                    },
                    content: this.card,
                },
            });
        }
    }

    keylolApp.component('timelineCard', {
        templateUrl: 'src/components/timeline-card.html',
        controller: TimelineCardController,
        controllerAs: 'timelineCard',
        bindings: {
            card: '<',
            theme: '<',
        },
    });
}());
