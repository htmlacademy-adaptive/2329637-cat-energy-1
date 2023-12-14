import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import jsmin from 'gulp-jsmin';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

// SCRIPTS

const javaScript = () => {
  return gulp.src('source/js/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'));
};

//IMAGES

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulp.dest('build/img'));
};

//WebP

const optimizeWebP = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'));
};

// SVG

const svg = () =>
  gulp.src(['source/img/**/*.svg', '!source/img/sprite/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));

const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/sprite'));
}

// COPY

const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

//CLEAN

const clean = () => {
  return del('build');
};

// SEVER

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// WATCHER

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
};

//BUILD

export const build = gulp.series(
  // clean,
  // copy,
  // optimizeImages,
  gulp.parallel(
    styles,
    html,
    // javaScript,
    // svg,
    // sprite,
    // optimizeWebP,
  ),
);

//DEFAULT

export default gulp.series(
  // clean,
  // copy,
  // copyImages,
  // gulp.parallel(
  //   styles,
  //   html,
  //   javaScript,
  //   svg,
  //   sprite,
  // ),
  gulp.series(
    server,
    watcher
  ));
