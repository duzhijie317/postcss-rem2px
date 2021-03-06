# postcss-rem2px
postcss rem2px rem2rem

## Options
```
  transformType: 'rem',  // rem transform dest type : 'px' | 'rem' (default: 'rem')
  rate: 1,               // transform rem rate, eg: srcRootFontSize/destRootSize
  rootFontSize: 100,     // root fontsize value (default: 100)
  forbidComment: 'no',   // no transform value comment (default: `no`)
  precision: 4,          // transformed px or rem precision
  remLimit: 0            // no transform rem limit（default: 0）

```

## Computed
```
rem2px: regexpRemValue * rootFontSize 

rem2rem: regexpRemValue * rate
```

## Usage

### Node

```
var postcss = require('postcss');
var rem2px = require('postcss-rem2px');
var originCssText = '...';
var newCssText = postcss().use(rem2px({...options})).process(originCssText).css;
```

### Gulp

```
npm install gulp-postcss
```

```
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rem2px = require('postcss-rem2px');

gulp.task('default', function() {
  var processors = [rem2px({...options})];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
```

### Webpack

```
npm install postcss-loader
```

```
postcss.config.js
```

```
module.exports = {
    plugins: [
        require('postcss-rem2px')({
            ...options
        }),
    ],
};
```

### Grunt

```
npm install grunt-postcss
```

```
module.exports = function(grunt) {
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          rem2px({...options})
        ]
      },
      dist: {
        src: 'src/*.css',
        dest: 'build'
      }
    }
  });
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['postcss']);
}
```
