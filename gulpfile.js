var yargs = require('yargs').argv;
var combiner = require('stream-combiner2');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require("browser-sync").create();
var del = require('del');

/* clean dist */
gulp.task('clean:dist', function (cb) {
  return del([
    // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    'dist/**/*'
  ], cb);
});

/* 监听JS文件 */

// 处理完JS文件后返回流
gulp.task('js', function () {
	var combined = combiner.obj([
    gulp.src('js/**/*js'),
    uglify(),
    gulp.dest('dist/js')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-watch',['js'],browserSync.reload);

/* 监听CSS文件 */

// 处理完CSS文件后返回流
gulp.task('css', function () {
	var combined = combiner.obj([
    gulp.src('css/**/*.?(css|map)'),
    gulp.dest('dist/css')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保CSS任务完成之前能够继续响应
// 浏览器重载
gulp.task('css-watch',['css'],browserSync.reload);

/* 监听Images文件 */

// 处理完Images文件后返回流
gulp.task('images', function () {
	var combined = combiner.obj([
    gulp.src('images/**/*.?(png|jpg|gif)'),
    gulp.dest('dist/images')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保Images任务完成之前能够继续响应
// 浏览器重载
gulp.task('images-watch',['images'],browserSync.reload);

/* 监听fonts文件 */

// 处理完fonts文件后返回流
gulp.task('fonts', function () {
	var combined = combiner.obj([
    gulp.src('fonts/**/*'),
    gulp.dest('dist/fonts')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保fonts任务完成之前能够继续响应
// 浏览器重载
gulp.task('fonts-watch',['fonts'],browserSync.reload);

/* 监听font文件 */

// 处理完font文件后返回流
gulp.task('font', function () {
	var combined = combiner.obj([
    gulp.src('font/**/*'),
    gulp.dest('dist/font')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保font任务完成之前能够继续响应
// 浏览器重载
gulp.task('font-watch',['font'],browserSync.reload);

/* 监听icon文件 */

// 处理完icon文件后返回流
gulp.task('icon', function () {
	var combined = combiner.obj([
    gulp.src('icon/**/*'),
    gulp.dest('dist/icon')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保icon任务完成之前能够继续响应
// 浏览器重载
gulp.task('icon-watch',['icon'],browserSync.reload);

/* 监听特殊UI文件 */

// 处理完ui文件后返回流
gulp.task('ui', function () {
	var combined = combiner.obj([
    gulp.src('ui/**/*'),
    gulp.dest('dist')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保ui任务完成之前能够继续响应
// 浏览器重载
gulp.task('ui-watch',['ui'],browserSync.reload);

/* 监听html文件 */

// 处理完html文件后返回流
gulp.task('html', function () {
	var combined = combiner.obj([
    gulp.src('html/**/*.?(html|htm)'),
    gulp.dest('dist')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

// 创建一个任务确保html任务完成之前能够继续响应
// 浏览器重载
gulp.task('html-watch',['html'],browserSync.reload);

// 使用默认任务启动Browersync,监听JS文件
gulp.task('serve', ['js','css','images','fonts','font','icon','html','ui'], function () {

    // 从这个项目的根目录启动服务器
    yargs.p = yargs.p || 9090;
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: yargs.p
    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    gulp.watch("js/**/*.js", ['js-watch']);
	gulp.watch("css/**/*.?(css|map)", ['css-watch']);
	gulp.watch("images/**/*.?(png|jpg|gif)", ['images-watch']);
	gulp.watch("fonts/**/*", ['fonts-watch']);
	gulp.watch("font/**/*", ['font-watch']);
	gulp.watch("icon/**/*", ['icon-watch']);
	gulp.watch("ui/**/*", ['ui-watch']);
	gulp.watch("html/**/*.?(html|htm)", ['html-watch']);
});

// 使用默认任务
gulp.task('default',['clean:dist'], function () {
    gulp.start('serve');
});