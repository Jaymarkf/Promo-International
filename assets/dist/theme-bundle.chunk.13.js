(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./assets/js/emthemes-modez/search-in-category.js":
/*!********************************************************!*\
  !*** ./assets/js/emthemes-modez/search-in-category.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SearchInCategory; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../theme/common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");





var SearchInCategory = /*#__PURE__*/function () {
  /**
   * Constructor
   *
   * Should be constructed after FacetedSearch object constructed
   * so that FacetedSearch `statechange` event callback can be executed.
   *
   * `options` includes:
   * - (object) `context`: from PageManager.context.
   * - (object) `facetedSearch`
   * - (function) `searchCallback`: callback to re-render search results.
   *
   * @param {object} options
   */
  function SearchInCategory(options) {
    // console.log('search-in-category constructor');
    this.doSearch = lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.doSearch.bind(this), 500);
    this.onInput = this.onInput.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.options = options;
    this.$body = $('body');
    this.$input = $('[data-search-in-category]');
    this.$form = this.$input.closest('form');
    this.$clear = this.$form.find('[data-clear]').hide();
    this.originalPathname = window.location.pathname;

    if (options && options.facetedSearch) {
      this.options.facetedSearch.updateViewCallback = this.updateViewFacetedSearch.bind(this);
    }

    this.bindEvents();
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(_theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].getUrl(), true);

    if (url.query.q) {
      this.$input.val(url.query.q);
      this.$clear.show();
      $(window).trigger('statechange');
    }
  }

  var _proto = SearchInCategory.prototype;

  _proto.destroy = function destroy() {
    // console.log('search-in-category destroy');
    this.unbindEvents();
  };

  _proto.bindEvents = function bindEvents() {
    this.$input.on('input', this.onInput);
    this.$form.on('submit', this.onFormSubmit);
    this.$clear.on('click', this.onClear);

    if ($('#facetedSearch').length === 0) {
      $(window).on('statechange', this.onStateChange);
    }
  };

  _proto.unbindEvents = function unbindEvents() {
    this.$input.off('input', this.onInput);
    this.$form.off('submit', this.onFormSubmit);
    this.$clear.off('click', this.onClear);
    $(window).off('statechange', this.onStateChange);
  };

  _proto.onFormSubmit = function onFormSubmit() {
    return false;
  };

  _proto.onClear = function onClear(event) {
    event.preventDefault();
    this.$clear.hide();
    this.$input.val('');
    this.onInput();
  };

  _proto.onInput = function onInput() {
    this.doSearch(this.$input.val());
  };

  _proto.onStateChange = function onStateChange() {
    var _this = this;

    // console.log('search-in-category statechange');
    var searchUrl = _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].getUrl();
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(searchUrl, true);
    var searchQuery = url.query.search_query || url.query.search_query_adv || url.query.q;
    var requestOptions = {
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      }
    };

    if (searchQuery) {
      url.query.search_query_adv = searchQuery;
      delete url.query.search_query;
      delete url.query.q;
      delete url.query.category;

      if (this.options.context.categoryId) {
        url.query['category[]'] = this.options.context.categoryId;
      } else {
        delete url.query['category[]'];
      }

      if (this.options.context.themeSettings.categorypage_search_subs) {
        url.query.searchsubs = 'ON';
      }

      searchUrl = "/search.php?" + _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].buildQueryString(url.query);
      requestOptions = {
        template: {
          productListing: 'papa-supermarket/search-in-category/product-listing',
          sidebar: 'papa-supermarket/search-in-category/sidebar'
        },
        showMore: 'search/show-more'
      };
    }

    this.$form.addClass('loading');
    this.$body.trigger('beforerequest.searchincategory');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["api"].getPage(searchUrl, requestOptions, function (err, content) {
      _this.$form.removeClass('loading');

      if (err) {
        throw new Error(err);
      }

      _this.$body.trigger('beforeupdate.searchincategory');

      if (content && _this.options.searchCallback) {
        _this.options.searchCallback(content);
      }

      _this.$body.trigger('afterupdate.searchincategory');
    });
  };

  _proto.doSearch = function doSearch(searchQuery) {
    if (searchQuery.length === 0) {
      this.$clear.hide();
      var url = _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].removeParams(_theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].getUrl(), ['q', 'search_query', 'search_query_adv', 'category', 'page']);
      _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].goToUrl(url);
    } else if (searchQuery.length >= 3) {
      this.$clear.show();

      var _url = _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].removeParams(_theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].getUrl(), ['q', 'search_query', 'search_query_adv', 'page']);

      _url = _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].replaceParams(_url, {
        q: searchQuery
      });
      _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].goToUrl(_url);
    }
  };

  _proto.updateViewFacetedSearch = function updateViewFacetedSearch() {
    var _this2 = this;

    var facetedSearch = this.options.facetedSearch;
    var requestUrl = _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].getUrl();
    var requestOptions = facetedSearch.requestOptions;
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(requestUrl, true);
    var searchQuery = url.query.q || url.query.search_query; // Check if the URL is 'Clear All', then clear the search query as well

    var stdParams = ['_bc_fsnf', 'search_query', 'q', 'sort', 'limit', 'mode', 'page'];
    var filterParams = Object.keys(url.query).filter(function (key) {
      return stdParams.indexOf(key) === -1;
    });
    var isClearAll = window.location.pathname === '/search.php' && filterParams.length === 0;

    if (isClearAll) {
      this.$input.val('');
      this.$clear.hide();
      requestUrl = _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].removeParams(requestUrl, [].concat(filterParams, ['search_query', 'q', '_bc_fsnf'])).replace('/search.php', this.originalPathname);
      window.history.replaceState({}, document.title, requestUrl);
    } else if (searchQuery) {
      // Show nice URL on the location bar
      if (window.location.pathname === '/search.php') {
        url.query.q = searchQuery;
        delete url.query.search_query;

        if (Number(url.query.category) === this.options.context.categoryId) {
          delete url.query.category;
        }

        window.history.replaceState({}, document.title, this.originalPathname + "?" + _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].buildQueryString(url.query));
      }

      delete url.query.q;
      url.query.search_query = searchQuery;

      if (!url.query.category) {
        url.query.category = this.options.context.categoryId;
      }

      requestUrl = "/search.php?" + _theme_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_3__["default"].buildQueryString(url.query);
      requestOptions = {
        template: {
          productListing: 'papa-supermarket/search-in-category/product-listing',
          sidebar: 'papa-supermarket/search-in-category/sidebar'
        },
        showMore: 'search/show-more'
      };
    } else {
      this.$input.val('');
    }

    $(facetedSearch.options.blockerSelector).show();
    this.$form.addClass('loading');
    this.$body.trigger('beforerequest.searchincategory');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["api"].getPage(requestUrl, requestOptions, function (err, content) {
      // Supermarket MOD
      $(facetedSearch.options.blockerSelector).hide();

      _this2.$form.removeClass('loading');

      if (err) {
        throw new Error(err);
      }

      _this2.$body.trigger('beforeupdate.searchincategory'); // Refresh view with new content


      facetedSearch.refreshView(content);

      _this2.$body.trigger('afterupdate.searchincategory');
    });
  };

  return SearchInCategory;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../emthemes-modez/compare-products */ "./assets/js/emthemes-modez/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _emthemes_modez_action_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../emthemes-modez/action-bar */ "./assets/js/emthemes-modez/action-bar.js");
