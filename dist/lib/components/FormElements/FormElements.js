"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = exports.TextAreaField = exports.SubmitButton = exports.SelectField = exports.NumberField = exports.MultipleSelectField = exports.ImagesDropField = exports.CheckboxField = void 0;

var _react = require("react");

var _formik = require("formik");

var _reactSelect = _interopRequireDefault(require("react-select"));

var _ImagesDropInput = _interopRequireDefault(require("../ImagesDropInput"));

var _excluded = ["name", "label", "placeholder", "fieldSize", "theme"],
    _excluded2 = ["name", "label", "placeholder", "fieldSize", "theme"],
    _excluded3 = ["name", "label", "options", "fieldSize", "theme"],
    _excluded4 = ["label", "options", "fieldSize", "theme", "children"],
    _excluded5 = ["name", "onChange"],
    _excluded6 = ["name", "label", "placeholder", "step", "fieldSize", "theme"],
    _excluded7 = ["name", "label", "fieldSize", "theme"],
    _excluded8 = ["name", "label", "fieldSize", "theme", "required", "multiple", "errorMessage"],
    _excluded9 = ["title", "theme", "isSubmitting", "type"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var fieldSizeMap = new Map([['xs', 'w-14'], ['sm', 'w-[5.25rem]'], ['md', 'w-36'], ['lg', 'w-64'], ['xl', 'w-96'], ['2xl', 'w-[30rem]'], ['3xl', 'w-[50rem]'], ['full', 'w-full'], ['max', 'w-max'], ['screen', 'w-[90vw]']]);
var labelStyle = 'text-gray-400 px-2 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-red-900 peer-focus:text-sm';
var fieldStyle = 'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:border-red-900 focus:ring-0';
var checkboxStyle = 'bg-transparent border-gray-300 text-red-900 text-red-900 rounded border-2 w-5 h-5 focus:ring-0';
var multiSelectStyle = '';
var imagesDropLabelStyle = 'text-gray-400 text-sm';
var errorStyle = 'text-red-700';
var submitButtonStyle = 'bg-red-900 hover:bg-red-800 w-min my-4 px-14 py-2 text-center text-xl font-bold text-white rounded shadow-xl';
var defaultTheme = {
  labelStyle: labelStyle,
  fieldStyle: fieldStyle,
  checkboxStyle: checkboxStyle,
  multiSelectStyle: multiSelectStyle,
  imagesDropLabelStyle: imagesDropLabelStyle,
  errorStyle: errorStyle,
  submitButtonStyle: submitButtonStyle
};

var TextField = function TextField(_ref) {
  var name = _ref.name,
      label = _ref.label,
      placeholder = _ref.placeholder,
      _ref$fieldSize = _ref.fieldSize,
      fieldSize = _ref$fieldSize === void 0 ? 'full' : _ref$fieldSize,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? defaultTheme : _ref$theme,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "py-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(_formik.Field, _extends({
    className: "".concat(theme.fieldStyle || fieldStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max'),
    type: "text",
    name: name,
    id: name,
    placeholder: placeholder || ' '
  }, rest)), label && /*#__PURE__*/React.createElement("label", {
    className: "".concat(theme.labelStyle || labelStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max'),
    htmlFor: name
  }, label), /*#__PURE__*/React.createElement(_formik.ErrorMessage, {
    name: name,
    render: function render(msg) {
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(theme.errorStyle || errorStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max')
      }, msg);
    }
  }))));
};

exports.TextField = TextField;

var TextAreaField = function TextAreaField(_ref2) {
  var name = _ref2.name,
      label = _ref2.label,
      placeholder = _ref2.placeholder,
      _ref2$fieldSize = _ref2.fieldSize,
      fieldSize = _ref2$fieldSize === void 0 ? 'full' : _ref2$fieldSize,
      _ref2$theme = _ref2.theme,
      theme = _ref2$theme === void 0 ? defaultTheme : _ref2$theme,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "py-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(_formik.Field, _extends({
    as: "textarea",
    className: "".concat(theme.fieldStyle || fieldStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max', " focus:h-32"),
    name: name,
    id: name,
    placeholder: placeholder || ' '
  }, rest)), label && /*#__PURE__*/React.createElement("label", {
    className: "".concat(theme.labelStyle || labelStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max'),
    htmlFor: name
  }, label), /*#__PURE__*/React.createElement(_formik.ErrorMessage, {
    name: name,
    render: function render(msg) {
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(theme.errorStyle || errorStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max')
      }, msg);
    }
  }))));
};

exports.TextAreaField = TextAreaField;

