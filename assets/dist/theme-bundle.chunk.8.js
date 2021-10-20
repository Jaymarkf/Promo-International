(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./assets/js/emthemes-modez/instant-load.js":
/*!**************************************************!*\
  !*** ./assets/js/emthemes-modez/instant-load.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/size */ "./node_modules/lodash/size.js");
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_size__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_delay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/delay */ "./node_modules/lodash/delay.js");
/* harmony import */ var lodash_delay__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_delay__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _theme_global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _theme_common_product_details__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../theme/common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.min.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _theme_global_foundation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../theme/global/foundation */ "./assets/js/theme/global/foundation.js");
/* harmony import */ var _theme_common_collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../theme/common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _theme_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./theme-utils */ "./assets/js/emthemes-modez/theme-utils.js");




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var isTouchDevice = Object(_theme_utils__WEBPACK_IMPORTED_MODULE_9__["checkTouchDevice"])();
var history = window.history;
var Preloader = {
  cache: {},
  cacheLimit: 100,
  loading: {},

  /**
   * Wait until no other the same url loading
   * @param {String} cacheKey
   */
  waitLoading: function waitLoading(cacheKey) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (Preloader.loading[cacheKey]) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return new Promise(function (resolve) {
                var check = function check() {
                  if (!Preloader.loading[cacheKey]) {
                    resolve();
                  } else {
                    lodash_delay__WEBPACK_IMPORTED_MODULE_2___default()(check, 300);
                  }
                };

                check();
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * @param {Function} request Promise function
   * @param {String} cacheKey
   * @return {Promise}
   */
  load: function load(request, cacheKey) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.waitLoading(cacheKey);

            case 2:
              if (!Preloader.getCache(cacheKey)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", Preloader.getCache(cacheKey));

            case 4:
              Preloader.loading[cacheKey] = true;
              _context2.prev = 5;
              _context2.next = 8;
              return request();

            case 8:
              response = _context2.sent;
              Preloader.saveCache(response, cacheKey);
              delete Preloader.loading[cacheKey];
              return _context2.abrupt("return", response);

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](5);
              delete Preloader.loading[cacheKey];
              throw _context2.t0;

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[5, 14]]);
    }))();
  },
  getCache: function getCache(cacheKey) {
    if (cacheKey && Preloader.cache[cacheKey]) {
      return Preloader.cache[cacheKey];
    }

    return null;
  },
  saveCache: function saveCache(data, cacheKey) {
    if (cacheKey) {
      if (lodash_size__WEBPACK_IMPORTED_MODULE_1___default()(Preloader.cache) >= Preloader.cacheLimit) {
        for (var k in Preloader.cache) {
          if (Preloader.cache.hasOwnProperty(k)) {
            delete Preloader.cache[k];
            break;
          }
        }
      }

      Preloader.cache[cacheKey] = data;
    }
  }
};

