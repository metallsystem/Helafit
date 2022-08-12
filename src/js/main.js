import "focus-visible";
import 'element-closest-polyfill';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import popup from "./modules/popup";
import productCount from "./modules/shop-product-count";
import form from "./modules/form";
import BurgerMenu from "./modules/burgerMenu";
import documentReady from "./helpers/documentReady";

let burgerMenu

documentReady(

  popup(),

  form(),

  // eslint-disable-next-line no-unused-vars
  burgerMenu = new BurgerMenu('.menu', '.burger-menu'),

  productCount(),
);
