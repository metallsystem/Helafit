import { dest, src, watch } from "gulp";
import sass from "gulp-sass";
import plumber from "gulp-plumber";
import autoprefixer from "gulp-autoprefixer";
import gcmq from "gulp-group-css-media-queries";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import sassGlob from "gulp-sass-glob";
import gulpIf from "gulp-if";
import config from "../config";

export const sassBuild = () =>
  src(`${config.src.sass}/main.scss`, { sourcemaps: config.isDev })
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(gulpIf(config.isProd, cleanCSS({ level: 2 })))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest(config.dest.css, { sourcemaps: config.isDev }));

export const sassWatch = () => watch(`${config.src.sass}/**/*.scss`, sassBuild);
