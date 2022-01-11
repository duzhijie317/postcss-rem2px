# postcss-rem2px
postcss rem2px rem2rem

## Options
```
  transformType: 'rem',   // rem transform dest type : 'px' | 'rem' (default: 'rem')
  sdw: 1920,        // src css design width (default: 1920)
  ddw: 1920,       // dest css design width (default: 1920)
  srfs: 100,  // src root fontsize value (default: 100)
  drfs: 100, // dest root fontsize value (default: 100)
  forbidComment: 'no',   // no transform value comment (default: `no`)
  precision: 4,          // transformed px or rem precision
  remLimit: 0            // no transform rem limit（default: 0）

```

## Computed
```
rem2px: regexpRemValue * srfs * (ddw / sdw)

rem2rem: regexpRemValue * srfs * (sdw / ddw) / drfs
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
var rem2px = require('postcss-rem2px');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function() {
    return [rem2px({...options})];
  }
}
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