var SelectField = function SelectField(_ref3) {
  var name = _ref3.name,
      label = _ref3.label,
      options = _ref3.options,
      _ref3$fieldSize = _ref3.fieldSize,
      fieldSize = _ref3$fieldSize === void 0 ? 'max' : _ref3$fieldSize,
      _ref3$theme = _ref3.theme,
      theme = _ref3$theme === void 0 ? defaultTheme : _ref3$theme,
      rest = _objectWithoutProperties(_ref3, _excluded3);

  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "py-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(_formik.Field, _extends({
    as: "select",
    className: "".concat(theme.fieldStyle || fieldStyle, " ").concat(fieldSizeMap.get(fieldSize)),
    name: name
  }, rest), /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "S\xE9lectionner"), options.map(function (option) {
    return /*#__PURE__*/React.createElement("option", {
      key: option.value,
      value: option.value,
      label: option.label || option.value
    });
  })), label && /*#__PURE__*/React.createElement("label", {
    className: "".concat(theme.labelStyle || labelStyle, " ").concat(fieldSizeMap.get(fieldSize)),
    htmlFor: name
  }, label), /*#__PURE__*/React.createElement(_formik.ErrorMessage, {
    className: "".concat(theme.errorStyle || errorStyle, " ").concat(fieldSizeMap.get(fieldSize)),
    name: name,
    render: function render(msg) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'red'
        }
      }, msg);
    }
  }))));
};

exports.SelectField = SelectField;
var customStyles = {
  control: function control(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: 'transparent',
      border: 0,
      boxShadow: 'transparent'
    });
  },
  input: function input(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: 'transparent'
    });
  },
  placeholder: function placeholder(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      color: 'black'
    });
  }
};

var MultipleSelectField = function MultipleSelectField(_ref4) {
  var label = _ref4.label,
      options = _ref4.options,
      _ref4$fieldSize = _ref4.fieldSize,
      fieldSize = _ref4$fieldSize === void 0 ? '3xl' : _ref4$fieldSize,
      _ref4$theme = _ref4.theme,
      theme = _ref4$theme === void 0 ? defaultTheme : _ref4$theme,
      children = _ref4.children,
      rest = _objectWithoutProperties(_ref4, _excluded4);

  var _useField = (0, _formik.useField)(rest),
      _useField2 = _slicedToArray(_useField, 3),
      field = _useField2[0],
      helpers = _useField2[2];

  var name = field.name,
      onChange = field.onChange,
      otherFieldProps = _objectWithoutProperties(field, _excluded5);

  var setValue = helpers.setValue;
  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "py-2 ".concat(fieldSizeMap.get(fieldSize))
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-gray-300 border-0 border-b-2 relative"
  }, /*#__PURE__*/React.createElement(_reactSelect.default, _extends({
    styles: customStyles,
    options: options,
    isMulti: true,
    isSearchable: false,
    placeholder: "S\xE9lectionner",
    onChange: function onChange(option) {
      return setValue(option);
    }
  }, otherFieldProps)), label && /*#__PURE__*/React.createElement("label", {
    className: "".concat(theme.labelStyle || labelStyle, " ").concat(fieldSizeMap.get(fieldSize)),
    htmlFor: name
  }, label), /*#__PURE__*/React.createElement(_formik.ErrorMessage, {
    className: "".concat(theme.errorStyle || errorStyle, " ").concat(fieldSizeMap.get(fieldSize)),
    name: name,
    render: function render(msg) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'red'
        }
      }, msg);
    }
  }))));
};

exports.MultipleSelectField = MultipleSelectField;

var NumberField = function NumberField(_ref5) {
  var name = _ref5.name,
      label = _ref5.label,
      placeholder = _ref5.placeholder,
      _ref5$step = _ref5.step,
      step = _ref5$step === void 0 ? 1 : _ref5$step,
      _ref5$fieldSize = _ref5.fieldSize,
      fieldSize = _ref5$fieldSize === void 0 ? 'md' : _ref5$fieldSize,
      _ref5$theme = _ref5.theme,
      theme = _ref5$theme === void 0 ? defaultTheme : _ref5$theme,
      rest = _objectWithoutProperties(_ref5, _excluded6);

  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "py-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(_formik.Field, _extends({
    className: "".concat(theme.fieldStyle || fieldStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max'),
    type: "number",
    name: name,
    id: name,
    step: step,
    placeholder: placeholder || ' '
  }, rest)), label && /*#__PURE__*/React.createElement("label", {
    className: "".concat(theme.labelStyle || labelStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max'),
    htmlFor: name
  }, label), /*#__PURE__*/React.createElement(_formik.ErrorMessage, {
    name: name,
    render: function render(msg) {
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(theme.errorStyle || errorStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max')
      }, msg);
    }
  }))));
};

exports.NumberField = NumberField;

