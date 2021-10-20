(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./assets/js/emthemes-modez/action-bar.js":
/*!************************************************!*\
  !*** ./assets/js/emthemes-modez/action-bar.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return actionBarFactory; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../theme/common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");



var instantloadBinded = false;
var actionBar;

function removeModeClass(index, className) {
  return (className.match(/(^|\s)mode-\S+/g) || []).join(' ');
}

var ActionBar = /*#__PURE__*/function () {
  function ActionBar(options) {
    if (options === void 0) {
      options = {};
    }

    // console.log('actionbar constructor');
    this.onModeChange = this.onModeChange.bind(this);
    this.options = options;
    this.init();
  }

  var _proto = ActionBar.prototype;

  _proto.init = function init() {
    this.$sortBy = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-sort-by]');

    if (!this.$sortBy.length) {
      return;
    }

    var $limit = this.$sortBy.find('[name=limit]');
    var $mode = this.$sortBy.find('input[name=mode]');
    var url = url__WEBPACK_IMPORTED_MODULE_1___default.a.parse(window.location.href, true);

    if (url.query.limit) {
      $limit.val(url.query.limit);
    }

    if (url.query.mode) {
      $mode.prop('checked', false).filter("[value=" + url.query.mode + "]").prop('checked', true);
    } // Stop action bar if the page is category bulk order custom template


    var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');

    if ($body.hasClass('papaSupermarket-page--pages-custom-category-bulk-order') || $body.hasClass('papaSupermarket-page--pages-custom-brand-bulk-order')) {
      return;
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#product-listing-container').removeClass(removeModeClass).addClass("mode-" + $mode.filter(':checked').val());
    this.unbindEvents();
    this.bindEvents();
  };

  _proto.reinit = function reinit(newOptions) {
    // console.log('actionbar reinit');
    if (newOptions) {
      this.options = newOptions;
    }

    this.init();
  };

  _proto.destroy = function destroy() {
    // console.log('actionbar destroyed');
    this.unbindEvents();
  };

  _proto.bindEvents = function bindEvents() {
    this.$sortBy.find('input[name=mode]').on('change', this.onModeChange);
  };

  _proto.unbindEvents = function unbindEvents() {
    this.$sortBy.find('input[name=mode]').off('change', this.onModeChange);
  };

  _proto.onModeChange = function onModeChange(event) {
    event.preventDefault();
    var mode = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).val();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#product-listing-container').removeClass(removeModeClass).addClass("mode-" + mode);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#product-listing-container .pagination-link').each(function (i, el) {
      var $a = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
      var url = _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_2__["default"].replaceParams($a.attr('href'), {
        mode: mode
      });
      $a.attr('href', url);
    });
    var url = url__WEBPACK_IMPORTED_MODULE_1___default.a.parse(window.location.href, true);
    url.query.mode = mode;
    window.history.pushState({}, document.title, url__WEBPACK_IMPORTED_MODULE_1___default.a.format({
      pathname: url.pathname,
      search: _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_2__["default"].buildQueryString(url.query)
    }));
  };

  return ActionBar;
}();
/**
 * Call this function when:
 * - Page is loaded
 * - Ajax page returned
 */


function actionBarFactory(options) {
  if (actionBar) {
    actionBar.reinit(options);
  } else {
    actionBar = new ActionBar(options);
  } // Destroy actionBar when loading new page


  if (!instantloadBinded) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('beforeload.instantload', function () {
      if (actionBar) {
        actionBar.destroy();
        actionBar = null;
      }
    });
    instantloadBinded = true;
  }
}

/***/ }),

/***/ "./assets/js/emthemes-modez/bulk-order.js":
/*!************************************************!*\
  !*** ./assets/js/emthemes-modez/bulk-order.js ***!
  \************************************************/
/*! exports provided: BulkOrder, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulkOrder", function() { return BulkOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return bulkOrderFactory; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _theme_global_sweet_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../theme/global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



 //
// https://javascript.info/task/delay-promise
//

function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
} //
// https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e
//


function promiseSerial(funcs) {
  return funcs.reduce(function (promise, func) {
    return promise.then(function (result) {
      return func().then(Array.prototype.concat.bind(result));
    });
  }, Promise.resolve([]));
}

var BulkOrder = /*#__PURE__*/function () {
  function BulkOrder(context, $scope) {
    var _this = this;

    this.context = context || {};
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
    this.$scope = $scope;
    this.itemCount = 0;
    this.progressCurrent = 0;
    this.progressTotal = 0;
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onQuantityButtonClick = this.onQuantityButtonClick.bind(this);
    this.onProductAdded = this.onProductAdded.bind(this);
    this.onAddAllClick = this.onAddAllClick.bind(this);
    this.onCartQtyChange = this.onCartQtyChange.bind(this);
    this.onProgressPopupCloseClick = this.onProgressPopupCloseClick.bind(this);
    this.reinit(); // Supermarket

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('beforeload.instantload', function () {
      return _this.unbindEvents();
    });
  }

  var _proto = BulkOrder.prototype;

  _proto.reinit = function reinit() {
    this.$progressPopup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.bulkOrder-progressModal', this.$scope);
    this.$progressBar = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.progressBar', this.$progressPopup);
    this.$progressPopupCurrent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.bulkOrder-progressModal-current', this.$scope);
    this.$progressPopupActions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.bulkOrder-progressModal-actions', this.$scope);
    this.$progressPopupClose = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-close]', this.$scope);
    this.unbindEvents();
    this.bindEvents();
    this.calculate();
    this.updateQtyInCart();
  };

  _proto.bindEvents = function bindEvents() {
    this.$scope.on('change', '[data-bulkorder-qty-id]', this.onQuantityChange);
    this.$scope.on('click', '[data-quantity-change] button', this.onQuantityButtonClick);
    this.$scope.on('click', '[data-bulkorder-add-all]', this.onAddAllClick);
    this.$body.on('ajax-addtocart-item-added', this.onProductAdded);
    this.$body.on('cart-quantity-update', this.onCartQtyChange);
    this.$progressPopupClose.on('click', this.onProgressPopupCloseClick);
  };

  _proto.unbindEvents = function unbindEvents() {
    this.$scope.off('change', '[data-bulkorder-qty-id]', this.onQuantityChange);
    this.$scope.off('click', '[data-quantity-change] button', this.onQuantityButtonClick);
    this.$scope.off('click', '[data-bulkorder-add-all]', this.onAddAllClick);
    this.$body.off('ajax-addtocart-item-added', this.onProductAdded);
    this.$body.off('cart-quantity-update', this.onCartQtyChange);
    this.$progressPopupClose.off('click', this.onProgressPopupCloseClick);
  };

  _proto.onProgressPopupCloseClick = function onProgressPopupCloseClick(event) {
    event.preventDefault();
    this.hideProgressPopup();
  };

  _proto.onCartQtyChange = function onCartQtyChange() {
    this.updateQtyInCart();
  };

  _proto.showProgressPopup = function showProgressPopup() {
    this.$progressPopupActions.addClass('u-hiddenVisually');
    this.$progressPopup.addClass('is-open');
  };

  _proto.hideProgressPopup = function hideProgressPopup() {
    this.$progressPopupCurrent.css('width', 0);
    this.$progressPopupActions.addClass('u-hiddenVisually');
    this.$progressPopup.removeClass('is-open');
  };

  _proto.updateProgressPopup = function updateProgressPopup() {
    if (this.progressTotal > 0) {
      this.$progressPopupCurrent.css('width', this.progressCurrent / this.progressTotal * 100 + "%");
    } else {
      this.$progressPopupCurrent.css('width', 0);
    }
  };

  _proto.showProgressPopupActions = function showProgressPopupActions() {
    this.$progressPopupActions.removeClass('u-hiddenVisually');
  };

  _proto.showProgressBar = function showProgressBar() {
    this.$progressBar.removeClass('u-hiddenVisually');
  };

  _proto.hideProgressBar = function hideProgressBar() {
    this.$progressBar.addClass('u-hiddenVisually');
  };

  _proto.onAddAllClick = function onAddAllClick(event) {
    event.preventDefault();

    if (this.itemCount === 0) {
      _theme_global_sweet_alert__WEBPACK_IMPORTED_MODULE_2__["default"].fire({
        text: this.context.bulkOrderEnterQty || 'Please enter product quantity',
        icon: 'error'
      });
      return;
    }

    this.addAllProducts();
  };

  _proto.onProductAdded = function onProductAdded(event, productId) {
    this.$scope.find("[data-bulkorder-qty-id='" + productId + "']").val(0);
    this.calculate();
  };

  _proto.onQuantityButtonClick = function onQuantityButtonClick(event) {
    event.preventDefault();
    var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
    var $input = $target.closest('[data-quantity-change]').find('input');
    var quantityMin = parseInt($input.data('quantityMin'), 10);
    var quantityMax = parseInt($input.data('quantityMax'), 10);
    var qty = parseInt($input.val(), 10); // If action is incrementing

    if ($target.data('action') === 'inc') {
      // If quantity max option is set
      if (quantityMax > 0) {
        // Check quantity does not exceed max
        if (qty + 1 <= quantityMax) {
          qty++;
        }
      } else {
        qty++;
      }
    } else if (qty > 0) {
      // If quantity min option is set
      if (quantityMin > 0) {
        // Check quantity does not fall below min
        if (qty - 1 >= quantityMin) {
          qty--;
        } else {
          qty = 0;
        }
      } else {
        qty--;
      }
    }

    $input.val(qty);
    this.calculate();
  };

  _proto.onQuantityChange = function onQuantityChange() {
    this.calculate();
  };

  _proto.calculate = function calculate() {
    var _this2 = this;

    var format = '';
    var total = 0;
    var count = 0;
    this.$scope.find('[data-bulkorder-qty-id]').each(function (i, el) {
      var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
      var qty = parseInt($input.val(), 10);
      var productId = $input.data('bulkorderQtyId');

      var $price = _this2.$scope.find("[data-bulkorder-price-id='" + productId + "']");

      var priceVal = parseFloat($price.data('bulkorderPriceValue'));
      var priceFmt = "" + $price.data('bulkorderPriceFormatted');
      var subtotal = Math.round(priceVal * qty * 100) / 100;

      var $subtotal = _this2.$scope.find("[data-bulkorder-subtotal-id='" + productId + "']");

      $subtotal.html(priceFmt.replace(/[0-9.,]+/, subtotal));
      format = priceFmt;
      total += subtotal;
      count += qty;
    });
    this.itemCount = count;
    this.$scope.find('[data-bulkorder-total-count]').html(count);
    this.$scope.find('[data-bulkorder-total-amount]').html(format.replace(/[0-9.,]+/, Math.round(total * 100) / 100));
  };

  _proto.addAllProducts = function addAllProducts() {
    var _this3 = this;

    var promises = [];
    this.progressCurrent = 0;
    this.$scope.find('[data-bulkorder-qty-id]').each(function (i, el) {
      var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
      var qty = parseInt($input.val(), 10);
      var productId = $input.data('bulkorderQtyId');

      if (qty > 0) {
        promises.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this3.progressCurrent++;

                  _this3.updateProgressPopup();

                  _context.next = 4;
                  return _this3.addProduct(productId, qty);

                case 4:
                  // eslint-disable-line no-unused-expressions
                  $input.val(0);

                  _this3.calculate(); // wait 1s before adding to cart a new item in order to avoid request failed.


                  _context.next = 8;
                  return delay(1000);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })));
      }
    });
    this.progressTotal = promises.length;
    this.showProgressPopup();
    this.showProgressBar();
    promiseSerial(promises).then(function () {
      _this3.showProgressPopupActions();

      _this3.hideProgressBar(); // this.updateQtyInCart();


      _this3.updateCartCounter();
    });
  };

  _proto.addProduct = /*#__PURE__*/function () {
    var _addProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(productId, qty) {
      var formData, promise;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(window.FormData === undefined)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              formData = new FormData();
              formData.append('product_id', productId);
              formData.append('qty[]', qty);
              promise = new Promise(function (resolve) {
                _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.cart.itemAdd(formData, function (err, response) {
                  var errorMessage = err || response.data.error; // Guard statement

                  if (errorMessage) {
                    // Strip the HTML from the error message
                    var tmp = document.createElement('DIV');
                    tmp.innerHTML = errorMessage;
                    alert(tmp.textContent || tmp.innerText);
                  }

                  resolve();
                });
              });
              _context2.next = 8;
              return promise;

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function addProduct(_x, _x2) {
      return _addProduct.apply(this, arguments);
    }

    return addProduct;
  }();

  _proto.updateQtyInCart = function updateQtyInCart() {
    var _this4 = this;

    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/storefront/cart', function (data) {
      if (!data.length) {
        return;
      }

      var qtys = {};
      data[0].lineItems.physicalItems.forEach(function (item) {
        if (typeof qtys[item.productId] !== 'undefined') {
          qtys[item.productId] += item.quantity;
        } else {
          qtys[item.productId] = item.quantity;
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-bulkorder-cart-qty-id]', _this4.$scope).each(function (i, el) {
        var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
        var productId = parseInt($el.data('bulkorderCartQtyId'), 10);

        if (qtys[productId]) {
          $el.html(qtys[productId]);
        } else {
          $el.html('0');
        }
      });
    });
  };

  _proto.updateCartCounter = function updateCartCounter() {
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.cart.getContent({
      template: 'cart/preview'
    }, function (err, resp) {
      if (err) {
        return;
      } // Update cart counter


      var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
      var $cartQuantity = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cart-quantity]', resp);
      var $cartCounter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.navUser-action .cart-count');
      var quantity = $cartQuantity.data('cart-quantity') || 0;
      $cartCounter.addClass('cart-count--positive');
      $body.trigger('cart-quantity-update', quantity);
    });
  };

  return BulkOrder;
}();
function bulkOrderFactory(context, selector) {
  if (context === void 0) {
    context = null;
  }

  if (selector === void 0) {
    selector = '#product-listing-container';
  }

  var $selector = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector);
  var bulkOrder = $selector.data('bulkOrderInstance');

  if (!(bulkOrder instanceof BulkOrder)) {
    bulkOrder = new BulkOrder(context, $selector);
    $selector.data('bulkOrderInstance', bulkOrder);
  }

  return bulkOrder;
}

