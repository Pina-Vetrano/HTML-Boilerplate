const gulp = require("gulp")
const uglify = require("gulp-uglify")
const sass = require("gulp-dart-sass")

const browserSync = require('browser-sync').create()

const javascript = (done) => {

    gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe( gulp.dest('./dist/js/'))
        .pipe(browserSync.stream())

    done()
}

const styles = (done) => {

    gulp.src("./src/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe( gulp.dest('./dist/css/'))
        .pipe(browserSync.stream())

    done()
}

const html = (done) => {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'))

    done()
}

const browserSyncServer = (done) => {

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    done()
}

const reloadBrowser = () => {
    browserSync.reload()
}

const watchfiles = (done) => {

    gulp.watch('./src/*.html', gulp.series(html, reloadBrowser))
    gulp.watch('./src/js/*.js', javascript)
    gulp.watch('./src/scss/*.scss', styles)

    done()
}

exports.default = gulp.parallel(html, styles, javascript) 
exports.watch = gulp.parallel(browserSyncServer,
    gulp.series(gulp.parallel(html, styles, javascript), watchfiles)    
)