(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

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

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GiftCertificate; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page-manager */ "./assets/js/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(GiftCertificate, _PageManager);

  function GiftCertificate(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });

    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');

      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }

        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };

      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);

          if (!numberVal) {
            cb(false);
          }

          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }

    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);

    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);

      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();

        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }

    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return;
      }

      var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__["api"].getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }

        modal.updateContent(content, {
          wrap: true
        });
      });
    });
    return _this;
  }

  var _proto = GiftCertificate.prototype;

  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb(Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };

  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9naWZ0LWNlcnRpZmljYXRlLmpzIl0sIm5hbWVzIjpbImNlcnQiLCJsZW5ndGgiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIiwiZGVmYXVsdFBhZ2VCdWlsZGVyVmFsdWVzIiwicGRwX3NhbGVfYmFkZ2VfbGFiZWwiLCJwZHBfc29sZF9vdXRfbGFiZWwiLCJ0cmFuc2xhdGVQYWdlQnVpbGRlclZhbHVlcyIsIiQiLCJlYWNoIiwiXyIsInNlbGVjdG9yIiwiJGl0ZW0iLCJpdGVtVGV4dCIsInRleHQiLCJ0cmltIiwiaXRlbURlZmF1bHRUcmFuc2xhdGlvbiIsImRhdGEiLCJHaWZ0Q2VydGlmaWNhdGUiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsIiRjZXJ0QmFsYW5jZUZvcm0iLCJwdXJjaGFzZU1vZGVsIiwicmVjaXBpZW50TmFtZSIsInZhbCIsInJlY2lwaWVudEVtYWlsIiwiZm9ybU1vZGVsIiwiZW1haWwiLCJzZW5kZXJOYW1lIiwic2VuZGVyRW1haWwiLCJjdXN0b21BbW91bnQiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsInNldEFtb3VudCIsIm9wdGlvbnMiLCJmb3VuZCIsImZvckVhY2giLCJvcHRpb24iLCIkcHVyY2hhc2VGb3JtIiwiJGN1c3RvbUFtb3VudHMiLCJmaW5kIiwicHVyY2hhc2VWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJkZWxheSIsInRhcCIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCIkZWxlbWVudCIsIm1pbkZvcm1hdHRlZCIsIm1heEZvcm1hdHRlZCIsImluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImFtb3VudFJhbmdlIiwiYW1vdW50UGxhY2Vob2xkZXJzIiwidXBkYXRlZEVycm9yVGV4dCIsInBsYWNlaG9sZGVyIiwiaW5jbHVkZXMiLCJyZXBsYWNlIiwiYWRkIiwidmFsaWRhdGUiLCJjYiIsIm51bWJlclZhbCIsIk51bWJlciIsImVycm9yTWVzc2FnZSIsImNlcnRpZmljYXRlX2Ftb3VudF9yYW5nZSIsInJlc3VsdCIsInRvTmFtZSIsInRvRW1haWwiLCJmcm9tTmFtZSIsImZyb21FbWFpbCIsInRyaWdnZXJlZEJ5IiwiY2VydFRoZW1lIiwiZ2V0IiwiY2hlY2tlZCIsImFncmVlVG9UZXJtcyIsImJhbGFuY2VWYWwiLCJjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yIiwib24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xpY2siLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsInByZXZpZXdVcmwiLCJjdXJyZW50VGFyZ2V0Iiwic2VyaWFsaXplIiwib3BlbiIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIndyYXAiLCIkYmFsYW5jZUZvcm0iLCJiYWxhbmNlVmFsaWRhdG9yIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJpbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQWUseUVBQVVBLElBQVYsRUFBZ0I7QUFDM0IsTUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQWhCLElBQTRCQSxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsQ0FBaEQsRUFBbUQ7QUFDL0MsV0FBTyxLQUFQO0FBQ0gsR0FIMEIsQ0FLM0I7OztBQUNBLFNBQU8sSUFBUDtBQUNILEM7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7QUFBQTtBQUFBLElBQU1DLFlBQVksR0FBRyxjQUFyQjs7QUFDQSxJQUFNQywrQkFBK0IsR0FBRyxTQUFsQ0EsK0JBQWtDLENBQUNDLFVBQUQ7QUFBQSxTQUFnQixDQUFDLENBQUNDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixVQUFVLENBQUNGLFlBQUQsQ0FBdEIsRUFBc0NELE1BQXhEO0FBQUEsQ0FBeEM7O0FBQ0EsSUFBTU0sc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixHQUEyQjtBQUN0RCxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsVUFBbUJQLE1BQXZDLEVBQStDTyxDQUFDLEVBQWhELEVBQW9EO0FBQ2hELFFBQU1KLFVBQVUsR0FBR0ssSUFBSSxDQUFDQyxLQUFMLENBQThCRixDQUE5Qiw0QkFBOEJBLENBQTlCLHlCQUE4QkEsQ0FBOUIsRUFBbkI7O0FBQ0EsUUFBSUwsK0JBQStCLENBQUNDLFVBQUQsQ0FBbkMsRUFBaUQ7QUFDN0MsYUFBT0EsVUFBUDtBQUNIO0FBQ0o7QUFDSixDQVBEO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLElBQU1PLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBOEIsQ0FBQ0MsT0FBRCxFQUFhO0FBQ3BELE1BQVFDLHdCQUFSLEdBQXdHRCxPQUF4RyxDQUFRQyx3QkFBUjtBQUFBLE1BQWtDQyxnQ0FBbEMsR0FBd0dGLE9BQXhH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QVksQ0FBQ3hELElBQWIsQ0FBa0Isc0JBQWxCLENBRGlCO0FBRXpCSyxTQUFHLEVBQUVDLGtGQUF5QkE7QUFGTCxLQUFELENBQTVCO0FBS0FtRCxvQkFBZ0IsQ0FBQ3ZDLEdBQWpCLENBQXFCO0FBQ2pCL0MsY0FBUSxFQUFFcUYsWUFBWSxDQUFDeEQsSUFBYixDQUFrQixtQ0FBbEIsQ0FETztBQUVqQm1CLGNBRmlCLG9CQUVSQyxFQUZRLEVBRUpyQyxHQUZJLEVBRUM7QUFDZHFDLFVBQUUsQ0FBQ3NDLGtGQUFvQixDQUFDM0UsR0FBRCxDQUFyQixDQUFGO0FBQ0gsT0FKZ0I7QUFLakJ3QyxrQkFBWSxFQUFFLEtBQUs1QyxvQkFBTCxDQUEwQmdGO0FBTHZCLEtBQXJCO0FBUUEsV0FBT0YsZ0JBQVA7QUFDSCxHOzs7RUEzTXdDRyxxRCIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG5cbmNvbnN0IGRlZmF1bHRQYWdlQnVpbGRlclZhbHVlcyA9IHtcbiAgICBwZHBfc2FsZV9iYWRnZV9sYWJlbDogJ09uIFNhbGUhJyxcbiAgICBwZHBfc29sZF9vdXRfbGFiZWw6ICdTb2xkIE91dCcsXG4gICAgJ3BkcC1zYWxlLXByaWNlLWxhYmVsJzogJ05vdzonLFxuICAgICdwZHAtbm9uLXNhbGUtcHJpY2UtbGFiZWwnOiAnV2FzOicsXG4gICAgJ3BkcC1yZXRhaWwtcHJpY2UtbGFiZWwnOiAnTVNSUDonLFxuICAgICdwZHAtY3VzdG9tLWZpZWxkcy10YWItbGFiZWwnOiAnQWRkaXRpb25hbCBJbmZvcm1hdGlvbicsXG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gZm9yIHZhbHVlcyBmcm9tIHBhZ2UgYnVpbGRlciAobG9jYWxseSBjb3VsZCBiZSBmb3VuZCBpbiBjb25maWcuanNvbilcbiAqL1xuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZVBhZ2VCdWlsZGVyVmFsdWVzID0gKCkgPT4ge1xuICAgICQoJ1tkYXRhLXBhZ2UtYnVpbGRlci1rZXldJykuZWFjaCgoXywgc2VsZWN0b3IpID0+IHtcbiAgICAgICAgY29uc3QgJGl0ZW0gPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSAkaXRlbS50ZXh0KCkudHJpbSgpO1xuICAgICAgICBjb25zdCBpdGVtRGVmYXVsdFRyYW5zbGF0aW9uID0gJGl0ZW0uZGF0YSgnZGVmYXVsdC10cmFuc2xhdGlvbicpO1xuXG4gICAgICAgIGlmIChpdGVtVGV4dCA9PT0gZGVmYXVsdFBhZ2VCdWlsZGVyVmFsdWVzWyRpdGVtLmRhdGEoJ3BhZ2UtYnVpbGRlci1rZXknKV0gJiYgaXRlbVRleHQgIT09IGl0ZW1EZWZhdWx0VHJhbnNsYXRpb24pIHtcbiAgICAgICAgICAgICRpdGVtLnRleHQoaXRlbURlZmF1bHRUcmFuc2xhdGlvbik7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcbmltcG9ydCBjaGVja0lzR2lmdENlcnRWYWxpZCBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgZm9ybU1vZGVsIGZyb20gJy4vY29tbW9uL21vZGVscy9mb3Jtcyc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IHsgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaWZ0Q2VydGlmaWNhdGUgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcblxuICAgICAgICBjb25zdCAkY2VydEJhbGFuY2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtYmFsYW5jZScpO1xuXG4gICAgICAgIGNvbnN0IHB1cmNoYXNlTW9kZWwgPSB7XG4gICAgICAgICAgICByZWNpcGllbnROYW1lKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybU1vZGVsLmVtYWlsKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRlck5hbWUodmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyRW1haWwoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3VzdG9tQW1vdW50KHZhbHVlLCBtaW4sIG1heCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEFtb3VudCh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCAkcHVyY2hhc2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY3VzdG9tQW1vdW50cyA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xuICAgICAgICBjb25zdCBwdXJjaGFzZVZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCRjdXN0b21BbW91bnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbiA9ICRlbGVtZW50LmRhdGEoJ21pbicpO1xuICAgICAgICAgICAgY29uc3QgbWluRm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWluRm9ybWF0dGVkJyk7XG4gICAgICAgICAgICBjb25zdCBtYXggPSAkZWxlbWVudC5kYXRhKCdtYXgnKTtcbiAgICAgICAgICAgIGNvbnN0IG1heEZvcm1hdHRlZCA9ICRlbGVtZW50LmRhdGEoJ21heEZvcm1hdHRlZCcpO1xuICAgICAgICAgICAgY29uc3QgaW5zZXJ0Rm9ybWF0dGVkQW1vdW50c0ludG9FcnJvck1lc3NhZ2UgPSAobWVzc2FnZSwgLi4uYW1vdW50UmFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbW91bnRQbGFjZWhvbGRlcnMgPSBbJ1tNSU5dJywgJ1tNQVhdJ107XG4gICAgICAgICAgICAgICAgbGV0IHVwZGF0ZWRFcnJvclRleHQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgICAgIGFtb3VudFBsYWNlaG9sZGVycy5mb3JFYWNoKChwbGFjZWhvbGRlciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0ID0gdXBkYXRlZEVycm9yVGV4dC5pbmNsdWRlcyhwbGFjZWhvbGRlcikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dC5yZXBsYWNlKHBsYWNlaG9sZGVyLCBhbW91bnRSYW5nZVtpXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZEVycm9yVGV4dDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW51bWJlclZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogaW5zZXJ0Rm9ybWF0dGVkQW1vdW50c0ludG9FcnJvck1lc3NhZ2UodGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5jZXJ0aWZpY2F0ZV9hbW91bnRfcmFuZ2UsIG1pbkZvcm1hdHRlZCwgbWF4Rm9ybWF0dGVkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX25hbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudE5hbWUodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5yZWNpcGllbnRFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b0VtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwuc2VuZGVyTmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Zmlyc3Qtb2YtdHlwZScsXG4gICAgICAgICAgICAgICAgdHJpZ2dlcmVkQnk6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodHlwZW9mICh2YWwpID09PSAnc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jZXJ0VGhlbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWVcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlMlwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZTJcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCRjZXJ0QmFsYW5jZUZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxhbmNlVmFsID0gdGhpcy5jaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRjZXJ0QmFsYW5jZUZvcm0pO1xuXG4gICAgICAgICAgICAkY2VydEJhbGFuY2VGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmFsYW5jZVZhbC5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIGlmICghYmFsYW5jZVZhbC5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHB1cmNoYXNlRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmICghcHVyY2hhc2VWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNnaWZ0LWNlcnRpZmljYXRlLXByZXZpZXcnKS5jbGljayhldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG4gICAgICAgICAgICBjb25zdCBwcmV2aWV3VXJsID0gYCR7JChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcmV2aWV3VXJsJyl9JiR7JHB1cmNoYXNlRm9ybS5zZXJpYWxpemUoKX1gO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIGFwaS5nZXRQYWdlKHByZXZpZXdVcmwsIHt9LCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWwudXBkYXRlQ29udGVudCh0aGlzLmNvbnRleHQucHJldmlld0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KGNvbnRlbnQsIHsgd3JhcDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRiYWxhbmNlRm9ybSkge1xuICAgICAgICBjb25zdCBiYWxhbmNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmFsYW5jZVZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiZ2lmdGNlcnRpZmljYXRlY29kZVwiXScpLFxuICAgICAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xuICAgICAgICAgICAgICAgIGNiKGNoZWNrSXNHaWZ0Q2VydFZhbGlkKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBiYWxhbmNlVmFsaWRhdG9yO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=