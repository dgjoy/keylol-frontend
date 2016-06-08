(function () {
    class UploadMenuController {
        constructor (close, $element, apiEndpoint, $http, notification, item, theme, submitLink) {
            $.extend(this,{
                item,
                apiEndpoint,
                submitLink,
                close,
                $http,
                notification,
            });
            this.menu = {
                items: [
                    {
                        type: 'item',
                        text: '上传新图像',
                        clickAction () {
                            $element.find('.upload').click();
                        },
                    },
                    {
                        type: 'item',
                        text: '采用网络图像',
                        clickAction () {
                            close();
                        },
                    },
                    {
                        type: 'item',
                        text: '移除图像',
                        clickAction () {
                            close();
                        },
                    },
                ],
            };
        }

        uploadImage ($file, $event) {
            if ($file) {
                this.previewPopup({
                    templateUrl: 'src/popup/upload-preview.html',
                    controller: 'UploadPreviewController as uploadPreview',
                    attachSide: 'left',
                    event: {
                        type: 'click',
                        currentTarget: $event.currentTarget,
                    },
                    align: 'top',
                    offsetX: 45,
                    offsetY: -20,
                    inputs: {
                        file: $file,
                        options: {
                            type: this.item.key === 'avatarImage' || this.item.key === 'headerImage' ? this.item.key : 'cover' ,
                        },
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    console.log(result);
                    if (result) {
                        const submitObj = {};
                        let closeValue = '';
                        submitObj[this.item.key] = result;
                        closeValue = result;

                        this.$http.put(`${this.apiEndpoint}${this.submitLink}`, submitObj).then(response => {
                            this.notification.success({ message: '修改成功' });
                            this.close(closeValue);
                        }, response => {
                            this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        });
                    }
                });
            }
        }
    }

    keylolApp.controller('UploadMenuController', UploadMenuController);
}());
