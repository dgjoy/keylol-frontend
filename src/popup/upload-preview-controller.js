(function () {
    class UploadPreviewController {
        constructor(file, options, close, upyun, notification) {
            $.extend(this, {
                file,
                close,
                upyun,
                notification,
                options,
            });

            if (options.isMedia) {
                this.media = {};
                this.media.object = {
                    title: '请选择媒体类型',
                    items: [
                        '截图',
                        '原画',
                    ],
                };
                this.media.vm = undefined;
            }
        }

        upload () {
            if (this.options.isMedia) {
                if (this.media.vm === undefined) {
                    return;
                }
            }

            this.notification.process({ message: '图像正在上传' });

            if (!this.uploadLock) {
                this.uploadLock = true;
                const policy = this.upyun.policy();
                this.upyun.signature(policy).then(signature => {
                    this.upyun.upload(this.file, policy, signature).then(response => {
                        this.notification.success({ message: '图像上传成功' });

                        if (this.options.isMedia) {
                            this.close({ link: `keylol://${response.data.url}`, type: ['screenshot', 'artwork'][this.media.vm] });
                        } else {
                            this.close(`keylol://${response.data.url}`);
                        }
                    }, response => {
                        this.notification.error({ message: '图像上传失败' }, response);
                        this.uploadLock = false;
                    });
                }, response => {
                    this.notification.error({ message: '文件上传验证失效' }, response);
                    this.uploadLock = false;
                });
            }
        }
    }

    keylolApp.controller('UploadPreviewController', UploadPreviewController);
}());
