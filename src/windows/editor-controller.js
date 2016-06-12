(function () {
    class EditorController {
        constructor(close, $element, stateTree) {
            $.extend(this,{
                close,
                $element,
                stateTree,
            });

            this.isSummaryOpened = false;
            this.isRepostOpened = false;
            this.vm = {
                content: '',
                attachedPointIds: [],
                pros: [],
                cons: [],
            };
            this.extra = {
                targetPointIds: [],
            };
        }

        exit() {
            this.close();
        }

        showExitToolTips ($event) {
            this.showExitPopup({
                templateUrl: 'src/popup/tooltip.html',
                controller: 'TooltipController as tooltip',
                event: $event,
                attachSide: 'bottom',
                align: 'center',
                offsetX: 0,
                offsetY: 15,
                showDelay: 0,
                closeDelay: 0,
                inputs: { content: '退出写作' },
            });
        }

        showSetHeaderMenu ($event) {
            this.showHeaderPopup({
                templateUrl: 'src/popup/set-header-menu.html',
                controller: 'SetHeaderMenuController as setHeaderMenu',
                event: $event,
                attachSide: 'right',
                align: 'top',
                offsetX: -210,
                offsetY: -5,
                inputs: {},
            }).then(popup => {
                return popup.close;
            }).then(result => {
                switch (result) {
                    case 'upload':
                        this.$element.find('#upload-article-header').click();
                }
            });
        }

        uploadImage($file, $event) {
            if ($file) {
                this.showHeaderPopup({
                    templateUrl: 'src/popup/upload-preview.html',
                    controller: 'UploadPreviewController as uploadPreview',
                    attachSide: 'left',
                    event: {
                        type: 'click',
                        currentTarget: $event.currentTarget,
                    },
                    align: 'top',
                    offsetX: 106,
                    offsetY: -25,
                    inputs: {
                        file: $file,
                        options: {
                            type: 'articleCover',
                        },
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    if (result) {
                        this.vm.coverImage = result;
                    }
                });
            }
        }

        toggleSummary() {
            this.isSummaryOpened = !this.isSummaryOpened;
        }

        toggleRepost() {
            this.isRepostOpened = !this.isRepostOpened;
        }

        submit() {
            console.log(this.vm);
        }
    }
    keylolApp.controller('EditorController', EditorController);
}());
