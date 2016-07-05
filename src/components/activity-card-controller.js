(function () {
    class ActivityCardController {
        constructor(utils, $http, notification, stateTree, apiEndpoint, $timeout, $element, $window) {
            $.extend(this,{
                utils,
                $http,
                notification,
                stateTree,
                apiEndpoint,
                $timeout,
                $element,
                $window,
            });
            this.relatedPoints = {
                mainPoint: this.object.pointBasicInfo,
                attachedPoints: this.object.attachedPoints,
            };

            this.vm = {
                content: '',
            };
            this.submitLock = false;

            this.commentsManager = {
                count: this.object.commentCount,
                currentPage: 1,
                pages: [],
                pageCount: parseInt((this.object.commentCount - 1) / 10) + 1,
            };
            this.commentsManager.pages[0] = this.object.comments;

            if (stateTree.currentUser &&
                (stateTree.currentUser.roles.indexOf('Operator') > -1 || stateTree.currentUser.id === this.object.authorBasicInfo.id)) {
                this.canModerate = true;
            }

            this.setCommentsHeight();

            this.showArchivePopup = [];
            this.showWarnPopup = [];

            if (!stateTree.currentUser) {
                this.currentIdCode = '';
                this.isManager = false;
            } else {
                this.currentIdCode = stateTree.currentUser.idCode;
                this.isManager = (stateTree.currentUser.roles.indexOf('Operator') > -1);
            }
        }

        authorize_view (comment) {
            return !comment.archived || (comment.authorIdCode === this.currentIdCode || this.isManager);
        }
        
        authorize_edit (comment) {
            return (comment.authorIdCode === this.currentIdCode && this.currentIdCode === this.object.authorBasicInfo.idCode ) || this.isManager;
        }

        back () {
            this.$window.history.back();
        }

        reply(comment) {
            if (!this.vm.content) {
                this.vm.content = `#${comment.sidForActivity} `;
            } else {
                this.vm.content += `\n#${comment.sidForActivity} `;
            }
            this.textFocus = true;
        }

        showSourceList($event) {
            this.showSourceListPopup({
                templateUrl: 'src/popup/source-list.html',
                controller: 'SourceListController as sourceList',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: 20,
                inputs: {
                  object: this.relatedPoints,
                },
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
                    content: this.object,
                    options: {
                        inActivity: true,
                    },
                },
            });
        }
        
        showArchive($index, $event, comment) {
            this.showArchivePopup[$index]({
                templateUrl: 'src/popup/operation-panel.html',
                controller: 'OperationPanelController as operationPanel',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: -90,
                inputs: {
                    options: {
                        contentId: comment.id,
                        contentType: 'activity-comment',
                        operationType: `${comment.archived ? 'Un' : ''}Archived`,
                    },
                },
            }).then(popup => {
                return popup.close;
            }).then(result => {
                if (result !== undefined) {
                    comment.archived = result;
                }
            });
        }

        showWarn($index, $event, comment) {
            this.showWarnPopup[$index]({
                templateUrl: 'src/popup/operation-panel.html',
                controller: 'OperationPanelController as operationPanel',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: -90,
                inputs: {
                    options: {
                        contentId: comment.id,
                        contentType: 'activity-comment',
                        operationType: `${comment.warned ? 'Un' : ''}Warned`,
                    },
                },
            }).then(popup => {
                return popup.close;
            }).then(result => {
                if (result !== undefined) {
                    comment.warned = result;
                }
            });
        }
        
        submit() {
            this.submitLock = true;
            const submitObj = {
                content: this.vm.content,
                activityId: this.object.id,
            };

            this.$http.post(`${this.apiEndpoint}activity-comment`,submitObj).then(response => {
                this.notification.success({ message: '提交成功' });
                this.vm.content = '';
                this.sync(response.data);
                this.submitLock = false;
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }

        scrollToComments() {
            $('html, body').animate({
                scrollTop: this.$element.find('.communicate-card').offset().top - 64,
            }, 500);
        }

        changePage (newPage, oldPage, scrollToTop) {
            if (this.commentsManager.pages[newPage - 1]) {
                this.commentsManager.currentPage = newPage;
                this.commentsManager.isToNext = newPage > oldPage;
                this.setCommentsHeight();
                if (scrollToTop)
                    this.scrollToComments();
                return true;
            }

            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/content/activity/comments`,{
                    params: {
                        activity_id: this.object.id,
                        page: newPage,
                    },
                }).then(response => {
                    this.commentsManager.currentPage = newPage;
                    this.commentsManager.isToNext = newPage > oldPage;
                    this.setCommentsHeight();
                    if (scrollToTop)
                        this.scrollToComments();
                    this.commentsManager.pages[newPage - 1] = response.data;
                    this.changePageLock = false;
                }, response => {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    this.changePageLock = false;
                });
            }
            return true;
        }

        sync (sid) {
            this.commentsManager.pageCount = parseInt((sid - 1) / 10) + 1;
            this.$http.get(`${this.apiEndpoint}states/content/activity/comments`,{
                params: {
                    activity_id: this.object.id,
                    page: this.commentsManager.pageCount,
                },
            }).then(response => {
                this.commentsManager.pages[this.commentsManager.pageCount - 1] = response.data;
                this.commentsManager.count = response.data.length + (this.commentsManager.currentPage - 1) * 10;
                this.changePage(this.commentsManager.pageCount, this.commentsManager.currentPage);
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
            });
        }

        setCommentsHeight () {
            this.$timeout(() => {
                this.commentsManager.commentsHeight = this.$element.find('.review-list>ul').height();
            });
        }
    }

    keylolApp.component('activityCard', {
        templateUrl: 'src/components/activity-card.html',
        controller: ActivityCardController,
        controllerAs: 'activityCard',
        bindings: {
            object: '<',
            theme: '<',
        },
    });
}());
