(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

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

/***/ "./assets/js/theme/account.js":
/*!************************************!*\
  !*** ./assets/js/theme/account.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Account; });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/reduce */ "./node_modules/lodash/reduce.js");
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page-manager */ "./assets/js/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wishlist */ "./assets/js/theme/wishlist.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_payment_method__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/payment-method */ "./assets/js/theme/common/payment-method.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../emthemes-modez/compare-products */ "./assets/js/emthemes-modez/compare-products.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









 // Supermarket Mod
// import compareProducts from './global/compare-products';



var Account = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Account, _PageManager);

  function Account(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__["createTranslationDictionary"])(context);
    _this.$state = $('[data-field-type="State"]');
    _this.$body = $('body');
    return _this;
  }

  var _proto = Account.prototype;

  _proto.onReady = function onReady() {
    var $editAccountForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-edit-account-form]');
    var $addressForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-address-form]');
    var $inboxForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-inbox-form]');
    var $accountReturnForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('[data-account-return-form]');
    var $paymentMethodForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-payment-method-form]');
    var $reorderForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('[data-account-reorder-form]');
    var $invoiceButton = $('[data-print-invoice]'); // Supermarket Mod
    // compareProducts(this.context.urls);

    Object(_emthemes_modez_compare_products__WEBPACK_IMPORTED_MODULE_11__["default"])(this.context); // Injected via template

    this.passwordRequirements = this.context.passwordRequirements; // Instantiates wish list JS

    _wishlist__WEBPACK_IMPORTED_MODULE_4__["default"].load(this.context);

    if ($editAccountForm.length) {
      this.registerEditAccountValidation($editAccountForm);

      if (this.$state.is('input')) {
        Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["insertStateHiddenField"])(this.$state);
      }
    }

    if ($invoiceButton.length) {
      $invoiceButton.on('click', function () {
        var left = window.screen.availWidth / 2 - 450;
        var top = window.screen.availHeight / 2 - 320;
        var url = $invoiceButton.data('printInvoice');
        window.open(url, 'orderInvoice', "width=900,height=650,left=" + left + ",top=" + top + ",scrollbars=1");
      });
    }

    if ($addressForm.length) {
      this.initAddressFormValidation($addressForm);

      if (this.$state.is('input')) {
        Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["insertStateHiddenField"])(this.$state);
      }
    }

    if ($inboxForm.length) {
      this.registerInboxValidation($inboxForm);
    }

    if ($accountReturnForm.length) {
      this.initAccountReturnFormValidation($accountReturnForm);
    }

    if ($paymentMethodForm.length) {
      this.initPaymentMethodFormValidation($paymentMethodForm);
    }

    if ($reorderForm.length) {
      this.initReorderForm($reorderForm);
    }

    this.bindDeleteAddress();
    this.bindDeletePaymentMethod();
  }
  /**
   * Binds a submit hook to ensure the customer receives a confirmation dialog before deleting an address
   */
  ;

  _proto.bindDeleteAddress = function bindDeleteAddress() {
    $('[data-delete-address]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deleteAddress');

      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };

  _proto.bindDeletePaymentMethod = function bindDeletePaymentMethod() {
    $('[data-delete-payment-method]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deletePaymentMethod');

      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };

  _proto.initReorderForm = function initReorderForm($reorderForm) {
    var _this2 = this;

    $reorderForm.on('submit', function (event) {
      var $productReorderCheckboxes = $('.account-listItem .form-checkbox:checked');
      var submitForm = false;
      $reorderForm.find('[name^="reorderitem"]').remove();
      $productReorderCheckboxes.each(function (index, productCheckbox) {
        var productId = $(productCheckbox).val();
        var $input = $('<input>', {
          type: 'hidden',
          name: "reorderitem[" + productId + "]",
          value: '1'
        });
        submitForm = true;
        $reorderForm.append($input);
      });

      if (!submitForm) {
        event.preventDefault();
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: _this2.context.selectItem,
          icon: 'error'
        });
      }
    });
  };

  _proto.initAddressFormValidation = function initAddressFormValidation($addressForm) {
    var _this3 = this;

    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($addressForm, this.context);
    var stateSelector = 'form[data-address-form] [data-field-type="State"]';
    var $stateElement = $(stateSelector);
    var addressValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-address-form] input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    addressValidator.add(validationModel);

    if ($stateElement) {
      var $last; // Requests the states for a country with AJAX

      Object(_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
        if (err) {
          throw new Error(err);
        }

        var $field = $(field);

        if (addressValidator.getStatus($stateElement) !== 'undefined') {
          addressValidator.remove($stateElement);
        }

        if ($last) {
          addressValidator.remove($last);
        }

        if ($field.is('select')) {
          $last = field;
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setStateCountryValidation(addressValidator, field, _this3.validationDictionary.field_not_blank);
        } else {
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].cleanUpStateValidation(field);
        }
      });
    }

    $addressForm.on('submit', function (event) {
      addressValidator.performCheck();

      if (addressValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
  };

  _proto.initAccountReturnFormValidation = function initAccountReturnFormValidation($accountReturnForm) {
    var errorMessage = $accountReturnForm.data('accountReturnFormError');
    $accountReturnForm.on('submit', function (event) {
      var formSubmit = false; // Iterate until we find a non-zero value in the dropdown for quantity

      $('[name^="return_qty"]', $accountReturnForm).each(function (i, ele) {
        if (parseInt($(ele).val(), 10) !== 0) {
          formSubmit = true; // Exit out of loop if we found at least one return

          return true;
        }
      });

      if (formSubmit) {
        return true;
      }

      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: errorMessage,
        icon: 'error'
      });
      return event.preventDefault();
    });
  };

  _proto.initPaymentMethodFormValidation = function initPaymentMethodFormValidation($paymentMethodForm) {
    var _this4 = this;

    // Inject validations into form fields before validation runs
    $paymentMethodForm.find('#first_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.firstNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#last_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.lastNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#company.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.companyLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#phone.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.phoneLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address1.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address1Label + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address2.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address2Label + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#city.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.cityLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#country.form-field').attr('data-validation', "{ \"type\": \"singleselect\", \"label\": \"" + this.context.countryLabel + "\", \"required\": true, prefix: \"" + this.context.chooseCountryLabel + "\" }");
    $paymentMethodForm.find('#state.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.stateLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#postal_code.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.postalCodeLabel + "\", \"required\": true, \"maxlength\": 0 }");
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($paymentMethodForm, this.context);
    var paymentMethodSelector = 'form[data-payment-method-form]';
    var paymentMethodValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: paymentMethodSelector + " input[type=\"submit\"]",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    var $stateElement = $(paymentMethodSelector + " [data-field-type=\"State\"]");
    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
      if (err) {
        throw new Error(err);
      }

      var $field = $(field);

      if (paymentMethodValidator.getStatus($stateElement) !== 'undefined') {
        paymentMethodValidator.remove($stateElement);
      }

      if ($last) {
        paymentMethodValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setStateCountryValidation(paymentMethodValidator, field, _this4.validationDictionary.field_not_blank);
      } else {
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].cleanUpStateValidation(field);
      }
    }); // Use credit card number input listener to highlight credit card type

    var cardType;
    $(paymentMethodSelector + " input[name=\"credit_card_number\"]").on('keyup', function (_ref) {
      var target = _ref.target;
      cardType = Object(_common_payment_method__WEBPACK_IMPORTED_MODULE_9__["creditCardType"])(target.value);

      if (cardType) {
        $(paymentMethodSelector + " img[alt=\"" + cardType + "\"]").siblings().css('opacity', '.2');
      } else {
        $(paymentMethodSelector + " img").css('opacity', '1');
      }
    }); // Set of credit card validation

    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setCreditCardNumberValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"credit_card_number\"]", this.context.creditCardNumber);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setExpirationValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"expiration\"]", this.context.expiration);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setNameOnCardValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"name_on_card\"]", this.context.nameOnCard);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setCvvValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"cvv\"]", this.context.cvv, function () {
      return cardType;
    }); // Set of credit card format

    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Formatters"].setCreditCardNumberFormat(paymentMethodSelector + " input[name=\"credit_card_number\"]");
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Formatters"].setExpirationFormat(paymentMethodSelector + " input[name=\"expiration\"]"); // Billing address validation

    paymentMethodValidator.add(validationModel);
    $paymentMethodForm.on('submit', function (event) {
      event.preventDefault(); // Perform final form validation

      paymentMethodValidator.performCheck();

      if (paymentMethodValidator.areAll('valid')) {
        // Serialize form data and reduce it to object
        var data = lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default()($paymentMethodForm.serializeArray(), function (obj, item) {
          var refObj = obj;
          refObj[item.name] = item.value;
          return refObj;
        }, {}); // Assign country and state code


        var country = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(_this4.context.countries, function (_ref2) {
          var value = _ref2.value;
          return value === data.country;
        });

        var state = country && lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(country.states, function (_ref3) {
          var value = _ref3.value;
          return value === data.state;
        });

        data.country_code = country ? country.code : data.country;
        data.state_or_province_code = state ? state.code : data.state; // Default Instrument

        data.default_instrument = !!data.default_instrument; // Store credit card

        Object(_common_payment_method__WEBPACK_IMPORTED_MODULE_9__["storeInstrument"])(_this4.context, data, function () {
          window.location.href = _this4.context.paymentMethodsUrl;
        }, function () {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: _this4.context.generic_error,
            icon: 'error'
          });
        });
      }
    });
  };

  _proto.registerEditAccountValidation = function registerEditAccountValidation($editAccountForm) {
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($editAccountForm, this.context);
    var formEditSelector = 'form[data-edit-account-form]';
    var editValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: '${formEditSelector} input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    var emailSelector = formEditSelector + " [data-field-type=\"EmailAddress\"]";
    var $emailElement = $(emailSelector);
    var passwordSelector = formEditSelector + " [data-field-type=\"Password\"]";
    var $passwordElement = $(passwordSelector);
    var password2Selector = formEditSelector + " [data-field-type=\"ConfirmPassword\"]";
    var $password2Element = $(password2Selector);
    var currentPasswordSelector = formEditSelector + " [data-field-type=\"CurrentPassword\"]";
    var $currentPassword = $(currentPasswordSelector); // This only handles the custom fields, standard fields are added below

    editValidator.add(validationModel);

    if ($emailElement) {
      editValidator.remove(emailSelector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setEmailValidation(editValidator, emailSelector, this.validationDictionary.valid_email);
    }

    if ($passwordElement && $password2Element) {
      var _this$validationDicti = this.validationDictionary,
          enterPassword = _this$validationDicti.password,
          matchPassword = _this$validationDicti.password_match,
          invalidPassword = _this$validationDicti.invalid_password;
      editValidator.remove(passwordSelector);
      editValidator.remove(password2Selector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setPasswordValidation(editValidator, passwordSelector, password2Selector, this.passwordRequirements, Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["createPasswordValidationErrorTextObject"])(enterPassword, enterPassword, matchPassword, invalidPassword), true);
    }

    if ($currentPassword) {
      editValidator.add({
        selector: currentPasswordSelector,
        validate: function validate(cb, val) {
          var result = true;

          if (val === '' && $passwordElement.val() !== '') {
            result = false;
          }

          cb(result);
        },
        errorMessage: this.context.currentPassword
      });
    }

    editValidator.add([{
      selector: formEditSelector + " input[name='account_firstname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.firstName
    }, {
      selector: formEditSelector + " input[name='account_lastname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.lastName
    }]);
    $editAccountForm.on('submit', function (event) {
      editValidator.performCheck();

      if (editValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
  };

  _proto.registerInboxValidation = function registerInboxValidation($inboxForm) {
    var inboxValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-inbox-form] input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    inboxValidator.add([{
      selector: 'form[data-inbox-form] select[name="message_order_id"]',
      validate: function validate(cb, val) {
        var result = Number(val) !== 0;
        cb(result);
      },
      errorMessage: this.context.enterOrderNum
    }, {
      selector: 'form[data-inbox-form] input[name="message_subject"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterSubject
    }, {
      selector: 'form[data-inbox-form] textarea[name="message_content"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterMessage
    }]);
    $inboxForm.on('submit', function (event) {
      inboxValidator.performCheck();

      if (inboxValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
  };

  return Account;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/form-validation.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/form-validation.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");

/**
 * Validate that the given date for the day/month/year select inputs is within potential range
 * @param $formField
 * @param validation
 * @returns {{selector: string, triggeredBy: string, validate: Function, errorMessage: string}}
 */

function buildDateValidation($formField, validation) {
  // No date range restriction, skip
  if (validation.min_date && validation.max_date) {
    var invalidMessage = "Your chosen date must fall between " + validation.min_date + " and " + validation.max_date + ".";
    var formElementId = $formField.attr('id');
    var minSplit = validation.min_date.split('-');
    var maxSplit = validation.max_date.split('-');
    var minDate = new Date(minSplit[0], minSplit[1] - 1, minSplit[2]);
    var maxDate = new Date(maxSplit[0], maxSplit[1] - 1, maxSplit[2]);
    return {
      selector: "#" + formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = Number($formField.find('select[data-label="day"]').val());
        var month = Number($formField.find('select[data-label="month"]').val()) - 1;
        var year = Number(val);
        var chosenDate = new Date(year, month, day);
        cb(chosenDate >= minDate && chosenDate <= maxDate);
      },
      errorMessage: invalidMessage
    };
  }
}
/**
 * We validate checkboxes separately from single input fields, as they must have at least one checked option
 * from many different inputs
 * @param $formField
 * @param validation
 * @param errorText provides error validation message
 */


function buildRequiredCheckboxValidation(validation, $formField, errorText) {
  var formFieldId = $formField.attr('id');
  var primarySelector = "#" + formFieldId + " input:first-of-type";
  var secondarySelector = "#" + formFieldId + " input";
  return {
    selector: primarySelector,
    triggeredBy: secondarySelector,
    validate: function validate(cb) {
      var result = false;
      $(secondarySelector).each(function (index, checkbox) {
        if (checkbox.checked) {
          result = true;
          return false;
        }
      });
      cb(result);
    },
    errorMessage: errorText
  };
}

function buildRequiredValidation(validation, selector, errorText) {
  return {
    selector: selector,
    validate: function validate(cb, val) {
      cb(val.length > 0);
    },
    errorMessage: errorText
  };
}

function buildNumberRangeValidation(validation, formFieldSelector) {
  var invalidMessage = "The value for " + validation.label + " must be between " + validation.min + " and " + validation.max + ".";
  var min = Number(validation.min);
  var max = Number(validation.max);
  return {
    selector: formFieldSelector + " input[name=\"" + validation.name + "\"]",
    validate: function validate(cb, val) {
      var numberVal = Number(val);
      cb(numberVal >= min && numberVal <= max);
    },
    errorMessage: invalidMessage
  };
}

function buildValidation($validateableElement, errorMessage) {
  var validation = $validateableElement.data('validation');
  var fieldValidations = [];
  var formFieldSelector = "#" + $validateableElement.attr('id');

  if (validation.type === 'datechooser') {
    var dateValidation = buildDateValidation($validateableElement, validation);

    if (dateValidation) {
      fieldValidations.push(dateValidation);
    }
  } else if (validation.required && (validation.type === 'checkboxselect' || validation.type === 'radioselect')) {
    fieldValidations.push(buildRequiredCheckboxValidation(validation, $validateableElement, errorMessage));
  } else {
    $validateableElement.find('input, select, textarea').each(function (index, element) {
      var $inputElement = $(element);
      var tagName = $inputElement.get(0).tagName;
      var inputName = $inputElement.attr('name');
      var elementSelector = formFieldSelector + " " + tagName + "[name=\"" + inputName + "\"]";

      if (validation.type === 'numberonly') {
        fieldValidations.push(buildNumberRangeValidation(validation, formFieldSelector));
      }

      if (validation.required) {
        fieldValidations.push(buildRequiredValidation(validation, elementSelector, errorMessage));
      }
    });
  }

  return fieldValidations;
}
/**
 * Builds the validation model for dynamic forms
 * @param $form
 * @param context provides access for error messages on required fields validation
 * @returns {Array}
 */


/* harmony default export */ __webpack_exports__["default"] = (function ($form, context) {
  var validationsToPerform = [];

  var _createTranslationDic = Object(_utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__["createTranslationDictionary"])(context),
      requiredFieldValidationText = _createTranslationDic.field_not_blank;

  $form.find('[data-validation]').each(function (index, input) {
    var getLabel = function getLabel($el) {
      return $el.first().data('validation').label;
    };

    var requiredValidationMessage = getLabel($(input)) + requiredFieldValidationText;
    validationsToPerform = validationsToPerform.concat(buildValidation($(input), requiredValidationMessage));
  });
  return validationsToPerform;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/payment-method.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/payment-method.js ***!
  \**************************************************/
/*! exports provided: creditCardType, storeInstrument, Formatters, Validators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "creditCardType", function() { return creditCardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeInstrument", function() { return storeInstrument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formatters", function() { return Formatters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! creditcards */ "./node_modules/creditcards/index.js");
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(creditcards__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Omit null or empty string properties of object
 * @param {Object} object
 * @returns {Object}
 */

var omitNullString = function omitNullString(obj) {
  var refObj = obj;
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(refObj, function (key, value) {
    if (value === null || value === '') {
      delete refObj[key];
    }
  });
  return refObj;
};
/**
 * Get credit card type from credit card number
 * @param {string} value
 */


var creditCardType = function creditCardType(value) {
  return creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.card.type(creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.card.parse(value), true);
};
/**
 * Wrapper for ajax request to store a new instrument in bigpay
 * @param {object} Representing the data needed for the header
 * @param {object} Representing the data needed for the body
 * @param {function} done Function to execute on a successful response
 * @param {function} fail Function to execute on a unsuccessful response
 */

var storeInstrument = function storeInstrument(_ref, _ref2, done, fail) {
  var paymentsUrl = _ref.paymentsUrl,
      shopperId = _ref.shopperId,
      storeHash = _ref.storeHash,
      vaultToken = _ref.vaultToken;
  var provider_id = _ref2.provider_id,
      currency_code = _ref2.currency_code,
      credit_card_number = _ref2.credit_card_number,
      expiration = _ref2.expiration,
      name_on_card = _ref2.name_on_card,
      cvv = _ref2.cvv,
      default_instrument = _ref2.default_instrument,
      address1 = _ref2.address1,
      address2 = _ref2.address2,
      city = _ref2.city,
      postal_code = _ref2.postal_code,
      state_or_province_code = _ref2.state_or_province_code,
      country_code = _ref2.country_code,
      company = _ref2.company,
      first_name = _ref2.first_name,
      last_name = _ref2.last_name,
      email = _ref2.email,
      phone = _ref2.phone;
  var expiry = expiration.split('/');
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
    url: paymentsUrl + "/stores/" + storeHash + "/customers/" + shopperId + "/stored_instruments",
    dataType: 'json',
    method: 'POST',
    cache: false,
    headers: {
      Authorization: vaultToken,
      Accept: 'application/vnd.bc.v1+json',
      'Content-Type': 'application/vnd.bc.v1+json'
    },
    data: JSON.stringify({
      instrument: {
        type: 'card',
        cardholder_name: name_on_card,
        number: creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.card.parse(credit_card_number),
        expiry_month: creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.expiration.month.parse(expiry[0]),
        expiry_year: creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.expiration.year.parse(expiry[1], true),
        verification_value: cvv
      },
      billing_address: omitNullString({
        address1: address1,
        address2: address2,
        city: city,
        postal_code: postal_code,
        state_or_province_code: state_or_province_code,
        country_code: country_code,
        company: company,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone
      }),
      provider_id: provider_id,
      default_instrument: default_instrument,
      currency_code: currency_code
    })
  }).done(done).fail(fail);
};
var Formatters = {
  /**
   * Sets up a format for credit card number
   * @param field
   */
  setCreditCardNumberFormat: function setCreditCardNumberFormat(field) {
    if (field) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(field).on('keyup', function (_ref3) {
        var target = _ref3.target;
        var refTarget = target;
        refTarget.value = creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.card.format(creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.card.parse(target.value));
      });
    }
  },

  /**
   * Sets up a format for expiration date
   * @param field
   */
  setExpirationFormat: function setExpirationFormat(field) {
    if (field) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(field).on('keyup', function (_ref4) {
        var target = _ref4.target,
            which = _ref4.which;
        var refTarget = target;

        if (which === 8 && /.*(\/)$/.test(target.value)) {
          refTarget.value = target.value.slice(0, -1);
        } else if (target.value.length > 4) {
          refTarget.value = target.value.slice(0, 5);
        } else if (which !== 8) {
          refTarget.value = target.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/').replace(/^(0[1-9]|1[0-2])$/g, '$1/').replace(/^([0-1])([3-9])$/g, '0$1/$2').replace(/^(0[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2').replace(/^([0]+)\/|[0]+$/g, '0').replace(/[^\d\/]|^[\/]*$/g, '').replace(/\/\//g, '/');
        }
      });
    }
  }
};
var Validators = {
  /**
   * Sets up a validation for credit card number
   * @param validator
   * @param field
   * @param errorMessage
   */
  setCreditCardNumberValidation: function setCreditCardNumberValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.card.isValid(creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.card.parse(val));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },

  /**
   * Sets up a validation for expiration date
   * @param validator
   * @param field
   * @param errorMessage
   */
  setExpirationValidation: function setExpirationValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var expiry = val.split('/');
          var result = val.length && /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(val);
          result = result && !creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.expiration.isPast(creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.expiration.month.parse(expiry[0]), creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.expiration.year.parse(expiry[1], true));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },

  /**
   * Sets up a validation for name on card
   * @param validator
   * @param field
   * @param errorMessage
   */
  setNameOnCardValidation: function setNameOnCardValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = !!val.length;
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },

  /**
   * Sets up a validation for cvv
   * @param validator
   * @param field
   * @param errorMessage
   * @param {any} cardType The credit card number type
   */
  setCvvValidation: function setCvvValidation(validator, field, errorMessage, cardType) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var type = typeof cardType === 'function' ? cardType() : cardType;
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_1___default.a.cvc.isValid(val, type);
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  }
};

