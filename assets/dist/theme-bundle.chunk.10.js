(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/emthemes-modez/products-by-category.js":
/*!**********************************************************!*\
  !*** ./assets/js/emthemes-modez/products-by-category.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return init; });
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _theme_global_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../theme/global/foundation */ "./assets/js/theme/global/foundation.js");




var ProductsByCategory = /*#__PURE__*/function () {
  function ProductsByCategory(_ref) {
    var id = _ref.id,
        _ref$index = _ref.index,
        index = _ref$index === void 0 ? 0 : _ref$index,
        _ref$sort = _ref.sort,
        sort = _ref$sort === void 0 ? '' : _ref$sort,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? '' : _ref$limit,
        $parent = _ref.$parent;
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onCollapse = this.onCollapse.bind(this);
    this.id = id;
    this.index = index;
    this.sort = sort;
    this.limit = limit;
    this.$parent = $parent;
    this.$scope = $('<div class="emthemesModez-productsByCategoryTabs-loading"></div>');
    this.$loadMore = $();
    this.$collapse = $();
    this.$loader = $();
    this.$parent.append(this.$scope);
    this.request();
  }

  var _proto = ProductsByCategory.prototype;

  _proto.request = function request() {
    var _this = this;

    var limitQuery = this.limit ? "&limit=" + this.limit : '';
    var sortQuery = this.sort ? "&sort=" + this.sort : '';
    var template = 'papa-supermarket/products-by-category-sorting-tabs/section';
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage("/categories.php?category=" + this.id + limitQuery + sortQuery, {
      template: template
    }, function (err, resp) {
      if (err || !resp || resp.error) {
        _this.$scope.remove();

        return;
      }

      var $resp = $(resp);

      _this.$scope.replaceWith($resp);

      _this.$scope = $resp;
      _this.$loader = _this.$scope.find('.loader');

      _this.initTabs();

      _this.initSlick();

      _this.initBanner();

      _this.initButtons();
    });
  };

  _proto.loadProducts = function loadProducts(_ref2) {
    var _this2 = this;

    var _ref2$sort = _ref2.sort,
        sort = _ref2$sort === void 0 ? '' : _ref2$sort,
        _ref2$page = _ref2.page,
        page = _ref2$page === void 0 ? '' : _ref2$page,
        $content = _ref2.$content;
    var limitQuery = this.limit ? "&limit=" + this.limit : '';
    var sortQuery = sort ? "&sort=" + sort : '';
    var pageQuery = page ? "&page=" + page : '';
    var template = 'papa-supermarket/products-by-category-sorting-tabs/products';
    this.$loader.addClass('loading');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage("/categories.php?category=" + this.id + limitQuery + sortQuery + pageQuery, {
      template: template
    }, function (err, resp) {
      _this2.$loader.removeClass('loading');

      if (err || !resp) {
        return;
      }

      var $resp = $(resp);
      var $currentPage = $content.find('[data-current-page]');

      if ($currentPage.length > 0) {
        $currentPage.data({
          currentPage: $resp.data('currentPage'),
          hasNextPage: Boolean($resp.data('hasNextPage'))
        });
        $currentPage.find('.productGrid').append($resp.find('.productGrid').children());
      } else {
        $content.html(resp).data('loaded', true);
      }

      _this2.initSlick();

      if ($resp.data('hasNextPage')) {
        _this2.$loadMore.show();
      } else {
        _this2.$loadMore.hide();
      }

      if ($resp.data('currentPage') > 1) {
        _this2.$collapse.show();
      } else {
        _this2.$collapse.hide();
      }
    });
  };

  _proto.initTabs = function initTabs() {
    var _this3 = this;

    Object(_theme_global_foundation__WEBPACK_IMPORTED_MODULE_2__["default"])(this.$scope);
    this.$scope.find('.tab-content.is-active').data('loaded', true);
    $('[data-tab]', this.$scope).on('toggled', function (event, tab) {
      var $content = $($(tab).find('a').attr('href'));

      if ($content.data('loaded')) {
        var $currentPage = $content.find('[data-current-page]');

        if ($currentPage.data('hasNextPage')) {
          _this3.$loadMore.show();
        } else {
          _this3.$loadMore.hide();
        }

        if (Number($currentPage.data('currentPage')) > 1) {
          _this3.$collapse.show();
        } else {
          _this3.$collapse.hide();
        }

        return;
      }

      _this3.$loadMore.hide();

      _this3.$collapse.hide();

      _this3.loadProducts({
        sort: $content.data('sort'),
        $content: $content
      });
    });
  };

  _proto.initSlick = function initSlick() {
    // init products carousel
    $('[data-slick]', this.$scope).on('init', function (e) {
      return setTimeout(function () {
        // init nested carousel
        $('[data-slick-nested]', e.target).each(function (i, el) {
          $(el).slick($(el).data('slickNested'));
        });
      }, 200);
    }).on('breakpoint', function (e) {
      return setTimeout(function () {
        $('[data-slick-nested]', e.target).slick('setPosition');
      }, 200);
    }).slick();
  };

  _proto.initBanner = function initBanner() {
    var $img = this.$scope.find('[data-banner] img');
    var src = "/product_images/uploaded_images/products-by-category-" + (this.index + 1) + ".jpg?c=2";

    if ($img.hasClass('lazyload')) {
      $img.attr('data-src', src);
    } else {
      $img.attr('src', src);
    }
  };

  _proto.initButtons = function initButtons() {
    this.$loadMore = this.$scope.find('.loadMore').hide();
    this.$collapse = this.$scope.find('.collapse').hide();

    if (this.$scope.find('.tab-content.is-active [data-current-page]').data('hasNextPage')) {
      this.$loadMore.show();
    }

    this.$loadMore.on('click', this.onLoadMore);
    this.$collapse.on('click', this.onCollapse);
  };

  _proto.onLoadMore = function onLoadMore(event) {
    event.preventDefault();
    var $content = this.$scope.find('.tab-content.is-active');
    var $currentPage = $content.find('[data-current-page]');
    var $hide = $content.find('.product.hide');

    if ($hide.length > 0) {
      $hide.show().removeClass('hide');
      this.$collapse.show();

      if (!$currentPage.data('hasNextPage')) {
        this.$loadMore.hide();
      }

      return;
    }

    if ($currentPage.data('hasNextPage')) {
      var sort = $content.data('sort');
      var page = Number($currentPage.data('currentPage')) + 1;
      this.loadProducts({
        sort: sort,
        page: page,
        $content: $content
      });
    } else {
      this.$loadMore.hide();
    }
  };

  _proto.onCollapse = function onCollapse(event) {
    event.preventDefault();

    if (this.limit) {
      var $tab = this.$scope.find('.tab-content.is-active');
      var $hide = $tab.find('.product').slice(this.limit).hide().addClass('hide');

      if ($hide.length > 0) {
        this.$loadMore.show();
      }

      $('html, body').animate({
        scrollTop: $tab.offset().top
      }, 500);
    }

    this.$collapse.hide();
  };

  return ProductsByCategory;
}();

var ProductsByCategories = /*#__PURE__*/function () {
  function ProductsByCategories($scope) {
    this.$scope = $scope;
    this.lazy = this.$scope.is('[data-lazy]');
    this.loaded = false;
    this.onCheckViewport = lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default()(this.onCheckViewport.bind(this), 100);
    this.bindEvents();

    if (!this.lazy) {
      this.load();
    }
  }

  var _proto2 = ProductsByCategories.prototype;

  _proto2.load = function load() {
    var _this4 = this;

    this.loaded = true;
    var sort = this.$scope.data('sort');
    var limit = this.$scope.data('limit');
    String(this.$scope.data('pbcstGroup')).split(',').map(function (idStr, index) {
      return new ProductsByCategory({
        id: idStr.trim(),
        index: index,
        sort: sort,
        limit: limit,
        $parent: _this4.$scope
      });
    });
  };

  _proto2.bindEvents = function bindEvents() {
    var _this5 = this;

    $('body').one('beforeload.instantload', function () {
      return _this5.unbindEvents();
    });

    if (this.lazy) {
      $(window).on('load resize scroll', this.onCheckViewport);
    }
  };

  _proto2.unbindEvents = function unbindEvents() {
    $(window).off('load resize scroll', this.onCheckViewport);
  };

  _proto2.onCheckViewport = function onCheckViewport() {
    if (this.loaded) {
      $(window).off('load resize scroll', this.onCheckViewport);
      return;
    }

    if (!this.$scope.is(':visible')) {
      return;
    }

    var offset = 300;
    var elTop = this.$scope.offset().top;
    var elBottom = elTop + this.$scope.outerHeight();
    var winTop = $(window).scrollTop();
    var winBottom = winTop + $(window).innerHeight();

    if (elTop - offset < winBottom && elBottom + offset > winTop) {
      this.load();
    }
  };

  return ProductsByCategories;
}();

