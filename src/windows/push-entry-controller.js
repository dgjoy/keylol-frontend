(function () {
    class PushEntryController {
        constructor(type, options, close, $element, $http, apiEndpoint) {
            $.extend(this, {
                close,
                $element,
                $http,
                apiEndpoint,
            });
            this.vm = {};
            this.formHeight = 73;
            this.expand = false;

            switch (type) {
                case 'slideShow':
                    this.subTitle = '入口 - 广场 - 四格幻灯片';
                    this.captureUrl = 'entrance/discovery/slideshow-entries';
                    this.postUrl = 'slideshow-entry';
                    break;
            }

            if (options.item) {
                console.log(options.item);
                $.extend(this.vm, options.item);

                this.formHeight = 'auto';
                this.expand = true;
            }
        }

        capture () {
            if (this.vm.link && !this.expand && !this.captureLock) {
                this.captureLock = true;
                this.$http.get(`${this.apiEndpoint}states/${this.captureUrl}/reference/?link=${this.vm.link}`).then(response => {
                    $.extend(this.vm, response.data);
                    this.expand = true;
                    let detailHeight = 0;
                    const $detail = this.$element.find('form .info-detail');
                    if ($detail) {
                        detailHeight = $detail.height();
                    }
                    this.formHeight += detailHeight;
                    this.captureLock = false;
                }, error => {
                    this.notification.error({ message: '未知错误' });
                    this.captureLock = false;
                });
            }
        }

        submit () {
            if (this.vm.feedId) {
                this.$http.put(`${this.apiEndpoint}feed/${this.postUrl}/${this.vm.feedId}`, this.vm).then(response => {
                    this.notification.success({ message: '推送成功' });
                    this.close();
                }, error => {
                    this.notification.error({ message: '推送失败，请重试' });
                });
            } else {
                this.$http.put(`${this.apiEndpoint}feed/${this.postUrl}`, this.vm).then(response => {
                    this.notification.success({ message: '推送成功' });
                    this.close();
                }, error => {
                    this.notification.error({ message: '推送失败，请重试' });
                });
            }
        }
    }

    keylolApp.controller('PushEntryController', PushEntryController);
}());
