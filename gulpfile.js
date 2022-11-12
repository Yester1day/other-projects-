const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const livereload = require('gulp-livereload')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify');


gulp.task('js-uglify', function () {
    return gulp.src('./index.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
})

gulp.task('sass-compile', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename('index.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
})

gulp.task('html-reload', function () {
    return gulp.src('./*.html')
        .pipe(livereload())
})

gulp.task('js-reload', function () {
    return gulp.src('./*.js')
        .pipe(livereload())
})

gulp.task('watch', function() {
    livereload.listen()
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'))
    gulp.watch('./*.html', gulp.series('html-reload'))
    gulp.watch('./*.js', gulp.series('js-reload'))
})