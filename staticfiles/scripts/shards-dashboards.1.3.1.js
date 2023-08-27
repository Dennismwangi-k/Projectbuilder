/*!
* Shards Dashboards v1.3.1
* Copyright 2017-2019 DesignRevision
* SEE LICENSE FILE
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

var camelize = function(obj) {
    if (typeof obj === 'string') return camelCase(obj);
    return walk(obj);
};

function walk (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (isDate(obj) || isRegex(obj)) return obj;
    if (isArray(obj)) return map(obj, walk);
    return reduce(objectKeys(obj), function (acc, key) {
        var camel = camelCase(key);
        acc[camel] = walk(obj[key]);
        return acc;
    }, {});
}

function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase();
    });
}

var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

var isDate = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
};

var isRegex = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var has = Object.prototype.hasOwnProperty;
var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], i));
    }
    return res;
}

function reduce (xs, f, acc) {
    if (xs.reduce) return xs.reduce(f, acc);
    for (var i = 0; i < xs.length; i++) {
        acc = f(acc, xs[i], i);
    }
    return acc;
}

// Shards Dashboards Colors
var Color =
/*#__PURE__*/
function () {
  function Color(value) {
    _classCallCheck(this, Color);

    this.value = value;
  }

  _createClass(Color, [{
    key: "toHex",
    value: function toHex() {
      return this.value;
    }
  }, {
    key: "toRGBA",
    value: function toRGBA() {
      var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var c;

      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.value)) {
        c = this.value.substring(1).split('');

        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }

        c = '0x' + c.join('');
        return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ',' + opacity + ')';
      }
    }
  }]);

  return Color;
}();

var grays = {
  'white': new Color('#ffffff'),
  'gray100': new Color('#f8f9fa'),
  'gray200': new Color('#e9ecef'),
  'gray300': new Color('#dee2e6'),
  'gray400': new Color('#ced4da'),
  'gray500': new Color('#adb5bd'),
  'gray600': new Color('#868e96'),
  'gray700': new Color('#495057'),
  'gray800': new Color('#343a40'),
  'gray900': new Color('#212529'),
  'black': new Color('#000')
};
var colors = {
  'blueishGrey': new Color('#5A6169'),
  'blue': new Color('#007bff'),
  'indigo': new Color('#674eec'),
  'purple': new Color('#8445f7'),
  'pink': new Color('#ff4169'),
  'red': new Color('#c4183c'),
  'orange': new Color('#fb7906'),
  'yellow': new Color('#ffb400'),
  'green': new Color('#17c671'),
  'teal': new Color('#1adba2'),
  'cyan': new Color('#00b8d8'),
  'gray': grays['gray600'],
  'grayDark': grays['gray800']
}; // Custom colors specific to Shards Dashboards, includes the new "grays".

var newColors = {
  'fiordBlue': new Color('#3D5170'),
  'reagentGray': new Color('#818EA3'),
  'shuttleGray': new Color('#5A6169'),
  'mischka': new Color('#CACEDB'),
  'athensGray': new Color('#E9ECEF'),
  'salmon': new Color('#FF4169'),
  'royalBlue': new Color('#674EEC'),
  'java': new Color('#1ADBA2')
};
var themeColors = {
  'accent': colors['blue'],
  'primary': colors['blue'],
  'secondary': colors['blueishGrey'],
  'success': colors['green'],
  'info': colors['cyan'],
  'warning': colors['yellow'],
  'danger': colors['red'],
  'light': grays['gray200'],
  'dark': grays['gray800']
}; // Allow users to override any color

var overrides = window.ShardsDashboards && window.ShardsDashboards.colors ? window.ShardsDashboards.colors : {}; // Parse overriden colors

if (Object.keys(overrides).length !== 0 && overrides.constructor === Object) {
  for (var colorName in overrides) {
    if (overrides.hasOwnProperty(colorName)) {
      if (!/^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(overrides[colorName])) throw new Error('Please provide a hexadecimal color value if you are trying to override the Shards Dashboards colors.');
      overrides[camelize(colorName)] = new Color(overrides[colorName]);
    }
  }
}

var colors$1 = _extends({}, grays, colors, newColors, themeColors, overrides);

if (typeof Chart === 'undefined') {
  throw new Error('Shards Dashboards requires the Chart.js library in order to work properly.');
}

window.ShardsDashboards = window.ShardsDashboards ? window.ShardsDashboards : {};
window.ShardsDashboards.colors = colors$1; // Add jQuery easing.

