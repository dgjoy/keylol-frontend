(function () {
    class PromotedReadingsController {
        constructor ($http, apiEndpoint, union) {
            $.extend(this, {
                articles: union.$localStorage.promotedReadings,
                point: union.point,
                circles: [new Array(1), new Array(2), new Array(3), new Array(4), new Array(5)],
            });
            $http.get(`${apiEndpoint}article/spotlight`).then(response => {
                union.$localStorage.promotedReadings = this.articles = response.data;
            });
        }
    }

    keylolApp.component('promotedReadings', {
        templateUrl: 'src/sections/promoted-readings.html',
        controller: PromotedReadingsController,
        controllerAs: 'promotedReadings',
    });
}());