/***/ }),

/***/ "./node_modules/array-find/find.js":
/*!*****************************************!*\
  !*** ./node_modules/array-find/find.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function find(array, predicate, context) {
  if (typeof Array.prototype.find === 'function') {
    return array.find(predicate, context);
  }

  context = context || this;
  var length = array.length;
  var i;

  if (typeof predicate !== 'function') {
    throw new TypeError(predicate + ' is not a function');
  }

  for (i = 0; i < length; i++) {
    if (predicate.call(context, array[i], i, array)) {
      return array[i];
    }
  }
}

module.exports = find;


/***/ }),

/***/ "./node_modules/creditcards-types/index.js":
/*!*************************************************!*\
  !*** ./node_modules/creditcards-types/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./types */ "./node_modules/creditcards-types/types/index.js")


/***/ }),

/***/ "./node_modules/creditcards-types/type.js":
/*!************************************************!*\
  !*** ./node_modules/creditcards-types/type.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(/*! xtend/mutable */ "./node_modules/xtend/mutable.js")

module.exports = CardType

function CardType (data) {
  if (!(this instanceof CardType)) return new CardType(data)
  assign(this, data)
}

CardType.prototype.digits = 16
CardType.prototype.cvcLength = 3
CardType.prototype.luhn = true
CardType.prototype.groupPattern = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/

CardType.prototype.group = function (number) {
  return (number.match(this.groupPattern) || [])
    .slice(1)
    .filter(Boolean)
}

CardType.prototype.test = function (number, eager) {
  return this[eager ? 'eagerPattern' : 'pattern'].test(number)
}


/***/ }),

/***/ "./node_modules/creditcards-types/types/american-express.js":
/*!******************************************************************!*\
  !*** ./node_modules/creditcards-types/types/american-express.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'American Express',
  digits: 15,
  pattern: /^3[47]\d{13}$/,
  eagerPattern: /^3[47]/,
  groupPattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
  cvcLength: 4
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/dankort.js":
/*!*********************************************************!*\
  !*** ./node_modules/creditcards-types/types/dankort.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Dankort',
  pattern: /^5019\d{12}$/,
  eagerPattern: /^5019/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/diners-club.js":
/*!*************************************************************!*\
  !*** ./node_modules/creditcards-types/types/diners-club.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Diners Club',
  digits: 14,
  pattern: /^3(0[0-5]|[68]\d)\d{11}$/,
  eagerPattern: /^3(0|[68])/,
  groupPattern: /(\d{1,4})?(\d{1,6})?(\d{1,4})?/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/discover.js":
/*!**********************************************************!*\
  !*** ./node_modules/creditcards-types/types/discover.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Discover',
  pattern: /^6(011(0[0-9]|[2-4]\d|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]\d{3}|5\d{4})\d{10}$/,
  eagerPattern: /^6(011(0[0-9]|[2-4]|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]|5)/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/elo.js":
/*!*****************************************************!*\
  !*** ./node_modules/creditcards-types/types/elo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Elo',
  pattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])\d{10}$/,
  eagerPattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/forbrugsforeningen.js":
/*!********************************************************************!*\
  !*** ./node_modules/creditcards-types/types/forbrugsforeningen.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Forbrugsforeningen',
  pattern: /^600722\d{10}$/,
  eagerPattern: /^600/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/creditcards-types/types/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [
  __webpack_require__(/*! ./visa */ "./node_modules/creditcards-types/types/visa.js"),
  __webpack_require__(/*! ./maestro */ "./node_modules/creditcards-types/types/maestro.js"),
  __webpack_require__(/*! ./forbrugsforeningen */ "./node_modules/creditcards-types/types/forbrugsforeningen.js"),
  __webpack_require__(/*! ./dankort */ "./node_modules/creditcards-types/types/dankort.js"),
  __webpack_require__(/*! ./mastercard */ "./node_modules/creditcards-types/types/mastercard.js"),
  __webpack_require__(/*! ./american-express */ "./node_modules/creditcards-types/types/american-express.js"),
  __webpack_require__(/*! ./diners-club */ "./node_modules/creditcards-types/types/diners-club.js"),
  __webpack_require__(/*! ./discover */ "./node_modules/creditcards-types/types/discover.js"),
  __webpack_require__(/*! ./jcb */ "./node_modules/creditcards-types/types/jcb.js"),
  __webpack_require__(/*! ./unionpay */ "./node_modules/creditcards-types/types/unionpay.js"),
  __webpack_require__(/*! ./troy */ "./node_modules/creditcards-types/types/troy.js"),
  __webpack_require__(/*! ./elo */ "./node_modules/creditcards-types/types/elo.js"),
  __webpack_require__(/*! ./uatp */ "./node_modules/creditcards-types/types/uatp.js")
]


/***/ }),

/***/ "./node_modules/creditcards-types/types/jcb.js":
/*!*****************************************************!*\
  !*** ./node_modules/creditcards-types/types/jcb.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'JCB',
  pattern: /^35\d{14}$/,
  eagerPattern: /^35/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/maestro.js":
/*!*********************************************************!*\
  !*** ./node_modules/creditcards-types/types/maestro.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Maestro',
  digits: [12, 19],
  pattern: /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/,
  eagerPattern: /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/mastercard.js":
/*!************************************************************!*\
  !*** ./node_modules/creditcards-types/types/mastercard.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Mastercard',
  pattern: /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\d{12}$/,
  eagerPattern: /^(2[3-7]|22[2-9]|5[1-5])/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/troy.js":
/*!******************************************************!*\
  !*** ./node_modules/creditcards-types/types/troy.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Troy',
  pattern: /^9792\d{12}$/,
  eagerPattern: /^9792/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/uatp.js":
/*!******************************************************!*\
  !*** ./node_modules/creditcards-types/types/uatp.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'UATP',
  digits: 15,
  pattern: /^1\d{14}$/,
  eagerPattern: /^1/,
  groupPattern: /(\d{1,4})(\d{1,5})?(\d{1,6})?/
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/unionpay.js":
/*!**********************************************************!*\
  !*** ./node_modules/creditcards-types/types/unionpay.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'UnionPay',
  pattern: /^62[0-5]\d{13,16}$/,
  eagerPattern: /^62/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/,
  luhn: false
})


/***/ }),

/***/ "./node_modules/creditcards-types/types/visa.js":
/*!******************************************************!*\
  !*** ./node_modules/creditcards-types/types/visa.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Type = __webpack_require__(/*! ../type */ "./node_modules/creditcards-types/type.js")

module.exports = Type({
  name: 'Visa',
  digits: [13, 19],
  pattern: /^4\d{12}(\d{3}|\d{6})?$/,
  eagerPattern: /^4/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})


/***/ }),

/***/ "./node_modules/creditcards/card.js":
/*!******************************************!*\
  !*** ./node_modules/creditcards/card.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var luhn = __webpack_require__(/*! fast-luhn */ "./node_modules/fast-luhn/index.js")
var Types = __webpack_require__(/*! ./types */ "./node_modules/creditcards/types.js")

module.exports = Card

function Card (data) {
  var types = Types(data)

  return {
    types: data,
    parse: parseCard,
    format: formatCard,
    type: cardType,
    luhn: luhn,
    isValid: isCardValid
  }

  function parseCard (number) {
    if (typeof number !== 'string') return ''
    return number.replace(/[^\d]/g, '')
  }

  function formatCard (number, separator) {
    var type = getType(number, true)
    if (!type) return number
    return type.group(number).join(separator || ' ')
  }

  function cardType (number, eager) {
    var type = getType(number, eager)
    return type ? type.name : undefined
  }

  function isCardValid (number, type) {
    if (type) {
      type = types.get(type)
    } else {
      type = getType(number)
    }
    if (!type) return false
    return (!type.luhn || luhn(number)) && type.test(number)
  }

  function getType (number, eager) {
    return types.find(function (type) {
      return type.test(number, eager)
    })
  }
}


/***/ }),

/***/ "./node_modules/creditcards/cvc.js":
/*!*****************************************!*\
  !*** ./node_modules/creditcards/cvc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Types = __webpack_require__(/*! ./types */ "./node_modules/creditcards/types.js")
var cvcRegex = /^\d{3,4}$/

module.exports = Cvc

function Cvc (data) {
  var types = Types(data)

  return {
    isValid: cvcIsValid
  }

  function cvcIsValid (cvc, type) {
    if (typeof cvc !== 'string') return false
    if (!cvcRegex.test(cvc)) return false

    if (!type) {
      return types.some(function (type) {
        return type.cvcLength === cvc.length
      })
    }

    return types.get(type).cvcLength === cvc.length
  }
}


/***/ }),

/***/ "./node_modules/creditcards/expiration.js":
/*!************************************************!*\
  !*** ./node_modules/creditcards/expiration.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValidMonth = __webpack_require__(/*! is-valid-month */ "./node_modules/is-valid-month/index.js")
var parseIntStrict = __webpack_require__(/*! parse-int */ "./node_modules/parse-int/index.js")
var parseYear = __webpack_require__(/*! parse-year */ "./node_modules/parse-year/index.js")

module.exports = {
  isPast: isPast,
  month: {
    parse: parseMonth,
    isValid: isValidMonth
  },
  year: {
    parse: parseYear,
    format: formatExpYear,
    isValid: isExpYearValid,
    isPast: isExpYearPast
  }
}

function isPast (month, year) {
  return Date.now() >= new Date(year, month)
}

function parseMonth (month) {
  return parseIntStrict(month)
}

function formatExpYear (year, strip) {
  year = year.toString()
  return strip ? year.substr(2, 4) : year
}

function isExpYearValid (year) {
  if (typeof year !== 'number') return false
  year = parseIntStrict(year)
  return year > 0
}

function isExpYearPast (year) {
  return new Date().getFullYear() > year
}


/***/ }),

/***/ "./node_modules/creditcards/index.js":
/*!*******************************************!*\
  !*** ./node_modules/creditcards/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = __webpack_require__(/*! creditcards-types */ "./node_modules/creditcards-types/index.js")
var Card = __webpack_require__(/*! ./card */ "./node_modules/creditcards/card.js")
var Cvc = __webpack_require__(/*! ./cvc */ "./node_modules/creditcards/cvc.js")
var expiration = __webpack_require__(/*! ./expiration */ "./node_modules/creditcards/expiration.js")

