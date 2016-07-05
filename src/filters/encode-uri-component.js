(function () {
    keylolApp.filter('encodeURIComponent', $window => {
        return $window.encodeURIComponent;
    });
}());
