import {
  dest,
  parallel,
  src,
  watch,
} from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import config from '../config';

const spriteMono = () => (
  src(`${config.src.iconsMono}/**/*.svg`)
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprites/sprite-mono',
        },
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
                  },
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(dest(config.dest.images))
);

const spriteMulti = () => (
  src(`${config.src.iconsMulti}/**/*.svg`)
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprites/sprite-multi',
        },
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name'],
                  },
                },
                {
                  removeUselessStrokeAndFill: false,
                },
                {
                  inlineStyles: true,
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(dest(config.dest.images))
);

export const spritesBuild = parallel(spriteMono, spriteMulti);

export const spritesWatch = () => {
  watch(`${config.src.iconsMono}/**/*.svg`, spriteMono);
  watch(`${config.src.iconsMulti}/**/*.svg`, spriteMulti);
};
