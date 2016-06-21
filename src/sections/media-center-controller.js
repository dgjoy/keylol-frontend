(function () {
    class MediaCenterController {
        constructor (window, $http, notification, apiEndpoint) {
            $.extend(this,{
                window,
                $http,
                notification,
                apiEndpoint,
            });
            this.list = this.initList;
            this.reCalculate();
        }

        reCalculate() {
            if (this.list === undefined || this.list.length === 0) {
                this.artworkCount = 0;
                this.screenshotCount = 0;
                return;
            }
            this.artworkCount = this.list.filter(e => {
                return (e.type === 'artwork');
            }).length;
            this.screenshotCount = this.list.filter(e => {
                return (e.type === 'screenshot');
            }).length;
        }

        showMediaOverlayWindow(index) {
            this.window.show({
                templateUrl: 'src/windows/media-overlay.html',
                controller: 'MediaOverlayController as mediaOverlay',
                inputs: {
                    list: this.list,
                    currentPage: index,
                    point: {
                        name: this.pointName,
                        id: this.pointId,
                    },
                },
            }).then(window => {
                return window.close;
            }).then(result => {
                if (result.length > 0) {
                    for (let i = 0 ; i !== result.length; i++) {
                        this.list[result[i]] = null;
                    }
                    const new_arr = [];
                    for (let i = 0 ; i !== this.list.length; i++) {
                        if (this.list[i] !== null) {
                            new_arr.push(this.list[i]);
                        }
                    }

                    const submitObj = {
                        media: new_arr,
                    };

                    this.$http.put(`${this.apiEndpoint}point/${this.pointId}`, submitObj).then(response => {
                        this.notification.success({ message: '更新成功' });
                        this.list = new_arr;
                        this.reCalculate();
                    }, response => {
                        this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    });
                }
            });
        }

        uploadImage ($file, $event) {
            if ($file) {
                this.uploadImagePopup({
                    templateUrl: 'src/popup/upload-preview.html',
                    controller: 'UploadPreviewController as uploadPreview',
                    attachSide: 'left',
                    event: $event,
                    align: 'top',
                    offsetX: 86,
                    offsetY: 0,
                    inputs: {
                        file: $file,
                        options: {
                            type: 'headerImage',
                            isMedia: true,
                        },
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    if (result) {
                        const new_list = this.list.concat(result);

                        const submitObj = {
                            media: new_list,
                        };
                        this.$http.put(`${this.apiEndpoint}point/${this.pointId}`, submitObj).then(response => {
                            this.notification.success({ message: '更新成功' });
                            this.list = new_list;
                            this.reCalculate();
                        }, response => {
                            this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        });
                    }
                });
            }
        }
    }

    keylolApp.component('mediaCenter', {
        templateUrl: 'src/sections/media-center.html',
        controller: MediaCenterController,
        controllerAs: 'mediaCenter',
        bindings: {
            headerImage: '<',
            theme: '<',
            initList: '<',
            pointId: '<',
            pointName: '<',
        },
    });
}());
