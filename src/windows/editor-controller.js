(function () {
    class EditorController {
        constructor($scope, close, $element, stateTree, $http, apiEndpoint,
                    notification, $timeout, options, $window, utils, union, $state, $location) {
            $.extend(this,{
                $scope,
                close,
                $element,
                stateTree,
                $http,
                apiEndpoint,
                notification,
                union,
                $timeout,
                $state,
                $location,
            });

            this.isSummaryOpened = false;
            this.isRepostOpened = false;
            this.canFillRelated = true;
            this.autoSaveInterval = 30000;

            const $$window = $($window);
            const eventName = `beforeunload.editor${utils.uniqueId()}`;
            $$window.on(eventName, () => {
                return '未保存的内容将被弃置。';
            });

            $scope.$on('$destroy', () => {
                $$window.off(eventName);
            });

            this.detachLocationListener = $scope.$on('$locationChangeStart', e => {
                if (confirm('未保存的内容将被弃置，确认离开？')) {
                    this.detachLocationListener();
                    $$window.off(eventName);
                } else {
                    e.preventDefault();
                }
            });

            const setupNewVM = () => {
                this.vm = $.extend({
                    content: '',
                    attachedPoints: [],
                    targetPoints: [],
                    pros: [],
                    cons: [],
                    reproductionRequirement: {
                        reproduction: true,
                        attribution: true,
                        nonCommercial: true,
                        noDerivation: false,
                    },
                }, options.article ? {
                    id: options.article.id,
                    content: options.article.content,
                    title: options.article.title,
                    subtitle: options.article.subtitle,
                    attachedPoints: options.article.attachedPoints,
                    targetPoints: options.article.pointBasicInfo ? [options.article.pointBasicInfo] : undefined,
                    pros: options.article.pros,
                    cons: options.article.cons,
                    reproductionRequirement: options.article.reproductionRequirement ? {
                        reproduction: true,
                        attribution: options.article.reproductionRequirement.attribution,
                        nonCommercial: options.article.reproductionRequirement.nonCommercial,
                        noDerivation: options.article.reproductionRequirement.noDerivation,
                    } : {
                        reproduction: false,
                        attribution: true,
                        nonCommercial: true,
                        noDerivation: false,
                    },
                    coverImage: options.article.coverImage,
                    rating: options.article.rating,
                } : {});
            };

            this.saveDraft = () => {
                this.$timeout.cancel(this.autoSaveTimeout);
                this.union.$localStorage.editorDrafts[this.draftKey] = {
                    vm: this.vm,
                };
                this.autoSaveTimeout = this.$timeout(this.saveDraft, this.autoSaveInterval);
            };

            if (!union.$localStorage.editorDrafts) union.$localStorage.editorDrafts = {};
            this.draftKey = options.article ? options.article.id : 'new';
            const draft = union.$localStorage.editorDrafts[this.draftKey];
            if (draft) {
                setupNewVM();
                notification.attention({
                    message: '直接编辑上次未完成的草稿',
                },{
                    text: '加载草稿',
                    value: true,
                }).then(result => {
                    if (result) {
                        this.vm = draft.vm;
                        notification.success({ message: '本地草稿已加载' });
                    }
                    this.autoSaveTimeout = $timeout(this.saveDraft, this.autoSaveInterval);
                });
            } else {
                setupNewVM();
                this.autoSaveTimeout = $timeout(this.saveDraft, this.autoSaveInterval);
            }

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
            this.notification.attention({
                message: '关闭文章编辑器需要额外确认',
            },{
                text: '关闭',
                value: true,
            }).then(result => {
                if (result) {
                    this.$timeout.cancel(this.autoSaveTimeout);
                    this.close();
                }
            });
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

            if (submitObj.reproductionRequirement.reproduction) {
                delete submitObj.reproductionRequirement.reproduction;
            } else {
                delete submitObj.reproductionRequirement;
            }

            if (!this.hasRating) {
                delete submitObj.rating;
            }

            console.log(submitObj);

            if (this.vm.id) {
                delete submitObj.id;

                this.$http.put(`${this.apiEndpoint}article/${this.vm.id}`, submitObj).then(response => {
                    delete this.union.$localStorage.editorDrafts[this.draftKey];
                    this.$timeout.cancel(this.autoSaveTimeout);
                    this.close();
                    this.detachLocationListener();
                    this.$state.reload();
                    this.notification.success({ message: '提交成功' });
                }, response => {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    this.submitLock = false;
                });
            } else {
                this.$http.post(`${this.apiEndpoint}article`, submitObj).then(response => {
                    delete this.union.$localStorage.editorDrafts[this.draftKey];
                    this.$timeout.cancel(this.autoSaveTimeout);
                    this.close();
                    this.detachLocationListener();
                    this.$location.url(`article/${this.stateTree.currentUser.idCode}/${response.data}`);
                    this.notification.success({ message: '提交成功' });
                }, response => {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    this.submitLock = false;
                });
            }
        }
    }
    keylolApp.controller('EditorController', EditorController);
}());
