var gulp;
try {
    gulp = require("gulp");
} catch (e) {
    gulp = require("gulp-4.0.build");
}
var template = require("gulp-template");
var _ = require("lodash");
var rename = require("gulp-rename");
var glob = require("glob");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rev = require("gulp-rev");
var del = require("del");
var autoprefixer = require("gulp-autoprefixer");
var minifyInline = require("gulp-minify-inline");
var minifyCss = require("gulp-minify-css");
var templateCache = require("gulp-angular-templatecache");
var htmlmin = require("gulp-htmlmin");
var fontmin = require('gulp-fontmin');

// apiEndpoint must have the trailing slash
var buildConfigs = {
    local: {
        bundle: false,
        apiEndpoint: "https://localhost:44300/"
    },
    dev: {
        bundle: false,
        apiEndpoint: "https://gay-api.keylol.com/"
    },
    prod: {
        bundle: true,
        apiEndpoint: "https://api.keylol.com/"
    }
};

var vendorScripts = [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/ms-signalr-client/jquery.signalr-2.2.0.js",
    "node_modules/moment/moment.js",
    "node_modules/moment/locale/zh-cn.js",
    "node_modules/moment-timezone/builds/moment-timezone-with-data.js",
    "node_modules/angular/angular.js",
    "node_modules/angular-i18n/angular-locale_zh.js",
    "node_modules/angular-route/angular-route.js",
    "node_modules/angular-animate/angular-animate.js",
    "node_modules/angular-moment/angular-moment.js",
    "node_modules/ngstorage/ngStorage.js",
    "node_modules/ng-file-upload/dist/ng-file-upload.js",
    "node_modules/angular-utf8-base64/angular-utf8-base64.js",
    "node_modules/angulartics/src/angulartics.js",
    "node_modules/simditor/node_modules/simple-module/lib/module.js",
    "node_modules/simditor/node_modules/simple-hotkeys/lib/hotkeys.js",
    "node_modules/simditor/node_modules/simple-uploader/lib/uploader.js",
    "node_modules/simditor/lib/simditor.js"
];

var appSrcipts = [
    "keylol-app.js",
    "environment-config.js",
    "root-controller.js",
    "components/**/*.js"
];

var stylesheets = [
    "assets/stylesheets/normalize.css",
    "node_modules/simditor/styles/simditor.css",
    "assets/stylesheets/common.css",
    "assets/stylesheets/window.css",
    "assets/stylesheets/popup.css",
    "components/**/*.css"
];

var keylolTextList = "`{}>▾▴其乐推荐据点客务中心讯息轨道评测好评资讯差评模组感悟请无视游戏与艺术之间的空隙提交注册申请登入其乐发布文章由你筛选的游戏讯息轨道提交变更函注册其乐会员评研讯谈档邮政服务私信蒸汽动力进社区噪音零死角讨论独特鼓励机制志同合琴瑟合曲即日内欲知情关联注意成功错误认可论索取表单开设此据点阅读搜结果传送装置已就位个人从兴趣始慢搭建一条收到出未能撞到处理中这位用户尚或任何当前投稿厂商类型平台剧透警告简完编辑确料定太瞎了获不态了跳过同步正在生首页并立案请稍候糕块里如也连蛋都没有";

var lisongTextList = "/评测好差模组资讯会员注册表单连接游戏平台昵称账户头像登录口令确认电子邮箱人机验证声明桌面类蒸汽第一称射击时空枪使命召唤侠盗猎车手橘子孢子上帝视角文明红色警戒模拟城市塔防即时策略折扣资讯原声控僵尸末日泰拉瑞亚独立游戏用户识别码玩家标签个人据点横幅会员信息变更函提示守则平台账户分享社区动态当前确认新登录口令保护邮件订阅简讯通知等待添加成为好友收到验证码绑定成功平台连接向导邀请内列中名英章数读者操作开设型唯商店链背景图关联偏（能暂未放）输入残缺不堪的料完索引介绍补充善于期发行厂流派特性系次要封大匹配题语言抓取同步周器";

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
        return glob.sync(path);
    }));
};

