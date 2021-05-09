'use strict';

var React = require('react');
var KeyCode = require('rc-util/lib/KeyCode');
var BigNumber = require('bignumber.js');
var classnames = require('classnames');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var KeyCode__default = /*#__PURE__*/_interopDefaultLegacy(KeyCode);
var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);
var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _extends = /*@__PURE__*/getDefaultExportFromCjs(_extends_1);

createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});

function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

var STEP_INTERVAL = 200;
var STEP_DELAY = 600;
var InputNumber = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  var _a;

  var _b = props.prefixCls,
      prefixCls = _b === void 0 ? 'wc-input-number' : _b,
      _c = props.decimalSeparator,
      decimalSeparator = _c === void 0 ? '.' : _c,
      className = props.className,
      style = props.style,
      disabled = props.disabled,
      _d = props.keyboard,
      keyboard = _d === void 0 ? true : _d,
      upNode = props.upNode,
      downNode = props.downNode,
      value = props.value,
      defaultValue = props.defaultValue,
      _e = props.step,
      step = _e === void 0 ? 1 : _e,
      _f = props.precision,
      precision = _f === void 0 ? 0 : _f,
      onChange = props.onChange,
      onStep = props.onStep,
      onInput = props.onInput,
      min = props.min,
      max = props.max,
      formatter = props.formatter,
      parser = props.parser,
      inputProps = __rest(props, ["prefixCls", "decimalSeparator", "className", "style", "disabled", "keyboard", "upNode", "downNode", "value", "defaultValue", "step", "precision", "onChange", "onStep", "onInput", "min", "max", "formatter", "parser"]);

  var stepTimeoutRef = React.useRef();
  var stepRef = React.useRef();

  var _g = React.useState(false),
      focus = _g[0],
      setFocus = _g[1];

  var _h = React.useState(function () {
    var _a;

    var initValue = (_a = defaultValue !== null && defaultValue !== void 0 ? defaultValue : value) !== null && _a !== void 0 ? _a : 0;
    return new BigNumber__default['default'](initValue);
  }),
      realValue = _h[0],
      setRealValue = _h[1];

  var refreshValue = function refreshValue(data) {
    var formatValue = data.toFixed();

    var _a = formatValue.split('.'),
        intNum = _a[0],
        decimalNum = _a[1];

    if (precision < 1) {
      return intNum;
    }

    if (!decimalNum) {
      return (formatValue + ".").padEnd((formatValue + ".").length + precision, '0').replace('.', decimalSeparator);
    }

    if (decimalNum.length > precision) {
      return formatValue.substr(0, formatValue.length - (decimalNum.length - precision)).replace('.', decimalSeparator);
    }

    return formatValue.padEnd(formatValue.length + (precision - decimalNum.length), '0').replace('.', decimalSeparator);
  };

  var _j = React.useState(formatter ? formatter(refreshValue(realValue)) : refreshValue(realValue)),
      inputValue = _j[0],
      setInputValue = _j[1];

  var handleBlur = function handleBlur() {
    setInputValue(formatter ? formatter(refreshValue(realValue)) : refreshValue(realValue));
    setFocus(false);
  };

  var getBoundaryValue = function getBoundaryValue(data, up) {
    var finalValue;

    if (up) {
      finalValue = data.plus(new BigNumber__default['default'](step));

      if (finalValue.isGreaterThanOrEqualTo(new BigNumber__default['default'](max))) {
        return new BigNumber__default['default'](max);
      }

      if (finalValue.isLessThan(new BigNumber__default['default'](min))) {
        return new BigNumber__default['default'](min);
      }

      return finalValue;
    }

    finalValue = data.minus(new BigNumber__default['default'](step));

    if (finalValue.isGreaterThan(new BigNumber__default['default'](max))) {
      return new BigNumber__default['default'](max);
    }

    if (finalValue.isLessThanOrEqualTo(new BigNumber__default['default'](min))) {
      return new BigNumber__default['default'](min);
    }

    return finalValue;
  };

  var handleStep = function handleStep(e, up) {
    e.preventDefault();

    if (disabled) {
      return;
    }

    var tempRealValue;
    setRealValue(function (oldRealValue) {
      tempRealValue = getBoundaryValue(oldRealValue, up);
      setInputValue(formatter ? formatter(refreshValue(tempRealValue)) : refreshValue(tempRealValue));
      onChange === null || onChange === void 0 ? void 0 : onChange(refreshValue(tempRealValue));
      onStep === null || onStep === void 0 ? void 0 : onStep(refreshValue(tempRealValue), up ? 'up' : 'down');
      return tempRealValue;
    });
  };

  var handleMouseDown = function handleMouseDown(up) {
    return function (e) {
      stepRef.current = handleStep;
      stepRef.current(e, up); // handle step when hold mouse down

      function loopStep() {
        stepRef.current(e, up);
        stepTimeoutRef.current = setTimeout(loopStep, STEP_INTERVAL);
      }

      stepTimeoutRef.current = setTimeout(loopStep, STEP_DELAY);
    };
  };

  var handleStop = function handleStop() {
    clearTimeout(stepTimeoutRef.current);
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (!keyboard) {
      return;
    }

    if (e.which === KeyCode__default['default'].UP || e.which === KeyCode__default['default'].DOWN) {
      handleStep(e, e.which === KeyCode__default['default'].UP);
    }
  };

  var innerParseValue = function innerParseValue(data) {
    var parsedValue = data.replaceAll(/[^\w.-]+|[a-zA-Z]+/gi, '');

    if (!parsedValue) {
      return '0';
    } // filter all special word except '.'


    var parsedValueArray = parsedValue.split('.');
    var intNum = parsedValueArray[0];
    var decimalNum;

    if (parsedValueArray.length < 2) {
      return parsedValue;
    }

    if (parsedValueArray.slice(1).length > 0) {
      decimalNum = parsedValueArray.slice(1).join('');
    }

    return intNum + "." + decimalNum;
  };

  var handleChange = function handleChange(e) {
    var data = innerParseValue(e.target.value);

    if (parser) {
      data = parser(data);
    }

    var newRealValue = new BigNumber__default['default'](data);

    if (newRealValue.isGreaterThanOrEqualTo(new BigNumber__default['default'](max))) {
      newRealValue = new BigNumber__default['default'](max);
    }

    if (newRealValue.isLessThanOrEqualTo(new BigNumber__default['default'](min))) {
      newRealValue = new BigNumber__default['default'](min);
    }

    setRealValue(newRealValue);
    setInputValue(formatter ? formatter(data) : data);
    onChange === null || onChange === void 0 ? void 0 : onChange(refreshValue(newRealValue));
    onInput === null || onInput === void 0 ? void 0 : onInput(refreshValue(newRealValue));
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: style,
    className: classnames__default['default'](prefixCls, className, (_a = {}, _a[prefixCls + "--disabled"] = disabled, _a[prefixCls + "--focus"] = focus, _a[prefixCls + "--exception"] = realValue.isGreaterThan(new BigNumber__default['default'](max)) || realValue.isLessThan(new BigNumber__default['default'](min)), _a)),
    onFocus: function onFocus() {
      setFocus(true);
    },
    onBlur: handleBlur,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: prefixCls + "__input-wrap"
  }, /*#__PURE__*/React__default['default'].createElement("input", _extends({
    value: inputValue,
    disabled: disabled,
    onChange: handleChange,
    ref: ref
  }, inputProps))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: prefixCls + "__handler-wrap"
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: prefixCls + "__up",
    onMouseDown: handleMouseDown(true),
    onMouseLeave: handleStop,
    onMouseUp: handleStop
  }, upNode || /*#__PURE__*/React__default['default'].createElement("span", {
    className: prefixCls + "__up-icon"
  })), /*#__PURE__*/React__default['default'].createElement("span", {
    className: prefixCls + "__down",
    onMouseDown: handleMouseDown(false),
    onMouseLeave: handleStop,
    onMouseUp: handleStop
  }, downNode || /*#__PURE__*/React__default['default'].createElement("span", {
    className: prefixCls + "__down-icon"
  }))));
});
InputNumber.displayName = 'InputNumber';

module.exports = InputNumber;
//# sourceMappingURL=index.js.map