$.extend($.easing, {
  easeOutSine: function easeOutSine(x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }
});
/**
 * Global Chart.js Style Adjustments
 */
//
// Default chart styles
//
// Fonts

Chart.defaults.global.defaultFontColor = '#BBBCC1'; // Points

Chart.defaults.global.elements.point.backgroundColor = 'rgba(255, 255, 255, 1)';
Chart.defaults.global.elements.point.radius = 4;
Chart.defaults.global.elements.point.hoverRadius = 6; // Grid lines

Chart.defaults.scale.gridLines.color = 'rgba(233, 236 ,239, 1)'; // Ticks

Chart.defaults.scale.ticks.autoSkip = false;
Chart.defaults.scale.ticks.minRotation = 0;
Chart.defaults.scale.ticks.maxRotation = 0;
Chart.defaults.scale.ticks.padding = 10; // Points

Chart.defaults.global.elements.point.backgroundColor = colors$1.white.toHex();
Chart.defaults.global.elements.point.radius = 4;
Chart.defaults.global.elements.point.hoverRadius = 5; // Custom tooltips

Chart.defaults.global.tooltips.custom = function (tooltip) {
  var tooltipEl = document.getElementsByClassName('sc-tooltip-' + this._chart.id)[0];

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.classList.add('sc-tooltip-' + this._chart.id);
    tooltipEl.innerHTML = "<table></table>";

    this._chart.canvas.parentNode.appendChild(tooltipEl);
  } // Hide if no tooltip


  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  } // Set caret Position


  tooltipEl.classList.remove('above', 'below', 'no-transform');

  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  } // Set Text


  if (tooltip.body) {
    var titleLines = tooltip.title || [];
    var bodyLines = tooltip.body.map(getBody);
    var innerHtml = '<thead>';
    titleLines.forEach(function (title) {
      innerHtml += '<tr><th>' + title + '</th></tr>';
    });
    innerHtml += '</thead><tbody>';
    bodyLines.forEach(function (body, i) {
      var colors = tooltip.labelColors[i];
      var style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      var span = '<span class="sc-tooltip-key" style="' + style + '"></span>';
      innerHtml += "<tr><td>".concat(span, " ").concat(body, "</td></tr>");
    });
    innerHtml += '</tbody>';
    var tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  var positionY = this._chart.canvas.offsetTop;
  var positionX = this._chart.canvas.offsetLeft; // Display, position, and set styles for font

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
}; // Custom legends callback.


Chart.defaults.global.legendCallback = function (chart) {
  var text = "<ul class=\"sc-legend-container sc-legend-chart-".concat(chart.id, "\">");
  chart.data.datasets.map(function (set) {
    text += "<li class=\"sc-legend\"><span class=\"sc-legend__label\" style=\"background: ".concat(set.borderColor, " !important;\"></span>").concat(set.label ? set.label : '', "</li>");
  });
  text += '</ul>';
  return text;
};

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function draw(ease) {
    Chart.controllers.line.prototype.draw.call(this, ease);

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      var activePoint = this.chart.tooltip._active[0],
          ctx = this.chart.ctx,
          x = activePoint.tooltipPosition().x,
          topY = this.chart.scales['y-axis-0'].top,
          bottomY = this.chart.scales['y-axis-0'].bottom; // Draw the line

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#ddd';
      ctx.stroke();
      ctx.restore();
    }
  }
});
$(document).ready(function () {
  /**
   * Dropdown adjustments
   */
  var slideConfig = {
    duration: 270,
    easing: 'easeOutSine'
  }; // Add dropdown animations when toggled.

  $(':not(.main-sidebar--icons-only) .dropdown').on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(slideConfig);
  });
  $(':not(.main-sidebar--icons-only) .dropdown').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(slideConfig);
  }); // Sidebar toggle functionality.

  $('.toggle-sidebar').click(function (e) {
    $('.main-sidebar').toggleClass('open');
  }); // Apply dynamic scroll to sidebar nav wrapper

  $(window).resize(handleSidebarHeightCheck);

  function handleSidebarHeightCheck() {
    var $navWrapper = $('.nav-wrapper');
    var height = $navWrapper.height();
    var scrollHeight = $navWrapper[0].scrollHeight;

    if (scrollHeight > height) {
      $navWrapper.css('overflowY', 'auto');
      return;
    }

    $navWrapper.css('overflowY', 'none');
  }

  handleSidebarHeightCheck();
});

})));

//# sourceMappingURL=shards-dashboards.1.3.1.js.map
