(function () {
    class PointEditSectionController {
        constructor ($element) {
            $.extend(this, {
                $element,
            });
            this.showPopups = [];
        }

        showEditPopup ($event, $index) {
            // 修改图片时,弹出的是菜单
            if ($.inArray(this.object.list[$index].type,['thumbnail','cover','avatar','logo']) !== -1) {
                this.showPopups[$index]({
                    templateUrl: 'src/popup/upload-menu.html',
                    controller: 'UploadMenuController as uploadMenu',
                    attachSide: 'left',
                    align: 'top',
                    offsetX: 39,
                    offsetY: -40,
                    inputs: {
                        item: this.object.list[$index],
                        theme: this.theme,
                        submitLink: this.object.submitLink,
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    if (result || result === '') {
                        this.object.list[$index].value = result;
                    }
                });
                return;
            }

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
                    } else {
                        this.object.extraList[$index - this.object.list.length].value = result;
                    }
                }
            });
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
                    console.log(this.object.list);
                }
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
