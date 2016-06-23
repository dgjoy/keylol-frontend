(function () {
    class TimelineCardController {
        constructor($element, $timeout, utils, stateTree, $http, apiEndpoint, notification) {
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
                this.simpleHeight = $element.find('.display-card>.shortcut>.simple>p').height();
                this.simpleHidden = this.simpleHeight > 100;
            });
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
            this.$http.get(`${this.apiEndpoint}states/entrance/timeline/cards[${this.card.contentId}]/comments`, {
                params: {
                    take: 30,
                },
            }).then(response => {
                this.comments = response.data;
                console.log(this.comments);
                this.state = 'open';

                this.$timeout(() => {
                    const e = this.$element.find('.review-list');
                    e.animate({
                        scrollTop: e.find(`[data-floor-id='#${this.comments[this.comments.length - 1].sidForActivity}']`).position().top,
                    });
                });
            }, response => {});
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
