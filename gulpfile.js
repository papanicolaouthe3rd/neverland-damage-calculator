const gulp = require('gulp');
const { src, dest, series, parallel, watch } = gulp;

const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { compile } = require('sass');

const files = {
    js:     ['src/js/**/*.js'],
    css:    ['src/css/**/*.css', 'src/css/**/*.sass', 'src/css/**/*.scss'],
    html:   ['src/**/*.html']
}

function updateBrowserOnChange() {
    browserSync.init({
        server: { baseDir: "./dist", port: 3000 },
        ui: { port: 3001 },
    });
    browserSync.watch("./dist/**/*").on('change', browserSync.reload)
}

function copyHtml() {
    return src(files.html)
        .pipe(dest('dist'));
}

function copyCss() {
    return gulp.src(files.css)
        .pipe(plumber())
        .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sass())
            .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'));
};

function moveGeneralDependencies() {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(gulp.dest('dist/css'));
}


function copyJs() {
    return src([
            ...files.js,
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [
              resolve(),
              commonjs(),
              babel({
                presets: ['@babel/preset-env'],
                babelrc: false
              })
            ]
          }, 'iife'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'));
}

function watchFiles() {
    watch(files.html, copyHtml);
    watch(files.css, copyCss);
    watch(files.js, copyJs);
}

exports.default = series(
  parallel(moveGeneralDependencies, copyHtml, copyCss, copyJs),
  parallel(watchFiles, updateBrowserOnChange)
);