module.exports = withTypes(types)
module.exports.withTypes = withTypes

function withTypes (types) {
  return {
    card: Card(types),
    cvc: Cvc(types),
    expiration: expiration
  }
}


/***/ }),

/***/ "./node_modules/creditcards/types.js":
/*!*******************************************!*\
  !*** ./node_modules/creditcards/types.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var find = __webpack_require__(/*! array-find */ "./node_modules/array-find/find.js")
var defaults = __webpack_require__(/*! creditcards-types */ "./node_modules/creditcards-types/index.js")

module.exports = CardTypes
module.exports.defaults = defaults

function CardTypes (types) {
  var map = types.reduce(function (acc, type) {
    acc[type.name] = type
    return acc
  }, {})

  return {
    find: find.bind(null, types),
    some: types.some.bind(types),
    get: get
  }

  function get (name) {
    var type = map[name]

    if (!type) {
      throw new Error('No type found for name: ' + name)
    }

    return type
  }
}


/***/ }),

/***/ "./node_modules/expand-year/index.js":
/*!*******************************************!*\
  !*** ./node_modules/expand-year/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var zeroFill = __webpack_require__(/*! zero-fill */ "./node_modules/zero-fill/index.js")
var parseIntStrict = __webpack_require__(/*! parse-int */ "./node_modules/parse-int/index.js")

var pad = zeroFill(2)

module.exports = function expandYear (year, now) {
  now = now || new Date()
  var base = now.getFullYear().toString().substr(0, 2)
  year = parseIntStrict(year)
  return parseIntStrict(base + pad(year))
}


/***/ }),

/***/ "./node_modules/fast-luhn/index.js":
/*!*****************************************!*\
  !*** ./node_modules/fast-luhn/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function (array) {
  return function luhn (number) {
    if (typeof number !== 'string') throw new TypeError('Expected string input')
    if (!number) return false
    var length = number.length
    var bit = 1
    var sum = 0
    var value

    while (length) {
      value = parseInt(number.charAt(--length), 10)
      bit ^= 1
      sum += bit ? array[value] : value
    }

    return sum % 10 === 0
  }
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]))


/***/ }),

/***/ "./node_modules/is-finite/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-finite/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Number.isFinite || function (value) {
	return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
};


/***/ }),

/***/ "./node_modules/is-integer/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-integer/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/paulmillr/es6-shim
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
var isFinite = __webpack_require__(/*! is-finite */ "./node_modules/is-finite/index.js");
module.exports = Number.isInteger || function(val) {
  return typeof val === "number" &&
    isFinite(val) &&
    Math.floor(val) === val;
};


/***/ }),

/***/ "./node_modules/is-valid-month/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-valid-month/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isInteger = __webpack_require__(/*! is-integer */ "./node_modules/is-integer/index.js")

module.exports = function isValidMonth (month) {
  if (typeof month !== 'number' || !isInteger(month)) return false
  return month >= 1 && month <= 12
}


/***/ }),

/***/ "./node_modules/lodash/_baseFindIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseFindIndex.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ "./node_modules/lodash/_createFind.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createFind.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;


/***/ }),

/***/ "./node_modules/lodash/find.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/find.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createFind = __webpack_require__(/*! ./_createFind */ "./node_modules/lodash/_createFind.js"),
    findIndex = __webpack_require__(/*! ./findIndex */ "./node_modules/lodash/findIndex.js");

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;


/***/ }),

/***/ "./node_modules/lodash/findIndex.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/findIndex.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ "./node_modules/lodash/_baseFindIndex.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;


/***/ }),

/***/ "./node_modules/lodash/reduce.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/reduce.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),

/***/ "./node_modules/lodash/toInteger.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/toInteger.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/parse-int/index.js":
/*!*****************************************!*\
  !*** ./node_modules/parse-int/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isInteger = __webpack_require__(/*! is-integer */ "./node_modules/is-integer/index.js")
var isIntegerRegex = /^-?\d+$/

module.exports = function parseIntStrict (integer) {
  if (typeof integer === 'number') {
    return isInteger(integer) ? integer : undefined
  }
  if (typeof integer === 'string') {
    return isIntegerRegex.test(integer) ? parseInt(integer, 10) : undefined
  }
}


/***/ }),

/***/ "./node_modules/parse-year/index.js":
/*!******************************************!*\
  !*** ./node_modules/parse-year/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseIntStrict = __webpack_require__(/*! parse-int */ "./node_modules/parse-int/index.js")
var expandYear = __webpack_require__(/*! expand-year */ "./node_modules/expand-year/index.js")

module.exports = function parseYear (year, expand, now) {
  year = parseIntStrict(year)
  if (year == null) return
  if (!expand) return year
  return expandYear(year, now)
}


/***/ }),

/***/ "./node_modules/xtend/mutable.js":
/*!***************************************!*\
  !*** ./node_modules/xtend/mutable.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ "./node_modules/zero-fill/index.js":
/*!*****************************************!*\
  !*** ./node_modules/zero-fill/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! zero-fill. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * Given a number, return a zero-filled string.
 * From http://stackoverflow.com/questions/1267283/
 * @param  {number} width
 * @param  {number} number
 * @return {string}
 */