function init(selector) {
  if (selector === void 0) {
    selector = '[data-pbcst-group]';
  }

  $(selector).each(function (i, el) {
    return new ProductsByCategories($(el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/emthemes-modez/special-products-tabs.js":
/*!***********************************************************!*\
  !*** ./assets/js/emthemes-modez/special-products-tabs.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return init; });
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");



var SpecialProductsTabs = /*#__PURE__*/function () {
  function SpecialProductsTabs($scope, context) {
    this.$scope = $scope;
    this.context = context;
    this.$viewportCheck = $scope.find('[data-viewport-check]');
    this.$loading = $scope.find('.loading').hide();
    this.$loadMore = $scope.find('.loadMore').hide();
    this.$collapse = $scope.find('.collapse').hide();
    this.defaultProductsCount = this.context.themeSettings.specialProductsTab_lazy_count + this.context.themeSettings.specialProductsTab_init_count;
    this.onCheckViewport = lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default()(this.onCheckViewport.bind(this), 100);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onCollapse = this.onCollapse.bind(this);
    this.onTabToggled = this.onTabToggled.bind(this);

    if (this.context.themeSettings.specialProductsTab_more) {
      this.$loadMore.show();
    }

    this.bindEvents();
  }

  var _proto = SpecialProductsTabs.prototype;

  _proto.bindEvents = function bindEvents() {
    var _this = this;

    $('body').one('beforeload.instantload', function () {
      return _this.unbindEvents();
    });

    if (this.$viewportCheck.length > 0) {
      $(window).on('load resize scroll', this.onCheckViewport);
    }

    if (this.context.themeSettings.specialProductsTab_more) {
      this.$loadMore.on('click', this.onLoadMore);
    }

    this.$collapse.on('click', this.onCollapse);
    $('[data-tab]', this.$scope).on('toggled', this.onTabToggled);
  };

  _proto.unbindEvents = function unbindEvents() {
    $(window).off('load resize scroll', this.onCheckViewport);
    this.$loadMore.off('click', this.onLoadMore);
    this.$collapse.off('click', this.onCollapse);
    $('[data-tab]', this.$scope).off('toggled', this.onTabToggled);
  };

  _proto.onCheckViewport = function onCheckViewport() {
    var _this2 = this;

    var offset = 250;
    this.$viewportCheck.each(function (i, el) {
      var $el = $(el);

      if (!$el.is(':visible')) {
        return;
      }

      var elTop = $el.offset().top;
      var elBottom = elTop + $el.outerHeight();
      var winTop = $(window).scrollTop();
      var winBottom = winTop + $(window).innerHeight();

      if (elTop - offset < winBottom && elBottom + offset > winTop) {
        _this2.loadViewportProducts($el.data('viewportCheck'), $el.closest('.tab-content').find('.productGrid, .productList, .productCarousel'));

        _this2.$viewportCheck = _this2.$viewportCheck.not($el);
        $el.remove();
      }
    });
  };

  _proto.onLoadMore = function onLoadMore(event) {
    var _this3 = this;

    event.preventDefault();
    var $tab = this.$scope.find('.tab-content.is-active');

    if (!$tab.data('loadedMore')) {
      $tab.data('loadedMore', true);
      var template = 'papa-supermarket/special-products-tabs/products';
      var limit = 100;
      var config = {
        products: {}
      };
      var type = $tab.data('productType');

      switch (type) {
        case 'featured':
          config.products.featured = {
            limit: limit
          };
          break;

        case 'top':
          config.products.top_sellers = {
            limit: limit
          };
          break;

        case 'new':
        default:
          config.products.new = {
            limit: limit
          };
          break;
      }

      this.$loading.show();
      this.$loadMore.attr('disabled', true);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage(this.context.urls.search, {
        template: template,
        config: config
      }, function (err, resp) {
        _this3.$loading.hide();

        _this3.$loadMore.removeAttr('disabled');

        if (err || !resp) {
          return;
        }

        var existProductIds = $tab.find('.product, .productCarousel-slide').map(function (i, el) {
          return $(el).data('productId');
        }).get();
        var $products = $(resp).find('.product, .productCarousel-slide').filter(function (i, el) {
          return existProductIds.indexOf($(el).data('productId')) === -1;
        });
        $products.slice(_this3.defaultProductsCount).hide();
        $tab.find('.productGrid, .productList, .productCarousel').append($products);

        if (!$products.is(':hidden')) {
          _this3.$loadMore.hide();
        }

        if ($products.length > 0) {
          _this3.$collapse.show();
        }
      });
    } else {
      var $products = $tab.find('.product, .productCarousel-slide').filter(':hidden');
      $products.slice(0, this.defaultProductsCount).show();

      if (!$products.is(':hidden')) {
        this.$loadMore.hide();
      }

      this.$collapse.show();
    }
  };

  _proto.onCollapse = function onCollapse(event) {
    event.preventDefault();
    var $tab = this.$scope.find('.tab-content.is-active');
    var $products = $tab.find('.product, .productCarousel-slide');
    $products.slice(this.defaultProductsCount).hide();
    this.$collapse.hide();

    if ($products.length > this.defaultProductsCount) {
      this.$loadMore.show();
    }

    $('html, body').animate({
      scrollTop: $tab.offset().top
    });
  };

  _proto.onTabToggled = function onTabToggled(event, tab) {
    var $tabContent = $($('a', tab).attr('href'));
    $('[data-slick]', $tabContent).slick('setPosition');

    if (this.$viewportCheck.length > 0) {
      this.onCheckViewport();
    }

    var $products = $tabContent.find('.product, .productCarousel-slide');
    var visible = $products.filter(':visible').length;

    if (this.context.themeSettings.specialProductsTab_more) {
      if (!$tabContent.data('loadedMore') || $products.is(':hidden')) {
        this.$loadMore.show();
      } else {
        this.$loadMore.hide();
      }

      if (visible > this.defaultProductsCount) {
        this.$collapse.show();
      } else {
        this.$collapse.hide();
      }
    }
  };

  _proto.loadViewportProducts = function loadViewportProducts(type, $container) {
    var _this4 = this;

    var template = 'papa-supermarket/special-products-tabs/products';
    var limit = this.defaultProductsCount;
    var config = {
      products: {}
    };

    switch (type) {
      case 'featured':
        config.products.featured = {
          limit: limit
        };
        break;

      case 'top':
        config.products.top_sellers = {
          limit: limit
        };
        break;

      case 'new':
      default:
        config.products.new = {
          limit: limit
        };
        break;
    }

    this.$loading.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage(this.context.urls.search, {
      template: template,
      config: config
    }, function (err, resp) {
      _this4.$loading.hide();

      if (err || !resp) {
        return;
      }

      var $products = $(resp).find('.product, .productCarousel-slide');
      $container.empty().append($products);
    });
  };

  return SpecialProductsTabs;
}();

function init(_ref) {
  var _ref$selector = _ref.selector,
      selector = _ref$selector === void 0 ? '[data-special-products-tabs]' : _ref$selector,
      context = _ref.context;
  $(selector).each(function (i, el) {
    var $el = $(el);

    if (!$el.data('specialProductsTabsInstance')) {
      $el.data('specialProductsTabsInstance', new SpecialProductsTabs($el, context));
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/emthemes-modez/youtube-carousel.js":
/*!******************************************************!*\
  !*** ./assets/js/emthemes-modez/youtube-carousel.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return youtubeCarouselFactory; });
/* harmony import */ var _theme_common_media_query_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../theme/common/media-query-list */ "./assets/js/theme/common/media-query-list.js");

var mediumMediaQuery;
var uid = 1;

var YoutubeSlick = /*#__PURE__*/function () {
  function YoutubeSlick(slick) {
    this.$slick = $(slick);
    this.$videos = this.$slick.find('[data-youtube]');
    this.onSlickInit = this.onSlickInit.bind(this);
    this.onSlickBeforeChange = this.onSlickBeforeChange.bind(this);
    this.onSlickAfterChange = this.onSlickAfterChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.bindEvents();
  }

  var _proto = YoutubeSlick.prototype;

  _proto.bindEvents = function bindEvents() {
    if (this.$slick.hasClass('slick-initialized')) {
      this.onSlickInit();
    }

    this.$slick.on('init', this.onSlickInit);
    this.$slick.on('beforeChange', this.onSlickBeforeChange);
    this.$slick.on('afterChange', this.onSlickAfterChange);
  };

  _proto.onPlayerReady = function onPlayerReady(event) {
    var _this = this;

    // store player object for use later
    $(event.target.getIframe()).closest('.slick-slide').data('youtube-player', event.target); // On desktop: Play video if first slide is video

    if (mediumMediaQuery.matches) {
      setTimeout(function () {
        if ($(event.target.getIframe()).closest('.slick-slide').hasClass('slick-active')) {
          if (_this.$slick.is('[data-youtube-mute]')) {
            event.target.mute();
          }

          if (_this.$slick.is('[data-youtube-autoplay]')) {
            _this.$slick.slick('slickPause');

            event.target.playVideo();
          }
        }
      }, 200);
    }
  };

  _proto.onPlayerStateChange = function onPlayerStateChange(event) {
    // Stop slick autoplay when video start playing
    if (event.data === YT.PlayerState.PLAYING) {
      // eslint-disable-line
      this.$slick.addClass('slick-video-playing');
      this.$slick.slick('slickPause');
    }

    if (event.data === YT.PlayerState.PAUSED) {
      // eslint-disable-line
      this.$slick.removeClass('slick-video-playing');
    } // go to next slide and enable autoplay back when video ended


    if (event.data === YT.PlayerState.ENDED) {
      // eslint-disable-line
      this.$slick.removeClass('slick-video-playing');
      this.$slick.slick('slickPlay');
      this.$slick.slick('slickNext');
    }
  };

  _proto.onSlickInit = function onSlickInit() {
    var _this2 = this;

    this.$videos.each(function (j, vid) {
      var $vid = $(vid);
      var id = "youtube_player_" + uid++;
      $vid.attr('id', id); // init player

      var player = new YT.Player(id, {
        // eslint-disable-line
        // host: 'http://www.youtube.com',
        videoId: $vid.data('youtube'),
        wmode: 'transparent',
        playerVars: {
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          wmode: 'transparent'
        },
        events: {
          onReady: _this2.onPlayerReady,
          onStateChange: _this2.onPlayerStateChange
        }
      });
    });
  };

  _proto.onSlickBeforeChange = function onSlickBeforeChange() {
    var player = this.$slick.find('.slick-slide.slick-active').data('youtube-player');

    if (player) {
      player.stopVideo();
    }
  };

  _proto.onSlickAfterChange = function onSlickAfterChange() {
    // Enable auto slide
    this.$slick.slick('slickPlay'); // On desktop:
    // - Auto play video when open next slide
    // - Stop auto slide

    if (mediumMediaQuery.matches) {
      var player = this.$slick.find('.slick-slide.slick-active').data('youtube-player');

      if (player) {
        if (this.$slick.is('[data-youtube-mute]')) {
          player.mute();
        }

        if (this.$slick.is('[data-youtube-autoplay]')) {
          this.$slick.slick('slickPause');
          player.playVideo();
        }
      }
    }
  };

  return YoutubeSlick;
}();

function initCarousel($carousel) {
  $carousel.each(function (i, slick) {
    var $slick = $(slick);

    if ($slick.find('[data-youtube]').length > 0) {
      $slick.addClass('slick-slider--video');
      new YoutubeSlick(slick); // eslint-disable-line
    }
  });
}

function youtubeCarouselFactory($carousel) {
  if ($carousel.find('[data-youtube]').length > 0) {
    mediumMediaQuery = Object(_theme_common_media_query_list__WEBPACK_IMPORTED_MODULE_0__["default"])('medium');

    if (typeof window.onYouTubeIframeAPIReady === 'undefined') {
      window.onYouTubeIframeAPIReady = initCarousel.bind(window, $carousel); // Load the IFrame Player API code asynchronously.

      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // $('body').append('<script src="https://www.youtube.com/iframe_api"></script>');
    } else {
      initCarousel($carousel);
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/home.js":
/*!*********************************!*\
  !*** ./assets/js/theme/home.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page-manager */ "./assets/js/page-manager.js");
/* harmony import */ var _emthemes_modez_products_by_category__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../emthemes-modez/products-by-category */ "./assets/js/emthemes-modez/products-by-category.js");
/* harmony import */ var _emthemes_modez_special_products_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../emthemes-modez/special-products-tabs */ "./assets/js/emthemes-modez/special-products-tabs.js");
/* harmony import */ var _emthemes_modez_youtube_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../emthemes-modez/youtube-carousel */ "./assets/js/emthemes-modez/youtube-carousel.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This file is added by Supermarket theme.
 */





var Home = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Home, _PageManager);

  function Home() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Home.prototype;

  _proto.onReady = function onReady() {
    this.initProductsByCategorySection();
    this.initSpecialProductsTabsSection();
    this.initMainCarouselSection();
    this.initBrandsCarouselSection();
  };

  _proto.initProductsByCategorySection = function initProductsByCategorySection() {
    if (this.context.hasProductsByCategorySortingTabs) {
      Object(_emthemes_modez_products_by_category__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }
  };

  _proto.initSpecialProductsTabsSection = function initSpecialProductsTabsSection() {
    // Refresh products carousel when tab is open
    if (this.context.hasSpecialProductsTabs) {
      Object(_emthemes_modez_special_products_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])({
        context: this.context
      });
    }
  };

  _proto.initMainCarouselSection = function initMainCarouselSection() {
    if (this.context.hasMainCarousel) {
      Object(_emthemes_modez_youtube_carousel__WEBPACK_IMPORTED_MODULE_3__["default"])($('[data-slick]')); //
      // Update main slideshow min-height to equal the vertical categories menu
      //

      var $categoriesMenu = $('body.papaSupermarket-layout--default .emthemesModez-verticalCategories--open');

      var updateMainSlideshowHeight = function updateMainSlideshowHeight() {
        $('.heroCarousel-slide').css('min-height', $(window).width() > 768 ? $categoriesMenu.height() + 20 + "px" : '');
      };

      if ($categoriesMenu.length > 0) {
        updateMainSlideshowHeight();
        $(window).on('resize', function () {
          return updateMainSlideshowHeight();
        });
      }
    }
  };

  _proto.initBrandsCarouselSection = function initBrandsCarouselSection() {
    $('[data-emthemesmodez-brand-carousel]').slick({
      dots: false,
      infinite: false,
      mobileFirst: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [{
        breakpoint: 1260,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 5
        }
      }, {
        breakpoint: 800,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 5
        }
      }, {
        breakpoint: 550,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 3
        }
      }]
    });
  };

  return Home;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./node_modules/lodash/throttle.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/throttle.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(/*! ./debounce */ "./node_modules/lodash/debounce.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovcHJvZHVjdHMtYnktY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2VtdGhlbWVzLW1vZGV6L3NwZWNpYWwtcHJvZHVjdHMtdGFicy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXoveW91dHViZS1jYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL3Rocm90dGxlLmpzIl0sIm5hbWVzIjpbIlByb2R1Y3RzQnlDYXRlZ29yeSIsImlkIiwiaW5kZXgiLCJzb3J0IiwibGltaXQiLCIkcGFyZW50Iiwib25Mb2FkTW9yZSIsImJpbmQiLCJvbkNvbGxhcHNlIiwiJHNjb3BlIiwiJCIsIiRsb2FkTW9yZSIsIiRjb2xsYXBzZSIsIiRsb2FkZXIiLCJhcHBlbmQiLCJyZXF1ZXN0IiwibGltaXRRdWVyeSIsInNvcnRRdWVyeSIsInRlbXBsYXRlIiwidXRpbHMiLCJhcGkiLCJnZXRQYWdlIiwiZXJyIiwicmVzcCIsImVycm9yIiwicmVtb3ZlIiwiJHJlc3AiLCJyZXBsYWNlV2l0aCIsImZpbmQiLCJpbml0VGFicyIsImluaXRTbGljayIsImluaXRCYW5uZXIiLCJpbml0QnV0dG9ucyIsImxvYWRQcm9kdWN0cyIsInBhZ2UiLCIkY29udGVudCIsInBhZ2VRdWVyeSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCIkY3VycmVudFBhZ2UiLCJsZW5ndGgiLCJkYXRhIiwiY3VycmVudFBhZ2UiLCJoYXNOZXh0UGFnZSIsIkJvb2xlYW4iLCJjaGlsZHJlbiIsImh0bWwiLCJzaG93IiwiaGlkZSIsImZvdW5kYXRpb24iLCJvbiIsImV2ZW50IiwidGFiIiwiYXR0ciIsIk51bWJlciIsImUiLCJzZXRUaW1lb3V0IiwidGFyZ2V0IiwiZWFjaCIsImkiLCJlbCIsInNsaWNrIiwiJGltZyIsInNyYyIsImhhc0NsYXNzIiwicHJldmVudERlZmF1bHQiLCIkaGlkZSIsIiR0YWIiLCJzbGljZSIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJQcm9kdWN0c0J5Q2F0ZWdvcmllcyIsImxhenkiLCJpcyIsImxvYWRlZCIsIm9uQ2hlY2tWaWV3cG9ydCIsImJpbmRFdmVudHMiLCJsb2FkIiwiU3RyaW5nIiwic3BsaXQiLCJtYXAiLCJpZFN0ciIsInRyaW0iLCJvbmUiLCJ1bmJpbmRFdmVudHMiLCJ3aW5kb3ciLCJvZmYiLCJlbFRvcCIsImVsQm90dG9tIiwib3V0ZXJIZWlnaHQiLCJ3aW5Ub3AiLCJ3aW5Cb3R0b20iLCJpbm5lckhlaWdodCIsImluaXQiLCJzZWxlY3RvciIsIlNwZWNpYWxQcm9kdWN0c1RhYnMiLCJjb250ZXh0IiwiJHZpZXdwb3J0Q2hlY2siLCIkbG9hZGluZyIsImRlZmF1bHRQcm9kdWN0c0NvdW50IiwidGhlbWVTZXR0aW5ncyIsInNwZWNpYWxQcm9kdWN0c1RhYl9sYXp5X2NvdW50Iiwic3BlY2lhbFByb2R1Y3RzVGFiX2luaXRfY291bnQiLCJvblRhYlRvZ2dsZWQiLCJzcGVjaWFsUHJvZHVjdHNUYWJfbW9yZSIsIiRlbCIsImxvYWRWaWV3cG9ydFByb2R1Y3RzIiwiY2xvc2VzdCIsIm5vdCIsImNvbmZpZyIsInByb2R1Y3RzIiwidHlwZSIsImZlYXR1cmVkIiwidG9wX3NlbGxlcnMiLCJuZXciLCJ1cmxzIiwic2VhcmNoIiwicmVtb3ZlQXR0ciIsImV4aXN0UHJvZHVjdElkcyIsImdldCIsIiRwcm9kdWN0cyIsImZpbHRlciIsImluZGV4T2YiLCIkdGFiQ29udGVudCIsInZpc2libGUiLCIkY29udGFpbmVyIiwiZW1wdHkiLCJtZWRpdW1NZWRpYVF1ZXJ5IiwidWlkIiwiWW91dHViZVNsaWNrIiwiJHNsaWNrIiwiJHZpZGVvcyIsIm9uU2xpY2tJbml0Iiwib25TbGlja0JlZm9yZUNoYW5nZSIsIm9uU2xpY2tBZnRlckNoYW5nZSIsIm9uUGxheWVyUmVhZHkiLCJvblBsYXllclN0YXRlQ2hhbmdlIiwiZ2V0SWZyYW1lIiwibWF0Y2hlcyIsIm11dGUiLCJwbGF5VmlkZW8iLCJZVCIsIlBsYXllclN0YXRlIiwiUExBWUlORyIsIlBBVVNFRCIsIkVOREVEIiwiaiIsInZpZCIsIiR2aWQiLCJwbGF5ZXIiLCJQbGF5ZXIiLCJ2aWRlb0lkIiwid21vZGUiLCJwbGF5ZXJWYXJzIiwiY29udHJvbHMiLCJkaXNhYmxla2IiLCJlbmFibGVqc2FwaSIsImZzIiwicmVsIiwic2hvd2luZm8iLCJpdl9sb2FkX3BvbGljeSIsIm1vZGVzdGJyYW5kaW5nIiwiZXZlbnRzIiwib25SZWFkeSIsIm9uU3RhdGVDaGFuZ2UiLCJzdG9wVmlkZW8iLCJpbml0Q2Fyb3VzZWwiLCIkY2Fyb3VzZWwiLCJ5b3V0dWJlQ2Fyb3VzZWxGYWN0b3J5IiwibWVkaWFRdWVyeUxpc3RGYWN0b3J5Iiwib25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkiLCJ0YWciLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJmaXJzdFNjcmlwdFRhZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsIkhvbWUiLCJpbml0UHJvZHVjdHNCeUNhdGVnb3J5U2VjdGlvbiIsImluaXRTcGVjaWFsUHJvZHVjdHNUYWJzU2VjdGlvbiIsImluaXRNYWluQ2Fyb3VzZWxTZWN0aW9uIiwiaW5pdEJyYW5kc0Nhcm91c2VsU2VjdGlvbiIsImhhc1Byb2R1Y3RzQnlDYXRlZ29yeVNvcnRpbmdUYWJzIiwiaW5pdFByb2R1Y3RzQnlDYXRlZ29yaWVzIiwiaGFzU3BlY2lhbFByb2R1Y3RzVGFicyIsImluaXRTcGVjaWFsUHJvZHVjdHNUYWJzIiwiaGFzTWFpbkNhcm91c2VsIiwiJGNhdGVnb3JpZXNNZW51IiwidXBkYXRlTWFpblNsaWRlc2hvd0hlaWdodCIsImNzcyIsIndpZHRoIiwiaGVpZ2h0IiwiZG90cyIsImluZmluaXRlIiwibW9iaWxlRmlyc3QiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBOztJQUVNQSxrQjtBQUNGLG9DQU1HO0FBQUEsUUFMQ0MsRUFLRCxRQUxDQSxFQUtEO0FBQUEsMEJBSkNDLEtBSUQ7QUFBQSxRQUpDQSxLQUlELDJCQUpTLENBSVQ7QUFBQSx5QkFIQ0MsSUFHRDtBQUFBLFFBSENBLElBR0QsMEJBSFEsRUFHUjtBQUFBLDBCQUZDQyxLQUVEO0FBQUEsUUFGQ0EsS0FFRCwyQkFGUyxFQUVUO0FBQUEsUUFEQ0MsT0FDRCxRQURDQSxPQUNEO0FBQ0MsU0FBS0MsVUFBTCxHQUFrQixLQUFLQSxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixJQUFyQixDQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxDQUFnQkQsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBbEI7QUFFQSxTQUFLTixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLSSxNQUFMLEdBQWNDLENBQUMsQ0FBQyxrRUFBRCxDQUFmO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkQsQ0FBQyxFQUFsQjtBQUNBLFNBQUtFLFNBQUwsR0FBaUJGLENBQUMsRUFBbEI7QUFDQSxTQUFLRyxPQUFMLEdBQWVILENBQUMsRUFBaEI7QUFFQSxTQUFLTCxPQUFMLENBQWFTLE1BQWIsQ0FBb0IsS0FBS0wsTUFBekI7QUFFQSxTQUFLTSxPQUFMO0FBQ0g7Ozs7U0FFREEsTyxHQUFBLG1CQUFVO0FBQUE7O0FBQ04sUUFBTUMsVUFBVSxHQUFHLEtBQUtaLEtBQUwsZUFBdUIsS0FBS0EsS0FBNUIsR0FBc0MsRUFBekQ7QUFDQSxRQUFNYSxTQUFT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QUFFTkQsc0JBQVksRUFBRTtBQUZSO0FBRmQsT0FmUTtBQU4rQixLQUEvQztBQThCSCxHOzs7RUF4RTZCSyxxRDs7Ozs7Ozs7Ozs7Ozs7QUNUbEMsZUFBZSxtQkFBTyxDQUFDLHFEQUFZO0FBQ25DLGVBQWUsbUJBQU8sQ0FBQyxxREFBWTs7QUFFbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTyxZQUFZO0FBQzlCLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsb0JBQW9CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IGZvdW5kYXRpb24gZnJvbSAnLi4vdGhlbWUvZ2xvYmFsL2ZvdW5kYXRpb24nO1xuXG5jbGFzcyBQcm9kdWN0c0J5Q2F0ZWdvcnkge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgaWQsXG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgc29ydCA9ICcnLFxuICAgICAgICBsaW1pdCA9ICcnLFxuICAgICAgICAkcGFyZW50LFxuICAgIH0pIHtcbiAgICAgICAgdGhpcy5vbkxvYWRNb3JlID0gdGhpcy5vbkxvYWRNb3JlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Db2xsYXBzZSA9IHRoaXMub25Db2xsYXBzZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0O1xuICAgICAgICB0aGlzLmxpbWl0ID0gbGltaXQ7XG4gICAgICAgIHRoaXMuJHBhcmVudCA9ICRwYXJlbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJCgnPGRpdiBjbGFzcz1cImVtdGhlbWVzTW9kZXotcHJvZHVjdHNCeUNhdGVnb3J5VGFicy1sb2FkaW5nXCI+PC9kaXY+Jyk7XG4gICAgICAgIHRoaXMuJGxvYWRNb3JlID0gJCgpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzZSA9ICQoKTtcbiAgICAgICAgdGhpcy4kbG9hZGVyID0gJCgpO1xuXG4gICAgICAgIHRoaXMuJHBhcmVudC5hcHBlbmQodGhpcy4kc2NvcGUpO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdCgpO1xuICAgIH1cblxuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpbWl0UXVlcnkgPSB0aGlzLmxpbWl0ID8gYCZsaW1pdD0ke3RoaXMubGltaXR9YCA6ICcnO1xuICAgICAgICBjb25zdCBzb3J0UXVlcnkgPSB0aGlzLnNvcnQgPyBgJnNvcnQ9JHt0aGlzLnNvcnR9YCA6ICcnO1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9ICdwYXBhLXN1cGVybWFya2V0L3Byb2R1Y3RzLWJ5LWNhdGVnb3J5LXNvcnRpbmctdGFicy9zZWN0aW9uJztcblxuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZShgL2NhdGVnb3JpZXMucGhwP2NhdGVnb3J5PSR7dGhpcy5pZH0ke2xpbWl0UXVlcnl9JHtzb3J0UXVlcnl9YCwgeyB0ZW1wbGF0ZSB9LCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyIHx8ICFyZXNwIHx8IHJlc3AuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRyZXNwID0gJChyZXNwKTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlcGxhY2VXaXRoKCRyZXNwKTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHJlc3A7XG4gICAgICAgICAgICB0aGlzLiRsb2FkZXIgPSB0aGlzLiRzY29wZS5maW5kKCcubG9hZGVyJyk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRCYW5uZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEJ1dHRvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFByb2R1Y3RzKHtcbiAgICAgICAgc29ydCA9ICcnLFxuICAgICAgICBwYWdlID0gJycsXG4gICAgICAgICRjb250ZW50LFxuICAgIH0pIHtcbiAgICAgICAgY29uc3QgbGltaXRRdWVyeSA9IHRoaXMubGltaXQgPyBgJmxpbWl0PSR7dGhpcy5saW1pdH1gIDogJyc7XG4gICAgICAgIGNvbnN0IHNvcnRRdWVyeSA9IHNvcnQgPyBgJnNvcnQ9JHtzb3J0fWAgOiAnJztcbiAgICAgICAgY29uc3QgcGFnZVF1ZXJ5ID0gcGFnZSA/IGAmcGFnZT0ke3BhZ2V9YCA6ICcnO1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9ICdwYXBhLXN1cGVybWFya2V0L3Byb2R1Y3RzLWJ5LWNhdGVnb3J5LXNvcnRpbmctdGFicy9wcm9kdWN0cyc7XG5cbiAgICAgICAgdGhpcy4kbG9hZGVyLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UoYC9jYXRlZ29yaWVzLnBocD9jYXRlZ29yeT0ke3RoaXMuaWR9JHtsaW1pdFF1ZXJ5fSR7c29ydFF1ZXJ5fSR7cGFnZVF1ZXJ5fWAsIHsgdGVtcGxhdGUgfSwgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kbG9hZGVyLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgICAgIGlmIChlcnIgfHwgIXJlc3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRyZXNwID0gJChyZXNwKTtcbiAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50UGFnZSA9ICRjb250ZW50LmZpbmQoJ1tkYXRhLWN1cnJlbnQtcGFnZV0nKTtcblxuICAgICAgICAgICAgaWYgKCRjdXJyZW50UGFnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJGN1cnJlbnRQYWdlLmRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogJHJlc3AuZGF0YSgnY3VycmVudFBhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgaGFzTmV4dFBhZ2U6IEJvb2xlYW4oJHJlc3AuZGF0YSgnaGFzTmV4dFBhZ2UnKSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJGN1cnJlbnRQYWdlLmZpbmQoJy5wcm9kdWN0R3JpZCcpLmFwcGVuZCgkcmVzcC5maW5kKCcucHJvZHVjdEdyaWQnKS5jaGlsZHJlbigpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwocmVzcClcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2xvYWRlZCcsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmluaXRTbGljaygpO1xuXG4gICAgICAgICAgICBpZiAoJHJlc3AuZGF0YSgnaGFzTmV4dFBhZ2UnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxvYWRNb3JlLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHJlc3AuZGF0YSgnY3VycmVudFBhZ2UnKSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb2xsYXBzZS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbGxhcHNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFRhYnMoKSB7XG4gICAgICAgIGZvdW5kYXRpb24odGhpcy4kc2NvcGUpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmZpbmQoJy50YWItY29udGVudC5pcy1hY3RpdmUnKS5kYXRhKCdsb2FkZWQnLCB0cnVlKTtcblxuICAgICAgICAkKCdbZGF0YS10YWJdJywgdGhpcy4kc2NvcGUpLm9uKCd0b2dnbGVkJywgKGV2ZW50LCB0YWIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRjb250ZW50ID0gJCgkKHRhYikuZmluZCgnYScpLmF0dHIoJ2hyZWYnKSk7XG5cbiAgICAgICAgICAgIGlmICgkY29udGVudC5kYXRhKCdsb2FkZWQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50UGFnZSA9ICRjb250ZW50LmZpbmQoJ1tkYXRhLWN1cnJlbnQtcGFnZV0nKTtcblxuICAgICAgICAgICAgICAgIGlmICgkY3VycmVudFBhZ2UuZGF0YSgnaGFzTmV4dFBhZ2UnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2FkTW9yZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoJGN1cnJlbnRQYWdlLmRhdGEoJ2N1cnJlbnRQYWdlJykpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRjb2xsYXBzZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY29sbGFwc2UuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy4kY29sbGFwc2UuaGlkZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRQcm9kdWN0cyh7XG4gICAgICAgICAgICAgICAgc29ydDogJGNvbnRlbnQuZGF0YSgnc29ydCcpLFxuICAgICAgICAgICAgICAgICRjb250ZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRTbGljaygpIHtcbiAgICAgICAgLy8gaW5pdCBwcm9kdWN0cyBjYXJvdXNlbFxuICAgICAgICAkKCdbZGF0YS1zbGlja10nLCB0aGlzLiRzY29wZSlcbiAgICAgICAgICAgIC5vbignaW5pdCcsIGUgPT4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gaW5pdCBuZXN0ZWQgY2Fyb3VzZWxcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1zbGljay1uZXN0ZWRdJywgZS50YXJnZXQpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoZWwpLnNsaWNrKCQoZWwpLmRhdGEoJ3NsaWNrTmVzdGVkJykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMjAwKSlcbiAgICAgICAgICAgIC5vbignYnJlYWtwb2ludCcsIGUgPT4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtc2xpY2stbmVzdGVkXScsIGUudGFyZ2V0KS5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICAgICAgICAgIH0sIDIwMCkpXG4gICAgICAgICAgICAuc2xpY2soKTtcbiAgICB9XG5cbiAgICBpbml0QmFubmVyKCkge1xuICAgICAgICBjb25zdCAkaW1nID0gdGhpcy4kc2NvcGUuZmluZCgnW2RhdGEtYmFubmVyXSBpbWcnKTtcbiAgICAgICAgY29uc3Qgc3JjID0gYC9wcm9kdWN0X2ltYWdlcy91cGxvYWRlZF9pbWFnZXMvcHJvZHVjdHMtYnktY2F0ZWdvcnktJHt0aGlzLmluZGV4ICsgMX0uanBnP2M9MmA7XG5cbiAgICAgICAgaWYgKCRpbWcuaGFzQ2xhc3MoJ2xhenlsb2FkJykpIHtcbiAgICAgICAgICAgICRpbWcuYXR0cignZGF0YS1zcmMnLCBzcmMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5hdHRyKCdzcmMnLCBzcmMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEJ1dHRvbnMoKSB7XG4gICAgICAgIHRoaXMuJGxvYWRNb3JlID0gdGhpcy4kc2NvcGUuZmluZCgnLmxvYWRNb3JlJykuaGlkZSgpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzZSA9IHRoaXMuJHNjb3BlLmZpbmQoJy5jb2xsYXBzZScpLmhpZGUoKTtcblxuICAgICAgICBpZiAodGhpcy4kc2NvcGUuZmluZCgnLnRhYi1jb250ZW50LmlzLWFjdGl2ZSBbZGF0YS1jdXJyZW50LXBhZ2VdJykuZGF0YSgnaGFzTmV4dFBhZ2UnKSkge1xuICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kbG9hZE1vcmUub24oJ2NsaWNrJywgdGhpcy5vbkxvYWRNb3JlKTtcbiAgICAgICAgdGhpcy4kY29sbGFwc2Uub24oJ2NsaWNrJywgdGhpcy5vbkNvbGxhcHNlKTtcbiAgICB9XG5cbiAgICBvbkxvYWRNb3JlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSB0aGlzLiRzY29wZS5maW5kKCcudGFiLWNvbnRlbnQuaXMtYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0ICRjdXJyZW50UGFnZSA9ICRjb250ZW50LmZpbmQoJ1tkYXRhLWN1cnJlbnQtcGFnZV0nKTtcbiAgICAgICAgY29uc3QgJGhpZGUgPSAkY29udGVudC5maW5kKCcucHJvZHVjdC5oaWRlJyk7XG5cbiAgICAgICAgaWYgKCRoaWRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICRoaWRlLnNob3coKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgdGhpcy4kY29sbGFwc2Uuc2hvdygpO1xuXG4gICAgICAgICAgICBpZiAoISRjdXJyZW50UGFnZS5kYXRhKCdoYXNOZXh0UGFnZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRjdXJyZW50UGFnZS5kYXRhKCdoYXNOZXh0UGFnZScpKSB7XG4gICAgICAgICAgICBjb25zdCBzb3J0ID0gJGNvbnRlbnQuZGF0YSgnc29ydCcpO1xuICAgICAgICAgICAgY29uc3QgcGFnZSA9IE51bWJlcigkY3VycmVudFBhZ2UuZGF0YSgnY3VycmVudFBhZ2UnKSkgKyAxO1xuICAgICAgICAgICAgdGhpcy5sb2FkUHJvZHVjdHMoe1xuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICAkY29udGVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db2xsYXBzZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmxpbWl0KSB7XG4gICAgICAgICAgICBjb25zdCAkdGFiID0gdGhpcy4kc2NvcGUuZmluZCgnLnRhYi1jb250ZW50LmlzLWFjdGl2ZScpO1xuICAgICAgICAgICAgY29uc3QgJGhpZGUgPSAkdGFiLmZpbmQoJy5wcm9kdWN0Jykuc2xpY2UodGhpcy5saW1pdCkuaGlkZSgpLmFkZENsYXNzKCdoaWRlJyk7XG5cbiAgICAgICAgICAgIGlmICgkaGlkZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuc2hvdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkdGFiLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjb2xsYXBzZS5oaWRlKCk7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9kdWN0c0J5Q2F0ZWdvcmllcyB7XG4gICAgY29uc3RydWN0b3IoJHNjb3BlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLmxhenkgPSB0aGlzLiRzY29wZS5pcygnW2RhdGEtbGF6eV0nKTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm9uQ2hlY2tWaWV3cG9ydCA9IHRocm90dGxlKHRoaXMub25DaGVja1ZpZXdwb3J0LmJpbmQodGhpcyksIDEwMCk7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IHNvcnQgPSB0aGlzLiRzY29wZS5kYXRhKCdzb3J0Jyk7XG4gICAgICAgIGNvbnN0IGxpbWl0ID0gdGhpcy4kc2NvcGUuZGF0YSgnbGltaXQnKTtcblxuICAgICAgICBTdHJpbmcodGhpcy4kc2NvcGUuZGF0YSgncGJjc3RHcm91cCcpKS5zcGxpdCgnLCcpLm1hcCgoaWRTdHIsIGluZGV4KSA9PiBuZXcgUHJvZHVjdHNCeUNhdGVnb3J5KHtcbiAgICAgICAgICAgIGlkOiBpZFN0ci50cmltKCksXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICAgICRwYXJlbnQ6IHRoaXMuJHNjb3BlLFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgJCgnYm9keScpLm9uZSgnYmVmb3JlbG9hZC5pbnN0YW50bG9hZCcsICgpID0+IHRoaXMudW5iaW5kRXZlbnRzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUgc2Nyb2xsJywgdGhpcy5vbkNoZWNrVmlld3BvcnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdsb2FkIHJlc2l6ZSBzY3JvbGwnLCB0aGlzLm9uQ2hlY2tWaWV3cG9ydCk7XG4gICAgfVxuXG4gICAgb25DaGVja1ZpZXdwb3J0KCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgICQod2luZG93KS5vZmYoJ2xvYWQgcmVzaXplIHNjcm9sbCcsIHRoaXMub25DaGVja1ZpZXdwb3J0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy4kc2NvcGUuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDMwMDtcbiAgICAgICAgY29uc3QgZWxUb3AgPSB0aGlzLiRzY29wZS5vZmZzZXQoKS50b3A7XG4gICAgICAgIGNvbnN0IGVsQm90dG9tID0gZWxUb3AgKyB0aGlzLiRzY29wZS5vdXRlckhlaWdodCgpO1xuICAgICAgICBjb25zdCB3aW5Ub3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGNvbnN0IHdpbkJvdHRvbSA9IHdpblRvcCArICQod2luZG93KS5pbm5lckhlaWdodCgpO1xuXG4gICAgICAgIGlmIChlbFRvcCAtIG9mZnNldCA8IHdpbkJvdHRvbSAmJiBlbEJvdHRvbSArIG9mZnNldCA+IHdpblRvcCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoc2VsZWN0b3IgPSAnW2RhdGEtcGJjc3QtZ3JvdXBdJykge1xuICAgICQoc2VsZWN0b3IpLmVhY2goKGksIGVsKSA9PiBuZXcgUHJvZHVjdHNCeUNhdGVnb3JpZXMoJChlbCkpKTtcbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmNsYXNzIFNwZWNpYWxQcm9kdWN0c1RhYnMge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgY29udGV4dCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy4kdmlld3BvcnRDaGVjayA9ICRzY29wZS5maW5kKCdbZGF0YS12aWV3cG9ydC1jaGVja10nKTtcbiAgICAgICAgdGhpcy4kbG9hZGluZyA9ICRzY29wZS5maW5kKCcubG9hZGluZycpLmhpZGUoKTtcbiAgICAgICAgdGhpcy4kbG9hZE1vcmUgPSAkc2NvcGUuZmluZCgnLmxvYWRNb3JlJykuaGlkZSgpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzZSA9ICRzY29wZS5maW5kKCcuY29sbGFwc2UnKS5oaWRlKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByb2R1Y3RzQ291bnQgPSB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5zcGVjaWFsUHJvZHVjdHNUYWJfbGF6eV9jb3VudCArIHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnNwZWNpYWxQcm9kdWN0c1RhYl9pbml0X2NvdW50O1xuXG4gICAgICAgIHRoaXMub25DaGVja1ZpZXdwb3J0ID0gdGhyb3R0bGUodGhpcy5vbkNoZWNrVmlld3BvcnQuYmluZCh0aGlzKSwgMTAwKTtcbiAgICAgICAgdGhpcy5vbkxvYWRNb3JlID0gdGhpcy5vbkxvYWRNb3JlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Db2xsYXBzZSA9IHRoaXMub25Db2xsYXBzZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uVGFiVG9nZ2xlZCA9IHRoaXMub25UYWJUb2dnbGVkLmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnNwZWNpYWxQcm9kdWN0c1RhYl9tb3JlKSB7XG4gICAgICAgICAgICB0aGlzLiRsb2FkTW9yZS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICAkKCdib2R5Jykub25lKCdiZWZvcmVsb2FkLmluc3RhbnRsb2FkJywgKCkgPT4gdGhpcy51bmJpbmRFdmVudHMoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuJHZpZXdwb3J0Q2hlY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZSBzY3JvbGwnLCB0aGlzLm9uQ2hlY2tWaWV3cG9ydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3Muc3BlY2lhbFByb2R1Y3RzVGFiX21vcmUpIHtcbiAgICAgICAgICAgIHRoaXMuJGxvYWRNb3JlLm9uKCdjbGljaycsIHRoaXMub25Mb2FkTW9yZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjb2xsYXBzZS5vbignY2xpY2snLCB0aGlzLm9uQ29sbGFwc2UpO1xuXG4gICAgICAgICQoJ1tkYXRhLXRhYl0nLCB0aGlzLiRzY29wZSkub24oJ3RvZ2dsZWQnLCB0aGlzLm9uVGFiVG9nZ2xlZCk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdsb2FkIHJlc2l6ZSBzY3JvbGwnLCB0aGlzLm9uQ2hlY2tWaWV3cG9ydCk7XG4gICAgICAgIHRoaXMuJGxvYWRNb3JlLm9mZignY2xpY2snLCB0aGlzLm9uTG9hZE1vcmUpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzZS5vZmYoJ2NsaWNrJywgdGhpcy5vbkNvbGxhcHNlKTtcbiAgICAgICAgJCgnW2RhdGEtdGFiXScsIHRoaXMuJHNjb3BlKS5vZmYoJ3RvZ2dsZWQnLCB0aGlzLm9uVGFiVG9nZ2xlZCk7XG4gICAgfVxuXG4gICAgb25DaGVja1ZpZXdwb3J0KCkge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSAyNTA7XG5cbiAgICAgICAgdGhpcy4kdmlld3BvcnRDaGVjay5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGVsID0gJChlbCk7XG5cbiAgICAgICAgICAgIGlmICghJGVsLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbFRvcCA9ICRlbC5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICBjb25zdCBlbEJvdHRvbSA9IGVsVG9wICsgJGVsLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICBjb25zdCB3aW5Ub3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICBjb25zdCB3aW5Cb3R0b20gPSB3aW5Ub3AgKyAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgaWYgKGVsVG9wIC0gb2Zmc2V0IDwgd2luQm90dG9tICYmIGVsQm90dG9tICsgb2Zmc2V0ID4gd2luVG9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkVmlld3BvcnRQcm9kdWN0cyhcbiAgICAgICAgICAgICAgICAgICAgJGVsLmRhdGEoJ3ZpZXdwb3J0Q2hlY2snKSxcbiAgICAgICAgICAgICAgICAgICAgJGVsLmNsb3Nlc3QoJy50YWItY29udGVudCcpLmZpbmQoJy5wcm9kdWN0R3JpZCwgLnByb2R1Y3RMaXN0LCAucHJvZHVjdENhcm91c2VsJyksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHZpZXdwb3J0Q2hlY2sgPSB0aGlzLiR2aWV3cG9ydENoZWNrLm5vdCgkZWwpO1xuICAgICAgICAgICAgICAgICRlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Mb2FkTW9yZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YWIgPSB0aGlzLiRzY29wZS5maW5kKCcudGFiLWNvbnRlbnQuaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgaWYgKCEkdGFiLmRhdGEoJ2xvYWRlZE1vcmUnKSkge1xuICAgICAgICAgICAgJHRhYi5kYXRhKCdsb2FkZWRNb3JlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gJ3BhcGEtc3VwZXJtYXJrZXQvc3BlY2lhbC1wcm9kdWN0cy10YWJzL3Byb2R1Y3RzJztcbiAgICAgICAgICAgIGNvbnN0IGxpbWl0ID0gMTAwO1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0geyBwcm9kdWN0czoge30gfTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAkdGFiLmRhdGEoJ3Byb2R1Y3RUeXBlJyk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZmVhdHVyZWQnOlxuICAgICAgICAgICAgICAgIGNvbmZpZy5wcm9kdWN0cy5mZWF0dXJlZCA9IHsgbGltaXQgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgY29uZmlnLnByb2R1Y3RzLnRvcF9zZWxsZXJzID0geyBsaW1pdCB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uZmlnLnByb2R1Y3RzLm5ldyA9IHsgbGltaXQgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kbG9hZGluZy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLiRsb2FkTW9yZS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh0aGlzLmNvbnRleHQudXJscy5zZWFyY2gsIHsgdGVtcGxhdGUsIGNvbmZpZyB9LCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIgfHwgIXJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0UHJvZHVjdElkcyA9ICR0YWJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5wcm9kdWN0LCAucHJvZHVjdENhcm91c2VsLXNsaWRlJylcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoaSwgZWwpID0+ICQoZWwpLmRhdGEoJ3Byb2R1Y3RJZCcpKS5nZXQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0cyA9ICQocmVzcClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5wcm9kdWN0LCAucHJvZHVjdENhcm91c2VsLXNsaWRlJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoaSwgZWwpID0+IGV4aXN0UHJvZHVjdElkcy5pbmRleE9mKCQoZWwpLmRhdGEoJ3Byb2R1Y3RJZCcpKSA9PT0gLTEpO1xuXG4gICAgICAgICAgICAgICAgJHByb2R1Y3RzXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSh0aGlzLmRlZmF1bHRQcm9kdWN0c0NvdW50KVxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgJHRhYlxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnByb2R1Y3RHcmlkLCAucHJvZHVjdExpc3QsIC5wcm9kdWN0Q2Fyb3VzZWwnKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCRwcm9kdWN0cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRwcm9kdWN0cy5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGxvYWRNb3JlLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoJHByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY29sbGFwc2Uuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RzID0gJHRhYi5maW5kKCcucHJvZHVjdCwgLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpLmZpbHRlcignOmhpZGRlbicpO1xuXG4gICAgICAgICAgICAkcHJvZHVjdHNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgdGhpcy5kZWZhdWx0UHJvZHVjdHNDb3VudClcbiAgICAgICAgICAgICAgICAuc2hvdygpO1xuXG4gICAgICAgICAgICBpZiAoISRwcm9kdWN0cy5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRjb2xsYXBzZS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbGxhcHNlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJHRhYiA9IHRoaXMuJHNjb3BlLmZpbmQoJy50YWItY29udGVudC5pcy1hY3RpdmUnKTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RzID0gJHRhYi5maW5kKCcucHJvZHVjdCwgLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpO1xuXG4gICAgICAgICRwcm9kdWN0cy5zbGljZSh0aGlzLmRlZmF1bHRQcm9kdWN0c0NvdW50KS5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy4kY29sbGFwc2UuaGlkZSgpO1xuXG4gICAgICAgIGlmICgkcHJvZHVjdHMubGVuZ3RoID4gdGhpcy5kZWZhdWx0UHJvZHVjdHNDb3VudCkge1xuICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkdGFiLm9mZnNldCgpLnRvcCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25UYWJUb2dnbGVkKGV2ZW50LCB0YWIpIHtcbiAgICAgICAgY29uc3QgJHRhYkNvbnRlbnQgPSAkKCQoJ2EnLCB0YWIpLmF0dHIoJ2hyZWYnKSk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2xpY2tdJywgJHRhYkNvbnRlbnQpLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuXG4gICAgICAgIGlmICh0aGlzLiR2aWV3cG9ydENoZWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMub25DaGVja1ZpZXdwb3J0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkcHJvZHVjdHMgPSAkdGFiQ29udGVudC5maW5kKCcucHJvZHVjdCwgLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpO1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gJHByb2R1Y3RzLmZpbHRlcignOnZpc2libGUnKS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnNwZWNpYWxQcm9kdWN0c1RhYl9tb3JlKSB7XG4gICAgICAgICAgICBpZiAoISR0YWJDb250ZW50LmRhdGEoJ2xvYWRlZE1vcmUnKSB8fCAkcHJvZHVjdHMuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxvYWRNb3JlLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9hZE1vcmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmlzaWJsZSA+IHRoaXMuZGVmYXVsdFByb2R1Y3RzQ291bnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb2xsYXBzZS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbGxhcHNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRWaWV3cG9ydFByb2R1Y3RzKHR5cGUsICRjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSAncGFwYS1zdXBlcm1hcmtldC9zcGVjaWFsLXByb2R1Y3RzLXRhYnMvcHJvZHVjdHMnO1xuICAgICAgICBjb25zdCBsaW1pdCA9IHRoaXMuZGVmYXVsdFByb2R1Y3RzQ291bnQ7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHsgcHJvZHVjdHM6IHt9IH07XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2ZlYXR1cmVkJzpcbiAgICAgICAgICAgIGNvbmZpZy5wcm9kdWN0cy5mZWF0dXJlZCA9IHsgbGltaXQgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgY29uZmlnLnByb2R1Y3RzLnRvcF9zZWxsZXJzID0geyBsaW1pdCB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ25ldyc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25maWcucHJvZHVjdHMubmV3ID0geyBsaW1pdCB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRsb2FkaW5nLnNob3coKTtcblxuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh0aGlzLmNvbnRleHQudXJscy5zZWFyY2gsIHsgdGVtcGxhdGUsIGNvbmZpZyB9LCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRsb2FkaW5nLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKGVyciB8fCAhcmVzcCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RzID0gJChyZXNwKS5maW5kKCcucHJvZHVjdCwgLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpO1xuICAgICAgICAgICAgJGNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZCgkcHJvZHVjdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoeyBzZWxlY3RvciA9ICdbZGF0YS1zcGVjaWFsLXByb2R1Y3RzLXRhYnNdJywgY29udGV4dCB9KSB7XG4gICAgJChzZWxlY3RvcikuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgICAgIGlmICghJGVsLmRhdGEoJ3NwZWNpYWxQcm9kdWN0c1RhYnNJbnN0YW5jZScpKSB7XG4gICAgICAgICAgICAkZWwuZGF0YSgnc3BlY2lhbFByb2R1Y3RzVGFic0luc3RhbmNlJywgbmV3IFNwZWNpYWxQcm9kdWN0c1RhYnMoJGVsLCBjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCBtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkgZnJvbSAnLi4vdGhlbWUvY29tbW9uL21lZGlhLXF1ZXJ5LWxpc3QnO1xuXG5sZXQgbWVkaXVtTWVkaWFRdWVyeTtcbmxldCB1aWQgPSAxO1xuXG5jbGFzcyBZb3V0dWJlU2xpY2sge1xuICAgIGNvbnN0cnVjdG9yKHNsaWNrKSB7XG4gICAgICAgIHRoaXMuJHNsaWNrID0gJChzbGljayk7XG4gICAgICAgIHRoaXMuJHZpZGVvcyA9IHRoaXMuJHNsaWNrLmZpbmQoJ1tkYXRhLXlvdXR1YmVdJyk7XG4gICAgICAgIHRoaXMub25TbGlja0luaXQgPSB0aGlzLm9uU2xpY2tJbml0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25TbGlja0JlZm9yZUNoYW5nZSA9IHRoaXMub25TbGlja0JlZm9yZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uU2xpY2tBZnRlckNoYW5nZSA9IHRoaXMub25TbGlja0FmdGVyQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSA9IHRoaXMub25QbGF5ZXJSZWFkeS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUGxheWVyU3RhdGVDaGFuZ2UgPSB0aGlzLm9uUGxheWVyU3RhdGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuJHNsaWNrLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XG4gICAgICAgICAgICB0aGlzLm9uU2xpY2tJbml0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRzbGljay5vbignaW5pdCcsIHRoaXMub25TbGlja0luaXQpO1xuICAgICAgICB0aGlzLiRzbGljay5vbignYmVmb3JlQ2hhbmdlJywgdGhpcy5vblNsaWNrQmVmb3JlQ2hhbmdlKTtcbiAgICAgICAgdGhpcy4kc2xpY2sub24oJ2FmdGVyQ2hhbmdlJywgdGhpcy5vblNsaWNrQWZ0ZXJDaGFuZ2UpO1xuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgLy8gc3RvcmUgcGxheWVyIG9iamVjdCBmb3IgdXNlIGxhdGVyXG4gICAgICAgICQoZXZlbnQudGFyZ2V0LmdldElmcmFtZSgpKS5jbG9zZXN0KCcuc2xpY2stc2xpZGUnKS5kYXRhKCd5b3V0dWJlLXBsYXllcicsIGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgLy8gT24gZGVza3RvcDogUGxheSB2aWRlbyBpZiBmaXJzdCBzbGlkZSBpcyB2aWRlb1xuICAgICAgICBpZiAobWVkaXVtTWVkaWFRdWVyeS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQuZ2V0SWZyYW1lKCkpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLmhhc0NsYXNzKCdzbGljay1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kc2xpY2suaXMoJ1tkYXRhLXlvdXR1YmUtbXV0ZV0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0Lm11dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kc2xpY2suaXMoJ1tkYXRhLXlvdXR1YmUtYXV0b3BsYXldJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNsaWNrLnNsaWNrKCdzbGlja1BhdXNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQucGxheVZpZGVvKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJTdGF0ZUNoYW5nZShldmVudCkge1xuICAgICAgICAvLyBTdG9wIHNsaWNrIGF1dG9wbGF5IHdoZW4gdmlkZW8gc3RhcnQgcGxheWluZ1xuICAgICAgICBpZiAoZXZlbnQuZGF0YSA9PT0gWVQuUGxheWVyU3RhdGUuUExBWUlORykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICB0aGlzLiRzbGljay5hZGRDbGFzcygnc2xpY2stdmlkZW8tcGxheWluZycpO1xuICAgICAgICAgICAgdGhpcy4kc2xpY2suc2xpY2soJ3NsaWNrUGF1c2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5kYXRhID09PSBZVC5QbGF5ZXJTdGF0ZS5QQVVTRUQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgdGhpcy4kc2xpY2sucmVtb3ZlQ2xhc3MoJ3NsaWNrLXZpZGVvLXBsYXlpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdvIHRvIG5leHQgc2xpZGUgYW5kIGVuYWJsZSBhdXRvcGxheSBiYWNrIHdoZW4gdmlkZW8gZW5kZWRcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEgPT09IFlULlBsYXllclN0YXRlLkVOREVEKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgIHRoaXMuJHNsaWNrLnJlbW92ZUNsYXNzKCdzbGljay12aWRlby1wbGF5aW5nJyk7XG4gICAgICAgICAgICB0aGlzLiRzbGljay5zbGljaygnc2xpY2tQbGF5Jyk7XG4gICAgICAgICAgICB0aGlzLiRzbGljay5zbGljaygnc2xpY2tOZXh0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNsaWNrSW5pdCgpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLmVhY2goKGosIHZpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHZpZCA9ICQodmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gYHlvdXR1YmVfcGxheWVyXyR7dWlkKyt9YDtcblxuICAgICAgICAgICAgJHZpZC5hdHRyKCdpZCcsIGlkKTtcblxuICAgICAgICAgICAgLy8gaW5pdCBwbGF5ZXJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoaWQsIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIC8vIGhvc3Q6ICdodHRwOi8vd3d3LnlvdXR1YmUuY29tJyxcbiAgICAgICAgICAgICAgICB2aWRlb0lkOiAkdmlkLmRhdGEoJ3lvdXR1YmUnKSxcbiAgICAgICAgICAgICAgICB3bW9kZTogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzOiAwLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxla2I6IDEsXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWpzYXBpOiAxLFxuICAgICAgICAgICAgICAgICAgICBmczogMCxcbiAgICAgICAgICAgICAgICAgICAgcmVsOiAwLFxuICAgICAgICAgICAgICAgICAgICBzaG93aW5mbzogMCxcbiAgICAgICAgICAgICAgICAgICAgaXZfbG9hZF9wb2xpY3k6IDMsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVzdGJyYW5kaW5nOiAxLFxuICAgICAgICAgICAgICAgICAgICB3bW9kZTogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgICAgICBvblJlYWR5OiB0aGlzLm9uUGxheWVyUmVhZHksXG4gICAgICAgICAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2U6IHRoaXMub25QbGF5ZXJTdGF0ZUNoYW5nZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU2xpY2tCZWZvcmVDaGFuZ2UoKSB7XG4gICAgICAgIGNvbnN0IHBsYXllciA9IHRoaXMuJHNsaWNrLmZpbmQoJy5zbGljay1zbGlkZS5zbGljay1hY3RpdmUnKS5kYXRhKCd5b3V0dWJlLXBsYXllcicpO1xuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgICBwbGF5ZXIuc3RvcFZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNsaWNrQWZ0ZXJDaGFuZ2UoKSB7XG4gICAgICAgIC8vIEVuYWJsZSBhdXRvIHNsaWRlXG4gICAgICAgIHRoaXMuJHNsaWNrLnNsaWNrKCdzbGlja1BsYXknKTtcblxuICAgICAgICAvLyBPbiBkZXNrdG9wOlxuICAgICAgICAvLyAtIEF1dG8gcGxheSB2aWRlbyB3aGVuIG9wZW4gbmV4dCBzbGlkZVxuICAgICAgICAvLyAtIFN0b3AgYXV0byBzbGlkZVxuICAgICAgICBpZiAobWVkaXVtTWVkaWFRdWVyeS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLiRzbGljay5maW5kKCcuc2xpY2stc2xpZGUuc2xpY2stYWN0aXZlJykuZGF0YSgneW91dHViZS1wbGF5ZXInKTtcbiAgICAgICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kc2xpY2suaXMoJ1tkYXRhLXlvdXR1YmUtbXV0ZV0nKSkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubXV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kc2xpY2suaXMoJ1tkYXRhLXlvdXR1YmUtYXV0b3BsYXldJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2xpY2suc2xpY2soJ3NsaWNrUGF1c2UnKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdENhcm91c2VsKCRjYXJvdXNlbCkge1xuICAgICRjYXJvdXNlbC5lYWNoKChpLCBzbGljaykgPT4ge1xuICAgICAgICBjb25zdCAkc2xpY2sgPSAkKHNsaWNrKTtcbiAgICAgICAgaWYgKCRzbGljay5maW5kKCdbZGF0YS15b3V0dWJlXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICRzbGljay5hZGRDbGFzcygnc2xpY2stc2xpZGVyLS12aWRlbycpO1xuICAgICAgICAgICAgbmV3IFlvdXR1YmVTbGljayhzbGljayk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB5b3V0dWJlQ2Fyb3VzZWxGYWN0b3J5KCRjYXJvdXNlbCkge1xuICAgIGlmICgkY2Fyb3VzZWwuZmluZCgnW2RhdGEteW91dHViZV0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1lZGl1bU1lZGlhUXVlcnkgPSBtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkoJ21lZGl1bScpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gaW5pdENhcm91c2VsLmJpbmQod2luZG93LCAkY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgICAvLyBMb2FkIHRoZSBJRnJhbWUgUGxheWVyIEFQSSBjb2RlIGFzeW5jaHJvbm91c2x5LlxuICAgICAgICAgICAgY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICB0YWcuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3BsYXllcl9hcGknO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICAgICAgICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcblxuICAgICAgICAgICAgLy8gJCgnYm9keScpLmFwcGVuZCgnPHNjcmlwdCBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCI+PC9zY3JpcHQ+Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbml0Q2Fyb3VzZWwoJGNhcm91c2VsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogVGhpcyBmaWxlIGlzIGFkZGVkIGJ5IFN1cGVybWFya2V0IHRoZW1lLlxuICovXG5cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IGluaXRQcm9kdWN0c0J5Q2F0ZWdvcmllcyBmcm9tICcuLi9lbXRoZW1lcy1tb2Rlei9wcm9kdWN0cy1ieS1jYXRlZ29yeSc7XG5pbXBvcnQgaW5pdFNwZWNpYWxQcm9kdWN0c1RhYnMgZnJvbSAnLi4vZW10aGVtZXMtbW9kZXovc3BlY2lhbC1wcm9kdWN0cy10YWJzJztcbmltcG9ydCB5b3V0dWJlQ2Fyb3VzZWxGYWN0b3J5IGZyb20gJy4uL2VtdGhlbWVzLW1vZGV6L3lvdXR1YmUtY2Fyb3VzZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuaW5pdFByb2R1Y3RzQnlDYXRlZ29yeVNlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5pbml0U3BlY2lhbFByb2R1Y3RzVGFic1NlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5pbml0TWFpbkNhcm91c2VsU2VjdGlvbigpO1xuICAgICAgICB0aGlzLmluaXRCcmFuZHNDYXJvdXNlbFNlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBpbml0UHJvZHVjdHNCeUNhdGVnb3J5U2VjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC5oYXNQcm9kdWN0c0J5Q2F0ZWdvcnlTb3J0aW5nVGFicykge1xuICAgICAgICAgICAgaW5pdFByb2R1Y3RzQnlDYXRlZ29yaWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0U3BlY2lhbFByb2R1Y3RzVGFic1NlY3Rpb24oKSB7XG4gICAgICAgIC8vIFJlZnJlc2ggcHJvZHVjdHMgY2Fyb3VzZWwgd2hlbiB0YWIgaXMgb3BlblxuICAgICAgICBpZiAodGhpcy5jb250ZXh0Lmhhc1NwZWNpYWxQcm9kdWN0c1RhYnMpIHtcbiAgICAgICAgICAgIGluaXRTcGVjaWFsUHJvZHVjdHNUYWJzKHsgY29udGV4dDogdGhpcy5jb250ZXh0IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdE1haW5DYXJvdXNlbFNlY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQuaGFzTWFpbkNhcm91c2VsKSB7XG4gICAgICAgICAgICB5b3V0dWJlQ2Fyb3VzZWxGYWN0b3J5KCQoJ1tkYXRhLXNsaWNrXScpKTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBtYWluIHNsaWRlc2hvdyBtaW4taGVpZ2h0IHRvIGVxdWFsIHRoZSB2ZXJ0aWNhbCBjYXRlZ29yaWVzIG1lbnVcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBjb25zdCAkY2F0ZWdvcmllc01lbnUgPSAkKCdib2R5LnBhcGFTdXBlcm1hcmtldC1sYXlvdXQtLWRlZmF1bHQgLmVtdGhlbWVzTW9kZXotdmVydGljYWxDYXRlZ29yaWVzLS1vcGVuJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZU1haW5TbGlkZXNob3dIZWlnaHQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLmhlcm9DYXJvdXNlbC1zbGlkZScpLmNzcygnbWluLWhlaWdodCcsICQod2luZG93KS53aWR0aCgpID4gNzY4ID8gYCR7JGNhdGVnb3JpZXNNZW51LmhlaWdodCgpICsgMjB9cHhgIDogJycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCRjYXRlZ29yaWVzTWVudS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpblNsaWRlc2hvd0hlaWdodCgpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4gdXBkYXRlTWFpblNsaWRlc2hvd0hlaWdodCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRCcmFuZHNDYXJvdXNlbFNlY3Rpb24oKSB7XG4gICAgICAgICQoJ1tkYXRhLWVtdGhlbWVzbW9kZXotYnJhbmQtY2Fyb3VzZWxdJykuc2xpY2soe1xuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTI2MCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA4MDAsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTUwLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdGhyb3R0bGVkIGZ1bmN0aW9uIHRoYXQgb25seSBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxuICogbWV0aG9kIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0b1xuICogaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXG4gKiB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWQgd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlXG4gKiB0aHJvdHRsZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiByZXR1cm4gdGhlXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8udGhyb3R0bGVgIGFuZCBgXy5kZWJvdW5jZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmcuXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XG4gKlxuICogLy8gSW52b2tlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXMuXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhyb3R0bGVkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCB7XG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxuICAgICdtYXhXYWl0Jzogd2FpdCxcbiAgICAndHJhaWxpbmcnOiB0cmFpbGluZ1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=