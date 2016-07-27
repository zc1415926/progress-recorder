/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var livereload = require('gulp-livereload');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var history = require('connect-history-api-fallback');

var config = {
    port: 8000,
    devBaseUrl: 'http://localhost',
    path: {
        html   : 'src/*.html',
        staticJs     : [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        js     : 'src/**/*.js',
        css    : [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'src/**/*.css'
        ],
        fonts  : 'node_modules/bootstrap/dist/fonts/*',
        images : 'src/images/*',
        serverRoot   : 'dist/',
        mainJs : 'src/main.js'
    }
};

gulp.task('connect', function(){
    connect.server({
        root: config.path.serverRoot,
        port: config.port,
        base: config.devBaseUrl,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                history({})
            ]
        }
    })
});

gulp.task('reload', function(){
    gulp.src(config.serverRoot.html)
        .pipe(connect.reload());
});

gulp.task('open',  function(){
    gulp.src(config.path.serverRoot + 'index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
    gulp.src(config.path.html)
        .pipe(htmlmin({removeComments: true,collapseWhitespace: true}))
        .pipe(gulp.dest(config.path.serverRoot))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src(config.path.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.path.serverRoot + 'css/'))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src(config.path.staticJs)
        .pipe(gulp.dest(config.path.serverRoot + 'scripts/'))

    browserify(config.path.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest(config.path.serverRoot + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('font', function(){
    gulp.src(config.path.fonts)
        .pipe(gulp.dest(config.path.serverRoot + 'fonts/'));
});

gulp.task('watch', function(){
    gulp.watch(config.path.html, ['html']);
    gulp.watch(config.path.css, ['css']);
    gulp.watch(config.path.js, ['js']);
});

gulp.task('default', ['connect', 'html', 'js', 'css', 'font', 'watch', 'open']);