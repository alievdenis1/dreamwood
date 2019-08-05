'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    pug = require('gulp-pug'),
    browserSync = require("browser-sync"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),    
    babelify = require('babelify'),
    sassGlob = require('gulp-sass-glob'),
    browserify = require("browserify");

    let path = {
        build: { //Тут мы укажем куда складывать готовые после сборки файлы
            html: 'dist/',
            js: 'dist/js/',
            css: 'dist/css/',
            img: 'dist/img/',
            fonts: 'dist/fonts/'
        },
        src: { //Пути откуда брать исходники
            pug: 'src/template/pages/**/*.pug',
            js: 'src/js/app.js',
            style: 'src/scss/main.scss',
            img: 'src/img/**/*.*', 
            fonts: 'src/fonts/**/*.*'
        },
        watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
            pug: 'src/template/**/*.pug',
            js: 'src/js/**/*.js',
            style: 'src/scss/**/*.scss',
            img: 'src/img/**/*.*', 
            fonts: 'src/fonts/**/*.*'
        },
        clean: './dist'
    };

    // настройки dev сервера
    let config = {
        server: {
            baseDir: "./dist"
        },
        tunnel: true,
        host: 'localhost',
        port: 3000,
        logPrefix: "Frontend_Devil"
    };

    // pug
    gulp.task('pug', function () {
        return gulp.src(path.src.pug)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.build.html))						
        .pipe(browserSync.reload({
            stream: true							
        }));   
    });

    //css
    gulp.task('sass', function () {
        return gulp.src(path.src.style)
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(prefixer({ browsers: ['last 15 versions'] }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({
            stream: true							
        }));    
    });
    
    //js    
    gulp.task('js', function () {
        //return gulp.src(path.src.js)
        return browserify({entries: path.src.js})
        .transform(babelify, {presets: ["env"]})
        .bundle()       
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({
            stream: true			
        }));    
    });

   


    //img
    gulp.task('img', function () {
        return gulp.src(path.src.img) //Выберем наши картинки
            .pipe(imagemin({ //Сожмем их
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(gulp.dest(path.build.img)) //И бросим в build
            .pipe(browserSync.reload({
                stream: true			
            }));  
    });

    
    //fonts
    gulp.task('fonts', function() {
        return gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts))
    });

    //watch
    gulp.task('watch', function(){
        gulp.watch([path.watch.pug], gulp.series('pug'));
        gulp.watch([path.watch.js], gulp.series('js'));
        gulp.watch([path.watch.style], gulp.series('sass'));
        gulp.watch([path.watch.img], gulp.series('img'));
        gulp.watch([path.watch.fonts], gulp.series('fonts'));
    });
    
    //browsrsync
    gulp.task('webserver', function () {
        browserSync(config);
    });

    //clean
    gulp.task('clean', function (cb) {
        return rimraf(path.clean, cb);
    });

    gulp.task('build', gulp.series( 
        'clean', 
        gulp.parallel( 
        'sass', 
        'pug', 
        'js',        
        'img',
        'fonts'
        )
));

    gulp.task('default', gulp.series(         
        'build', 
        gulp.parallel( 
        'webserver', 
        'watch',        
        )
    ));