/* harmony import */ var _emthemes_modez_theme_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../emthemes-modez/theme-utils */ "./assets/js/emthemes-modez/theme-utils.js");
/* harmony import */ var _emthemes_modez_bulk_order__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../emthemes-modez/bulk-order */ "./assets/js/emthemes-modez/bulk-order.js");
/* harmony import */ var _emthemes_modez_search_in_category__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../emthemes-modez/search-in-category */ "./assets/js/emthemes-modez/search-in-category.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Supermarket Mod
// import compareProducts from './global/compare-products';




 // Papathemes - Supermarket

 // Supermarket




var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Category.prototype;

  _proto.onReady = function onReady() {
    // console.log('category onReady');
    Object(_emthemes_modez_theme_utils__WEBPACK_IMPORTED_MODULE_6__["autoExpandCategoryMenu"])(this.context); // Supermarket
    // Papathemes - Bulk Order

    if (this.context && (this.context.themeSettings.show_bulk_order_mode || this.context.useBulkOrder)) {
      this.bulkOrder = Object(_emthemes_modez_bulk_order__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context);
    } // Supermarket Mod
    // compareProducts(this.context.urls);


    Object(_emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    } // Papathemes - Supermarket


    Object(_emthemes_modez_action_bar__WEBPACK_IMPORTED_MODULE_5__["default"])(); // Supermarket

    if (this.context.themeSettings.categorypage_search === 'show') {
      this.initSearchInCategory();
    }
  } // Supermarket
  ;

  _proto.destroy = function destroy() {
    if (this.searchInCategory) {
      this.searchInCategory.destroy();
    }

    if (this.facetedSearch) {
      this.facetedSearch.destroy();
    } else {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
    }
  } // Supermarket
  ;

  _proto.initSearchInCategory = function initSearchInCategory() {
    var _this2 = this;

    this.searchInCategory = new _emthemes_modez_search_in_category__WEBPACK_IMPORTED_MODULE_8__["default"]({
      context: this.context,
      facetedSearch: this.facetedSearch,
      searchCallback: function searchCallback(content) {
        $('#product-listing-container').html(content.productListing);

        if (_this2.bulkOrder) {
          _this2.bulkOrder.reinit();
        }

        Object(_emthemes_modez_action_bar__WEBPACK_IMPORTED_MODULE_5__["default"])();
        $('body').triggerHandler('compareReset');
        $('html, body').animate({
          scrollTop: 0
        }, 100);
      }
    });
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this3 = this;

    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar); // Papathemes - Bulk Order

      if (_this3.bulkOrder) {
        _this3.bulkOrder.reinit();
      }

      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovc2VhcmNoLWluLWNhdGVnb3J5LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyJdLCJuYW1lcyI6WyJTZWFyY2hJbkNhdGVnb3J5Iiwib3B0aW9ucyIsImRvU2VhcmNoIiwiYmluZCIsIm9uSW5wdXQiLCJvbkZvcm1TdWJtaXQiLCJvbkNsZWFyIiwib25TdGF0ZUNoYW5nZSIsIiRib2R5IiwiJCIsIiRpbnB1dCIsIiRmb3JtIiwiY2xvc2VzdCIsIiRjbGVhciIsImZpbmQiLCJoaWRlIiwib3JpZ2luYWxQYXRobmFtZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJmYWNldGVkU2VhcmNoIiwidXBkYXRlVmlld0NhbGxiYWNrIiwidXBkYXRlVmlld0ZhY2V0ZWRTZWFyY2giLCJiaW5kRXZlbnRzIiwidXJsIiwiVXJsIiwicGFyc2UiLCJ1cmxVdGlscyIsImdldFVybCIsInF1ZXJ5IiwicSIsInZhbCIsInNob3ciLCJ0cmlnZ2VyIiwiZGVzdHJveSIsInVuYmluZEV2ZW50cyIsIm9uIiwibGVuZ3RoIiwib2ZmIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInNlYXJjaFVybCIsInNlYXJjaFF1ZXJ5Iiwic2VhcmNoX3F1ZXJ5Iiwic2VhcmNoX3F1ZXJ5X2FkdiIsInJlcXVlc3RPcHRpb25zIiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJjYXRlZ29yeSIsImNvbnRleHQiLCJjYXRlZ29yeUlkIiwidGhlbWVTZXR0aW5ncyIsImNhdGVnb3J5cGFnZV9zZWFyY2hfc3VicyIsInNlYXJjaHN1YnMiLCJidWlsZFF1ZXJ5U3RyaW5nIiwic2hvd01vcmUiLCJhZGRDbGFzcyIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwicmVtb3ZlQ2xhc3MiLCJFcnJvciIsInNlYXJjaENhbGxiYWNrIiwicmVtb3ZlUGFyYW1zIiwiZ29Ub1VybCIsInJlcGxhY2VQYXJhbXMiLCJyZXF1ZXN0VXJsIiwic3RkUGFyYW1zIiwiZmlsdGVyUGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImtleSIsImluZGV4T2YiLCJpc0NsZWFyQWxsIiwicmVwbGFjZSIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJkb2N1bWVudCIsInRpdGxlIiwiTnVtYmVyIiwiYmxvY2tlclNlbGVjdG9yIiwicmVmcmVzaFZpZXciLCJDYXRlZ29yeSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5Iiwib25SZWFkeSIsImF1dG9FeHBhbmRDYXRlZ29yeU1lbnUiLCJzaG93X2J1bGtfb3JkZXJfbW9kZSIsInVzZUJ1bGtPcmRlciIsImJ1bGtPcmRlciIsImJ1bGtPcmRlckZhY3RvcnkiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiaG9va3MiLCJhY3Rpb25CYXJGYWN0b3J5IiwiY2F0ZWdvcnlwYWdlX3NlYXJjaCIsImluaXRTZWFyY2hJbkNhdGVnb3J5Iiwic2VhcmNoSW5DYXRlZ29yeSIsImh0bWwiLCJyZWluaXQiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsImNvbmZpZyIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwiRmFjZXRlZFNlYXJjaCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7O0lBRXFCQSxnQjtBQUNqQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLDRCQUFZQyxPQUFaLEVBQXFCO0FBQ2pCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQix1REFBUyxLQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBVCxFQUFtQyxHQUFuQyxDQUFoQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWFELElBQWIsQ0FBa0IsSUFBbEIsQ0FBZjtBQUNBLFNBQUtFLFlBQUwsR0FBb0IsS0FBS0EsWUFBTCxDQUFrQkYsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBcEI7QUFDQSxTQUFLRyxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhSCxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxTQUFLSSxhQUFMLEdBQXFCLEtBQUtBLGFBQUwsQ0FBbUJKLElBQW5CLENBQXdCLElBQXhCLENBQXJCO0FBQ0EsU0FBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS08sS0FBTCxHQUFhQyxDQUFDLENBQUMsTUFBRCxDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjRCxDQUFDLENBQUMsMkJBQUQsQ0FBZjtBQUNBLFNBQUtFLEtBQUwsR0FBYSxLQUFLRCxNQUFMLENBQVlFLE9BQVosQ0FBb0IsTUFBcEIsQ0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFLRixLQUFMLENBQVdHLElBQVgsQ0FBZ0IsY0FBaEIsRUFBZ0NDLElBQWhDLEVBQWQ7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QkMsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxRQUF4Qzs7QUFFQSxRQUFJbEIsT0FBTyxJQUFJ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cGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3VybC11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaEluQ2F0ZWdvcnkge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBTaG91bGQgYmUgY29uc3RydWN0ZWQgYWZ0ZXIgRmFjZXRlZFNlYXJjaCBvYmplY3QgY29uc3RydWN0ZWRcbiAgICAgKiBzbyB0aGF0IEZhY2V0ZWRTZWFyY2ggYHN0YXRlY2hhbmdlYCBldmVudCBjYWxsYmFjayBjYW4gYmUgZXhlY3V0ZWQuXG4gICAgICpcbiAgICAgKiBgb3B0aW9uc2AgaW5jbHVkZXM6XG4gICAgICogLSAob2JqZWN0KSBgY29udGV4dGA6IGZyb20gUGFnZU1hbmFnZXIuY29udGV4dC5cbiAgICAgKiAtIChvYmplY3QpIGBmYWNldGVkU2VhcmNoYFxuICAgICAqIC0gKGZ1bmN0aW9uKSBgc2VhcmNoQ2FsbGJhY2tgOiBjYWxsYmFjayB0byByZS1yZW5kZXIgc2VhcmNoIHJlc3VsdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlYXJjaC1pbi1jYXRlZ29yeSBjb25zdHJ1Y3RvcicpO1xuICAgICAgICB0aGlzLmRvU2VhcmNoID0gZGVib3VuY2UodGhpcy5kb1NlYXJjaC5iaW5kKHRoaXMpLCA1MDApO1xuICAgICAgICB0aGlzLm9uSW5wdXQgPSB0aGlzLm9uSW5wdXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkZvcm1TdWJtaXQgPSB0aGlzLm9uRm9ybVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xlYXIgPSB0aGlzLm9uQ2xlYXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgIHRoaXMuJGlucHV0ID0gJCgnW2RhdGEtc2VhcmNoLWluLWNhdGVnb3J5XScpO1xuICAgICAgICB0aGlzLiRmb3JtID0gdGhpcy4kaW5wdXQuY2xvc2VzdCgnZm9ybScpO1xuICAgICAgICB0aGlzLiRjbGVhciA9IHRoaXMuJGZvcm0uZmluZCgnW2RhdGEtY2xlYXJdJykuaGlkZSgpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsUGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5mYWNldGVkU2VhcmNoKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaC51cGRhdGVWaWV3Q2FsbGJhY2sgPSB0aGlzLnVwZGF0ZVZpZXdGYWNldGVkU2VhcmNoLmJpbmQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2UodXJsVXRpbHMuZ2V0VXJsKCksIHRydWUpO1xuICAgICAgICBpZiAodXJsLnF1ZXJ5LnEpIHtcbiAgICAgICAgICAgIHRoaXMuJGlucHV0LnZhbCh1cmwucXVlcnkucSk7XG4gICAgICAgICAgICB0aGlzLiRjbGVhci5zaG93KCk7XG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWFyY2gtaW4tY2F0ZWdvcnkgZGVzdHJveScpO1xuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJGlucHV0Lm9uKCdpbnB1dCcsIHRoaXMub25JbnB1dCk7XG4gICAgICAgIHRoaXMuJGZvcm0ub24oJ3N1Ym1pdCcsIHRoaXMub25Gb3JtU3VibWl0KTtcbiAgICAgICAgdGhpcy4kY2xlYXIub24oJ2NsaWNrJywgdGhpcy5vbkNsZWFyKTtcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICQod2luZG93KS5vbignc3RhdGVjaGFuZ2UnLCB0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiRpbnB1dC5vZmYoJ2lucHV0JywgdGhpcy5vbklucHV0KTtcbiAgICAgICAgdGhpcy4kZm9ybS5vZmYoJ3N1Ym1pdCcsIHRoaXMub25Gb3JtU3VibWl0KTtcbiAgICAgICAgdGhpcy4kY2xlYXIub2ZmKCdjbGljaycsIHRoaXMub25DbGVhcik7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICB9XG5cbiAgICBvbkZvcm1TdWJtaXQoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkNsZWFyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcbiAgICAgICAgdGhpcy4kaW5wdXQudmFsKCcnKTtcbiAgICAgICAgdGhpcy5vbklucHV0KCk7XG4gICAgfVxuXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgdGhpcy5kb1NlYXJjaCh0aGlzLiRpbnB1dC52YWwoKSk7XG4gICAgfVxuXG4gICAgb25TdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlYXJjaC1pbi1jYXRlZ29yeSBzdGF0ZWNoYW5nZScpO1xuICAgICAgICBsZXQgc2VhcmNoVXJsID0gdXJsVXRpbHMuZ2V0VXJsKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZShzZWFyY2hVcmwsIHRydWUpO1xuICAgICAgICBjb25zdCBzZWFyY2hRdWVyeSA9IHVybC5xdWVyeS5zZWFyY2hfcXVlcnkgfHwgdXJsLnF1ZXJ5LnNlYXJjaF9xdWVyeV9hZHYgfHwgdXJsLnF1ZXJ5LnE7XG4gICAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNlYXJjaFF1ZXJ5KSB7XG4gICAgICAgICAgICB1cmwucXVlcnkuc2VhcmNoX3F1ZXJ5X2FkdiA9IHNlYXJjaFF1ZXJ5O1xuXG4gICAgICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnNlYXJjaF9xdWVyeTtcbiAgICAgICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucTtcbiAgICAgICAgICAgIGRlbGV0ZSB1cmwucXVlcnkuY2F0ZWdvcnk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGV4dC5jYXRlZ29yeUlkKSB7XG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5WydjYXRlZ29yeVtdJ10gPSB0aGlzLm9wdGlvbnMuY29udGV4dC5jYXRlZ29yeUlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5WydjYXRlZ29yeVtdJ107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGV4dC50aGVtZVNldHRpbmdzLmNhdGVnb3J5cGFnZV9zZWFyY2hfc3Vicykge1xuICAgICAgICAgICAgICAgIHVybC5xdWVyeS5zZWFyY2hzdWJzID0gJ09OJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VhcmNoVXJsID0gYC9zZWFyY2gucGhwPyR7dXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmwucXVlcnkpfWA7XG5cbiAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAncGFwYS1zdXBlcm1hcmtldC9zZWFyY2gtaW4tY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhcjogJ3BhcGEtc3VwZXJtYXJrZXQvc2VhcmNoLWluLWNhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2hvd01vcmU6ICdzZWFyY2gvc2hvdy1tb3JlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRmb3JtLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgIHRoaXMuJGJvZHkudHJpZ2dlcignYmVmb3JlcmVxdWVzdC5zZWFyY2hpbmNhdGVnb3J5Jyk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2Uoc2VhcmNoVXJsLCByZXF1ZXN0T3B0aW9ucywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kZm9ybS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGJvZHkudHJpZ2dlcignYmVmb3JldXBkYXRlLnNlYXJjaGluY2F0ZWdvcnknKTtcblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQgJiYgdGhpcy5vcHRpb25zLnNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNlYXJjaENhbGxiYWNrKGNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRib2R5LnRyaWdnZXIoJ2FmdGVydXBkYXRlLnNlYXJjaGluY2F0ZWdvcnknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZG9TZWFyY2goc2VhcmNoUXVlcnkpIHtcbiAgICAgICAgaWYgKHNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy4kY2xlYXIuaGlkZSgpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdXJsVXRpbHMucmVtb3ZlUGFyYW1zKHVybFV0aWxzLmdldFVybCgpLCBbJ3EnLCAnc2VhcmNoX3F1ZXJ5JywgJ3NlYXJjaF9xdWVyeV9hZHYnLCAnY2F0ZWdvcnknLCAncGFnZSddKTtcbiAgICAgICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hRdWVyeS5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgdGhpcy4kY2xlYXIuc2hvdygpO1xuICAgICAgICAgICAgbGV0IHVybCA9IHVybFV0aWxzLnJlbW92ZVBhcmFtcyh1cmxVdGlscy5nZXRVcmwoKSwgWydxJywgJ3NlYXJjaF9xdWVyeScsICdzZWFyY2hfcXVlcnlfYWR2JywgJ3BhZ2UnXSk7XG4gICAgICAgICAgICB1cmwgPSB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHVybCwgeyBxOiBzZWFyY2hRdWVyeSB9KTtcbiAgICAgICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZpZXdGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCBmYWNldGVkU2VhcmNoID0gdGhpcy5vcHRpb25zLmZhY2V0ZWRTZWFyY2g7XG4gICAgICAgIGxldCByZXF1ZXN0VXJsID0gdXJsVXRpbHMuZ2V0VXJsKCk7XG4gICAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IGZhY2V0ZWRTZWFyY2gucmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZShyZXF1ZXN0VXJsLCB0cnVlKTtcbiAgICAgICAgY29uc3Qgc2VhcmNoUXVlcnkgPSB1cmwucXVlcnkucSB8fCB1cmwucXVlcnkuc2VhcmNoX3F1ZXJ5O1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBVUkwgaXMgJ0NsZWFyIEFsbCcsIHRoZW4gY2xlYXIgdGhlIHNlYXJjaCBxdWVyeSBhcyB3ZWxsXG4gICAgICAgIGNvbnN0IHN0ZFBhcmFtcyA9IFsnX2JjX2ZzbmYnLCAnc2VhcmNoX3F1ZXJ5JywgJ3EnLCAnc29ydCcsICdsaW1pdCcsICdtb2RlJywgJ3BhZ2UnXTtcbiAgICAgICAgY29uc3QgZmlsdGVyUGFyYW1zID0gT2JqZWN0LmtleXModXJsLnF1ZXJ5KS5maWx0ZXIoa2V5ID0+IHN0ZFBhcmFtcy5pbmRleE9mKGtleSkgPT09IC0xKTtcbiAgICAgICAgY29uc3QgaXNDbGVhckFsbCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9zZWFyY2gucGhwJyAmJiBmaWx0ZXJQYXJhbXMubGVuZ3RoID09PSAwO1xuXG4gICAgICAgIGlmIChpc0NsZWFyQWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRpbnB1dC52YWwoJycpO1xuICAgICAgICAgICAgdGhpcy4kY2xlYXIuaGlkZSgpO1xuICAgICAgICAgICAgcmVxdWVzdFVybCA9IHVybFV0aWxzLnJlbW92ZVBhcmFtcyhyZXF1ZXN0VXJsLCBbLi4uZmlsdGVyUGFyYW1zLCAnc2VhcmNoX3F1ZXJ5JywgJ3EnLCAnX2JjX2ZzbmYnXSkucmVwbGFjZSgnL3NlYXJjaC5waHAnLCB0aGlzLm9yaWdpbmFsUGF0aG5hbWUpO1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgcmVxdWVzdFVybCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoUXVlcnkpIHtcbiAgICAgICAgICAgIC8vIFNob3cgbmljZSBVUkwgb24gdGhlIGxvY2F0aW9uIGJhclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9zZWFyY2gucGhwJykge1xuICAgICAgICAgICAgICAgIHVybC5xdWVyeS5xID0gc2VhcmNoUXVlcnk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5zZWFyY2hfcXVlcnk7XG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcih1cmwucXVlcnkuY2F0ZWdvcnkpID09PSB0aGlzLm9wdGlvbnMuY29udGV4dC5jYXRlZ29yeUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB1cmwucXVlcnkuY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIGAke3RoaXMub3JpZ2luYWxQYXRobmFtZX0/JHt1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybC5xdWVyeSl9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucTtcbiAgICAgICAgICAgIHVybC5xdWVyeS5zZWFyY2hfcXVlcnkgPSBzZWFyY2hRdWVyeTtcbiAgICAgICAgICAgIGlmICghdXJsLnF1ZXJ5LmNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5LmNhdGVnb3J5ID0gdGhpcy5vcHRpb25zLmNvbnRleHQuY2F0ZWdvcnlJZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFVybCA9IGAvc2VhcmNoLnBocD8ke3VybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KX1gO1xuICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdwYXBhLXN1cGVybWFya2V0L3NlYXJjaC1pbi1jYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyOiAncGFwYS1zdXBlcm1hcmtldC9zZWFyY2gtaW4tY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzaG93TW9yZTogJ3NlYXJjaC9zaG93LW1vcmUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGlucHV0LnZhbCgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAkKGZhY2V0ZWRTZWFyY2gub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgdGhpcy4kZm9ybS5hZGRDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgIHRoaXMuJGJvZHkudHJpZ2dlcignYmVmb3JlcmVxdWVzdC5zZWFyY2hpbmNhdGVnb3J5Jyk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UocmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMsIChlcnIsIGNvbnRlbnQpID0+IHsgLy8gU3VwZXJtYXJrZXQgTU9EXG4gICAgICAgICAgICAkKGZhY2V0ZWRTZWFyY2gub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuJGZvcm0ucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRib2R5LnRyaWdnZXIoJ2JlZm9yZXVwZGF0ZS5zZWFyY2hpbmNhdGVnb3J5Jyk7XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdmlldyB3aXRoIG5ldyBjb250ZW50XG4gICAgICAgICAgICBmYWNldGVkU2VhcmNoLnJlZnJlc2hWaWV3KGNvbnRlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLiRib2R5LnRyaWdnZXIoJ2FmdGVydXBkYXRlLnNlYXJjaGluY2F0ZWdvcnknKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbi8vIFN1cGVybWFya2V0IE1vZFxuLy8gaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi4vZW10aGVtZXMtbW9kZXovY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCBhY3Rpb25CYXJGYWN0b3J5IGZyb20gJy4uL2VtdGhlbWVzLW1vZGV6L2FjdGlvbi1iYXInOyAvLyBQYXBhdGhlbWVzIC0gU3VwZXJtYXJrZXRcbmltcG9ydCB7IGF1dG9FeHBhbmRDYXRlZ29yeU1lbnUgfSBmcm9tICcuLi9lbXRoZW1lcy1tb2Rlei90aGVtZS11dGlscyc7IC8vIFN1cGVybWFya2V0XG5pbXBvcnQgYnVsa09yZGVyRmFjdG9yeSBmcm9tICcuLi9lbXRoZW1lcy1tb2Rlei9idWxrLW9yZGVyJztcbmltcG9ydCBTZWFyY2hJbkNhdGVnb3J5IGZyb20gJy4uL2VtdGhlbWVzLW1vZGV6L3NlYXJjaC1pbi1jYXRlZ29yeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NhdGVnb3J5IG9uUmVhZHknKTtcbiAgICAgICAgYXV0b0V4cGFuZENhdGVnb3J5TWVudSh0aGlzLmNvbnRleHQpOyAvLyBTdXBlcm1hcmtldFxuXG4gICAgICAgIC8vIFBhcGF0aGVtZXMgLSBCdWxrIE9yZGVyXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQgJiYgKHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnNob3dfYnVsa19vcmRlcl9tb2RlIHx8IHRoaXMuY29udGV4dC51c2VCdWxrT3JkZXIpKSB7XG4gICAgICAgICAgICB0aGlzLmJ1bGtPcmRlciA9IGJ1bGtPcmRlckZhY3RvcnkodGhpcy5jb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1cGVybWFya2V0IE1vZFxuICAgICAgICAvLyBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0LnVybHMpO1xuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBhcGF0aGVtZXMgLSBTdXBlcm1hcmtldFxuICAgICAgICBhY3Rpb25CYXJGYWN0b3J5KCk7XG5cbiAgICAgICAgLy8gU3VwZXJtYXJrZXRcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLmNhdGVnb3J5cGFnZV9zZWFyY2ggPT09ICdzaG93Jykge1xuICAgICAgICAgICAgdGhpcy5pbml0U2VhcmNoSW5DYXRlZ29yeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3VwZXJtYXJrZXRcbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbkNhdGVnb3J5KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEluQ2F0ZWdvcnkuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZhY2V0ZWRTZWFyY2gpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaC5kZXN0cm95KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob29rcy5vZmYoJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN1cGVybWFya2V0XG4gICAgaW5pdFNlYXJjaEluQ2F0ZWdvcnkoKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5DYXRlZ29yeSA9IG5ldyBTZWFyY2hJbkNhdGVnb3J5KHtcbiAgICAgICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgICAgIGZhY2V0ZWRTZWFyY2g6IHRoaXMuZmFjZXRlZFNlYXJjaCxcbiAgICAgICAgICAgIHNlYXJjaENhbGxiYWNrOiAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJykuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1bGtPcmRlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1bGtPcmRlci5yZWluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhY3Rpb25CYXJGYWN0b3J5KCk7XG5cbiAgICAgICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgIC8vIFBhcGF0aGVtZXMgLSBCdWxrIE9yZGVyXG4gICAgICAgICAgICBpZiAodGhpcy5idWxrT3JkZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGtPcmRlci5yZWluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==