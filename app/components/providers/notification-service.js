(function () {
    "use strict";

    keylolApp.factory("notification", [
        "window",
        function (window) {
            function NotificationService() {
                var self = this;

                var windowPromise;

                self.show = function (options) {

                    var windowOptions = {
                        templateUrl: "components/popup/operation-feedback.html",
                        controller: "OperationFeedbackController",
                        adjustScrollBar: false,
                        inputs: {
                            options: options
                        }
                    };

                    if (windowPromise) {
                        windowPromise = windowPromise.then(function (window) {
                            return window.close;
                        }).then(function () {
                            return window.show(windowOptions);
                        });
                    } else {
                        windowPromise = window.show(windowOptions);
                    }

                    var onBodyClick;
                    windowPromise.then(function (window) {
                        onBodyClick = function (e) {
                            if (e.target !== window.$element[0] && !$.contains(window.$element[0], e.target))
                                window.closeNow();
                        };
                        document.body.addEventListener("click", onBodyClick, true);
                        return window.close;
                    }).then(function () {
                        document.body.removeEventListener("click", onBodyClick, true);
                    });

                    return windowPromise.then(function (window) {
                        return window.close;
                    });
                };

                self.success = function (message) {
                    return self.show({
                        type: "success",
                        title: "成功",
                        subtitle: "Success",
                        message: message
                    });
                };

                self.process = function (message) {
                    return self.show({
                        type: "process",
                        title: "处理中",
                        subtitle: "Processing",
                        message: message
                    });
                };

                self.error = function (messageOrModelStateError, error) {
                    if (typeof messageOrModelStateError === "string") { // Is message
                        if (error) {
                            console.error(error);
                        }
                        return self.show({
                            type: "error",
                            title: "错误",
                            subtitle: "Error",
                            message: messageOrModelStateError
                        });
                    }
                    // Is model state error
                    for (var error in messageOrModelStateError.ModelState) {
                        if (messageOrModelStateError.ModelState.hasOwnProperty(error) && typeof(error) !== "function") {
                            self.error(messageOrModelStateError.ModelState[error][0]);
                            break;
                        }
                    }
                };

                self.attention = function (message, actions) {
                    return self.show({
                        type: "attention",
                        title: "注意",
                        subtitle: "Attention",
                        message: message,
                        actions: actions
                    });
                };
            }

            return new NotificationService();
        }
    ]);
})();