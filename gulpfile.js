/* Gulpfile.js */
let gulp = require('gulp');
let webserver = require('gulp-webserver');
let path = require('path');
let sass = require('gulp-sass');

let app_path='API_GOT';  
// let app='to_do_list';



//Copy html file to dist
gulp.task('html', () => {
    return gulp.src('src/'+app_path+'/**/*.html')
        .pipe(gulp.dest('dist/'+app_path+'/'))
});

gulp.task('img', () => {
    return gulp.src('src/'+app_path+'/img/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('dist/'+app_path+'/img/'))
  })

gulp.task('js', () => {
    return gulp.src('src/'+app_path+'/js/**/*.js')
      .pipe(gulp.dest('dist/'+app_path+'/js/'))
  })


/* Styles task */
gulp.task('styles', () => {
    return gulp.src('src/'+app_path+'/scss/main.scss')
        .pipe(sass({includePaths: [
                path.join(__dirname, 'node_modules/bootstrap/scss'),
                path.join(__dirname, 'src/'+app_path+'/scss')]
            , outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/'+app_path+'/css/'))
})

gulp.task('server', () => {
    gulp.src('dist/'+app_path+'/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
});

gulp.task('watch', () => {
    gulp.watch('src/'+app_path+'/scss/**/*.scss', ['styles'],cb => cb);
    gulp.watch('src/'+app_path+'/js/**/*.js', ['js'],cb => cb);
    gulp.watch('src/'+app_path+'/**/*.html', ['html'],cb => cb);

});

  gulp.task('start', [
    'html', 
    'js', 
    'styles', 
    'server',    
    'watch'
], cb => cb);



