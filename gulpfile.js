const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass');
const minifyCSS = require("gulp-minify-css");
const connect = require('gulp-connect');
//编译所有后缀是.sass  .scss文件,转换成.css
gulp.task('sassAll',function () {
	return gulp.src('sass/*.{sass,scss}')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(gulp.dest('css'))
		.pipe(connect.reload())  //更新后刷新服务器
})
//压缩JS
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
//js代码处理
// gulp.task("scripts", function(){
// 	return gulp.src(["*.js", "!gulpfile.js"])
// 		.pipe(gulp.dest("dist/js"))
// 		.pipe(connect.reload());
// })

gulp.task('ysJS', function () {
	return gulp.src('sass/js/*.js')
		// .pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(connect.reload())  //更新后刷新服务器
});
//压缩html
const htmlmin = require('gulp-htmlmin');
gulp.task('minify', () => {
	return gulp.src('sass/html/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload())
});

//设置监听
gulp.task('runAll',function () {
	gulp.watch('./sass/*.scss',gulp.series('sassAll'))
	gulp.watch('./sass/js/*.js',gulp.series('ysJS'))
	gulp.watch('./sass/html/*.html',gulp.series('minify'))
})

//设置自动更新的静态服务器

gulp.task("server", function(){
	console.log('服务器启动成功')
	connect.server({
		root: "./",
		port: 808,
		livereload: true
	})
})

//设置默认任务
gulp.task("default",gulp.parallel("runAll", 'server'));

