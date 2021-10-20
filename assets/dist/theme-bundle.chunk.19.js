(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./assets/js/theme/subscribe.js":
/*!**************************************!*\
  !*** ./assets/js/theme/subscribe.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Subscribe; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page-manager */ "./assets/js/page-manager.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emthemes_modez_newsletter_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../emthemes-modez/newsletter-popup */ "./assets/js/emthemes-modez/newsletter-popup.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Supermarket Theme: Implement for newsletter popup




var Subscribe = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Subscribe, _PageManager);

  function Subscribe() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Subscribe.prototype;

  _proto.loaded = function loaded(next) {
    if (this.context.themeSettings.nl_popup_show !== '' && this.context.themeSettings.nl_popup_show !== 'hide') {
      var url = url__WEBPACK_IMPORTED_MODULE_1___default.a.parse(window.location.href, true);

      if (url.query.result === 'success') {
        Object(_emthemes_modez_newsletter_popup__WEBPACK_IMPORTED_MODULE_2__["hideForSubscribed"])();
      }
    }

    next();
  };

  return Subscribe;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvc3Vic2NyaWJlLmpzIl0sIm5hbWVzIjpbIlN1YnNjcmliZSIsImxvYWRlZCIsIm5leHQiLCJjb250ZXh0IiwidGhlbWVTZXR0aW5ncyIsIm5sX3BvcHVwX3Nob3ciLCJ1cmwiLCJVcmwiLCJwYXJzZSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInF1ZXJ5IiwicmVzdWx0IiwiaGlkZUZvclN1YnNjcmliZWQiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTs7SUFFcUJBLFM7Ozs7Ozs7OztTQUNqQkMsTSxHQUFBLGdCQUFPQyxJQUFQLEVBQWE7QUFDVCxRQUFJLEtBQUtDLE9BQUwsQ0FBYUMsYUFBYixDQUEyQkMsYUFBM0IsS0FBNkMsRUFBN0MsSUFBbUQsS0FBS0YsT0FBTCxDQUFhQyxhQUFiLENBQTJCQyxhQUEzQixLQUE2QyxNQUFwRyxFQUE0RztBQUN4RyxVQUFNQyxHQUFHLEdBQUdDLDBDQUFHLENBQUNDLEtBQUosQ0FBVUMsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUExQixFQUFnQyxJQUFoQyxDQUFaOztBQUNBLFVBQUlMLEdBQUcsQ0FBQ00sS0FBSixDQUFVQyxNQUFWLEtBQXFCLFNBQXpCLEVBQW9DO0FBQ2hDQyxrR0FBaUI7QUFDcEI7QUFDSjs7QUFDRFosUUFBSTtBQUNQLEc7OztFQVRrQ2EscUQiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3VwZXJtYXJrZXQgVGhlbWU6IEltcGxlbWVudCBmb3IgbmV3c2xldHRlciBwb3B1cFxuXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCB7IGhpZGVGb3JTdWJzY3JpYmVkIH0gZnJvbSAnLi4vZW10aGVtZXMtbW9kZXovbmV3c2xldHRlci1wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnNjcmliZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBsb2FkZWQobmV4dCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MubmxfcG9wdXBfc2hvdyAhPT0gJycgJiYgdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MubmxfcG9wdXBfc2hvdyAhPT0gJ2hpZGUnKSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHVybC5xdWVyeS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIGhpZGVGb3JTdWJzY3JpYmVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV4dCgpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=