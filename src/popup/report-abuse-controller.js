(function () {
    class ReportAbuseController {
        constructor() {
            this.myReasons = [
                '羞辱、谩骂、贬讽',
                '诱导我生理反感',
                '侵犯了我的著作权',
                '向我暴露剧透内容',
            ];

            this.communityReasons = [
                '挑衅、造谣、蓄意制造事端',
                '可能产生利益的宣传推广',
                '不符合规范的转载',
                '内容空洞、不具有建树性',
                '政治敏感话题',
            ];
        }
    }

    keylolApp.controller('ReportAbuseController', ReportAbuseController);
}());