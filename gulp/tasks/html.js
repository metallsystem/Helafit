import { dest, src, watch } from "gulp";
import fileinclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import gulpIf from "gulp-if";
import config from "../config";

export const htmlBuild = () =>
  src(`${config.src.html}/{ukr,rus}/*.html`)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(
      gulpIf(
        config.isProd,
        htmlmin({
          useShortDoctype: true,
          removeStyleLinkTypeAttributes: true,
          removeScriptTypeAttributes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeComments: true,
          removeAttributeQuotes: true,
          preventAttributesEscaping: true,
          collapseWhitespace: true,
        })
      )
    )
    .pipe(dest(config.dest.html));

export const htmlWatch = () => watch(`${config.src.html}/**/*.html`, htmlBuild);
