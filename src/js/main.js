import "focus-visible";
import 'element-closest-polyfill';
import popup from "./modules/popup";
import productCount from "./modules/shop-product-count";
import form from "./modules/form";
import BurgerMenu from "./modules/burgerMenu";
import documentReady from "./helpers/documentReady";

popup();

form();

const burgerMenu = new BurgerMenu('.menu', '.burger-menu');
window.burger = burgerMenu

productCount();

documentReady();
