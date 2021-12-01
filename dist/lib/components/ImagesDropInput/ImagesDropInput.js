"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactDropzone = require("react-dropzone");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultInstructionsStyle = 'bg-gray-100 border-2 border-gray-400 border-dashed h-24 px-4 py-2 text-sm font-light w-[60vw]';

var ImagesDropInput = function ImagesDropInput(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === void 0 ? "Drag 'n' drop some files here, or click to select files" : _ref$text,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? defaultInstructionsStyle : _ref$className,
      _ref$fileType = _ref.fileType,
      fileType = _ref$fileType === void 0 ? 'image/*' : _ref$fileType,
      thumbnailSize = _ref.thumbnailSize,
      getFiles = _ref.getFiles,
      multiple = _ref.multiple;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      files = _useState2[0],
      setFiles = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      dragId = _useState4[0],
      setDragId = _useState4[1];

  var onDrop = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(acceptedFiles) {
      var readImageAsync, imageFromFile;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!fileType.startsWith('image/')) {
                _context5.next = 5;
                break;
              }

              readImageAsync = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(imageSrc) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", new Promise(function (resolve, reject) {
                            var image = new Image();

                            image.onload = function () {
                              resolve(image);
                            };

                            image.onerror = reject;
                            image.src = imageSrc;
                          }));

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function readImageAsync(_x2) {
                  return _ref3.apply(this, arguments);
                };
              }();

              imageFromFile = /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          return _context3.abrupt("return", new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            reader.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                              var image;
                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return readImageAsync(reader.result);

                                    case 2:
                                      image = _context2.sent;
                                      resolve(image);

                                    case 4:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2);
                            }));
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                          }));

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function imageFromFile(_x3) {
                  return _ref4.apply(this, arguments);
                };
              }();

              _context5.next = 5;
              return Promise.all(acceptedFiles.map( /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(file) {
                  var image;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return imageFromFile(file);

                        case 2:
                          image = _context4.sent;
                          file.preview = URL.createObjectURL(file);
                          file.width = image.width;
                          file.height = image.height;

                        case 6:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x4) {
                  return _ref6.apply(this, arguments);
                };
              }()));

            case 5:
              setFiles(acceptedFiles);
              getFiles(acceptedFiles);

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [getFiles, fileType]);

  var onDragStart = function onDragStart(dragEvent) {
    var image = dragEvent.target;
    setDragId(+image.id);
    dragEvent.dataTransfer.effectAllowed = 'move';
    dragEvent.dataTransfer.setDragImage(image, 30, 30);
    image.style.opacity = '0.01';
  };

  var onDragOver = function onDragOver(dragEvent) {
    dragEvent.preventDefault();
    return false;
  };

  var onDragEnter = function onDragEnter(dragEvent) {
    var imageUnderneath = dragEvent.target;
    if (+imageUnderneath.id != dragId) imageUnderneath.style.opacity = '0.5';
  };

  var onDragLeave = function onDragLeave(dragEvent) {
    var imageUnderneath = dragEvent.target;
    if (+imageUnderneath.id != dragId) imageUnderneath.style.opacity = '1';
  };

  var onDragEnd = function onDragEnd(dragEvent) {
    var image = dragEvent.target;
    image.style.opacity = '1';
  };

  var onDropImage = function onDropImage(dragEvent) {
    var dropImage = dragEvent.target;
    dropImage.style.opacity = '1';
    var dropId = +dropImage.id;

    var newFiles = _toConsumableArray(files);

    var dragFile = files[dragId];
    newFiles.splice(dragId, 1);
    newFiles.splice(dropId, 0, dragFile);
    setFiles(newFiles);
  };

  var _useDropzone = (0, _reactDropzone.useDropzone)({
    accept: fileType,
    onDrop: onDrop,
    multiple: multiple
  }),
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps;

  var imageThumbs = /*#__PURE__*/React.createElement("aside", {
    className: "flex flex-row flex-wrap mt-4 gap-4"
  }, files.map(function (file, index) {
    var _thumbnailSize$width, _thumbnailSize$height;

    return /*#__PURE__*/React.createElement("div", {
      className: "flex min-w-0 overflow-hidden",
      key: index
    }, /*#__PURE__*/React.createElement("img", {
      id: index.toString(),
      src: file.preview,
      alt: "Preview of property",
      width: (_thumbnailSize$width = thumbnailSize === null || thumbnailSize === void 0 ? void 0 : thumbnailSize.width) !== null && _thumbnailSize$width !== void 0 ? _thumbnailSize$width : 120,
      height: (_thumbnailSize$height = thumbnailSize === null || thumbnailSize === void 0 ? void 0 : thumbnailSize.height) !== null && _thumbnailSize$height !== void 0 ? _thumbnailSize$height : 80,
      className: "block object-cover rounded",
      draggable: "true",
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      onDragOver: onDragOver,
      onDragEnter: onDragEnter,
      onDragLeave: onDragLeave,
      onDrop: onDropImage
    }));
  }));
  var fileList = /*#__PURE__*/React.createElement("aside", {
    className: "flex flex-col flex-wrap mt-4 gap-4"
  }, files.map(function (file, index) {
    return /*#__PURE__*/React.createElement("ul", {
      className: "text-sm",
      key: index
    }, /*#__PURE__*/React.createElement("li", null, "File: ", /*#__PURE__*/React.createElement("span", {
      className: "font-light"
    }, file.name)));
  }));
  return /*#__PURE__*/React.createElement("section", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", getRootProps({
    className: className
  }), /*#__PURE__*/React.createElement("input", getInputProps()), /*#__PURE__*/React.createElement("p", null, text)), files.length ? fileType.startsWith('image/') ? imageThumbs : fileList : null);
};

