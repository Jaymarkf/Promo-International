(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./assets/js/emthemes-modez/compare-products.js":
/*!******************************************************!*\
  !*** ./assets/js/emthemes-modez/compare-products.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return compareProducts; });
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mustache */ "./node_modules/mustache/mustache.min.js");
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_0__);

var singleton;
var compareListTmpl = "\n    <div class=\"supermarket-compareList-panel-wrapper is-empty\" id=\"supermarketCompareList\">\n        <div class=\"supermarket-compareList-panel\">\n            <div class=\"supermarket-compareList-panel-body\">\n                <div class=\"supermarket-compareList\" data-compare-product-list>{{{renderItems}}}</div>\n                <div class=\"supermarket-compareList-actions\">\n                    <a href=\"{{compare_url}}\" class=\"button button--primary button--small button--compare\" data-compare-product-button>{{compare}}</a>\n                    <button type=\"button\" class=\"button button--secondary button--small button--clearAll\" data-compare-product-clearall>{{clear_all}}</button>\n                </div>\n            </div>\n            <button type=\"button\" class=\"button button--close\" data-compare-product-toggle><i class=\"fa fa-chevron-down\"></i><span class=\"is-srOnly\">Close</span></button>\n            <button type=\"button\" class=\"button button--open\" data-compare-product-toggle><i class=\"fa fa-chevron-up\"></i><span class=\"is-srOnly\">Open</span></button>\n        </div>\n    </div>\n";
var compareListItemTmpl = "\n    <div class=\"supermarket-compareList-item\" data-compare-product-item=\"{{id}}\">\n        <img class=\"supermarket-compareList-img\" src=\"{{image}}\" alt=\"{{alt}}\" title=\"{{alt}}\">\n        <button type=\"button\" class=\"supermarket-compareList-quickview quickview\" data-product-id=\"{{id}}\"><i class=\"fa fa-search-plus\"></i><span class=\"is-srOnly\">{{quick_view}}</span></button>\n        <button type=\"button\" class=\"supermarket-compareList-remove\" data-compare-product-remove=\"{{id}}\"><i class=\"fa fa-trash\"></i><span class=\"is-srOnly\">{{remove}}</span></button>\n    </div>\n";

