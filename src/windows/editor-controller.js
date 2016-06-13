(function () {
    class EditorController {
        constructor($scope, close, $element, stateTree, $http, apiEndpoint, notification, $timeout) {
            $.extend(this,{
                $scope,
                close,
                $element,
                stateTree,
                $http,
                apiEndpoint,
                notification,
            });

            this.isSummaryOpened = false;
            this.isRepostOpened = false;
            this.canFillRelated = true;
            this.vm = {
                content: '',
                attachedPoints: [],
                targetPoints: [],
                pros: [],
                cons: [],
            };

            $scope.$watch(() => {
                return this.vm.targetPoints.length;
            }, newValue => {
                //noinspection JSValidateTypes
                if (newValue === 0) {
                    this.totalPlayedTime = 0;
                    this.hasRating = false;
                    if (!this.canFillRelated) {
                        this.canFillRelated = true;
                    }
                } else {
                    this.totalPlayedTime = this.vm.targetPoints[0].totalPlayedTime;
                    this.hasRating = this.vm.targetPoints[0].type === 'game';
                }
            });

            $scope.$watch(() => {
                return this.vm.attachedPoints.length;
            }, newValue => {
                if (newValue > 0) {
                    $timeout(() => {
                        this.fakeHeight = $element.find('.related-points')[0].offsetHeight;
                    });
                }
            });
        }

        exit() {
            this.close();
        }

        showExitToolTips ($event) {
            this.showExitPopup({
                templateUrl: 'src/popup/tooltip.html',
                controller: 'TooltipController as tooltip',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: 15,
                showDelay: 0,
                closeDelay: 0,
                inputs: { content: '退出写作' },
            });
        }

        showSetHeaderMenu ($event) {
            let match, articleFirstImageSrc;
            if ((match = /<img[^>]*src="([^">]*)"[^>]*>/mi.exec(this.vm.content)) !== null) {
                articleFirstImageSrc = match[1];
                const doubleSlashIndex = articleFirstImageSrc.indexOf('//');
                const index = articleFirstImageSrc.indexOf('!article.image');
                if (doubleSlashIndex === 0 && index > -1) {
                    articleFirstImageSrc = articleFirstImageSrc.slice(0, index);
                }
            }
            this.showHeaderPopup({
                templateUrl: 'src/popup/set-header-menu.html',
                controller: 'SetHeaderMenuController as setHeaderMenu',
                event: $event,
                attachSide: 'right',
                align: 'top',
                offsetX: -210,
                offsetY: -5,
                inputs: {
                    options: {
                        pointHeaderImageDisable: this.vm.targetPoints.length <= 0,
                        articleFirstImageDisable: !articleFirstImageSrc,
                    },
                },
            }).then(popup => {
                return popup.close;
            }).then(result => {
                switch (result) {
                    case 'upload':
                        this.$element.find('#upload-article-header').click();
                        break;
                    case 'pointHeaderImage':
                        this.vm.coverImage = this.vm.targetPoints[0].headerImage;
                        break;
                    case 'articleFirstImage':
                        this.vm.coverImage = articleFirstImageSrc;
                        break;
                }
            });
        }

        uploadImage($file, $event) {
            if ($file) {
                this.showHeaderPopup({
                    templateUrl: 'src/popup/upload-preview.html',
                    controller: 'UploadPreviewController as uploadPreview',
                    attachSide: 'left',
                    event: {
                        type: 'click',
                        currentTarget: $event.currentTarget,
                    },
                    align: 'top',
                    offsetX: 106,
                    offsetY: -25,
                    inputs: {
                        file: $file,
                        options: {
                            type: 'articleCover',
                        },
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    if (result) {
                        this.vm.coverImage = result;
                    }
                });
            }
        }

        toggleSummary() {
            this.isSummaryOpened = !this.isSummaryOpened;
        }

        toggleRepost() {
            this.isRepostOpened = !this.isRepostOpened;
        }

        getRelatedPoints() {
            if (this.vm.targetPoints.length <= 0 || !this.canFillRelated) return;

            this.$http.get(`${this.apiEndpoint}states/related-points?point_id=${this.vm.targetPoints[0].id}`).then(response => {
                const relatedPoints = response.data;
                for (let i = 0;i < relatedPoints.length;i++) {
                    if (this.vm.attachedPoints.length >= 10) {
                        break;
                    }
                    let exist = false;
                    for (let j = 0;j < this.vm.attachedPoints.length;j++) {
                        if (this.vm.attachedPoints[j].id === relatedPoints[i].id) {
                            exist = true;
                            break;
                        }
                    }
                    if (!exist) {
                        this.vm.attachedPoints.push(relatedPoints[i]);
                    }
                }
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
            });

            this.canFillRelated = false;
        }

        submit() {
            if (this.submitLock) return;
            if (!this.vm.title) {
                this.titleEmpty = true;
                return;
            }
            if (this.vm.targetPoints.length <= 0) {
                this.targetEmpty = true;
                return;
            }
            this.submitLock = true;

            const submitObj = {};
            $.extend(submitObj, this.vm);
            delete submitObj.attachedPoints;
            delete submitObj.targetPoints;
            submitObj.pros = [];
            submitObj.cons = [];

            if (!submitObj.coverImage) {
                let match, articleFirstImageSrc;
                if ((match = /<img[^>]*src="([^">]*)"[^>]*>/mi.exec(this.vm.content)) !== null) {
                    articleFirstImageSrc = match[1];
                    const doubleSlashIndex = articleFirstImageSrc.indexOf('//');
                    const index = articleFirstImageSrc.indexOf('!article.image');
                    if (doubleSlashIndex === 0 && index > -1) {
                        articleFirstImageSrc = articleFirstImageSrc.slice(0, index);
                    }
                }

                if (articleFirstImageSrc) {
                    submitObj.coverImage = articleFirstImageSrc;
                } else {
                    submitObj.coverImage = this.vm.targetPoints[0].headerImage;
                }
            }

            submitObj.targetPointId = this.vm.targetPoints[0].id;

            submitObj.attachedPointIds = [];
            for (let i = 0;i < this.vm.attachedPoints.length;i++) {
                submitObj.attachedPointIds.push(this.vm.attachedPoints[i].id);
            }

            for (let i = 0;i < 3;i++) {
                if (this.vm.pros[i]) {
                    submitObj.pros.push(this.vm.pros[i]);
                }
                if (this.vm.cons[i]) {
                    submitObj.cons.push(this.vm.cons[i]);
                }
            }

            if (!this.hasRating) {
                delete submitObj.rating;
            }

            this.$http.post(`${this.apiEndpoint}article`, submitObj).then(response => {
                this.notification.success({ message: '提交成功' });
                this.close();
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }
    }
    keylolApp.controller('EditorController', EditorController);
}());
