var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ghpages = require('gulp-gh-pages'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    del = require('del'),
    ngmin = require('gulp-ngmin'),
    inject = require('gulp-inject'),
    runSequence = require('run-sequence');

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
            'app/assets/production/production.min.js',
            'app/bower_components/angular-chart.js/dist/angular-chart.css',
            'app/index.html',
            'app/**/*.html'
            ];

var jsFiles = [
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-route/angular-route.js',
    "app/bower_components/Chart.js/Chart.min.js",
    'app/bower_components/angular-chart.js/dist/angular-chart.js',
    'app/app.js',
    'app/components/candidate/candidate.js',
    'app/components/home/home.js',
    'app/common/services/candidates.js'
];

gulp.task('minifyJs', function () {
    return gulp.src(jsFiles) //select all javascript files under js/ and any subdirectory
        .pipe(concat('production.min.js')) //the name of the resulting file
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/production')) //the destination folder
        .pipe(notify({ message: 'Finished minifying JavaScript'}));
});

gulp.task('jsInject', function () {
    return gulp.src('./build/index.html')
      .pipe(inject(gulp.src('assets/production/production.min.js', {read: false, cwd:"./build/"}), {relative: true, addRootSlash:false}))
      .pipe(gulp.dest('./build'));
});

gulp.task('clean', function (cb) {
  del([
    'build/**'
  ], cb);
});

gulp.task('build',['clean'], function() {
    return gulp.src(files,{base:'./app'})
    .pipe(gulp.dest('./build'));
});

gulp.task('sequence', function(callback) {
  runSequence('minifyJs',
              'build',
              'jsInject',
              callback);
});

gulp.task('deploy', ['sequence'],function() {
    return gulp.src('./build/**/*').pipe(ghpages());
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("app/assets/sass/*/*.scss", ['sass']);
});