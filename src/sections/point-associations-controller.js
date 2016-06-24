(function () {
    class PointAssociationsController {
        constructor (pointAttributes, utils) {
            $.extend(this, {
                pointAttributes,
                utils,
            });

            this.attributes = [];
            this.platforms = [];

            for (const attr in pointAttributes) {
                if (pointAttributes.hasOwnProperty(attr) && this.object[attr]) {
                    this.attributes.push(pointAttributes[attr]);
                }
            }

            if (this.object.platforms !== undefined) {
                for (let i = 0;i < this.object.platforms.length;i++) {
                    const platformIdCode = this.object.platforms[i];
                    const index = utils.idCodeOfPlatformPoints.indexOf(platformIdCode);
                    if (index > -1) {
                        this.platforms.push({
                            idCode: platformIdCode,
                            icon: utils.iconOfPlatformPoints[index],
                            name: utils.nameOfPlatformPoints[index],
                        });
                    }
                }
            }
        }

        showChineseSupport(event) {
            this.showChineseSupportPopup({
                templateUrl: 'src/popup/chinese-support.html',
                controller: 'ChineseSupportController as chineseSupport',
                event,
                attachSide: 'bottom',
                align: 'center',
                inputs: {
                    object: this.object.chineseAvailability,
                    options: {
                        theme: this.theme,
                    },
                },
            });
        }
    }

    keylolApp.component('pointAssociations', {
        templateUrl: 'src/sections/point-associations.html',
        controller: PointAssociationsController,
        controllerAs: 'pointAssociations',
        bindings: {
            theme: '<',
            object: '<',
        },
    });
}());
