var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task("styles", async function() {
  await gulp.src('src/styles/index.css')
  .pipe(autoprefixer())
  .pipe(gulp.dest('src/styles/build'))
});

gulp.task('watch', function() {
  gulp.watch('src/styles/index.css', ['styles'])
});
