(function () {
    class ItemEditorController {
        constructor(item, options, close, $http, notification, apiEndpoint) {
            $.extend(this, {
                $http,
                notification,
                apiEndpoint,
                close,
                item,
                theme: options.theme,
                submitLink: options.submitLink,
            });

            switch (item.type) {
                case 'text':
                case 'appId':
                    this.model = item.value;
                    break;
                case 'checkbox':
                    this.model = [];
                    for (let i = 0;i < item.selects.length;i++) {
                        this.model.push(item.selects[i]);
                    }
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
                    submitObj[this.item.key] = [];
                    closeValue = [];
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
                    closeValue = closeValue.toString();
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
    }

    keylolApp.controller('ItemEditorController', ItemEditorController);
}());
