(function () {
    keylolApp.factory('notification', ['window', window => {
            function NotificationService() {
                const self = this;

                let windowPromise;

                self.show = options => {
                    const windowOptions = {
                        templateUrl: 'src/popup/operation-feedback.html',
                        controller: 'OperationFeedbackController',
                        adjustScrollBar: false,
                        global: true,
                        inputs: { options },
                    };
                    windowPromise = window.show(windowOptions);

                    return windowPromise.then(window => {
                        return window.close;
                    });
                };

                self.default = options => {
                    return self.show({
                        message: options.message,
                        description: options.description,
                        type: 'default',
                        icon: 'check',
                    });
                };

                self.success = options => {
                    return self.show({
                        message: options.message,
                        description: options.description,
                        type: 'success',
                        icon: 'check',
                    });
                };

                self.process = options => {
                    return self.show({
                        message: options.message,
                        description: options.description,
                        type: 'process',
                        icon: 'check',
                    });
                };

                self.error = (options, errorResponse) => {
                    if (errorResponse) {
                        console.error(errorResponse);
                    }
                    if (errorResponse && errorResponse.status === 400) {
                        // Is model state error
                        for (const error in errorResponse.data.ModelState) {
                            if (errorResponse.data.ModelState.hasOwnProperty(error) && typeof(error) !== 'function') {
                                return self.show({
                                    type: 'error',
                                    title: '错误',
                                    subtitle: 'Error',
                                    message: errorResponse.data.ModelState[error][0],
                                });
                            }
                        }
                    } else {
                        return self.show({
                            message: options.message,
                            description: options.description,
                            type: 'error',
                            icon: 'check',
                        });
                    }
                };

                self.attention = function (options, action) {
                    return self.show({
                        action,
                        message: options.message,
                        description: options.description,
                        type: 'attention',
                        icon: 'check',
                    });
                };
            }

            return new NotificationService();
        },
    ]);
}());
