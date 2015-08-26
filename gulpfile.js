var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ghpages = require('gulp-gh-pages'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
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

var files = ['app/assets/css/*.css',
            'app/assets/images/*.jpg',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-chart.js/dist/angular-chart.js',
            'app/bower_components/angular-chart.js/dist/angular-chart.css',
            "app/bower_components/Chart.js/Chart.min.js",
            'app/utilities/calendar-range/calendarRange.js',
            'app/**/*.html',
            'app/app.js',
            'app/index.html',
            'app/**/*.html',
            'app/components/candidate/candidate.js',
            'app/components/home/home.js',
            'app/common/services/candidates.js'
            ];

gulp.task('clean', function (cb) {
  del([
    'build/**'
  ], cb);
});

gulp.task('build', function() {
    return gulp.src(files,{base:'./app'})
    .pipe(gulp.dest('./build'));
});

gulp.task('deploy', ['clean','build'],function() {
    return gulp.src('./build/**/*').pipe(ghpages());
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("app/assets/sass/*/*.scss", ['sass']);
});