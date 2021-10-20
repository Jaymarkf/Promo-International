(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/emthemes-modez/azbrands.js":
/*!**********************************************!*\
  !*** ./assets/js/emthemes-modez/azbrands.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AZBrands; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");



var AZBrands = /*#__PURE__*/function () {
  function AZBrands() {}

  var _proto = AZBrands.prototype;

  _proto.onReady = function onReady() {
    var $brands = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-brands-list]');

    if ($brands.length > 0) {
      var $azBrands = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById($brands.data('azbrands')));

      if ($azBrands.length > 0) {
        this.generateAZBrands($azBrands);
        this.updateAZBrands($brands, $azBrands);
      }

      var url = $brands.data('brands-list-next');

      if (url) {
        this.loadMoreBrands($brands, url, true);
      }
    }
  };

  _proto.generateAZBrands = function generateAZBrands($azBrands) {
    var azBrandsTableID = $azBrands.attr('id') + "Table";
    var $azBrandsTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + azBrandsTableID);
    $azBrandsTable.append('<li data-letter=""><a href="#">All</a></li>');

    for (var i = 97; i <= 123; i++) {
      var ch = '#';

      if (i < 123) {
        ch = String.fromCharCode(i);
      }

      $azBrands.append("<div class=\"azBrands-group\" data-letter=\"" + ch + "\" id=\"azBrands-code-" + i + "\"><h3 class=\"azBrands-group-title\">" + ch + "</h3><ul class=\"brandGrid\"></ul><p class=\"azBrands-group-topLink\"><a href=\"#topOfPage\">Top of Page</a></p></div>");
      $azBrandsTable.append("<li data-letter=\"" + ch + "\"><a href=\"#azBrands-code-" + i + "\" data-target=\"azBrands-code-" + i + "\">" + ch + "</a></li>");
    }

    $azBrands.children().addClass('is-active');
    $azBrandsTable.children().first().addClass('is-active');
    $azBrandsTable.on('click', 'a', function (event) {
      event.preventDefault();
      var $a = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
      $azBrandsTable.children('li').removeClass('is-active');
      $a.addClass('is-active');
      var target = $a.data('target');

      if (target) {
        $azBrands.children('.azBrands-group').removeClass('is-active');
        $azBrands.children("#" + target).addClass('is-active');
      } else {
        $azBrands.children('.azBrands-group').addClass('is-active');
      }
    });
  };

  _proto.updateAZBrands = function updateAZBrands($brands, $azBrands) {
    var $azBrandsTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + $azBrands.attr('id') + "Table");
    $brands.children('.brand').each(function (i, el) {
      var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
      var code = String($el.data('brand-code'));
      var letter = code.charAt(0).toLowerCase();
      var $group = $azBrands.children("[data-letter=" + letter + "]");

      if ($group.length === 0) {
        $group = $azBrands.children().last();
      }

      var $li = $azBrandsTable.children("[data-letter=" + letter + "]");

      if ($li.length === 0) {
        $li = $azBrandsTable.children().last();
      }

      var $brandGrid = $group.find('.brandGrid');
      var $elIns;
      $brandGrid.children('.brand').each(function (j, el2) {
        var $el2 = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el2);
        var code2 = $el2.data('brand-code');

        if (code < code2) {
          $elIns = $el2;
        } else {
          return false;
        }
      });

      if ($elIns) {
        $el.insertAfter($elIns);
      } else {
        $el.appendTo($brandGrid);
      }
    });
  };

  _proto.loadMoreBrands = function loadMoreBrands($brands, url, recursive) {
    var _this = this;

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage(url, {
      template: 'papa-supermarket/brands/brands-list',
      config: {
        brands: {
          limit: 100
        }
      }
    }, function (err, resp) {
      var $brandsList = jquery__WEBPACK_IMPORTED_MODULE_0___default()(resp).find('[data-brands-list]');
      $brands.append($brandsList.children());
      var $azBrands = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById($brands.data('azbrands')));

      if ($azBrands.length > 0) {
        _this.updateAZBrands($brands, $azBrands);
      }

      var nextUrl = $brandsList.data('brands-list-next');

      if (nextUrl && recursive) {
        _this.loadMoreBrands($brands, nextUrl, recursive);
      }
    });
  };

  return AZBrands;
}();



