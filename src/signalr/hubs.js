/*!
 * ASP.NET SignalR JavaScript Library v2.2.0
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['couponHub'] = this.createHubProxy('couponHub');
        proxies['couponHub'].client = { };
        proxies['couponHub'].server = {
        };

        proxies['logHub'] = this.createHubProxy('logHub');
        proxies['logHub'].client = { };
        proxies['logHub'].server = {
        };

        proxies['messageHub'] = this.createHubProxy('messageHub');
        proxies['messageHub'].client = { };
        proxies['messageHub'].server = {
        };
        
        proxies['steamBindingHub'] = this.createHubProxy('steamBindingHub');
        proxies['steamBindingHub'].client = { };
        proxies['steamBindingHub'].server = {
        };

        proxies['steamLoginHub'] = this.createHubProxy('steamLoginHub');
        proxies['steamLoginHub'].client = { };
        proxies['steamLoginHub'].server = {
        };

        return proxies;
    };

    signalR.new = function () {
        var connection = $.hubConnection(window.apiEndpoint + "signalr", {useDefaultPath: false})
        $.extend(connection, connection.createHubProxies());
        var connectionStart = connection.start;
        connection.start = function (options, callback) {
            var config = {
                pingInterval: 300000,
                waitForPageLoad: false,
                transport: "auto",
                jsonp: false
            };
            return connectionStart.call(this, $.extend(config, options), callback);
        };
        return connection;
    };

}(window.jQuery, window));