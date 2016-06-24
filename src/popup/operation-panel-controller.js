(function () {
    class OperationPanelController {
        constructor(moderationText, options, apiEndpoint, $http, notification, close) {
            $.extend(this, {
                $http,
                notification,
                close,
            });
            this.operation = moderationText[options.operationType];
            switch(options) {

            }

            this.vm = {
                reasons : [],
                missive: [],
            };

            this.op = {};
            if (options.operationType.slice(0,2) === 'Un') {
                this.op.property = options.operationType.slice(2);
                this.op.value = false;
            } else {
                this.op.property = options.operationType;
                this.op.value = true;
            }

            this.api = `${apiEndpoint}${options.contentType}/${options.contentId}/moderation`;
        }

        submit () {
            this.submitLock = true;
            const submitObj = {
                property: this.op.property,
                value: this.op.value,
                notifyAuthor: this.vm.missive[0] === 0,
                reasons: this.vm.reasons,
            };

            console.log(this.api,submitObj);
            this.$http.put(this.api, submitObj).then(response => {
                this.notification.success({ message: `${this.operation.mainTitle}成功` }, response);
                this.close(submitObj.value);
            },response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }
    }

    keylolApp.controller('OperationPanelController', OperationPanelController);
}());