/***/ }),

/***/ "./assets/js/theme/brands.js":
/*!***********************************!*\
  !*** ./assets/js/theme/brands.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Brands; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page-manager */ "./assets/js/page-manager.js");
/* harmony import */ var _emthemes_modez_azbrands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../emthemes-modez/azbrands */ "./assets/js/emthemes-modez/azbrands.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Brands = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Brands, _PageManager);

  function Brands() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Brands.prototype;

  _proto.onReady = function onReady() {
    if (this.context.themeSettings.brandspage_layout === 'aztable') {
      var azbrands = new _emthemes_modez_azbrands__WEBPACK_IMPORTED_MODULE_1__["default"]();
      azbrands.onReady();
    }
  };

  return Brands;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovYXpicmFuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2JyYW5kcy5qcyJdLCJuYW1lcyI6WyJBWkJyYW5kcyIsIm9uUmVhZHkiLCIkYnJhbmRzIiwiJCIsImxlbmd0aCIsIiRhekJyYW5kcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkYXRhIiwiZ2VuZXJhdGVBWkJyYW5kcyIsInVwZGF0ZUFaQnJhbmRzIiwidXJsIiwibG9hZE1vcmVCcmFuZHMiLCJhekJyYW5kc1RhYmxlSUQiLCJhdHRyIiwiJGF6QnJhbmRzVGFibGUiLCJhcHBlbmQiLCJpIiwiY2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGlsZHJlbiIsImFkZENsYXNzIiwiZmlyc3QiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCIkYSIsInRhcmdldCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImVsIiwiJGVsIiwiY29kZSIsImxldHRlciIsImNoYXJBdCIsInRvTG93ZXJDYXNlIiwiJGdyb3VwIiwibGFzdCIsIiRsaSIsIiRicmFuZEdyaWQiLCJmaW5kIiwiJGVsSW5zIiwiaiIsImVsMiIsIiRlbDIiLCJjb2RlMiIsImluc2VydEFmdGVyIiwiYXBwZW5kVG8iLCJyZWN1cnNpdmUiLCJ1dGlscyIsImFwaSIsImdldFBhZ2UiLCJ0ZW1wbGF0ZSIsImNvbmZpZyIsImJyYW5kcyIsImxpbWl0IiwiZXJyIiwicmVzcCIsIiRicmFuZHNMaXN0IiwibmV4dFVybCIsIkJyYW5kcyIsImNvbnRleHQiLCJ0aGVtZVNldHRpbmdzIiwiYnJhbmRzcGFnZV9sYXlvdXQiLCJhemJyYW5kcyIsIlBhZ2VNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0lBRXFCQSxROzs7OztTQUNqQkMsTyxHQUFBLG1CQUFVO0FBQ04sUUFBTUMs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Ozs7Ozs7O0FDcEhMO0FBQ0E7O0lBRXFCWSxNOzs7Ozs7Ozs7U0FDakI1RCxPLEdBQUEsbUJBQVU7QUFDTixRQUFJLEtBQUs2RCxPQUFMLENBQWFDLGFBQWIsQ0FBMkJDLGlCQUEzQixLQUFpRCxTQUFyRCxFQUFnRTtBQUM1RCxVQUFNQyxRQUFRLEdBQUcsSUFBSWpFLGdFQUFKLEVBQWpCO0FBQ0FpRSxjQUFRLENBQUNoRSxPQUFUO0FBQ0g7QUFDSixHOzs7RUFOK0JpRSxxRCIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVpCcmFuZHMge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnN0ICRicmFuZHMgPSAkKCdbZGF0YS1icmFuZHMtbGlzdF0nKTtcbiAgICAgICAgaWYgKCRicmFuZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgJGF6QnJhbmRzID0gJChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgkYnJhbmRzLmRhdGEoJ2F6YnJhbmRzJykpKTtcbiAgICAgICAgICAgIGlmICgkYXpCcmFuZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVBWkJyYW5kcygkYXpCcmFuZHMpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQVpCcmFuZHMoJGJyYW5kcywgJGF6QnJhbmRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdXJsID0gJGJyYW5kcy5kYXRhKCdicmFuZHMtbGlzdC1uZXh0Jyk7XG4gICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUJyYW5kcygkYnJhbmRzLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVBWkJyYW5kcygkYXpCcmFuZHMpIHtcbiAgICAgICAgY29uc3QgYXpCcmFuZHNUYWJsZUlEID0gYCR7JGF6QnJhbmRzLmF0dHIoJ2lkJyl9VGFibGVgO1xuICAgICAgICBjb25zdCAkYXpCcmFuZHNUYWJsZSA9ICQoYCMke2F6QnJhbmRzVGFibGVJRH1gKTtcblxuICAgICAgICAkYXpCcmFuZHNUYWJsZS5hcHBlbmQoJzxsaSBkYXRhLWxldHRlcj1cIlwiPjxhIGhyZWY9XCIjXCI+QWxsPC9hPjwvbGk+Jyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDk3OyBpIDw9IDEyMzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2ggPSAnIyc7XG4gICAgICAgICAgICBpZiAoaSA8IDEyMykge1xuICAgICAgICAgICAgICAgIGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRhekJyYW5kcy5hcHBlbmQoYDxkaXYgY2xhc3M9XCJhekJyYW5kcy1ncm91cFwiIGRhdGEtbGV0dGVyPVwiJHtjaH1cIiBpZD1cImF6QnJhbmRzLWNvZGUtJHtpfVwiPjxoMyBjbGFzcz1cImF6QnJhbmRzLWdyb3VwLXRpdGxlXCI+JHtjaH08L2gzPjx1bCBjbGFzcz1cImJyYW5kR3JpZFwiPjwvdWw+PHAgY2xhc3M9XCJhekJyYW5kcy1ncm91cC10b3BMaW5rXCI+PGEgaHJlZj1cIiN0b3BPZlBhZ2VcIj5Ub3Agb2YgUGFnZTwvYT48L3A+PC9kaXY+YCk7XG4gICAgICAgICAgICAkYXpCcmFuZHNUYWJsZS5hcHBlbmQoYDxsaSBkYXRhLWxldHRlcj1cIiR7Y2h9XCI+PGEgaHJlZj1cIiNhekJyYW5kcy1jb2RlLSR7aX1cIiBkYXRhLXRhcmdldD1cImF6QnJhbmRzLWNvZGUtJHtpfVwiPiR7Y2h9PC9hPjwvbGk+YCk7XG4gICAgICAgIH1cblxuICAgICAgICAkYXpCcmFuZHMuY2hpbGRyZW4oKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICRhekJyYW5kc1RhYmxlLmNoaWxkcmVuKCkuZmlyc3QoKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgJGF6QnJhbmRzVGFibGUub24oJ2NsaWNrJywgJ2EnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0ICRhID0gJChldmVudC50YXJnZXQpO1xuXG4gICAgICAgICAgICAkYXpCcmFuZHNUYWJsZS5jaGlsZHJlbignbGknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkYS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9ICRhLmRhdGEoJ3RhcmdldCcpO1xuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICRhekJyYW5kcy5jaGlsZHJlbignLmF6QnJhbmRzLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICRhekJyYW5kcy5jaGlsZHJlbihgIyR7dGFyZ2V0fWApLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF6QnJhbmRzLmNoaWxkcmVuKCcuYXpCcmFuZHMtZ3JvdXAnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUFaQnJhbmRzKCRicmFuZHMsICRhekJyYW5kcykge1xuICAgICAgICBjb25zdCAkYXpCcmFuZHNUYWJsZSA9ICQoYCMkeyRhekJyYW5kcy5hdHRyKCdpZCcpfVRhYmxlYCk7XG4gICAgICAgICRicmFuZHMuY2hpbGRyZW4oJy5icmFuZCcpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBTdHJpbmcoJGVsLmRhdGEoJ2JyYW5kLWNvZGUnKSk7XG4gICAgICAgICAgICBjb25zdCBsZXR0ZXIgPSBjb2RlLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBsZXQgJGdyb3VwID0gJGF6QnJhbmRzLmNoaWxkcmVuKGBbZGF0YS1sZXR0ZXI9JHtsZXR0ZXJ9XWApO1xuICAgICAgICAgICAgaWYgKCRncm91cC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkZ3JvdXAgPSAkYXpCcmFuZHMuY2hpbGRyZW4oKS5sYXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCAkbGkgPSAkYXpCcmFuZHNUYWJsZS5jaGlsZHJlbihgW2RhdGEtbGV0dGVyPSR7bGV0dGVyfV1gKTtcbiAgICAgICAgICAgIGlmICgkbGkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJGxpID0gJGF6QnJhbmRzVGFibGUuY2hpbGRyZW4oKS5sYXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRicmFuZEdyaWQgPSAkZ3JvdXAuZmluZCgnLmJyYW5kR3JpZCcpO1xuXG4gICAgICAgICAgICBsZXQgJGVsSW5zO1xuICAgICAgICAgICAgJGJyYW5kR3JpZC5jaGlsZHJlbignLmJyYW5kJykuZWFjaCgoaiwgZWwyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGVsMiA9ICQoZWwyKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2RlMiA9ICRlbDIuZGF0YSgnYnJhbmQtY29kZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPCBjb2RlMikge1xuICAgICAgICAgICAgICAgICAgICAkZWxJbnMgPSAkZWwyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICgkZWxJbnMpIHtcbiAgICAgICAgICAgICAgICAkZWwuaW5zZXJ0QWZ0ZXIoJGVsSW5zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLmFwcGVuZFRvKCRicmFuZEdyaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkTW9yZUJyYW5kcygkYnJhbmRzLCB1cmwsIHJlY3Vyc2l2ZSkge1xuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh1cmwsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAncGFwYS1zdXBlcm1hcmtldC9icmFuZHMvYnJhbmRzLWxpc3QnLFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgYnJhbmRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRicmFuZHNMaXN0ID0gJChyZXNwKS5maW5kKCdbZGF0YS1icmFuZHMtbGlzdF0nKTtcbiAgICAgICAgICAgICRicmFuZHMuYXBwZW5kKCRicmFuZHNMaXN0LmNoaWxkcmVuKCkpO1xuXG4gICAgICAgICAgICBjb25zdCAkYXpCcmFuZHMgPSAkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCRicmFuZHMuZGF0YSgnYXpicmFuZHMnKSkpO1xuICAgICAgICAgICAgaWYgKCRhekJyYW5kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBWkJyYW5kcygkYnJhbmRzLCAkYXpCcmFuZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXh0VXJsID0gJGJyYW5kc0xpc3QuZGF0YSgnYnJhbmRzLWxpc3QtbmV4dCcpO1xuICAgICAgICAgICAgaWYgKG5leHRVcmwgJiYgcmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUJyYW5kcygkYnJhbmRzLCBuZXh0VXJsLCByZWN1cnNpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBBWkJyYW5kcyBmcm9tICcuLi9lbXRoZW1lcy1tb2Rlei9hemJyYW5kcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyYW5kcyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MuYnJhbmRzcGFnZV9sYXlvdXQgPT09ICdhenRhYmxlJykge1xuICAgICAgICAgICAgY29uc3QgYXpicmFuZHMgPSBuZXcgQVpCcmFuZHMoKTtcbiAgICAgICAgICAgIGF6YnJhbmRzLm9uUmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=