(function () {
    class PushEntryController {
        constructor(type, close, $element) {
            $.extend(this, {
                close,
                $element,
            });
            switch (type) {
                case 'slideShow':
                    this.subTitle = '入口 - 广场 - 四格幻灯片';
                    break;
            }
            this.vm = {
                title: '守望先锋',
            };
            this.formHeight = 73;
            this.expand = false;
        }

        capture () {
            console.log(this.vm.link);
            if (!this.expand) {
                this.expand = true;
                let detailHeight = 0;
                const $detail = this.$element.find('form .info-detail');
                if ($detail) {
                    console.log($detail);
                    detailHeight = $detail.height();
                }
                this.formHeight += detailHeight;
            }
        }
    }

    keylolApp.controller('PushEntryController', PushEntryController);
}());
