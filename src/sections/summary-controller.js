/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class SummaryController {
        constructor($scope, union, $http, notification) {
            $.extend(this,{
                $scope,
                $http,
                notification,
            });
            
            this.union = union;
            this.data = union.summary;
            this.subscribeDisabled = false;
        }
        
        subscribe(pointId) {
            this.subscribeDisabled = true;
            this.$http.post(`${apiEndpoint}user-point-subscription`, {}, {
                params: { pointId },
            }).then(() => {
                this.notification.success('据点已订阅，其今后收到的文章投稿将推送到你的首页');
                this.data.subscribed = true;
                this.subscribeDisabled = false;
                this.data.pointSum.readerNum++;
                this.union.$localStorage.user.SubscribedPointCount++;
            }, response => {
                this.notification.error('发生未知错误，请重试或与站务职员联系', response);
                this.subscribeDisabled = false;
            });
        }
        
        unsubscribe(pointId) {
            this.subscribeDisabled = true;
            this.notification.attention('退订并不再接收此据点的文章推送', [
                { action: '退订', value: true },
                { action: '取消' },
            ]).then(result => {
                if (result) {
                    this.$http.delete(`${apiEndpoint}user-point-subscription`, {
                        params: { pointId },
                    }).then(() => {
                        this.notification.success('据点已退订');
                        this.data.subscribed = false;
                        this.data.pointSum.readerNum--;
                        this.union.$localStorage.user.SubscribedPointCount--;
                    }, response => {
                        this.notification.error('发生未知错误，请重试或与站务职员联系', response);
                    }).finally(() => {
                        this.subscribeDisabled = false;
                    });
                } else {
                    this.subscribeDisabled = false;
                }
            });
        }
    }

    keylolApp.component('summary', {
        templateUrl: 'src/sections/summary.html',
        controller: SummaryController,
        controllerAs: 'summary',
    });
}());
