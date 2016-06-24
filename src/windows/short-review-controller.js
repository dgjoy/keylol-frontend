(function () {
    class ShortReviewController {
        constructor(apiEndpoint, close, notification, $http, options, $location, $state, union) {
            $.extend(this,{
                close,
                notification,
                $http,
                $location,
                $state,
                union,
                apiEndpoint,
            });
            this.options = options;

            this.vm = $.extend({
                TypeName: '简评',
                Title: `${options.point.Name} 的简评`,
                Content: '',
                Vote: null,
                VoteForPointId: options.point.Id,
            }, options.vm);
            this.count = this.vm.Content.length;

            // $scope.changeToLong = function () {
            //     notification.attention('切换为长评时会覆盖之前未发布的草稿', [
            //         {action: '覆盖', value: true},
            //         {action: '取消'}
            //     ]).then(function (result) {
            //         if (result) {
            //             window.show({
            //                 templateUrl: 'src/windows/editor.html',
            //                 controller: 'EditorController',
            //                 inputs: {
            //                     options: {
            //                         doNotLoadDraft: true,
            //                         vm: {
            //                             Id: $scope.vm.Id,
            //                             TypeName: '评',
            //                             Title: '',
            //                             Content: $scope.vm.Content,
            //                             Vote: $scope.vm.Vote,
            //                             Summary: '',
            //                             Pros: [],
            //                             Cons: []
            //                         },
            //                         voteForPoint: options.point
            //                     }
            //                 }
            //             });
            //             close();
            //         }
            //     });
            // };

            this.submitLock = false;
        }
        
        cancel() {
            const close = this.close;
            
            close();
        }
        
        submit() {
            const notification = this.notification;
            const $state = this.$state;
            const $http = this.$http;
            const apiEndpoint = this.apiEndpoint;
            const union = this.union;
            const close = this.close;
            const $location = this.$location;
            
            const checkEmpty = () => {
                if (!this.vm.Content) return '简评内容';
                if (!this.vm.Vote) return '简评评分';
                return null;
            };
            
            if (this.submitLock || this.vm.Content.length > 99)
                return;
            const emptyString = checkEmpty();
            if (emptyString) {
                return notification.error(`${emptyString}不能为空`);
            }
            this.submitLock = true;
            if (this.vm.Id) {
                $http.put(`${apiEndpoint}article/${this.vm.Id}`, this.vm)
                    .then(() => {
                        close();
                        $state.reload();
                        notification.success('简评已发布');
                    }, response => {
                        notification.error('发生未知错误，请重试或与站务职员联系', response);
                        this.submitLock = false;
                    });
            } else {
                $http.post(`${apiEndpoint}article`, this.vm)
                    .then(response => {
                        close();
                        $location.url(`article/${union.$localStorage.user.IdCode}/${response.data.SequenceNumberForAuthor}`);
                        notification.success('简评已发布');
                    }, response => {
                        if (response.status === 401) {
                            notification.error('现有文券数量不足，无法发文');
                        } else {
                            notification.error('发生未知错误，请重试或与站务职员联系', response);
                        }
                        this.submitLock = false;
                    });
            }
        }
    }
    
    keylolApp.controller('ShortReviewController', ShortReviewController);
}());
