(function () {
    class ItemEditorController {
        constructor(item, options, close, $http, notification, apiEndpoint, utils) {
            $.extend(this, {
                $http,
                notification,
                apiEndpoint,
                close,
                utils,
                item,
                theme: options.theme,
                submitLink: options.submitLink,
            });

            switch (item.type) {
                case 'text':
                case 'appId':
                case 'color':
                case 'avatar':
                    this.model = item.value;
                    break;
                case 'checkbox':
                case 'point':
                    this.model = item.selects;
                    break;
            }
        }

        submit () {
            if (this.submitLock) {
                return;
            }

            this.submitLock = true;
            const submitObj = {};
            let closeValue, matches;
            switch (this.item.type) {
                case 'color':
                    if (!this.colorCheck(this.model)) {
                        this.textError = '颜色格式错误';
                        this.submitLock = false;
                        return;
                    } else {
                        const rgb = this.utils.hexToRgb(this.model);
                        if (rgb[0] + rgb[1] + rgb[2] > 630) {
                            this.textError = '颜色过亮';
                            this.submitLock = false;
                            return;
                        }
                    }
                    submitObj[this.item.key] = this.model;
                    closeValue = this.model;
                    break;
                case 'text':
                    submitObj[this.item.key] = this.model;
                    closeValue = this.model;
                    break;
                case 'appId':
                    matches = this.model.match(this.item.regex);
                    if (!matches) {
                        this.textError = '商店地址格式错误';
                        this.submitLock = false;
                        return;
                    }
                    submitObj[this.item.key] = parseInt(matches[1]);
                    closeValue = this.model;
                    break;
                case 'checkbox':
                    closeValue = [];
                    if (this.item.key) {
                        submitObj[this.item.key] = [];
                        for (let i = 0;i < this.model.length;i++) {
                            const name = this.item.names[this.model[i]];
                            let value;
                            if (this.item.values) {
                                value = this.item.values[this.model[i]];
                            } else {
                                value = name;
                            }
                            if (name) {
                                closeValue.push(name);
                            }
                            if (value) {
                                submitObj[this.item.key].push(value);
                            }
                        }
                    } else if (this.item.keys) {
                        for (let i = 0;i < this.item.keys.length;i++) {
                            if (this.model.indexOf(i) > -1) {
                                submitObj[this.item.keys[i]] = true;
                                let name;
                                if (name = this.item.names[i]) {
                                    closeValue.push(name);
                                }
                                closeValue.push();
                            } else {
                                submitObj[this.item.keys[i]] = false;
                            }
                        }
                    }
                    closeValue = closeValue.toString();
                    this.item.selects = this.model;
                    break;
                case 'point':
                    closeValue = [];
                    submitObj[this.item.key] = [];
                    for (let i = 0;i < this.model.length;i++) {
                        submitObj[this.item.key].push(this.model[i].id);
                        closeValue.push(this.utils.getPreferredPointName(this.model[i])[0]);
                    }
                    closeValue = closeValue.toString();
                    this.item.selects = this.model;
                    break;
            }

            this.$http.put(`${this.apiEndpoint}${this.submitLink}`, submitObj).then(response => {
                this.notification.success({ message: '修改成功' });
                this.close(closeValue);
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }

        colorCheck(str) {
            return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(str);
        }
    }

    keylolApp.controller('ItemEditorController', ItemEditorController);
}());
