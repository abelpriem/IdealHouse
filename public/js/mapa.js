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

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n\n    const lat = document.querySelector('#lat').value || 40.4238362;\n    const lng = document.querySelector('#lng').value || -3.6848187;\n    const mapa = L.map('mapa').setView([lat, lng ], 16);\n\n    let marker\n\n    // USE PROVIDER AND GEOCODER\n    const geocodeService = L.esri.Geocoding.geocodeService()\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa)\n\n    // PIN\n    marker = new L.marker([lat, lng], {\n        draggable: true,\n        autoPan: true\n    })\n    .addTo(mapa)\n\n    // LAT AND LONG DETECTED\n    marker.on('moveend', function(e) {\n        marker = e.target\n\n        const position = marker.getLatLng()\n        mapa.panTo(new L.LatLng(position.lat, position.lng))\n\n        // OBTAIN STREET ADRESS\n        geocodeService.reverse().latlng(position, 13).run(function(error, result) {\n            // console.log(result)\n\n            marker.bindPopup(result.address.LongLabel)\n\n            // SAVE LOCATION DATA\n            document.querySelector('.street').textContent = result.address.Address ?? ''\n            document.querySelector('#street').value = result.address.Address ?? ''\n            document.querySelector('#lat').value = result.latlng.lat ?? ''\n            document.querySelector('#lng').value = result.latlng.lng ?? ''\n        })\n    })\n})()\n\n//# sourceURL=webpack://idealhouse_mvc/./src/js/map.js?");

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
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;