"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsAmplify = require("aws-amplify");

var _FormComponent = require("../FormComponent");

var _graphqlHelpers = require("../../helpers/graphql-helpers");

var _set = _interopRequireDefault(require("lodash/set"));

var _excluded = ["amplifyConfig", "graphQLJSONSchema", "entity", "fieldExtraProps", "storagePrefix", "storageLevel", "label", "onSubmit", "fileFields"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AmplifyForm = function AmplifyForm(_ref) {
  var amplifyConfig = _ref.amplifyConfig,
      graphQLJSONSchema = _ref.graphQLJSONSchema,
      entity = _ref.entity,
      fieldExtraProps = _ref.fieldExtraProps,
      _ref$storagePrefix = _ref.storagePrefix,
      storagePrefix = _ref$storagePrefix === void 0 ? '' : _ref$storagePrefix,
      _ref$storageLevel = _ref.storageLevel,
      storageLevel = _ref$storageLevel === void 0 ? 'public' : _ref$storageLevel,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? entity : _ref$label,
      onSubmit = _ref.onSubmit,
      fileFields = _ref.fileFields,
      rest = _objectWithoutProperties(_ref, _excluded);

  if (amplifyConfig) _awsAmplify.Amplify.configure(_objectSpread({}, amplifyConfig));
  var formSchema = (0, _graphqlHelpers.formSchemaFromGraphQLTypes)(graphQLJSONSchema, "Create".concat(entity, "Input"), fileFields);

  if (fieldExtraProps) {
    Object.keys(fieldExtraProps).forEach(function (field) {
      var fieldProps = fieldExtraProps[field];
      Object.keys(fieldProps).forEach(function (key) {
        (0, _set.default)(formSchema, "".concat(field, ".").concat(key), fieldProps[key]);
      });
    });
  }

  var uploadFile = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
      var putResult, errors, readbleErrors;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _awsAmplify.Storage.put(storagePrefix + file.name, file, {
                level: storageLevel,
                contentType: file.type
              });

            case 3:
              putResult = _context.sent;
              return _context.abrupt("return", putResult.key);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              errors = _context.t0.errors;
              readbleErrors = errors;
              throw new Error(readbleErrors.map(function (error) {
                return error.message;
              }).join(','));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function uploadFile(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var uploadFiles = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(values, fileFieldName) {
      var files;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              files = Array.isArray(values[fileFieldName]) ? values[fileFieldName] : [values[fileFieldName]];
              _context3.next = 3;
              return Promise.all(files.map( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file) {
                  var fileWithStorage;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          fileWithStorage = file;
                          _context2.next = 3;
                          return uploadFile(file);

                        case 3:
                          fileWithStorage.storageKey = _context2.sent;
                          return _context2.abrupt("return", fileWithStorage);

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x4) {
                  return _ref5.apply(this, arguments);
                };
              }()));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function uploadFiles(_x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  var submitAndUpload = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(values, formikHelpers) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!fileFields) {
                _context5.next = 3;
                break;
              }

              _context5.next = 3;
              return Promise.all(fileFields.map( /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(fileField) {
                  var filesWithKey;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return uploadFiles(values, fileField.name);

                        case 2:
                          filesWithKey = _context4.sent;
                          values[fileField.name] = filesWithKey.length === 0 ? undefined : Array.isArray(values[fileField.name]) ? filesWithKey : filesWithKey[0];

                        case 4:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x7) {
                  return _ref7.apply(this, arguments);
                };
              }()));

            case 3:
              if (!onSubmit) {
                _context5.next = 6;
                break;
              }

              _context5.next = 6;
              return onSubmit(values, formikHelpers);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function submitAndUpload(_x5, _x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/React.createElement(_FormComponent.FormComponent, _extends({
    formSchema: formSchema,
    onSubmit: submitAndUpload,
    label: label,
    fileFields: fileFields
  }, rest));
};

var _default = AmplifyForm;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9BbXBsaWZ5Rm9ybS9BbXBsaWZ5Rm9ybS50c3giXSwibmFtZXMiOlsiQW1wbGlmeUZvcm0iLCJhbXBsaWZ5Q29uZmlnIiwiZ3JhcGhRTEpTT05TY2hlbWEiLCJlbnRpdHkiLCJmaWVsZEV4dHJhUHJvcHMiLCJzdG9yYWdlUHJlZml4Iiwic3RvcmFnZUxldmVsIiwibGFiZWwiLCJvblN1Ym1pdCIsImZpbGVGaWVsZHMiLCJyZXN0IiwiQW1wbGlmeSIsImNvbmZpZ3VyZSIsImZvcm1TY2hlbWEiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImZpZWxkIiwiZmllbGRQcm9wcyIsImtleSIsInVwbG9hZEZpbGUiLCJmaWxlIiwiU3RvcmFnZSIsInB1dCIsIm5hbWUiLCJsZXZlbCIsImNvbnRlbnRUeXBlIiwidHlwZSIsInB1dFJlc3VsdCIsImVycm9ycyIsInJlYWRibGVFcnJvcnMiLCJFcnJvciIsIm1hcCIsImVycm9yIiwibWVzc2FnZSIsImpvaW4iLCJ1cGxvYWRGaWxlcyIsInZhbHVlcyIsImZpbGVGaWVsZE5hbWUiLCJmaWxlcyIsIkFycmF5IiwiaXNBcnJheSIsIlByb21pc2UiLCJhbGwiLCJmaWxlV2l0aFN0b3JhZ2UiLCJzdG9yYWdlS2V5Iiwic3VibWl0QW5kVXBsb2FkIiwiZm9ybWlrSGVscGVycyIsImZpbGVGaWVsZCIsImZpbGVzV2l0aEtleSIsImxlbmd0aCIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLElBQU1BLFdBQWlDLEdBQUcsU0FBcENBLFdBQW9DLE9BV3BDO0FBQUEsTUFWSkMsYUFVSSxRQVZKQSxhQVVJO0FBQUEsTUFUSkMsaUJBU0ksUUFUSkEsaUJBU0k7QUFBQSxNQVJKQyxNQVFJLFFBUkpBLE1BUUk7QUFBQSxNQVBKQyxlQU9JLFFBUEpBLGVBT0k7QUFBQSxnQ0FOSkMs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RCxDQWpGRDs7ZUFtRmVWLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFtcGxpZnksIFN0b3JhZ2UgfSBmcm9tICdhd3MtYW1wbGlmeSc7XG5pbXBvcnQgeyBGb3JtQ29tcG9uZW50LCBGb3JtQ29tcG9uZW50UHJvcHMsIEZvcm1WYWx1ZXMgfSBmcm9tICcuLi9Gb3JtQ29tcG9uZW50JztcbmltcG9ydCB7IGZvcm1TY2hlbWFGcm9tR3JhcGhRTFR5cGVzIH0gZnJvbSAnLi4vLi4vaGVscGVycy9ncmFwaHFsLWhlbHBlcnMnO1xuaW1wb3J0IHsgRmlsZVdpdGhTaXplIH0gZnJvbSAnLi4vSW1hZ2VzRHJvcElucHV0JztcbmltcG9ydCB7IEZvcm1pa0hlbHBlcnMgfSBmcm9tICdmb3JtaWsnO1xuaW1wb3J0IGxvYWRhc2hTZXQgZnJvbSAnbG9kYXNoL3NldCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW1wbGlmeUZvcm1Qcm9wcyBleHRlbmRzIE9taXQ8T21pdDxGb3JtQ29tcG9uZW50UHJvcHMsICdmb3JtU2NoZW1hJz4sICdsYWJlbCc+IHtcbiAgYW1wbGlmeUNvbmZpZz86IGFueTtcbiAgZ3JhcGhRTEpTT05TY2hlbWE6IGFueTtcbiAgZW50aXR5OiBzdHJpbmc7XG4gIGZpZWxkRXh0cmFQcm9wcz86IHtcbiAgICBbazogc3RyaW5nXToge1xuICAgICAgW2s6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XG4gICAgfTtcbiAgfTtcbiAgc3RvcmFnZVByZWZpeD86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHN0b3JhZ2VMZXZlbD86ICdwdWJsaWMnIHwgJ3Byb3RlY3RlZCcgfCAncHJpdmF0ZSc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVdpdGhTdG9yYWdlS2V5IGV4dGVuZHMgT21pdDxGaWxlV2l0aFNpemUsICdwcmV2aWV3Jz4ge1xuICBzdG9yYWdlS2V5OiBzdHJpbmc7XG59XG5cbmNvbnN0IEFtcGxpZnlGb3JtOiBGQzxBbXBsaWZ5Rm9ybVByb3BzPiA9ICh7XG4gIGFtcGxpZnlDb25maWcsXG4gIGdyYXBoUUxKU09OU2NoZW1hLFxuICBlbnRpdHksXG4gIGZpZWxkRXh0cmFQcm9wcyxcbiAgc3RvcmFnZVByZWZpeCA9ICcnLFxuICBzdG9yYWdlTGV2ZWwgPSAncHVibGljJyxcbiAgbGFiZWwgPSBlbnRpdHksXG4gIG9uU3VibWl0LFxuICBmaWxlRmllbGRzLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGlmIChhbXBsaWZ5Q29uZmlnKSBBbXBsaWZ5LmNvbmZpZ3VyZSh7IC4uLmFtcGxpZnlDb25maWcgfSk7XG5cbiAgY29uc3QgZm9ybVNjaGVtYSA9IGZvcm1TY2hlbWFGcm9tR3JhcGhRTFR5cGVzKFxuICAgIGdyYXBoUUxKU09OU2NoZW1hLFxuICAgIGBDcmVhdGUke2VudGl0eX1JbnB1dGAsXG4gICAgZmlsZUZpZWxkc1xuICApITtcblxuICBpZiAoZmllbGRFeHRyYVByb3BzKSB7XG4gICAgT2JqZWN0LmtleXMoZmllbGRFeHRyYVByb3BzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkUHJvcHMgPSBmaWVsZEV4dHJhUHJvcHNbZmllbGRdO1xuICAgICAgT2JqZWN0LmtleXMoZmllbGRQcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsb2FkYXNoU2V0KGZvcm1TY2hlbWEsIGAke2ZpZWxkfS4ke2tleX1gLCBmaWVsZFByb3BzW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKGZpbGU6IEZpbGVXaXRoU2l6ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwdXRSZXN1bHQgPSBhd2FpdCBTdG9yYWdlLnB1dChzdG9yYWdlUHJlZml4ICsgZmlsZS5uYW1lLCBmaWxlLCB7XG4gICAgICAgIGxldmVsOiBzdG9yYWdlTGV2ZWwsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlLnR5cGUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwdXRSZXN1bHQua2V5O1xuICAgIH0gY2F0Y2ggKHsgZXJyb3JzIH0pIHtcbiAgICAgIGNvbnN0IHJlYWRibGVFcnJvcnMgPSBlcnJvcnMgYXMgdW5rbm93biBhcyB7IG1lc3NhZ2U6IHN0cmluZyB9W107XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVhZGJsZUVycm9ycy5tYXAoZXJyb3IgPT4gZXJyb3IubWVzc2FnZSkuam9pbignLCcpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBsb2FkRmlsZXMgPSBhc3luYyAodmFsdWVzOiBGb3JtVmFsdWVzLCBmaWxlRmllbGROYW1lOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBmaWxlcyA9IEFycmF5LmlzQXJyYXkodmFsdWVzW2ZpbGVGaWVsZE5hbWVdKVxuICAgICAgPyAodmFsdWVzW2ZpbGVGaWVsZE5hbWVdIGFzIEZpbGVXaXRoU2l6ZVtdKVxuICAgICAgOiBbdmFsdWVzW2ZpbGVGaWVsZE5hbWVdIGFzIEZpbGVXaXRoU2l6ZV07XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICBjb25zdCBmaWxlV2l0aFN0b3JhZ2UgPSBmaWxlIGFzIEZpbGVXaXRoU3RvcmFnZUtleTtcbiAgICAgICAgZmlsZVdpdGhTdG9yYWdlLnN0b3JhZ2VLZXkgPSBhd2FpdCB1cGxvYWRGaWxlKGZpbGUpO1xuICAgICAgICByZXR1cm4gZmlsZVdpdGhTdG9yYWdlO1xuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHN1Ym1pdEFuZFVwbG9hZCA9IGFzeW5jICh2YWx1ZXM6IEZvcm1WYWx1ZXMsIGZvcm1pa0hlbHBlcnM6IEZvcm1pa0hlbHBlcnM8Rm9ybVZhbHVlcz4pID0+IHtcbiAgICBpZiAoZmlsZUZpZWxkcykge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGZpbGVGaWVsZHMubWFwKGFzeW5jIGZpbGVGaWVsZCA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZXNXaXRoS2V5ID0gYXdhaXQgdXBsb2FkRmlsZXModmFsdWVzLCBmaWxlRmllbGQubmFtZSk7XG4gICAgICAgICAgdmFsdWVzW2ZpbGVGaWVsZC5uYW1lXSA9XG4gICAgICAgICAgICBmaWxlc1dpdGhLZXkubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIDogQXJyYXkuaXNBcnJheSh2YWx1ZXNbZmlsZUZpZWxkLm5hbWVdKVxuICAgICAgICAgICAgICA/IGZpbGVzV2l0aEtleVxuICAgICAgICAgICAgICA6IGZpbGVzV2l0aEtleVswXTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChvblN1Ym1pdCkgYXdhaXQgb25TdWJtaXQodmFsdWVzLCBmb3JtaWtIZWxwZXJzKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGb3JtQ29tcG9uZW50XG4gICAgICBmb3JtU2NoZW1hPXtmb3JtU2NoZW1hfVxuICAgICAgb25TdWJtaXQ9e3N1Ym1pdEFuZFVwbG9hZH1cbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIGZpbGVGaWVsZHM9e2ZpbGVGaWVsZHN9XG4gICAgICB7Li4ucmVzdH1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQW1wbGlmeUZvcm07XG4iXX0=