var _default = ImagesDropInput;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9JbWFnZXNEcm9wSW5wdXQvSW1hZ2VzRHJvcElucHV0LnRzeCJdLCJuYW1lcyI6WyJkZWZhdWx0SW5zdHJ1Y3Rpb25zU3R5bGUiLCJJbWFnZXNEcm9wSW5wdXQiLCJ0ZXh0IiwiY2xhc3NOYW1lIiwiZmlsZVR5cGUiLCJ0aHVtYm5haWxTaXplIiwiZ2V0RmlsZXMiLCJtdWx0aXBsZSIsImZpbGVzIiwic2V0RmlsZXMiLCJkcmFnSWQiLCJzZXREcmFnSWQiLCJvbkRyb3AiLCJhY2NlcHRlZEZpbGVzIiwic3RhcnRzV2l0aCIsInJlYWRJbWFnZUFzeW5jIiwiaW1hZ2VTcmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJvbmVycm9yIiwic3JjIiwiaW1hZ2VGcm9tRmlsZSIsImZpbGUiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsImFsbCIsIm1hcCIsInByZXZpZXciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ3aWR0aCIsImhlaWdodCIsIm9uRHJhZ1N0YXJ0IiwiZHJhZ0V2ZW50IiwidGFyZ2V0IiwiaWQiLCJkYXRhVHJhbnNmZXIiLCJlZmZlY3RBbGxvd2VkIiwic2V0RHJhZ0ltYWdlIiwic3R5bGUiLCJvcGFjaXR5Iiwib25EcmFnT3ZlciIsInByZXZlbnREZWZhdWx0Iiwib25EcmFnRW50ZXIiLCJpbWFnZVVuZGVybmVhdGgiLCJvbkRyYWdMZWF2ZSIsIm9uRHJhZ0VuZCIsIm9uRHJvcEltYWdlIiwiZHJvcEltYWdlIiwiZHJvcElkIiwibmV3RmlsZXMiLCJkcmFnRmlsZSIsInNwbGljZSIsImFjY2VwdCIsImdldFJvb3RQcm9wcyIsImdldElucHV0UHJvcHMiLCJpbWFnZVRodW1icyIsImluZGV4IiwidG9TdHJpbmciLCJmaWxlTGlzdCIsIm5hbWUiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7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akIsS0FDR3pELEtBQUssQ0FBQ3dCLEdBQU4sQ0FBVSxVQUFDTixJQUFELEVBQU9xQyxLQUFQO0FBQUEsd0JBQ1Q7QUFBSSxNQUFBLFNBQVMsRUFBQyxTQUFkO0FBQXdCLE1BQUEsR0FBRyxFQUFFQTtBQUE3QixvQkFDRSx1REFDUTtBQUFNLE1BQUEsU0FBUyxFQUFDO0FBQWhCLE9BQThCckMsSUFBSSxDQUFDd0MsSUFBbkMsQ0FEUixDQURGLENBRFM7QUFBQSxHQUFWLENBREgsQ0FERjtBQVlBLHNCQUNFO0FBQVMsSUFBQSxTQUFTLEVBQUM7QUFBbkIsa0JBQ0UsMkJBQ01OLFlBQVksQ0FBQztBQUNmekQsSUFBQUEsU0FBUyxFQUFFQTtBQURJLEdBQUQsQ0FEbEIsZUFJRSw2QkFBVzBELGFBQWEsRUFBeEIsQ0FKRixlQUtFLCtCQUFJM0QsSUFBSixDQUxGLENBREYsRUFRR00sS0FBSyxDQUFDMkQsTUFBTixHQUFnQi9ELFFBQVEsQ0FBQ1UsVUFBVCxDQUFvQixRQUFwQixJQUFnQ2dELFdBQWhDLEdBQThDRyxRQUE5RCxHQUEwRSxJQVI3RSxDQURGO0FBWUQsQ0F4SkQ7O2VBMEplaEUsZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgRkMsIERyYWdFdmVudEhhbmRsZXIsIEhUTUxQcm9wcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZURyb3B6b25lIH0gZnJvbSAncmVhY3QtZHJvcHpvbmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVXaXRoU2l6ZSBleHRlbmRzIEZpbGUge1xuICBsYWJlbD86IHN0cmluZztcbiAgcHJldmlldz86IHN0cmluZztcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZXNEcm9wSW5wdXRQcm9wcyBleHRlbmRzIEhUTUxQcm9wczxIVE1MSW5wdXRFbGVtZW50PiB7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZmlsZVR5cGU/OiBzdHJpbmc7XG4gIHRodW1ibmFpbFNpemU/OiB7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgfTtcbiAgZ2V0RmlsZXM6IChmaWxlczogRmlsZVdpdGhTaXplW10pID0+IHZvaWQ7XG59XG5cbmNvbnN0IGRlZmF1bHRJbnN0cnVjdGlvbnNTdHlsZSA9XG4gICdiZy1ncmF5LTEwMCBib3JkZXItMiBib3JkZXItZ3JheS00MDAgYm9yZGVyLWRhc2hlZCBoLTI0IHB4LTQgcHktMiB0ZXh0LXNtIGZvbnQtbGlnaHQgdy1bNjB2d10nO1xuXG5jb25zdCBJbWFnZXNEcm9wSW5wdXQ6IEZDPEltYWdlc0Ryb3BJbnB1dFByb3BzPiA9ICh7XG4gIHRleHQgPSBcIkRyYWcgJ24nIGRyb3Agc29tZSBmaWxlcyBoZXJlLCBvciBjbGljayB0byBzZWxlY3QgZmlsZXNcIixcbiAgY2xhc3NOYW1lID0gZGVmYXVsdEluc3RydWN0aW9uc1N0eWxlLFxuICBmaWxlVHlwZSA9ICdpbWFnZS8qJyxcbiAgdGh1bWJuYWlsU2l6ZSxcbiAgZ2V0RmlsZXMsXG4gIG11bHRpcGxlLFxufSkgPT4ge1xuICBjb25zdCBbZmlsZXMsIHNldEZpbGVzXSA9IHVzZVN0YXRlPEZpbGVXaXRoU2l6ZVtdPihbXSk7XG4gIGNvbnN0IFtkcmFnSWQsIHNldERyYWdJZF0gPSB1c2VTdGF0ZTxudW1iZXIgfCB1bmRlZmluZWQ+KCk7XG5cbiAgY29uc3Qgb25Ecm9wID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGFjY2VwdGVkRmlsZXM6IEZpbGVXaXRoU2l6ZVtdKSA9PiB7XG4gICAgICBpZiAoZmlsZVR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpIHtcbiAgICAgICAgY29uc3QgcmVhZEltYWdlQXN5bmMgPSBhc3luYyAoaW1hZ2VTcmM6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VTcmM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaW1hZ2VGcm9tRmlsZSA9IGFzeW5jIChmaWxlOiBGaWxlV2l0aFNpemUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gYXdhaXQgcmVhZEltYWdlQXN5bmMocmVhZGVyLnJlc3VsdCBhcyBzdHJpbmcpO1xuICAgICAgICAgICAgICByZXNvbHZlKGltYWdlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICBhY2NlcHRlZEZpbGVzLm1hcChhc3luYyBmaWxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gYXdhaXQgaW1hZ2VGcm9tRmlsZShmaWxlKTtcbiAgICAgICAgICAgIGZpbGUucHJldmlldyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgICAgICBmaWxlLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICBmaWxlLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBzZXRGaWxlcyhhY2NlcHRlZEZpbGVzKTtcbiAgICAgIGdldEZpbGVzKGFjY2VwdGVkRmlsZXMpO1xuICAgIH0sXG4gICAgW2dldEZpbGVzLCBmaWxlVHlwZV1cbiAgKTtcblxuICBjb25zdCBvbkRyYWdTdGFydDogRHJhZ0V2ZW50SGFuZGxlcjxIVE1MSW1hZ2VFbGVtZW50PiA9IGRyYWdFdmVudCA9PiB7XG4gICAgY29uc3QgaW1hZ2UgPSBkcmFnRXZlbnQudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc2V0RHJhZ0lkKCtpbWFnZS5pZCk7XG4gICAgZHJhZ0V2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGRyYWdFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKGltYWdlLCAzMCwgMzApO1xuICAgIGltYWdlLnN0eWxlLm9wYWNpdHkgPSAnMC4wMSc7XG4gIH07XG5cbiAgY29uc3Qgb25EcmFnT3ZlcjogRHJhZ0V2ZW50SGFuZGxlcjxIVE1MRWxlbWVudD4gPSBkcmFnRXZlbnQgPT4ge1xuICAgIGRyYWdFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBvbkRyYWdFbnRlcjogRHJhZ0V2ZW50SGFuZGxlcjxIVE1MRWxlbWVudD4gPSBkcmFnRXZlbnQgPT4ge1xuICAgIGNvbnN0IGltYWdlVW5kZXJuZWF0aCA9IGRyYWdFdmVudC50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICBpZiAoK2ltYWdlVW5kZXJuZWF0aC5pZCAhPSBkcmFnSWQpIGltYWdlVW5kZXJuZWF0aC5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gIH07XG5cbiAgY29uc3Qgb25EcmFnTGVhdmU6IERyYWdFdmVudEhhbmRsZXI8SFRNTEVsZW1lbnQ+ID0gZHJhZ0V2ZW50ID0+IHtcbiAgICBjb25zdCBpbWFnZVVuZGVybmVhdGggPSBkcmFnRXZlbnQudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgaWYgKCtpbWFnZVVuZGVybmVhdGguaWQgIT0gZHJhZ0lkKSBpbWFnZVVuZGVybmVhdGguc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgfTtcblxuICBjb25zdCBvbkRyYWdFbmQ6IERyYWdFdmVudEhhbmRsZXI8SFRNTEVsZW1lbnQ+ID0gZHJhZ0V2ZW50ID0+IHtcbiAgICBjb25zdCBpbWFnZSA9IGRyYWdFdmVudC50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWFnZS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICB9O1xuXG4gIGNvbnN0IG9uRHJvcEltYWdlOiBEcmFnRXZlbnRIYW5kbGVyPEhUTUxJbWFnZUVsZW1lbnQ+ID0gZHJhZ0V2ZW50ID0+IHtcbiAgICBjb25zdCBkcm9wSW1hZ2UgPSBkcmFnRXZlbnQudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgZHJvcEltYWdlLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgY29uc3QgZHJvcElkID0gK2Ryb3BJbWFnZS5pZDtcbiAgICBjb25zdCBuZXdGaWxlcyA9IFsuLi5maWxlc107XG4gICAgY29uc3QgZHJhZ0ZpbGUgPSBmaWxlc1tkcmFnSWQhXTtcbiAgICBuZXdGaWxlcy5zcGxpY2UoZHJhZ0lkISwgMSk7XG4gICAgbmV3RmlsZXMuc3BsaWNlKGRyb3BJZCwgMCwgZHJhZ0ZpbGUpO1xuICAgIHNldEZpbGVzKG5ld0ZpbGVzKTtcbiAgfTtcblxuICBjb25zdCB7IGdldFJvb3RQcm9wcywgZ2V0SW5wdXRQcm9wcyB9ID0gdXNlRHJvcHpvbmUoe1xuICAgIGFjY2VwdDogZmlsZVR5cGUsXG4gICAgb25Ecm9wLFxuICAgIG11bHRpcGxlXG4gIH0pO1xuXG4gIGNvbnN0IGltYWdlVGh1bWJzID0gKFxuICAgIDxhc2lkZSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGZsZXgtd3JhcCBtdC00IGdhcC00XCI+XG4gICAgICB7ZmlsZXMubWFwKChmaWxlLCBpbmRleCkgPT4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbWluLXctMCBvdmVyZmxvdy1oaWRkZW5cIiBrZXk9e2luZGV4fT5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBpZD17aW5kZXgudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIHNyYz17ZmlsZS5wcmV2aWV3IX1cbiAgICAgICAgICAgIGFsdD1cIlByZXZpZXcgb2YgcHJvcGVydHlcIlxuICAgICAgICAgICAgd2lkdGg9e3RodW1ibmFpbFNpemU/LndpZHRoID8/IDEyMH1cbiAgICAgICAgICAgIGhlaWdodD17dGh1bWJuYWlsU2l6ZT8uaGVpZ2h0ID8/IDgwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgb2JqZWN0LWNvdmVyIHJvdW5kZWRcIlxuICAgICAgICAgICAgZHJhZ2dhYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgICBvbkRyYWdTdGFydD17b25EcmFnU3RhcnR9XG4gICAgICAgICAgICBvbkRyYWdFbmQ9e29uRHJhZ0VuZH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9e29uRHJhZ092ZXJ9XG4gICAgICAgICAgICBvbkRyYWdFbnRlcj17b25EcmFnRW50ZXJ9XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17b25EcmFnTGVhdmV9XG4gICAgICAgICAgICBvbkRyb3A9e29uRHJvcEltYWdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSl9XG4gICAgPC9hc2lkZT5cbiAgKTtcblxuICBjb25zdCBmaWxlTGlzdCA9IChcbiAgICA8YXNpZGUgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBmbGV4LXdyYXAgbXQtNCBnYXAtNFwiPlxuICAgICAge2ZpbGVzLm1hcCgoZmlsZSwgaW5kZXgpID0+IChcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cInRleHQtc21cIiBrZXk9e2luZGV4fT5cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICBGaWxlOiA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxpZ2h0XCI+e2ZpbGUubmFtZX08L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICkpfVxuICAgIDwvYXNpZGU+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgey4uLmdldFJvb3RQcm9wcyh7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgIH0pfT5cbiAgICAgICAgPGlucHV0IHsuLi5nZXRJbnB1dFByb3BzKCl9Lz5cbiAgICAgICAgPHA+e3RleHR9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICB7ZmlsZXMubGVuZ3RoID8gKGZpbGVUeXBlLnN0YXJ0c1dpdGgoJ2ltYWdlLycpID8gaW1hZ2VUaHVtYnMgOiBmaWxlTGlzdCkgOiBudWxsfVxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlc0Ryb3BJbnB1dDtcbiJdfQ==