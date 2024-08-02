/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/initMap.js":
/*!***************************!*\
  !*** ./src/js/initMap.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    const lat = 40.4238362\n    const lng = -3.6848187\n    const mapa = L.map('mapa-inicio').setView([lat, lng], 6)\n\n    let markers = new L.FeatureGroup().addTo(mapa)\n    console.log(markers)\n\n    let properties = []\n\n    const filters = {\n        category: '',\n        price: ''\n    }\n\n    const categoriesSelect = document.querySelector('#categories')\n    const pricesSelect = document.querySelector('#prices')\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa)\n\n    categoriesSelect.addEventListener('change', option => {\n        filters.category = +option.target.value\n        filterProperties()\n    })\n\n    pricesSelect.addEventListener('change', option => {\n        filters.price = +option.target.value\n        filterProperties()\n    })\n\n    const obteinProperties = async () => {\n        try {\n            const url = '/properties'\n            const response = await fetch(url)\n            properties = await response.json()\n\n            showProperties(properties.propiedades)\n\n        } catch (error) {\n            console.log(error)\n        }\n    }\n\n    const showProperties = propiedades => {\n        markers.clearLayers()\n\n        propiedades.forEach(element => {\n            const marker = new L.marker([element?.lat, element?.lng], {\n                autoPan: true\n            })\n            .addTo(mapa)\n            .bindPopup(`\n                <p class=\"text-indigo-600 font-bold\">${element?.category.name}</p>\n                <h1 class=\"text-xl font-extrabold my-2\">${element?.title}</h1>\n                <img src='/uploads/${element?.image}' alt=\"Imagen de la Propiedad ${element?.title}\">\n                <p class=\"text-gray-600 font-bold\">${element?.price.name}</p>\n                <a href=\"/property/${element.id}\" class=\"bg-indigo-600 block py-2 text-center font-bold\">Ver propiedad</a>\n            `)\n\n            markers.addLayer(marker)\n        })\n    }\n\n    const filterProperties = () => {\n        const result = properties.propiedades.filter(filterCategory).filter(filterPrice)\n        showProperties(result)\n    }\n\n    const filterCategory = (property) => {\n        return filters.category ? +property.categoryId === filters.category : property\n    }\n\n    const filterPrice = (property) => {\n        return filters.price ? +property.priceId === filters.price : property\n    }\n\n    obteinProperties()\n})()\n\n\n//# sourceURL=webpack://idealhouse_mvc/./src/js/initMap.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/initMap.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;