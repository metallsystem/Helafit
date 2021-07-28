import { dest, watch } from 'gulp';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import config from '../config';

export const scriptsBuild = () => (
  browserify(`${config.src.js}/main.js`, { debug: true })
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .on('error', function browserifyError(error) {
      // eslint-disable-next-line no-console
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpIf(config.isDev, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpIf(config.isPod, uglify()))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulpIf(config.isDev, sourcemaps.write()))
    .pipe(dest(config.dest.js))
);

export const scriptsWatch = () => watch(`${config.src.js}/**/*.js`, scriptsBuild);