var CheckboxField = function CheckboxField(_ref6) {
  var name = _ref6.name,
      label = _ref6.label,
      _ref6$fieldSize = _ref6.fieldSize,
      fieldSize = _ref6$fieldSize === void 0 ? 'md' : _ref6$fieldSize,
      _ref6$theme = _ref6.theme,
      theme = _ref6$theme === void 0 ? defaultTheme : _ref6$theme,
      rest = _objectWithoutProperties(_ref6, _excluded7);

  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "py-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative p-3 flex justify-center ".concat(fieldSizeMap.get(fieldSize) || 'w-max')
  }, /*#__PURE__*/React.createElement(_formik.Field, _extends({
    className: theme.checkboxStyle || checkboxStyle,
    type: "checkbox",
    name: name,
    id: name
  }, rest)), label && /*#__PURE__*/React.createElement("label", {
    className: "".concat(theme.labelStyle || labelStyle, " text-center w-full"),
    htmlFor: name
  }, label), /*#__PURE__*/React.createElement(_formik.ErrorMessage, {
    name: name,
    render: function render(msg) {
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(theme.errorStyle || errorStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max')
      }, msg);
    }
  }))));
};

exports.CheckboxField = CheckboxField;

var ImagesDropField = function ImagesDropField(_ref7) {
  var name = _ref7.name,
      _ref7$label = _ref7.label,
      label = _ref7$label === void 0 ? name : _ref7$label,
      _ref7$fieldSize = _ref7.fieldSize,
      fieldSize = _ref7$fieldSize === void 0 ? 'max' : _ref7$fieldSize,
      _ref7$theme = _ref7.theme,
      theme = _ref7$theme === void 0 ? defaultTheme : _ref7$theme,
      required = _ref7.required,
      multiple = _ref7.multiple,
      _ref7$errorMessage = _ref7.errorMessage,
      errorMessage = _ref7$errorMessage === void 0 ? 'You need to select at least one file' : _ref7$errorMessage,
      rest = _objectWithoutProperties(_ref7, _excluded8);

  var validate = function validate(value) {
    return required && (Array.isArray(value) && value.length === 0 || !Array.isArray(value) && value === undefined) ? errorMessage : undefined;
  }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


  var _useField3 = (0, _formik.useField)({
    name: name,
    validate: validate,
    multiple: multiple
  }),
      _useField4 = _slicedToArray(_useField3, 3),
      helpers = _useField4[2];

  var setValue = helpers.setValue;

  var getFiles = function getFiles(files) {
    multiple ? setValue(files) : setValue(files[0]);
  };

  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("fieldset", {
    className: "flex flex-wrap flex-row justify-start border-2 border-gray-300 px-2 py-4"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "text-red-900 font-black text-lg px-2"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "relative px-2 ".concat(fieldSizeMap.get(fieldSize) || 'w-max')
  }, /*#__PURE__*/React.createElement(_ImagesDropInput.default, _extends({
    name: name,
    id: name,
    getFiles: getFiles,
    multiple: multiple
  }, rest)), /*#__PURE__*/React.createElement(_formik.ErrorMessage, {
    name: name,
    render: function render(msg) {
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(theme.errorStyle || errorStyle, " ").concat(fieldSizeMap.get(fieldSize) || 'w-max')
      }, msg, /*#__PURE__*/React.createElement("button", {
        autoFocus: true
      }));
    }
  }))));
};

exports.ImagesDropField = ImagesDropField;

var SubmitButton = function SubmitButton(_ref8) {
  var title = _ref8.title,
      _ref8$theme = _ref8.theme,
      theme = _ref8$theme === void 0 ? defaultTheme : _ref8$theme,
      _ref8$isSubmitting = _ref8.isSubmitting,
      isSubmitting = _ref8$isSubmitting === void 0 ? false : _ref8$isSubmitting,
      type = _ref8.type,
      rest = _objectWithoutProperties(_ref8, _excluded9);

  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("button", _extends({
    type: "submit",
    className: "disabled:opacity-70 ".concat(theme.submitButtonStyle || submitButtonStyle),
    disabled: isSubmitting
  }, rest), title));
};

