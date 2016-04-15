(function () {
    keylolApp.factory("notification", ["window", window => {
            function NotificationService() {
                const self = this;

                let windowPromise;

                self.show = options => {
                    const windowOptions = {
                        templateUrl: "components/popup/operation-feedback.html",
                        controller: "OperationFeedbackController",
                        adjustScrollBar: false,
                        global: true,
                        inputs: { options },
                    };

                    if (windowPromise) {
                        windowPromise = windowPromise.then(window => {
                            return window.close;
                        }).then(() => {
                            return window.show(windowOptions);
                        });
                    } else {
                        windowPromise = window.show(windowOptions);
                    }

                    let onBodyClick;
                    windowPromise.then(window => {
                        onBodyClick = function (e) {
                            if (e.target !== window.$element[0] && !$.contains(window.$element[0], e.target))
                                window.closeNow();
                        };
                        document.body.addEventListener("click", onBodyClick, true);
                        return window.close;
                    }).then(() => {
                        document.body.removeEventListener("click", onBodyClick, true);
                    });

                    return windowPromise.then(window => {
                        return window.close;
                    });
                };

                self.success = message => {
                    return self.show({
                        message,
                        type: "success",
                        title: "成功",
                        subtitle: "Success",
                    });
                };

                self.process = message => {
                    return self.show({
                        message,
                        type: "process",
                        title: "处理中",
                        subtitle: "Processing",
                    });
                };

                self.error = (message, errorResponse) => {
                    if (errorResponse) {
                        console.error(errorResponse);
                    }
                    if (errorResponse && errorResponse.status === 400) {
                        // Is model state error
                        for (const error in errorResponse.data.ModelState) {
                            if (errorResponse.data.ModelState.hasOwnProperty(error) && typeof(error) !== "function") {
                                return self.show({
                                    type: "error",
                                    title: "错误",
                                    subtitle: "Error",
                                    message: errorResponse.data.ModelState[error][0],
                                });
                            }
                        }
                    } else {
                        return self.show({
                            message,
                            type: "error",
                            title: "错误",
                            subtitle: "Error",
                        });
                    }
                };

                self.attention = function (message, actions) {
                    return self.show({
                        message,
                        actions,
                        type: "attention",
                        title: "注意",
                        subtitle: "Attention",
                    });
                };
            }

            return new NotificationService();
        },
    ]);
}());
