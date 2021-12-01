"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AmplifyForm", {
  enumerable: true,
  get: function get() {
    return _AmplifyForm.default;
  }
});
Object.defineProperty(exports, "FileWithStorageKey", {
  enumerable: true,
  get: function get() {
    return _AmplifyForm.FileWithStorageKey;
  }
});
Object.defineProperty(exports, "FormValues", {
  enumerable: true,
  get: function get() {
    return _FormComponent.FormValues;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _AmplifyForm.default;
  }
});

var _AmplifyForm = _interopRequireWildcard(require("./components/AmplifyForm"));

var _FormComponent = require("./components/FormComponent");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbXBsaWZ5Rm9ybSBmcm9tIFwiLi9jb21wb25lbnRzL0FtcGxpZnlGb3JtXCI7XG5pbXBvcnQgeyBGaWxlV2l0aFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi9jb21wb25lbnRzL0FtcGxpZnlGb3JtXCJcbmltcG9ydCB7IEZvcm1WYWx1ZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvRm9ybUNvbXBvbmVudCc7XG5cbmV4cG9ydCB7IEFtcGxpZnlGb3JtIH0gXG5leHBvcnQgeyBBbXBsaWZ5Rm9ybSBhcyBkZWZhdWx0fSBcbmV4cG9ydCB7IEZpbGVXaXRoU3RvcmFnZUtleSwgRm9ybVZhbHVlcyB9Il19