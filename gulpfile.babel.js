import { parallel, series } from 'gulp';
import clean from './gulp/tasks/clean';
import config from './gulp/config';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { htmlBuild, htmlWatch } from './gulp/tasks/html';
import server from './gulp/tasks/server';
import { sassBuild, sassWatch } from './gulp/tasks/style';
import { assetsBuild, assetsWatch } from './gulp/tasks/assets';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites';

config.setEnv();

export const build = series(
  clean,
  parallel(
    scriptsBuild,
    htmlBuild,
    sassBuild,
    assetsBuild,
    imagesBuild,
    spritesBuild,
  ),
);

export const watching = series(
  build,
  server,
  parallel(
    scriptsWatch,
    htmlWatch,
    sassWatch,
    assetsWatch,
    imagesWatch,
    spritesWatch,
  ),
);
