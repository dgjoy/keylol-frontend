(function () {
    "use strict";

    keylolApp.filter("avatarUrl", function () {
        return function (input, size) {
            var sizeSuffix;
            if (input.indexOf("steam://avatars/") === 0) {
                var hash = input.substring(16);
                switch (size) {
                    case "big":
                        sizeSuffix = "big";
                        break;

                    case "small":
                        sizeSuffix = "small";
                        break;

                    default:
                        sizeSuffix = "medium";
                        break;
                }
                return "//keylol-steam-cdn.b0.upaiyun.com/steamcommunity/public/images/avatars/" + hash.substring(0, 2) + "/" + hash + "_full.jpg!" + sizeSuffix;
            } else if (input.indexOf("keylol://avatars/") === 0) {
                var path = input.substring(17);
                switch (size) {
                    case "big":
                        sizeSuffix = "avatar.big";
                        break;

                    case "small":
                        sizeSuffix = "avatar.small";
                        break;

                    default:
                        sizeSuffix = "avatar.medium";
                        break;
                }
                return "//keylol.b0.upaiyun.com/" + path + "!" + sizeSuffix;
            }
            return input;
        };
    });
})();