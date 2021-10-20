(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./assets/js/emthemes-modez/fit-nav.js":
/*!*********************************************!*\
  !*** ./assets/js/emthemes-modez/fit-nav.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mustache */ "./node_modules/mustache/mustache.min.js");
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_1__);


var tpl = "\n    {{#list.length}}\n        <ul class=\"navPage-subMenu-list\">\n            <li class=\"navPage-subMenu-item\"></li>\n            {{#list}}\n                <li class=\"navPage-subMenu-item\">\n                    <a class=\"navPage-subMenu-action navPages-action {{#children.length}}has-subMenu is-open{{/children.length}}\" href=\"{{&url}}\">\n                        {{title}}\n                        {{#children.length}}\n                            <i class=\"icon navPages-action-moreIcon\" aria-hidden=\"true\"><svg><use xlink:href=\"#icon-chevron-down\"></use></svg></i>\n                        {{/children.length}}\n                    </a>\n                    {{> childrenTpl }}\n                </li>\n            {{/list}}\n        </ul>\n    {{/list.length}}\n";
var childrenTpl = "\n    {{#children.length}}\n        <ul class=\"navPage-childList is-open\">\n            {{#children}}\n                <li class=\"navPage-childList-item\">\n                    <a class=\"navPage-childList-action navPages-action {{#children.length}}has-subMenu is-open{{/children.length}}\" href=\"{{&url}}\">\n                        {{title}}\n                        {{#children.length}}\n                            <i class=\"icon navPages-action-moreIcon\" aria-hidden=\"true\"><svg><use xlink:href=\"#icon-chevron-down\"></use></svg></i>\n                        {{/children.length}}\n                    </a>\n                    {{#children.length}}\n                        {{> childrenTpl }}\n                    {{/children.length}}\n                </li>\n            {{/children}}\n        </ul>\n    {{/children.length}}\n";
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var $navPages = $('.navPages').first();
  var $navPagesList = $navPages.children('.navPages-list');
  var $vertCat = $navPages.children('.emthemesModez-navPages-verticalCategories-container');
  var $list = $('<ul/>').addClass($navPagesList.first().attr('class')).addClass('navPages-list--fitNav').append($navPagesList.not('.navPages-list--user').children('.navPages-item').clone());

  if ($list.children().length === 0) {
    return;
  }

  if ($vertCat.length > 0) {
    $vertCat.after($list);
  } else {
    $navPages.prepend($list);
  }

  var txtMore = context.txtNavMore || 'More';
  var $more = $("\n        <li class=\"navPages-item navPages-item--more\">\n            <a class=\"navPages-action has-subMenu is-open\" href=\"#\">" + txtMore + " <i class=\"icon navPages-action-moreIcon\" aria-hidden=\"true\"><svg><use xlink:href=\"#icon-chevron-down\"></use></svg></i></a>\n            <div class=\"navPage-subMenu is-open\"></div>\n        </li>");
  $list.append($more);

  var resize = function resize() {
    $more.show();
    $more.nextAll().show(); //
    // Move 'More' to the first line of the menu
    //

    var firstTop = Math.round($list.children().first().position().top);
    $more.appendTo($list);

    while (Math.round($more.position().top) > firstTop) {
      $more.insertBefore($more.prev());
    } // Hide all menu items after 'More'


    $more.nextAll().hide(); //
    // Extract data from the menu items after 'more' item
    //

    var data = $more.nextAll().get().map(function (item1) {
      var $item1 = $(item1);
      var $a1 = $item1.find('> .navPages-action');
      var children1 = $item1.find('> .navPage-subMenu > .navPage-subMenu-list > .navPage-subMenu-item').not(':first').get().map(function (item2) {
        var $item2 = $(item2);
        var $a2 = $item2.find('> .navPage-subMenu-action');
        var children2 = $item2.find('> .navPage-childList > .navPage-childList-item').not(':first').get().map(function (item3) {
          var $item3 = $(item3);
          var $a3 = $item3.find('> .navPage-childList-action');
          var children3 = $item3.find('> .navPage-childList > .navPage-childList-item').not(':first').get().map(function (item4) {
            var $item4 = $(item4);
            var $a4 = $item4.find('> .navPage-childList-action');
            return {
              url: $a4.attr('href'),
              title: $a4.text(),
              children: []
            };
          });
          return {
            url: $a3.attr('href'),
            title: $a3.text(),
            children: children3
          };
        });
        return {
          url: $a2.attr('href'),
          title: $a2.text(),
          children: children2
        };
      });
      return {
        url: $a1.attr('href'),
        title: $a1.text(),
        children: children1
      };
    }); // Build the new mega menu HTML

    var html = mustache__WEBPACK_IMPORTED_MODULE_1___default.a.render(tpl, {
      list: data
    }, {
      childrenTpl: childrenTpl
    });
    $more.find('> .navPage-subMenu').html(html);

    if (data.length === 0) {
      $more.hide();
    }
  };

  $(window).on('resize', lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(resize, 200));
  resize();
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovZml0LW5hdi5qcyJdLCJuYW1lcyI6WyJ0cGwiLCJjaGlsZHJlblRwbCIsImNvbnRleHQiLCIkbmF2UGFnZXMiLCIkIiwiZmlyc3QiLCIkbmF2UGFnZXNMaXN0IiwiY2hpbGRyZW4iLCIkdmVydENhdCIsIiRsaXN0IiwiYWRkQ2xhc3MiLCJhdHRyIiwiYXBwZW5kIiwibm90IiwiY2xvbmUiLCJsZW5ndGgiLCJhZnRlciIsInByZXBlbmQiLCJ0eHRNb3JlIiwidHh0TmF2TW9yZSIsIiRtb3JlIiwicmVzaXplIiwic2hvdyIsIm5leHRBbGwiLCJmaXJzdFRvcCIsIk1hdGgiLCJyb3VuZCIsInBvc2l0aW9uIiwidG9wIiwiYXBwZW5kVG8iLCJpbnNlcnRCZWZvcmUiLCJwcmV2IiwiaGlkZSIsImRhdGEiLCJnZXQiLCJtYXAiLCJpdGVtMSIsIiRpdGVtMSIsIiRhMSIsImZpbmQiLCJjaGlsZHJlbjEiLCJpdGVtMiIsIiRpdGVtMiIsIiRhMiIsImNoaWxkcmVuMiIsIml0ZW0zIiwiJGl0ZW0zIiwiJGEzIiwiY2hpbGRyZW4zIiwiaXRlbTQiLCIkaXRlbTQiLCIkYTQiLCJ1cmwiLCJ0aXRsZSIsInRleHQiLCJodG1sIiwiTXVzdGFjaGUiLCJyZW5kZXIiLCJsaXN0Iiwid2luZG93Iiwib24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUVBLElBQU1BLEdBQUcsa3hCQUFUO0FBbUJBLElBQU1DLFdBQVcsNjBCQUFqQjtBQW9CZSx5RUFBVUMsT0FBVixFQUFtQjtBQUM5QixNQUFNQyxTQUFTLEdBQUdDLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZUMsS0FBZixFQUFsQjtBQUNBLE1BQU1DLGFBQWEsR0FBR0gsU0FBUyxDQUFDSSxRQUFWLENBQW1CLGdCQUFuQixDQUF0QjtBQUNBLE1BQU1DLFFBQVEsR0FBR0wsU0FBUyxDQUFDSSxRQUFWLENBQW1CLHNEQUFuQixDQUFqQjtBQUNB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QixJQUFJLENBQUNsQixNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CSyxXQUFLLENBQUNZLElBQU47QUFDSDtBQUNKLEdBdEVEOztBQXdFQTVCLEdBQUMsQ0FBQ3VELE1BQUQsQ0FBRCxDQUFVQyxFQUFWLENBQWEsUUFBYixFQUF1Qix1REFBU3ZDLE1BQVQsRUFBaUIsR0FBakIsQ0FBdkI7QUFDQUEsUUFBTTtBQUNULEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IE11c3RhY2hlIGZyb20gJ211c3RhY2hlJztcblxuY29uc3QgdHBsID0gYFxuICAgIHt7I2xpc3QubGVuZ3RofX1cbiAgICAgICAgPHVsIGNsYXNzPVwibmF2UGFnZS1zdWJNZW51LWxpc3RcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdlBhZ2Utc3ViTWVudS1pdGVtXCI+PC9saT5cbiAgICAgICAgICAgIHt7I2xpc3R9fVxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdlBhZ2Utc3ViTWVudS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2UGFnZS1zdWJNZW51LWFjdGlvbiBuYXZQYWdlcy1hY3Rpb24ge3sjY2hpbGRyZW4ubGVuZ3RofX1oYXMtc3ViTWVudSBpcy1vcGVue3svY2hpbGRyZW4ubGVuZ3RofX1cIiBocmVmPVwie3smdXJsfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dGl0bGV9fVxuICAgICAgICAgICAgICAgICAgICAgICAge3sjY2hpbGRyZW4ubGVuZ3RofX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24gbmF2UGFnZXMtYWN0aW9uLW1vcmVJY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaGV2cm9uLWRvd25cIj48L3VzZT48L3N2Zz48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ey9jaGlsZHJlbi5sZW5ndGh9fVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIHt7PiBjaGlsZHJlblRwbCB9fVxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7ey9saXN0fX1cbiAgICAgICAgPC91bD5cbiAgICB7ey9saXN0Lmxlbmd0aH19XG5gO1xuXG5jb25zdCBjaGlsZHJlblRwbCA9IGBcbiAgICB7eyNjaGlsZHJlbi5sZW5ndGh9fVxuICAgICAgICA8dWwgY2xhc3M9XCJuYXZQYWdlLWNoaWxkTGlzdCBpcy1vcGVuXCI+XG4gICAgICAgICAgICB7eyNjaGlsZHJlbn19XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2UGFnZS1jaGlsZExpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdlBhZ2UtY2hpbGRMaXN0LWFjdGlvbiBuYXZQYWdlcy1hY3Rpb24ge3sjY2hpbGRyZW4ubGVuZ3RofX1oYXMtc3ViTWVudSBpcy1vcGVue3svY2hpbGRyZW4ubGVuZ3RofX1cIiBocmVmPVwie3smdXJsfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dGl0bGV9fVxuICAgICAgICAgICAgICAgICAgICAgICAge3sjY2hpbGRyZW4ubGVuZ3RofX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24gbmF2UGFnZXMtYWN0aW9uLW1vcmVJY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaGV2cm9uLWRvd25cIj48L3VzZT48L3N2Zz48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ey9jaGlsZHJlbi5sZW5ndGh9fVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIHt7I2NoaWxkcmVuLmxlbmd0aH19XG4gICAgICAgICAgICAgICAgICAgICAgICB7ez4gY2hpbGRyZW5UcGwgfX1cbiAgICAgICAgICAgICAgICAgICAge3svY2hpbGRyZW4ubGVuZ3RofX1cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAge3svY2hpbGRyZW59fVxuICAgICAgICA8L3VsPlxuICAgIHt7L2NoaWxkcmVuLmxlbmd0aH19XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGNvbnN0ICRuYXZQYWdlcyA9ICQoJy5uYXZQYWdlcycpLmZpcnN0KCk7XG4gICAgY29uc3QgJG5hdlBhZ2VzTGlzdCA9ICRuYXZQYWdlcy5jaGlsZHJlbignLm5hdlBhZ2VzLWxpc3QnKTtcbiAgICBjb25zdCAkdmVydENhdCA9ICRuYXZQYWdlcy5jaGlsZHJlbignLmVtdGhlbWVzTW9kZXotbmF2UGFnZXMtdmVydGljYWxDYXRlZ29yaWVzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0ICRsaXN0ID0gJCgnPHVsLz4nKVxuICAgICAgICAuYWRkQ2xhc3MoJG5hdlBhZ2VzTGlzdC5maXJzdCgpLmF0dHIoJ2NsYXNzJykpXG4gICAgICAgIC5hZGRDbGFzcygnbmF2UGFnZXMtbGlzdC0tZml0TmF2JylcbiAgICAgICAgLmFwcGVuZCgkbmF2UGFnZXNMaXN0Lm5vdCgnLm5hdlBhZ2VzLWxpc3QtLXVzZXInKS5jaGlsZHJlbignLm5hdlBhZ2VzLWl0ZW0nKS5jbG9uZSgpKTtcblxuICAgIGlmICgkbGlzdC5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCR2ZXJ0Q2F0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgJHZlcnRDYXQuYWZ0ZXIoJGxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRuYXZQYWdlcy5wcmVwZW5kKCRsaXN0KTtcbiAgICB9XG5cbiAgICBjb25zdCB0eHRNb3JlID0gY29udGV4dC50eHROYXZNb3JlIHx8ICdNb3JlJztcbiAgICBjb25zdCAkbW9yZSA9ICQoYFxuICAgICAgICA8bGkgY2xhc3M9XCJuYXZQYWdlcy1pdGVtIG5hdlBhZ2VzLWl0ZW0tLW1vcmVcIj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2UGFnZXMtYWN0aW9uIGhhcy1zdWJNZW51IGlzLW9wZW5cIiBocmVmPVwiI1wiPiR7dHh0TW9yZX0gPGkgY2xhc3M9XCJpY29uIG5hdlBhZ2VzLWFjdGlvbi1tb3JlSWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzdmc+PHVzZSB4bGluazpocmVmPVwiI2ljb24tY2hldnJvbi1kb3duXCI+PC91c2U+PC9zdmc+PC9pPjwvYT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZQYWdlLXN1Yk1lbnUgaXMtb3BlblwiPjwvZGl2PlxuICAgICAgICA8L2xpPmApO1xuICAgICRsaXN0LmFwcGVuZCgkbW9yZSk7XG5cbiAgICBjb25zdCByZXNpemUgPSAoKSA9PiB7XG4gICAgICAgICRtb3JlLnNob3coKTtcbiAgICAgICAgJG1vcmUubmV4dEFsbCgpLnNob3coKTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBNb3ZlICdNb3JlJyB0byB0aGUgZmlyc3QgbGluZSBvZiB0aGUgbWVudVxuICAgICAgICAvL1xuICAgICAgICBjb25zdCBmaXJzdFRvcCA9IE1hdGgucm91bmQoJGxpc3QuY2hpbGRyZW4oKS5maXJzdCgpLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgJG1vcmUuYXBwZW5kVG8oJGxpc3QpO1xuICAgICAgICB3aGlsZSAoTWF0aC5yb3VuZCgkbW9yZS5wb3NpdGlvbigpLnRvcCkgPiBmaXJzdFRvcCkge1xuICAgICAgICAgICAgJG1vcmUuaW5zZXJ0QmVmb3JlKCRtb3JlLnByZXYoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWRlIGFsbCBtZW51IGl0ZW1zIGFmdGVyICdNb3JlJ1xuICAgICAgICAkbW9yZS5uZXh0QWxsKCkuaGlkZSgpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEV4dHJhY3QgZGF0YSBmcm9tIHRoZSBtZW51IGl0ZW1zIGFmdGVyICdtb3JlJyBpdGVtXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IGRhdGEgPSAkbW9yZS5uZXh0QWxsKCkuZ2V0KCkubWFwKChpdGVtMSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGl0ZW0xID0gJChpdGVtMSk7XG4gICAgICAgICAgICBjb25zdCAkYTEgPSAkaXRlbTEuZmluZCgnPiAubmF2UGFnZXMtYWN0aW9uJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuMSA9ICRpdGVtMS5maW5kKCc+IC5uYXZQYWdlLXN1Yk1lbnUgPiAubmF2UGFnZS1zdWJNZW51LWxpc3QgPiAubmF2UGFnZS1zdWJNZW51LWl0ZW0nKS5ub3QoJzpmaXJzdCcpLmdldCgpLm1hcCgoaXRlbTIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCAkaXRlbTIgPSAkKGl0ZW0yKTtcbiAgICAgICAgICAgICAgICBjb25zdCAkYTIgPSAkaXRlbTIuZmluZCgnPiAubmF2UGFnZS1zdWJNZW51LWFjdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4yID0gJGl0ZW0yLmZpbmQoJz4gLm5hdlBhZ2UtY2hpbGRMaXN0ID4gLm5hdlBhZ2UtY2hpbGRMaXN0LWl0ZW0nKS5ub3QoJzpmaXJzdCcpLmdldCgpLm1hcCgoaXRlbTMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGl0ZW0zID0gJChpdGVtMyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRhMyA9ICRpdGVtMy5maW5kKCc+IC5uYXZQYWdlLWNoaWxkTGlzdC1hY3Rpb24nKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbjMgPSAkaXRlbTMuZmluZCgnPiAubmF2UGFnZS1jaGlsZExpc3QgPiAubmF2UGFnZS1jaGlsZExpc3QtaXRlbScpLm5vdCgnOmZpcnN0JykuZ2V0KCkubWFwKChpdGVtNCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJGl0ZW00ID0gJChpdGVtNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkYTQgPSAkaXRlbTQuZmluZCgnPiAubmF2UGFnZS1jaGlsZExpc3QtYWN0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAkYTQuYXR0cignaHJlZicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkYTQudGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICRhMy5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJGEzLnRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbjMsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICRhMi5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkYTIudGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4yLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB1cmw6ICRhMS5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAgICAgdGl0bGU6ICRhMS50ZXh0KCksXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJ1aWxkIHRoZSBuZXcgbWVnYSBtZW51IEhUTUxcbiAgICAgICAgY29uc3QgaHRtbCA9IE11c3RhY2hlLnJlbmRlcih0cGwsIHsgbGlzdDogZGF0YSB9LCB7IGNoaWxkcmVuVHBsIH0pO1xuICAgICAgICAkbW9yZS5maW5kKCc+IC5uYXZQYWdlLXN1Yk1lbnUnKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJG1vcmUuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplJywgZGVib3VuY2UocmVzaXplLCAyMDApKTtcbiAgICByZXNpemUoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=