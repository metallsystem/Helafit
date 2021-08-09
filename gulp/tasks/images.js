import { dest, series, src, watch } from "gulp";
import changed from "gulp-changed";
import gulpIf from "gulp-if";
import imagemin from "gulp-imagemin";
// import rename from "gulp-rename";
import imageminPngquant from "imagemin-pngquant";
// import imageminWebp from "imagemin-webp";
import config from "../config";

const copyImages = () =>
  src(`${config.src.images}/**/*`)
    .pipe(changed(config.dest.images))
    .pipe(
      gulpIf(
        config.isProd,
        imagemin([
          imagemin.mozjpeg({ quality: 75 }),
          imageminPngquant({ quality: [0.75, 0.9] }),
          imagemin.svgo(),
        ])
      )
    )
    .pipe(dest(config.dest.images));

// const convertImagesToWebp = () =>
//   src(`${config.src.images}/**/*.{jpg,png}`)
//     .pipe(changed(config.dest.images, { extension: ".webp" }))
//     .pipe(imagemin([imageminWebp({ quality: 75 })]))
//     .pipe(
//       rename({
//         extname: ".webp",
//       })
//     )
//     .pipe(dest(config.dest.images));

export const imagesBuild = series(copyImages);

export const imagesWatch = () =>
  watch(`${config.src.images}/**/*`, imagesBuild);
