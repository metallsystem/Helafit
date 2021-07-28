const srcPath = 'src';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    html: `${srcPath}/html`,
    images: `${srcPath}/images`,
    fonts: `${srcPath}/fonts`,
    iconsMono: `${srcPath}/iconsToSprite/mono-icons`,
    iconsMulti: `${srcPath}/iconsToSprite/multi-icons`,
  },

  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    images: `${destPath}/images`,
    fonts: `${destPath}/fonts`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
