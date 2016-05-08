(function () {
    class FooterController {
        constructor ($scope, $window) {}
    }

    keylolApp.component('footer', {
        templateUrl: 'src/sections/footer.html',
        controller: FooterController,
        controllerAs: 'footer',
    });
}());
