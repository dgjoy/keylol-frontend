(function () {
    class PointListController {
        constructor(close, $http, apiEndpoint, notification, window) {
            $.extend(this,{
                close,
            });

            this.inline = {
                onPageChange : newPage => {
                    const recordPerPage = 20;
                    $http.get(`${apiEndpoint}normal-point/list`, {
                        params: {
                            skip: recordPerPage * (newPage - 1),
                            take: recordPerPage,
                        },
                    }).then(response => {
                        this.inline.totalPages = Math.ceil(response.headers('X-Total-Record-Count') / recordPerPage);
                        this.inline.currentPage = newPage;
                        this.points = response.data;
                    }, response => {
                        notification.error('发生未知错误，请重试或与站务职员联系', response);
                    });
                },
                editPoint : point => {
                    window.show({
                        templateUrl: 'src/windows/create-point.html',
                        controller: 'CreatePointController',
                        inputs: { vm: point },
                    });
                },
            };

            this.inline.onPageChange(1);
        }

        cancel() {
            const close = this.close;

            close();
        }
    }
    keylolApp.controller('PointListController', PointListController);
}());
