"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _FormElements = require("../FormElements");

var yup = _interopRequireWildcard(require("yup"));

var _formik = require("formik");

var _set = _interopRequireDefault(require("lodash/set"));

var _get = _interopRequireDefault(require("lodash/get"));

var _FormElements2 = require("../FormElements/FormElements");

var _stringHelpers = require("../../helpers/string-helpers");

var _excluded = ["fieldSetStyle", "legendStyle"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultFieldSetStyle = 'flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3';
var defaultLegendStyle = 'text-red-900 font-black text-lg px-2';

var FormComponent = function FormComponent(_ref) {
  var label = _ref.label,
      formSchema = _ref.formSchema,
      onSubmit = _ref.onSubmit,
      relationships = _ref.relationships,
      _ref$fileFields = _ref.fileFields,
      fileFields = _ref$fileFields === void 0 ? [] : _ref$fileFields,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {} : _ref$theme,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '' : _ref$prefix;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      formData = _useState2[0],
      setFormData = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      setValidationSchema = _useState4[1];

  var listFields = [];

  var _theme = theme,
      fieldSetStyle = _theme.fieldSetStyle,
      legendStyle = _theme.legendStyle,
      otherThemeFields = _objectWithoutProperties(_theme, _excluded);

  theme = _objectSpread({
    fieldSetStyle: fieldSetStyle || defaultFieldSetStyle,
    legendStyle: legendStyle || defaultLegendStyle
  }, otherThemeFields);
  (0, _react.useEffect)(function () {
    var getFormFromSchema = function getFormFromSchema(formSchema) {
      var _formData = {};
      var _validationSchema = {};

      for (var _i2 = 0, _Object$keys = Object.keys(formSchema); _i2 < _Object$keys.length; _i2++) {
        var key = _Object$keys[_i2];

        switch (formSchema[key].type) {
          case 'text':
          case 'textarea':
            _formData[key] = formSchema[key].defaultValue || formSchema[key].value || '';
            _validationSchema[key] = yup.string();
            break;

          case 'email':
            _formData[key] = formSchema[key].defaultValue || formSchema[key].value || '';
            _validationSchema[key] = yup.string().email();
            break;

          case 'select':
          case 'list':
            _formData[key] = formSchema[key].defaultValue || formSchema[key].value || undefined;
            var selectFieldProps = formSchema[key];

            if (selectFieldProps.options) {
              _validationSchema[key] = yup.string().oneOf(selectFieldProps.options.map(function (option) {
                return option.value;
              }));
            } else {
              _validationSchema[key] = yup.string();
            }

            break;

          case 'number':
            _formData[key] = formSchema[key].defaultValue || formSchema[key].value || undefined;
            _validationSchema[key] = yup.number();
            break;

          case 'checkbox':
            _formData[key] = !!formSchema[key].defaultValue || !!formSchema[key].value || undefined;
            _validationSchema[key] = yup.boolean();
            break;

          case 'relationship':
            _formData[key] = !!formSchema[key].defaultValue || !!formSchema[key].value || '';
            _validationSchema[key] = yup.string();
            break;

          case 'file':
            _formData[key] = [];
            _validationSchema[key] = yup.array();
            break;

          case undefined:
            var _getFormFromSchema = getFormFromSchema(formSchema[key]),
                formDataInit = _getFormFromSchema.formDataInit,
                validationSchemaInit = _getFormFromSchema.validationSchemaInit;

            _formData[key] = formDataInit;
            _validationSchema[key] = validationSchemaInit;
            break;

          default:
            break;
        }

        if (formSchema[key].required) {
          _validationSchema[key] = _validationSchema[key].required('Required');
        }
      }

      return {
        formDataInit: _formData,
        validationSchemaInit: _validationSchema
      };
    };

    var initForm = function initForm(formSchema) {
      var _getFormFromSchema2 = getFormFromSchema(formSchema),
          formDataInit = _getFormFromSchema2.formDataInit,
          validationSchemaInit = _getFormFromSchema2.validationSchemaInit;

      setFormData(formDataInit);
      setValidationSchema(validationSchemaInit);
    };

    initForm(formSchema);
  }, [formSchema]);

  var getFormElement = function getFormElement(elementName, elementSchema, elementPrefix, elementTheme) {
    var props = _objectSpread(_objectSpread({}, elementSchema), {}, {
      name: (elementPrefix ? elementPrefix + '.' : '') + elementName,
      options: (elementSchema === null || elementSchema === void 0 ? void 0 : elementSchema.options) || undefined,
      theme: elementTheme || _objectSpread({}, otherThemeFields)
    });

    switch (elementSchema.type) {
      case 'text':
      case 'email':
        return /*#__PURE__*/React.createElement(_FormElements.TextField, props);

      case 'textarea':
        return /*#__PURE__*/React.createElement(_FormElements.TextAreaField, props);

      case 'select':
        return /*#__PURE__*/React.createElement(_FormElements.SelectField, props);

      case 'list':
        listFields.push(props.name);
        return /*#__PURE__*/React.createElement(_FormElements.MultipleSelectField, props);

      case 'number':
        return /*#__PURE__*/React.createElement(_FormElements.NumberField, props);

      case 'checkbox':
        return /*#__PURE__*/React.createElement(_FormElements.CheckboxField, props);

      case 'relationship':
        if (relationships) {
          var typedProps = props;
          var relation = relationships.find(function (relationship) {
            return relationship.name = typedProps.name;
          });
          typedProps.options = (relation === null || relation === void 0 ? void 0 : relation.options) || [];
          typedProps.label = (relation === null || relation === void 0 ? void 0 : relation.label) || props.name;
          return /*#__PURE__*/React.createElement("fieldset", {
            className: "flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4"
          }, /*#__PURE__*/React.createElement("legend", {
            className: "text-red-900 font-black text-lg px-2"
          }, (0, _stringHelpers.capitalize)(typedProps.label)), /*#__PURE__*/React.createElement(_FormElements.SelectField, typedProps));
        }

        break;

      case 'file':
        var fileField = fileFields.find(function (field) {
          return field.name === elementName;
        });
        if (fileField) return /*#__PURE__*/React.createElement(_FormElements2.ImagesDropField, _extends({}, props, {
          name: fileField.name,
          fileType: fileField.type,
          text: fileField.text || 'Sélectionner des fichiers'
        }));
        break;

      case undefined:
        var schema = elementSchema;
        return /*#__PURE__*/React.createElement("fieldset", {
          className: "flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3"
        }, /*#__PURE__*/React.createElement("legend", {
          className: "text-red-900 font-black text-lg px-2"
        }, (0, _stringHelpers.capitalize)(props.name)), Object.keys(schema).map(function (key) {
          return /*#__PURE__*/React.createElement(_react.Fragment, {
            key: key
          }, getFormElement(key, schema[key], elementPrefix = props.name));
        }));
    }
  };

  var fixMultipleSelectValues = function fixMultipleSelectValues(values) {
    var fixedValues = _objectSpread({}, values);

    listFields.forEach(function (key) {
      var options = (0, _get.default)(fixedValues, key);
      if (options) (0, _set.default)(fixedValues, key, options.map(function (option) {
        return option.value;
      }));
    });
    return fixedValues;
  };

  var defaultOnSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(values, formikHelpers) {
      var fixedValues;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              fixedValues = fixMultipleSelectValues(values);
              fileFields.forEach( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileField) {
                  var files;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          files = Array.isArray(values[fileField.name]) ? values[fileField.name] : [values[fileField.name]]; // Make sure to revoke the data uris to avoid memory leaks

                          files.forEach(function (file) {
                            return file.preview ? URL.revokeObjectURL(file.preview) : null;
                          });

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }());

              if (!onSubmit) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return onSubmit(fixedValues, formikHelpers);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function defaultOnSubmit(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/React.createElement(_react.Fragment, null, formData ? /*#__PURE__*/React.createElement(_formik.Formik, {
    enableReinitialize: true,
    initialValues: formData,
    onSubmit: defaultOnSubmit
  }, function (_ref4) {
    var isSubmitting = _ref4.isSubmitting;
    return /*#__PURE__*/React.createElement(_formik.Form, {
      className: "needs-validation"
    }, /*#__PURE__*/React.createElement("fieldset", {
      className: theme.fieldSetStyle
    }, /*#__PURE__*/React.createElement("legend", {
      className: theme.legendStyle
    }, label), Object.keys(formData).map(function (key) {
      return /*#__PURE__*/React.createElement("div", {
        key: key
      }, getFormElement(key, formSchema[key], prefix, theme));
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row gap-4 items-center"
    }, /*#__PURE__*/React.createElement(_FormElements.SubmitButton, {
      title: "Cr\xE9er",
      theme: theme,
      isSubmitting: isSubmitting
    }), isSubmitting ? /*#__PURE__*/React.createElement("p", {
      className: "pt-1"
    }, "Cr\xE9ation en cours...") : null));
  }) : null);
};

var _default = FormComponent;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9Gb3JtQ29tcG9uZW50L0Zvcm1Db21wb25lbnQudHN4Il0sIm5hbWVzIjpbImRlZmF1bHRGaWVsZFNldFN0eWxlIiwiZGVmYXVsdExlZ2VuZFN0eWxlIiwiRm9ybUNvbXBvbmVudCIsImxhYmVsIiwiZm9ybVNjaGVtYSIsIm9uU3VibWl0IiwicmVsYXRpb25zaGlwcyIsImZpbGVGaWVsZHMiLCJ0aGVtZSIsInByZWZpeCIsImZvcm1EYXRhIiwic2V0Rm9ybURhdGEiLCJzZXRWYWxpZGF0aW9uU2NoZW1hIiwibGlzdEZpZWxkcyIsImZpZWxkU2V0U3R5bGUiLCJsZWdlbmRTdHlsZSIsIm90aGVyVGhlbWVGaWVsZHMiLCJnZXRGb3JtRnJvbVNjaGVtYSIsIl9mb3JtRGF0YSIsIl92YWxpZGF0aW9uU2NoZW1hIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJ2YWx1ZSIsInl1cCIsInN0cmluZyIsImVtYWlsIiwidW5kZWZpbmVkIiwic2VsZWN0RmllbGRQcm9wcyIsIm9wdGlvbnMiLCJvbmVPZiIsIm1hcCIsIm9wdGlvbiIsIm51bWJlciIsImJvb2xlYW4iLCJhcnJheSIsImZvcm1EYXRhSW5pdCIsInZhbGlkYXRpb25TY2hlbWFJbml0IiwicmVxdWlyZWQiLCJpbml0Rm9ybSIsImdldEZvcm1FbGVtZW50IiwiZWxlbWVudE5hbWUiLCJlbGVtZW50U2NoZW1hIiwiZWxlbWVudFByZWZpeCIsImVsZW1lbnRUaGVtZSIsInByb3BzIiwibmFtZSIsInB1c2giLCJ0eXBlZFByb3BzIiwicmVsYXRpb24iLCJmaW5kIiwicmVsYXRpb25zaGlwIiwiZmlsZUZpZWxkIiwiZmllbGQiLCJ0ZXh0Iiwic2NoZW1hIiwiZml4TXVsdGlwbGVTZWxlY3RWYWx1ZXMiLCJ2YWx1ZXMiLCJmaXhlZFZhbHVlcyIsImZvckVhY2giLCJkZWZhdWx0T25TdWJtaXQiLCJmb3JtaWtIZWxwZXJzIiwiZmlsZXMiLCJBcnJheSIsImlzQXJyYXkiLCJmaWxlIiwicHJldmlldyIsIlVSTCIsInJldm9rZU9iamVjdFVSTCIsImlzU3VibWl0dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBY0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBLElBQU1BLG9CQUFvQixHQUN4QiwwRUFERjtBQUVBLElBQU1DLGtCQUFrQixHQUFHLHNDQUEzQjs7QUFFQSxJQUFNQyxhQUFxQyxHQUFHLFNBQXhDQSxhQUF3QyxPQVF4QztBQUFBLE1BUEpDLEtBT0ksUUFQSkEsS0FPSTtBQUFBLE1BTkpDLFVBTUksUUFOSkEsVUFNSTtBQUFBLE1BTEpDLFFBS0ksUUFMSkEsUUFLSTtBQUFBLE1BSkpDLGFBSUksUUFKSkEsYUFJSTtBQUFBLDZCQUhKQyxVQUdJO0FBQUEsTUFISkEsVUFHSSxnQ0FIUyxFQUdUO0FBQUEsd0JBRkpDLEtBRUk7QUFBQSxNQUZKQSxLQUVJLDJCQUZJLEVBRUo7QUFBQSx5QkFESkMsTUFDSTtBQUFBLE1BREpBLE1BQ0ksNEJBREssRUFDTDs7QUFDSixrQkFBZ0Msc0JBQWhDO0FBQUE7QUFBQSxNQUFPQyxRQUFQO0FBQUEsTUFBaUJDLFdBQWpCOztBQUNBLG1CQUFnQyxzQkFBaEM7QUFBQTtBQUFBLE1BQVNDLG1CQUFUOztBQUVBLE1BQU1DLFVBQW9CLEdBQUcsRUFBN0I7O0FBRUEsZUFBNERMLEtBQTVEO0FBQUEsTUFBUU0sYUFBUixVQUFRQSxhQUFSO0FBQUEsTUFBdUJDLFdBQXZCLFVBQXVCQSxXQUF2QjtBQUFBLE1BQXVDQyxnQkFBdkM7O0FBRUFSLEVBQUFBLEtBQUs7QUFDSE0sSUFBQUEsYUFBYSxFQUFFQSxhQUFhLElBQUlkLG9CQUQ3QjtBQUVIZSxJQUFBQSxXQUFXLEVBQUVBLFdBQVcsSUFBSWQ7QUFGekIsS0FHQWUsZ0JBSEEsQ0FBTDtBQU1BLHdCQUFVLFlBQU07QUFDZCxRQUFNQyxp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QVMsRUFBRS9ELEtBQUssQ0FBQ007QUFBM0Isb0JBQ0U7QUFBUSxNQUFBLFNBQVMsRUFBRU4sS0FBSyxDQUFDTztBQUF6QixPQUF1Q1osS0FBdkMsQ0FERixFQUVHaUIsTUFBTSxDQUFDQyxJQUFQLENBQVlYLFFBQVosRUFBdUJ1QixHQUF2QixDQUEyQixVQUFBWCxHQUFHO0FBQUEsMEJBQzdCO0FBQUssUUFBQSxHQUFHLEVBQUVBO0FBQVYsU0FBZ0JvQixjQUFjLENBQUNwQixHQUFELEVBQU1sQixVQUFVLENBQUNrQixHQUFELENBQWhCLEVBQXVCYixNQUF2QixFQUErQkQsS0FBL0IsQ0FBOUIsQ0FENkI7QUFBQSxLQUE5QixDQUZILENBREYsZUFPRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsb0JBQ0Usb0JBQUMsMEJBQUQ7QUFBYyxNQUFBLEtBQUssRUFBQyxVQUFwQjtBQUE0QixNQUFBLEtBQUssRUFBRUEsS0FBbkM7QUFBMEMsTUFBQSxZQUFZLEVBQUUrRDtBQUF4RCxNQURGLEVBRUdBLFlBQVksZ0JBQUc7QUFBRyxNQUFBLFNBQVMsRUFBQztBQUFiLGlDQUFILEdBQWtELElBRmpFLENBUEYsQ0FEQTtBQWFBLEdBZkosQ0FETyxHQWtCTCxJQW5CTixDQURGO0FBdUJELENBL09EOztlQWlQZXJFLGEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQywgRnJhZ21lbnQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBGaWVsZFByb3BzLFxuICBUZXh0RmllbGRQcm9wcyxcbiAgVGV4dEFyZWFQcm9wcyxcbiAgU2VsZWN0RmllbGRQcm9wcyxcbiAgRmllbGRUaGVtZSxcbiAgVGV4dEZpZWxkLFxuICBUZXh0QXJlYUZpZWxkLFxuICBDaGVja2JveEZpZWxkLFxuICBOdW1iZXJGaWVsZCxcbiAgU2VsZWN0RmllbGQsXG4gIE11bHRpcGxlU2VsZWN0RmllbGQsXG4gIFN1Ym1pdEJ1dHRvbixcbn0gZnJvbSAnLi4vRm9ybUVsZW1lbnRzJztcbmltcG9ydCAqIGFzIHl1cCBmcm9tICd5dXAnO1xuaW1wb3J0IHsgRm9ybWlrLCBGb3JtLCBGb3JtaWtIZWxwZXJzIH0gZnJvbSAnZm9ybWlrJztcbmltcG9ydCBsb2FkYXNoU2V0IGZyb20gJ2xvZGFzaC9zZXQnO1xuaW1wb3J0IGxvYWRhc2hHZXQgZnJvbSAnbG9kYXNoL2dldCc7XG5pbXBvcnQgeyBGaWxlV2l0aFNpemUgfSBmcm9tICcuLi9JbWFnZXNEcm9wSW5wdXQnO1xuaW1wb3J0IHsgSW1hZ2VzRHJvcEZpZWxkLCBJbWFnZXNEcm9wRmllbGRQcm9wcyB9IGZyb20gJy4uL0Zvcm1FbGVtZW50cy9Gb3JtRWxlbWVudHMnO1xuaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc3RyaW5nLWhlbHBlcnMnO1xuXG4vLyBpbXBvcnQgeyBmaWVsZExhYmVsIH0gZnJvbSAnLi4vLi4vLi4vaGVscGVycy9sYWJlbC1oZWxwZXJzJztcblxuZXhwb3J0IHR5cGUgRWxlbWVudFByb3BzID0gVGV4dEZpZWxkUHJvcHMgfCBUZXh0QXJlYVByb3BzIHwgU2VsZWN0RmllbGRQcm9wcyB8IEZpZWxkUHJvcHM7XG5cbmludGVyZmFjZSBPcHRpb24ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG50eXBlIFZhbHVlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IHN0cmluZ1tdIHwgT3B0aW9uW10gfCBGaWxlV2l0aFNpemUgfCBGaWxlV2l0aFNpemVbXTtcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtU2NoZW1hIHtcbiAgW2s6IHN0cmluZ106IEVsZW1lbnRQcm9wcyB8IEZvcm1TY2hlbWE7XG59XG5cbmludGVyZmFjZSBWYWxpZGF0aW9uU2NoZW1hIHtcbiAgW2s6IHN0cmluZ106IHl1cC5BbnlTY2hlbWEgfCBWYWxpZGF0aW9uU2NoZW1hO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1WYWx1ZXMge1xuICBbazogc3RyaW5nXTogVmFsdWUgfCBGb3JtVmFsdWVzIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGF0aW9uc2hpcCB7XG4gIG5hbWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgb3B0aW9uczoge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgfVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVGaWVsZCB7XG4gIG5hbWU6IHN0cmluZztcbiAgdGV4dD86IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1UaGVtZSBleHRlbmRzIEZpZWxkVGhlbWUge1xuICBmaWVsZFNldFN0eWxlPzogc3RyaW5nO1xuICBsZWdlbmRTdHlsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtQ29tcG9uZW50UHJvcHMge1xuICBsYWJlbDogc3RyaW5nO1xuICBmb3JtU2NoZW1hOiBGb3JtU2NoZW1hO1xuICBvblN1Ym1pdD86ICh2YWx1ZXM6IEZvcm1WYWx1ZXMsIGZvcm1pa0hlbHBlcnM6IEZvcm1pa0hlbHBlcnM8Rm9ybVZhbHVlcz4pID0+IHZvaWQ7XG4gIHJlbGF0aW9uc2hpcHM/OiBSZWxhdGlvbnNoaXBbXTtcbiAgZmlsZUZpZWxkcz86IEZpbGVGaWVsZFtdO1xuICB0aGVtZT86IEZvcm1UaGVtZTtcbiAgcHJlZml4Pzogc3RyaW5nXG59XG5cbmNvbnN0IGRlZmF1bHRGaWVsZFNldFN0eWxlID1cbiAgJ2ZsZXggZmxleC13cmFwIGZsZXgtcm93IGp1c3RpZnktc3RhcnQgYm9yZGVyLTIgYm9yZGVyLWdyYXktMzAwIHAtNCBnYXAtMyc7XG5jb25zdCBkZWZhdWx0TGVnZW5kU3R5bGUgPSAndGV4dC1yZWQtOTAwIGZvbnQtYmxhY2sgdGV4dC1sZyBweC0yJztcblxuY29uc3QgRm9ybUNvbXBvbmVudDogRkM8Rm9ybUNvbXBvbmVudFByb3BzPiA9ICh7XG4gIGxhYmVsLFxuICBmb3JtU2NoZW1hLFxuICBvblN1Ym1pdCxcbiAgcmVsYXRpb25zaGlwcyxcbiAgZmlsZUZpZWxkcyA9IFtdLFxuICB0aGVtZSA9IHt9LFxuICBwcmVmaXggPSAnJ1xufSkgPT4ge1xuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlPEZvcm1WYWx1ZXMgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFssIHNldFZhbGlkYXRpb25TY2hlbWFdID0gdXNlU3RhdGU8VmFsaWRhdGlvblNjaGVtYSB8IHVuZGVmaW5lZD4oKTtcblxuICBjb25zdCBsaXN0RmllbGRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0IHsgZmllbGRTZXRTdHlsZSwgbGVnZW5kU3R5bGUsIC4uLm90aGVyVGhlbWVGaWVsZHMgfSA9IHRoZW1lO1xuXG4gIHRoZW1lID0ge1xuICAgIGZpZWxkU2V0U3R5bGU6IGZpZWxkU2V0U3R5bGUgfHwgZGVmYXVsdEZpZWxkU2V0U3R5bGUsXG4gICAgbGVnZW5kU3R5bGU6IGxlZ2VuZFN0eWxlIHx8IGRlZmF1bHRMZWdlbmRTdHlsZSxcbiAgICAuLi5vdGhlclRoZW1lRmllbGRzLFxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZ2V0Rm9ybUZyb21TY2hlbWEgPSAoZm9ybVNjaGVtYTogRm9ybVNjaGVtYSkgPT4ge1xuICAgICAgY29uc3QgX2Zvcm1EYXRhOiBGb3JtVmFsdWVzID0ge307XG4gICAgICBjb25zdCBfdmFsaWRhdGlvblNjaGVtYTogVmFsaWRhdGlvblNjaGVtYSA9IHt9O1xuXG4gICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybVNjaGVtYSkpIHtcbiAgICAgICAgc3dpdGNoIChmb3JtU2NoZW1hW2tleV0udHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgICAgIF9mb3JtRGF0YVtrZXldID1cbiAgICAgICAgICAgICAgKGZvcm1TY2hlbWFba2V5XS5kZWZhdWx0VmFsdWUgYXMgc3RyaW5nKSB8fCAoZm9ybVNjaGVtYVtrZXldLnZhbHVlIGFzIHN0cmluZykgfHwgJyc7XG4gICAgICAgICAgICBfdmFsaWRhdGlvblNjaGVtYVtrZXldID0geXVwLnN0cmluZygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgX2Zvcm1EYXRhW2tleV0gPVxuICAgICAgICAgICAgICAoZm9ybVNjaGVtYVtrZXldLmRlZmF1bHRWYWx1ZSBhcyBzdHJpbmcpIHx8IChmb3JtU2NoZW1hW2tleV0udmFsdWUgYXMgc3RyaW5nKSB8fCAnJztcbiAgICAgICAgICAgIF92YWxpZGF0aW9uU2NoZW1hW2tleV0gPSB5dXAuc3RyaW5nKCkuZW1haWwoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgY2FzZSAnbGlzdCc6XG4gICAgICAgICAgICBfZm9ybURhdGFba2V5XSA9XG4gICAgICAgICAgICAgIChmb3JtU2NoZW1hW2tleV0uZGVmYXVsdFZhbHVlIGFzIHN0cmluZykgfHxcbiAgICAgICAgICAgICAgKGZvcm1TY2hlbWFba2V5XS52YWx1ZSBhcyBzdHJpbmcpIHx8XG4gICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdEZpZWxkUHJvcHMgPSBmb3JtU2NoZW1hW2tleV0gYXMgU2VsZWN0RmllbGRQcm9wcztcbiAgICAgICAgICAgIGlmIChzZWxlY3RGaWVsZFByb3BzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgX3ZhbGlkYXRpb25TY2hlbWFba2V5XSA9IHl1cFxuICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5vbmVPZihzZWxlY3RGaWVsZFByb3BzLm9wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24udmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF92YWxpZGF0aW9uU2NoZW1hW2tleV0gPSB5dXAuc3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgX2Zvcm1EYXRhW2tleV0gPVxuICAgICAgICAgICAgICAoZm9ybVNjaGVtYVtrZXldLmRlZmF1bHRWYWx1ZSBhcyBudW1iZXIpIHx8XG4gICAgICAgICAgICAgIChmb3JtU2NoZW1hW2tleV0udmFsdWUgYXMgbnVtYmVyKSB8fFxuICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICBfdmFsaWRhdGlvblNjaGVtYVtrZXldID0geXVwLm51bWJlcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgX2Zvcm1EYXRhW2tleV0gPSAhIWZvcm1TY2hlbWFba2V5XS5kZWZhdWx0VmFsdWUgfHwgISFmb3JtU2NoZW1hW2tleV0udmFsdWUgfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgX3ZhbGlkYXRpb25TY2hlbWFba2V5XSA9IHl1cC5ib29sZWFuKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyZWxhdGlvbnNoaXAnOlxuICAgICAgICAgICAgX2Zvcm1EYXRhW2tleV0gPSAhIWZvcm1TY2hlbWFba2V5XS5kZWZhdWx0VmFsdWUgfHwgISFmb3JtU2NoZW1hW2tleV0udmFsdWUgfHwgJyc7XG4gICAgICAgICAgICBfdmFsaWRhdGlvblNjaGVtYVtrZXldID0geXVwLnN0cmluZygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICBfZm9ybURhdGFba2V5XSA9IFtdIGFzIEZpbGVXaXRoU2l6ZVtdO1xuICAgICAgICAgICAgX3ZhbGlkYXRpb25TY2hlbWFba2V5XSA9IHl1cC5hcnJheSgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgIGNvbnN0IHsgZm9ybURhdGFJbml0LCB2YWxpZGF0aW9uU2NoZW1hSW5pdCB9ID0gZ2V0Rm9ybUZyb21TY2hlbWEoXG4gICAgICAgICAgICAgIGZvcm1TY2hlbWFba2V5XSBhcyBGb3JtU2NoZW1hXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgX2Zvcm1EYXRhW2tleV0gPSBmb3JtRGF0YUluaXQ7XG4gICAgICAgICAgICBfdmFsaWRhdGlvblNjaGVtYVtrZXldID0gdmFsaWRhdGlvblNjaGVtYUluaXQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb3JtU2NoZW1hW2tleV0ucmVxdWlyZWQpIHtcbiAgICAgICAgICBfdmFsaWRhdGlvblNjaGVtYVtrZXldID0gKF92YWxpZGF0aW9uU2NoZW1hW2tleV0gYXMgeXVwLkFueVNjaGVtYSkucmVxdWlyZWQoJ1JlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybURhdGFJbml0OiBfZm9ybURhdGEsXG4gICAgICAgIHZhbGlkYXRpb25TY2hlbWFJbml0OiBfdmFsaWRhdGlvblNjaGVtYSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGluaXRGb3JtID0gKGZvcm1TY2hlbWE6IEZvcm1TY2hlbWEpID0+IHtcbiAgICAgIGNvbnN0IHsgZm9ybURhdGFJbml0LCB2YWxpZGF0aW9uU2NoZW1hSW5pdCB9ID0gZ2V0Rm9ybUZyb21TY2hlbWEoZm9ybVNjaGVtYSk7XG4gICAgICBzZXRGb3JtRGF0YShmb3JtRGF0YUluaXQpO1xuICAgICAgc2V0VmFsaWRhdGlvblNjaGVtYSh2YWxpZGF0aW9uU2NoZW1hSW5pdCk7XG4gICAgfTtcblxuICAgIGluaXRGb3JtKGZvcm1TY2hlbWEpO1xuICB9LCBbZm9ybVNjaGVtYV0pO1xuXG4gIGNvbnN0IGdldEZvcm1FbGVtZW50ID0gKFxuICAgIGVsZW1lbnROYW1lOiBzdHJpbmcsXG4gICAgZWxlbWVudFNjaGVtYTogRWxlbWVudFByb3BzIHwgRm9ybVNjaGVtYSxcbiAgICBlbGVtZW50UHJlZml4Pzogc3RyaW5nLFxuICAgIGVsZW1lbnRUaGVtZT86IEZvcm1UaGVtZVxuICApID0+IHtcbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIC4uLmVsZW1lbnRTY2hlbWEsXG4gICAgICBuYW1lOiAoZWxlbWVudFByZWZpeCA/IGVsZW1lbnRQcmVmaXggKyAnLicgOiAnJykgKyBlbGVtZW50TmFtZSxcbiAgICAgIG9wdGlvbnM6IChlbGVtZW50U2NoZW1hIGFzIFNlbGVjdEZpZWxkUHJvcHMpPy5vcHRpb25zIHx8IHVuZGVmaW5lZCxcbiAgICAgIHRoZW1lOiBlbGVtZW50VGhlbWUgfHwgeyAuLi5vdGhlclRoZW1lRmllbGRzIH1cbiAgICB9O1xuXG4gICAgc3dpdGNoIChlbGVtZW50U2NoZW1hLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICByZXR1cm4gPFRleHRGaWVsZCB7Li4uKHByb3BzIGFzIFRleHRGaWVsZFByb3BzKX0gLz47XG5cbiAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgcmV0dXJuIDxUZXh0QXJlYUZpZWxkIHsuLi4ocHJvcHMgYXMgVGV4dEFyZWFQcm9wcyl9IC8+O1xuXG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gPFNlbGVjdEZpZWxkIHsuLi4ocHJvcHMgYXMgU2VsZWN0RmllbGRQcm9wcyl9IC8+O1xuXG4gICAgICBjYXNlICdsaXN0JzpcbiAgICAgICAgbGlzdEZpZWxkcy5wdXNoKHByb3BzLm5hbWUpO1xuICAgICAgICByZXR1cm4gPE11bHRpcGxlU2VsZWN0RmllbGQgey4uLihwcm9wcyBhcyBTZWxlY3RGaWVsZFByb3BzKX0gLz47XG5cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiA8TnVtYmVyRmllbGQgey4uLihwcm9wcyBhcyBGaWVsZFByb3BzKX0gLz47XG5cbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgcmV0dXJuIDxDaGVja2JveEZpZWxkIHsuLi4ocHJvcHMgYXMgRmllbGRQcm9wcyl9IC8+O1xuXG4gICAgICBjYXNlICdyZWxhdGlvbnNoaXAnOlxuICAgICAgICBpZiAocmVsYXRpb25zaGlwcykge1xuICAgICAgICAgIGNvbnN0IHR5cGVkUHJvcHMgPSBwcm9wcyBhcyBTZWxlY3RGaWVsZFByb3BzO1xuICAgICAgICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25zaGlwcy5maW5kKFxuICAgICAgICAgICAgcmVsYXRpb25zaGlwID0+IChyZWxhdGlvbnNoaXAubmFtZSA9IHR5cGVkUHJvcHMubmFtZSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHR5cGVkUHJvcHMub3B0aW9ucyA9IHJlbGF0aW9uPy5vcHRpb25zIHx8IFtdO1xuICAgICAgICAgIHR5cGVkUHJvcHMubGFiZWwgPSByZWxhdGlvbj8ubGFiZWwgfHwgcHJvcHMubmFtZTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGZsZXgtcm93IGp1c3RpZnktc3RhcnQgYm9yZGVyLTIgYm9yZGVyLWdyYXktMzAwIHAtNFwiPlxuICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInRleHQtcmVkLTkwMCBmb250LWJsYWNrIHRleHQtbGcgcHgtMlwiPlxuICAgICAgICAgICAgICAgIHtjYXBpdGFsaXplKHR5cGVkUHJvcHMubGFiZWwhKX1cbiAgICAgICAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgICAgICAgIDxTZWxlY3RGaWVsZCB7Li4udHlwZWRQcm9wc30gLz5cbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgIGNvbnN0IGZpbGVGaWVsZCA9IGZpbGVGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5uYW1lID09PSBlbGVtZW50TmFtZSk7XG4gICAgICAgIGlmIChmaWxlRmllbGQpXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxJbWFnZXNEcm9wRmllbGRcbiAgICAgICAgICAgICAgey4uLihwcm9wcyBhcyBJbWFnZXNEcm9wRmllbGRQcm9wcyl9XG4gICAgICAgICAgICAgIG5hbWU9e2ZpbGVGaWVsZC5uYW1lfVxuICAgICAgICAgICAgICBmaWxlVHlwZT17ZmlsZUZpZWxkLnR5cGV9XG4gICAgICAgICAgICAgIHRleHQ9e2ZpbGVGaWVsZC50ZXh0IHx8ICdTw6lsZWN0aW9ubmVyIGRlcyBmaWNoaWVycyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gZWxlbWVudFNjaGVtYSBhcyBGb3JtU2NoZW1hO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBmbGV4LXJvdyBqdXN0aWZ5LXN0YXJ0IGJvcmRlci0yIGJvcmRlci1ncmF5LTMwMCBwLTQgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxsZWdlbmQgY2xhc3NOYW1lPVwidGV4dC1yZWQtOTAwIGZvbnQtYmxhY2sgdGV4dC1sZyBweC0yXCI+XG4gICAgICAgICAgICAgIHtjYXBpdGFsaXplKHByb3BzLm5hbWUpfVxuICAgICAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgICAgICB7T2JqZWN0LmtleXMoc2NoZW1hKS5tYXAoa2V5ID0+IChcbiAgICAgICAgICAgICAgPEZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAgICB7Z2V0Rm9ybUVsZW1lbnQoa2V5LCBzY2hlbWFba2V5XSwgKGVsZW1lbnRQcmVmaXggPSBwcm9wcy5uYW1lKSl9XG4gICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmaXhNdWx0aXBsZVNlbGVjdFZhbHVlcyA9ICh2YWx1ZXM6IEZvcm1WYWx1ZXMpID0+IHtcbiAgICBjb25zdCBmaXhlZFZhbHVlczogRm9ybVZhbHVlcyA9IHsgLi4udmFsdWVzIH07XG4gICAgbGlzdEZpZWxkcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0gbG9hZGFzaEdldChmaXhlZFZhbHVlcywga2V5KSBhcyBPcHRpb25bXTtcbiAgICAgIGlmIChvcHRpb25zKVxuICAgICAgICBsb2FkYXNoU2V0KFxuICAgICAgICAgIGZpeGVkVmFsdWVzLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBvcHRpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKVxuICAgICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiBmaXhlZFZhbHVlcztcbiAgfTtcblxuICBjb25zdCBkZWZhdWx0T25TdWJtaXQgPSBhc3luYyAodmFsdWVzOiBGb3JtVmFsdWVzLCBmb3JtaWtIZWxwZXJzOiBGb3JtaWtIZWxwZXJzPEZvcm1WYWx1ZXM+KSA9PiB7XG4gICAgY29uc3QgZml4ZWRWYWx1ZXMgPSBmaXhNdWx0aXBsZVNlbGVjdFZhbHVlcyh2YWx1ZXMpO1xuICAgIGZpbGVGaWVsZHMuZm9yRWFjaChhc3luYyBmaWxlRmllbGQgPT4ge1xuICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlc1tmaWxlRmllbGQubmFtZV0pXG4gICAgICAgID8gKHZhbHVlc1tmaWxlRmllbGQubmFtZV0gYXMgRmlsZVdpdGhTaXplW10pXG4gICAgICAgIDogW3ZhbHVlc1tmaWxlRmllbGQubmFtZV0gYXMgRmlsZVdpdGhTaXplXTtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0byByZXZva2UgdGhlIGRhdGEgdXJpcyB0byBhdm9pZCBtZW1vcnkgbGVha3NcbiAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiAoZmlsZS5wcmV2aWV3ID8gVVJMLnJldm9rZU9iamVjdFVSTChmaWxlLnByZXZpZXcpIDogbnVsbCkpO1xuICAgIH0pO1xuICAgIGlmIChvblN1Ym1pdCkgYXdhaXQgb25TdWJtaXQoZml4ZWRWYWx1ZXMsIGZvcm1pa0hlbHBlcnMpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAge2Zvcm1EYXRhID8gKFxuICAgICAgICA8Rm9ybWlrIGVuYWJsZVJlaW5pdGlhbGl6ZSBpbml0aWFsVmFsdWVzPXtmb3JtRGF0YX0gb25TdWJtaXQ9e2RlZmF1bHRPblN1Ym1pdH0+XG4gICAgICAgICAgeyh7IGlzU3VibWl0dGluZyB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm0gY2xhc3NOYW1lPVwibmVlZHMtdmFsaWRhdGlvblwiPlxuICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPXt0aGVtZS5maWVsZFNldFN0eWxlfT5cbiAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT17dGhlbWUubGVnZW5kU3R5bGV9PntsYWJlbH08L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICB7T2JqZWN0LmtleXMoZm9ybURhdGEhKS5tYXAoa2V5ID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtrZXl9PntnZXRGb3JtRWxlbWVudChrZXksIGZvcm1TY2hlbWFba2V5XSwgcHJlZml4LCB0aGVtZSl9PC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBnYXAtNCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8U3VibWl0QnV0dG9uIHRpdGxlPVwiQ3LDqWVyXCIgdGhlbWU9e3RoZW1lfSBpc1N1Ym1pdHRpbmc9e2lzU3VibWl0dGluZ30gLz5cbiAgICAgICAgICAgICAgICB7aXNTdWJtaXR0aW5nID8gPHAgY2xhc3NOYW1lPVwicHQtMVwiPkNyw6lhdGlvbiBlbiBjb3Vycy4uLjwvcD4gOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICApfX1cbiAgICAgICAgPC9Gb3JtaWs+XG4gICAgICApIDogbnVsbH1cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRm9ybUNvbXBvbmVudDtcbiJdfQ==