module.exports = function zeroFill (width, number, pad) {
  if (number === undefined) {
    return function (number, pad) {
      return zeroFill(width, number, pad)
    }
  }
  if (pad === undefined) pad = '0'
  width -= number.toString().length
  if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
  return number + ''
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZW10aGVtZXMtbW9kZXovY29tcGFyZS1wcm9kdWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2Zvcm0tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3BheW1lbnQtbWV0aG9kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcnJheS1maW5kL2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyZWRpdGNhcmRzLXR5cGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy9hbWVyaWNhbi1leHByZXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy9kYW5rb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy9kaW5lcnMtY2x1Yi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGl0Y2FyZHMtdHlwZXMvdHlwZXMvZGlzY292ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyZWRpdGNhcmRzLXR5cGVzL3R5cGVzL2Vsby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGl0Y2FyZHMtdHlwZXMvdHlwZXMvZm9yYnJ1Z3Nmb3JlbmluZ2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGl0Y2FyZHMtdHlwZXMvdHlwZXMvamNiLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy9tYWVzdHJvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy9tYXN0ZXJjYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy90cm95LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy91YXRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy10eXBlcy90eXBlcy91bmlvbnBheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGl0Y2FyZHMtdHlwZXMvdHlwZXMvdmlzYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGl0Y2FyZHMvY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGl0Y2FyZHMvY3ZjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy9leHBpcmF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkaXRjYXJkcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGl0Y2FyZHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4cGFuZC15ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYXN0LWx1aG4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWZpbml0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtaW50ZWdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtdmFsaWQtbW9udGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZpbmRJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVGaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvZmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2ZpbmRJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL3JlZHVjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL3RvSW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFyc2UtaW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYXJzZS15ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94dGVuZC9tdXRhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy96ZXJvLWZpbGwvaW5kZXguanMiXSwibmFtZXMiOlsic2luZ2xldG9uIiwiY29tcGFyZUxpc3RUbXBsIiwiY29tcGFyZUxpc3RJdGVtVG1wbCIsIkNvbXBhcmVQcm9kdWN0cyIsImNvbnRleHQiLCJhbmltYXRpb25UaW1lIiwiJGJvZHkiLCIkIiwicHJvZHVjdHMiLCJsb2FkUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlIiwiJHNjb3BlIiwiTXVzdGFjaGUiLCJyZW5kZXIiLCJjb21wYXJlIiwiY29tcGFyZUFkZG9uTGFuZ19jb21wYXJlIiwiY2xlYXJfYWxsIiwiY29tcGFyZUFkZG9uTGFuZ19jbGVhcl9hbGwiLCJyZW5kZXJJdGVtcyIsIm1hcCIsInByb2R1Y3QiLCJyZW5kZXJJdGVtIiwiam9pbiIsImxlbmd0aCIsImFkZENsYXNzIiwiaGlkZSIsInJlbW92ZUNsYXNzIiwic2hvdyIsImFwcGVuZCIsIiRwcm9kdWN0TGlzdCIsImZpbmQiLCIkY29tcGFyZUJ1dHRvbiIsInVwZGF0ZUNvbXBhcmVVcmwiLCJiaW5kRXZlbnRzIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwicyIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJlIiwic2F2ZVByb2R1Y3RzVG9Mb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJGVsIiwiY3VycmVudFRhcmdldCIsImlkIiwiTnVtYmVyIiwiZGF0YSIsImZpbHRlciIsIml0ZW0iLCJhZGRQcm9kdWN0IiwiaW1hZ2UiLCJhbHQiLCJyZW1vdmVQcm9kdWN0IiwidG9nZ2xlQ2xhc3MiLCJjbGVhckFsbFByb2R1Y3RzIiwicHVzaCIsImZhZGVJbiIsImZhZGVPdXQiLCJyZW1vdmUiLCJwYXRoIiwiYXR0ciIsInVybHMiLCJxdWlja192aWV3IiwiY29tcGFyZUFkZG9uTGFuZ19xdWlja192aWV3IiwiY29tcGFyZUFkZG9uTGFuZ19yZW1vdmUiLCJjb21wYXJlUHJvZHVjdHMiLCJBY2NvdW50IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCIkc3RhdGUiLCJvblJlYWR5IiwiJGVkaXRBY2NvdW50Rm9ybSIsImNsYXNzaWZ5Rm9ybSIsIiRhZGRyZXNzRm9ybSIsIiRpbmJveEZvcm0iLCIkYWNjb3VudFJldHVybkZvcm0iLCIkcGF5bWVudE1ldGhvZEZvcm0iLCIkcmVvcmRlckZvcm0iLCIkaW52b2ljZUJ1dHRvbiIsInBhc3N3b3JkUmVxdWlyZW1lbnRzIiwiV2lzaGxpc3QiLCJsb2FkIiwicmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24iLCJpcyIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJsZWZ0Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsInRvcCIsImF2YWlsSGVpZ2h0IiwidXJsIiwib3BlbiIsImluaXRBZGRyZXNzRm9ybVZhbGlkYXRpb24iLCJyZWdpc3RlckluYm94VmFsaWRhdGlvbiIsImluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24iLCJpbml0UGF5bWVudE1ldGhvZEZvcm1WYWxpZGF0aW9uIiwiaW5pdFJlb3JkZXJGb3JtIiwiYmluZERlbGV0ZUFkZHJlc3MiLCJiaW5kRGVsZXRlUGF5bWVudE1ldGhvZCIsIm1lc3NhZ2UiLCJjb25maXJtIiwiJHByb2R1Y3RSZW9yZGVyQ2hlY2tib3hlcyIsInN1Ym1pdEZvcm0iLCJlYWNoIiwiaW5kZXgiLCJwcm9kdWN0Q2hlY2tib3giLCJwcm9kdWN0SWQiLCJ2YWwiLCIkaW5wdXQiLCJ0eXBlIiwibmFtZSIsInZhbHVlIiwic3dhbCIsImZpcmUiLCJ0ZXh0Iiwic2VsZWN0SXRlbSIsImljb24iLCJ2YWxpZGF0aW9uTW9kZWwiLCJ2YWxpZGF0aW9uIiwic3RhdGVTZWxlY3RvciIsIiRzdGF0ZUVsZW1lbnQiLCJhZGRyZXNzVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImFkZCIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwiZXJyIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsIlZhbGlkYXRvcnMiLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiZmllbGRfbm90X2JsYW5rIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImVycm9yTWVzc2FnZSIsImZvcm1TdWJtaXQiLCJpIiwiZWxlIiwicGFyc2VJbnQiLCJmaXJzdE5hbWVMYWJlbCIsImxhc3ROYW1lTGFiZWwiLCJjb21wYW55TGFiZWwiLCJwaG9uZUxhYmVsIiwiYWRkcmVzczFMYWJlbCIsImFkZHJlc3MyTGFiZWwiLCJjaXR5TGFiZWwiLCJjb3VudHJ5TGFiZWwiLCJjaG9vc2VDb3VudHJ5TGFiZWwiLCJzdGF0ZUxhYmVsIiwicG9zdGFsQ29kZUxhYmVsIiwicGF5bWVudE1ldGhvZFNlbGVjdG9yIiwicGF5bWVudE1ldGhvZFZhbGlkYXRvciIsImNhcmRUeXBlIiwidGFyZ2V0IiwiY3JlZGl0Q2FyZFR5cGUiLCJzaWJsaW5ncyIsImNzcyIsIkNDVmFsaWRhdG9ycyIsInNldENyZWRpdENhcmROdW1iZXJWYWxpZGF0aW9uIiwiY3JlZGl0Q2FyZE51bWJlciIsInNldEV4cGlyYXRpb25WYWxpZGF0aW9uIiwiZXhwaXJhdGlvbiIsInNldE5hbWVPbkNhcmRWYWxpZGF0aW9uIiwibmFtZU9uQ2FyZCIsInNldEN2dlZhbGlkYXRpb24iLCJjdnYiLCJDQ0Zvcm1hdHRlcnMiLCJzZXRDcmVkaXRDYXJkTnVtYmVyRm9ybWF0Iiwic2V0RXhwaXJhdGlvbkZvcm1hdCIsInNlcmlhbGl6ZUFycmF5Iiwib2JqIiwicmVmT2JqIiwiY291bnRyeSIsImNvdW50cmllcyIsInN0YXRlIiwic3RhdGVzIiwiY291bnRyeV9jb2RlIiwiY29kZSIsInN0YXRlX29yX3Byb3ZpbmNlX2NvZGUiLCJkZWZhdWx0X2luc3RydW1lbnQiLCJzdG9yZUluc3RydW1lbnQiLCJsb2NhdGlvbiIsImhyZWYiLCJwYXltZW50TWV0aG9kc1VybCIsImdlbmVyaWNfZXJyb3IiLCJmb3JtRWRpdFNlbGVjdG9yIiwiZWRpdFZhbGlkYXRvciIsImVtYWlsU2VsZWN0b3IiLCIkZW1haWxFbGVtZW50IiwicGFzc3dvcmRTZWxlY3RvciIsIiRwYXNzd29yZEVsZW1lbnQiLCJwYXNzd29yZDJTZWxlY3RvciIsIiRwYXNzd29yZDJFbGVtZW50IiwiY3VycmVudFBhc3N3b3JkU2VsZWN0b3IiLCIkY3VycmVudFBhc3N3b3JkIiwic2V0RW1haWxWYWxpZGF0aW9uIiwidmFsaWRfZW1haWwiLCJlbnRlclBhc3N3b3JkIiwicGFzc3dvcmQiLCJtYXRjaFBhc3N3b3JkIiwicGFzc3dvcmRfbWF0Y2giLCJpbnZhbGlkUGFzc3dvcmQiLCJpbnZhbGlkX3Bhc3N3b3JkIiwic2V0UGFzc3dvcmRWYWxpZGF0aW9uIiwiY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0Iiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwicmVzdWx0IiwiY3VycmVudFBhc3N3b3JkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJpbmJveFZhbGlkYXRvciIsImVudGVyT3JkZXJOdW0iLCJlbnRlclN1YmplY3QiLCJlbnRlck1lc3NhZ2UiLCJQYWdlTWFuYWdlciIsImJ1aWxkRGF0ZVZhbGlkYXRpb24iLCIkZm9ybUZpZWxkIiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsImludmFsaWRNZXNzYWdlIiwiZm9ybUVsZW1lbnRJZCIsIm1pblNwbGl0Iiwic3BsaXQiLCJtYXhTcGxpdCIsIm1pbkRhdGUiLCJEYXRlIiwibWF4RGF0ZSIsInRyaWdnZXJlZEJ5IiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwiY2hvc2VuRGF0ZSIsImJ1aWxkUmVxdWlyZWRDaGVja2JveFZhbGlkYXRpb24iLCJlcnJvclRleHQiLCJmb3JtRmllbGRJZCIsInByaW1hcnlTZWxlY3RvciIsInNlY29uZGFyeVNlbGVjdG9yIiwiY2hlY2tib3giLCJjaGVja2VkIiwiYnVpbGRSZXF1aXJlZFZhbGlkYXRpb24iLCJidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbiIsImZvcm1GaWVsZFNlbGVjdG9yIiwibGFiZWwiLCJtaW4iLCJtYXgiLCJudW1iZXJWYWwiLCJidWlsZFZhbGlkYXRpb24iLCIkdmFsaWRhdGVhYmxlRWxlbWVudCIsImZpZWxkVmFsaWRhdGlvbnMiLCJkYXRlVmFsaWRhdGlvbiIsInJlcXVpcmVkIiwiZWxlbWVudCIsIiRpbnB1dEVsZW1lbnQiLCJ0YWdOYW1lIiwiZ2V0IiwiaW5wdXROYW1lIiwiZWxlbWVudFNlbGVjdG9yIiwiJGZvcm0iLCJ2YWxpZGF0aW9uc1RvUGVyZm9ybSIsInJlcXVpcmVkRmllbGRWYWxpZGF0aW9uVGV4dCIsImlucHV0IiwiZ2V0TGFiZWwiLCJmaXJzdCIsInJlcXVpcmVkVmFsaWRhdGlvbk1lc3NhZ2UiLCJjb25jYXQiLCJvbWl0TnVsbFN0cmluZyIsImtleSIsImNyZWRpdGNhcmRzIiwiY2FyZCIsImRvbmUiLCJmYWlsIiwicGF5bWVudHNVcmwiLCJzaG9wcGVySWQiLCJzdG9yZUhhc2giLCJ2YXVsdFRva2VuIiwicHJvdmlkZXJfaWQiLCJjdXJyZW5jeV9jb2RlIiwiY3JlZGl0X2NhcmRfbnVtYmVyIiwibmFtZV9vbl9jYXJkIiwiYWRkcmVzczEiLCJhZGRyZXNzMiIsImNpdHkiLCJwb3N0YWxfY29kZSIsImNvbXBhbnkiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZW1haWwiLCJwaG9uZSIsImV4cGlyeSIsImFqYXgiLCJkYXRhVHlwZSIsIm1ldGhvZCIsImNhY2hlIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJBY2NlcHQiLCJpbnN0cnVtZW50IiwiY2FyZGhvbGRlcl9uYW1lIiwibnVtYmVyIiwiZXhwaXJ5X21vbnRoIiwiZXhwaXJ5X3llYXIiLCJ2ZXJpZmljYXRpb25fdmFsdWUiLCJiaWxsaW5nX2FkZHJlc3MiLCJGb3JtYXR0ZXJzIiwicmVmVGFyZ2V0IiwiZm9ybWF0Iiwid2hpY2giLCJ0ZXN0Iiwic2xpY2UiLCJyZXBsYWNlIiwidmFsaWRhdG9yIiwiaXNWYWxpZCIsImlzUGFzdCIsImN2YyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxJQUFJQSxTQUFKO0FBRUEsSUFBTUMsZUFBZSx1bkNBQXJCO0FBZ0JBLElBQU1DLG1CQUFtQixvbUJBQXpCOztJQVFNQyxlO0FBQ0YsMkJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixHQUFyQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUMsQ0FBQyxDQUFDLE1BQUQsQ0FBZDtBQUVBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0MsNEJBQUwsTUFBdUMsRUFBdkQ7QUFFQSxTQUFLQyxNQUFMLEdBQWNILENBQUMsQ0FBQ0ksK0NBQVEsQ0FBQ0MsTUFBVCxDQUFnQlgsZUFBaEIsRUFBaUM7QUFDN0NZLGFBQU8sRUFBRVQsT0FBTyxDQUFDVSx3QkFENEI7QUFFN0NDLGVBQVMsRUFBRVgsT0FBTyxDQUFDWSwwQkFGMEI7QUFHN0NDLGlC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Ozs7QUNaWTs7QUFFWixxQkFBcUIsbUJBQU8sQ0FBQyxvREFBVztBQUN4QyxpQkFBaUIsbUJBQU8sQ0FBQyx3REFBYTs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTs7QUFFQTs7QUFFQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNdXN0YWNoZSBmcm9tICdtdXN0YWNoZSc7XG5cbmxldCBzaW5nbGV0b247XG5cbmNvbnN0IGNvbXBhcmVMaXN0VG1wbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtcGFuZWwtd3JhcHBlciBpcy1lbXB0eVwiIGlkPVwic3VwZXJtYXJrZXRDb21wYXJlTGlzdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtcGFuZWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdC1wYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0XCIgZGF0YS1jb21wYXJlLXByb2R1Y3QtbGlzdD57e3tyZW5kZXJJdGVtc319fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ7e2NvbXBhcmVfdXJsfX1cIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXByaW1hcnkgYnV0dG9uLS1zbWFsbCBidXR0b24tLWNvbXBhcmVcIiBkYXRhLWNvbXBhcmUtcHJvZHVjdC1idXR0b24+e3tjb21wYXJlfX08L2E+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tc2Vjb25kYXJ5IGJ1dHRvbi0tc21hbGwgYnV0dG9uLS1jbGVhckFsbFwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LWNsZWFyYWxsPnt7Y2xlYXJfYWxsfX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1jbG9zZVwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LXRvZ2dsZT48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tZG93blwiPjwvaT48c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPkNsb3NlPC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1vcGVuXCIgZGF0YS1jb21wYXJlLXByb2R1Y3QtdG9nZ2xlPjxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi11cFwiPjwvaT48c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPk9wZW48L3NwYW4+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuYDtcblxuY29uc3QgY29tcGFyZUxpc3RJdGVtVG1wbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic3VwZXJtYXJrZXQtY29tcGFyZUxpc3QtaXRlbVwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LWl0ZW09XCJ7e2lkfX1cIj5cbiAgICAgICAgPGltZyBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LWltZ1wiIHNyYz1cInt7aW1hZ2V9fVwiIGFsdD1cInt7YWx0fX1cIiB0aXRsZT1cInt7YWx0fX1cIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzdXBlcm1hcmtldC1jb21wYXJlTGlzdC1xdWlja3ZpZXcgcXVpY2t2aWV3XCIgZGF0YS1wcm9kdWN0LWlkPVwie3tpZH19XCI+PGkgY2xhc3M9XCJmYSBmYS1zZWFyY2gtcGx1c1wiPjwvaT48c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPnt7cXVpY2tfdmlld319PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInN1cGVybWFya2V0LWNvbXBhcmVMaXN0LXJlbW92ZVwiIGRhdGEtY29tcGFyZS1wcm9kdWN0LXJlbW92ZT1cInt7aWR9fVwiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+PHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj57e3JlbW92ZX19PC9zcGFuPjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxuY2xhc3MgQ29tcGFyZVByb2R1Y3RzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uVGltZSA9IDMwMDtcbiAgICAgICAgdGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gdGhpcy5sb2FkUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKCkgfHwgW107XG5cbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkKE11c3RhY2hlLnJlbmRlcihjb21wYXJlTGlzdFRtcGwsIHtcbiAgICAgICAgICAgIGNvbXBhcmU6IGNvbnRleHQuY29tcGFyZUFkZG9uTGFuZ19jb21wYXJlLFxuICAgICAgICAgICAgY2xlYXJfYWxsOiBjb250ZXh0LmNvbXBhcmVBZGRvbkxhbmdfY2xlYXJfYWxsLFxuICAgICAgICAgICAgcmVuZGVySXRlbXM6ICgpID0+IHRoaXMucHJvZHVjdHMubWFwKHByb2R1Y3QgPT4gdGhpcy5yZW5kZXJJdGVtKHByb2R1Y3QpKS5qb2luKCcnKSxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2lzLWVtcHR5JykuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUucmVtb3ZlQ2xhc3MoJ2lzLWVtcHR5Jykuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kc2NvcGUpO1xuXG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0ID0gdGhpcy4kc2NvcGUuZmluZCgnW2RhdGEtY29tcGFyZS1wcm9kdWN0LWxpc3RdJyk7XG4gICAgICAgIHRoaXMuJGNvbXBhcmVCdXR0b24gPSB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1jb21wYXJlLXByb2R1Y3QtYnV0dG9uXScpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGFyZVVybCgpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGxvYWRQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghd2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHMgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbXBhcmVQcm9kdWN0cycpO1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZVByb2R1Y3RzVG9Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghd2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29tcGFyZVByb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9kdWN0cykpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJGJvZHkub24oJ2NsaWNrJywgJ1tkYXRhLWNvbXBhcmUtaWRdJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRlbCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IE51bWJlcigkZWwuZGF0YSgnY29tcGFyZUlkJykpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9kdWN0cy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkID09PSBpZCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQcm9kdWN0KHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICRlbC5kYXRhKCdjb21wYXJlSW1hZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgYWx0OiAkZWwuZGF0YSgnY29tcGFyZVRpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLXByb2R1Y3QtcmVtb3ZlXScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCAkZWwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBOdW1iZXIoJGVsLmRhdGEoJ2NvbXBhcmVQcm9kdWN0UmVtb3ZlJykpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcm9kdWN0KGlkKTtcblxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCdbZGF0YS1jb21wYXJlLXByb2R1Y3QtdG9nZ2xlXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS50b2dnbGVDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmZpbmQoJ1tkYXRhLWNvbXBhcmUtcHJvZHVjdC1jbGVhcmFsbF0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5jbGVhckFsbFByb2R1Y3RzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFByb2R1Y3QocHJvZHVjdCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RzLnB1c2gocHJvZHVjdCk7XG4gICAgICAgIHRoaXMuc2F2ZVByb2R1Y3RzVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wYXJlVXJsKCk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gJCh0aGlzLnJlbmRlckl0ZW0ocHJvZHVjdCkpLmhpZGUoKTtcblxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdC5hcHBlbmQoJGVsKTtcblxuICAgICAgICAkZWwuc2hvdyh0aGlzLmFuaW1hdGlvblRpbWUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdpcy1lbXB0eScpLmZhZGVJbih0aGlzLmFuaW1hdGlvblRpbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVQcm9kdWN0KGlkKSB7XG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgIT09IGlkKTtcbiAgICAgICAgdGhpcy5zYXZlUHJvZHVjdHNUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBhcmVVcmwoKTtcblxuICAgICAgICBjb25zdCAkZWwgPSB0aGlzLiRzY29wZS5maW5kKGBbZGF0YS1jb21wYXJlLXByb2R1Y3QtaXRlbT0ke2lkfV1gKTtcbiAgICAgICAgJGVsLmZhZGVPdXQodGhpcy5hbmltYXRpb25UaW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAkZWwucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb2R1Y3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmFkZENsYXNzKCdpcy1lbXB0eScpLmZhZGVPdXQodGhpcy5hbmltYXRpb25UaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJBbGxQcm9kdWN0cygpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IFtdO1xuICAgICAgICB0aGlzLnNhdmVQcm9kdWN0c1RvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGFyZVVybCgpO1xuXG4gICAgICAgIGNvbnN0ICRlbCA9IHRoaXMuJHNjb3BlLmZpbmQoJ1tkYXRhLWNvbXBhcmUtcHJvZHVjdC1pdGVtXScpO1xuICAgICAgICAkZWwuZmFkZU91dCh0aGlzLmFuaW1hdGlvblRpbWUsICgpID0+IHtcbiAgICAgICAgICAgICRlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmFkZENsYXNzKCdpcy1lbXB0eScpLmZhZGVPdXQodGhpcy5hbmltYXRpb25UaW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29tcGFyZVVybCgpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMucHJvZHVjdHMubWFwKHByb2R1Y3QgPT4gcHJvZHVjdC5pZCkuam9pbignLycpO1xuICAgICAgICB0aGlzLiRjb21wYXJlQnV0dG9uLmF0dHIoJ2hyZWYnLCBgJHt0aGlzLmNvbnRleHQudXJscy5jb21wYXJlfS8ke3BhdGh9YCk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbShpdGVtKSB7XG4gICAgICAgIHJldHVybiBNdXN0YWNoZS5yZW5kZXIoY29tcGFyZUxpc3RJdGVtVG1wbCwge1xuICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgIHF1aWNrX3ZpZXc6IHRoaXMuY29udGV4dC5jb21wYXJlQWRkb25MYW5nX3F1aWNrX3ZpZXcsXG4gICAgICAgICAgICByZW1vdmU6IHRoaXMuY29udGV4dC5jb21wYXJlQWRkb25MYW5nX3JlbW92ZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wYXJlUHJvZHVjdHMoY29udGV4dCkge1xuICAgIGlmICghc2luZ2xldG9uKSB7XG4gICAgICAgIHNpbmdsZXRvbiA9IG5ldyBDb21wYXJlUHJvZHVjdHMoY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBzaW5nbGV0b247XG59XG4iLCJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgV2lzaGxpc3QgZnJvbSAnLi93aXNobGlzdCc7XG5pbXBvcnQgdmFsaWRhdGlvbiBmcm9tICcuL2NvbW1vbi9mb3JtLXZhbGlkYXRpb24nO1xuaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCB7XG4gICAgY2xhc3NpZnlGb3JtLFxuICAgIFZhbGlkYXRvcnMsXG4gICAgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkLFxuICAgIGNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCxcbn0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IHsgY3JlZGl0Q2FyZFR5cGUsIHN0b3JlSW5zdHJ1bWVudCwgVmFsaWRhdG9ycyBhcyBDQ1ZhbGlkYXRvcnMsIEZvcm1hdHRlcnMgYXMgQ0NGb3JtYXR0ZXJzIH0gZnJvbSAnLi9jb21tb24vcGF5bWVudC1tZXRob2QnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuLy8gU3VwZXJtYXJrZXQgTW9kXG4vLyBpbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuLi9lbXRoZW1lcy1tb2Rlei9jb21wYXJlLXByb2R1Y3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgICAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnN0ICRlZGl0QWNjb3VudEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1lZGl0LWFjY291bnQtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFkZHJlc3NGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW5ib3hGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtaW5ib3gtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFjY291bnRSZXR1cm5Gb3JtID0gY2xhc3NpZnlGb3JtKCdbZGF0YS1hY2NvdW50LXJldHVybi1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcGF5bWVudE1ldGhvZEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcmVvcmRlckZvcm0gPSBjbGFzc2lmeUZvcm0oJ1tkYXRhLWFjY291bnQtcmVvcmRlci1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW52b2ljZUJ1dHRvbiA9ICQoJ1tkYXRhLXByaW50LWludm9pY2VdJyk7XG5cbiAgICAgICAgLy8gU3VwZXJtYXJrZXQgTW9kXG4gICAgICAgIC8vIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIC8vIEluamVjdGVkIHZpYSB0ZW1wbGF0ZVxuICAgICAgICB0aGlzLnBhc3N3b3JkUmVxdWlyZW1lbnRzID0gdGhpcy5jb250ZXh0LnBhc3N3b3JkUmVxdWlyZW1lbnRzO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlcyB3aXNoIGxpc3QgSlNcbiAgICAgICAgV2lzaGxpc3QubG9hZCh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGlmICgkZWRpdEFjY291bnRGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVkaXRBY2NvdW50VmFsaWRhdGlvbigkZWRpdEFjY291bnRGb3JtKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiRzdGF0ZS5pcygnaW5wdXQnKSkge1xuICAgICAgICAgICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpbnZvaWNlQnV0dG9uLmxlbmd0aCkge1xuICAgICAgICAgICAgJGludm9pY2VCdXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnQgPSB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggLyAyIC0gNDUwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvcCA9IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQgLyAyIC0gMzIwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9ICRpbnZvaWNlQnV0dG9uLmRhdGEoJ3ByaW50SW52b2ljZScpO1xuXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLCAnb3JkZXJJbnZvaWNlJywgYHdpZHRoPTkwMCxoZWlnaHQ9NjUwLGxlZnQ9JHtsZWZ0fSx0b3A9JHt0b3B9LHNjcm9sbGJhcnM9MWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGFkZHJlc3NGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5pbml0QWRkcmVzc0Zvcm1WYWxpZGF0aW9uKCRhZGRyZXNzRm9ybSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRzdGF0ZS5pcygnaW5wdXQnKSkge1xuICAgICAgICAgICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpbmJveEZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVySW5ib3hWYWxpZGF0aW9uKCRpbmJveEZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRhY2NvdW50UmV0dXJuRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEFjY291bnRSZXR1cm5Gb3JtVmFsaWRhdGlvbigkYWNjb3VudFJldHVybkZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwYXltZW50TWV0aG9kRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFBheW1lbnRNZXRob2RGb3JtVmFsaWRhdGlvbigkcGF5bWVudE1ldGhvZEZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRyZW9yZGVyRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFJlb3JkZXJGb3JtKCRyZW9yZGVyRm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmREZWxldGVBZGRyZXNzKCk7XG4gICAgICAgIHRoaXMuYmluZERlbGV0ZVBheW1lbnRNZXRob2QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBhIHN1Ym1pdCBob29rIHRvIGVuc3VyZSB0aGUgY3VzdG9tZXIgcmVjZWl2ZXMgYSBjb25maXJtYXRpb24gZGlhbG9nIGJlZm9yZSBkZWxldGluZyBhbiBhZGRyZXNzXG4gICAgICovXG4gICAgYmluZERlbGV0ZUFkZHJlc3MoKSB7XG4gICAgICAgICQoJ1tkYXRhLWRlbGV0ZS1hZGRyZXNzXScpLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdkZWxldGVBZGRyZXNzJyk7XG5cbiAgICAgICAgICAgIGlmICghd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRGVsZXRlUGF5bWVudE1ldGhvZCgpIHtcbiAgICAgICAgJCgnW2RhdGEtZGVsZXRlLXBheW1lbnQtbWV0aG9kXScpLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdkZWxldGVQYXltZW50TWV0aG9kJyk7XG5cbiAgICAgICAgICAgIGlmICghd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0UmVvcmRlckZvcm0oJHJlb3JkZXJGb3JtKSB7XG4gICAgICAgICRyZW9yZGVyRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RSZW9yZGVyQ2hlY2tib3hlcyA9ICQoJy5hY2NvdW50LWxpc3RJdGVtIC5mb3JtLWNoZWNrYm94OmNoZWNrZWQnKTtcbiAgICAgICAgICAgIGxldCBzdWJtaXRGb3JtID0gZmFsc2U7XG5cbiAgICAgICAgICAgICRyZW9yZGVyRm9ybS5maW5kKCdbbmFtZV49XCJyZW9yZGVyaXRlbVwiXScpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAkcHJvZHVjdFJlb3JkZXJDaGVja2JveGVzLmVhY2goKGluZGV4LCBwcm9kdWN0Q2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKHByb2R1Y3RDaGVja2JveCkudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGByZW9yZGVyaXRlbVske3Byb2R1Y3RJZH1dYCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxJyxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHN1Ym1pdEZvcm0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJHJlb3JkZXJGb3JtLmFwcGVuZCgkaW5wdXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghc3VibWl0Rm9ybSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5jb250ZXh0LnNlbGVjdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRBZGRyZXNzRm9ybVZhbGlkYXRpb24oJGFkZHJlc3NGb3JtKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Nb2RlbCA9IHZhbGlkYXRpb24oJGFkZHJlc3NGb3JtLCB0aGlzLmNvbnRleHQpO1xuICAgICAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1hZGRyZXNzLWZvcm1dIFtkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXSc7XG4gICAgICAgIGNvbnN0ICRzdGF0ZUVsZW1lbnQgPSAkKHN0YXRlU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBhZGRyZXNzVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJ2Zvcm1bZGF0YS1hZGRyZXNzLWZvcm1dIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBhZGRyZXNzVmFsaWRhdG9yLmFkZCh2YWxpZGF0aW9uTW9kZWwpO1xuXG4gICAgICAgIGlmICgkc3RhdGVFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgJGxhc3Q7XG5cbiAgICAgICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgICAgIHN0YXRlQ291bnRyeSgkc3RhdGVFbGVtZW50LCB0aGlzLmNvbnRleHQsIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcblxuICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzVmFsaWRhdG9yLmdldFN0YXR1cygkc3RhdGVFbGVtZW50KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5yZW1vdmUoJHN0YXRlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24oYWRkcmVzc1ZhbGlkYXRvciwgZmllbGQsIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuZmllbGRfbm90X2JsYW5rKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJGFkZHJlc3NGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBhZGRyZXNzVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoYWRkcmVzc1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24oJGFjY291bnRSZXR1cm5Gb3JtKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICRhY2NvdW50UmV0dXJuRm9ybS5kYXRhKCdhY2NvdW50UmV0dXJuRm9ybUVycm9yJyk7XG5cbiAgICAgICAgJGFjY291bnRSZXR1cm5Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBsZXQgZm9ybVN1Ym1pdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBJdGVyYXRlIHVudGlsIHdlIGZpbmQgYSBub24temVybyB2YWx1ZSBpbiB0aGUgZHJvcGRvd24gZm9yIHF1YW50aXR5XG4gICAgICAgICAgICAkKCdbbmFtZV49XCJyZXR1cm5fcXR5XCJdJywgJGFjY291bnRSZXR1cm5Gb3JtKS5lYWNoKChpLCBlbGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoJChlbGUpLnZhbCgpLCAxMCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVN1Ym1pdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRXhpdCBvdXQgb2YgbG9vcCBpZiB3ZSBmb3VuZCBhdCBsZWFzdCBvbmUgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZm9ybVN1Ym1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0UGF5bWVudE1ldGhvZEZvcm1WYWxpZGF0aW9uKCRwYXltZW50TWV0aG9kRm9ybSkge1xuICAgICAgICAvLyBJbmplY3QgdmFsaWRhdGlvbnMgaW50byBmb3JtIGZpZWxkcyBiZWZvcmUgdmFsaWRhdGlvbiBydW5zXG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjZmlyc3RfbmFtZS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuZmlyc3ROYW1lTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjbGFzdF9uYW1lLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5sYXN0TmFtZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2NvbXBhbnkuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmNvbXBhbnlMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiBmYWxzZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjcGhvbmUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LnBob25lTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogZmFsc2UsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2FkZHJlc3MxLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5hZGRyZXNzMUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2FkZHJlc3MyLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5hZGRyZXNzMkxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IGZhbHNlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNjaXR5LmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5jaXR5TGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjY291bnRyeS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlc2VsZWN0XCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5jb3VudHJ5TGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgcHJlZml4OiBcIiR7dGhpcy5jb250ZXh0LmNob29zZUNvdW50cnlMYWJlbH1cIiB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjc3RhdGUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LnN0YXRlTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjcG9zdGFsX2NvZGUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LnBvc3RhbENvZGVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRwYXltZW50TWV0aG9kRm9ybSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgY29uc3QgcGF5bWVudE1ldGhvZFNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXSc7XG4gICAgICAgIGNvbnN0IHBheW1lbnRNZXRob2RWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W3R5cGU9XCJzdWJtaXRcIl1gLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgJHN0YXRlRWxlbWVudCA9ICQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl1gKTtcblxuICAgICAgICBsZXQgJGxhc3Q7XG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KCRzdGF0ZUVsZW1lbnQsIHRoaXMuY29udGV4dCwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChwYXltZW50TWV0aG9kVmFsaWRhdG9yLmdldFN0YXR1cygkc3RhdGVFbGVtZW50KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXltZW50TWV0aG9kVmFsaWRhdG9yLnJlbW92ZSgkc3RhdGVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgcGF5bWVudE1ldGhvZFZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKHBheW1lbnRNZXRob2RWYWxpZGF0b3IsIGZpZWxkLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmZpZWxkX25vdF9ibGFuayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFVzZSBjcmVkaXQgY2FyZCBudW1iZXIgaW5wdXQgbGlzdGVuZXIgdG8gaGlnaGxpZ2h0IGNyZWRpdCBjYXJkIHR5cGVcbiAgICAgICAgbGV0IGNhcmRUeXBlO1xuICAgICAgICAkKGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cImNyZWRpdF9jYXJkX251bWJlclwiXWApLm9uKCdrZXl1cCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICBjYXJkVHlwZSA9IGNyZWRpdENhcmRUeXBlKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoY2FyZFR5cGUpIHtcbiAgICAgICAgICAgICAgICAkKGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW1nW2FsdD1cIiR7Y2FyZFR5cGV9XCJdYCkuc2libGluZ3MoKS5jc3MoJ29wYWNpdHknLCAnLjInKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGltZ2ApLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNldCBvZiBjcmVkaXQgY2FyZCB2YWxpZGF0aW9uXG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXRDcmVkaXRDYXJkTnVtYmVyVmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJjcmVkaXRfY2FyZF9udW1iZXJcIl1gLCB0aGlzLmNvbnRleHQuY3JlZGl0Q2FyZE51bWJlcik7XG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXRFeHBpcmF0aW9uVmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJleHBpcmF0aW9uXCJdYCwgdGhpcy5jb250ZXh0LmV4cGlyYXRpb24pO1xuICAgICAgICBDQ1ZhbGlkYXRvcnMuc2V0TmFtZU9uQ2FyZFZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwibmFtZV9vbl9jYXJkXCJdYCwgdGhpcy5jb250ZXh0Lm5hbWVPbkNhcmQpO1xuICAgICAgICBDQ1ZhbGlkYXRvcnMuc2V0Q3Z2VmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJjdnZcIl1gLCB0aGlzLmNvbnRleHQuY3Z2LCAoKSA9PiBjYXJkVHlwZSk7XG5cbiAgICAgICAgLy8gU2V0IG9mIGNyZWRpdCBjYXJkIGZvcm1hdFxuICAgICAgICBDQ0Zvcm1hdHRlcnMuc2V0Q3JlZGl0Q2FyZE51bWJlckZvcm1hdChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJjcmVkaXRfY2FyZF9udW1iZXJcIl1gKTtcbiAgICAgICAgQ0NGb3JtYXR0ZXJzLnNldEV4cGlyYXRpb25Gb3JtYXQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiZXhwaXJhdGlvblwiXWApO1xuXG4gICAgICAgIC8vIEJpbGxpbmcgYWRkcmVzcyB2YWxpZGF0aW9uXG4gICAgICAgIHBheW1lbnRNZXRob2RWYWxpZGF0b3IuYWRkKHZhbGlkYXRpb25Nb2RlbCk7XG5cbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gUGVyZm9ybSBmaW5hbCBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICAgIHBheW1lbnRNZXRob2RWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICBpZiAocGF5bWVudE1ldGhvZFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICAvLyBTZXJpYWxpemUgZm9ybSBkYXRhIGFuZCByZWR1Y2UgaXQgdG8gb2JqZWN0XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IF8ucmVkdWNlKCRwYXltZW50TWV0aG9kRm9ybS5zZXJpYWxpemVBcnJheSgpLCAob2JqLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZk9iaiA9IG9iajtcbiAgICAgICAgICAgICAgICAgICAgcmVmT2JqW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmT2JqO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICAgICAgICAgIC8vIEFzc2lnbiBjb3VudHJ5IGFuZCBzdGF0ZSBjb2RlXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnRyeSA9IF8uZmluZCh0aGlzLmNvbnRleHQuY291bnRyaWVzLCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gZGF0YS5jb3VudHJ5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGNvdW50cnkgJiYgXy5maW5kKGNvdW50cnkuc3RhdGVzLCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gZGF0YS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgZGF0YS5jb3VudHJ5X2NvZGUgPSBjb3VudHJ5ID8gY291bnRyeS5jb2RlIDogZGF0YS5jb3VudHJ5O1xuICAgICAgICAgICAgICAgIGRhdGEuc3RhdGVfb3JfcHJvdmluY2VfY29kZSA9IHN0YXRlID8gc3RhdGUuY29kZSA6IGRhdGEuc3RhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IEluc3RydW1lbnRcbiAgICAgICAgICAgICAgICBkYXRhLmRlZmF1bHRfaW5zdHJ1bWVudCA9ICEhZGF0YS5kZWZhdWx0X2luc3RydW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAvLyBTdG9yZSBjcmVkaXQgY2FyZFxuICAgICAgICAgICAgICAgIHN0b3JlSW5zdHJ1bWVudCh0aGlzLmNvbnRleHQsIGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmNvbnRleHQucGF5bWVudE1ldGhvZHNVcmw7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5jb250ZXh0LmdlbmVyaWNfZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRlZGl0QWNjb3VudEZvcm0sIHRoaXMuY29udGV4dCk7XG4gICAgICAgIGNvbnN0IGZvcm1FZGl0U2VsZWN0b3IgPSAnZm9ybVtkYXRhLWVkaXQtYWNjb3VudC1mb3JtXSc7XG4gICAgICAgIGNvbnN0IGVkaXRWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAnJHtmb3JtRWRpdFNlbGVjdG9yfSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGVtYWlsU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiRW1haWxBZGRyZXNzXCJdYDtcbiAgICAgICAgY29uc3QgJGVtYWlsRWxlbWVudCA9ICQoZW1haWxTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiUGFzc3dvcmRcIl1gO1xuICAgICAgICBjb25zdCAkcGFzc3dvcmRFbGVtZW50ID0gJChwYXNzd29yZFNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmQyU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiQ29uZmlybVBhc3N3b3JkXCJdYDtcbiAgICAgICAgY29uc3QgJHBhc3N3b3JkMkVsZW1lbnQgPSAkKHBhc3N3b3JkMlNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhc3N3b3JkU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiQ3VycmVudFBhc3N3b3JkXCJdYDtcbiAgICAgICAgY29uc3QgJGN1cnJlbnRQYXNzd29yZCA9ICQoY3VycmVudFBhc3N3b3JkU2VsZWN0b3IpO1xuXG4gICAgICAgIC8vIFRoaXMgb25seSBoYW5kbGVzIHRoZSBjdXN0b20gZmllbGRzLCBzdGFuZGFyZCBmaWVsZHMgYXJlIGFkZGVkIGJlbG93XG4gICAgICAgIGVkaXRWYWxpZGF0b3IuYWRkKHZhbGlkYXRpb25Nb2RlbCk7XG5cbiAgICAgICAgaWYgKCRlbWFpbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucmVtb3ZlKGVtYWlsU2VsZWN0b3IpO1xuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRFbWFpbFZhbGlkYXRpb24oZWRpdFZhbGlkYXRvciwgZW1haWxTZWxlY3RvciwgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS52YWxpZF9lbWFpbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHBhc3N3b3JkRWxlbWVudCAmJiAkcGFzc3dvcmQyRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgeyBwYXNzd29yZDogZW50ZXJQYXNzd29yZCwgcGFzc3dvcmRfbWF0Y2g6IG1hdGNoUGFzc3dvcmQsIGludmFsaWRfcGFzc3dvcmQ6IGludmFsaWRQYXNzd29yZCB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucmVtb3ZlKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5yZW1vdmUocGFzc3dvcmQyU2VsZWN0b3IpO1xuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRQYXNzd29yZFZhbGlkYXRpb24oXG4gICAgICAgICAgICAgICAgZWRpdFZhbGlkYXRvcixcbiAgICAgICAgICAgICAgICBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHRoaXMucGFzc3dvcmRSZXF1aXJlbWVudHMsXG4gICAgICAgICAgICAgICAgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0KGVudGVyUGFzc3dvcmQsIGVudGVyUGFzc3dvcmQsIG1hdGNoUGFzc3dvcmQsIGludmFsaWRQYXNzd29yZCksXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGN1cnJlbnRQYXNzd29yZCkge1xuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBjdXJyZW50UGFzc3dvcmRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gJycgJiYgJHBhc3N3b3JkRWxlbWVudC52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmN1cnJlbnRQYXNzd29yZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRpdFZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHtmb3JtRWRpdFNlbGVjdG9yfSBpbnB1dFtuYW1lPSdhY2NvdW50X2ZpcnN0bmFtZSddYCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZmlyc3ROYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7Zm9ybUVkaXRTZWxlY3Rvcn0gaW5wdXRbbmFtZT0nYWNjb3VudF9sYXN0bmFtZSddYCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQubGFzdE5hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICAkZWRpdEFjY291bnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBlZGl0VmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoZWRpdFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVySW5ib3hWYWxpZGF0aW9uKCRpbmJveEZvcm0pIHtcbiAgICAgICAgY29uc3QgaW5ib3hWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpbmJveFZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIHNlbGVjdFtuYW1lPVwibWVzc2FnZV9vcmRlcl9pZFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE51bWJlcih2YWwpICE9PSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlck9yZGVyTnVtLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2Zvcm1bZGF0YS1pbmJveC1mb3JtXSBpbnB1dFtuYW1lPVwibWVzc2FnZV9zdWJqZWN0XCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZW50ZXJTdWJqZWN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2Zvcm1bZGF0YS1pbmJveC1mb3JtXSB0ZXh0YXJlYVtuYW1lPVwibWVzc2FnZV9jb250ZW50XCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZW50ZXJNZXNzYWdlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgJGluYm94Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaW5ib3hWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmIChpbmJveFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcblxuLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IHRoZSBnaXZlbiBkYXRlIGZvciB0aGUgZGF5L21vbnRoL3llYXIgc2VsZWN0IGlucHV0cyBpcyB3aXRoaW4gcG90ZW50aWFsIHJhbmdlXG4gKiBAcGFyYW0gJGZvcm1GaWVsZFxuICogQHBhcmFtIHZhbGlkYXRpb25cbiAqIEByZXR1cm5zIHt7c2VsZWN0b3I6IHN0cmluZywgdHJpZ2dlcmVkQnk6IHN0cmluZywgdmFsaWRhdGU6IEZ1bmN0aW9uLCBlcnJvck1lc3NhZ2U6IHN0cmluZ319XG4gKi9cbmZ1bmN0aW9uIGJ1aWxkRGF0ZVZhbGlkYXRpb24oJGZvcm1GaWVsZCwgdmFsaWRhdGlvbikge1xuICAgIC8vIE5vIGRhdGUgcmFuZ2UgcmVzdHJpY3Rpb24sIHNraXBcbiAgICBpZiAodmFsaWRhdGlvbi5taW5fZGF0ZSAmJiB2YWxpZGF0aW9uLm1heF9kYXRlKSB7XG4gICAgICAgIGNvbnN0IGludmFsaWRNZXNzYWdlID0gYFlvdXIgY2hvc2VuIGRhdGUgbXVzdCBmYWxsIGJldHdlZW4gJHt2YWxpZGF0aW9uLm1pbl9kYXRlfSBhbmQgJHt2YWxpZGF0aW9uLm1heF9kYXRlfS5gO1xuICAgICAgICBjb25zdCBmb3JtRWxlbWVudElkID0gJGZvcm1GaWVsZC5hdHRyKCdpZCcpO1xuICAgICAgICBjb25zdCBtaW5TcGxpdCA9IHZhbGlkYXRpb24ubWluX2RhdGUuc3BsaXQoJy0nKTtcbiAgICAgICAgY29uc3QgbWF4U3BsaXQgPSB2YWxpZGF0aW9uLm1heF9kYXRlLnNwbGl0KCctJyk7XG4gICAgICAgIGNvbnN0IG1pbkRhdGUgPSBuZXcgRGF0ZShtaW5TcGxpdFswXSwgbWluU3BsaXRbMV0gLSAxLCBtaW5TcGxpdFsyXSk7XG4gICAgICAgIGNvbnN0IG1heERhdGUgPSBuZXcgRGF0ZShtYXhTcGxpdFswXSwgbWF4U3BsaXRbMV0gLSAxLCBtYXhTcGxpdFsyXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBgIyR7Zm9ybUVsZW1lbnRJZH0gc2VsZWN0W2RhdGEtbGFiZWw9XCJ5ZWFyXCJdYCxcbiAgICAgICAgICAgIHRyaWdnZXJlZEJ5OiBgIyR7Zm9ybUVsZW1lbnRJZH0gc2VsZWN0Om5vdChbZGF0YS1sYWJlbD1cInllYXJcIl0pYCxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9IE51bWJlcigkZm9ybUZpZWxkLmZpbmQoJ3NlbGVjdFtkYXRhLWxhYmVsPVwiZGF5XCJdJykudmFsKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gTnVtYmVyKCRmb3JtRmllbGQuZmluZCgnc2VsZWN0W2RhdGEtbGFiZWw9XCJtb250aFwiXScpLnZhbCgpKSAtIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgeWVhciA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNob3NlbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgICAgICAgICAgICAgIGNiKGNob3NlbkRhdGUgPj0gbWluRGF0ZSAmJiBjaG9zZW5EYXRlIDw9IG1heERhdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogaW52YWxpZE1lc3NhZ2UsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFdlIHZhbGlkYXRlIGNoZWNrYm94ZXMgc2VwYXJhdGVseSBmcm9tIHNpbmdsZSBpbnB1dCBmaWVsZHMsIGFzIHRoZXkgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGVja2VkIG9wdGlvblxuICogZnJvbSBtYW55IGRpZmZlcmVudCBpbnB1dHNcbiAqIEBwYXJhbSAkZm9ybUZpZWxkXG4gKiBAcGFyYW0gdmFsaWRhdGlvblxuICogQHBhcmFtIGVycm9yVGV4dCBwcm92aWRlcyBlcnJvciB2YWxpZGF0aW9uIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gYnVpbGRSZXF1aXJlZENoZWNrYm94VmFsaWRhdGlvbih2YWxpZGF0aW9uLCAkZm9ybUZpZWxkLCBlcnJvclRleHQpIHtcbiAgICBjb25zdCBmb3JtRmllbGRJZCA9ICRmb3JtRmllbGQuYXR0cignaWQnKTtcbiAgICBjb25zdCBwcmltYXJ5U2VsZWN0b3IgPSBgIyR7Zm9ybUZpZWxkSWR9IGlucHV0OmZpcnN0LW9mLXR5cGVgO1xuICAgIGNvbnN0IHNlY29uZGFyeVNlbGVjdG9yID0gYCMke2Zvcm1GaWVsZElkfSBpbnB1dGA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RvcjogcHJpbWFyeVNlbGVjdG9yLFxuICAgICAgICB0cmlnZ2VyZWRCeTogc2Vjb25kYXJ5U2VsZWN0b3IsXG4gICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgJChzZWNvbmRhcnlTZWxlY3RvcikuZWFjaCgoaW5kZXgsIGNoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uKHZhbGlkYXRpb24sIHNlbGVjdG9yLCBlcnJvclRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xuICAgICAgICAgICAgY2IodmFsLmxlbmd0aCA+IDApO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBmb3JtRmllbGRTZWxlY3Rvcikge1xuICAgIGNvbnN0IGludmFsaWRNZXNzYWdlID0gYFRoZSB2YWx1ZSBmb3IgJHt2YWxpZGF0aW9uLmxhYmVsfSBtdXN0IGJlIGJldHdlZW4gJHt2YWxpZGF0aW9uLm1pbn0gYW5kICR7dmFsaWRhdGlvbi5tYXh9LmA7XG4gICAgY29uc3QgbWluID0gTnVtYmVyKHZhbGlkYXRpb24ubWluKTtcbiAgICBjb25zdCBtYXggPSBOdW1iZXIodmFsaWRhdGlvbi5tYXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1GaWVsZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiJHt2YWxpZGF0aW9uLm5hbWV9XCJdYCxcbiAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcblxuICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnZhbGlkTWVzc2FnZSxcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkVmFsaWRhdGlvbigkdmFsaWRhdGVhYmxlRWxlbWVudCwgZXJyb3JNZXNzYWdlKSB7XG4gICAgY29uc3QgdmFsaWRhdGlvbiA9ICR2YWxpZGF0ZWFibGVFbGVtZW50LmRhdGEoJ3ZhbGlkYXRpb24nKTtcbiAgICBjb25zdCBmaWVsZFZhbGlkYXRpb25zID0gW107XG4gICAgY29uc3QgZm9ybUZpZWxkU2VsZWN0b3IgPSBgIyR7JHZhbGlkYXRlYWJsZUVsZW1lbnQuYXR0cignaWQnKX1gO1xuXG4gICAgaWYgKHZhbGlkYXRpb24udHlwZSA9PT0gJ2RhdGVjaG9vc2VyJykge1xuICAgICAgICBjb25zdCBkYXRlVmFsaWRhdGlvbiA9IGJ1aWxkRGF0ZVZhbGlkYXRpb24oJHZhbGlkYXRlYWJsZUVsZW1lbnQsIHZhbGlkYXRpb24pO1xuXG4gICAgICAgIGlmIChkYXRlVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGRhdGVWYWxpZGF0aW9uKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbi5yZXF1aXJlZCAmJiAodmFsaWRhdGlvbi50eXBlID09PSAnY2hlY2tib3hzZWxlY3QnIHx8IHZhbGlkYXRpb24udHlwZSA9PT0gJ3JhZGlvc2VsZWN0JykpIHtcbiAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGJ1aWxkUmVxdWlyZWRDaGVja2JveFZhbGlkYXRpb24odmFsaWRhdGlvbiwgJHZhbGlkYXRlYWJsZUVsZW1lbnQsIGVycm9yTWVzc2FnZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICR2YWxpZGF0ZWFibGVFbGVtZW50LmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dEVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgdGFnTmFtZSA9ICRpbnB1dEVsZW1lbnQuZ2V0KDApLnRhZ05hbWU7XG4gICAgICAgICAgICBjb25zdCBpbnB1dE5hbWUgPSAkaW5wdXRFbGVtZW50LmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTZWxlY3RvciA9IGAke2Zvcm1GaWVsZFNlbGVjdG9yfSAke3RhZ05hbWV9W25hbWU9XCIke2lucHV0TmFtZX1cIl1gO1xuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi50eXBlID09PSAnbnVtYmVyb25seScpIHtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbGlkYXRpb25zLnB1c2goYnVpbGROdW1iZXJSYW5nZVZhbGlkYXRpb24odmFsaWRhdGlvbiwgZm9ybUZpZWxkU2VsZWN0b3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uKHZhbGlkYXRpb24sIGVsZW1lbnRTZWxlY3RvciwgZXJyb3JNZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZFZhbGlkYXRpb25zO1xufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgdmFsaWRhdGlvbiBtb2RlbCBmb3IgZHluYW1pYyBmb3Jtc1xuICogQHBhcmFtICRmb3JtXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgZm9yIGVycm9yIG1lc3NhZ2VzIG9uIHJlcXVpcmVkIGZpZWxkcyB2YWxpZGF0aW9uXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgkZm9ybSwgY29udGV4dCkge1xuICAgIGxldCB2YWxpZGF0aW9uc1RvUGVyZm9ybSA9IFtdO1xuICAgIGNvbnN0IHsgZmllbGRfbm90X2JsYW5rOiByZXF1aXJlZEZpZWxkVmFsaWRhdGlvblRleHQgfSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcblxuICAgICRmb3JtLmZpbmQoJ1tkYXRhLXZhbGlkYXRpb25dJykuZWFjaCgoaW5kZXgsIGlucHV0KSA9PiB7XG4gICAgICAgIGNvbnN0IGdldExhYmVsID0gJGVsID0+ICRlbC5maXJzdCgpLmRhdGEoJ3ZhbGlkYXRpb24nKS5sYWJlbDtcbiAgICAgICAgY29uc3QgcmVxdWlyZWRWYWxpZGF0aW9uTWVzc2FnZSA9IGdldExhYmVsKCQoaW5wdXQpKSArIHJlcXVpcmVkRmllbGRWYWxpZGF0aW9uVGV4dDtcblxuICAgICAgICB2YWxpZGF0aW9uc1RvUGVyZm9ybSA9IHZhbGlkYXRpb25zVG9QZXJmb3JtLmNvbmNhdChidWlsZFZhbGlkYXRpb24oJChpbnB1dCksIHJlcXVpcmVkVmFsaWRhdGlvbk1lc3NhZ2UpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB2YWxpZGF0aW9uc1RvUGVyZm9ybTtcbn1cbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgY3JlZGl0Y2FyZHMgZnJvbSAnY3JlZGl0Y2FyZHMnO1xuXG4vKipcbiAqIE9taXQgbnVsbCBvciBlbXB0eSBzdHJpbmcgcHJvcGVydGllcyBvZiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IG9taXROdWxsU3RyaW5nID0gb2JqID0+IHtcbiAgICBjb25zdCByZWZPYmogPSBvYmo7XG5cbiAgICAkLmVhY2gocmVmT2JqLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgcmVmT2JqW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZWZPYmo7XG59O1xuXG4vKipcbiAqIEdldCBjcmVkaXQgY2FyZCB0eXBlIGZyb20gY3JlZGl0IGNhcmQgbnVtYmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWRpdENhcmRUeXBlID0gdmFsdWUgPT4gY3JlZGl0Y2FyZHMuY2FyZC50eXBlKGNyZWRpdGNhcmRzLmNhcmQucGFyc2UodmFsdWUpLCB0cnVlKTtcblxuLyoqXG4gKiBXcmFwcGVyIGZvciBhamF4IHJlcXVlc3QgdG8gc3RvcmUgYSBuZXcgaW5zdHJ1bWVudCBpbiBiaWdwYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSBSZXByZXNlbnRpbmcgdGhlIGRhdGEgbmVlZGVkIGZvciB0aGUgaGVhZGVyXG4gKiBAcGFyYW0ge29iamVjdH0gUmVwcmVzZW50aW5nIHRoZSBkYXRhIG5lZWRlZCBmb3IgdGhlIGJvZHlcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRvbmUgRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBhIHN1Y2Nlc3NmdWwgcmVzcG9uc2VcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZhaWwgRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBhIHVuc3VjY2Vzc2Z1bCByZXNwb25zZVxuICovXG5leHBvcnQgY29uc3Qgc3RvcmVJbnN0cnVtZW50ID0gKHtcbiAgICAvLyBIb3N0bmFtZSwgSWRzICYgVG9rZW5cbiAgICBwYXltZW50c1VybCxcbiAgICBzaG9wcGVySWQsXG4gICAgc3RvcmVIYXNoLFxuICAgIHZhdWx0VG9rZW4sXG59LCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAvLyBQcm92aWRlciBJbmZvXG4gICAgcHJvdmlkZXJfaWQsXG4gICAgY3VycmVuY3lfY29kZSxcblxuICAgIC8vIEluc3RydW1lbnQgRGV0YWlsc1xuICAgIGNyZWRpdF9jYXJkX251bWJlcixcbiAgICBleHBpcmF0aW9uLFxuICAgIG5hbWVfb25fY2FyZCxcbiAgICBjdnYsXG4gICAgZGVmYXVsdF9pbnN0cnVtZW50LFxuXG4gICAgLy8gQmlsbGluZyBBZGRyZXNzXG4gICAgYWRkcmVzczEsXG4gICAgYWRkcmVzczIsXG4gICAgY2l0eSxcbiAgICBwb3N0YWxfY29kZSxcbiAgICBzdGF0ZV9vcl9wcm92aW5jZV9jb2RlLFxuICAgIGNvdW50cnlfY29kZSxcbiAgICBjb21wYW55LFxuICAgIGZpcnN0X25hbWUsXG4gICAgbGFzdF9uYW1lLFxuICAgIGVtYWlsLFxuICAgIHBob25lLFxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbn0sIGRvbmUsIGZhaWwpID0+IHtcbiAgICBjb25zdCBleHBpcnkgPSBleHBpcmF0aW9uLnNwbGl0KCcvJyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAke3BheW1lbnRzVXJsfS9zdG9yZXMvJHtzdG9yZUhhc2h9L2N1c3RvbWVycy8ke3Nob3BwZXJJZH0vc3RvcmVkX2luc3RydW1lbnRzYCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdmF1bHRUb2tlbixcbiAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5iYy52MStqc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vdm5kLmJjLnYxK2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpbnN0cnVtZW50OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhcmQnLFxuICAgICAgICAgICAgICAgIGNhcmRob2xkZXJfbmFtZTogbmFtZV9vbl9jYXJkLFxuICAgICAgICAgICAgICAgIG51bWJlcjogY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZShjcmVkaXRfY2FyZF9udW1iZXIpLFxuICAgICAgICAgICAgICAgIGV4cGlyeV9tb250aDogY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5tb250aC5wYXJzZShleHBpcnlbMF0pLFxuICAgICAgICAgICAgICAgIGV4cGlyeV95ZWFyOiBjcmVkaXRjYXJkcy5leHBpcmF0aW9uLnllYXIucGFyc2UoZXhwaXJ5WzFdLCB0cnVlKSxcbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb25fdmFsdWU6IGN2dixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaWxsaW5nX2FkZHJlc3M6IG9taXROdWxsU3RyaW5nKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzMSxcbiAgICAgICAgICAgICAgICBhZGRyZXNzMixcbiAgICAgICAgICAgICAgICBjaXR5LFxuICAgICAgICAgICAgICAgIHBvc3RhbF9jb2RlLFxuICAgICAgICAgICAgICAgIHN0YXRlX29yX3Byb3ZpbmNlX2NvZGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9jb2RlLFxuICAgICAgICAgICAgICAgIGNvbXBhbnksXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHByb3ZpZGVyX2lkLFxuICAgICAgICAgICAgZGVmYXVsdF9pbnN0cnVtZW50LFxuICAgICAgICAgICAgY3VycmVuY3lfY29kZSxcbiAgICAgICAgfSksXG4gICAgfSlcbiAgICAgICAgLmRvbmUoZG9uZSlcbiAgICAgICAgLmZhaWwoZmFpbCk7XG59O1xuXG5leHBvcnQgY29uc3QgRm9ybWF0dGVycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgZm9ybWF0IGZvciBjcmVkaXQgY2FyZCBudW1iZXJcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBzZXRDcmVkaXRDYXJkTnVtYmVyRm9ybWF0OiBmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgJChmaWVsZCkub24oJ2tleXVwJywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgcmVmVGFyZ2V0LnZhbHVlID0gY3JlZGl0Y2FyZHMuY2FyZC5mb3JtYXQoY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZSh0YXJnZXQudmFsdWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBmb3JtYXQgZm9yIGV4cGlyYXRpb24gZGF0ZVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldEV4cGlyYXRpb25Gb3JtYXQ6IGZpZWxkID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICAkKGZpZWxkKS5vbigna2V5dXAnLCAoeyB0YXJnZXQsIHdoaWNoIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHdoaWNoID09PSA4ICYmIC8uKihcXC8pJC8udGVzdCh0YXJnZXQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZlRhcmdldC52YWx1ZSA9IHRhcmdldC52YWx1ZS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudmFsdWUubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWUuc2xpY2UoMCwgNSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aGljaCAhPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFsxLTldXFwvfFsyLTldKSQvZywgJzAkMS8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oMFsxLTldfDFbMC0yXSkkL2csICckMS8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oWzAtMV0pKFszLTldKSQvZywgJzAkMS8kMicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXigwWzEtOV18MVswLTJdKShbMC05XXsyfSkkL2csICckMS8kMicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbMF0rKVxcL3xbMF0rJC9nLCAnMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15cXGRcXC9dfF5bXFwvXSokL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcLy9nLCAnLycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBWYWxpZGF0b3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSB2YWxpZGF0aW9uIGZvciBjcmVkaXQgY2FyZCBudW1iZXJcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIGVycm9yTWVzc2FnZVxuICAgICAqL1xuICAgIHNldENyZWRpdENhcmROdW1iZXJWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIGNyZWRpdGNhcmRzLmNhcmQuaXNWYWxpZChjcmVkaXRjYXJkcy5jYXJkLnBhcnNlKHZhbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgdmFsaWRhdGlvbiBmb3IgZXhwaXJhdGlvbiBkYXRlXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSBlcnJvck1lc3NhZ2VcbiAgICAgKi9cbiAgICBzZXRFeHBpcmF0aW9uVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJ5ID0gdmFsLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIC9eKDBbMS05XXwxWzAtMl0pXFwvKFswLTldezJ9KSQvLnRlc3QodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICYmICFjcmVkaXRjYXJkcy5leHBpcmF0aW9uLmlzUGFzdChjcmVkaXRjYXJkcy5leHBpcmF0aW9uLm1vbnRoLnBhcnNlKGV4cGlyeVswXSksIGNyZWRpdGNhcmRzLmV4cGlyYXRpb24ueWVhci5wYXJzZShleHBpcnlbMV0sIHRydWUpKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIG5hbWUgb24gY2FyZFxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXG4gICAgICovXG4gICAgc2V0TmFtZU9uQ2FyZFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9ICEhdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIGN2dlxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnl9IGNhcmRUeXBlIFRoZSBjcmVkaXQgY2FyZCBudW1iZXIgdHlwZVxuICAgICAqL1xuICAgIHNldEN2dlZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvck1lc3NhZ2UsIGNhcmRUeXBlKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGNhcmRUeXBlID09PSAnZnVuY3Rpb24nID8gY2FyZFR5cGUoKSA6IGNhcmRUeXBlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIGNyZWRpdGNhcmRzLmN2Yy5pc1ZhbGlkKHZhbCwgdHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICBpZiAodHlwZW9mIEFycmF5LnByb3RvdHlwZS5maW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGFycmF5LmZpbmQocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgfVxuXG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IHRoaXM7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHZhciBpO1xuXG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihwcmVkaWNhdGUgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocHJlZGljYXRlLmNhbGwoY29udGV4dCwgYXJyYXlbaV0sIGksIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGFycmF5W2ldO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmQ7XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3R5cGVzJylcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyZFR5cGVcblxuZnVuY3Rpb24gQ2FyZFR5cGUgKGRhdGEpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENhcmRUeXBlKSkgcmV0dXJuIG5ldyBDYXJkVHlwZShkYXRhKVxuICBhc3NpZ24odGhpcywgZGF0YSlcbn1cblxuQ2FyZFR5cGUucHJvdG90eXBlLmRpZ2l0cyA9IDE2XG5DYXJkVHlwZS5wcm90b3R5cGUuY3ZjTGVuZ3RoID0gM1xuQ2FyZFR5cGUucHJvdG90eXBlLmx1aG4gPSB0cnVlXG5DYXJkVHlwZS5wcm90b3R5cGUuZ3JvdXBQYXR0ZXJuID0gLyhcXGR7MSw0fSkoXFxkezEsNH0pPyhcXGR7MSw0fSk/KFxcZHsxLDR9KT8vXG5cbkNhcmRUeXBlLnByb3RvdHlwZS5ncm91cCA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgcmV0dXJuIChudW1iZXIubWF0Y2godGhpcy5ncm91cFBhdHRlcm4pIHx8IFtdKVxuICAgIC5zbGljZSgxKVxuICAgIC5maWx0ZXIoQm9vbGVhbilcbn1cblxuQ2FyZFR5cGUucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAobnVtYmVyLCBlYWdlcikge1xuICByZXR1cm4gdGhpc1tlYWdlciA/ICdlYWdlclBhdHRlcm4nIDogJ3BhdHRlcm4nXS50ZXN0KG51bWJlcilcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGUoe1xuICBuYW1lOiAnQW1lcmljYW4gRXhwcmVzcycsXG4gIGRpZ2l0czogMTUsXG4gIHBhdHRlcm46IC9eM1s0N11cXGR7MTN9JC8sXG4gIGVhZ2VyUGF0dGVybjogL14zWzQ3XS8sXG4gIGdyb3VwUGF0dGVybjogLyhcXGR7MSw0fSkoXFxkezEsNn0pPyhcXGR7MSw1fSk/LyxcbiAgY3ZjTGVuZ3RoOiA0XG59KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpXG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZSh7XG4gIG5hbWU6ICdEYW5rb3J0JyxcbiAgcGF0dGVybjogL141MDE5XFxkezEyfSQvLFxuICBlYWdlclBhdHRlcm46IC9eNTAxOS9cbn0pXG4iLCIndXNlIHN0cmljdCdcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJylcblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlKHtcbiAgbmFtZTogJ0RpbmVycyBDbHViJyxcbiAgZGlnaXRzOiAxNCxcbiAgcGF0dGVybjogL14zKDBbMC01XXxbNjhdXFxkKVxcZHsxMX0kLyxcbiAgZWFnZXJQYXR0ZXJuOiAvXjMoMHxbNjhdKS8sXG4gIGdyb3VwUGF0dGVybjogLyhcXGR7MSw0fSk/KFxcZHsxLDZ9KT8oXFxkezEsNH0pPy9cbn0pXG4iLCIndXNlIHN0cmljdCdcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJylcblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlKHtcbiAgbmFtZTogJ0Rpc2NvdmVyJyxcbiAgcGF0dGVybjogL142KDAxMSgwWzAtOV18WzItNF1cXGR8NzR8N1s3LTldfDhbNi05XXw5WzAtOV0pfDRbNC05XVxcZHszfXw1XFxkezR9KVxcZHsxMH0kLyxcbiAgZWFnZXJQYXR0ZXJuOiAvXjYoMDExKDBbMC05XXxbMi00XXw3NHw3WzctOV18OFs2LTldfDlbMC05XSl8NFs0LTldfDUpL1xufSlcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGUoe1xuICBuYW1lOiAnRWxvJyxcbiAgcGF0dGVybjogL14oNFswMzVdfDVbMF18NlsyMzVdKSg2WzcyNjNdfDlbOTBdfDFbMjQxNl18N1s3MzZdfDhbOV18MFswNDU3OV18NVswXSkoWzAtOV0pKFswLTldKVxcZHsxMH0kLyxcbiAgZWFnZXJQYXR0ZXJuOiAvXig0WzAzNV18NVswXXw2WzIzNV0pKDZbNzI2M118OVs5MF18MVsyNDE2XXw3WzczNl18OFs5XXwwWzA0NTc5XXw1WzBdKShbMC05XSkoWzAtOV0pLyxcbiAgZ3JvdXBQYXR0ZXJuOiAvKFxcZHsxLDR9KShcXGR7MSw0fSk/KFxcZHsxLDR9KT8oXFxkezEsNH0pPyhcXGR7MSwzfSk/L1xufSlcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGUoe1xuICBuYW1lOiAnRm9yYnJ1Z3Nmb3JlbmluZ2VuJyxcbiAgcGF0dGVybjogL142MDA3MjJcXGR7MTB9JC8sXG4gIGVhZ2VyUGF0dGVybjogL142MDAvXG59KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICByZXF1aXJlKCcuL3Zpc2EnKSxcbiAgcmVxdWlyZSgnLi9tYWVzdHJvJyksXG4gIHJlcXVpcmUoJy4vZm9yYnJ1Z3Nmb3JlbmluZ2VuJyksXG4gIHJlcXVpcmUoJy4vZGFua29ydCcpLFxuICByZXF1aXJlKCcuL21hc3RlcmNhcmQnKSxcbiAgcmVxdWlyZSgnLi9hbWVyaWNhbi1leHByZXNzJyksXG4gIHJlcXVpcmUoJy4vZGluZXJzLWNsdWInKSxcbiAgcmVxdWlyZSgnLi9kaXNjb3ZlcicpLFxuICByZXF1aXJlKCcuL2pjYicpLFxuICByZXF1aXJlKCcuL3VuaW9ucGF5JyksXG4gIHJlcXVpcmUoJy4vdHJveScpLFxuICByZXF1aXJlKCcuL2VsbycpLFxuICByZXF1aXJlKCcuL3VhdHAnKVxuXVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpXG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZSh7XG4gIG5hbWU6ICdKQ0InLFxuICBwYXR0ZXJuOiAvXjM1XFxkezE0fSQvLFxuICBlYWdlclBhdHRlcm46IC9eMzUvXG59KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpXG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZSh7XG4gIG5hbWU6ICdNYWVzdHJvJyxcbiAgZGlnaXRzOiBbMTIsIDE5XSxcbiAgcGF0dGVybjogL14oPzo1WzA2Nzg5XVxcZFxcZHwoPyE2MDExWzAyMzRdKSg/ITYwMTE3WzQ3ODldKSg/ITYwMTE4WzY3ODldKSg/ITYwMTE5KSg/ITY0WzQ1Njc4OV0pKD8hNjUpNlxcZHszfSlcXGR7OCwxNX0kLyxcbiAgZWFnZXJQYXR0ZXJuOiAvXig1KDAxOHwwWzIzXXxbNjhdKXw2WzM3XXw2MDExMXw2MDExNXw2MDExNyhbNTZdfDdbNTZdKXw2MDExOFswLTVdfDY0WzAtM118NjYpLyxcbiAgZ3JvdXBQYXR0ZXJuOiAvKFxcZHsxLDR9KShcXGR7MSw0fSk/KFxcZHsxLDR9KT8oXFxkezEsNH0pPyhcXGR7MSwzfSk/L1xufSlcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGUoe1xuICBuYW1lOiAnTWFzdGVyY2FyZCcsXG4gIHBhdHRlcm46IC9eKDVbMS01XVswLTldezJ9fDIyMlsxLTldfDIyWzMtOV1bMC05XXwyWzMtNl1bMC05XXsyfXwyN1swMV1bMC05XXwyNzIwKVxcZHsxMn0kLyxcbiAgZWFnZXJQYXR0ZXJuOiAvXigyWzMtN118MjJbMi05XXw1WzEtNV0pL1xufSlcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGUoe1xuICBuYW1lOiAnVHJveScsXG4gIHBhdHRlcm46IC9eOTc5MlxcZHsxMn0kLyxcbiAgZWFnZXJQYXR0ZXJuOiAvXjk3OTIvXG59KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpXG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZSh7XG4gIG5hbWU6ICdVQVRQJyxcbiAgZGlnaXRzOiAxNSxcbiAgcGF0dGVybjogL14xXFxkezE0fSQvLFxuICBlYWdlclBhdHRlcm46IC9eMS8sXG4gIGdyb3VwUGF0dGVybjogLyhcXGR7MSw0fSkoXFxkezEsNX0pPyhcXGR7MSw2fSk/L1xufSlcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGUoe1xuICBuYW1lOiAnVW5pb25QYXknLFxuICBwYXR0ZXJuOiAvXjYyWzAtNV1cXGR7MTMsMTZ9JC8sXG4gIGVhZ2VyUGF0dGVybjogL142Mi8sXG4gIGdyb3VwUGF0dGVybjogLyhcXGR7MSw0fSkoXFxkezEsNH0pPyhcXGR7MSw0fSk/KFxcZHsxLDR9KT8oXFxkezEsM30pPy8sXG4gIGx1aG46IGZhbHNlXG59KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpXG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZSh7XG4gIG5hbWU6ICdWaXNhJyxcbiAgZGlnaXRzOiBbMTMsIDE5XSxcbiAgcGF0dGVybjogL140XFxkezEyfShcXGR7M318XFxkezZ9KT8kLyxcbiAgZWFnZXJQYXR0ZXJuOiAvXjQvLFxuICBncm91cFBhdHRlcm46IC8oXFxkezEsNH0pKFxcZHsxLDR9KT8oXFxkezEsNH0pPyhcXGR7MSw0fSk/KFxcZHsxLDN9KT8vXG59KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBsdWhuID0gcmVxdWlyZSgnZmFzdC1sdWhuJylcbnZhciBUeXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhcmRcblxuZnVuY3Rpb24gQ2FyZCAoZGF0YSkge1xuICB2YXIgdHlwZXMgPSBUeXBlcyhkYXRhKVxuXG4gIHJldHVybiB7XG4gICAgdHlwZXM6IGRhdGEsXG4gICAgcGFyc2U6IHBhcnNlQ2FyZCxcbiAgICBmb3JtYXQ6IGZvcm1hdENhcmQsXG4gICAgdHlwZTogY2FyZFR5cGUsXG4gICAgbHVobjogbHVobixcbiAgICBpc1ZhbGlkOiBpc0NhcmRWYWxpZFxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VDYXJkIChudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIG51bWJlciAhPT0gJ3N0cmluZycpIHJldHVybiAnJ1xuICAgIHJldHVybiBudW1iZXIucmVwbGFjZSgvW15cXGRdL2csICcnKVxuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Q2FyZCAobnVtYmVyLCBzZXBhcmF0b3IpIHtcbiAgICB2YXIgdHlwZSA9IGdldFR5cGUobnVtYmVyLCB0cnVlKVxuICAgIGlmICghdHlwZSkgcmV0dXJuIG51bWJlclxuICAgIHJldHVybiB0eXBlLmdyb3VwKG51bWJlcikuam9pbihzZXBhcmF0b3IgfHwgJyAnKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FyZFR5cGUgKG51bWJlciwgZWFnZXIpIHtcbiAgICB2YXIgdHlwZSA9IGdldFR5cGUobnVtYmVyLCBlYWdlcilcbiAgICByZXR1cm4gdHlwZSA/IHR5cGUubmFtZSA6IHVuZGVmaW5lZFxuICB9XG5cbiAgZnVuY3Rpb24gaXNDYXJkVmFsaWQgKG51bWJlciwgdHlwZSkge1xuICAgIGlmICh0eXBlKSB7XG4gICAgICB0eXBlID0gdHlwZXMuZ2V0KHR5cGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBnZXRUeXBlKG51bWJlcilcbiAgICB9XG4gICAgaWYgKCF0eXBlKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gKCF0eXBlLmx1aG4gfHwgbHVobihudW1iZXIpKSAmJiB0eXBlLnRlc3QobnVtYmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZSAobnVtYmVyLCBlYWdlcikge1xuICAgIHJldHVybiB0eXBlcy5maW5kKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gdHlwZS50ZXN0KG51bWJlciwgZWFnZXIpXG4gICAgfSlcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBUeXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKVxudmFyIGN2Y1JlZ2V4ID0gL15cXGR7Myw0fSQvXG5cbm1vZHVsZS5leHBvcnRzID0gQ3ZjXG5cbmZ1bmN0aW9uIEN2YyAoZGF0YSkge1xuICB2YXIgdHlwZXMgPSBUeXBlcyhkYXRhKVxuXG4gIHJldHVybiB7XG4gICAgaXNWYWxpZDogY3ZjSXNWYWxpZFxuICB9XG5cbiAgZnVuY3Rpb24gY3ZjSXNWYWxpZCAoY3ZjLCB0eXBlKSB7XG4gICAgaWYgKHR5cGVvZiBjdmMgIT09ICdzdHJpbmcnKSByZXR1cm4gZmFsc2VcbiAgICBpZiAoIWN2Y1JlZ2V4LnRlc3QoY3ZjKSkgcmV0dXJuIGZhbHNlXG5cbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybiB0eXBlcy5zb21lKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0eXBlLmN2Y0xlbmd0aCA9PT0gY3ZjLmxlbmd0aFxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZXMuZ2V0KHR5cGUpLmN2Y0xlbmd0aCA9PT0gY3ZjLmxlbmd0aFxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGlzVmFsaWRNb250aCA9IHJlcXVpcmUoJ2lzLXZhbGlkLW1vbnRoJylcbnZhciBwYXJzZUludFN0cmljdCA9IHJlcXVpcmUoJ3BhcnNlLWludCcpXG52YXIgcGFyc2VZZWFyID0gcmVxdWlyZSgncGFyc2UteWVhcicpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1Bhc3Q6IGlzUGFzdCxcbiAgbW9udGg6IHtcbiAgICBwYXJzZTogcGFyc2VNb250aCxcbiAgICBpc1ZhbGlkOiBpc1ZhbGlkTW9udGhcbiAgfSxcbiAgeWVhcjoge1xuICAgIHBhcnNlOiBwYXJzZVllYXIsXG4gICAgZm9ybWF0OiBmb3JtYXRFeHBZZWFyLFxuICAgIGlzVmFsaWQ6IGlzRXhwWWVhclZhbGlkLFxuICAgIGlzUGFzdDogaXNFeHBZZWFyUGFzdFxuICB9XG59XG5cbmZ1bmN0aW9uIGlzUGFzdCAobW9udGgsIHllYXIpIHtcbiAgcmV0dXJuIERhdGUubm93KCkgPj0gbmV3IERhdGUoeWVhciwgbW9udGgpXG59XG5cbmZ1bmN0aW9uIHBhcnNlTW9udGggKG1vbnRoKSB7XG4gIHJldHVybiBwYXJzZUludFN0cmljdChtb250aClcbn1cblxuZnVuY3Rpb24gZm9ybWF0RXhwWWVhciAoeWVhciwgc3RyaXApIHtcbiAgeWVhciA9IHllYXIudG9TdHJpbmcoKVxuICByZXR1cm4gc3RyaXAgPyB5ZWFyLnN1YnN0cigyLCA0KSA6IHllYXJcbn1cblxuZnVuY3Rpb24gaXNFeHBZZWFyVmFsaWQgKHllYXIpIHtcbiAgaWYgKHR5cGVvZiB5ZWFyICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlXG4gIHllYXIgPSBwYXJzZUludFN0cmljdCh5ZWFyKVxuICByZXR1cm4geWVhciA+IDBcbn1cblxuZnVuY3Rpb24gaXNFeHBZZWFyUGFzdCAoeWVhcikge1xuICByZXR1cm4gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpID4geWVhclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciB0eXBlcyA9IHJlcXVpcmUoJ2NyZWRpdGNhcmRzLXR5cGVzJylcbnZhciBDYXJkID0gcmVxdWlyZSgnLi9jYXJkJylcbnZhciBDdmMgPSByZXF1aXJlKCcuL2N2YycpXG52YXIgZXhwaXJhdGlvbiA9IHJlcXVpcmUoJy4vZXhwaXJhdGlvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gd2l0aFR5cGVzKHR5cGVzKVxubW9kdWxlLmV4cG9ydHMud2l0aFR5cGVzID0gd2l0aFR5cGVzXG5cbmZ1bmN0aW9uIHdpdGhUeXBlcyAodHlwZXMpIHtcbiAgcmV0dXJuIHtcbiAgICBjYXJkOiBDYXJkKHR5cGVzKSxcbiAgICBjdmM6IEN2Yyh0eXBlcyksXG4gICAgZXhwaXJhdGlvbjogZXhwaXJhdGlvblxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGZpbmQgPSByZXF1aXJlKCdhcnJheS1maW5kJylcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJ2NyZWRpdGNhcmRzLXR5cGVzJylcblxubW9kdWxlLmV4cG9ydHMgPSBDYXJkVHlwZXNcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHRzID0gZGVmYXVsdHNcblxuZnVuY3Rpb24gQ2FyZFR5cGVzICh0eXBlcykge1xuICB2YXIgbWFwID0gdHlwZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHR5cGUpIHtcbiAgICBhY2NbdHlwZS5uYW1lXSA9IHR5cGVcbiAgICByZXR1cm4gYWNjXG4gIH0sIHt9KVxuXG4gIHJldHVybiB7XG4gICAgZmluZDogZmluZC5iaW5kKG51bGwsIHR5cGVzKSxcbiAgICBzb21lOiB0eXBlcy5zb21lLmJpbmQodHlwZXMpLFxuICAgIGdldDogZ2V0XG4gIH1cblxuICBmdW5jdGlvbiBnZXQgKG5hbWUpIHtcbiAgICB2YXIgdHlwZSA9IG1hcFtuYW1lXVxuXG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHR5cGUgZm91bmQgZm9yIG5hbWU6ICcgKyBuYW1lKVxuICAgIH1cblxuICAgIHJldHVybiB0eXBlXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgemVyb0ZpbGwgPSByZXF1aXJlKCd6ZXJvLWZpbGwnKVxudmFyIHBhcnNlSW50U3RyaWN0ID0gcmVxdWlyZSgncGFyc2UtaW50JylcblxudmFyIHBhZCA9IHplcm9GaWxsKDIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXhwYW5kWWVhciAoeWVhciwgbm93KSB7XG4gIG5vdyA9IG5vdyB8fCBuZXcgRGF0ZSgpXG4gIHZhciBiYXNlID0gbm93LmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHIoMCwgMilcbiAgeWVhciA9IHBhcnNlSW50U3RyaWN0KHllYXIpXG4gIHJldHVybiBwYXJzZUludFN0cmljdChiYXNlICsgcGFkKHllYXIpKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIChhcnJheSkge1xuICByZXR1cm4gZnVuY3Rpb24gbHVobiAobnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBudW1iZXIgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzdHJpbmcgaW5wdXQnKVxuICAgIGlmICghbnVtYmVyKSByZXR1cm4gZmFsc2VcbiAgICB2YXIgbGVuZ3RoID0gbnVtYmVyLmxlbmd0aFxuICAgIHZhciBiaXQgPSAxXG4gICAgdmFyIHN1bSA9IDBcbiAgICB2YXIgdmFsdWVcblxuICAgIHdoaWxlIChsZW5ndGgpIHtcbiAgICAgIHZhbHVlID0gcGFyc2VJbnQobnVtYmVyLmNoYXJBdCgtLWxlbmd0aCksIDEwKVxuICAgICAgYml0IF49IDFcbiAgICAgIHN1bSArPSBiaXQgPyBhcnJheVt2YWx1ZV0gOiB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiBzdW0gJSAxMCA9PT0gMFxuICB9XG59KFswLCAyLCA0LCA2LCA4LCAxLCAzLCA1LCA3LCA5XSkpXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTnVtYmVyLmlzRmluaXRlIHx8IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRyZXR1cm4gISh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHZhbHVlICE9PSB2YWx1ZSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkgfHwgdmFsdWUgPT09IC1JbmZpbml0eSk7XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3BhdWxtaWxsci9lczYtc2hpbVxuLy8gaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLmlzaW50ZWdlclxudmFyIGlzRmluaXRlID0gcmVxdWlyZShcImlzLWZpbml0ZVwiKTtcbm1vZHVsZS5leHBvcnRzID0gTnVtYmVyLmlzSW50ZWdlciB8fCBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgJiZcbiAgICBpc0Zpbml0ZSh2YWwpICYmXG4gICAgTWF0aC5mbG9vcih2YWwpID09PSB2YWw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBpc0ludGVnZXIgPSByZXF1aXJlKCdpcy1pbnRlZ2VyJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1ZhbGlkTW9udGggKG1vbnRoKSB7XG4gIGlmICh0eXBlb2YgbW9udGggIT09ICdudW1iZXInIHx8ICFpc0ludGVnZXIobW9udGgpKSByZXR1cm4gZmFsc2VcbiAgcmV0dXJuIG1vbnRoID49IDEgJiYgbW9udGggPD0gMTJcbn1cbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kSW5kZXg7XG4iLCJ2YXIgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5maW5kYCBvciBgXy5maW5kTGFzdGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbmRJbmRleEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGZpbmQgdGhlIGNvbGxlY3Rpb24gaW5kZXguXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmaW5kIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGaW5kKGZpbmRJbmRleEZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZnJvbUluZGV4KSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHZhciBpdGVyYXRlZSA9IGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpO1xuICAgICAgY29sbGVjdGlvbiA9IGtleXMoY29sbGVjdGlvbik7XG4gICAgICBwcmVkaWNhdGUgPSBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpOyB9O1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXhGdW5jKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZnJvbUluZGV4KTtcbiAgICByZXR1cm4gaW5kZXggPiAtMSA/IGl0ZXJhYmxlW2l0ZXJhdGVlID8gY29sbGVjdGlvbltpbmRleF0gOiBpbmRleF0gOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRmluZDtcbiIsInZhciBjcmVhdGVGaW5kID0gcmVxdWlyZSgnLi9fY3JlYXRlRmluZCcpLFxuICAgIGZpbmRJbmRleCA9IHJlcXVpcmUoJy4vZmluZEluZGV4Jyk7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAsIHJldHVybmluZyB0aGUgZmlyc3QgZWxlbWVudFxuICogYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yLiBUaGUgcHJlZGljYXRlIGlzIGludm9rZWQgd2l0aCB0aHJlZVxuICogYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogdHJ1ZSB9XG4gKiBdO1xuICpcbiAqIF8uZmluZCh1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gby5hZ2UgPCA0MDsgfSk7XG4gKiAvLyA9PiBvYmplY3QgZm9yICdiYXJuZXknXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZCh1c2VycywgeyAnYWdlJzogMSwgJ2FjdGl2ZSc6IHRydWUgfSk7XG4gKiAvLyA9PiBvYmplY3QgZm9yICdwZWJibGVzJ1xuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZCh1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICogLy8gPT4gb2JqZWN0IGZvciAnZnJlZCdcbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZCh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gb2JqZWN0IGZvciAnYmFybmV5J1xuICovXG52YXIgZmluZCA9IGNyZWF0ZUZpbmQoZmluZEluZGV4KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuIiwidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uZmluZGAgZXhjZXB0IHRoYXQgaXQgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0XG4gKiBlbGVtZW50IGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvciBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDEuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZvdW5kIGVsZW1lbnQsIGVsc2UgYC0xYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAncGViYmxlcycsICdhY3RpdmUnOiB0cnVlIH1cbiAqIF07XG4gKlxuICogXy5maW5kSW5kZXgodXNlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udXNlciA9PSAnYmFybmV5JzsgfSk7XG4gKiAvLyA9PiAwXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZEluZGV4KHVzZXJzLCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWN0aXZlJzogZmFsc2UgfSk7XG4gKiAvLyA9PiAxXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maW5kSW5kZXgodXNlcnMsIFsnYWN0aXZlJywgZmFsc2VdKTtcbiAqIC8vID0+IDBcbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZEluZGV4KHVzZXJzLCAnYWN0aXZlJyk7XG4gKiAvLyA9PiAyXG4gKi9cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggPT0gbnVsbCA/IDAgOiB0b0ludGVnZXIoZnJvbUluZGV4KTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGluZGV4ID0gbmF0aXZlTWF4KGxlbmd0aCArIGluZGV4LCAwKTtcbiAgfVxuICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMyksIGluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kSW5kZXg7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlSZWR1Y2U7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBpc0ludGVnZXIgPSByZXF1aXJlKCdpcy1pbnRlZ2VyJylcbnZhciBpc0ludGVnZXJSZWdleCA9IC9eLT9cXGQrJC9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUludFN0cmljdCAoaW50ZWdlcikge1xuICBpZiAodHlwZW9mIGludGVnZXIgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGlzSW50ZWdlcihpbnRlZ2VyKSA/IGludGVnZXIgOiB1bmRlZmluZWRcbiAgfVxuICBpZiAodHlwZW9mIGludGVnZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGlzSW50ZWdlclJlZ2V4LnRlc3QoaW50ZWdlcikgPyBwYXJzZUludChpbnRlZ2VyLCAxMCkgOiB1bmRlZmluZWRcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBwYXJzZUludFN0cmljdCA9IHJlcXVpcmUoJ3BhcnNlLWludCcpXG52YXIgZXhwYW5kWWVhciA9IHJlcXVpcmUoJ2V4cGFuZC15ZWFyJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZVllYXIgKHllYXIsIGV4cGFuZCwgbm93KSB7XG4gIHllYXIgPSBwYXJzZUludFN0cmljdCh5ZWFyKVxuICBpZiAoeWVhciA9PSBudWxsKSByZXR1cm5cbiAgaWYgKCFleHBhbmQpIHJldHVybiB5ZWFyXG4gIHJldHVybiBleHBhbmRZZWFyKHllYXIsIG5vdylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwiLyohIHplcm8tZmlsbC4gTUlUIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuLyoqXG4gKiBHaXZlbiBhIG51bWJlciwgcmV0dXJuIGEgemVyby1maWxsZWQgc3RyaW5nLlxuICogRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyNjcyODMvXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bWJlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHplcm9GaWxsICh3aWR0aCwgbnVtYmVyLCBwYWQpIHtcbiAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChudW1iZXIsIHBhZCkge1xuICAgICAgcmV0dXJuIHplcm9GaWxsKHdpZHRoLCBudW1iZXIsIHBhZClcbiAgICB9XG4gIH1cbiAgaWYgKHBhZCA9PT0gdW5kZWZpbmVkKSBwYWQgPSAnMCdcbiAgd2lkdGggLT0gbnVtYmVyLnRvU3RyaW5nKCkubGVuZ3RoXG4gIGlmICh3aWR0aCA+IDApIHJldHVybiBuZXcgQXJyYXkod2lkdGggKyAoL1xcLi8udGVzdChudW1iZXIpID8gMiA6IDEpKS5qb2luKHBhZCkgKyBudW1iZXJcbiAgcmV0dXJuIG51bWJlciArICcnXG59XG4iXSwic291cmNlUm9vdCI6IiJ9