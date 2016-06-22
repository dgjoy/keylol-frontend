(function () {
    class MissiveController {
        constructor(close, $sce, object) {
            $.extend(this,{
                close,
                object,
                $sce,
            });

            this.reasons = [
                '政治敏感信息',
                '淫秽信息或引起生理反感',
                '不友善言行',
                '内容空洞',
                '未经许可的推广',
                '言论不尊重版权',
                '转载不符合规范',
            ];
        }
        exit() {
            this.close();
        }
        
    }
    keylolApp.controller('MissiveController', MissiveController);
}());