exports.SubmitButton = SubmitButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9Gb3JtRWxlbWVudHMvRm9ybUVsZW1lbnRzLnRzeCJdLCJuYW1lcyI6WyJmaWVsZFNpemVNYXAiLCJNYXAiLCJsYWJlbFN0eWxlIiwiZmllbGRTdHlsZSIsImNoZWNrYm94U3R5bGUiLCJtdWx0aVNlbGVjdFN0eWxlIiwiaW1hZ2VzRHJvcExhYmVsU3R5bGUiLCJlcnJvclN0eWxlIiwic3VibWl0QnV0dG9uU3R5bGUiLCJkZWZhdWx0VGhlbWUiLCJUZXh0RmllbGQiLCJuYW1lIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsImZpZWxkU2l6ZSIsInRoZW1lIiwicmVzdCIsImdldCIsIm1zZyIsIlRleHRBcmVhRmllbGQiLCJTZWxlY3RGaWVsZCIsIm9wdGlvbnMiLCJtYXAiLCJvcHRpb24iLCJ2YWx1ZSIsImNvbG9yIiwiY3VzdG9tU3R5bGVzIiwiY29udHJvbCIsInN0eWxlcyIsImJhY2tncm91bmRDb2xvciIsImJvcmRlciIsImJveFNoYWRvdyIsImlucHV0IiwiTXVsdGlwbGVTZWxlY3RGaWVsZCIsImNoaWxkcmVuIiwiZmllbGQiLCJoZWxwZXJzIiwib25DaGFuZ2UiLCJvdGhlckZpZWxkUHJvcHMiLCJzZXRWYWx1ZSIsIk51bWJlckZpZWxkIiwic3RlcCIsIkNoZWNrYm94RmllbGQiLCJJbWFnZXNEcm9wRmllbGQiLCJyZXF1aXJlZCIsIm11bHRpcGxlIiwiZXJyb3JNZXNzYWdlIiwidmFsaWRhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJnZXRGaWxlcyIsImZpbGVzIiwiU3VibWl0QnV0dG9uIiwidGl0bGUiLCJpc1N1Ym1pdHRpbmciLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLFlBQWlDLEdBQUcsSUFBSUMsR0FBSixDQUFRLENB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QSxJQUFNb0MsWUFBbUMsR0FBRyxTQUF0Q0EsWUFBc0MsUUFNN0M7QUFBQSxNQUxKQyxLQUtJLFNBTEpBLEtBS0k7QUFBQSwwQkFKSnhDLEtBSUk7QUFBQSxNQUpKQSxLQUlJLDRCQUpJTixZQUlKO0FBQUEsaUNBSEorQyxZQUdJO0FBQUEsTUFISkEsWUFHSSxtQ0FIVyxLQUdYO0FBQUEsTUFGSkMsSUFFSSxTQUZKQSxJQUVJO0FBQUEsTUFERHpDLElBQ0M7O0FBQ0osc0JBQ0Usb0JBQUMsZUFBRCxxQkFDRTtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLFNBQVMsZ0NBQXlCRCxLQUFLLENBQUNQLGlCQUFOLElBQTJCQSxpQkFBcEQsQ0FGWDtBQUdFLElBQUEsUUFBUSxFQUFFZ0Q7QUFIWixLQUlNeEMsSUFKTixHQUtHdUMsS0FMSCxDQURGLENBREY7QUFXRCxDQWxCTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZDLCBGcmFnbWVudCwgSFRNTFByb3BzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlLCBGaWVsZCwgdXNlRmllbGQgfSBmcm9tICdmb3JtaWsnO1xuaW1wb3J0IFJlYWN0U2VsZWN0LCB7IFN0eWxlc0NvbmZpZyB9IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgSW1hZ2VzRHJvcElucHV0LCB7IEZpbGVXaXRoU2l6ZSwgSW1hZ2VzRHJvcElucHV0UHJvcHMgfSBmcm9tICcuLi9JbWFnZXNEcm9wSW5wdXQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkVGhlbWUge1xuICBsYWJlbFN0eWxlPzogc3RyaW5nO1xuICBmaWVsZFN0eWxlPzogc3RyaW5nO1xuICBjaGVja2JveFN0eWxlPzogc3RyaW5nO1xuICBtdWx0aVNlbGVjdFN0eWxlPzogc3RyaW5nO1xuICBlcnJvclN0eWxlPzogc3RyaW5nO1xuICBpbWFnZXNEcm9wTGFiZWxTdHlsZT86IHN0cmluZztcbiAgc3VibWl0QnV0dG9uU3R5bGU/OiBzdHJpbmc7XG59XG5cbnR5cGUgRmllbGRTaXplID0gJ3hzJyB8ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCcgfCAnMnhsJyB8ICczeGwnIHwgJ2Z1bGwnIHwgJ21heCcgfCAnc2NyZWVuJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFByb3BzIGV4dGVuZHMgSFRNTFByb3BzPEhUTUxJbnB1dEVsZW1lbnQ+IHtcbiAgbmFtZTogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbiAgZmllbGRTaXplPzogRmllbGRTaXplO1xuICB0aGVtZT86IEZpZWxkVGhlbWU7XG4gIGlzU3VibWl0dGluZz86IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIFRleHRGaWVsZFByb3BzIGV4dGVuZHMgRmllbGRQcm9wcyB7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xufVxuXG5jb25zdCBmaWVsZFNpemVNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKFtcbiAgWyd4cycsICd3LTE0J10sXG4gIFsnc20nLCAndy1bNS4yNXJlbV0nXSxcbiAgWydtZCcsICd3LTM2J10sXG4gIFsnbGcnLCAndy02NCddLFxuICBbJ3hsJywgJ3ctOTYnXSxcbiAgWycyeGwnLCAndy1bMzByZW1dJ10sXG4gIFsnM3hsJywgJ3ctWzUwcmVtXSddLFxuICBbJ2Z1bGwnLCAndy1mdWxsJ10sXG4gIFsnbWF4JywgJ3ctbWF4J10sXG4gIFsnc2NyZWVuJywgJ3ctWzkwdnddJ10sXG5dKTtcblxuY29uc3QgbGFiZWxTdHlsZSA9XG4gICd0ZXh0LWdyYXktNDAwIHB4LTIgYWJzb2x1dGUgbGVmdC0wIC10b3AtMy41IHRleHQtc20gdHJhbnNpdGlvbi1hbGwgcGVlci1wbGFjZWhvbGRlci1zaG93bjp0ZXh0LWJhc2UgcGVlci1wbGFjZWhvbGRlci1zaG93bjp0ZXh0LWdyYXktNDAwIHBlZXItcGxhY2Vob2xkZXItc2hvd246dG9wLTIgcGVlci1mb2N1czotdG9wLTMuNSBwZWVyLWZvY3VzOnRleHQtcmVkLTkwMCBwZWVyLWZvY3VzOnRleHQtc20nO1xuY29uc3QgZmllbGRTdHlsZSA9XG4gICdiZy10cmFuc3BhcmVudCBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCBwZWVyIGgtMTAgYm9yZGVyLTAgYm9yZGVyLWItMiBwbGFjZWhvbGRlci10cmFuc3BhcmVudCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXJlZC05MDAgZm9jdXM6cmluZy0wJztcbmNvbnN0IGNoZWNrYm94U3R5bGUgPVxuICAnYmctdHJhbnNwYXJlbnQgYm9yZGVyLWdyYXktMzAwIHRleHQtcmVkLTkwMCB0ZXh0LXJlZC05MDAgcm91bmRlZCBib3JkZXItMiB3LTUgaC01IGZvY3VzOnJpbmctMCc7XG5jb25zdCBtdWx0aVNlbGVjdFN0eWxlID0gJyc7XG5jb25zdCBpbWFnZXNEcm9wTGFiZWxTdHlsZSA9ICd0ZXh0LWdyYXktNDAwIHRleHQtc20nO1xuY29uc3QgZXJyb3JTdHlsZSA9ICd0ZXh0LXJlZC03MDAnO1xuY29uc3Qgc3VibWl0QnV0dG9uU3R5bGUgPVxuICAnYmctcmVkLTkwMCBob3ZlcjpiZy1yZWQtODAwIHctbWluIG15LTQgcHgtMTQgcHktMiB0ZXh0LWNlbnRlciB0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHJvdW5kZWQgc2hhZG93LXhsJztcblxuY29uc3QgZGVmYXVsdFRoZW1lOiBGaWVsZFRoZW1lID0ge1xuICBsYWJlbFN0eWxlLFxuICBmaWVsZFN0eWxlLFxuICBjaGVja2JveFN0eWxlLFxuICBtdWx0aVNlbGVjdFN0eWxlLFxuICBpbWFnZXNEcm9wTGFiZWxTdHlsZSxcbiAgZXJyb3JTdHlsZSxcbiAgc3VibWl0QnV0dG9uU3R5bGUsXG59O1xuXG5leHBvcnQgY29uc3QgVGV4dEZpZWxkOiBGQzxUZXh0RmllbGRQcm9wcz4gPSAoe1xuICBuYW1lLFxuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIGZpZWxkU2l6ZSA9ICdmdWxsJyxcbiAgdGhlbWUgPSBkZWZhdWx0VGhlbWUsXG4gIC4uLnJlc3Rcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgIDxGaWVsZFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGVtZS5maWVsZFN0eWxlIHx8IGZpZWxkU3R5bGV9ICR7XG4gICAgICAgICAgICAgIGZpZWxkU2l6ZU1hcC5nZXQoZmllbGRTaXplKSB8fCAndy1tYXgnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICBpZD17bmFtZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlciB8fCAnICd9XG4gICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtsYWJlbCAmJiAoXG4gICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGVtZS5sYWJlbFN0eWxlIHx8IGxhYmVsU3R5bGV9ICR7XG4gICAgICAgICAgICAgICAgZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpIHx8ICd3LW1heCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIGh0bWxGb3I9e25hbWV9PlxuICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPEVycm9yTWVzc2FnZVxuICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgIHJlbmRlcj17bXNnID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7dGhlbWUuZXJyb3JTdHlsZSB8fCBlcnJvclN0eWxlfSAke1xuICAgICAgICAgICAgICAgICAgZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpIHx8ICd3LW1heCdcbiAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAge21zZ31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dEFyZWFQcm9wcyBleHRlbmRzIEhUTUxQcm9wczxIVE1MVGV4dEFyZWFFbGVtZW50PiB7XG4gIG5hbWU6IHN0cmluZztcbiAgZmllbGRTaXplPzogRmllbGRTaXplO1xuICB0aGVtZT86IEZpZWxkVGhlbWU7XG59XG5cbmV4cG9ydCBjb25zdCBUZXh0QXJlYUZpZWxkOiBGQzxUZXh0QXJlYVByb3BzPiA9ICh7XG4gIG5hbWUsXG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgZmllbGRTaXplID0gJ2Z1bGwnLFxuICB0aGVtZSA9IGRlZmF1bHRUaGVtZSxcbiAgLi4ucmVzdFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgPEZpZWxkXG4gICAgICAgICAgICBhcz1cInRleHRhcmVhXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7dGhlbWUuZmllbGRTdHlsZSB8fCBmaWVsZFN0eWxlfSAke1xuICAgICAgICAgICAgICBmaWVsZFNpemVNYXAuZ2V0KGZpZWxkU2l6ZSkgfHwgJ3ctbWF4J1xuICAgICAgICAgICAgfSBmb2N1czpoLTMyYH1cbiAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICBpZD17bmFtZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlciB8fCAnICd9XG4gICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtsYWJlbCAmJiAoXG4gICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGVtZS5sYWJlbFN0eWxlIHx8IGxhYmVsU3R5bGV9ICR7XG4gICAgICAgICAgICAgICAgZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpIHx8ICd3LW1heCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIGh0bWxGb3I9e25hbWV9PlxuICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPEVycm9yTWVzc2FnZVxuICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgIHJlbmRlcj17bXNnID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7dGhlbWUuZXJyb3JTdHlsZSB8fCBlcnJvclN0eWxlfSAke1xuICAgICAgICAgICAgICAgICAgZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpIHx8ICd3LW1heCdcbiAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAge21zZ31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0RmllbGRQcm9wcyBleHRlbmRzIEZpZWxkUHJvcHMge1xuICBvcHRpb25zOiB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICB9W107XG59XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RGaWVsZDogRkM8U2VsZWN0RmllbGRQcm9wcz4gPSAoe1xuICBuYW1lLFxuICBsYWJlbCxcbiAgb3B0aW9ucyxcbiAgZmllbGRTaXplID0gJ21heCcsXG4gIHRoZW1lID0gZGVmYXVsdFRoZW1lLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICA8RmllbGRcbiAgICAgICAgICAgIGFzPVwic2VsZWN0XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7dGhlbWUuZmllbGRTdHlsZSB8fCBmaWVsZFN0eWxlfSAke2ZpZWxkU2l6ZU1hcC5nZXQoZmllbGRTaXplKX1gfVxuICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgIHsuLi5yZXN0fT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5Tw6lsZWN0aW9ubmVyPC9vcHRpb24+XG4gICAgICAgICAgICB7b3B0aW9ucy5tYXAob3B0aW9uID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgICAgIGtleT17b3B0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtvcHRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgbGFiZWw9e29wdGlvbi5sYWJlbCB8fCBvcHRpb24udmFsdWV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgIHtsYWJlbCAmJiAoXG4gICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGVtZS5sYWJlbFN0eWxlIHx8IGxhYmVsU3R5bGV9ICR7ZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpfWB9XG4gICAgICAgICAgICAgIGh0bWxGb3I9e25hbWV9PlxuICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPEVycm9yTWVzc2FnZVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGVtZS5lcnJvclN0eWxlIHx8IGVycm9yU3R5bGV9ICR7ZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpfWB9XG4gICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgcmVuZGVyPXttc2cgPT4gPGRpdiBzdHlsZT17eyBjb2xvcjogJ3JlZCcgfX0+e21zZ308L2Rpdj59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxuY29uc3QgY3VzdG9tU3R5bGVzOiBTdHlsZXNDb25maWc8YW55LCB0cnVlPiA9IHtcbiAgY29udHJvbDogc3R5bGVzID0+ICh7XG4gICAgLi4uc3R5bGVzLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICBib3JkZXI6IDAsXG4gICAgYm94U2hhZG93OiAndHJhbnNwYXJlbnQnLFxuICB9KSxcbiAgaW5wdXQ6IHN0eWxlcyA9PiAoe1xuICAgIC4uLnN0eWxlcyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gIH0pLFxuICBwbGFjZWhvbGRlcjogc3R5bGVzID0+ICh7XG4gICAgLi4uc3R5bGVzLFxuICAgIGNvbG9yOiAnYmxhY2snLFxuICB9KSxcbn07XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZVNlbGVjdEZpZWxkOiBGQzxTZWxlY3RGaWVsZFByb3BzPiA9ICh7XG4gIGxhYmVsLFxuICBvcHRpb25zLFxuICBmaWVsZFNpemUgPSAnM3hsJyxcbiAgdGhlbWUgPSBkZWZhdWx0VGhlbWUsXG4gIGNoaWxkcmVuLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IFtmaWVsZCwgLCBoZWxwZXJzXSA9IHVzZUZpZWxkKHJlc3QpO1xuXG4gIGNvbnN0IHsgbmFtZSwgb25DaGFuZ2UsIC4uLm90aGVyRmllbGRQcm9wcyB9ID0gZmllbGRcbiAgY29uc3QgeyBzZXRWYWx1ZSB9ID0gaGVscGVyc1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BweS0yICR7ZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci1ncmF5LTMwMCBib3JkZXItMCBib3JkZXItYi0yIHJlbGF0aXZlXCI+XG4gICAgICAgICAgPFJlYWN0U2VsZWN0XG4gICAgICAgICAgICBzdHlsZXM9e2N1c3RvbVN0eWxlc31cbiAgICAgICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgICAgICBpc011bHRpXG4gICAgICAgICAgICBpc1NlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTw6lsZWN0aW9ubmVyXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvcHRpb24gPT4gc2V0VmFsdWUob3B0aW9uKX1cbiAgICAgICAgICAgIHsuLi5vdGhlckZpZWxkUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7bGFiZWwgJiYgKFxuICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7dGhlbWUubGFiZWxTdHlsZSB8fCBsYWJlbFN0eWxlfSAke2ZpZWxkU2l6ZU1hcC5nZXQoZmllbGRTaXplKX1gfVxuICAgICAgICAgICAgICBodG1sRm9yPXtuYW1lfT5cbiAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxFcnJvck1lc3NhZ2VcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7dGhlbWUuZXJyb3JTdHlsZSB8fCBlcnJvclN0eWxlfSAke2ZpZWxkU2l6ZU1hcC5nZXQoZmllbGRTaXplKX1gfVxuICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgIHJlbmRlcj17bXNnID0+IDxkaXYgc3R5bGU9e3sgY29sb3I6ICdyZWQnIH19Pnttc2d9PC9kaXY+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBOdW1iZXJGaWVsZDogRkM8RmllbGRQcm9wcz4gPSAoe1xuICBuYW1lLFxuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHN0ZXAgPSAxLFxuICBmaWVsZFNpemUgPSAnbWQnLFxuICB0aGVtZSA9IGRlZmF1bHRUaGVtZSxcbiAgLi4ucmVzdFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgPEZpZWxkXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake3RoZW1lLmZpZWxkU3R5bGUgfHwgZmllbGRTdHlsZX0gJHtcbiAgICAgICAgICAgICAgZmllbGRTaXplTWFwLmdldChmaWVsZFNpemUpIHx8ICd3LW1heCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgaWQ9e25hbWV9XG4gICAgICAgICAgICBzdGVwPXtzdGVwfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyIHx8ICcgJ31cbiAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge2xhYmVsICYmIChcbiAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3RoZW1lLmxhYmVsU3R5bGUgfHwgbGFiZWxTdHlsZX0gJHtcbiAgICAgICAgICAgICAgICBmaWVsZFNpemVNYXAuZ2V0KGZpZWxkU2l6ZSkgfHwgJ3ctbWF4J1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgaHRtbEZvcj17bmFtZX0+XG4gICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8RXJyb3JNZXNzYWdlXG4gICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgcmVuZGVyPXttc2cgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGVtZS5lcnJvclN0eWxlIHx8IGVycm9yU3R5bGV9ICR7XG4gICAgICAgICAgICAgICAgICBmaWVsZFNpemVNYXAuZ2V0KGZpZWxkU2l6ZSkgfHwgJ3ctbWF4J1xuICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICB7bXNnfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IENoZWNrYm94RmllbGQ6IEZDPEZpZWxkUHJvcHM+ID0gKHtcbiAgbmFtZSxcbiAgbGFiZWwsXG4gIGZpZWxkU2l6ZSA9ICdtZCcsXG4gIHRoZW1lID0gZGVmYXVsdFRoZW1lLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0yXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSBwLTMgZmxleCBqdXN0aWZ5LWNlbnRlciAke2ZpZWxkU2l6ZU1hcC5nZXQoZmllbGRTaXplKSB8fCAndy1tYXgnfWB9PlxuICAgICAgICAgIDxGaWVsZFxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGVtZS5jaGVja2JveFN0eWxlIHx8IGNoZWNrYm94U3R5bGV9XG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgIGlkPXtuYW1lfVxuICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7bGFiZWwgJiYgKFxuICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7dGhlbWUubGFiZWxTdHlsZSB8fCBsYWJlbFN0eWxlfSB0ZXh0LWNlbnRlciB3LWZ1bGxgfVxuICAgICAgICAgICAgICBodG1sRm9yPXtuYW1lfT5cbiAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxFcnJvck1lc3NhZ2VcbiAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICByZW5kZXI9e21zZyA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3RoZW1lLmVycm9yU3R5bGUgfHwgZXJyb3JTdHlsZX0gJHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkU2l6ZU1hcC5nZXQoZmllbGRTaXplKSB8fCAndy1tYXgnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgIHttc2d9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuZXhwb3J0IGludGVyZmFjZSBJbWFnZXNEcm9wRmllbGRQcm9wcyBleHRlbmRzIEZpZWxkUHJvcHMsIE9taXQ8SW1hZ2VzRHJvcElucHV0UHJvcHMsICdnZXRGaWxlcyc+IHtcbiAgbmFtZTogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBJbWFnZXNEcm9wRmllbGQ6IEZDPEltYWdlc0Ryb3BGaWVsZFByb3BzPiA9ICh7XG4gIG5hbWUsXG4gIGxhYmVsID0gbmFtZSxcbiAgZmllbGRTaXplID0gJ21heCcsXG4gIHRoZW1lID0gZGVmYXVsdFRoZW1lLFxuICByZXF1aXJlZCxcbiAgbXVsdGlwbGUsXG4gIGVycm9yTWVzc2FnZSA9ICdZb3UgbmVlZCB0byBzZWxlY3QgYXQgbGVhc3Qgb25lIGZpbGUnLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRlID0gKHZhbHVlOiBGaWxlV2l0aFNpemUgfCBGaWxlV2l0aFNpemVbXSkgPT5cbiAgICByZXF1aXJlZCAmJlxuICAgICgoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB8fCAoIUFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlID09PSB1bmRlZmluZWQpKVxuICAgICAgPyBlcnJvck1lc3NhZ2VcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgWyAsICwgaGVscGVyc10gPSB1c2VGaWVsZCh7IG5hbWUsIHZhbGlkYXRlLCBtdWx0aXBsZSB9KTtcblxuICBjb25zdCB7IHNldFZhbHVlIH0gPSBoZWxwZXJzO1xuICBjb25zdCBnZXRGaWxlcyA9IChmaWxlczogRmlsZVdpdGhTaXplW10pID0+IHtcbiAgICBtdWx0aXBsZSA/IHNldFZhbHVlKGZpbGVzKSA6IHNldFZhbHVlKGZpbGVzWzBdKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBmbGV4LXJvdyBqdXN0aWZ5LXN0YXJ0IGJvcmRlci0yIGJvcmRlci1ncmF5LTMwMCBweC0yIHB5LTRcIj5cbiAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC05MDAgZm9udC1ibGFjayB0ZXh0LWxnIHB4LTJcIj57bGFiZWx9PC9sZWdlbmQ+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcHgtMiAke2ZpZWxkU2l6ZU1hcC5nZXQoZmllbGRTaXplKSB8fCAndy1tYXgnfWB9PlxuICAgICAgICAgIDxJbWFnZXNEcm9wSW5wdXQgbmFtZT17bmFtZX0gaWQ9e25hbWV9IGdldEZpbGVzPXtnZXRGaWxlc30gbXVsdGlwbGU9e211bHRpcGxlfSB7Li4ucmVzdH0gLz5cbiAgICAgICAgICA8RXJyb3JNZXNzYWdlXG4gICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgcmVuZGVyPXttc2cgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGVtZS5lcnJvclN0eWxlIHx8IGVycm9yU3R5bGV9ICR7XG4gICAgICAgICAgICAgICAgICBmaWVsZFNpemVNYXAuZ2V0KGZpZWxkU2l6ZSkgfHwgJ3ctbWF4J1xuICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICB7bXNnfVxuICAgICAgICAgICAgICAgIDxidXR0b24gYXV0b0ZvY3VzPXt0cnVlfT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxuaW50ZXJmYWNlIFN1Ym1pdEJ1dHRvblByb3BzIGV4dGVuZHMgSFRNTFByb3BzPEhUTUxCdXR0b25FbGVtZW50PiB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHRoZW1lPzogRmllbGRUaGVtZTtcbiAgaXNTdWJtaXR0aW5nPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IFN1Ym1pdEJ1dHRvbjogRkM8U3VibWl0QnV0dG9uUHJvcHM+ID0gKHtcbiAgdGl0bGUsXG4gIHRoZW1lID0gZGVmYXVsdFRoZW1lLFxuICBpc1N1Ym1pdHRpbmcgPSBmYWxzZSxcbiAgdHlwZSxcbiAgLi4ucmVzdFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgIGNsYXNzTmFtZT17YGRpc2FibGVkOm9wYWNpdHktNzAgJHt0aGVtZS5zdWJtaXRCdXR0b25TdHlsZSB8fCBzdWJtaXRCdXR0b25TdHlsZX1gfVxuICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxuICAgICAgICB7Li4ucmVzdH0+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuIl19