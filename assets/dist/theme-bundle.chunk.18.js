(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./assets/js/theme/brand.js":
/*!**********************************!*\
  !*** ./assets/js/theme/brand.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Brand; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../emthemes-modez/compare-products */ "./assets/js/emthemes-modez/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _emthemes_modez_action_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../emthemes-modez/action-bar */ "./assets/js/emthemes-modez/action-bar.js");
/* harmony import */ var _emthemes_modez_bulk_order__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../emthemes-modez/bulk-order */ "./assets/js/emthemes-modez/bulk-order.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Supermarket Mod
// import compareProducts from './global/compare-products';




 // Papathemes - Supermarket



var Brand = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Brand, _CatalogPage);

  function Brand(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Brand.prototype;

  _proto.onReady = function onReady() {
    // Papathemes - Bulk Order
    if (this.context && (this.context.themeSettings.show_bulk_order_mode || this.context.useBulkOrder)) {
      this.bulkOrder = Object(_emthemes_modez_bulk_order__WEBPACK_IMPORTED_MODULE_6__["default"])(this.context);
    } // Supermarket Mod
    // compareProducts(this.context.urls);


    Object(_emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    Object(_emthemes_modez_action_bar__WEBPACK_IMPORTED_MODULE_5__["default"])(); // Papathemes - Supermarket

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }
  } // Supermarket
  ;

  _proto.destroy = function destroy() {
    if (this.facetedSearch) {
      this.facetedSearch.destroy();
    } else {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this2 = this;

    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.brandProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'brand/product-listing',
        sidebar: 'brand/sidebar'
      },
      config: {
        shop_by_brand: true,
        brand: {
          products: {
            limit: productsPerPage
          }
        }
      },
      showMore: 'brand/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset'); // Papathemes - Bulk Order

      if (_this2.bulkOrder) {
        _this2.bulkOrder.reinit();
      }

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

  return Brand;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYnJhbmQuanMiXSwibmFtZXMiOlsiQnJhbmQiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwidGhlbWVTZXR0aW5ncyIsInNob3dfYnVsa19vcmRlcl9tb2RlIiwidXNlQnVsa09yZGVyIiwiYnVsa09yZGVyIiwiYnVsa09yZGVyRmFjdG9yeSIsImNvbXBhcmVQcm9kdWN0cyIsImFjdGlvbkJhckZhY3RvcnkiLCIkIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwiZGVzdHJveSIsImZhY2V0ZWRTZWFyY2giLCJvZmYiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJicmFuZFByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJjb25maWciLCJzaG9wX2J5X2JyYW5kIiwiYnJhbmQiLCJwcm9kdWN0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsInJlaW5pdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JN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Q0FBd0I7QUFDcEJDLGlCQUFTLEVBQUU7QUFEUyxPQUF4QixFQUVHLEdBRkg7QUFHSCxLQWRvQixFQWNsQjtBQUNDQyw2QkFBdUIsRUFBRTtBQUNyQi9CLHVCQUFlLEVBQWZBLGVBRHFCO0FBRXJCRSx1QkFBZSxFQUFmQSxlQUZxQjtBQUdyQkUsMEJBQWtCLEVBQWxCQSxrQkFIcUI7QUFJckJFLDBCQUFrQixFQUFsQkEsa0JBSnFCO0FBS3JCRSxzQkFBYyxFQUFkQTtBQUxxQjtBQUQxQixLQWRrQixDQUFyQjtBQXVCSCxHOzs7RUFwRjhCd0IsZ0QiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbi8vIFN1cGVybWFya2V0IE1vZFxuLy8gaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi4vZW10aGVtZXMtbW9kZXovY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCBhY3Rpb25CYXJGYWN0b3J5IGZyb20gJy4uL2VtdGhlbWVzLW1vZGV6L2FjdGlvbi1iYXInOyAvLyBQYXBhdGhlbWVzIC0gU3VwZXJtYXJrZXRcbmltcG9ydCBidWxrT3JkZXJGYWN0b3J5IGZyb20gJy4uL2VtdGhlbWVzLW1vZGV6L2J1bGstb3JkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmFuZCBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vIFBhcGF0aGVtZXMgLSBCdWxrIE9yZGVyXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQgJiYgKHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnNob3dfYnVsa19vcmRlcl9tb2RlIHx8IHRoaXMuY29udGV4dC51c2VCdWxrT3JkZXIpKSB7XG4gICAgICAgICAgICB0aGlzLmJ1bGtPcmRlciA9IGJ1bGtPcmRlckZhY3RvcnkodGhpcy5jb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1cGVybWFya2V0IE1vZFxuICAgICAgICAvLyBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0LnVybHMpO1xuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICBhY3Rpb25CYXJGYWN0b3J5KCk7IC8vIFBhcGF0aGVtZXMgLSBTdXBlcm1hcmtldFxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN1cGVybWFya2V0XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmFjZXRlZFNlYXJjaCkge1xuICAgICAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoLmRlc3Ryb3koKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvb2tzLm9mZignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5icmFuZFByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnYnJhbmQvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnYnJhbmQvc2lkZWJhcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgc2hvcF9ieV9icmFuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBicmFuZDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnYnJhbmQvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAvLyBQYXBhdGhlbWVzIC0gQnVsayBPcmRlclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVsa09yZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWxrT3JkZXIucmVpbml0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=