/***/ }),

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

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page-manager */ "./assets/js/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);

  function CatalogPage() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = CatalogPage.prototype;

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    /* MOD by papathemes - supermarket
    ---
    const queryParams = $(currentTarget).serialize().split('=');
     url.query[queryParams[0]] = queryParams[1];
    ---
    */

    var queryParams = $(currentTarget).serializeArray();
    queryParams.forEach(function (param) {
      url.query[param.name] = param.value;
    });
    /* END MOD */

    delete url.query.page;
    event.preventDefault();
    event.isDefaultPrevented = true;
    /* eslint-disable-line */
    // papathemes-supermarket: quickfix stop stencil-utils SortByHook submitting the form when select changed

    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };

  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _emthemes_modez_action_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../emthemes-modez/action-bar */ "./assets/js/emthemes-modez/action-bar.js");











 // Papathemes - Supermarket

/**
 * Faceted search view component
 */

var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;

    var defaultOptions = {
      accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
      blockerSelector: '#facetedSearch .blocker',
      clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
      componentSelector: '#facetedSearch-navList',
      facetNavListSelector: '#facetedSearch .navList',
      priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
      priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
      priceRangeFormSelector: '#facet-range-form',
      priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
      priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
      showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
      facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
      modal: Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])('#modal')[0],
      modalOpen: false
    }; // Private properties

    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_3___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = []; // Init collapsibles

    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])(); // Init price validator

    this.initPriceValidator(); // Show limited items by default

    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    }); // Mark initially collapsed accordions

    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');

      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    }); // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped

    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    }); // Observe user events

    this.onStateChange = this.onStateChange.bind(this);
    this.onPopState = this.onPopState.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents(); // Supermarket

    $('body').one('beforeload.instantload', function () {
      return _this.unbindEvents();
    });
  } // Supermarket


  var _proto = FacetedSearch.prototype;

  _proto.destroy = function destroy() {
    this.unbindEvents();
  } // Public methods
  ;

  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    }

    Object(_emthemes_modez_action_bar__WEBPACK_IMPORTED_MODULE_11__["default"])(); // Papathemes - Supermarket
    // Init collapsibles

    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])(); // Init price validator

    this.initPriceValidator(); // Restore view state

    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems(); // Bind events

    this.bindEvents();
  };

  _proto.updateView = function updateView() {
    var _this2 = this;

    // Supermarket
    if (this.updateViewCallback) {
      return this.updateViewCallback();
    }

    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();

      if (err) {
        throw new Error(err);
      } // Refresh view with new content


      _this2.refreshView(content);
    });
  };

  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id'); // Remove

    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
  };

  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');

    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
    }
  };

  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id'); // Toggle depending on `collapsed` flag

    if (lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, id)) {
      this.getMoreFacetResults($navList);
      return true;
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;

    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl();

    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        _this3.options.modal.open();

        _this3.options.modalOpen = true;

        _this3.options.modal.updateContent(response);
      });
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();

      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };

  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };

  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };

  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this4.collapseFacet($accordionToggle);
    });
  };

  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this5.expandFacet($accordionToggle);
    });
  } // Private methods
  ;

  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }

    var validator = Object(_nod__WEBPACK_IMPORTED_MODULE_10__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__["Validators"].setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };

  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;

    var $navLists = $(this.options.facetNavListSelector); // Restore collapsed state for each facet

    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');

      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this6.collapsedFacetItems, id);

      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };

  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;

      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this7.collapsedFacets, id);

      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };

  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents(); // DOM events

    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation(); // Update URL

    /* MOD by papathemes - supermarket
    ---
    urlUtils.goToUrl(url);
    ---
    */

    var winUrl = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var facetUrl = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(url, true);

    if (winUrl.query.mode) {
      facetUrl.query.mode = winUrl.query.mode;
    }

    if (winUrl.query.limit) {
      facetUrl.query.limit = winUrl.query.limit;
    }

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: facetUrl.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(facetUrl.query)
    }));
    /* END MOD */
  };

  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href')); // Prevent default

    event.preventDefault(); // Toggle visible items

    this.toggleFacetItems($navList);
  };

  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected'); // Update URL

    /* MOD by papathemes - supermarket
    ---
    urlUtils.goToUrl(url);
    ---
    */

    var winUrl = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var facetUrl = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(url, true);

    if (winUrl.query.mode) {
      facetUrl.query.mode = winUrl.query.mode;
    }

    if (winUrl.query.limit) {
      facetUrl.query.limit = winUrl.query.limit;
    }

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: facetUrl.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(facetUrl.query)
    }));
    /* END MOD */

    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    /* MOD by papathemes - supermarket
    ---
    const queryParams = $(currentTarget).serialize().split('=');
     url.query[queryParams[0]] = queryParams[1];
    ---
    */

    var queryParams = $(currentTarget).serializeArray();
    queryParams.forEach(function (param) {
      url.query[param.name] = param.value;
    });
    /* END MOD */

    delete url.query.page;
    event.preventDefault(); // eslint-disable-next-line no-param-reassign

    event.isDefaultPrevented = true; // papathemes-supermarket: quick-fixed stencil-utils for sorting ajax request

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(url.query)
    }));
  };

  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();

    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].constants.VALID)) {
      return;
    }
    /* MOD by papathemes - supermarket
    ---
    const url = Url.parse(window.location.href);
    const queryParams = decodeURI($(currentTarget).serialize());
    ---
    */


    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParamsArray = $(currentTarget).serializeArray();
    queryParamsArray.forEach(function (param) {
      url.query[param.name] = param.value;
    });
    var queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(url.query);
    /* END MOD */

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: "?" + queryParams
    }));
  };

  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };

  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;

    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacets, id);
    }
  };

  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl); // If searchParams does not contain a page value then modify url query string to have page=1

    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');

      if (linkUrl) {
        // Supermarket Fix undefined
        var re = /page=[0-9]+/i;
        var updatedLinkUrl = linkUrl.replace(re, 'page=1');
        window.history.replaceState({}, document.title, updatedLinkUrl);
      }
    }

    $(window).trigger('statechange');
  };

  return FacetedSearch;
}();

/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary, translatePageBuilderValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translatePageBuilderValues", function() { return translatePageBuilderValues; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
// eslint-disable-next-line import/prefer-default-export


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};
var defaultPageBuilderValues = {
  pdp_sale_badge_label: 'On Sale!',
  pdp_sold_out_label: 'Sold Out',
  'pdp-sale-price-label': 'Now:',
  'pdp-non-sale-price-label': 'Was:',
  'pdp-retail-price-label': 'MSRP:',
  'pdp-custom-fields-tab-label': 'Additional Information'
};
/**
 * defines Translation for values from page builder (locally could be found in config.json)
 */

var translatePageBuilderValues = function translatePageBuilderValues() {
  $('[data-page-builder-key]').each(function (_, selector) {
    var $item = $(selector);
    var itemText = $item.text().trim();
    var itemDefaultTranslation = $item.data('default-translation');

    if (itemText === defaultPageBuilderValues[$item.data('page-builder-key')] && itemText !== itemDefaultTranslation) {
      $item.text(itemDefaultTranslation);
    }
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/url-utils.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/utils/url-utils.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);

var urlUtils = {
  getUrl: function getUrl() {
    return "" + window.location.pathname + window.location.search;
  },
  goToUrl: function goToUrl(url) {
    window.history.pushState({}, document.title, url);
    $(window).trigger('statechange');
  },
  replaceParams: function replaceParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0___default.a.parse(url, true);
    var param; // Let the formatter use the query object to build the new url

    parsed.search = null;

    for (param in params) {
      if (params.hasOwnProperty(param)) {
        parsed.query[param] = params[param];
      }
    } // supermarket: Fix url encode RFC 3986


    if (parsed.query) {
      parsed.search = urlUtils.buildQueryString(parsed.query);
      delete parsed.query;
    }

    return url__WEBPACK_IMPORTED_MODULE_0___default.a.format(parsed);
  },
  // Supermarket
  removeParams: function removeParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0___default.a.parse(url, true); // Let the formatter use the query object to build the new url

    parsed.search = null;

    if (typeof params === 'string') {
      if (parsed.query.hasOwnProperty(params)) {
        parsed.query[params] = null;
        delete parsed.query[params];
      }
    } else if (typeof params === 'object') {
      params.forEach(function (param) {
        if (parsed.query.hasOwnProperty(param)) {
          parsed.query[param] = null;
          delete parsed.query[param];
        }
      });
    } // supermarket: Fix url encode RFC 3986


    if (parsed.query) {
      parsed.search = urlUtils.buildQueryString(parsed.query);
      delete parsed.query;
    }

    return url__WEBPACK_IMPORTED_MODULE_0___default.a.format(parsed);
  },
  // supermarket: Fix faceted value contains both + and a spacing character (ie. "DVD+R DL")
  encodeParam: function encodeParam(val) {
    return encodeURIComponent(val).split('%20').join('+').replace(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  },
  buildQueryString: function buildQueryString(queryData) {
    var out = '';
    var key;

    for (key in queryData) {
      if (queryData.hasOwnProperty(key)) {
        if (Array.isArray(queryData[key])) {
          var ndx = void 0;

          for (ndx in queryData[key]) {
            if (queryData[key].hasOwnProperty(ndx)) {
              out += "&" + urlUtils.encodeParam(key) + "=" + urlUtils.encodeParam(queryData[key][ndx]); // supermarket mod
            }
          }
        } else {
          out += "&" + urlUtils.encodeParam(key) + "=" + urlUtils.encodeParam(queryData[key]); // supermarket mod
        }
      }
    }

    return out.substring(1);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (urlUtils);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray(value) ? value : [value];
}

module.exports = castArray;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayIncludes.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_arrayIncludesWith.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "./node_modules/lodash/_baseDifference.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseDifference.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "./node_modules/lodash/_arrayIncludesWith.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ "./node_modules/lodash/_isFlattenable.js");

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_baseUniq.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseUniq.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "./node_modules/lodash/_arrayIncludesWith.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js"),
    createSet = __webpack_require__(/*! ./_createSet */ "./node_modules/lodash/_createSet.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "./node_modules/lodash/_createSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_createSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_isFlattenable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/union.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/union.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "./node_modules/lodash/_baseFlatten.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    baseUniq = __webpack_require__(/*! ./_baseUniq */ "./node_modules/lodash/_baseUniq.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js");

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

module.exports = union;


/***/ }),

