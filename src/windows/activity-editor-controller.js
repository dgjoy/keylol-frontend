(function () {
    class ActivityEditorController {
        constructor($scope, close, options, stateTree, $http, upyun, notification, $state, $location) {
            $.extend(this, {
                close,
                stateTree,
                $http,
                upyun,
                notification,
                $state,
                $location,
            });

            this.vm = {
                targetPoints: [],
                content: '',
            };
            this.extra = {};

            if (options.file) {
                this.extra.image = options.file;
            }

            if (options.targetPoint) {
                this.vm.targetPoints.push(options.targetPoint);
            }

            if (options.activity) {
                this.vm.id = options.activity.id;
                this.vm.targetPoints.push(options.activity.pointBasicInfo);
                this.vm.content = options.activity.content;
                this.vm.rating = options.activity.rating;
                this.vm.coverImage = options.activity.coverImage;
            }

            $scope.$watchCollection(() => {
                return this.vm.targetPoints;
            },() => {
                this.hasRating = false;
                if (this.vm.targetPoints[0]) {
                    this.inLibraryTime = `${this.vm.targetPoints[0].totalPlayedTime ? this.vm.targetPoints[0].totalPlayedTime : '0'} 小时`;
                    this.getRelatedPoints();

                    if (this.vm.targetPoints[0].type === 'game') {
                        this.hasRating = true;
                    }
                } else {
                    this.inLibraryTime = '';
                    this.relatedPointCount = undefined;
                }
            });
        }

        uploadImage($file) {
            if ($file) {
                this.extra.image = $file;
            }
        }

        getRelatedPoints() {
            this.$http.get(`${apiEndpoint}states/related-points?point_id=${this.vm.targetPoints[0].id}`).then(response => {
                this.relatedPointCount = response.data.length;
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
            });
        }


        submit() {
            const submitHelper = () => {
                if (this.vm.id) {
                    this.$http.put(`${apiEndpoint}activity/${this.vm.id}`,submitObj).then(response => {
                        this.notification.success({ message: '修改成功' });
                        this.$state.reload();
                        this.close();
                    },response => {
                        this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        this.submitLock = false;
                    });
                } else {
                    this.$http.post(`${apiEndpoint}activity`,submitObj).then(response => {
                        this.notification.success({ message: '提交成功' });
                        this.$location.url(`activity/${this.stateTree.currentUser.idCode}/${response.data}`);
                        this.close();
                    },response => {
                        this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        this.submitLock = false;
                    });
                }
            };

            this.submitLock = true;

            const submitObj = {};
            submitObj.content = this.vm.content;
            submitObj.targetPointId = this.vm.targetPoints[0].id;
            if (this.hasRating) {
                submitObj.rating = this.vm.rating;
            }
            submitObj.coverImage = this.vm.coverImage;

            if (this.extra.image !== undefined) {
                this.notification.process({ message: '图像正在上传' });
                const policy = this.upyun.policy();
                this.upyun.signature(policy).then(signature => {
                    this.upyun.upload(this.extra.image, policy, signature).then(response => {
                        this.notification.success({ message: '图像上传成功' });
                        submitObj.coverImage = `keylol://${response.data.url}`;
                        submitHelper();
                    }, response => {
                        this.notification.error({ message: '图像上传失败' }, response);
                        this.submitLock = false;
                    });
                }, response => {
                    this.notification.error({ message: '文件上传验证失效' }, response);
                    this.submitLock = false;
                });
            } else {
                submitHelper();
            }
        }
    }
    keylolApp.controller('ActivityEditorController', ActivityEditorController);
}());
