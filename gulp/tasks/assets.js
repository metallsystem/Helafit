import {
  dest,
  parallel,
  src,
  watch,
} from 'gulp';
import config from '../config';

const fontsBuild = () => (
  src(`${config.src.fonts}/**/*`)
    .pipe(dest(config.dest.fonts))
);

export const assetsBuild = parallel(fontsBuild);

export const assetsWatch = () => {
  watch(`${config.src.fonts}/**/*`, fontsBuild);
};
