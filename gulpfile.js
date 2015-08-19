var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ghpages = require('gulp-gh-pages'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin');

gulp.task('browser-sync', function() {
    browserSync.init(["app/**", 'app/**','app/**'], {
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('sass', function () {
    gulp.src('app/assets/sass/**/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('app/assets/css'));
});

var files = ['app/main.css',
            'app/countries-list/*',
            'app/country-detail/*',
            'app/home/*',
            'app/bower_components/angular/angular.js',
            'app/utilities/calendar-range/calendarRange.js',
            'app/*.html',
            'app/*.js'
            ];

gulp.task('build', function() {
    return gulp.src(files,{base:'./app'})
    .pipe(gulp.dest('./build'));
});

gulp.task('deploy', ['build'],function() {
    return gulp.src('./build/**/*').pipe(ghpages());
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("app/assets/sass/*/*.scss", ['sass']);
});