(function () {
    class ShortReviewController {
        constructor (stateTree, $http, notification) {
            $.extend(this, {
                stateTree,
                $http,
                notification,
            });
            this.type = {
                mainTitle: '简评',
                subTitle: `一共有 ${this.list.length} 则附有评价的动态`,
            };

            this.vm = {
                content: '',
            };
        }

        submit () {
            this.submitLock = true;
            const submitObj = {};
            submitObj.content = this.vm.content;
            submitObj.targetPointId = this.pointId;
            submitObj.rating = this.vm.rating;

            this.$http.post(`${apiEndpoint}activity`,submitObj).then(response => {
                this.notification.success({ message: '提交成功' });
                this.$http.get(`${apiEndpoint}${this.moduleApi}`,{
                    params: {
                        point_id: this.pointId,
                        page: 1,
                    },
                }).then(response => {
                    this.list = response.data;
                },response => {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                });
                this.vm.content = '';
                this.submitLock = false;
            },response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }
        
        getPlayedTime(time,idCode) {
            if (!idCode) {
                return time ? time : '0';
            } else {
                if (idCode === this.stateTree.currentUser.idCode) {
                    return this.playedTime ? this.playedTime : '0';
                } else {
                    return time ? time : '0';
                }
            }
        }
    }

    keylolApp.component('shortReview', {
        templateUrl: 'src/sections/short-review.html',
        controller: ShortReviewController,
        controllerAs: 'shortReview',
        bindings: {
            theme: '<',
            list: '<',
            pointId: '<',
            moduleApi: '@',
            playedTime: '<',
        },
    });
}());
