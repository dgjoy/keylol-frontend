(function () {
    keylolApp.controller('NotFoundController', ($scope, pageHead, $window) => {
        pageHead.setTitle('404 Not Found - 其乐');
        pageHead.setDescription('你不小心来到了一片荒芜之地……');
        $scope.back = () => {
            $window.history.back();
        };
    });
}());
