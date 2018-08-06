/* Gulpfile.js */
let gulp = require('gulp');
let webserver = require('gulp-webserver');
let path = require('path');
let sass = require('gulp-sass');



//Copy html file to dist
gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
});

gulp.task('img', () => {
    return gulp.src('src/img/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('dist/img/'))
  })

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
      .pipe(gulp.dest('dist/js/'))
  })


/* Styles task */
gulp.task('styles', () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: [
                path.join(__dirname, 'node_modules/bootstrap/scss'),
                path.join(__dirname, 'src/scss')]
            , outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('server', () => {
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
});

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['styles'],cb => cb);
    gulp.watch('src/js/**/*.js', ['js'],cb => cb);
    gulp.watch('src/**/*.html', ['html'],cb => cb);

});

  gulp.task('start', [
    'html', 
    'js', 
    'styles', 
    'server',    
    'watch'
], cb => cb);



