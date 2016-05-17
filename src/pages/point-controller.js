(function () {
    class PointController {
        constructor (pageHead, stateTree) {
            $.extend(this, {
                stateTree,
            });
            stateTree.pointTheme = {
                main: '#813221',
                light: '#a83f34',
            };
        }
    }

    keylolApp.controller('PointController', PointController);
}());