var CompareProducts = /*#__PURE__*/function () {
  function CompareProducts(context) {
    var _this = this;

    this.context = context;
    this.animationTime = 300;
    this.$body = $('body');
    this.products = this.loadProductsFromLocalStorage() || [];
    this.$scope = $(mustache__WEBPACK_IMPORTED_MODULE_0___default.a.render(compareListTmpl, {
      compare: context.compareAddonLang_compare,
      clear_all: context.compareAddonLang_clear_all,
      renderItems: function renderItems() {
        return _this.products.map(function (product) {
          return _this.renderItem(product);
        }).join('');
      }
    }));

    if (this.products.length === 0) {
      this.$scope.addClass('is-empty').hide();
    } else {
      this.$scope.removeClass('is-empty').show();
    }

    this.$body.append(this.$scope);
    this.$productList = this.$scope.find('[data-compare-product-list]');
    this.$compareButton = this.$scope.find('[data-compare-product-button]');
    this.updateCompareUrl();
    this.bindEvents();
  }

  var _proto = CompareProducts.prototype;

  _proto.loadProductsFromLocalStorage = function loadProductsFromLocalStorage() {
    if (!window.localStorage) {
      return;
    }

    var s = window.localStorage.getItem('compareProducts');

    if (s) {
      try {
        return JSON.parse(s);
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  };

  _proto.saveProductsToLocalStorage = function saveProductsToLocalStorage() {
    if (!window.localStorage) {
      return;
    }

    window.localStorage.setItem('compareProducts', JSON.stringify(this.products));
  };

  _proto.bindEvents = function bindEvents() {
    var _this2 = this;

    this.$body.on('click', '[data-compare-id]', function (event) {
      event.preventDefault();
      var $el = $(event.currentTarget);
      var id = Number($el.data('compareId'));

      if (_this2.products.filter(function (item) {
        return item.id === id;
      }).length === 0) {
        _this2.addProduct({
          image: $el.data('compareImage'),
          alt: $el.data('compareTitle'),
          id: id
        });
      }

      _this2.$scope.removeClass('is-closed');
    });
    this.$scope.on('click', '[data-compare-product-remove]', function (event) {
      event.preventDefault();
      var $el = $(event.currentTarget);
      var id = Number($el.data('compareProductRemove'));

      _this2.removeProduct(id);

      _this2.$scope.removeClass('is-closed');
    });
    this.$scope.find('[data-compare-product-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.$scope.toggleClass('is-closed');
    });
    this.$scope.find('[data-compare-product-clearall]').on('click', function (event) {
      event.preventDefault();

      _this2.clearAllProducts();
    });
  };

  _proto.addProduct = function addProduct(product) {
    var _this3 = this;

    this.products.push(product);
    this.saveProductsToLocalStorage();
    this.updateCompareUrl();
    var $el = $(this.renderItem(product)).hide();
    this.$productList.append($el);
    $el.show(this.animationTime, function () {
      _this3.$scope.removeClass('is-empty').fadeIn(_this3.animationTime);
    });
  };

  _proto.removeProduct = function removeProduct(id) {
    var _this4 = this;

    this.products = this.products.filter(function (item) {
      return item.id !== id;
    });
    this.saveProductsToLocalStorage();
    this.updateCompareUrl();
    var $el = this.$scope.find("[data-compare-product-item=" + id + "]");
    $el.fadeOut(this.animationTime, function () {
      $el.remove();

      if (_this4.products.length === 0) {
        _this4.$scope.addClass('is-empty').fadeOut(_this4.animationTime);
      }
    });
  };

  _proto.clearAllProducts = function clearAllProducts() {
    var _this5 = this;

    this.products = [];
    this.saveProductsToLocalStorage();
    this.updateCompareUrl();
    var $el = this.$scope.find('[data-compare-product-item]');
    $el.fadeOut(this.animationTime, function () {
      $el.remove();

      _this5.$scope.addClass('is-empty').fadeOut(_this5.animationTime);
    });
  };

  _proto.updateCompareUrl = function updateCompareUrl() {
    var path = this.products.map(function (product) {
      return product.id;
    }).join('/');
    this.$compareButton.attr('href', this.context.urls.compare + "/" + path);
  };

  _proto.renderItem = function renderItem(item) {
    return mustache__WEBPACK_IMPORTED_MODULE_0___default.a.render(compareListItemTmpl, Object.assign({}, item, {
      quick_view: this.context.compareAddonLang_quick_view,
      remove: this.context.compareAddonLang_remove
    }));
  };

  return CompareProducts;
}();

function compareProducts(context) {
  if (!singleton) {
    singleton = new CompareProducts(context);
  }

  return singleton;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/compare.js":
/*!************************************!*\
  !*** ./assets/js/theme/compare.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Compare; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page-manager */ "./assets/js/page-manager.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../emthemes-modez/compare-products */ "./assets/js/emthemes-modez/compare-products.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Supermarket Mod
// import compareProducts from './global/compare-products';



var Compare = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Compare, _PageManager);

  function Compare() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Compare.prototype;

  _proto.onReady = function onReady() {
    var _this = this;

    // Supermarket Mod
    // compareProducts(this.context.urls);
    Object(_emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    var message = this.context.compareRemoveMessage;
    $('body').on('click', '[data-comparison-remove]', function (event) {
      if (_this.context.comparisons.length <= 2) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_1__["showAlertModal"])(message);
        event.preventDefault();
      }
    });
  };

  return Compare;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovY29tcGFyZS1wcm9kdWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tcGFyZS5qcyJdLCJuYW1lcyI6WyJzaW5nbGV0b24iLCJjb21wYXJlTGlzdFRtcGwiLCJjb21wYXJlTGlzdEl0ZW1UbXBsIiwiQ29tcGFyZVByb2R1Y3RzIiwiY29udGV4dCIsImFuaW1hdGlvblRpbWUiLCIkYm9keSIsIiQiLCJwcm9kdWN0cyIsImxvYWRQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UiLCIkc2NvcGUiLCJNdXN0YWNoZSIsInJlbmRlciIsImNvbXBhcmUiLCJjb21wYXJlQWRkb25MYW5nX2NvbXBhcmUiLCJjbGVhcl9hbGwiLCJjb21wYXJlQWRkb25MYW5nX2NsZWFyX2FsbCIsInJlbmRlckl0ZW1zIiwibWFwIiwicHJvZHVjdCIsInJlbmRlckl0ZW0iLCJqb2luIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJoaWRlIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiYXBwZW5kIiwiJHByb2R1Y3RMaXN0IiwiZmluZCIsIiRjb21wYXJlQnV0dG9uIiwidXBkYXRlQ29tcGFyZVVybCIsImJpbmRFdmVudHMiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJzIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsImUiLCJzYXZlUHJvZHVjdHNUb0xvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCIkZWwiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJOdW1iZXIiLCJkYXRhIiwiZmlsdGVyIiwiaXRlbSIsImFkZFByb2R1Y3QiLCJpbWFnZSIsImFsdCIsInJlbW92ZVByb2R1Y3QiLCJ0b2dnbGVDbGFzcyIsImNsZWFyQWxsUHJvZHVjdHMiLCJwdXNoIiwiZmFkZUluIiwiZmFkZU91dCIsInJlbW92ZSIsInBhdGgiLCJhdHRyIiwidXJscyIsInF1aWNrX3ZpZXciLCJjb21wYXJlQWRkb25MYW5nX3F1aWNrX3ZpZXciLCJjb21wYXJlQWRkb25MYW5nX3JlbW92ZSIsImNvbXBhcmVQcm9kdWN0cyIsIkNvbXBhcmUiLCJvblJlYWR5IiwibWVzc2FnZSIsImNvbXBhcmVSZW1vdmVNZXNzYWdlIiwiY29tcGFyaXNvbnMiLCJzaG93QWxlcnRNb2RhbCIsIlBhZ2VNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQUlBLFNBQUo7QUFFQSxJQUFNQyxlQUFlLHVuQ0FBckI7QUFnQkEsSUFBTUMsbUJBQW1CLG9tQkFBekI7O0lBUU1DLGU7QUFDRiwyQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEdBQXJCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQyxDQUFDLENBQUMsTUFBRCxDQUFkO0FBRUEsU0FBS0MsUUFBTCxHQUFnQixLQUFLQyw0QkFBTCxNQUF1QyxFQUF2RDtBQUVBLFNBQUtDLE1BQUwsR0FBY0gsQ0FBQyxDQUFDSSwrQ0FBUSxDQUFDQyxNQUFULENBQWdCWCxlQUFoQixFQUFpQztBQUM3Q1ksYUFBTyxFQUFFVCxPQUFPLENBQUNVLHdCQUQ0QjtBQUU3Q0MsZUFBUyxFQUFFWCxPQUFPLENBQUNZLDBCQUYwQjtBQUc3Q0MsaUJBQVcsRUFBRTtBQUFBLGVBQU0sS0FBSSxDQUFDVCxRQUFMLENBQWNVLEdBQWQsQ0FBa0IsVUFBQUMsT0FBTztBQUFBLGlCQUFJLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkQsT0FBaEIsQ0FBSjtBQUFBLFNBQXpCLEVBQXVERSxJQUF2RCxDQUE0RCxFQUE1RCxDQUFOO0FBQUE7QUFIZ0MsS0FBakMsQ0FBRCxDQUFmOztBQU1BLFFBQUksS0FBS2IsUUFBTCxDQUFjYyxNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzVCLFdBQUtaLE1BQUwsQ0FBWWEsUUFBWixDQUFxQixVQUFyQixF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LElBREE7QUFFSGMsZ0JBQVUsRUFBRSxLQUFLOUQsT0FBTCxDQUFhK0QsMkJBRnRCO0FBR0hMLFlBQU0sRUFBRSxLQUFLMUQsT0FBTCxDQUFhZ0U7QUFIbEIsT0FBUDtBQUtILEc7Ozs7O0FBR1UsU0FBU0MsZUFBVCxDQUF5QmpFLE9BQXpCLEVBQWtDO0FBQzdDLE1BQUksQ0FBQ0osU0FBTCxFQUFnQjtBQUNaQSxhQUFTLEdBQUcsSUFBSUcsZUFBSixDQUFvQkMsT0FBcEIsQ0FBWjtBQUNIOztBQUNELFNBQU9KLFNBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbExEO0NBRUE7QUFDQTs7QUFDQTs7SUFFcUJzRSxPOzs7Ozs7Ozs7U0FDakJDLE8sR0FBQSxtQkFBVTtBQUFBOztBQUNOO0FBQ0E7QUFDQUYsb0ZBQWUsQ0FBQyxLQUFLakUsT0FBTixDQUFmO0FBRUEsUUFBTW9FLE9BQU8sR0FBRyxLQUFLcEUsT0FBTCxDQUFhcUUsb0JBQTdCO0FBRUFsRSxLQUFDLENBQUMsTUFBRCxDQUFELENBQVVvQyxFQUFWLENBQWEsT0FBYixFQUFzQiwwQkFBdEIsRUFBa0QsVUFBQUMsS0FBSyxFQUFJO0FBQ3ZELFVBQUksS0FBSSxDQUFDeEMsT0FBTCxDQUFhc0UsV0FBYixDQUF5QnBELE1BQXpCLElBQW1DLENBQXZDLEVBQTBDO0FBQ3RDcUQsNEVBQWMsQ0FBQ0gsT0FBRCxDQUFkO0FBQ0E1QixhQUFLLENBQUNDLGNBQU47QUFDSDtBQUNKLEtBTEQ7QUFNSCxHOzs7RUFkZ0MrQixxRCIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXVzdGFjaGUgZnJvbSAnbXVzdGFjaGUnO1xuXG5sZXQgc2luZ2xldG9uO1xuXG5jb25zdCBjb21wYXJlTGlzdFRtcGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LXBhbmVsLXdyYXBwZXIgaXMtZW1wdHlcIiBpZD1cInN1cGVybWFya2V0Q29tcGFyZUxpc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LXBhbmVsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtcGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdFwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LWxpc3Q+e3t7cmVuZGVySXRlbXN9fX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwie3tjb21wYXJlX3VybH19XCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0tc21hbGwgYnV0dG9uLS1jb21wYXJlXCIgZGF0YS1jb21wYXJlLXByb2R1Y3QtYnV0dG9uPnt7Y29tcGFyZX19PC9hPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXNlY29uZGFyeSBidXR0b24tLXNtYWxsIGJ1dHRvbi0tY2xlYXJBbGxcIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC1jbGVhcmFsbD57e2NsZWFyX2FsbH19PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tY2xvc2VcIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC10b2dnbGU+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWRvd25cIj48L2k+PHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5DbG9zZTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tb3BlblwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LXRvZ2dsZT48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tdXBcIj48L2k+PHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5PcGVuPC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbmA7XG5cbmNvbnN0IGNvbXBhcmVMaXN0SXRlbVRtcGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LWl0ZW1cIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC1pdGVtPVwie3tpZH19XCI+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdC1pbWdcIiBzcmM9XCJ7e2ltYWdlfX1cIiBhbHQ9XCJ7e2FsdH19XCIgdGl0bGU9XCJ7e2FsdH19XCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtcXVpY2t2aWV3IHF1aWNrdmlld1wiIGRhdGEtcHJvZHVjdC1pZD1cInt7aWR9fVwiPjxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoLXBsdXNcIj48L2k+PHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj57e3F1aWNrX3ZpZXd9fTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdC1yZW1vdmVcIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC1yZW1vdmU9XCJ7e2lkfX1cIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPjxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+e3tyZW1vdmV9fTwvc3Bhbj48L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmNsYXNzIENvbXBhcmVQcm9kdWN0cyB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmFuaW1hdGlvblRpbWUgPSAzMDA7XG4gICAgICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMubG9hZFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSgpIHx8IFtdO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJChNdXN0YWNoZS5yZW5kZXIoY29tcGFyZUxpc3RUbXBsLCB7XG4gICAgICAgICAgICBjb21wYXJlOiBjb250ZXh0LmNvbXBhcmVBZGRvbkxhbmdfY29tcGFyZSxcbiAgICAgICAgICAgIGNsZWFyX2FsbDogY29udGV4dC5jb21wYXJlQWRkb25MYW5nX2NsZWFyX2FsbCxcbiAgICAgICAgICAgIHJlbmRlckl0ZW1zOiAoKSA9PiB0aGlzLnByb2R1Y3RzLm1hcChwcm9kdWN0ID0+IHRoaXMucmVuZGVySXRlbShwcm9kdWN0KSkuam9pbignJyksXG4gICAgICAgIH0pKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmFkZENsYXNzKCdpcy1lbXB0eScpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdpcy1lbXB0eScpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJHNjb3BlKTtcblxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdCA9IHRoaXMuJHNjb3BlLmZpbmQoJ1tkYXRhLWNvbXBhcmUtcHJvZHVjdC1saXN0XScpO1xuICAgICAgICB0aGlzLiRjb21wYXJlQnV0dG9uID0gdGhpcy4kc2NvcGUuZmluZCgnW2RhdGEtY29tcGFyZS1wcm9kdWN0LWJ1dHRvbl0nKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBhcmVVcmwoKTtcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBsb2FkUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21wYXJlUHJvZHVjdHMnKTtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uocyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVQcm9kdWN0c1RvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbXBhcmVQcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvZHVjdHMpKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiRib2R5Lm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCAkZWwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBOdW1iZXIoJGVsLmRhdGEoJ2NvbXBhcmVJZCcpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZHVjdHMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJvZHVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAkZWwuZGF0YSgnY29tcGFyZUltYWdlJyksXG4gICAgICAgICAgICAgICAgICAgIGFsdDogJGVsLmRhdGEoJ2NvbXBhcmVUaXRsZScpLFxuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRzY29wZS5vbignY2xpY2snLCAnW2RhdGEtY29tcGFyZS1wcm9kdWN0LXJlbW92ZV0nLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgJGVsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gTnVtYmVyKCRlbC5kYXRhKCdjb21wYXJlUHJvZHVjdFJlbW92ZScpKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUHJvZHVjdChpZCk7XG5cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnW2RhdGEtY29tcGFyZS1wcm9kdWN0LXRvZ2dsZV0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUudG9nZ2xlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1jb21wYXJlLXByb2R1Y3QtY2xlYXJhbGxdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJBbGxQcm9kdWN0cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRQcm9kdWN0KHByb2R1Y3QpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0cy5wdXNoKHByb2R1Y3QpO1xuICAgICAgICB0aGlzLnNhdmVQcm9kdWN0c1RvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGFyZVVybCgpO1xuXG4gICAgICAgIGNvbnN0ICRlbCA9ICQodGhpcy5yZW5kZXJJdGVtKHByb2R1Y3QpKS5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3QuYXBwZW5kKCRlbCk7XG5cbiAgICAgICAgJGVsLnNob3codGhpcy5hbmltYXRpb25UaW1lLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaXMtZW1wdHknKS5mYWRlSW4odGhpcy5hbmltYXRpb25UaW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUHJvZHVjdChpZCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gdGhpcy5wcm9kdWN0cy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBpZCk7XG4gICAgICAgIHRoaXMuc2F2ZVByb2R1Y3RzVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wYXJlVXJsKCk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gdGhpcy4kc2NvcGUuZmluZChgW2RhdGEtY29tcGFyZS1wcm9kdWN0LWl0ZW09JHtpZH1dYCk7XG4gICAgICAgICRlbC5mYWRlT3V0KHRoaXMuYW5pbWF0aW9uVGltZSwgKCkgPT4ge1xuICAgICAgICAgICAgJGVsLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9kdWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaXMtZW1wdHknKS5mYWRlT3V0KHRoaXMuYW5pbWF0aW9uVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyQWxsUHJvZHVjdHMoKSB7XG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5zYXZlUHJvZHVjdHNUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBhcmVVcmwoKTtcblxuICAgICAgICBjb25zdCAkZWwgPSB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1jb21wYXJlLXByb2R1Y3QtaXRlbV0nKTtcbiAgICAgICAgJGVsLmZhZGVPdXQodGhpcy5hbmltYXRpb25UaW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAkZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaXMtZW1wdHknKS5mYWRlT3V0KHRoaXMuYW5pbWF0aW9uVGltZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbXBhcmVVcmwoKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnByb2R1Y3RzLm1hcChwcm9kdWN0ID0+IHByb2R1Y3QuaWQpLmpvaW4oJy8nKTtcbiAgICAgICAgdGhpcy4kY29tcGFyZUJ1dHRvbi5hdHRyKCdocmVmJywgYCR7dGhpcy5jb250ZXh0LnVybHMuY29tcGFyZX0vJHtwYXRofWApO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW0oaXRlbSkge1xuICAgICAgICByZXR1cm4gTXVzdGFjaGUucmVuZGVyKGNvbXBhcmVMaXN0SXRlbVRtcGwsIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBxdWlja192aWV3OiB0aGlzLmNvbnRleHQuY29tcGFyZUFkZG9uTGFuZ19xdWlja192aWV3LFxuICAgICAgICAgICAgcmVtb3ZlOiB0aGlzLmNvbnRleHQuY29tcGFyZUFkZG9uTGFuZ19yZW1vdmUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGFyZVByb2R1Y3RzKGNvbnRleHQpIHtcbiAgICBpZiAoIXNpbmdsZXRvbikge1xuICAgICAgICBzaW5nbGV0b24gPSBuZXcgQ29tcGFyZVByb2R1Y3RzKGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gc2luZ2xldG9uO1xufVxuIiwiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4uL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbi8vIFN1cGVybWFya2V0IE1vZFxuLy8gaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi4vZW10aGVtZXMtbW9kZXovY29tcGFyZS1wcm9kdWN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBhcmUgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gU3VwZXJtYXJrZXQgTW9kXG4gICAgICAgIC8vIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmNvbnRleHQuY29tcGFyZVJlbW92ZU1lc3NhZ2U7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJpc29uLXJlbW92ZV0nLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LmNvbXBhcmlzb25zLmxlbmd0aCA8PSAyKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==