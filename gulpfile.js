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
var lint = require('gulp-eslint');

var config = {
    port: 8000,
    devBaseUrl: 'http://localhost',
    path: {
        html   : 'src/*.html',
        js     : 'src/**/*.js',
        css    : [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
        ],
        images : 'src/images/*',
        dist   : 'dist/',
        mainJs : 'src/main.js'
    }
};

gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true,
    });
});

gulp.task('reload', function(){
    gulp.src(config.path.html)
        .pipe(connect.reload());
});

gulp.task('open',  function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('minify-html', function(){
    gulp.src(config.path.html)
        .pipe(htmlmin({removeComments: true,collapseWhitespace: true}))
        .pipe(gulp.dest(config.path.dist))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src(config.path.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.path.dist + 'css/'));
});

gulp.task('js', function(){
    browserify(config.path.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.path.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('lint', function(){
    return gulp.src(config.path.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function(){
    gulp.watch(config.path.html, ['minify-html']);
    gulp.watch(config.path.js, ['js', 'lint']);
});

gulp.task('default', ['connect', 'minify-html', 'js', 'css', 'watch', 'open']);