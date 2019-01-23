'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

// live reload
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    });
});

// Clean Build
gulp.task('del', function(){
    return del.sync('build');
});

// html
gulp.task('html', function(){
    return gulp.src('src/pug/pages/**/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(pug())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

// css
gulp.task('css', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

// js
gulp.task('js', function(){
    return gulp.src('src/js/*.js')
  		.pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});

// image
gulp.task('img', function(){
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*{ttf,woff,woff2,svg,eot}')
        .pipe(gulp.dest('build/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('src/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
    return spriteData.pipe(gulp.dest('src/img'));
  });

// Watch
gulp.task('watch', function () {
    gulp.watch('src/pug/**/**/*.pug', ['html']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
});

// default
gulp.task('default', [ 'del', 'html', 'css', 'js', 'sprite', 'img', 'fonts', 'browser-sync', 'watch' ]);