'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function parseColor(c) {
  var cache;
  var p = parseInt,
      color = c.replace(/\s/g, '');

  if (cache = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color)) {
    cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)];
  } else if (cache = /#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color)) {
    cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17];
  } else if (cache = /rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color)) {
    cache = [+cache[1], +cache[2], +cache[3], +cache[4]];
  } else if (cache = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color)) {
    cache = [+cache[1], +cache[2], +cache[3]];
  } else {
    cache = [0, 0, 0, 1];
  }

  if (isNaN(cache[3])) {
    cache[3] = 1;
  }

  return cache.slice(0, 4);
}

function px(val) {
  return typeof val === 'number' ? "".concat(val, "px") : val;
}
function semiOpaqueColor(color, opacity) {
  var rgba = parseColor(color);
  return "rgba(".concat(rgba[0], ", ").concat(rgba[1], ", ").concat(rgba[2], ", ").concat(rgba[3] * opacity, ")");
}var _THEMES;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var THEME_DEFAULT = 'default';
var THEME_IOS = 'ios';
var THEME_MATERIAL = 'material';
var THEMES = (_THEMES = {}, _defineProperty(_THEMES, THEME_DEFAULT, {
  size: {
    width: 75,
    height: 40
  },
  color: {
    on: '#f3a978',
    off: '#5a6676',
    thumb: '#ffffff'
  },
  margin: 6
}), _defineProperty(_THEMES, THEME_IOS, {
  size: {
    width: 60,
    height: 36
  },
  color: {
    on: '#13bf11',
    off: '#f8f8f8',
    border: '#dddddd',
    thumb: '#ffffff'
  },
  margin: 2
}), _defineProperty(_THEMES, THEME_MATERIAL, {
  size: {
    width: 34,
    height: 14
  },
  color: {
    on: 'rgba(25, 118, 210, 0.5)',
    off: '#9f9f9f',
    thumb: 'rgb(25, 118, 210)',
    disabled: 'rgba(0, 0, 0, 0.12)'
  },
  margin: -3
}), _THEMES);
var script = {
  name: 'OnoffToggle',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: THEME_DEFAULT
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onColor: {
      type: String
    },
    offColor: {
      type: String
    },
    thumbColor: {
      type: String
    },
    borderColor: {
      type: String
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    margin: {
      type: [Number, String]
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    themeInfo: function themeInfo() {
      return THEMES[this.theme] || THEMES[THEME_DEFAULT];
    },
    labelClass: function labelClass() {
      var classNames = ['v-toggle', 'v-toggle-' + this.theme, this.value ? 'on' : 'off'];

      if (this.disabled) {
        classNames.push('disabled');
      }

      return classNames;
    },
    labelStyle: function labelStyle() {
      var width = this.bodyWidth;
      var height = this.bodyHeight;
      var onColor = this.onColor || this.themeInfo.color.on;
      var offColor = this.offColor || this.themeInfo.color.off;
      var margin = Number(this.margin) || this.themeInfo.margin || 0;
      var borderColor = this.borderColor || this.themeInfo.color.border;
      var style = {
        width: px(width),
        height: px(height),
        borderRadius: px(height / 2),
        backgroundColor: this.value ? onColor : offColor
      };

      if (this.theme === THEME_IOS) {
        Object.assign(style, {
          backgroundColor: this.value ? onColor : offColor,
          boxShadow: "inset 0 0 0 ".concat(this.value ? height / 2 : 0, "px ").concat(onColor, ", 0 0 0 ").concat(margin, "px ").concat(this.value ? onColor : borderColor)
        });
      } else if (this.theme === THEME_MATERIAL) {
        if (this.disabled) {
          Object.assign(style, {
            backgroundColor: THEMES[THEME_MATERIAL].color.disabled,
            opacity: 1
          });
        } else if (this.value && !this.onColor && this.thumbColor) {
          style.backgroundColor = semiOpaqueColor(this.thumbColor, 0.5);
        }
      } else if (this.theme === THEME_DEFAULT && this.shadow) {
        style.boxShadow = "0px 4px 10px 0px ".concat(semiOpaqueColor(this.value ? onColor : offColor, 0.4));
      }

      return style;
    },
    thumbStyle: function thumbStyle() {
      var margin = Number(this.margin) || this.themeInfo.margin || 0;
      var size = this.bodyHeight - margin * 2;
      var color = this.thumbColor || this.themeInfo.color.thumb;
      var left = this.value ? this.bodyWidth - size - margin : margin;
      var borderColor = this.borderColor || this.themeInfo.color.border;
      var style = {
        width: px(size),
        height: px(size),
        left: px(left),
        top: px(margin),
        borderRadius: px(size / 2),
        backgroundColor: color,
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)'
      };

      if (this.theme === THEME_IOS) {
        Object.assign(style, {
          width: px(this.bodyHeight),
          height: px(this.bodyHeight),
          left: this.value ? "calc(100% - ".concat(this.bodyHeight, "px)") : px(0),
          top: px(0),
          borderRadius: px(this.bodyHeight / 2),
          backgroundColor: color,
          boxShadow: this.value ? "0 0 0 ".concat(margin, "px transparent, 0 3px 3px rgba(0, 0, 0, 0.3)") : "0 3px 3px rgba(0, 0, 0, 0.2), 0 0 0 ".concat(margin, "px ").concat(borderColor)
        });
      } else if (this.theme === THEME_MATERIAL) {
        Object.assign(style, {
          backgroundColor: this.value ? color : '#ffffff',
          transition: 'left 0.15s',
          boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
        });

        if (this.disabled) {
          style.backgroundColor = '#bdbdbd';
        }
      }

      return style;
    },
    bodyWidth: function bodyWidth() {
      return Number(this.width) || this.themeInfo.size.width;
    },
    bodyHeight: function bodyHeight() {
      return Number(this.height) || this.themeInfo.size.height;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    class: _vm.labelClass,
    style: _vm.labelStyle
  }, [_vm._ssrNode("<input type=\"checkbox\"" + _vm._ssrAttr("name", _vm.name) + _vm._ssrAttr("disabled", _vm.disabled) + _vm._ssrAttr("checked", _vm.value) + " data-v-78477d37> <div class=\"v-toggle_thumb\"" + _vm._ssrStyle(null, _vm.thumbStyle, null) + " data-v-78477d37></div>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-78477d37_0", {
    source: ".v-toggle[data-v-78477d37]{display:inline-block;position:relative;cursor:pointer;transition:all .3s}.v-toggle.disabled[data-v-78477d37]{opacity:.5;cursor:auto}.v-toggle input[data-v-78477d37]{margin:0;padding:0;width:0;height:0;opacity:0;outline:0}.v-toggle_thumb[data-v-78477d37]{position:absolute;transition:all .3s}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-78477d37";
/* module identifier */

var __vue_module_identifier__ = "data-v-78477d37";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,OnoffToggle: __vue_component__});var install = function installVueOnoffToggle(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.OnoffToggle=__vue_component__;exports.default=plugin;