gulp.task("clean-font", function () {
    return del(["assets/fonts/keylol-rail-sung-subset-*", "assets/fonts/lisong-subset-*"]);
});

gulp.task("font-keylol", function () {
    return gulp.src("assets/fonts/keylol-rail-sung-full.ttf")
        .pipe(rename("keylol-rail-sung-subset.ttf"))
        .pipe(fontmin({
            text: keylolTextList
        }))
        .pipe(rev())
        .pipe(gulp.dest("assets/fonts"))
});

gulp.task("font-lisong", function () {
    return gulp.src("assets/fonts/lisong-full.ttf")
        .pipe(rename("lisong-subset.ttf"))
        .pipe(fontmin({
            text: lisongTextList
        }))
        .pipe(rev())
        .pipe(gulp.dest("assets/fonts"))
});

gulp.task("font", gulp.series("clean-font", "font-keylol", "font-lisong"));

gulp.task("clean", function () {
    return del(["bundles/!(web.config)", "index.html", "environment-config.js"]);
});

var getBuildTask = function (configName) {
    var config = buildConfigs[configName];
    return gulp.series("clean", function buildEnvironmentConfig() {
        return gulp.src("environment-config.js.ejs")
            .pipe(template(config))
            .pipe(rename("environment-config.js"))
            .pipe(gulp.dest("./"));
    }, config.bundle ? gulp.parallel(function buildVendorScriptBundle() {
        return gulp.src(vendorScripts)
            .pipe(concat("vendor.min.js"))
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest("bundles"));
    }, function buildAppScriptBundle() {
        return gulp.src(appSrcipts)
            .pipe(concat("app.min.js"))
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest("bundles"));
    }, function buildTemplateBundle() {
        return gulp.src("components/**/*.html")
            .pipe(minifyInline({
                css: {
                    keepSpecialComments: 0
                }
            }))
            .pipe(htmlmin(htmlminOptions))
            .pipe(templateCache("templates.min.js", {
                root: "components/",
                module: "KeylolApp"
            }))
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest("bundles"));
    }, function buildStylesheetBundle() {
        return gulp.src(stylesheets)
            .pipe(autoprefixer())
            .pipe(minifyCss({
                keepSpecialComments: 0,
                relativeTo: "bundles",
                target: "bundles"
            }))
            .pipe(concat("stylesheets.min.css"))
            .pipe(rev())
            .pipe(gulp.dest("bundles"));
    }) : function skipBundles(done) {
        done();
    }, function buildEntryPage() {
        var scriptFiles, stylesheetFiles;
        if (config.bundle) {
            scriptFiles = getFiles(["bundles/vendor-*.min.js", "bundles/app-*.min.js", "bundles/templates-*.min.js"]);
            stylesheetFiles = getFiles(["bundles/stylesheets-*.min.css"]);
        } else {
            scriptFiles = getFiles(vendorScripts.concat(appSrcipts));
            stylesheetFiles = getFiles(stylesheets);
        }
        var stream = gulp.src("index.html.ejs")
            .pipe(template({
                scripts: scriptFiles,
                stylesheets: stylesheetFiles,
                urlCanonical: config.urlCanonical
            }))
            .pipe(rename("index.html"));
        if (config.bundle) {
            stream = stream.pipe(minifyInline({
                    css: {
                        keepSpecialComments: 0
                    }
                }))
                .pipe(htmlmin(htmlminOptions));
        }
        return stream.pipe(gulp.dest("./"));
    });
};

gulp.task("prod", getBuildTask("prod"));

gulp.task("dev", getBuildTask("dev"));

gulp.task("local", getBuildTask("local"));

gulp.task("default", getBuildTask("dev"));