var InstantQuickView = /*#__PURE__*/function () {
  function InstantQuickView(context) {
    this.context = context;
    this.modal = Object(_theme_global_modal__WEBPACK_IMPORTED_MODULE_4__["defaultModal"])();
    this.onMouseEnterOrClick = this.onMouseEnterOrClick.bind(this);
    this.unbindEvents();
    this.bindEvents();
  }
  /**
   * Load a product quickview content
   * @param {String} productId
   * @return {Promise}
   */


  var _proto = InstantQuickView.prototype;

  _proto.loadProduct = function loadProduct(productId) {
    var request = function request() {
      return new Promise(function (resolve, reject) {
        _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.product.getById(productId, {
          template: 'products/quick-view'
        }, function (err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    };

    return Preloader.load(request, "quick-view|" + productId);
  };

  _proto.onMouseEnterOrClick = function onMouseEnterOrClick(event) {
    var _this2 = this;

    event.preventDefault();
    var $el = $(event.currentTarget);

    if (event.type === 'click') {
      this.modal.open({
        size: 'large'
      });
    }

    this.loadProduct($el.data('productId')).then(function (response) {
      if (event.type === 'click') {
        _this2.modal.updateContent(response);

        _this2.modal.$content.find('.productView').addClass('productView--quickView');

        _this2.modal.$content.find('[data-slick]').slick();

        Object(_theme_utils__WEBPACK_IMPORTED_MODULE_9__["loadRemoteBanners"])(_this2.context, _this2.modal.$content);

        lodash_delay__WEBPACK_IMPORTED_MODULE_2___default()(function () {
          var $quickView = _this2.modal.$content.find('.quickView');

          var product;

          if ($('[data-also-bought] .productView-alsoBought-item', $quickView).length > 0) {
            product = new _theme_common_product_details__WEBPACK_IMPORTED_MODULE_5__["default"]($quickView, lodash_extend__WEBPACK_IMPORTED_MODULE_0___default()(_this2.context, {
              enableAlsoBought: true
            }));
          } else {
            product = new _theme_common_product_details__WEBPACK_IMPORTED_MODULE_5__["default"]($quickView, _this2.context);
          }

          $('body').trigger('loaded.quickview', [product]);
          return product;
        }, 200);

        if (window.addthis && typeof window.addthis.toolbox === 'function') {
          window.addthis.toolbox('.addthis_toolbox');
        }
      }
    });
  };

  _proto.bindEvents = function bindEvents() {
    $('body').on('mouseenter click', '.quickview, .quickview-alt', this.onMouseEnterOrClick);
  };

  _proto.unbindEvents = function unbindEvents() {
    $('body').off('mouseenter click', '.quickview, .quickview-alt', this.onMouseEnterOrClick);
  };

  return InstantQuickView;
}();

var InstantLoad = /*#__PURE__*/function () {
  function InstantLoad(context) {
    // Won't init on touch screen
    if (isTouchDevice) {
      return;
    }

    this.context = context;
    this.$head = $('head');
    this.$body = $('body');
    this.$pageBody = $('.body').first();
    this.onMouseEnterOrClick = this.onMouseEnterOrClick.bind(this);
    this.onLoadPageManually = this.onLoadPageManually.bind(this);
    this.onPopstate = this.onPopstate.bind(this);

    if (!history.state) {
      history.replaceState({
        instantload: true,
        pageType: this.context.pageType
      }, document.title, window.location);
    }

    this.unbindEvents();
    this.bindEvents();
  }

  var _proto2 = InstantLoad.prototype;

  _proto2.initGlobal = function initGlobal($scope) {
    Object(_theme_global_foundation__WEBPACK_IMPORTED_MODULE_7__["default"])($(document));
    Object(_theme_common_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])('[data-collapsible]', {
      $context: $scope
    });
    $('[data-slick]', $scope).slick();

    if (window.addthis && typeof window.addthis.toolbox === 'function') {
      window.addthis.toolbox('.addthis_toolbox');
    }
  };

  _proto2.redirect = function redirect(url) {
    window.location = url;
  };

  _proto2.isUnsupportedPage = function isUnsupportedPage(response) {
    return response.trim() === 'UNSUPPORTED' || !$(response).first().is('#instantload-html-element');
  };

  _proto2.loadPage = function loadPage(url, show, pushState, pageType) {
    var _this3 = this;

    if (show) {
      this.$pageBody.addClass('instantload-loading');
    }

    if (pushState) {
      try {
        history.pushState({
          instantload: true,
          pageType: this.context.pageType
        }, null, url);
      } catch (e) {
        if (show) {
          return this.redirect(url);
        }

        return;
      }
    }

    var config;

    if (pageType === 'home') {
      config = {
        carousel: this.context.themeSettings.homepage_show_carousel,
        products: {
          new: {
            limit: this.context.themeSettings.specialProductsTab_init_count
          },
          featured: {
            limit: this.context.themeSettings.specialProductsTab_init_count
          },
          top_sellers: {
            limit: this.context.themeSettings.specialProductsTab_init_count
          }
        },
        blog: {
          recent_posts: {
            limit: this.context.themeSettings.homepage_blog_posts_count
          }
        },
        customer: {
          recently_viewed_products: {
            limit: this.context.themeSettings.product_recently_viewed
          }
        },
        shop_by_brand: {
          limit: this.context.themeSettings.max_shop_by_brand
        },
        categories: true,
        cart: true
      };
    } else {
      config = {
        product: {
          videos: {
            limit: this.context.themeSettings.productpage_videos_count
          },
          reviews: {
            limit: this.context.themeSettings.productpage_reviews_count
          },
          related_products: {
            limit: this.context.themeSettings.productpage_related_products_count
          },
          similar_by_views: {
            limit: this.context.themeSettings.productpage_similar_by_views_count
          }
        },
        category: {
          shop_by_price: true,
          products: {
            limit: this.context.themeSettings.categorypage_products_per_page
          }
        },
        blog: {
          posts: {
            limit: 5,
            pages: 3,
            summary: 500
          },
          recent_posts: {
            limit: this.context.themeSettings.homepage_blog_posts_count
          }
        },
        products: {
          new: {
            limit: 5
          }
        },
        brands: {
          limit: 100
        },
        brand: {
          products: {
            limit: this.context.themeSettings.brandpage_products_per_page
          }
        },
        shop_by_brand: {
          limit: 9
        },
        customer: {
          recently_viewed_products: {
            limit: this.context.themeSettings.product_recently_viewed
          }
        },
        categories: true,
        cart: true
      };
    }

    var request = function request() {
      return new Promise(function (resolve, reject) {
        _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.getPage(url, {
          config: config
        }, function (err, response) {
          if (err || !response) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    };

    Preloader.load(request, "loadPage|" + url).then(function (response) {
      if (show) {
        if (_this3.isUnsupportedPage(response)) {
          return _this3.redirect(url);
        }

        _this3.$body.trigger('beforeload.instantload', [response]);

        var $response = $(response);
        var $respBody = $response.find('#instantload-body-element');
        $('html, body').scrollTop(0); // Remove the previous appended <head>'s child tags

        _this3.$head.children().each(function (i, el) {
          var $elm = $(el);

          if ($elm.is('[data-instantload-head-dynamic]')) {
            $elm.remove();
          }
        }); // Remove title, meta[property] ...


        _this3.$head.children('title, meta[property], link[rel=amphtml], link[rel=canonical]').remove(); // Append new <head>'s child tags


        $response.find('#instantload-head-element').children().each(function (i, el) {
          var $elm = $(el);
          $elm.attr('data-instantload-head-dynamic', '');

          _this3.$head.append($elm);
        }); // Replace <body>'s classes

        _this3.$body.attr('class', $respBody.attr('class')); // Replace '.body' element


        var $pageBody = $response.find('#instantload-page-body');

        if ($pageBody.length > 0) {
          _this3.$pageBody.empty().append($pageBody.children());

          _this3.initGlobal(_this3.$pageBody);
        } // Replace top & bottom banners


        _this3.$body.find('[data-banner-location=top]').empty().append($response.find('#instantload-banners-top').children());

        _this3.$body.find('[data-banner-location=bottom]').empty().append($response.find('#instantload-banners-bottom').children()); // Remove and append the new script #instantload-script


        _this3.$body.find('#instantload-script').remove();

        _this3.$body.append($response.find('#instantload-script')); // Remove and append new elements match [data-instantload-body-dynamic]
        // Useful for loading third-party scripts


        _this3.$body.children('[data-instantload-body-dynamic]').remove();

        _this3.$body.append($respBody.children('[data-instantload-body-dynamic]'));

        _this3.$pageBody.removeClass('instantload-loading').addClass('instantload-loaded');

        lodash_delay__WEBPACK_IMPORTED_MODULE_2___default()(function () {
          return _this3.$pageBody.removeClass('instantload-loaded');
        }, 300);

        _this3.$body.trigger('loaded.instantload', [response]);
      }
    }).catch(function () {
      if (show) {
        return _this3.redirect(url);
      }
    });
  };

  _proto2.onMouseEnterOrClick = function onMouseEnterOrClick(event) {
    event.preventDefault();
    var $el = $(event.currentTarget);
    var data = $el.data('instantload');
    var url = (typeof data === 'object' ? data.url : null) || $el.data('instantloadUrl') || $el.prop('href');
    var pageType = typeof data === 'object' ? data.page : null;

    if (!url) {
      return;
    }

    this.loadPage(url, event.type === 'click', event.type === 'click', pageType);
  };

  _proto2.onPopstate = function onPopstate() {
    // console.log('onPopstate - state:', history.state);
    if (!history.state) {
      return;
    } // console.log(history);


    if (history.state.instantload) {
      this.loadPage(window.location, true, false, history.state.pageType);
    } else {
      // Unsupported pages instantly at this stage - reload it
      window.location.reload();
    }
  };

  _proto2.onLoadPageManually = function onLoadPageManually(event, url, eventType, pageType) {
    if (eventType === void 0) {
      eventType = '';
    }

    if (pageType === void 0) {
      pageType = null;
    }

    this.loadPage(url, eventType === 'click', eventType === 'click', pageType);
  };

  _proto2.bindEvents = function bindEvents() {
    $('body, [data-menu]').on('mouseenter click', '[data-instantload], [data-instantload-url]', this.onMouseEnterOrClick);
    $('body').on('loadPage.instantload', this.onLoadPageManually);
    $(window).on('popstate', this.onPopstate);
  };

  _proto2.unbindEvents = function unbindEvents() {
    $('body, [data-menu]').off('mouseenter click', '[data-instantload], [data-instantload-url]', this.onMouseEnterOrClick);
    $('body').off('loadPage.instantload', this.onLoadPageManually);
    $(window).off('popstate', this.onPopstate);
  };

  return InstantLoad;
}();

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  // eslint-disable-next-line no-new
  new InstantQuickView(context); // eslint-disable-next-line no-new

  new InstantLoad(context);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./node_modules/lodash/_asciiSize.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_asciiSize.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(/*! ./_baseProperty */ "./node_modules/lodash/_baseProperty.js");

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize = baseProperty('length');

module.exports = asciiSize;


/***/ }),

/***/ "./node_modules/lodash/_baseDelay.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseDelay.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.delay` and `_.defer` which accepts `args`
 * to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Array} args The arguments to provide to `func`.
 * @returns {number|Object} Returns the timer id or timeout object.
 */
function baseDelay(func, wait, args) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, args); }, wait);
}

