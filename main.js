/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./src/styles/styles.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.scss */ \"./src/styles/styles.scss\");\n/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider.js */ \"./src/js/slider.js\");\n/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_slider_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_books_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/books.js */ \"./src/js/books.js\");\n/* harmony import */ var _js_books_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_books_js__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\nconsole.log('hello');\n\n//# sourceURL=webpack://bookshop/./src/index.js?");

/***/ }),

/***/ "./src/js/books.js":
/*!*************************!*\
  !*** ./src/js/books.js ***!
  \*************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function() {\r\n  let currentPage = 0;\r\n  let booksPerPage = 6;  \r\n  let cart = [];\r\n  let cartItemCount = 0;\r\n  \r\n  const cartCounter = document.querySelector('.navigation-icon__shop-functional-basket_number'); //элемент отображающий колличество товаров в корзине\r\n  \r\n  const categoryButtons = document.querySelectorAll('.categories-books__genre-btn'); // Обработка кликов на другие категории\r\n  const downloadBooks = document.querySelector('.books-button');\r\n  \r\n  if (categoryButtons.length > 0) {\r\n      const firstCategory = categoryButtons[0];\r\n      firstCategory.classList.add('active');\r\n      loadBooksForCategory(firstCategory.textContent.trim())\r\n  }\r\n\r\n  categoryButtons.forEach(button => {\r\n      button.addEventListener('click', function() {\r\n        categoryButtons.forEach(btn => btn.classList.remove('active')); // Удалить класс \"active\" у всех категорий\r\n        this.classList.add('active'); // Добавить класс \"active\" к выбранной категории\r\n        currentPage = 0; //Сброс текущей страницы при смене категории\r\n        // const selectedCategory = this.textContent.trim(); // Сделать запрос книг для выбранной категории\r\n        loadBooksForCategory(this.textContent.trim()); //Загрузить книги для выбранной категории\r\n      });\r\n  });\r\n\r\n  \r\n\r\n  if (downloadBooks) {\r\n    downloadBooks.addEventListener('click', function() {\r\n      currentPage++; //Увеличиваем страницу\r\n      const selectedCategory = document.querySelector('.categories-books__genre-btn.active').textContent.trim(); //Берем активную категорию\r\n      loadBooksForCategory(selectedCategory, true); //Загружаем слудующие книги, не очищая предыдущие\r\n    });\r\n  }\r\n\r\n\r\n\r\n  function loadBooksForCategory(category, append = false) {   // Функция для загрузки книг в зависимости от категории\r\n          const apiKey = 'AIzaSyAo2Kpeenx5LthtRq7rVfMsH9RNFPUMzGo';\r\n          const startIndex = currentPage * booksPerPage;\r\n          const URL = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}&startIndex=${startIndex}&maxResults=6`;  \r\n\r\n          fetch(URL)\r\n            .then(response => response.json())\r\n            .then(data => {\r\n              console.log('Загруженные книги:', data.items);\r\n              const books = data.items.map(book => ({\r\n                cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'плейсхолдер для обложки',\r\n                author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Неизвестный автор',\r\n                title: book.volumeInfo.title,\r\n                rating: book.volumeInfo.averageRating || null,\r\n                ratingsCount: book.volumeInfo.ratingsCount || null ,\r\n                description: book.volumeInfo.description,\r\n                price: book.saleInfo.retailPrice ? `${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}` : 'Цена не указана'\r\n              }));\r\n              displayBooks(books, append); //Передаем параметр append для управл поведение добавления книг\r\n            })\r\n            .catch(error => console.error('Ошибка при загрузке данных:', error));\r\n  }\r\n\r\nfunction displayBooks(books, append = false) {\r\n  const bookContainer = document.querySelector('.categories-books-card'); // Контейнер для карточек книг\r\n\r\n  if (!append) {\r\n      bookContainer.innerHTML = ''; // Очищаем контейнер, если append = false\r\n  }\r\n\r\n  books.forEach(book => {   //рейтинг\r\n    const rating = book.rating || null;\r\n    const ratingsCount = book.ratingsCount || null;\r\n    let starsHTML = '';\r\n\r\n    if (rating) {  \r\n      for (let i = 1; i <= 5; i++ ) {\r\n        if (i <= rating) {\r\n          starsHTML += `<span style=\"color: #F2C94C; font-size: 20px;\">★</span>`;\r\n        } else {\r\n          starsHTML += `<span style=\"color: lightgrey; font-size: 20px;\">★</span>`;\r\n        }\r\n      }\r\n    }\r\n      const bookHTML = `\r\n        <div class=\"book-card\">\r\n            <img class=\"book-card__cover\" src=\"${book.cover}\" alt=\"${book.title}\">\r\n            <div class=\"book-card-text\">\r\n              <p class=\"book-card-text__author\">${book.author}</p>\r\n              <h3 class=\"book-card-text__title\">${book.title}</h3>\r\n              ${rating ? `\r\n              <div class=\"book-card-text-rating\">\r\n                <div class=\"book-card-text__stars\">\r\n                  ${starsHTML}\r\n                </div>\r\n              ${ratingsCount ? `<p class=\"book-card-text__rating-count\">${book.ratingsCount}</p>` : \"\"}       \r\n            </div>\r\n            ` : ''}           \r\n              <p class=\"book-card-text__description\">${book.description}</p>\r\n              <p class=\"book-card-text__price\">${book.price}</p>\r\n              <button class=\"book-card-button_buy\">BUY NOW</button>\r\n            </div>\r\n        </div>`;\r\n      bookContainer.innerHTML += bookHTML;\r\n  });\r\n\r\n  const buyButtons = bookContainer.querySelectorAll('.book-card-button_buy'); //после добавления книг на страницу устанавливаем обработчик кнопи Buy Now\r\n    \r\n  buyButtons.forEach((button, index) => {\r\n\r\n        button.addEventListener('click', function() {\r\n\r\n          const selectedBook = books[index]; // выбираем соответсв книгу \r\n          handleBuyNowClick(button, selectedBook); // обрабатываем добавление в корзину\r\n\r\n        });\r\n    });\r\n  };\r\n\r\n  function saveLocalStorage(cart) {\r\n    localStorage.setItem('cart', JSON.stringify(cart));\r\n  }\r\n\r\n  function handleBuyNowClick(button, selectedBook) { //Логика для добавления книг в корзину\r\n    if (button.innerText === 'BUY NOW') {\r\n\r\n\r\n      if (!cart.includes(selectedBook)) { \r\n        cart.push(selectedBook);\r\n        cartItemCount++;\r\n        cartCounter.innerText = cartItemCount;\r\n      } \r\n      button.innerText = 'IN the CART';\r\n      saveLocalStorage(cart);\r\n      } else {\r\n        const bookIndex = cart.indexOf(selectedBook);\r\n        if (bookIndex > -1) {\r\n          cart.splice(bookIndex, 1);\r\n          cartItemCount--;\r\n          cartCounter.innerText = cartItemCount;\r\n          button.innerText = 'BUY NOW';\r\n          saveLocalStorage(cart);\r\n      }\r\n      console.log(\"Книга уже в корзине\");\r\n      }\r\n    }\r\n}); \r\n              \r\n  \r\n\n\n//# sourceURL=webpack://bookshop/./src/js/books.js?");

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

eval("const entities = [\r\n    {\r\n        img: \"./img/banner1.png\",\r\n        dot: document.querySelector('.slider-dots__banner'),\r\n    },\r\n    {\r\n        img: \"./img/banner2.png\",\r\n        dot: document.querySelector('.slider-dots__banner2'),\r\n    },\r\n    {\r\n        img: \"./img/banner3.png\",\r\n        dot: document.querySelector('.slider-dots__banner3'),\r\n    }\r\n];\r\n\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n    const imgSlider = document.querySelector('.slider-container__img');\r\n    let currentIndex = 0;\r\n    \r\n    function setEntity(index) {\r\n        imgSlider.style.backgroundImage = `url(${entities[index].img})`;\r\n    }\r\n    \r\n    function makeActive(index) {\r\n        entities[index].dot.style.opacity = 1;\r\n    }\r\n    \r\n    function makeInactive(index) {\r\n        entities[index].dot.style.opacity = 0.3;\r\n    }\r\n    \r\n    function pressOnElement(index) {\r\n        makeInactive(currentIndex);\r\n        currentIndex = index;\r\n        setEntity(currentIndex);\r\n        makeActive(currentIndex);\r\n    }\r\n    \r\n    function autoSlide() {\r\n        makeInactive(currentIndex);\r\n        currentIndex = (currentIndex === entities.length - 1) ? 0 : currentIndex + 1;\r\n        setEntity(currentIndex);\r\n        makeActive(currentIndex);\r\n    }\r\n    \r\n    setInterval(autoSlide, 5000);\r\n    \r\n    for (let i = 0; i < entities.length; i++) {\r\n        if (entities[i].dot) {\r\n            entities[i].dot.addEventListener('click', () => {\r\n                pressOnElement(i);\r\n            });\r\n        }\r\n    }\r\n    \r\n    setEntity(currentIndex);\r\n    makeActive(currentIndex);\r\n    });\r\n    \r\n    console.log(entities[0].img);\r\n    console.log(`webPack`);\r\n    \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/js/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;