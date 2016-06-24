(function () {
    class PointPreviewCardController {
        constructor($http, notification) {
            this.ready = true;

            // const fetchPromise = $http.get(`${apiEndpoint}states/aggregation/point`, {
            //     params: {
            //         point_id_code: idCode,
            //     },
            // }).then(response => {
            //     console.log(response.data);
            //         this.card = response.data.basicInfo;
            //         this.ready = true;
            // }, response => {
            //     notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
            // });
        }
    }

    keylolApp.controller('PointPreviewCardController', PointPreviewCardController);
}());
