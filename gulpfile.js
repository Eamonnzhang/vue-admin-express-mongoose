var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var shell = require('gulp-shell')
// var webpack = require("webpack")
// var webpackConfig = require("./build/webpack.config")
gulp.task('webpack', shell.task([
  'npm run build',
]))

gulp.task('develop',function(){
    nodemon({
        script:'./bin/www',
        tasks: ['webpack']
    }).on('restart',function(){
        console.log('app restart')
    })
})

