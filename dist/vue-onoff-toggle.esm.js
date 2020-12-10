function parseColor(c) {
  let cache;
  const p = parseInt,
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
  return typeof val === 'number' ? `${val}px` : val;
}
function semiOpaqueColor(color, opacity) {
  const rgba = parseColor(color);
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] * opacity})`;
}

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
const THEME_DEFAULT = 'default';
const THEME_IOS = 'ios';
const THEME_MATERIAL = 'material';
const THEMES = {
  [THEME_DEFAULT]: {
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
  },
  [THEME_IOS]: {
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
  },
  [THEME_MATERIAL]: {
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
  }
};
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
    themeInfo() {
      return THEMES[this.theme] || THEMES[THEME_DEFAULT];
    },

    labelClass() {
      const classNames = ['v-toggle', 'v-toggle-' + this.theme, this.value ? 'on' : 'off'];

      if (this.disabled) {
        classNames.push('disabled');
      }

      return classNames;
    },

    labelStyle() {
      const width = this.bodyWidth;
      const height = this.bodyHeight;
      const onColor = this.onColor || this.themeInfo.color.on;
      const offColor = this.offColor || this.themeInfo.color.off;
      const margin = Number(this.margin) || this.themeInfo.margin || 0;
      const borderColor = this.borderColor || this.themeInfo.color.border;
      const style = {
        width: px(width),
        height: px(height),
        borderRadius: px(height / 2),
        backgroundColor: this.value ? onColor : offColor
      };

      if (this.theme === THEME_IOS) {
        Object.assign(style, {
          backgroundColor: this.value ? onColor : offColor,
          boxShadow: `inset 0 0 0 ${this.value ? height / 2 : 0}px ${onColor}, 0 0 0 ${margin}px ${this.value ? onColor : borderColor}`
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
        style.boxShadow = `0px 4px 10px 0px ${semiOpaqueColor(this.value ? onColor : offColor, 0.4)}`;
      }

      return style;
    },

    thumbStyle() {
      const margin = Number(this.margin) || this.themeInfo.margin || 0;
      const size = this.bodyHeight - margin * 2;
      const color = this.thumbColor || this.themeInfo.color.thumb;
      const left = this.value ? this.bodyWidth - size - margin : margin;
      const borderColor = this.borderColor || this.themeInfo.color.border;
      const style = {
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
          left: this.value ? `calc(100% - ${this.bodyHeight}px)` : px(0),
          top: px(0),
          borderRadius: px(this.bodyHeight / 2),
          backgroundColor: color,
          boxShadow: this.value ? `0 0 0 ${margin}px transparent, 0 3px 3px rgba(0, 0, 0, 0.3)` : `0 3px 3px rgba(0, 0, 0, 0.2), 0 0 0 ${margin}px ${borderColor}`
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

    bodyWidth() {
      return Number(this.width) || this.themeInfo.size.width;
    },

    bodyHeight() {
      return Number(this.height) || this.themeInfo.size.height;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    class: _vm.labelClass,
    style: _vm.labelStyle
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": _vm.name,
      "disabled": _vm.disabled
    },
    domProps: {
      "checked": _vm.value
    },
    on: {
      "change": function ($event) {
        return _vm.$emit('input', $event.target.checked);
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "v-toggle_thumb",
    style: _vm.thumbStyle
  })]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-78477d37_0", {
    source: ".v-toggle[data-v-78477d37]{display:inline-block;position:relative;cursor:pointer;transition:all .3s}.v-toggle.disabled[data-v-78477d37]{opacity:.5;cursor:auto}.v-toggle input[data-v-78477d37]{margin:0;padding:0;width:0;height:0;opacity:0;outline:0}.v-toggle_thumb[data-v-78477d37]{position:absolute;transition:all .3s}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-78477d37";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  OnoffToggle: __vue_component__
});

// Import vue components

const install = function installVueOnoffToggle(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as OnoffToggle };