module.exports = baseDelay;


/***/ }),

/***/ "./node_modules/lodash/_baseProperty.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseProperty.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ "./node_modules/lodash/_hasUnicode.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hasUnicode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),

/***/ "./node_modules/lodash/_stringSize.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stringSize.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var asciiSize = __webpack_require__(/*! ./_asciiSize */ "./node_modules/lodash/_asciiSize.js"),
    hasUnicode = __webpack_require__(/*! ./_hasUnicode */ "./node_modules/lodash/_hasUnicode.js"),
    unicodeSize = __webpack_require__(/*! ./_unicodeSize */ "./node_modules/lodash/_unicodeSize.js");

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string)
    ? unicodeSize(string)
    : asciiSize(string);
}

module.exports = stringSize;


/***/ }),

/***/ "./node_modules/lodash/_unicodeSize.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_unicodeSize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    ++result;
  }
  return result;
}

module.exports = unicodeSize;


/***/ }),

/***/ "./node_modules/lodash/delay.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/delay.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseDelay = __webpack_require__(/*! ./_baseDelay */ "./node_modules/lodash/_baseDelay.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) {
 *   console.log(text);
 * }, 1000, 'later');
 * // => Logs 'later' after one second.
 */
var delay = baseRest(function(func, wait, args) {
  return baseDelay(func, toNumber(wait) || 0, args);
});

module.exports = delay;


/***/ }),

/***/ "./node_modules/lodash/isString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ "./node_modules/lodash/size.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/size.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isString = __webpack_require__(/*! ./isString */ "./node_modules/lodash/isString.js"),
    stringSize = __webpack_require__(/*! ./_stringSize */ "./node_modules/lodash/_stringSize.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length;
  }
  var tag = getTag(collection);
  if (tag == mapTag || tag == setTag) {
    return collection.size;
  }
  return baseKeys(collection).length;
}

