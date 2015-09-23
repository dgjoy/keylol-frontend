var gulp = require("gulp");
var template = require("gulp-template");
var _ = require("lodash");
var rename = require("gulp-rename");
var glob = require("glob");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rev = require("gulp-rev");
var del = require("del");
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');

// apiEndpoint must have the trailing slash
var environmentConfig = {
    dev: {
        apiEndpoint: "https://localhost:44300/"
    },
    prod: {
        apiEndpoint: "https://testflight-api.keylol.com/",
        cdnBase: "https://keylol-static.b0.upaiyun.com/"
    }
};

var vendorScripts = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/signalr/jquery.signalR.js",
    "bower_components/moment/moment.js",
    "bower_components/moment/locale/zh-cn.js",
    "bower_components/angular/angular.js",
    "bower_components/angular/i18n/zh.js",
    "bower_components/angular-route/angular-route.js",
    "bower_components/angular-http-batcher/dist/angular-http-batch.js",
    "bower_components/angular-moment/angular-moment.js",
    "bower_components/ngstorage/ngStorage.js"
];

var appSrcipts = [
    "keylol-app.js",
    "environment-config.js",
    "root-controller.js",
    "components/editor/quill.js",
    "components/editor/**/*.js",
    "components/**/*.js"
];

var stylesheets = [
    "assets/stylesheets/normalize.css",
    "components/editor/quill.snow.css",
    "assets/stylesheets/common.css",
    "assets/stylesheets/window.css",
    "assets/stylesheets/article.css",
    "components/**/*.css"
];

var htmlminOptions = {
    collapseWhitespace: true,
    conservativeCollapse: true,
    preserveLineBreaks: true,
    preventAttributesEscaping: true,
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true,
    removeIgnored: true
};

var getFiles = function (arr) {
    return _.union.apply(this, _.map(arr, function (path) {
        return glob.sync(path, {cwd: "app"});
    }));
};

var getBundleFilePaths = function () {
    return {
        scripts: getFiles(["bundles/vendor-*.min.js", "bundles/app-*.min.js", "bundles/templates-*.min.js"]),
        stylesheets: getFiles(["bundles/stylesheets-*.min.css"])
    };
};

gulp.task("clean", function () {
    return del(["app/bundles/!(web.config)", "index.html", "environment-config.js"]);
});

gulp.task("compile-environment-config", ["clean"], function () {
    return gulp.src("app/environment-config.js.ejs")
        .pipe(template(environmentConfig.dev))
        .pipe(rename("environment-config.js"))
        .pipe(gulp.dest("app"));
});

gulp.task("compile-environment-config:prod", ["clean"], function () {
    return gulp.src("app/environment-config.js.ejs")
        .pipe(template(environmentConfig.prod))
        .pipe(rename("environment-config.js"))
        .pipe(gulp.dest("app"));
});

gulp.task("vendor-script-bundle", ["clean"], function () {
    return gulp.src(vendorScripts, {cwd: "app"})
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("app-script-bundle", ["clean", "compile-environment-config:prod"], function () {
    return gulp.src(appSrcipts, {cwd: "app"})
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("template-bundle", ["clean"], function () {
    return gulp.src("app/components/**/*.html")
        .pipe(htmlmin(htmlminOptions))
        .pipe(templateCache("templates.min.js", {
            root: "components/",
            module: "KeylolApp"
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("stylesheet-bundle", ["clean"], function () {
    return gulp.src(stylesheets, {cwd: "app"})
        .pipe(autoprefixer())
        .pipe(minifyCss({
            keepSpecialComments: 0,
            relativeTo: "app/bundles",
            target: "app/bundles"
        }))
        .pipe(concat("stylesheets.min.css"))
        .pipe(rev())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("compile-index", ["compile-environment-config"], function () {
    var scriptPaths = getFiles(vendorScripts.concat(appSrcipts));
    var stylesheetPaths = getFiles(stylesheets);
    return gulp.src("app/index.html.ejs")
        .pipe(template({
            scripts: scriptPaths,
            stylesheets: stylesheetPaths
        }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("app"));
});

gulp.task("compile-index:prod", ["vendor-script-bundle", "app-script-bundle", "template-bundle", "stylesheet-bundle"], function () {
    var files = getBundleFilePaths();
    return gulp.src("app/index.html.ejs")
        .pipe(template({
            scripts: files.scripts,
            stylesheets: files.stylesheets
        }))
        .pipe(rename("index.html"))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest("app"));
});

gulp.task("compile-index:prod:cdn", ["vendor-script-bundle", "app-script-bundle", "template-bundle", "stylesheet-bundle"], function () {
    var files = getBundleFilePaths();
    var mapCdnPath = function (path) {
        return environmentConfig.prod.cdnBase + path;
    };
    return gulp.src("app/index.html.ejs")
        .pipe(template({
            scripts: _.map(files.scripts, mapCdnPath),
            stylesheets: _.map(files.stylesheets, mapCdnPath)
        }))
        .pipe(rename("index.html"))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest("app"));
});

gulp.task("prod", ["compile-index:prod"]);

gulp.task("prod:cdn", ["compile-index:prod:cdn"]);

gulp.task("default", ["compile-index"]);