var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')({ camelize: true });
var cleanCSS    = require('gulp-clean-css');
var uglify = require('gulp-uglify-es').default;

var paths = {
    root_path: './',
    bower: './bower_components',
    assets: './assets/',
    tpl: {
        watch: [
            './*.php',
            './**/*.html',
        ]
    },
    sass: {
        watch: [
            './assets/css/scss/**/*.scss'
        ],
        src: [
            './assets/css/scss/style.scss'
        ],
        dist: './assets/css/'
    },
    css: {
        watch: [
            './assets/css/*.css'
        ],
        src: [
            './assets/css/vendor/*.css',
            './assets/css/*.css',
        ],
        dist: './assets/css/dist/'
    },
    js: {
        check: [
            './assets/js/*.js'
        ],
        src: [
            './assets/js/vendor/popper.min.js',
            './assets/js/vendor/bootstrap.min.js',
            './assets/js/vendor/imagesloaded.pkgd.min.js',
            './assets/js/vendor/isotope.pkgd.min.js',
            './assets/js/vendor/masonry.pkgd.min.js',
            './assets/js/vendor/anijs-min.js',
            './assets/js/vendor/anijs-helper-scrollreveal-min.js',
            './assets/js/vendor/swiper.min.js',
            './assets/js/vendor/bootstrap-select.min.js',
            './assets/js/app.js',
        ],
        dist: './assets/js/dist/'
    }

};

gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(plugins.concat('style.scss'))
        .pipe(plugins.sass())
        .on('error', plugins.sass.logError)
        .pipe(gulp.dest(paths.sass.dist));
});

gulp.task('css', gulp.series('sass', function(){
    return gulp.src(paths.css.src)
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.autoprefixer({ overrideBrowserslist: [ 'last 2 versions', 'ff > 20', '> 1%', 'ie 9', 'ie 10']}))
        .pipe(cleanCSS({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(paths.css.dist))
        .on('end', function () {
            gulp.src(paths.sass.dist + '*.css', {read: false})
                .pipe(plugins.clean());
        });
}));

gulp.task('checkJS', function(){
    return gulp.src(paths.js.check)
        .pipe(plugins.plumber());
});

gulp.task('js', gulp.series('checkJS', function () {
    return gulp.src(paths.js.src)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dist))
}));

gulp.task('watch', function() {
    gulp.watch(paths.sass.watch, gulp.series('css'));
    gulp.watch(paths.js.src, gulp.series('js'));
});


gulp.task('default', gulp.series('css', 'js', 'watch'));