module.exports = size;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovaW5zdGFudC1sb2FkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FzY2lpU2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRGVsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc1VuaWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nU2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL191bmljb2RlU2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2RlbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9zaXplLmpzIl0sIm5hbWVzIjpbImlzVG91Y2hEZXZpY2UiLCJjaGVja1RvdWNoRGV2aWNlIiwiaGlzdG9yeSIsIndpbmRvdyIsIlByZWxvYWRlciIsImNhY2hlIiwiY2FjaGVMaW1pdCIsImxvYWRpbmciLCJ3YWl0TG9hZGluZyIsImNhY2hlS2V5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaGVjayIsImxvYWQiLCJyZXF1ZXN0IiwiZ2V0Q2FjaGUiLCJyZXNwb25zZSIsInNhdmVDYWNoZSIsImRhdGEiLCJrIiwiaGFzT3duUHJvcGVydHkiLCJJbnN0YW50UXVpY2tWaWV3IiwiY29udGV4dCIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwib25Nb3VzZUVudGVyT3JDbGljayIsImJpbmQiLCJ1bmJpbmRFdmVudHMiLCJiaW5kRXZlbnRzIiwibG9hZFByb2R1Y3QiLCJwcm9kdWN0SWQiLCJyZWplY3QiLCJ1dGlscyIsImFwaSIsInByb2R1Y3QiLCJnZXRCeUlkIiwidGVtcGxhdGUiLCJlcnIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJGVsIiwiJCIsImN1cnJlbnRUYXJnZXQiLCJ0eXBlIiwib3BlbiIsInNpemUiLCJ0aGVuIiwidXBkYXRlQ29udGVudCIsIiRjb250ZW50IiwiZmluZCIsImFkZENsYXNzIiwic2xpY2siLCJsb2FkUmVtb3RlQmFubmVycyIsIiRxdWlja1ZpZXciLCJsZW5ndGgiLCJQcm9kdWN0RGV0YWlscyIsImVuYWJsZUFsc29Cb3VnaHQiLCJ0cmlnZ2VyIiwiYWRkdGhpcyIsInRvb2xib3giLCJvbiIsIm9mZiIsIkluc3RhbnRMb2FkIiwiJGhlYWQiLCIkYm9keSIsIiRwYWdlQm9keSIsImZpcnN0Iiwib25Mb2FkUGFnZU1hbnVhbGx5Iiwib25Qb3BzdGF0ZSIsInN0YXRlIiwicmVwbGFjZVN0YXRlIiwiaW5zdGFudGxvYWQiLCJwYWdlVHlwZSIsImRvY3VtZW50IiwidGl0bGUiLCJsb2NhdGlvbiIsImluaXRHbG9iYWwiLCIkc2NvcGUiLCJmb3VuZGF0aW9uIiwiY29sbGFwc2libGVGYWN0b3J5IiwiJGNvbnRleHQiLCJyZWRpcmVjdCIsInVybCIsImlzVW5zdXBwb3J0ZWRQYWdlIiwidHJpbSIsImlzIiwibG9hZFBhZ2UiLCJzaG93IiwicHVzaFN0YXRlIiwiZSIsImNvbmZpZyIsImNhcm91c2VsIiwidGhlbWVTZXR0aW5ncyIsImhvbWVwYWdlX3Nob3dfY2Fyb3VzZWwiLCJwcm9kdWN0cyIsIm5ldyIsImxpbWl0Iiwic3BlY2lhbFByb2R1Y3RzVGFiX2luaXRfY291bnQiLCJmZWF0dXJlZCIsInRvcF9zZWxsZXJzIiwiYmxvZyIsInJlY2VudF9wb3N0cyIsImhvbWVwYWdlX2Jsb2dfcG9zdHNfY291bnQiLCJjdXN0b21lciIsInJlY2VudGx5X3ZpZXdlZF9wcm9kdWN0cyIsInByb2R1Y3RfcmVjZW50bHlfdmlld2VkIiwic2hvcF9ieV9icmFuZCIsIm1heF9zaG9wX2J5X2JyYW5kIiwiY2F0ZWdvcmllcyIsImNhcnQiLCJ2aWRlb3MiLCJwcm9kdWN0cGFnZV92aWRlb3NfY291bnQiLCJyZXZpZXdzIiwicHJvZHVjdHBhZ2VfcmV2aWV3c19jb3VudCIsInJlbGF0ZWRfcHJvZHVjdHMiLCJwcm9kdWN0cGFnZV9yZWxhdGVkX3Byb2R1Y3RzX2NvdW50Iiwic2ltaWxhcl9ieV92aWV3cyIsInByb2R1Y3RwYWdlX3NpbWlsYXJfYnlfdmlld3NfY291bnQiLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJjYXRlZ29yeXBhZ2VfcHJvZHVjdHNfcGVyX3BhZ2UiLCJwb3N0cyIsInBhZ2VzIiwic3VtbWFyeSIsImJyYW5kcyIsImJyYW5kIiwiYnJhbmRwYWdlX3Byb2R1Y3RzX3Blcl9wYWdlIiwiZ2V0UGFnZSIsIiRyZXNwb25zZSIsIiRyZXNwQm9keSIsInNjcm9sbFRvcCIsImNoaWxkcmVuIiwiZWFjaCIsImkiLCJlbCIsIiRlbG0iLCJyZW1vdmUiLCJhdHRyIiwiYXBwZW5kIiwiZW1wdHkiLCJyZW1vdmVDbGFzcyIsImNhdGNoIiwicHJvcCIsInBhZ2UiLCJyZWxvYWQiLCJldmVudFR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsYUFBYSxHQUFHQyxxRUFBZ0IsRUFBdEM7QUFDQSxJQUFNQyxPQUFPLEdBQUdDLE1BQU0sQ0FBQ0QsT0FBdkI7QUFDQSxJQUFNRSxTQUFTLEdBQUc7QUFDZEMsT0FBSyxFQUFFLEVBRE87QUFFZEMsWUFBVSxFQUFFLEdBRkU7QUFHZEMsU0FBTyxFQUFFLEVBSEs7O0FBS2Q7QUFDSjtBQUNBO0FBQ0E7QUFDVUMsYUFUUSx1QkFTSUMsUUFUSixFQVNjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNuQkwsU0FBUyxDQUFDRyxPQUFWLENBQWtCRSxRQUFsQixDQURtQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay44LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwgfSBmcm9tICcuLi90aGVtZS9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4uL3RoZW1lL2NvbW1vbi9wcm9kdWN0LWRldGFpbHMnO1xuaW1wb3J0ICdzbGljay1jYXJvdXNlbCc7XG5pbXBvcnQgZm91bmRhdGlvbiBmcm9tICcuLi90aGVtZS9nbG9iYWwvZm91bmRhdGlvbic7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4uL3RoZW1lL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgeyBjaGVja1RvdWNoRGV2aWNlLCBsb2FkUmVtb3RlQmFubmVycyB9IGZyb20gJy4vdGhlbWUtdXRpbHMnO1xuXG5jb25zdCBpc1RvdWNoRGV2aWNlID0gY2hlY2tUb3VjaERldmljZSgpO1xuY29uc3QgaGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuY29uc3QgUHJlbG9hZGVyID0ge1xuICAgIGNhY2hlOiB7fSxcbiAgICBjYWNoZUxpbWl0OiAxMDAsXG4gICAgbG9hZGluZzoge30sXG5cbiAgICAvKipcbiAgICAgKiBXYWl0IHVudGlsIG5vIG90aGVyIHRoZSBzYW1lIHVybCBsb2FkaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNhY2hlS2V5XG4gICAgICovXG4gICAgYXN5bmMgd2FpdExvYWRpbmcoY2FjaGVLZXkpIHtcbiAgICAgICAgaWYgKCFQcmVsb2FkZXIubG9hZGluZ1tjYWNoZUtleV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hlY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFQcmVsb2FkZXIubG9hZGluZ1tjYWNoZUtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGVsYXkoY2hlY2ssIDMwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXF1ZXN0IFByb21pc2UgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2FjaGVLZXlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGFzeW5jIGxvYWQocmVxdWVzdCwgY2FjaGVLZXkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgICBhd2FpdCB0aGlzLndhaXRMb2FkaW5nKGNhY2hlS2V5KTtcblxuICAgICAgICBpZiAoUHJlbG9hZGVyLmdldENhY2hlKGNhY2hlS2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIFByZWxvYWRlci5nZXRDYWNoZShjYWNoZUtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBQcmVsb2FkZXIubG9hZGluZ1tjYWNoZUtleV0gPSB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3QoKTtcbiAgICAgICAgICAgIFByZWxvYWRlci5zYXZlQ2FjaGUocmVzcG9uc2UsIGNhY2hlS2V5KTtcbiAgICAgICAgICAgIGRlbGV0ZSBQcmVsb2FkZXIubG9hZGluZ1tjYWNoZUtleV07XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBQcmVsb2FkZXIubG9hZGluZ1tjYWNoZUtleV07XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldENhY2hlKGNhY2hlS2V5KSB7XG4gICAgICAgIGlmIChjYWNoZUtleSAmJiBQcmVsb2FkZXIuY2FjaGVbY2FjaGVLZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJlbG9hZGVyLmNhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgc2F2ZUNhY2hlKGRhdGEsIGNhY2hlS2V5KSB7XG4gICAgICAgIGlmIChjYWNoZUtleSkge1xuICAgICAgICAgICAgaWYgKF8uc2l6ZShQcmVsb2FkZXIuY2FjaGUpID49IFByZWxvYWRlci5jYWNoZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrIGluIFByZWxvYWRlci5jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoUHJlbG9hZGVyLmNhY2hlLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgUHJlbG9hZGVyLmNhY2hlW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBQcmVsb2FkZXIuY2FjaGVbY2FjaGVLZXldID0gZGF0YTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5jbGFzcyBJbnN0YW50UXVpY2tWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMubW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXJPckNsaWNrID0gdGhpcy5vbk1vdXNlRW50ZXJPckNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBwcm9kdWN0IHF1aWNrdmlldyBjb250ZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb2R1Y3RJZFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgbG9hZFByb2R1Y3QocHJvZHVjdElkKSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKHByb2R1Y3RJZCwgeyB0ZW1wbGF0ZTogJ3Byb2R1Y3RzL3F1aWNrLXZpZXcnIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcmVsb2FkZXIubG9hZChyZXF1ZXN0LCBgcXVpY2stdmlld3wke3Byb2R1Y3RJZH1gKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRW50ZXJPckNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwub3Blbih7IHNpemU6ICdsYXJnZScgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRQcm9kdWN0KCRlbC5kYXRhKCdwcm9kdWN0SWQnKSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLiRjb250ZW50LmZpbmQoJy5wcm9kdWN0VmlldycpLmFkZENsYXNzKCdwcm9kdWN0Vmlldy0tcXVpY2tWaWV3Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC4kY29udGVudC5maW5kKCdbZGF0YS1zbGlja10nKS5zbGljaygpO1xuICAgICAgICAgICAgICAgIGxvYWRSZW1vdGVCYW5uZXJzKHRoaXMuY29udGV4dCwgdGhpcy5tb2RhbC4kY29udGVudCk7XG4gICAgICAgICAgICAgICAgXy5kZWxheSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRxdWlja1ZpZXcgPSB0aGlzLm1vZGFsLiRjb250ZW50LmZpbmQoJy5xdWlja1ZpZXcnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3Q7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKCdbZGF0YS1hbHNvLWJvdWdodF0gLnByb2R1Y3RWaWV3LWFsc29Cb3VnaHQtaXRlbScsICRxdWlja1ZpZXcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3QgPSBuZXcgUHJvZHVjdERldGFpbHMoJHF1aWNrVmlldywgXy5leHRlbmQodGhpcy5jb250ZXh0LCB7IGVuYWJsZUFsc29Cb3VnaHQ6IHRydWUgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdCA9IG5ldyBQcm9kdWN0RGV0YWlscygkcXVpY2tWaWV3LCB0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdsb2FkZWQucXVpY2t2aWV3JywgW3Byb2R1Y3RdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3Q7XG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmFkZHRoaXMgJiYgdHlwZW9mIHdpbmRvdy5hZGR0aGlzLnRvb2xib3ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZHRoaXMudG9vbGJveCgnLmFkZHRoaXNfdG9vbGJveCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgJCgnYm9keScpLm9uKCdtb3VzZWVudGVyIGNsaWNrJywgJy5xdWlja3ZpZXcsIC5xdWlja3ZpZXctYWx0JywgdGhpcy5vbk1vdXNlRW50ZXJPckNsaWNrKTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgICQoJ2JvZHknKS5vZmYoJ21vdXNlZW50ZXIgY2xpY2snLCAnLnF1aWNrdmlldywgLnF1aWNrdmlldy1hbHQnLCB0aGlzLm9uTW91c2VFbnRlck9yQ2xpY2spO1xuICAgIH1cbn1cblxuY2xhc3MgSW5zdGFudExvYWQge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgLy8gV29uJ3QgaW5pdCBvbiB0b3VjaCBzY3JlZW5cbiAgICAgICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuJGhlYWQgPSAkKCdoZWFkJyk7XG4gICAgICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgIHRoaXMuJHBhZ2VCb2R5ID0gJCgnLmJvZHknKS5maXJzdCgpO1xuXG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyT3JDbGljayA9IHRoaXMub25Nb3VzZUVudGVyT3JDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uTG9hZFBhZ2VNYW51YWxseSA9IHRoaXMub25Mb2FkUGFnZU1hbnVhbGx5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qb3BzdGF0ZSA9IHRoaXMub25Qb3BzdGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGlmICghaGlzdG9yeS5zdGF0ZSkge1xuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBpbnN0YW50bG9hZDogdHJ1ZSwgcGFnZVR5cGU6IHRoaXMuY29udGV4dC5wYWdlVHlwZSB9LCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGluaXRHbG9iYWwoJHNjb3BlKSB7XG4gICAgICAgIGZvdW5kYXRpb24oJChkb2N1bWVudCkpO1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHsgJGNvbnRleHQ6ICRzY29wZSB9KTtcbiAgICAgICAgJCgnW2RhdGEtc2xpY2tdJywgJHNjb3BlKS5zbGljaygpO1xuICAgICAgICBpZiAod2luZG93LmFkZHRoaXMgJiYgdHlwZW9mIHdpbmRvdy5hZGR0aGlzLnRvb2xib3ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGR0aGlzLnRvb2xib3goJy5hZGR0aGlzX3Rvb2xib3gnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZGlyZWN0KHVybCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB1cmw7XG4gICAgfVxuXG4gICAgaXNVbnN1cHBvcnRlZFBhZ2UocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRyaW0oKSA9PT0gJ1VOU1VQUE9SVEVEJyB8fCAhJChyZXNwb25zZSkuZmlyc3QoKS5pcygnI2luc3RhbnRsb2FkLWh0bWwtZWxlbWVudCcpO1xuICAgIH1cblxuICAgIGxvYWRQYWdlKHVybCwgc2hvdywgcHVzaFN0YXRlLCBwYWdlVHlwZSkge1xuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgdGhpcy4kcGFnZUJvZHkuYWRkQ2xhc3MoJ2luc3RhbnRsb2FkLWxvYWRpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwdXNoU3RhdGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoeyBpbnN0YW50bG9hZDogdHJ1ZSwgcGFnZVR5cGU6IHRoaXMuY29udGV4dC5wYWdlVHlwZSB9LCBudWxsLCB1cmwpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlyZWN0KHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb25maWc7XG4gICAgICAgIGlmIChwYWdlVHlwZSA9PT0gJ2hvbWUnKSB7XG4gICAgICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgY2Fyb3VzZWw6IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVwYWdlX3Nob3dfY2Fyb3VzZWwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3Muc3BlY2lhbFByb2R1Y3RzVGFiX2luaXRfY291bnQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3Muc3BlY2lhbFByb2R1Y3RzVGFiX2luaXRfY291bnQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRvcF9zZWxsZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3Muc3BlY2lhbFByb2R1Y3RzVGFiX2luaXRfY291bnQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBibG9nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlY2VudF9wb3N0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVwYWdlX2Jsb2dfcG9zdHNfY291bnQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdXN0b21lcjoge1xuICAgICAgICAgICAgICAgICAgICByZWNlbnRseV92aWV3ZWRfcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0X3JlY2VudGx5X3ZpZXdlZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNob3BfYnlfYnJhbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLm1heF9zaG9wX2J5X2JyYW5kLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYXJ0OiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3RwYWdlX3ZpZGVvc19jb3VudCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3RwYWdlX3Jldmlld3NfY291bnQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRfcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0cGFnZV9yZWxhdGVkX3Byb2R1Y3RzX2NvdW50LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzaW1pbGFyX2J5X3ZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdHBhZ2Vfc2ltaWxhcl9ieV92aWV3c19jb3VudCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MuY2F0ZWdvcnlwYWdlX3Byb2R1Y3RzX3Blcl9wYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYmxvZzoge1xuICAgICAgICAgICAgICAgICAgICBwb3N0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlczogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50X3Bvc3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZXBhZ2VfYmxvZ19wb3N0c19jb3VudCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5ldzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBicmFuZHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDEwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJyYW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MuYnJhbmRwYWdlX3Byb2R1Y3RzX3Blcl9wYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2hvcF9ieV9icmFuZDoge1xuICAgICAgICAgICAgICAgICAgICBsaW1pdDogOSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlY2VudGx5X3ZpZXdlZF9wcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3RfcmVjZW50bHlfdmlld2VkLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYXJ0OiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh1cmwsIHsgY29uZmlnIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciB8fCAhcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFByZWxvYWRlci5sb2FkKHJlcXVlc3QsIGBsb2FkUGFnZXwke3VybH1gKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Vuc3VwcG9ydGVkUGFnZShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVkaXJlY3QodXJsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRib2R5LnRyaWdnZXIoJ2JlZm9yZWxvYWQuaW5zdGFudGxvYWQnLCBbcmVzcG9uc2VdKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0ICRyZXNwb25zZSA9ICQocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0ICRyZXNwQm9keSA9ICRyZXNwb25zZS5maW5kKCcjaW5zdGFudGxvYWQtYm9keS1lbGVtZW50Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc2Nyb2xsVG9wKDApO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBwcmV2aW91cyBhcHBlbmRlZCA8aGVhZD4ncyBjaGlsZCB0YWdzXG4gICAgICAgICAgICAgICAgdGhpcy4kaGVhZC5jaGlsZHJlbigpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbG0gPSAkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbG0uaXMoJ1tkYXRhLWluc3RhbnRsb2FkLWhlYWQtZHluYW1pY10nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsbS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRpdGxlLCBtZXRhW3Byb3BlcnR5XSAuLi5cbiAgICAgICAgICAgICAgICB0aGlzLiRoZWFkLmNoaWxkcmVuKCd0aXRsZSwgbWV0YVtwcm9wZXJ0eV0sIGxpbmtbcmVsPWFtcGh0bWxdLCBsaW5rW3JlbD1jYW5vbmljYWxdJykucmVtb3ZlKCk7XG5cblxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBuZXcgPGhlYWQ+J3MgY2hpbGQgdGFnc1xuICAgICAgICAgICAgICAgICRyZXNwb25zZS5maW5kKCcjaW5zdGFudGxvYWQtaGVhZC1lbGVtZW50JykuY2hpbGRyZW4oKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxtID0gJChlbCk7XG4gICAgICAgICAgICAgICAgICAgICRlbG0uYXR0cignZGF0YS1pbnN0YW50bG9hZC1oZWFkLWR5bmFtaWMnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGhlYWQuYXBwZW5kKCRlbG0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVwbGFjZSA8Ym9keT4ncyBjbGFzc2VzXG4gICAgICAgICAgICAgICAgdGhpcy4kYm9keS5hdHRyKCdjbGFzcycsICRyZXNwQm9keS5hdHRyKCdjbGFzcycpKTtcblxuICAgICAgICAgICAgICAgIC8vIFJlcGxhY2UgJy5ib2R5JyBlbGVtZW50XG4gICAgICAgICAgICAgICAgY29uc3QgJHBhZ2VCb2R5ID0gJHJlc3BvbnNlLmZpbmQoJyNpbnN0YW50bG9hZC1wYWdlLWJvZHknKTtcbiAgICAgICAgICAgICAgICBpZiAoJHBhZ2VCb2R5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFnZUJvZHkuZW1wdHkoKS5hcHBlbmQoJHBhZ2VCb2R5LmNoaWxkcmVuKCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRHbG9iYWwodGhpcy4kcGFnZUJvZHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFJlcGxhY2UgdG9wICYgYm90dG9tIGJhbm5lcnNcbiAgICAgICAgICAgICAgICB0aGlzLiRib2R5LmZpbmQoJ1tkYXRhLWJhbm5lci1sb2NhdGlvbj10b3BdJykuZW1wdHkoKS5hcHBlbmQoJHJlc3BvbnNlLmZpbmQoJyNpbnN0YW50bG9hZC1iYW5uZXJzLXRvcCcpLmNoaWxkcmVuKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGJvZHkuZmluZCgnW2RhdGEtYmFubmVyLWxvY2F0aW9uPWJvdHRvbV0nKS5lbXB0eSgpLmFwcGVuZCgkcmVzcG9uc2UuZmluZCgnI2luc3RhbnRsb2FkLWJhbm5lcnMtYm90dG9tJykuY2hpbGRyZW4oKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYW5kIGFwcGVuZCB0aGUgbmV3IHNjcmlwdCAjaW5zdGFudGxvYWQtc2NyaXB0XG4gICAgICAgICAgICAgICAgdGhpcy4kYm9keS5maW5kKCcjaW5zdGFudGxvYWQtc2NyaXB0JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQoJHJlc3BvbnNlLmZpbmQoJyNpbnN0YW50bG9hZC1zY3JpcHQnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYW5kIGFwcGVuZCBuZXcgZWxlbWVudHMgbWF0Y2ggW2RhdGEtaW5zdGFudGxvYWQtYm9keS1keW5hbWljXVxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgbG9hZGluZyB0aGlyZC1wYXJ0eSBzY3JpcHRzXG4gICAgICAgICAgICAgICAgdGhpcy4kYm9keS5jaGlsZHJlbignW2RhdGEtaW5zdGFudGxvYWQtYm9keS1keW5hbWljXScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKCRyZXNwQm9keS5jaGlsZHJlbignW2RhdGEtaW5zdGFudGxvYWQtYm9keS1keW5hbWljXScpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHBhZ2VCb2R5LnJlbW92ZUNsYXNzKCdpbnN0YW50bG9hZC1sb2FkaW5nJykuYWRkQ2xhc3MoJ2luc3RhbnRsb2FkLWxvYWRlZCcpO1xuICAgICAgICAgICAgICAgIF8uZGVsYXkoKCkgPT4gdGhpcy4kcGFnZUJvZHkucmVtb3ZlQ2xhc3MoJ2luc3RhbnRsb2FkLWxvYWRlZCcpLCAzMDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kYm9keS50cmlnZ2VyKCdsb2FkZWQuaW5zdGFudGxvYWQnLCBbcmVzcG9uc2VdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdCh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRW50ZXJPckNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgZGF0YSA9ICRlbC5kYXRhKCdpbnN0YW50bG9hZCcpO1xuICAgICAgICBjb25zdCB1cmwgPSAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnID8gZGF0YS51cmwgOiBudWxsKSB8fCAkZWwuZGF0YSgnaW5zdGFudGxvYWRVcmwnKSB8fCAkZWwucHJvcCgnaHJlZicpO1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyA/IGRhdGEucGFnZSA6IG51bGw7XG5cbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9hZFBhZ2UodXJsLCBldmVudC50eXBlID09PSAnY2xpY2snLCBldmVudC50eXBlID09PSAnY2xpY2snLCBwYWdlVHlwZSk7XG4gICAgfVxuXG4gICAgb25Qb3BzdGF0ZSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uUG9wc3RhdGUgLSBzdGF0ZTonLCBoaXN0b3J5LnN0YXRlKTtcbiAgICAgICAgaWYgKCFoaXN0b3J5LnN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coaGlzdG9yeSk7XG5cbiAgICAgICAgaWYgKGhpc3Rvcnkuc3RhdGUuaW5zdGFudGxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBhZ2Uod2luZG93LmxvY2F0aW9uLCB0cnVlLCBmYWxzZSwgaGlzdG9yeS5zdGF0ZS5wYWdlVHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBVbnN1cHBvcnRlZCBwYWdlcyBpbnN0YW50bHkgYXQgdGhpcyBzdGFnZSAtIHJlbG9hZCBpdFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkUGFnZU1hbnVhbGx5KGV2ZW50LCB1cmwsIGV2ZW50VHlwZSA9ICcnLCBwYWdlVHlwZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sb2FkUGFnZSh1cmwsIGV2ZW50VHlwZSA9PT0gJ2NsaWNrJywgZXZlbnRUeXBlID09PSAnY2xpY2snLCBwYWdlVHlwZSk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgJCgnYm9keSwgW2RhdGEtbWVudV0nKS5vbignbW91c2VlbnRlciBjbGljaycsICdbZGF0YS1pbnN0YW50bG9hZF0sIFtkYXRhLWluc3RhbnRsb2FkLXVybF0nLCB0aGlzLm9uTW91c2VFbnRlck9yQ2xpY2spO1xuICAgICAgICAkKCdib2R5Jykub24oJ2xvYWRQYWdlLmluc3RhbnRsb2FkJywgdGhpcy5vbkxvYWRQYWdlTWFudWFsbHkpO1xuICAgICAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5vblBvcHN0YXRlKTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgICQoJ2JvZHksIFtkYXRhLW1lbnVdJykub2ZmKCdtb3VzZWVudGVyIGNsaWNrJywgJ1tkYXRhLWluc3RhbnRsb2FkXSwgW2RhdGEtaW5zdGFudGxvYWQtdXJsXScsIHRoaXMub25Nb3VzZUVudGVyT3JDbGljayk7XG4gICAgICAgICQoJ2JvZHknKS5vZmYoJ2xvYWRQYWdlLmluc3RhbnRsb2FkJywgdGhpcy5vbkxvYWRQYWdlTWFudWFsbHkpO1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BzdGF0ZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuICAgIG5ldyBJbnN0YW50UXVpY2tWaWV3KGNvbnRleHQpO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuICAgIG5ldyBJbnN0YW50TG9hZChjb250ZXh0KTtcbn1cbiIsInZhciBiYXNlUHJvcGVydHkgPSByZXF1aXJlKCcuL19iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzaXplIG9mIGFuIEFTQ0lJIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHN0cmluZyBzaXplLlxuICovXG52YXIgYXNjaWlTaXplID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc2NpaVNpemU7XG4iLCIvKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmRlbGF5YCBhbmQgYF8uZGVmZXJgIHdoaWNoIGFjY2VwdHMgYGFyZ3NgXG4gKiB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVsYXkuXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheSBpbnZvY2F0aW9uLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge251bWJlcnxPYmplY3R9IFJldHVybnMgdGhlIHRpbWVyIGlkIG9yIHRpbWVvdXQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlRGVsYXkoZnVuYywgd2FpdCwgYXJncykge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpOyB9LCB3YWl0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRGVsYXk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQcm9wZXJ0eTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9SYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1VuaWNvZGU7XG4iLCJ2YXIgYXNjaWlTaXplID0gcmVxdWlyZSgnLi9fYXNjaWlTaXplJyksXG4gICAgaGFzVW5pY29kZSA9IHJlcXVpcmUoJy4vX2hhc1VuaWNvZGUnKSxcbiAgICB1bmljb2RlU2l6ZSA9IHJlcXVpcmUoJy4vX3VuaWNvZGVTaXplJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbnVtYmVyIG9mIHN5bWJvbHMgaW4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc3RyaW5nIHNpemUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1NpemUoc3RyaW5nKSB7XG4gIHJldHVybiBoYXNVbmljb2RlKHN0cmluZylcbiAgICA/IHVuaWNvZGVTaXplKHN0cmluZylcbiAgICA6IGFzY2lpU2l6ZShzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1NpemU7XG4iLCIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzU3ltYm9sID0gJyg/OicgKyBbcnNOb25Bc3RyYWwgKyByc0NvbWJvICsgJz8nLCByc0NvbWJvLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyLCByc0FzdHJhbF0uam9pbignfCcpICsgJyknO1xuXG4vKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xudmFyIHJlVW5pY29kZSA9IFJlZ0V4cChyc0ZpdHogKyAnKD89JyArIHJzRml0eiArICcpfCcgKyByc1N5bWJvbCArIHJzU2VxLCAnZycpO1xuXG4vKipcbiAqIEdldHMgdGhlIHNpemUgb2YgYSBVbmljb2RlIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHN0cmluZyBzaXplLlxuICovXG5mdW5jdGlvbiB1bmljb2RlU2l6ZShzdHJpbmcpIHtcbiAgdmFyIHJlc3VsdCA9IHJlVW5pY29kZS5sYXN0SW5kZXggPSAwO1xuICB3aGlsZSAocmVVbmljb2RlLnRlc3Qoc3RyaW5nKSkge1xuICAgICsrcmVzdWx0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pY29kZVNpemU7XG4iLCJ2YXIgYmFzZURlbGF5ID0gcmVxdWlyZSgnLi9fYmFzZURlbGF5JyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKipcbiAqIEludm9rZXMgYGZ1bmNgIGFmdGVyIGB3YWl0YCBtaWxsaXNlY29uZHMuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmVcbiAqIHByb3ZpZGVkIHRvIGBmdW5jYCB3aGVuIGl0J3MgaW52b2tlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlbGF5LlxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgaW52b2NhdGlvbi5cbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXIgaWQuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVsYXkoZnVuY3Rpb24odGV4dCkge1xuICogICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAqIH0sIDEwMDAsICdsYXRlcicpO1xuICogLy8gPT4gTG9ncyAnbGF0ZXInIGFmdGVyIG9uZSBzZWNvbmQuXG4gKi9cbnZhciBkZWxheSA9IGJhc2VSZXN0KGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGFyZ3MpIHtcbiAgcmV0dXJuIGJhc2VEZWxheShmdW5jLCB0b051bWJlcih3YWl0KSB8fCAwLCBhcmdzKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGF5O1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN0cmluZywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3RyaW5nKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3RyaW5nKDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fFxuICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3RyaW5nO1xuIiwidmFyIGJhc2VLZXlzID0gcmVxdWlyZSgnLi9fYmFzZUtleXMnKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBzdHJpbmdTaXplID0gcmVxdWlyZSgnLi9fc3RyaW5nU2l6ZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKlxuICogR2V0cyB0aGUgc2l6ZSBvZiBgY29sbGVjdGlvbmAgYnkgcmV0dXJuaW5nIGl0cyBsZW5ndGggZm9yIGFycmF5LWxpa2VcbiAqIHZhbHVlcyBvciB0aGUgbnVtYmVyIG9mIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIGZvciBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbGxlY3Rpb24gc2l6ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zaXplKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5zaXplKHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiAyXG4gKlxuICogXy5zaXplKCdwZWJibGVzJyk7XG4gKiAvLyA9PiA3XG4gKi9cbmZ1bmN0aW9uIHNpemUoY29sbGVjdGlvbikge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKGNvbGxlY3Rpb24pID8gc3RyaW5nU2l6ZShjb2xsZWN0aW9uKSA6IGNvbGxlY3Rpb24ubGVuZ3RoO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcoY29sbGVjdGlvbik7XG4gIGlmICh0YWcgPT0gbWFwVGFnIHx8IHRhZyA9PSBzZXRUYWcpIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5zaXplO1xuICB9XG4gIHJldHVybiBiYXNlS2V5cyhjb2xsZWN0aW9uKS5sZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2l6ZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=