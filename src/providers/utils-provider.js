(function () {
    keylolApp.provider('utils', () => {
        let _config = {};
        return {
            config (config) {
                if (config) {
                    _config = config;
                }
                return _config;
            },
            $get: [
                '$q', 'union',
                ($q, union) => {
                    function Utils() {
                        const self = this;
                        let _uniqueId = 1;
                        
                        self.isPhantom = !!window.callPhantom;

                        self.supportWebp = $q((resolve, reject) => {
                            if (self.isPhantom) reject();
                            const img = new Image();
                            img.onload = function () {
                                if (img.width > 0 && img.height > 0) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            };
                            img.onerror = function () {
                                reject();
                            };
                            img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'; // detect lossy webp
                        });

                        self.byteLength = function (str) {
                            let s = 0;
                            for (let i = str.length - 1; i >= 0; i--) {
                                const code = str.charCodeAt(i);
                                if (code <= 0xff) s++;
                                else if (code > 0xff && code <= 0xffff) s += 2;
                                if (code >= 0xDC00 && code <= 0xDFFF) {
                                    i--;
                                    s++;
                                } //trail surrogate
                            }
                            return s;
                        };

                        self.createGeetest = function (product, onSuccess) {
                            if (typeof window.activateGeetest === 'undefined') {
                                window.activateGeetest = {};
                            }
                            const id = self.uniqueId();
                            const readyDeferred = $q.defer();
                            const successDeferred = $q.defer();
                            let refreshDefered;
                            activateGeetest[id] = () => {
                                const gee = new Geetest({
                                    product,
                                    gt: _config.geetestId,
                                    https: location.protocol === 'https:',
                                });
                                gee.onSuccess(() => {
                                    successDeferred.resolve(gee);
                                    if (refreshDefered)
                                        refreshDefered.resolve(gee);
                                });
                                readyDeferred.resolve(gee);
                            };
                            if (typeof window.Geetest === 'undefined') {
                                const s = document.createElement('script');
                                s.src = `//api.geetest.com/get.php?callback=activateGeetest[${id}]`;
                                document.body.appendChild(s);
                            } else {
                                activateGeetest[id]();
                            }
                            return {
                                id,
                                ready: readyDeferred.promise,
                                success: successDeferred.promise,
                                refresh () {
                                    refreshDefered = $q.defer();
                                    readyDeferred.promise.then(gee => {
                                        gee.refresh();
                                    });
                                    return refreshDefered.promise;
                                },
                            };
                        };

                        self.uniqueId = function () {
                            return _uniqueId++;
                        };

                        self.arrayUnique = function (arr) {
                            if (arr.length === 0) {
                                return arr;
                            }
                            arr.sort();
                            const re = [arr[0]];
                            for (let i = 1; i < arr.length; i++) {
                                if (arr[i] !== re[re.length - 1]) {
                                    re.push(arr[i]);
                                }
                            }
                            return re;
                        };

                        self.getPointType = function (type) {
                            if (type === 'Game') {
                                return '游戏';
                            }
                            if (type === 'Genre') {
                                return '类型';
                            }
                            if (type === 'Manufacturer') {
                                return '厂商';
                            }
                            if (type === 'Platform') {
                                return '平台';
                            }
                        };

                        self.getPointFirstName = function (point) {
                            return point[`${point.PreferredName}Name`];
                        };

                        self.getPointSecondName = function (point) {
                            if (point.PreferredName === 'Chinese')
                                return point.EnglishName;
                            else if (point.PreferredName === 'English')
                                return point.ChineseName;
                        };

                        self.addRecentBroswe = function (type, name, idCode) {
                            if (!union.$localStorage.recentBrowse) {
                                union.$localStorage.recentBrowse = [];
                            }
                            let inHistoryIndex = -1;
                            for (const i in union.$localStorage.recentBrowse) {
                                if (union.$localStorage.recentBrowse[i].type === type) {
                                    if (union.$localStorage.recentBrowse[i].idCode === idCode) {
                                        inHistoryIndex = i;
                                    }
                                }
                            }
                            if (inHistoryIndex !== -1) {
                                union.$localStorage.recentBrowse.splice(inHistoryIndex, 1);
                            }
                            union.$localStorage.recentBrowse.unshift({
                                type,
                                idCode,
                                name,
                            });
                            while (union.$localStorage.recentBrowse.length > 5) {
                                union.$localStorage.recentBrowse.pop();
                            }
                        };

                        self.modelValidate = {
                            steamBindingTokenId(str, errorObj, modelName) {
                                if (!str) {
                                    errorObj[modelName] = 'SteamBindingTokenId cannot be empty.';
                                    return false;
                                }
                                return true;
                            },
                            idCode (str, errorObj, modelName) {
                                if (!/^[A-Z0-9]{5}$/.test(str)) {
                                    errorObj[modelName] = 'Only 5 uppercase letters and digits are allowed in IdCode.';
                                    return false;
                                }
                                return true;
                            },
                            username (str, errorObj, modelName) {
                                const usernameLength = self.byteLength(str);
                                if (usernameLength < 3 || usernameLength > 16) {
                                    errorObj[modelName] = 'UserName should be 3-16 bytes.';
                                    return false;
                                }
                                if (!/^[0-9A-Za-z\u4E00-\u9FCC]+$/.test(str)) {
                                    errorObj[modelName] = 'Only digits, letters and Chinese characters are allowed in UserName.';
                                    return false;
                                }
                                return true;
                            },
                            password (str, errorObj, modelName) {
                                if (str.length < 6) {
                                    errorObj[modelName] = 'Passwords must be at least 6 characters.';
                                    return false;
                                }
                                return true;
                            },
                            gamerTag (str, errorObj, modelName) {
                                if (self.byteLength(str) > 40) {
                                    errorObj[modelName] = 'GamerTag should not be longer than 40 bytes.';
                                    return false;
                                }
                                return true;
                            },
                        };

                        self.modelErrorDetect = {
                            steamBindingTokenId (message) {
                                if (/cannot be empty/.test(message))
                                    return 'empty';
                                return 'unknown';
                            },
                            idCode (message) {
                                if (/Only.*allowed/.test(message))
                                    return 'format';
                                else if (/already used/.test(message))
                                    return 'used';
                                return 'unknown';
                            },
                            username (message) {
                                if (/should.*bytes/.test(message))
                                    return 'length';
                                else if (/Only.*allowed/.test(message))
                                    return 'format';
                                else if (/already.*used/.test(message))
                                    return 'used';
                                return 'unknown';
                            },
                            password (message) {
                                if (/least.*characters/.test(message))
                                    return 'length';
                                else if (/not correct/.test(message))
                                    return 'incorrect';
                                else if (/cannot be empty/.test(message))
                                    return 'empty';
                                return 'unknown';
                            },
                            email (message) {
                                if (/already taken/.test(message))
                                    return 'used';
                                else if (/is invalid/.test(message))
                                    return 'malformed';
                                else if (/cannot be empty/.test(message))
                                    return 'empty';
                                else if (/doesn't exist/.test(message))
                                    return 'inexistent';
                                else if (/locked out/.test(message))
                                    return 'lockedout';
                                else if (/Login failed/.test(message))
                                    return 'failed';
                                return 'unknown';
                            },
                            gamerTag (message) {
                                if (/not be longer than/.test(message))
                                    return 'length';
                                return 'unknown';
                            },
                        };

                        self.escapeHtml = function (unsafe) {
                            return unsafe
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;')
                                .replace(/'/g, '&#039;');
                        };

                        self.timelineLoadCount = 20;

                        self.timelineShowDelay = 150;

                        self.firefoxLinkFix = function (event) {
                            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                                const newWindow = window.open($(event.currentTarget).attr('href'), 'newwindow', 'width=300, height=250');
                                newWindow.close();
                                event.preventDefault();
                            }
                        };

                        self.getVoteColor = function (i) {
                            return ['terrible', 'bad', 'not-bad', 'good', 'awesome'][i];
                        };

                        self.getSteamId64 = function (steamId3) {
                            const matches = steamId3.match(/^\[([a-zA-Z]):([0-5]):([0-9]+)(:[0-9]+)?\]$/);
                            if (matches[3]) {
                                return `76561${197960265728 + parseInt(matches[3])}`;
                            }
                            return false;
                        };
                    }

                    return new Utils();
                },
            ],
        };
    });
}());
