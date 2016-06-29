(function () {
    class PointEditSectionController {
        constructor ($element, apiEndpoint, $http, notification, union, $state, $stateParams) {
            $.extend(this, {
                $element,
                apiEndpoint,
                $http,
                notification,
                union,
                $state,
                $stateParams,
            });
            this.showPopups = [];
        }

        showEditPopup ($event, $index) {
            if ($index < this.object.list.length) {
                this.object.list[$index].editActive = true;
            } else {
                this.object.extraList[$index - this.object.list.length].editActive = true;
            }

            if ($index < this.object.list.length && $.inArray(this.object.list[$index].type,['thumbnail','cover','avatar','logo']) !== -1) {
                // 修改图片时,弹出的是菜单
                this.showPopups[$index]({
                    templateUrl: 'src/popup/upload-menu.html',
                    controller: 'UploadMenuController as uploadMenu',
                    event: $event,
                    attachSide: 'left',
                    align: 'top',
                    offsetX: 39,
                    offsetY: -40,
                    inputs: {
                        actions: [
                            () => {
                                this.$element.find(`#upload-${$index}`).click();
                            },
                            () => {
                                this.clearImage($index);
                            },
                        ],
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    this.object.list[$index].editActive = false;
                });
            } else {
                this.showPopups[$index]({
                    templateUrl: 'src/popup/item-editor.html',
                    controller: 'ItemEditorController as itemEditor',
                    event: $event,
                    attachSide: 'left',
                    align: 'top',
                    offsetX: 39,
                    offsetY: -40,
                    inputs: {
                        item: $index < this.object.list.length ? this.object.list[$index] : this.object.extraList[$index - this.object.list.length],
                        options: {
                            theme: this.theme,
                            submitLink: this.object.submitLink,
                            updateObject: this.object.updateObject,
                        },
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    if (result || result === '') {
                        if ($index < this.object.list.length) {
                            this.object.list[$index].value = result;
                            if (this.object.list[$index].type === 'steamcn') {
                                this.object.list[$index].editDisabled = true;
                            }
                        } else {
                            this.object.extraList[$index - this.object.list.length].value = result;
                        }
                    }

                    if ($index < this.object.list.length) {
                        this.object.list[$index].editActive = false;
                    } else {
                        this.object.extraList[$index - this.object.list.length].editActive = false;
                    }
                });
            }
        }

        expand() {
            this.extraHeight = this.$element.find('.extra>ul').height();
        }

        showAddPopup ($event) {
            this.showExtraPopup({
                templateUrl: 'src/popup/item-editor.html',
                controller: 'ItemEditorController as itemEditor',
                event: $event,
                attachSide: 'bottom',
                offsetY: -105,
                inputs: {
                    item: this.object.addAttribute,
                    options: {
                        theme: this.theme,
                        submitLink: this.object.submitLink,
                        updateObject: this.object.updateObject,
                    },
                },
            }).then(popup => {
                return popup.close;
            }).then(result => {
                if (result) {
                    $.extend(result, this.object.addAttribute.itemBasic);
                    this.object.list.push(result);
                }
            });
        }

        uploadImage ($index, $file, $event) {
            const item = this.object.list[$index];
            const submitLink = this.object.submitLink;

            if ($file) {
                this.object.list[$index].editActive = true;

                this.showPopups[$index]({
                    templateUrl: 'src/popup/upload-preview.html',
                    controller: 'UploadPreviewController as uploadPreview',
                    attachSide: 'left',
                    event: {
                        type: 'click',
                        currentTarget: $event.currentTarget,
                    },
                    align: 'top',
                    offsetX: 35,
                    offsetY: item.key === 'avatarImage' ? -49 : -20,
                    inputs: {
                        file: $file,
                        options: {
                            theme: this.theme,
                            type: item.key === 'avatarImage' ? item.key : `edit-image` ,
                        },
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    if (result) {
                        const submitObj = {};
                        submitObj[item.key] = result;

                        this.$http.put(`${this.apiEndpoint}${submitLink}`, submitObj).then(response => {
                            this.notification.success({ message: '修改成功' });
                            this.object.list[$index].value = result;
                        }, response => {
                            this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        });
                    }

                    this.object.list[$index].editActive = false;
                });
            }
        }

        clearImage($index) {
            const submitObj = {};
            submitObj[this.object.list[$index].key] = '';

            this.$http.put(`${this.apiEndpoint}${this.object.submitLink}`, submitObj).then(response => {
                this.notification.success({ message: '修改成功' });
                this.object.list[$index].value = '';
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
            });
        }
        
        toggle($index) {
            const submitObj = {};
            submitObj[this.object.list[$index].key] = !this.object.list[$index].value;

            this.$http.put(`${this.apiEndpoint}${this.object.submitLink}`, submitObj).then(response => {
                this.notification.success({ message: '修改成功' });
                this.object.list[$index].value = !this.object.list[$index].value;
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
            });

            return true;
        }

        logout() {
            this.$state.go('^.^.dossier').then(() => {
                delete this.union.$localStorage.Authorization;
            });
        }
    }

    keylolApp.component('pointEditSection', {
        templateUrl: 'src/sections/point-edit-section.html',
        controller: PointEditSectionController,
        controllerAs: 'pointEditSection',
        bindings: {
            theme: '<',
            object: '<',
        },
    });
}());
