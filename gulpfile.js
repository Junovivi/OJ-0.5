var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var jade = require('gulp-pug');
var gutil = require('gulp-util');

var dest = './dest';

function errorHandler(title) {
    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
}

gulp.task('serve', ['lint', 'sass', 'scripts', 'jade', 'images','css'], function () {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: dest,
            index: "index.html"
        },
        port: 8080
    }, function () {
        //
    });
});

gulp.task('default', ['serve'], function () {
    gulp.watch(
        ['./apps/**/*.html',
            './apps/**/*.pug',
            './apps/**/*.ls',
            './apps/**/*.scss'
        ], ['serve', function () {
            browserSync.reload();
        }]);
});

gulp.task('watch',function(){
    gulp.watch('./src/**/*.*',['reload']);
});

gulp.task('clean',function(){
   gulp.src('')
       .pipe(gulp.dest(dest))
});

gulp.task('lint', function () {
    gulp.src(['./apps/**/*.js', '!./apps/**/*.min.js','!./apps/**/bootstrap.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    gulp.src('./apps/**/*.scss')
        .pipe(sass())//该任务调用的模块
        .pipe(gulp.dest(dest));//目的文件路径
});

gulp.task('css',function(){
   gulp.src('./apps/**/*.css')
       .pipe(gulp.dest(dest));
});

gulp.task('scripts', function () {
    gulp.src('./apps/**/*.js')
        .pipe(gulp.dest(dest));
});

gulp.task('jade', function () {
    gulp.src(['./apps/**/*.pug', '!./apps/template/**/*.*'])
        .pipe(jade({pretty: true}))
        .on('error', errorHandler('pug'))
        .pipe(gulp.dest(dest));
});

gulp.task('images', function () {
    gulp.src('./apps/images/**/*.*')
        .pipe(gulp.dest(dest + '/images'));
});