/***/ "./node_modules/lodash/without.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/without.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__(/*! ./_baseDifference */ "./node_modules/lodash/_baseDifference.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js");

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovYWN0aW9uLWJhci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovYnVsay1vcmRlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovY29tcGFyZS1wcm9kdWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdXJsLXV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldENhY2hlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5SW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlJbmNsdWRlc1dpdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlQdXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VEaWZmZXJlbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGbGF0dGVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVW5pcS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVTZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNGbGF0dGVuYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheUxpa2VPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC91bmlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL3dpdGhvdXQuanMiXSwibmFtZXMiOlsiaW5zdGFudGxvYWRCaW5kZWQiLCJhY3Rpb25CYXIiLCJyZW1vdmVNb2RlQ2xhc3MiLCJpbmRleCIsImNsYXNzTmFtZSIsIm1hdGNoIiwiam9pbiIsIkFjdGlvbkJhciIsIm9wdGlvbnMiLCJvbk1vZGVDaGFuZ2UiLCJiaW5kIiwiaW5pdCIsIiRzb3J0QnkiLCIkIiwibGVuZ3RoIiwiJGxpbWl0IiwiZmluZCIsIiRtb2RlIiwidXJsIiwiVXJsIiwicGFyc2UiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJxdWVyeSIsImxpbWl0IiwidmFsIiwibW9kZSIsInByb3AiLCJmaWx0ZXIiLCIkYm9keSIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInVuYmluZEV2ZW50cyIsImJpbmRFdmVudHMiLCJyZWluaXQiLCJuZXdPcHRpb25zIiwiZGVzdHJveSIsIm9uIiwib2ZmIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImVhY2giLCJpIiwiZWwiLCIkYSIsInVybFV0aWxzIiwicmVwbGFjZVBhcmFtcyIsImF0dHIiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiZG9jdW1lbnQiLCJ0aXRsZSIsImZvcm1hdCIsInBhdGhuYW1lIiwic2VhcmNoIiwiYnVpbGRRdWVyeVN0cmluZyIsImFjdGlvbkJhckZhY3RvcnkiLCJkZWxheSIsIm1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwicHJvbWlzZVNlcmlhbCIsImZ1bmNzIiwicmVkdWNlIiwicHJvbWlzZSIsImZ1bmMiLCJ0aGVuIiwicmVzdWx0IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjb25jYXQiLCJCdWxrT3JkZXIiLCJjb250ZXh0IiwiJHNjb3BlIiwiaXRlbUNvdW50IiwicHJvZ3Jlc3NDdXJyZW50IiwicHJvZ3Jlc3NUb3RhbCIsIm9uUXVhbnRpdHlDaGFuZ2UiLCJvblF1YW50aXR5QnV0dG9uQ2xpY2siLCJvblByb2R1Y3RBZGRlZCIsIm9uQWRkQWxsQ2xpY2siLCJvbkNhcnRRdHlDaGFuZ2UiLCJvblByb2dyZXNzUG9wdXBDbG9zZUNsaWNrIiwiJHByb2dyZXNzUG9wdXAiLCIkcHJvZ3Jlc3NCYXIiLCIkcHJvZ3Jlc3NQb3B1cEN1cnJlbnQiLCIkcHJvZ3Jlc3NQb3B1cEFjdGlvbnMiLCIkcHJvZ3Jlc3NQb3B1cENsb3NlIiwiY2FsY3VsYXRlIiwidXBkYXRlUXR5SW5DYXJ0IiwiaGlkZVByb2dyZXNzUG9wdXAiLCJzaG93UHJvZ3Jlc3NQb3B1cCIsImNzcyIsInVwZGF0ZVByb2dyZXNzUG9wdXAiLCJzaG93UHJvZ3Jlc3NQb3B1cEFjdGlvbnMiLCJzaG93UHJvZ3Jlc3NCYXIiLCJoaWRlUHJvZ3Jlc3NCYXIiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJidWxrT3JkZXJFbnRlclF0eSIsImljb24iLCJhZGRBbGxQcm9kdWN0cyIsInByb2R1Y3RJZCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiJGlucHV0IiwiY2xvc2VzdCIsInF1YW50aXR5TWluIiwicGFyc2VJbnQiLCJkYXRhIiwicXVhbnRpdHlNYXgiLCJxdHkiLCJ0b3RhbCIsImNvdW50IiwiJHByaWNlIiwicHJpY2VWYWwiLCJwYXJzZUZsb2F0IiwicHJpY2VGbXQiLCJzdWJ0b3RhbCIsIk1hdGgiLCJyb3VuZCIsIiRzdWJ0b3RhbCIsImh0bWwiLCJyZXBsYWNlIiwicHJvbWlzZXMiLCJwdXNoIiwiYWRkUHJvZHVjdCIsInVwZGF0ZUNhcnRDb3VudGVyIiwiRm9ybURhdGEiLCJ1bmRlZmluZWQiLCJmb3JtRGF0YSIsImFwcGVuZCIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1BZGQiLCJlcnIiLCJyZXNwb25zZSIsImVycm9yTWVzc2FnZSIsImVycm9yIiwidG1wIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFsZXJ0IiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCJnZXQiLCJxdHlzIiwibGluZUl0ZW1zIiwicGh5c2ljYWxJdGVtcyIsImZvckVhY2giLCJpdGVtIiwicXVhbnRpdHkiLCIkZWwiLCJnZXRDb250ZW50IiwidGVtcGxhdGUiLCJyZXNwIiwiJGNhcnRRdWFudGl0eSIsIiRjYXJ0Q291bnRlciIsInRyaWdnZXIiLCJidWxrT3JkZXJGYWN0b3J5Iiwic2VsZWN0b3IiLCIkc2VsZWN0b3IiLCJidWxrT3JkZXIiLCJzaW5nbGV0b24iLCJjb21wYXJlTGlzdFRtcGwiLCJjb21wYXJlTGlzdEl0ZW1UbXBsIiwiQ29tcGFyZVByb2R1Y3RzIiwiYW5pbWF0aW9uVGltZSIsInByb2R1Y3RzIiwibG9hZFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSIsIk11c3RhY2hlIiwicmVuZGVyIiwiY29tcGFyZSIsImNvbXBhcmVBZGRvbkxhbmdfY29tcGFyZSIsImNsZWFyX2FsbCIsImNvbXBhcmVBZGRvbkxhbmdfY2xlYXJfYWxsIiwicmVuZGVySXRlbXMiLCJtYXAiLCJwcm9kdWN0IiwicmVuZGVySXRlbSIsImhpZGUiLCJzaG93IiwiJHByb2R1Y3RMaXN0IiwiJGNvbXBhcmVCdXR0b24iLCJ1cGRhdGVDb21wYXJlVXJsIiwibG9jYWxTdG9yYWdlIiwicyIsImdldEl0ZW0iLCJKU09OIiwiZSIsInNhdmVQcm9kdWN0c1RvTG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImlkIiwiTnVtYmVyIiwiaW1hZ2UiLCJhbHQiLCJyZW1vdmVQcm9kdWN0IiwidG9nZ2xlQ2xhc3MiLCJjbGVhckFsbFByb2R1Y3RzIiwiZmFkZUluIiwiZmFkZU91dCIsInJlbW92ZSIsInBhdGgiLCJ1cmxzIiwicXVpY2tfdmlldyIsImNvbXBhcmVBZGRvbkxhbmdfcXVpY2tfdmlldyIsImNvbXBhcmVBZGRvbkxhbmdfcmVtb3ZlIiwiY29tcGFyZVByb2R1Y3RzIiwiQ2F0YWxvZ1BhZ2UiLCJvblNvcnRCeVN1Ym1pdCIsInF1ZXJ5UGFyYW1zIiwic2VyaWFsaXplQXJyYXkiLCJwYXJhbSIsIm5hbWUiLCJ2YWx1ZSIsInBhZ2UiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJQYWdlTWFuYWdlciIsIkZhY2V0ZWRTZWFyY2giLCJyZXF1ZXN0T3B0aW9ucyIsImNhbGxiYWNrIiwiZGVmYXVsdE9wdGlvbnMiLCJhY2NvcmRpb25Ub2dnbGVTZWxlY3RvciIsImJsb2NrZXJTZWxlY3RvciIsImNsZWFyRmFjZXRTZWxlY3RvciIsImNvbXBvbmVudFNlbGVjdG9yIiwiZmFjZXROYXZMaXN0U2VsZWN0b3IiLCJwcmljZVJhbmdlRXJyb3JTZWxlY3RvciIsInByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yIiwicHJpY2VSYW5nZUZvcm1TZWxlY3RvciIsInByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yIiwicHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IiLCJzaG93TW9yZVRvZ2dsZVNlbGVjdG9yIiwiZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zIiwibW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJtb2RhbE9wZW4iLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiY29sbGFwc2libGVGYWN0b3J5IiwiaW5pdFByaWNlVmFsaWRhdG9yIiwibmF2TGlzdCIsImNvbGxhcHNlRmFjZXRJdGVtcyIsImFjY29yZGlvblRvZ2dsZSIsIiRhY2NvcmRpb25Ub2dnbGUiLCJjb2xsYXBzaWJsZSIsImlzQ29sbGFwc2VkIiwidGFyZ2V0SWQiLCJpcyIsImNvbGxhcHNlQWxsRmFjZXRzIiwib25TdGF0ZUNoYW5nZSIsIm9uUG9wU3RhdGUiLCJvblRvZ2dsZUNsaWNrIiwib25BY2NvcmRpb25Ub2dnbGUiLCJvbkNsZWFyRmFjZXQiLCJvbkZhY2V0Q2xpY2siLCJvblJhbmdlU3VibWl0IiwiZmlsdGVyRmFjZXRJdGVtcyIsIm9uZSIsInJlZnJlc2hWaWV3IiwiY29udGVudCIsInJlc3RvcmVDb2xsYXBzZWRGYWNldHMiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcyIsInVwZGF0ZVZpZXciLCJ1cGRhdGVWaWV3Q2FsbGJhY2siLCJnZXRQYWdlIiwiZ2V0VXJsIiwiRXJyb3IiLCJleHBhbmRGYWNldEl0ZW1zIiwiJG5hdkxpc3QiLCJoYXNNb3JlUmVzdWx0cyIsInRvZ2dsZUZhY2V0SXRlbXMiLCJnZXRNb3JlRmFjZXRSZXN1bHRzIiwiZmFjZXQiLCJmYWNldFVybCIsInNob3dNb3JlIiwicGFyYW1zIiwibGlzdF9hbGwiLCJvcGVuIiwidXBkYXRlQ29udGVudCIsIiRpdGVtcyIsInRvTG93ZXJDYXNlIiwiZWxlbWVudCIsImluZGV4T2YiLCJleHBhbmRGYWNldCIsImNvbGxhcHNlRmFjZXQiLCJjbG9zZSIsIiRhY2NvcmRpb25Ub2dnbGVzIiwiZXhwYW5kQWxsRmFjZXRzIiwidmFsaWRhdG9yIiwibm9kIiwic2VsZWN0b3JzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJmb3JtU2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsIlZhbGlkYXRvcnMiLCJzZXRNaW5NYXhQcmljZVZhbGlkYXRpb24iLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsInByaWNlUmFuZ2VWYWxpZGF0b3IiLCIkbmF2TGlzdHMiLCJzaG91bGRDb2xsYXBzZSIsImhvb2tzIiwiJGxpbmsiLCJzdG9wUHJvcGFnYXRpb24iLCJ3aW5VcmwiLCJnb1RvVXJsIiwiJHRvZ2dsZSIsImFyZUFsbCIsImNvbnN0YW50cyIsIlZBTElEIiwicXVlcnlQYXJhbXNBcnJheSIsImN1cnJlbnRVcmwiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJoYXMiLCJsaW5rVXJsIiwicmUiLCJ1cGRhdGVkTGlua1VybCIsInJlcGxhY2VTdGF0ZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsImtleSIsInNwbGl0IiwicG9wIiwiYWNjIiwiZGVmYXVsdFBhZ2VCdWlsZGVyVmFsdWVzIiwicGRwX3NhbGVfYmFkZ2VfbGFiZWwiLCJwZHBfc29sZF9vdXRfbGFiZWwiLCJ0cmFuc2xhdGVQYWdlQnVpbGRlclZhbHVlcyIsIl8iLCIkaXRlbSIsIml0ZW1UZXh0IiwidHJpbSIsIml0ZW1EZWZhdWx0VHJhbnNsYXRpb24iLCJwYXJzZWQiLCJoYXNPd25Qcm9wZXJ0eSIsInJlbW92ZVBhcmFtcyIsImVuY29kZVBhcmFtIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiYyIsImNoYXJDb2RlQXQiLCJ0b1N0cmluZyIsInF1ZXJ5RGF0YSIsIm91dCIsImlzQXJyYXkiLCJuZHgiLCJzdWJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLGlCQUFpQixHQUFHLEtBQXhCO0FBQ0EsSUFBSUMsU0FBSjs7QUFFQSxTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFnQ0MsU0FBaEMsRUFBMkM7QUFDdkMsU0FBTyxDQUFDQSxTQUFTLENBQUNDLEtBQVYsQ0FBZ0IsaUJBQWhCLEtBQXNDLEVB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bWUtYnVuZGxlLmNodW5rLjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuXG5sZXQgaW5zdGFudGxvYWRCaW5kZWQgPSBmYWxzZTtcbmxldCBhY3Rpb25CYXI7XG5cbmZ1bmN0aW9uIHJlbW92ZU1vZGVDbGFzcyhpbmRleCwgY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2goLyhefFxccyltb2RlLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbn1cblxuY2xhc3MgQWN0aW9uQmFyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2FjdGlvbmJhciBjb25zdHJ1Y3RvcicpO1xuICAgICAgICB0aGlzLm9uTW9kZUNoYW5nZSA9IHRoaXMub25Nb2RlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuJHNvcnRCeSA9ICQoJ1tkYXRhLXNvcnQtYnldJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLiRzb3J0QnkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkbGltaXQgPSB0aGlzLiRzb3J0QnkuZmluZCgnW25hbWU9bGltaXRdJyk7XG4gICAgICAgIGNvbnN0ICRtb2RlID0gdGhpcy4kc29ydEJ5LmZpbmQoJ2lucHV0W25hbWU9bW9kZV0nKTtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcblxuICAgICAgICBpZiAodXJsLnF1ZXJ5LmxpbWl0KSB7XG4gICAgICAgICAgICAkbGltaXQudmFsKHVybC5xdWVyeS5saW1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsLnF1ZXJ5Lm1vZGUpIHtcbiAgICAgICAgICAgICRtb2RlLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGBbdmFsdWU9JHt1cmwucXVlcnkubW9kZX1dYCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RvcCBhY3Rpb24gYmFyIGlmIHRoZSBwYWdlIGlzIGNhdGVnb3J5IGJ1bGsgb3JkZXIgY3VzdG9tIHRlbXBsYXRlXG4gICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICBpZiAoJGJvZHkuaGFzQ2xhc3MoJ3BhcGFTdXBlcm1hcmtldC1wYWdlLS1wYWdlcy1jdXN0b20tY2F0ZWdvcnktYnVsay1vcmRlcicpIHx8ICRib2R5Lmhhc0NsYXNzKCdwYXBhU3VwZXJtYXJrZXQtcGFnZS0tcGFnZXMtY3VzdG9tLWJyYW5kLWJ1bGstb3JkZXInKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHJlbW92ZU1vZGVDbGFzcylcbiAgICAgICAgICAgIC5hZGRDbGFzcyhgbW9kZS0keyRtb2RlLmZpbHRlcignOmNoZWNrZWQnKS52YWwoKX1gKTtcblxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICByZWluaXQobmV3T3B0aW9ucykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWN0aW9uYmFyIHJlaW5pdCcpO1xuICAgICAgICBpZiAobmV3T3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3T3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWN0aW9uYmFyIGRlc3Ryb3llZCcpO1xuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHNvcnRCeS5maW5kKCdpbnB1dFtuYW1lPW1vZGVdJykub24oJ2NoYW5nZScsIHRoaXMub25Nb2RlQ2hhbmdlKTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHNvcnRCeS5maW5kKCdpbnB1dFtuYW1lPW1vZGVdJykub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uTW9kZUNoYW5nZSk7XG4gICAgfVxuXG4gICAgb25Nb2RlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgbW9kZSA9ICQoZXZlbnQudGFyZ2V0KS52YWwoKTtcblxuICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MocmVtb3ZlTW9kZUNsYXNzKVxuICAgICAgICAgICAgLmFkZENsYXNzKGBtb2RlLSR7bW9kZX1gKTtcblxuICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucGFnaW5hdGlvbi1saW5rJykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhID0gJChlbCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKCRhLmF0dHIoJ2hyZWYnKSwgeyBtb2RlIH0pO1xuICAgICAgICAgICAgJGEuYXR0cignaHJlZicsIHVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIHVybC5xdWVyeS5tb2RlID0gbW9kZTtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmwucXVlcnkpIH0pKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2FsbCB0aGlzIGZ1bmN0aW9uIHdoZW46XG4gKiAtIFBhZ2UgaXMgbG9hZGVkXG4gKiAtIEFqYXggcGFnZSByZXR1cm5lZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhY3Rpb25CYXJGYWN0b3J5KG9wdGlvbnMpIHtcbiAgICBpZiAoYWN0aW9uQmFyKSB7XG4gICAgICAgIGFjdGlvbkJhci5yZWluaXQob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uQmFyID0gbmV3IEFjdGlvbkJhcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBEZXN0cm95IGFjdGlvbkJhciB3aGVuIGxvYWRpbmcgbmV3IHBhZ2VcbiAgICBpZiAoIWluc3RhbnRsb2FkQmluZGVkKSB7XG4gICAgICAgICQoJ2JvZHknKS5vbignYmVmb3JlbG9hZC5pbnN0YW50bG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChhY3Rpb25CYXIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25CYXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGFjdGlvbkJhciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpbnN0YW50bG9hZEJpbmRlZCA9IHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgc3dhbCBmcm9tICcuLi90aGVtZS9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuXG4vL1xuLy8gaHR0cHM6Ly9qYXZhc2NyaXB0LmluZm8vdGFzay9kZWxheS1wcm9taXNlXG4vL1xuZnVuY3Rpb24gZGVsYXkobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG59XG5cbi8vXG4vLyBodHRwczovL2hhY2tlcm5vb24uY29tL2Z1bmN0aW9uYWwtamF2YXNjcmlwdC1yZXNvbHZpbmctcHJvbWlzZXMtc2VxdWVudGlhbGx5LTdhYWMxOGM0NDMxZVxuLy9cbmZ1bmN0aW9uIHByb21pc2VTZXJpYWwoZnVuY3MpIHtcbiAgICByZXR1cm4gZnVuY3MucmVkdWNlKFxuICAgICAgICAocHJvbWlzZSwgZnVuYykgPT4gcHJvbWlzZS50aGVuKHJlc3VsdCA9PiBmdW5jKCkudGhlbihBcnJheS5wcm90b3R5cGUuY29uY2F0LmJpbmQocmVzdWx0KSkpLFxuICAgICAgICBQcm9taXNlLnJlc29sdmUoW10pLFxuICAgICk7XG59XG5cbmV4cG9ydCBjbGFzcyBCdWxrT3JkZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsICRzY29wZSkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xuICAgICAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5pdGVtQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnByb2dyZXNzQ3VycmVudCA9IDA7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NUb3RhbCA9IDA7XG5cbiAgICAgICAgdGhpcy5vblF1YW50aXR5Q2hhbmdlID0gdGhpcy5vblF1YW50aXR5Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25RdWFudGl0eUJ1dHRvbkNsaWNrID0gdGhpcy5vblF1YW50aXR5QnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblByb2R1Y3RBZGRlZCA9IHRoaXMub25Qcm9kdWN0QWRkZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkFkZEFsbENsaWNrID0gdGhpcy5vbkFkZEFsbENsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DYXJ0UXR5Q2hhbmdlID0gdGhpcy5vbkNhcnRRdHlDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblByb2dyZXNzUG9wdXBDbG9zZUNsaWNrID0gdGhpcy5vblByb2dyZXNzUG9wdXBDbG9zZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5yZWluaXQoKTtcblxuICAgICAgICAvLyBTdXBlcm1hcmtldFxuICAgICAgICAkKCdib2R5Jykub24oJ2JlZm9yZWxvYWQuaW5zdGFudGxvYWQnLCAoKSA9PiB0aGlzLnVuYmluZEV2ZW50cygpKTtcbiAgICB9XG5cbiAgICByZWluaXQoKSB7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXAgPSAkKCcuYnVsa09yZGVyLXByb2dyZXNzTW9kYWwnLCB0aGlzLiRzY29wZSk7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzQmFyID0gJCgnLnByb2dyZXNzQmFyJywgdGhpcy4kcHJvZ3Jlc3NQb3B1cCk7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXBDdXJyZW50ID0gJCgnLmJ1bGtPcmRlci1wcm9ncmVzc01vZGFsLWN1cnJlbnQnLCB0aGlzLiRzY29wZSk7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXBBY3Rpb25zID0gJCgnLmJ1bGtPcmRlci1wcm9ncmVzc01vZGFsLWFjdGlvbnMnLCB0aGlzLiRzY29wZSk7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXBDbG9zZSA9ICQoJ1tkYXRhLWNsb3NlXScsIHRoaXMuJHNjb3BlKTtcblxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVF0eUluQ2FydCgpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm9uKCdjaGFuZ2UnLCAnW2RhdGEtYnVsa29yZGVyLXF0eS1pZF0nLCB0aGlzLm9uUXVhbnRpdHlDaGFuZ2UpO1xuICAgICAgICB0aGlzLiRzY29wZS5vbignY2xpY2snLCAnW2RhdGEtcXVhbnRpdHktY2hhbmdlXSBidXR0b24nLCB0aGlzLm9uUXVhbnRpdHlCdXR0b25DbGljayk7XG4gICAgICAgIHRoaXMuJHNjb3BlLm9uKCdjbGljaycsICdbZGF0YS1idWxrb3JkZXItYWRkLWFsbF0nLCB0aGlzLm9uQWRkQWxsQ2xpY2spO1xuICAgICAgICB0aGlzLiRib2R5Lm9uKCdhamF4LWFkZHRvY2FydC1pdGVtLWFkZGVkJywgdGhpcy5vblByb2R1Y3RBZGRlZCk7XG4gICAgICAgIHRoaXMuJGJvZHkub24oJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgdGhpcy5vbkNhcnRRdHlDaGFuZ2UpO1xuICAgICAgICB0aGlzLiRwcm9ncmVzc1BvcHVwQ2xvc2Uub24oJ2NsaWNrJywgdGhpcy5vblByb2dyZXNzUG9wdXBDbG9zZUNsaWNrKTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm9mZignY2hhbmdlJywgJ1tkYXRhLWJ1bGtvcmRlci1xdHktaWRdJywgdGhpcy5vblF1YW50aXR5Q2hhbmdlKTtcbiAgICAgICAgdGhpcy4kc2NvcGUub2ZmKCdjbGljaycsICdbZGF0YS1xdWFudGl0eS1jaGFuZ2VdIGJ1dHRvbicsIHRoaXMub25RdWFudGl0eUJ1dHRvbkNsaWNrKTtcbiAgICAgICAgdGhpcy4kc2NvcGUub2ZmKCdjbGljaycsICdbZGF0YS1idWxrb3JkZXItYWRkLWFsbF0nLCB0aGlzLm9uQWRkQWxsQ2xpY2spO1xuICAgICAgICB0aGlzLiRib2R5Lm9mZignYWpheC1hZGR0b2NhcnQtaXRlbS1hZGRlZCcsIHRoaXMub25Qcm9kdWN0QWRkZWQpO1xuICAgICAgICB0aGlzLiRib2R5Lm9mZignY2FydC1xdWFudGl0eS11cGRhdGUnLCB0aGlzLm9uQ2FydFF0eUNoYW5nZSk7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXBDbG9zZS5vZmYoJ2NsaWNrJywgdGhpcy5vblByb2dyZXNzUG9wdXBDbG9zZUNsaWNrKTtcbiAgICB9XG5cbiAgICBvblByb2dyZXNzUG9wdXBDbG9zZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaGlkZVByb2dyZXNzUG9wdXAoKTtcbiAgICB9XG5cbiAgICBvbkNhcnRRdHlDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUXR5SW5DYXJ0KCk7XG4gICAgfVxuXG4gICAgc2hvd1Byb2dyZXNzUG9wdXAoKSB7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXBBY3Rpb25zLmFkZENsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICB9XG5cbiAgICBoaWRlUHJvZ3Jlc3NQb3B1cCgpIHtcbiAgICAgICAgdGhpcy4kcHJvZ3Jlc3NQb3B1cEN1cnJlbnQuY3NzKCd3aWR0aCcsIDApO1xuICAgICAgICB0aGlzLiRwcm9ncmVzc1BvcHVwQWN0aW9ucy5hZGRDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICB0aGlzLiRwcm9ncmVzc1BvcHVwLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlUHJvZ3Jlc3NQb3B1cCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NUb3RhbCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXBDdXJyZW50LmNzcygnd2lkdGgnLCBgJHt0aGlzLnByb2dyZXNzQ3VycmVudCAvIHRoaXMucHJvZ3Jlc3NUb3RhbCAqIDEwMH0lYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRwcm9ncmVzc1BvcHVwQ3VycmVudC5jc3MoJ3dpZHRoJywgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93UHJvZ3Jlc3NQb3B1cEFjdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzUG9wdXBBY3Rpb25zLnJlbW92ZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgfVxuXG4gICAgc2hvd1Byb2dyZXNzQmFyKCkge1xuICAgICAgICB0aGlzLiRwcm9ncmVzc0Jhci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgIH1cblxuICAgIGhpZGVQcm9ncmVzc0JhcigpIHtcbiAgICAgICAgdGhpcy4kcHJvZ3Jlc3NCYXIuYWRkQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICB9XG5cbiAgICBvbkFkZEFsbENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbUNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuY29udGV4dC5idWxrT3JkZXJFbnRlclF0eSB8fCAnUGxlYXNlIGVudGVyIHByb2R1Y3QgcXVhbnRpdHknLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQWxsUHJvZHVjdHMoKTtcbiAgICB9XG5cbiAgICBvblByb2R1Y3RBZGRlZChldmVudCwgcHJvZHVjdElkKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZpbmQoYFtkYXRhLWJ1bGtvcmRlci1xdHktaWQ9JyR7cHJvZHVjdElkfSddYCkudmFsKDApO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgIH1cblxuICAgIG9uUXVhbnRpdHlCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgJGlucHV0ID0gJHRhcmdldC5jbG9zZXN0KCdbZGF0YS1xdWFudGl0eS1jaGFuZ2VdJykuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlNaW4gPSBwYXJzZUludCgkaW5wdXQuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBxdWFudGl0eU1heCA9IHBhcnNlSW50KCRpbnB1dC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG5cbiAgICAgICAgbGV0IHF0eSA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSwgMTApO1xuXG4gICAgICAgIC8vIElmIGFjdGlvbiBpcyBpbmNyZW1lbnRpbmdcbiAgICAgICAgaWYgKCR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnKSB7XG4gICAgICAgICAgICAvLyBJZiBxdWFudGl0eSBtYXggb3B0aW9uIGlzIHNldFxuICAgICAgICAgICAgaWYgKHF1YW50aXR5TWF4ID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIHF1YW50aXR5IGRvZXMgbm90IGV4Y2VlZCBtYXhcbiAgICAgICAgICAgICAgICBpZiAoKHF0eSArIDEpIDw9IHF1YW50aXR5TWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHF0eSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcXR5Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocXR5ID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgcXVhbnRpdHkgbWluIG9wdGlvbiBpcyBzZXRcbiAgICAgICAgICAgIGlmIChxdWFudGl0eU1pbiA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBxdWFudGl0eSBkb2VzIG5vdCBmYWxsIGJlbG93IG1pblxuICAgICAgICAgICAgICAgIGlmICgocXR5IC0gMSkgPj0gcXVhbnRpdHlNaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcXR5LS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcXR5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHF0eS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJGlucHV0LnZhbChxdHkpO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XG4gICAgfVxuXG4gICAgb25RdWFudGl0eUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGUoKSB7XG4gICAgICAgIGxldCBmb3JtYXQgPSAnJztcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1idWxrb3JkZXItcXR5LWlkXScpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGVsKTtcbiAgICAgICAgICAgIGNvbnN0IHF0eSA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJGlucHV0LmRhdGEoJ2J1bGtvcmRlclF0eUlkJyk7XG4gICAgICAgICAgICBjb25zdCAkcHJpY2UgPSB0aGlzLiRzY29wZS5maW5kKGBbZGF0YS1idWxrb3JkZXItcHJpY2UtaWQ9JyR7cHJvZHVjdElkfSddYCk7XG4gICAgICAgICAgICBjb25zdCBwcmljZVZhbCA9IHBhcnNlRmxvYXQoJHByaWNlLmRhdGEoJ2J1bGtvcmRlclByaWNlVmFsdWUnKSk7XG4gICAgICAgICAgICBjb25zdCBwcmljZUZtdCA9IGAkeyRwcmljZS5kYXRhKCdidWxrb3JkZXJQcmljZUZvcm1hdHRlZCcpfWA7XG4gICAgICAgICAgICBjb25zdCBzdWJ0b3RhbCA9IE1hdGgucm91bmQocHJpY2VWYWwgKiBxdHkgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgY29uc3QgJHN1YnRvdGFsID0gdGhpcy4kc2NvcGUuZmluZChgW2RhdGEtYnVsa29yZGVyLXN1YnRvdGFsLWlkPScke3Byb2R1Y3RJZH0nXWApO1xuICAgICAgICAgICAgJHN1YnRvdGFsLmh0bWwocHJpY2VGbXQucmVwbGFjZSgvWzAtOS4sXSsvLCBzdWJ0b3RhbCkpO1xuXG4gICAgICAgICAgICBmb3JtYXQgPSBwcmljZUZtdDtcbiAgICAgICAgICAgIHRvdGFsICs9IHN1YnRvdGFsO1xuICAgICAgICAgICAgY291bnQgKz0gcXR5O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLml0ZW1Db3VudCA9IGNvdW50O1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmZpbmQoJ1tkYXRhLWJ1bGtvcmRlci10b3RhbC1jb3VudF0nKS5odG1sKGNvdW50KTtcbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnW2RhdGEtYnVsa29yZGVyLXRvdGFsLWFtb3VudF0nKS5odG1sKGZvcm1hdC5yZXBsYWNlKC9bMC05LixdKy8sIE1hdGgucm91bmQodG90YWwgKiAxMDApIC8gMTAwKSk7XG4gICAgfVxuXG4gICAgYWRkQWxsUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDdXJyZW50ID0gMDtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1idWxrb3JkZXItcXR5LWlkXScpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGVsKTtcbiAgICAgICAgICAgIGNvbnN0IHF0eSA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJGlucHV0LmRhdGEoJ2J1bGtvcmRlclF0eUlkJyk7XG5cbiAgICAgICAgICAgIGlmIChxdHkgPiAwKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NDdXJyZW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NQb3B1cCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkUHJvZHVjdChwcm9kdWN0SWQsIHF0eSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LnZhbCgwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB3YWl0IDFzIGJlZm9yZSBhZGRpbmcgdG8gY2FydCBhIG5ldyBpdGVtIGluIG9yZGVyIHRvIGF2b2lkIHJlcXVlc3QgZmFpbGVkLlxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkZWxheSgxMDAwKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9ncmVzc1RvdGFsID0gcHJvbWlzZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLnNob3dQcm9ncmVzc1BvcHVwKCk7XG4gICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzQmFyKCk7XG5cbiAgICAgICAgcHJvbWlzZVNlcmlhbChwcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9ncmVzc1BvcHVwQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlUXR5SW5DYXJ0KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhcnRDb3VudGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGFkZFByb2R1Y3QocHJvZHVjdElkLCBxdHkpIHtcbiAgICAgICAgLy8gRG8gbm90IGRvIEFKQVggaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgRm9ybURhdGFcbiAgICAgICAgaWYgKHdpbmRvdy5Gb3JtRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Byb2R1Y3RfaWQnLCBwcm9kdWN0SWQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3F0eVtdJywgcXR5KTtcblxuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1BZGQoZm9ybURhdGEsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3I7XG5cbiAgICAgICAgICAgICAgICAvLyBHdWFyZCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmlwIHRoZSBIVE1MIGZyb20gdGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICAgICAgICAgIHRtcC5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQodG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCBwcm9taXNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgIH1cblxuICAgIHVwZGF0ZVF0eUluQ2FydCgpIHtcbiAgICAgICAgJC5nZXQoJy9hcGkvc3RvcmVmcm9udC9jYXJ0JywgZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBxdHlzID0ge307XG5cbiAgICAgICAgICAgIGRhdGFbMF0ubGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHF0eXNbaXRlbS5wcm9kdWN0SWRdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBxdHlzW2l0ZW0ucHJvZHVjdElkXSArPSBpdGVtLnF1YW50aXR5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHF0eXNbaXRlbS5wcm9kdWN0SWRdID0gaXRlbS5xdWFudGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnW2RhdGEtYnVsa29yZGVyLWNhcnQtcXR5LWlkXScsIHRoaXMuJHNjb3BlKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHBhcnNlSW50KCRlbC5kYXRhKCdidWxrb3JkZXJDYXJ0UXR5SWQnKSwgMTApO1xuICAgICAgICAgICAgICAgIGlmIChxdHlzW3Byb2R1Y3RJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsLmh0bWwocXR5c1twcm9kdWN0SWRdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZWwuaHRtbCgnMCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDYXJ0Q291bnRlcigpIHtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q29udGVudCh7IHRlbXBsYXRlOiAnY2FydC9wcmV2aWV3JyB9LCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgY2FydCBjb3VudGVyXG4gICAgICAgICAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICAgICAgICAgIGNvbnN0ICRjYXJ0UXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIHJlc3ApO1xuICAgICAgICAgICAgY29uc3QgJGNhcnRDb3VudGVyID0gJCgnLm5hdlVzZXItYWN0aW9uIC5jYXJ0LWNvdW50Jyk7XG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICRjYXJ0UXVhbnRpdHkuZGF0YSgnY2FydC1xdWFudGl0eScpIHx8IDA7XG5cbiAgICAgICAgICAgICRjYXJ0Q291bnRlci5hZGRDbGFzcygnY2FydC1jb3VudC0tcG9zaXRpdmUnKTtcbiAgICAgICAgICAgICRib2R5LnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1bGtPcmRlckZhY3RvcnkoY29udGV4dCA9IG51bGwsIHNlbGVjdG9yID0gJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJykge1xuICAgIGNvbnN0ICRzZWxlY3RvciA9ICQoc2VsZWN0b3IpO1xuICAgIGxldCBidWxrT3JkZXIgPSAkc2VsZWN0b3IuZGF0YSgnYnVsa09yZGVySW5zdGFuY2UnKTtcblxuICAgIGlmICghKGJ1bGtPcmRlciBpbnN0YW5jZW9mIEJ1bGtPcmRlcikpIHtcbiAgICAgICAgYnVsa09yZGVyID0gbmV3IEJ1bGtPcmRlcihjb250ZXh0LCAkc2VsZWN0b3IpO1xuICAgICAgICAkc2VsZWN0b3IuZGF0YSgnYnVsa09yZGVySW5zdGFuY2UnLCBidWxrT3JkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBidWxrT3JkZXI7XG59XG4iLCJpbXBvcnQgTXVzdGFjaGUgZnJvbSAnbXVzdGFjaGUnO1xuXG5sZXQgc2luZ2xldG9uO1xuXG5jb25zdCBjb21wYXJlTGlzdFRtcGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LXBhbmVsLXdyYXBwZXIgaXMtZW1wdHlcIiBpZD1cInN1cGVybWFya2V0Q29tcGFyZUxpc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LXBhbmVsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtcGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdFwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LWxpc3Q+e3t7cmVuZGVySXRlbXN9fX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwie3tjb21wYXJlX3VybH19XCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0tc21hbGwgYnV0dG9uLS1jb21wYXJlXCIgZGF0YS1jb21wYXJlLXByb2R1Y3QtYnV0dG9uPnt7Y29tcGFyZX19PC9hPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXNlY29uZGFyeSBidXR0b24tLXNtYWxsIGJ1dHRvbi0tY2xlYXJBbGxcIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC1jbGVhcmFsbD57e2NsZWFyX2FsbH19PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tY2xvc2VcIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC10b2dnbGU+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWRvd25cIj48L2k+PHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5DbG9zZTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tb3BlblwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LXRvZ2dsZT48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tdXBcIj48L2k+PHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5PcGVuPC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbmA7XG5cbmNvbnN0IGNvbXBhcmVMaXN0SXRlbVRtcGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LWl0ZW1cIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC1pdGVtPVwie3tpZH19XCI+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdC1pbWdcIiBzcmM9XCJ7e2ltYWdlfX1cIiBhbHQ9XCJ7e2FsdH19XCIgdGl0bGU9XCJ7e2FsdH19XCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtcXVpY2t2aWV3IHF1aWNrdmlld1wiIGRhdGEtcHJvZHVjdC1pZD1cInt7aWR9fVwiPjxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoLXBsdXNcIj48L2k+PHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj57e3F1aWNrX3ZpZXd9fTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdC1yZW1vdmVcIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC1yZW1vdmU9XCJ7e2lkfX1cIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPjxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+e3tyZW1vdmV9fTwvc3Bhbj48L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmNsYXNzIENvbXBhcmVQcm9kdWN0cyB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmFuaW1hdGlvblRpbWUgPSAzMDA7XG4gICAgICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMubG9hZFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSgpIHx8IFtdO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJChNdXN0YWNoZS5yZW5kZXIoY29tcGFyZUxpc3RUbXBsLCB7XG4gICAgICAgICAgICBjb21wYXJlOiBjb250ZXh0LmNvbXBhcmVBZGRvbkxhbmdfY29tcGFyZSxcbiAgICAgICAgICAgIGNsZWFyX2FsbDogY29udGV4dC5jb21wYXJlQWRkb25MYW5nX2NsZWFyX2FsbCxcbiAgICAgICAgICAgIHJlbmRlckl0ZW1zOiAoKSA9PiB0aGlzLnByb2R1Y3RzLm1hcChwcm9kdWN0ID0+IHRoaXMucmVuZGVySXRlbShwcm9kdWN0KSkuam9pbignJyksXG4gICAgICAgIH0pKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmFkZENsYXNzKCdpcy1lbXB0eScpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdpcy1lbXB0eScpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJHNjb3BlKTtcblxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdCA9IHRoaXMuJHNjb3BlLmZpbmQoJ1tkYXRhLWNvbXBhcmUtcHJvZHVjdC1saXN0XScpO1xuICAgICAgICB0aGlzLiRjb21wYXJlQnV0dG9uID0gdGhpcy4kc2NvcGUuZmluZCgnW2RhdGEtY29tcGFyZS1wcm9kdWN0LWJ1dHRvbl0nKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBhcmVVcmwoKTtcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBsb2FkUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21wYXJlUHJvZHVjdHMnKTtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uocyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVQcm9kdWN0c1RvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbXBhcmVQcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvZHVjdHMpKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiRib2R5Lm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCAkZWwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBOdW1iZXIoJGVsLmRhdGEoJ2NvbXBhcmVJZCcpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZHVjdHMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJvZHVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAkZWwuZGF0YSgnY29tcGFyZUltYWdlJyksXG4gICAgICAgICAgICAgICAgICAgIGFsdDogJGVsLmRhdGEoJ2NvbXBhcmVUaXRsZScpLFxuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRzY29wZS5vbignY2xpY2snLCAnW2RhdGEtY29tcGFyZS1wcm9kdWN0LXJlbW92ZV0nLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgJGVsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gTnVtYmVyKCRlbC5kYXRhKCdjb21wYXJlUHJvZHVjdFJlbW92ZScpKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUHJvZHVjdChpZCk7XG5cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnW2RhdGEtY29tcGFyZS1wcm9kdWN0LXRvZ2dsZV0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUudG9nZ2xlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1jb21wYXJlLXByb2R1Y3QtY2xlYXJhbGxdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJBbGxQcm9kdWN0cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRQcm9kdWN0KHByb2R1Y3QpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0cy5wdXNoKHByb2R1Y3QpO1xuICAgICAgICB0aGlzLnNhdmVQcm9kdWN0c1RvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGFyZVVybCgpO1xuXG4gICAgICAgIGNvbnN0ICRlbCA9ICQodGhpcy5yZW5kZXJJdGVtKHByb2R1Y3QpKS5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3QuYXBwZW5kKCRlbCk7XG5cbiAgICAgICAgJGVsLnNob3codGhpcy5hbmltYXRpb25UaW1lLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaXMtZW1wdHknKS5mYWRlSW4odGhpcy5hbmltYXRpb25UaW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUHJvZHVjdChpZCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gdGhpcy5wcm9kdWN0cy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBpZCk7XG4gICAgICAgIHRoaXMuc2F2ZVByb2R1Y3RzVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wYXJlVXJsKCk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gdGhpcy4kc2NvcGUuZmluZChgW2RhdGEtY29tcGFyZS1wcm9kdWN0LWl0ZW09JHtpZH1dYCk7XG4gICAgICAgICRlbC5mYWRlT3V0KHRoaXMuYW5pbWF0aW9uVGltZSwgKCkgPT4ge1xuICAgICAgICAgICAgJGVsLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9kdWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaXMtZW1wdHknKS5mYWRlT3V0KHRoaXMuYW5pbWF0aW9uVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyQWxsUHJvZHVjdHMoKSB7XG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5zYXZlUHJvZHVjdHNUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBhcmVVcmwoKTtcblxuICAgICAgICBjb25zdCAkZWwgPSB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1jb21wYXJlLXByb2R1Y3QtaXRlbV0nKTtcbiAgICAgICAgJGVsLmZhZGVPdXQodGhpcy5hbmltYXRpb25UaW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAkZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaXMtZW1wdHknKS5mYWRlT3V0KHRoaXMuYW5pbWF0aW9uVGltZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbXBhcmVVcmwoKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnByb2R1Y3RzLm1hcChwcm9kdWN0ID0+IHByb2R1Y3QuaWQpLmpvaW4oJy8nKTtcbiAgICAgICAgdGhpcy4kY29tcGFyZUJ1dHRvbi5hdHRyKCdocmVmJywgYCR7dGhpcy5jb250ZXh0LnVybHMuY29tcGFyZX0vJHtwYXRofWApO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW0oaXRlbSkge1xuICAgICAgICByZXR1cm4gTXVzdGFjaGUucmVuZGVyKGNvbXBhcmVMaXN0SXRlbVRtcGwsIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBxdWlja192aWV3OiB0aGlzLmNvbnRleHQuY29tcGFyZUFkZG9uTGFuZ19xdWlja192aWV3LFxuICAgICAgICAgICAgcmVtb3ZlOiB0aGlzLmNvbnRleHQuY29tcGFyZUFkZG9uTGFuZ19yZW1vdmUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGFyZVByb2R1Y3RzKGNvbnRleHQpIHtcbiAgICBpZiAoIXNpbmdsZXRvbikge1xuICAgICAgICBzaW5nbGV0b24gPSBuZXcgQ29tcGFyZVByb2R1Y3RzKGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gc2luZ2xldG9uO1xufVxuIiwiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4uL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1BhZ2UgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgLyogTU9EIGJ5IHBhcGF0aGVtZXMgLSBzdXBlcm1hcmtldFxuICAgICAgICAtLS1cbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xuICAgICAgICAtLS1cbiAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgdXJsLnF1ZXJ5W3BhcmFtLm5hbWVdID0gcGFyYW0udmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICAvKiBFTkQgTU9EICovXG4gICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucGFnZTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lICovIC8vIHBhcGF0aGVtZXMtc3VwZXJtYXJrZXQ6IHF1aWNrZml4IHN0b3Agc3RlbmNpbC11dGlscyBTb3J0QnlIb29rIHN1Ym1pdHRpbmcgdGhlIGZvcm0gd2hlbiBzZWxlY3QgY2hhbmdlZFxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybC5xdWVyeSkgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaG9va3MsIGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbGxhcHNpYmxlJztcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tICcuL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IG5vZCBmcm9tICcuL25vZCc7XG5pbXBvcnQgYWN0aW9uQmFyRmFjdG9yeSBmcm9tICcuLi8uLi9lbXRoZW1lcy1tb2Rlei9hY3Rpb24tYmFyJzsgLy8gUGFwYXRoZW1lcyAtIFN1cGVybWFya2V0XG5cbi8qKlxuICogRmFjZXRlZCBzZWFyY2ggdmlldyBjb21wb25lbnRcbiAqL1xuY2xhc3MgRmFjZXRlZFNlYXJjaCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zIC0gT2JqZWN0IHdpdGggb3B0aW9ucyBmb3IgdGhlIGFqYXggcmVxdWVzdHNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgYWZ0ZXIgZmV0Y2hpbmcgdGVtcGxhdGVzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBDb25maWd1cmFibGUgb3B0aW9uc1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICogICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgKiAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICogICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInXG4gICAgICogICAgIH1cbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogbGV0IHRlbXBsYXRlc0RpZExvYWQgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICogICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAqICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCBmYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIHRlbXBsYXRlc0RpZExvYWQpO1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3RPcHRpb25zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFjY29yZGlvblRvZ2dsZVNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1uYXZpZ2F0aW9uLCAjZmFjZXRlZFNlYXJjaCAuZmFjZXRlZFNlYXJjaC10b2dnbGUnLFxuICAgICAgICAgICAgYmxvY2tlclNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmJsb2NrZXInLFxuICAgICAgICAgICAgY2xlYXJGYWNldFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtY2xlYXJMaW5rJyxcbiAgICAgICAgICAgIGNvbXBvbmVudFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2gtbmF2TGlzdCcsXG4gICAgICAgICAgICBmYWNldE5hdkxpc3RTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5uYXZMaXN0JyxcbiAgICAgICAgICAgIHByaWNlUmFuZ2VFcnJvclNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0taW5saW5lTWVzc2FnZScsXG4gICAgICAgICAgICBwcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIC5mb3JtLWZpZWxkc2V0JyxcbiAgICAgICAgICAgIHByaWNlUmFuZ2VGb3JtU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybScsXG4gICAgICAgICAgICBwcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1heF9wcmljZV0nLFxuICAgICAgICAgICAgcHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1taW5fcHJpY2VdJyxcbiAgICAgICAgICAgIHNob3dNb3JlVG9nZ2xlU2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuYWNjb3JkaW9uLWNvbnRlbnQgLnRvZ2dsZUxpbmsnLFxuICAgICAgICAgICAgZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zOiAnI2ZhY2V0ZWRTZWFyY2gtZmlsdGVySXRlbXMgLmZvcm0taW5wdXQnLFxuICAgICAgICAgICAgbW9kYWw6IG1vZGFsRmFjdG9yeSgnI21vZGFsJylbMF0sXG4gICAgICAgICAgICBtb2RhbE9wZW46IGZhbHNlLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFByaXZhdGUgcHJvcGVydGllc1xuICAgICAgICB0aGlzLnJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5vcHRpb25zID0gXy5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBbXTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gW107XG5cbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZXNcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAgICAgLy8gSW5pdCBwcmljZSB2YWxpZGF0b3JcbiAgICAgICAgdGhpcy5pbml0UHJpY2VWYWxpZGF0b3IoKTtcblxuICAgICAgICAvLyBTaG93IGxpbWl0ZWQgaXRlbXMgYnkgZGVmYXVsdFxuICAgICAgICAkKHRoaXMub3B0aW9ucy5mYWNldE5hdkxpc3RTZWxlY3RvcikuZWFjaCgoaW5kZXgsIG5hdkxpc3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCQobmF2TGlzdCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNYXJrIGluaXRpYWxseSBjb2xsYXBzZWQgYWNjb3JkaW9uc1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvcikuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG5cbiAgICAgICAgICAgIGlmIChjb2xsYXBzaWJsZS5pc0NvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzLnB1c2goY29sbGFwc2libGUudGFyZ2V0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb2xsYXBzZSBhbGwgZmFjZXRzIGlmIGluaXRpYWxseSBoaWRkZW5cbiAgICAgICAgLy8gTk9URTogTmVlZCB0byBleGVjdXRlIGFmdGVyIENvbGxhcHNpYmxlIGdldHMgYm9vdHN0cmFwcGVkXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbXBvbmVudFNlbGVjdG9yKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUFsbEZhY2V0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPYnNlcnZlIHVzZXIgZXZlbnRzXG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZSA9IHRoaXMub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9wU3RhdGUgPSB0aGlzLm9uUG9wU3RhdGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrID0gdGhpcy5vblRvZ2dsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25BY2NvcmRpb25Ub2dnbGUgPSB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbGVhckZhY2V0ID0gdGhpcy5vbkNsZWFyRmFjZXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkZhY2V0Q2xpY2sgPSB0aGlzLm9uRmFjZXRDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUmFuZ2VTdWJtaXQgPSB0aGlzLm9uUmFuZ2VTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5maWx0ZXJGYWNldEl0ZW1zID0gdGhpcy5maWx0ZXJGYWNldEl0ZW1zLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gU3VwZXJtYXJrZXRcbiAgICAgICAgJCgnYm9keScpLm9uZSgnYmVmb3JlbG9hZC5pbnN0YW50bG9hZCcsICgpID0+IHRoaXMudW5iaW5kRXZlbnRzKCkpO1xuICAgIH1cblxuICAgIC8vIFN1cGVybWFya2V0XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWMgbWV0aG9kc1xuICAgIHJlZnJlc2hWaWV3KGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBhY3Rpb25CYXJGYWN0b3J5KCk7IC8vIFBhcGF0aGVtZXMgLSBTdXBlcm1hcmtldFxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpO1xuICAgICAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudHNcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgLy8gU3VwZXJtYXJrZXRcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlVmlld0NhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVWaWV3Q2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3Rvcikuc2hvdygpO1xuXG4gICAgICAgIGFwaS5nZXRQYWdlKHVybFV0aWxzLmdldFVybCgpLCB0aGlzLnJlcXVlc3RPcHRpb25zLCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkKHRoaXMub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZWZyZXNoIHZpZXcgd2l0aCBuZXcgY29udGVudFxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVmlldyhjb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwYW5kRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgLy8gUmVtb3ZlXG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuICAgICAgICBjb25zdCBoYXNNb3JlUmVzdWx0cyA9ICRuYXZMaXN0LmRhdGEoJ2hhc01vcmVSZXN1bHRzJyk7XG5cbiAgICAgICAgaWYgKGhhc01vcmVSZXN1bHRzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLnVuaW9uKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgW2lkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBUb2dnbGUgZGVwZW5kaW5nIG9uIGBjb2xsYXBzZWRgIGZsYWdcbiAgICAgICAgaWYgKF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0TW9yZUZhY2V0UmVzdWx0cygkbmF2TGlzdCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGZhY2V0ID0gJG5hdkxpc3QuZGF0YSgnZmFjZXQnKTtcbiAgICAgICAgY29uc3QgZmFjZXRVcmwgPSB1cmxVdGlscy5nZXRVcmwoKTtcblxuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSkge1xuICAgICAgICAgICAgYXBpLmdldFBhZ2UoZmFjZXRVcmwsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdF9hbGw6IGZhY2V0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWxPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZmlsdGVyRmFjZXRJdGVtcyhldmVudCkge1xuICAgICAgICBjb25zdCAkaXRlbXMgPSAkKCcubmF2TGlzdC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICRpdGVtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9ICQoZWxlbWVudCkudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5vcGVuKCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKSB7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG5cbiAgICAgICAgY29sbGFwc2libGUuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRBbGxGYWNldHMoKSB7XG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xuXG4gICAgICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuICAgIGluaXRQcmljZVZhbGlkYXRvcigpIHtcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gbm9kKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRXJyb3JTZWxlY3RvcixcbiAgICAgICAgICAgIGZpZWxkc2V0U2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBtYXhQcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH07XG5cbiAgICAgICAgVmFsaWRhdG9ycy5zZXRNaW5NYXhQcmljZVZhbGlkYXRpb24odmFsaWRhdG9yLCBzZWxlY3RvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyk7XG5cbiAgICAgICAgdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuICAgIH1cblxuICAgIHJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCkge1xuICAgICAgICBjb25zdCAkbmF2TGlzdHMgPSAkKHRoaXMub3B0aW9ucy5mYWNldE5hdkxpc3RTZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBjb2xsYXBzZWQgc3RhdGUgZm9yIGVhY2ggZmFjZXRcbiAgICAgICAgJG5hdkxpc3RzLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQobmF2TGlzdCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkQ29sbGFwc2UgPSBfLmluY2x1ZGVzKHRoaXMuY29sbGFwc2VkRmFjZXRzLCBpZCk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgLy8gQ2xlYW4tdXBcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcblxuICAgICAgICAvLyBET00gZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vbignc3RhdGVjaGFuZ2UnLCB0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuICAgICAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd0b2dnbGUuY29sbGFwc2libGUnLCB0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25BY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9uKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgICAgICAvLyBIb29rc1xuICAgICAgICBob29rcy5vbignZmFjZXRlZFNlYXJjaC1mYWNldC1jbGlja2VkJywgdGhpcy5vbkZhY2V0Q2xpY2spO1xuICAgICAgICBob29rcy5vbignZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWQnLCB0aGlzLm9uUmFuZ2VTdWJtaXQpO1xuICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgIHVuYmluZEV2ZW50cygpIHtcbiAgICAgICAgLy8gRE9NIGV2ZW50c1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMub3B0aW9ucy5zaG93TW9yZVRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uVG9nZ2xlQ2xpY2spO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9mZignY2xpY2snLCB0aGlzLm9uQ2xlYXJGYWNldCk7XG5cbiAgICAgICAgLy8gSG9va3NcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgICAgIGhvb2tzLm9mZignZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWQnLCB0aGlzLm9uUmFuZ2VTdWJtaXQpO1xuICAgICAgICBob29rcy5vZmYoJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICBvbkNsZWFyRmFjZXQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGxpbmsgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIFVSTFxuICAgICAgICAvKiBNT0QgYnkgcGFwYXRoZW1lcyAtIHN1cGVybWFya2V0XG4gICAgICAgIC0tLVxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gICAgICAgIC0tLVxuICAgICAgICAqL1xuICAgICAgICBjb25zdCB3aW5VcmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBjb25zdCBmYWNldFVybCA9IFVybC5wYXJzZSh1cmwsIHRydWUpO1xuICAgICAgICBpZiAod2luVXJsLnF1ZXJ5Lm1vZGUpIHtcbiAgICAgICAgICAgIGZhY2V0VXJsLnF1ZXJ5Lm1vZGUgPSB3aW5VcmwucXVlcnkubW9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luVXJsLnF1ZXJ5LmxpbWl0KSB7XG4gICAgICAgICAgICBmYWNldFVybC5xdWVyeS5saW1pdCA9IHdpblVybC5xdWVyeS5saW1pdDtcbiAgICAgICAgfVxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogZmFjZXRVcmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyhmYWNldFVybC5xdWVyeSkgfSkpO1xuICAgICAgICAvKiBFTkQgTU9EICovXG4gICAgfVxuXG4gICAgb25Ub2dnbGVDbGljayhldmVudCkge1xuICAgICAgICBjb25zdCAkdG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgJG5hdkxpc3QgPSAkKCR0b2dnbGUuYXR0cignaHJlZicpKTtcblxuICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBpdGVtc1xuICAgICAgICB0aGlzLnRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgIH1cblxuICAgIG9uRmFjZXRDbGljayhldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCAkbGluayA9ICQoY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRsaW5rLnRvZ2dsZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBVUkxcbiAgICAgICAgLyogTU9EIGJ5IHBhcGF0aGVtZXMgLSBzdXBlcm1hcmtldFxuICAgICAgICAtLS1cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuICAgICAgICAtLS1cbiAgICAgICAgKi9cbiAgICAgICAgY29uc3Qgd2luVXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgZmFjZXRVcmwgPSBVcmwucGFyc2UodXJsLCB0cnVlKTtcbiAgICAgICAgaWYgKHdpblVybC5xdWVyeS5tb2RlKSB7XG4gICAgICAgICAgICBmYWNldFVybC5xdWVyeS5tb2RlID0gd2luVXJsLnF1ZXJ5Lm1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpblVybC5xdWVyeS5saW1pdCkge1xuICAgICAgICAgICAgZmFjZXRVcmwucXVlcnkubGltaXQgPSB3aW5VcmwucXVlcnkubGltaXQ7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogZmFjZXRVcmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyhmYWNldFVybC5xdWVyeSkgfSkpO1xuICAgICAgICAvKiBFTkQgTU9EICovXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RhbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgLyogTU9EIGJ5IHBhcGF0aGVtZXMgLSBzdXBlcm1hcmtldFxuICAgICAgICAtLS1cbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xuICAgICAgICAtLS1cbiAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgdXJsLnF1ZXJ5W3BhcmFtLm5hbWVdID0gcGFyYW0udmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICAvKiBFTkQgTU9EICovXG4gICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucGFnZTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgLy8gcGFwYXRoZW1lcy1zdXBlcm1hcmtldDogcXVpY2stZml4ZWQgc3RlbmNpbC11dGlscyBmb3Igc29ydGluZyBhamF4IHJlcXVlc3RcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KSk7XG4gICAgfVxuXG4gICAgb25SYW5nZVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yLmFyZUFsbChub2QuY29uc3RhbnRzLlZBTElEKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogTU9EIGJ5IHBhcGF0aGVtZXMgLSBzdXBlcm1hcmtldFxuICAgICAgICAtLS1cbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBkZWNvZGVVUkkoJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKSk7XG4gICAgICAgIC0tLVxuICAgICAgICAqL1xuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBjb25zdCBxdWVyeVBhcmFtc0FycmF5ID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemVBcnJheSgpO1xuICAgICAgICBxdWVyeVBhcmFtc0FycmF5LmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgdXJsLnF1ZXJ5W3BhcmFtLm5hbWVdID0gcGFyYW0udmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KTtcbiAgICAgICAgLyogRU5EIE1PRCAqL1xuXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwoVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogYD8ke3F1ZXJ5UGFyYW1zfWAgfSkpO1xuICAgIH1cblxuICAgIG9uU3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIG9uQWNjb3JkaW9uVG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuICAgICAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xuXG4gICAgICAgIGlmIChjb2xsYXBzaWJsZS5pc0NvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBfLnVuaW9uKHRoaXMuY29sbGFwc2VkRmFjZXRzLCBbaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRzLCBpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBvcFN0YXRlKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoY3VycmVudFVybCk7XG4gICAgICAgIC8vIElmIHNlYXJjaFBhcmFtcyBkb2VzIG5vdCBjb250YWluIGEgcGFnZSB2YWx1ZSB0aGVuIG1vZGlmeSB1cmwgcXVlcnkgc3RyaW5nIHRvIGhhdmUgcGFnZT0xXG4gICAgICAgIGlmICghc2VhcmNoUGFyYW1zLmhhcygncGFnZScpKSB7XG4gICAgICAgICAgICBjb25zdCBsaW5rVXJsID0gJCgnLnBhZ2luYXRpb24tbGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgIGlmIChsaW5rVXJsKSB7IC8vIFN1cGVybWFya2V0IEZpeCB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBjb25zdCByZSA9IC9wYWdlPVswLTldKy9pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMaW5rVXJsID0gbGlua1VybC5yZXBsYWNlKHJlLCAncGFnZT0xJyk7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXBkYXRlZExpbmtVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdzdGF0ZWNoYW5nZScpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmFjZXRlZFNlYXJjaDtcbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG5cbmNvbnN0IGRlZmF1bHRQYWdlQnVpbGRlclZhbHVlcyA9IHtcbiAgICBwZHBfc2FsZV9iYWRnZV9sYWJlbDogJ09uIFNhbGUhJyxcbiAgICBwZHBfc29sZF9vdXRfbGFiZWw6ICdTb2xkIE91dCcsXG4gICAgJ3BkcC1zYWxlLXByaWNlLWxhYmVsJzogJ05vdzonLFxuICAgICdwZHAtbm9uLXNhbGUtcHJpY2UtbGFiZWwnOiAnV2FzOicsXG4gICAgJ3BkcC1yZXRhaWwtcHJpY2UtbGFiZWwnOiAnTVNSUDonLFxuICAgICdwZHAtY3VzdG9tLWZpZWxkcy10YWItbGFiZWwnOiAnQWRkaXRpb25hbCBJbmZvcm1hdGlvbicsXG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gZm9yIHZhbHVlcyBmcm9tIHBhZ2UgYnVpbGRlciAobG9jYWxseSBjb3VsZCBiZSBmb3VuZCBpbiBjb25maWcuanNvbilcbiAqL1xuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZVBhZ2VCdWlsZGVyVmFsdWVzID0gKCkgPT4ge1xuICAgICQoJ1tkYXRhLXBhZ2UtYnVpbGRlci1rZXldJykuZWFjaCgoXywgc2VsZWN0b3IpID0+IHtcbiAgICAgICAgY29uc3QgJGl0ZW0gPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSAkaXRlbS50ZXh0KCkudHJpbSgpO1xuICAgICAgICBjb25zdCBpdGVtRGVmYXVsdFRyYW5zbGF0aW9uID0gJGl0ZW0uZGF0YSgnZGVmYXVsdC10cmFuc2xhdGlvbicpO1xuXG4gICAgICAgIGlmIChpdGVtVGV4dCA9PT0gZGVmYXVsdFBhZ2VCdWlsZGVyVmFsdWVzWyRpdGVtLmRhdGEoJ3BhZ2UtYnVpbGRlci1rZXknKV0gJiYgaXRlbVRleHQgIT09IGl0ZW1EZWZhdWx0VHJhbnNsYXRpb24pIHtcbiAgICAgICAgICAgICRpdGVtLnRleHQoaXRlbURlZmF1bHRUcmFuc2xhdGlvbik7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJpbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5cbmNvbnN0IHVybFV0aWxzID0ge1xuICAgIGdldFVybDogKCkgPT4gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfSR7d2luZG93LmxvY2F0aW9uLnNlYXJjaH1gLFxuXG4gICAgZ29Ub1VybDogKHVybCkgPT4ge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cmwpO1xuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcbiAgICB9LFxuXG4gICAgcmVwbGFjZVBhcmFtczogKHVybCwgcGFyYW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IFVybC5wYXJzZSh1cmwsIHRydWUpO1xuICAgICAgICBsZXQgcGFyYW07XG5cbiAgICAgICAgLy8gTGV0IHRoZSBmb3JtYXR0ZXIgdXNlIHRoZSBxdWVyeSBvYmplY3QgdG8gYnVpbGQgdGhlIG5ldyB1cmxcbiAgICAgICAgcGFyc2VkLnNlYXJjaCA9IG51bGw7XG5cbiAgICAgICAgZm9yIChwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnF1ZXJ5W3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdXBlcm1hcmtldDogRml4IHVybCBlbmNvZGUgUkZDIDM5ODZcbiAgICAgICAgaWYgKHBhcnNlZC5xdWVyeSkge1xuICAgICAgICAgICAgcGFyc2VkLnNlYXJjaCA9IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcocGFyc2VkLnF1ZXJ5KTtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXJzZWQucXVlcnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gVXJsLmZvcm1hdChwYXJzZWQpO1xuICAgIH0sXG5cbiAgICAvLyBTdXBlcm1hcmtldFxuICAgIHJlbW92ZVBhcmFtczogKHVybCwgcGFyYW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IFVybC5wYXJzZSh1cmwsIHRydWUpO1xuXG4gICAgICAgIC8vIExldCB0aGUgZm9ybWF0dGVyIHVzZSB0aGUgcXVlcnkgb2JqZWN0IHRvIGJ1aWxkIHRoZSBuZXcgdXJsXG4gICAgICAgIHBhcnNlZC5zZWFyY2ggPSBudWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHBhcnNlZC5xdWVyeS5oYXNPd25Qcm9wZXJ0eShwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnF1ZXJ5W3BhcmFtc10gPSBudWxsO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJzZWQucXVlcnlbcGFyYW1zXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZWQucXVlcnkuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5xdWVyeVtwYXJhbV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyc2VkLnF1ZXJ5W3BhcmFtXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN1cGVybWFya2V0OiBGaXggdXJsIGVuY29kZSBSRkMgMzk4NlxuICAgICAgICBpZiAocGFyc2VkLnF1ZXJ5KSB7XG4gICAgICAgICAgICBwYXJzZWQuc2VhcmNoID0gdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyhwYXJzZWQucXVlcnkpO1xuICAgICAgICAgICAgZGVsZXRlIHBhcnNlZC5xdWVyeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBVcmwuZm9ybWF0KHBhcnNlZCk7XG4gICAgfSxcblxuICAgIC8vIHN1cGVybWFya2V0OiBGaXggZmFjZXRlZCB2YWx1ZSBjb250YWlucyBib3RoICsgYW5kIGEgc3BhY2luZyBjaGFyYWN0ZXIgKGllLiBcIkRWRCtSIERMXCIpXG4gICAgZW5jb2RlUGFyYW06ICh2YWwpID0+IGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLnNwbGl0KCclMjAnKS5qb2luKCcrJykucmVwbGFjZSgvWyEnKCkqXS9nLCBjID0+IGAlJHtjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpfWApLFxuXG4gICAgYnVpbGRRdWVyeVN0cmluZzogKHF1ZXJ5RGF0YSkgPT4ge1xuICAgICAgICBsZXQgb3V0ID0gJyc7XG4gICAgICAgIGxldCBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHF1ZXJ5RGF0YSkge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5RGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocXVlcnlEYXRhW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZHg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChuZHggaW4gcXVlcnlEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeURhdGFba2V5XS5oYXNPd25Qcm9wZXJ0eShuZHgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ICs9IGAmJHt1cmxVdGlscy5lbmNvZGVQYXJhbShrZXkpfT0ke3VybFV0aWxzLmVuY29kZVBhcmFtKHF1ZXJ5RGF0YVtrZXldW25keF0pfWA7IC8vIHN1cGVybWFya2V0IG1vZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0ICs9IGAmJHt1cmxVdGlscy5lbmNvZGVQYXJhbShrZXkpfT0ke3VybFV0aWxzLmVuY29kZVBhcmFtKHF1ZXJ5RGF0YVtrZXldKX1gOyAvLyBzdXBlcm1hcmtldCBtb2RcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0LnN1YnN0cmluZygxKTtcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXJsVXRpbHM7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgYXMgYW4gYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC40LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmNhc3RBcnJheSgxKTtcbiAqIC8vID0+IFsxXVxuICpcbiAqIF8uY2FzdEFycmF5KHsgJ2EnOiAxIH0pO1xuICogLy8gPT4gW3sgJ2EnOiAxIH1dXG4gKlxuICogXy5jYXN0QXJyYXkoJ2FiYycpO1xuICogLy8gPT4gWydhYmMnXVxuICpcbiAqIF8uY2FzdEFycmF5KG51bGwpO1xuICogLy8gPT4gW251bGxdXG4gKlxuICogXy5jYXN0QXJyYXkodW5kZWZpbmVkKTtcbiAqIC8vID0+IFt1bmRlZmluZWRdXG4gKlxuICogXy5jYXN0QXJyYXkoKTtcbiAqIC8vID0+IFtdXG4gKlxuICogdmFyIGFycmF5ID0gWzEsIDIsIDNdO1xuICogY29uc29sZS5sb2coXy5jYXN0QXJyYXkoYXJyYXkpID09PSBhcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNhc3RBcnJheSgpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciB2YWx1ZSA9IGFyZ3VtZW50c1swXTtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3RBcnJheTtcbiIsInZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Jhc2VJbmRleE9mJyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluY2x1ZGVzYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIHNwZWNpZnlpbmcgYW4gaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIDApID4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlJbmNsdWRlcztcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhcnJheUluY2x1ZGVzYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGEgY29tcGFyYXRvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXNXaXRoKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlQdXNoO1xuIiwidmFyIFNldENhY2hlID0gcmVxdWlyZSgnLi9fU2V0Q2FjaGUnKSxcbiAgICBhcnJheUluY2x1ZGVzID0gcmVxdWlyZSgnLi9fYXJyYXlJbmNsdWRlcycpLFxuICAgIGFycmF5SW5jbHVkZXNXaXRoID0gcmVxdWlyZSgnLi9fYXJyYXlJbmNsdWRlc1dpdGgnKSxcbiAgICBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgbGlrZSBgXy5kaWZmZXJlbmNlYCB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBleGNsdWRpbmcgbXVsdGlwbGUgYXJyYXlzIG9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gZXhjbHVkZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZURpZmZlcmVuY2UoYXJyYXksIHZhbHVlcywgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHZhbHVlc0xlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG5cbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmIChpdGVyYXRlZSkge1xuICAgIHZhbHVlcyA9IGFycmF5TWFwKHZhbHVlcywgYmFzZVVuYXJ5KGl0ZXJhdGVlKSk7XG4gIH1cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gIH1cbiAgZWxzZSBpZiAodmFsdWVzLmxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIHZhbHVlcyA9IG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA9PSBudWxsID8gdmFsdWUgOiBpdGVyYXRlZSh2YWx1ZSk7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgdmFsdWVzSW5kZXggPSB2YWx1ZXNMZW5ndGg7XG4gICAgICB3aGlsZSAodmFsdWVzSW5kZXgtLSkge1xuICAgICAgICBpZiAodmFsdWVzW3ZhbHVlc0luZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXModmFsdWVzLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRGlmZmVyZW5jZTtcbiIsInZhciBhcnJheVB1c2ggPSByZXF1aXJlKCcuL19hcnJheVB1c2gnKSxcbiAgICBpc0ZsYXR0ZW5hYmxlID0gcmVxdWlyZSgnLi9faXNGbGF0dGVuYWJsZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZsYXR0ZW5gIHdpdGggc3VwcG9ydCBmb3IgcmVzdHJpY3RpbmcgZmxhdHRlbmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gZGVwdGggVGhlIG1heGltdW0gcmVjdXJzaW9uIGRlcHRoLlxuICogQHBhcmFtIHtib29sZWFufSBbcHJlZGljYXRlPWlzRmxhdHRlbmFibGVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgdG8gdmFsdWVzIHRoYXQgcGFzcyBgcHJlZGljYXRlYCBjaGVja3MuXG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0PVtdXSBUaGUgaW5pdGlhbCByZXN1bHQgdmFsdWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBkZXB0aCwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSB8fCAocHJlZGljYXRlID0gaXNGbGF0dGVuYWJsZSk7XG4gIHJlc3VsdCB8fCAocmVzdWx0ID0gW10pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChkZXB0aCA+IDAgJiYgcHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgaWYgKGRlcHRoID4gMSkge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBmbGF0dGVuIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBiYXNlRmxhdHRlbih2YWx1ZSwgZGVwdGggLSAxLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlQdXNoKHJlc3VsdCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmxhdHRlbjtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5hcnk7XG4iLCJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL19TZXRDYWNoZScpLFxuICAgIGFycmF5SW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheUluY2x1ZGVzJyksXG4gICAgYXJyYXlJbmNsdWRlc1dpdGggPSByZXF1aXJlKCcuL19hcnJheUluY2x1ZGVzV2l0aCcpLFxuICAgIGNhY2hlSGFzID0gcmVxdWlyZSgnLi9fY2FjaGVIYXMnKSxcbiAgICBjcmVhdGVTZXQgPSByZXF1aXJlKCcuL19jcmVhdGVTZXQnKSxcbiAgICBzZXRUb0FycmF5ID0gcmVxdWlyZSgnLi9fc2V0VG9BcnJheScpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHNlZW4gPSByZXN1bHQ7XG5cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4gIH1cbiAgZWxzZSBpZiAobGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICB2YXIgc2V0ID0gaXRlcmF0ZWUgPyBudWxsIDogY3JlYXRlU2V0KGFycmF5KTtcbiAgICBpZiAoc2V0KSB7XG4gICAgICByZXR1cm4gc2V0VG9BcnJheShzZXQpO1xuICAgIH1cbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gY2FjaGVIYXM7XG4gICAgc2VlbiA9IG5ldyBTZXRDYWNoZTtcbiAgfVxuICBlbHNlIHtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmIChpc0NvbW1vbiAmJiBjb21wdXRlZCA9PT0gY29tcHV0ZWQpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWluY2x1ZGVzKHNlZW4sIGNvbXB1dGVkLCBjb21wYXJhdG9yKSkge1xuICAgICAgaWYgKHNlZW4gIT09IHJlc3VsdCkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmlxO1xuIiwidmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnLi9fYmFzZUluZGV4T2YnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUluY2x1ZGVzO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub29wO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ByZWFkYWJsZVN5bWJvbCA9IFN5bWJvbCA/IFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmbGF0dGVuYWJsZSBgYXJndW1lbnRzYCBvYmplY3Qgb3IgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZmxhdHRlbmFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNGbGF0dGVuYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpIHx8XG4gICAgISEoc3ByZWFkYWJsZVN5bWJvbCAmJiB2YWx1ZSAmJiB2YWx1ZVtzcHJlYWRhYmxlU3ltYm9sXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGbGF0dGVuYWJsZTtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkFycmF5O1xuIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZU9iamVjdDtcbiIsInZhciBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGJhc2VVbmlxID0gcmVxdWlyZSgnLi9fYmFzZVVuaXEnKSxcbiAgICBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuaXF1ZSB2YWx1ZXMsIGluIG9yZGVyLCBmcm9tIGFsbCBnaXZlbiBhcnJheXMgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0gey4uLkFycmF5fSBbYXJyYXlzXSBUaGUgYXJyYXlzIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBjb21iaW5lZCB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pb24oWzJdLCBbMSwgMl0pO1xuICogLy8gPT4gWzIsIDFdXG4gKi9cbnZhciB1bmlvbiA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFycmF5cykge1xuICByZXR1cm4gYmFzZVVuaXEoYmFzZUZsYXR0ZW4oYXJyYXlzLCAxLCBpc0FycmF5TGlrZU9iamVjdCwgdHJ1ZSkpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pb247XG4iLCJ2YXIgYmFzZURpZmZlcmVuY2UgPSByZXF1aXJlKCcuL19iYXNlRGlmZmVyZW5jZScpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGV4Y2x1ZGluZyBhbGwgZ2l2ZW4gdmFsdWVzIHVzaW5nXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqICoqTm90ZToqKiBVbmxpa2UgYF8ucHVsbGAsIHRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Li4uKn0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBleGNsdWRlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgZmlsdGVyZWQgdmFsdWVzLlxuICogQHNlZSBfLmRpZmZlcmVuY2UsIF8ueG9yXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ud2l0aG91dChbMiwgMSwgMiwgM10sIDEsIDIpO1xuICogLy8gPT4gWzNdXG4gKi9cbnZhciB3aXRob3V0ID0gYmFzZVJlc3QoZnVuY3Rpb24oYXJyYXksIHZhbHVlcykge1xuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QoYXJyYXkpXG4gICAgPyBiYXNlRGlmZmVyZW5jZShhcnJheSwgdmFsdWVzKVxuICAgIDogW107XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB3aXRob3V0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==