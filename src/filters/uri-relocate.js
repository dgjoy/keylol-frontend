(function () {
    keylolApp.filter('uriRelocate', [function () {
        function relocate (input, customVersion, fallback) {
            if (!input || typeof input !== 'string') {
                if (fallback)
                    return relocate(fallback, customVersion);
                return null;
            }

            if (input.indexOf('keylol://') !== 0)
                return input;

            let suffix, match;
            if (/\.svg|gif$/i.test(input)) {
                suffix = '';
            } else {
                suffix = customVersion ? `!${customVersion}/unsharp/true/quality/90` : '!/unsharp/true/quality/90';
            }
            if (match = input.match(/^keylol:\/\/([^\/]*)$/i))
                return `//storage.keylol.com/${match[1]}${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-backgrounds\/(\d+)$/i))
                return `//steamcdn.keylol.com/steam/apps/${match[1]}/page_bg_generated.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-backgrounds\/(\d+)-([^\/]*)$/i))
                return `//steamcdn.keylol.com/steam/apps/${match[1]}/ss_${match[2]}.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-headers\/([^\/]*)$/i))
                return `//steamcdn.keylol.com/steam/apps/${match[1]}/header.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-capsules\/([^\/]*)$/i))
                return `//steamcdn.keylol.com/steam/apps/${match[1]}/capsule_231x87.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-icons\/(\d+)-([^\/]*)$/i))
                return `//steamcdn.keylol.com/steamcommunity/public/images/apps/${match[1]}/${match[2]}.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-thumbnails\/(\d+)-([^\/]*)$/i))
                return `//steamcdn.keylol.com/steamcommunity/public/images/apps/${match[1]}/${match[2]}.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-screenshots\/(\d+)-([^\/]*)$/i))
                return `//steamcdn.keylol.com/steam/apps/${match[1]}/ss_${match[2]}.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/avatars\/([^\/]*)$/i))
                return `//steamcdn.keylol.com/steamcommunity/public/images/avatars/${match[1].substring(0, 2)}/${match[1]}_full.jpg${suffix}`;
            if (match = input.match(/^keylol:\/\/steam\/app-resources\/(.*)$/i))
                return `//steamcdn.keylol.com/steam/apps/${match[1]}${suffix}`;

            return null;
        }

        return relocate;
    }]);
}());
