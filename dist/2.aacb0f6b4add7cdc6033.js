webpackJsonp([2],{

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(597)
}
var Component = __webpack_require__(28)(
  /* script */
  __webpack_require__(590),
  /* template */
  __webpack_require__(606),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7c2dbdd6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(425)(false);
// imports


// module
exports.push([module.i, ".title[data-v-74eeaab7]{padding:5px 0;overflow:hidden;text-overflow:collapse}.title h3[data-v-74eeaab7]{text-align:center;font-size:15px;margin:0}.bg[data-v-74eeaab7]{background:rgba(0,0,0,.8)}.video[data-v-74eeaab7]{width:320px;border:3px solid #000;box-sizing:border-box;margin:10px auto}.download-buttons[data-v-74eeaab7]{height:100%;width:100%}.download-buttons .f[data-v-74eeaab7]{border:2px solid #f6b6c0;border-radius:10px;padding:6px 10px}.download-buttons .f[data-v-74eeaab7]:hover{background:rgba(246,182,192,.2);cursor:pointer}.download-buttons i[data-v-74eeaab7]{color:#f6b6c0}.thumb[data-v-74eeaab7]{width:100%;margin:0 auto;height:0;padding-bottom:56.25%;position:relative;display:inline-table}.thumb .bg[data-v-74eeaab7],.thumb .dur[data-v-74eeaab7],.thumb img[data-v-74eeaab7]{position:absolute;top:0;left:0;height:100%;width:100%}.thumb .dur[data-v-74eeaab7]{height:15%;width:15%;font-size:15px;left:80%;top:10%;background:#36070e}.thumb .progBar[data-v-74eeaab7]{position:absolute;bottom:0;left:0;height:4px;transition:all .2s ease}.thumb .progBar.g[data-v-74eeaab7]{background:green}.thumb .progBar.r[data-v-74eeaab7]{background:red}.wave[data-v-74eeaab7]{width:320px}.wave div[data-v-74eeaab7]{overflow:hidden}.wave img[data-v-74eeaab7]{width:320px;height:80px}.stats[data-v-74eeaab7]{-ms-flex-pack:justify;justify-content:space-between;white-space:nowrap;width:90%}.message.error[data-v-74eeaab7]{border-color:#36070e}", ""]);

// exports


/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

exports.default = {
	name: 'thumbVideo',
	components: {},

	props: {
		"v": {},
		"w": {
			type: String,
			default: '320px'
		}
	},
	data: function data() {
		return {};
	},
	mounted: function mounted() {},

	methods: {
		goToDownload: function goToDownload() {
			if (typeof this.v.title !== 'string') this.v.title = 'no_title';
			this.$router.push({
				name: 'download',
				params: {
					id: this.v._id,
					title: encodeURI(this.v.title.split(' ').join('_'))
				}
			});
		}
	}
};

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(433);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(426)("00b5c1ba", content, true, {});

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(435)
}
var Component = __webpack_require__(28)(
  /* script */
  __webpack_require__(434),
  /* template */
  __webpack_require__(437),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-74eeaab7",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 437:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "f fc video",
    style: ({
      width: _vm.w
    }),
    attrs: {
      "id": 'vid' + _vm.v._id
    }
  }, [_c('div', {
    staticClass: "thumb"
  }, [_c('img', {
    attrs: {
      "src": _vm.v.img
    },
    on: {
      "click": function($event) {
        return _vm.goToDownload()
      }
    }
  }), _c('div', {
    staticClass: "dur f"
  }, [_vm._v(_vm._s(_vm.v.dur))])]), _c('div', {
    staticClass: "title"
  }, [_c('h3', [_vm._v(_vm._s(_vm.v.title))])])])
},staticRenderFns: []}

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(425)(false);
// imports


// module
exports.push([module.i, ".loading-wave-dots[data-v-2e972d0b]{position:relative}.loading-wave-dots[data-v-2e972d0b] .wave-item{position:absolute;top:50%;left:50%;display:inline-block;margin-top:-4px;width:8px;height:8px;border-radius:50%;-webkit-animation:loading-wave-dots-data-v-2e972d0b linear 2.8s infinite;animation:loading-wave-dots-data-v-2e972d0b linear 2.8s infinite}.loading-wave-dots[data-v-2e972d0b] .wave-item:first-child{margin-left:-36px}.loading-wave-dots[data-v-2e972d0b] .wave-item:nth-child(2){margin-left:-20px;-webkit-animation-delay:.14s;animation-delay:.14s}.loading-wave-dots[data-v-2e972d0b] .wave-item:nth-child(3){margin-left:-4px;-webkit-animation-delay:.28s;animation-delay:.28s}.loading-wave-dots[data-v-2e972d0b] .wave-item:nth-child(4){margin-left:12px;-webkit-animation-delay:.42s;animation-delay:.42s}.loading-wave-dots[data-v-2e972d0b] .wave-item:last-child{margin-left:28px;-webkit-animation-delay:.56s;animation-delay:.56s}@-webkit-keyframes loading-wave-dots{0%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}10%{-webkit-transform:translateY(-6px);transform:translateY(-6px);background:#999}20%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}to{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}}@keyframes loading-wave-dots-data-v-2e972d0b{0%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}10%{-webkit-transform:translateY(-6px);transform:translateY(-6px);background:#999}20%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}to{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}}.loading-circles[data-v-2e972d0b] .circle-item{width:5px;height:5px;-webkit-animation:loading-circles-data-v-2e972d0b linear .75s infinite;animation:loading-circles-data-v-2e972d0b linear .75s infinite}.loading-circles[data-v-2e972d0b] .circle-item:first-child{margin-top:-14.5px;margin-left:-2.5px}.loading-circles[data-v-2e972d0b] .circle-item:nth-child(2){margin-top:-11.26px;margin-left:6.26px}.loading-circles[data-v-2e972d0b] .circle-item:nth-child(3){margin-top:-2.5px;margin-left:9.5px}.loading-circles[data-v-2e972d0b] .circle-item:nth-child(4){margin-top:6.26px;margin-left:6.26px}.loading-circles[data-v-2e972d0b] .circle-item:nth-child(5){margin-top:9.5px;margin-left:-2.5px}.loading-circles[data-v-2e972d0b] .circle-item:nth-child(6){margin-top:6.26px;margin-left:-11.26px}.loading-circles[data-v-2e972d0b] .circle-item:nth-child(7){margin-top:-2.5px;margin-left:-14.5px}.loading-circles[data-v-2e972d0b] .circle-item:last-child{margin-top:-11.26px;margin-left:-11.26px}@-webkit-keyframes loading-circles{0%{background:#dfdfdf}90%{background:#505050}to{background:#dfdfdf}}@keyframes loading-circles-data-v-2e972d0b{0%{background:#dfdfdf}90%{background:#505050}to{background:#dfdfdf}}.loading-bubbles[data-v-2e972d0b] .bubble-item{background:#666;-webkit-animation:loading-bubbles-data-v-2e972d0b linear .75s infinite;animation:loading-bubbles-data-v-2e972d0b linear .75s infinite}.loading-bubbles[data-v-2e972d0b] .bubble-item:first-child{margin-top:-12.5px;margin-left:-.5px}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(2){margin-top:-9.26px;margin-left:8.26px}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(3){margin-top:-.5px;margin-left:11.5px}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(4){margin-top:8.26px;margin-left:8.26px}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(5){margin-top:11.5px;margin-left:-.5px}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(6){margin-top:8.26px;margin-left:-9.26px}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(7){margin-top:-.5px;margin-left:-12.5px}.loading-bubbles[data-v-2e972d0b] .bubble-item:last-child{margin-top:-9.26px;margin-left:-9.26px}@-webkit-keyframes loading-bubbles{0%{width:1px;height:1px;box-shadow:0 0 0 3px #666}90%{width:1px;height:1px;box-shadow:0 0 0 0 #666}to{width:1px;height:1px;box-shadow:0 0 0 3px #666}}@keyframes loading-bubbles-data-v-2e972d0b{0%{width:1px;height:1px;box-shadow:0 0 0 3px #666}90%{width:1px;height:1px;box-shadow:0 0 0 0 #666}to{width:1px;height:1px;box-shadow:0 0 0 3px #666}}.loading-default[data-v-2e972d0b]{position:relative;border:1px solid #999;-webkit-animation:loading-rotating-data-v-2e972d0b ease 1.5s infinite;animation:loading-rotating-data-v-2e972d0b ease 1.5s infinite}.loading-default[data-v-2e972d0b]:before{content:\"\";position:absolute;display:block;top:0;left:50%;margin-top:-3px;margin-left:-3px;width:6px;height:6px;background-color:#999;border-radius:50%}.loading-spiral[data-v-2e972d0b]{border:2px solid #777;border-right-color:transparent;-webkit-animation:loading-rotating-data-v-2e972d0b linear .85s infinite;animation:loading-rotating-data-v-2e972d0b linear .85s infinite}@-webkit-keyframes loading-rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading-rotating-data-v-2e972d0b{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.loading-bubbles[data-v-2e972d0b],.loading-circles[data-v-2e972d0b]{position:relative}.loading-bubbles[data-v-2e972d0b] .bubble-item,.loading-circles[data-v-2e972d0b] .circle-item{position:absolute;top:50%;left:50%;display:inline-block;border-radius:50%}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(2),.loading-circles[data-v-2e972d0b] .circle-item:nth-child(2){-webkit-animation-delay:93ms;animation-delay:93ms}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(3),.loading-circles[data-v-2e972d0b] .circle-item:nth-child(3){-webkit-animation-delay:.186s;animation-delay:.186s}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(4),.loading-circles[data-v-2e972d0b] .circle-item:nth-child(4){-webkit-animation-delay:.279s;animation-delay:.279s}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(5),.loading-circles[data-v-2e972d0b] .circle-item:nth-child(5){-webkit-animation-delay:.372s;animation-delay:.372s}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(6),.loading-circles[data-v-2e972d0b] .circle-item:nth-child(6){-webkit-animation-delay:.465s;animation-delay:.465s}.loading-bubbles[data-v-2e972d0b] .bubble-item:nth-child(7),.loading-circles[data-v-2e972d0b] .circle-item:nth-child(7){-webkit-animation-delay:.558s;animation-delay:.558s}.loading-bubbles[data-v-2e972d0b] .bubble-item:last-child,.loading-circles[data-v-2e972d0b] .circle-item:last-child{-webkit-animation-delay:.651s;animation-delay:.651s}", ""]);

// exports


/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(425)(false);
// imports


// module
exports.push([module.i, ".spinner-wrapper[data-v-86e679b8]{transition:opacity .3s linear}.infinite-loading-container[data-v-86e679b8]{clear:both;text-align:center}.infinite-loading-container[data-v-86e679b8] [class^=loading-]{display:inline-block;margin:15px 0;width:28px;height:28px;font-size:28px;line-height:28px;border-radius:50%}.infinite-status-prompt[data-v-86e679b8]{color:#666;font-size:14px;text-align:center;padding:10px 0}", ""]);

// exports


/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//

var _config = __webpack_require__(450);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPINNERS = {
  BUBBLES: {
    render: function render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-bubbles'
        }
      }, Array.apply(Array, Array(8)).map(function () {
        return createElement('span', {
          attrs: {
            class: 'bubble-item'
          }
        });
      }));
    }
  },
  CIRCLES: {
    render: function render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-circles'
        }
      }, Array.apply(Array, Array(8)).map(function () {
        return createElement('span', {
          attrs: {
            class: 'circle-item'
          }
        });
      }));
    }
  },
  DEFAULT: {
    render: function render(createElement) {
      return createElement('i', {
        attrs: {
          class: 'loading-default'
        }
      });
    }
  },
  SPIRAL: {
    render: function render(createElement) {
      return createElement('i', {
        attrs: {
          class: 'loading-spiral'
        }
      });
    }
  },
  WAVEDOTS: {
    render: function render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-wave-dots'
        }
      }, Array.apply(Array, Array(5)).map(function () {
        return createElement('span', {
          attrs: {
            class: 'wave-item'
          }
        });
      }));
    }
  }
};

exports.default = {
  name: 'Spinner',
  computed: {
    spinnerView: function spinnerView() {
      return SPINNERS[(this.$attrs.spinner || '').toUpperCase()] || this.spinnerInConfig // fallback to spinner of config
      ;
    },
    spinnerInConfig: function spinnerInConfig() {
      var result = void 0;

      if (_config2.default.slots.spinner && typeof _config2.default.slots.spinner === 'string') {
        // as spinner slot config a pure text spinner
        result = {
          render: function render() {
            return this._v(_config2.default.slots.spinner); // eslint-disable-line no-underscore-dangle
          }
        };
      } else if (_typeof(_config2.default.slots.spinner) === 'object') {
        // as spinner slot config a Vue component
        result = _config2.default.slots.spinner;
      } else {
        // fallback to spinner property config
        /* istanbul ignore next */
        result = SPINNERS[_config2.default.props.spinner.toUpperCase()] || SPINNERS.DEFAULT;
      }

      return result;
    }
  }
};

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxLite = __webpack_require__(149);

var _Spinner = __webpack_require__(446);

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = {
  components: { spinner: _Spinner2.default },
  data: function data() {
    var _this = this;

    return {
      sub: null,
      isLoading: false,
      isNoMore: false,
      isNoResults: false,
      stateChanger: {
        loaded: function loaded() {
          _this.$emit('$InfiniteLoading:loaded', { target: _this });
        },
        complete: function complete() {
          _this.$emit('$InfiniteLoading:complete', { target: _this });
        },
        reset: function reset() {
          _this.$emit('$InfiniteLoading:reset', { target: _this });
        }
      }
    };
  },

  props: {
    spinner: {
      type: String
    },
    distance: {
      type: Number,
      default: 0
    }
  },
  methods: {},
  mounted: function mounted() {
    var _this2 = this;

    this.sub = new _rxLite.Observable.fromEvent(this.$el.parentNode, 'scroll').debounce(300).subscribe(function (n) {
      try {
        var distance = ~~(_this2.$el.getBoundingClientRect().bottom - _this2.$el.parentNode.getBoundingClientRect().bottom);
        console.log(distance);
        if (distance <= _this2.distance) {
          _this2.$emit('infinite', _this2.stateChanger);
        }
      } catch (e) {}
    });

    this.$on('$InfiniteLoading:loaded', function (ev) {
      _this2.isFirstLoad = false;
      if (_this2.isLoading) {
        _this2.$nextTick(_this2.attemptLoad.bind(null, true));
      }
      if (!ev || ev.target !== _this2) {
        console.warn(WARNINGS.STATE_CHANGER);
      }
    });
    this.$on('$InfiniteLoading:complete', function (ev) {
      _this2.isLoading = false;
      _this2.isComplete = true;
      // force re-complation computed properties to fix the problem of get slot text delay
      _this2.$nextTick(function () {
        _this2.$forceUpdate();
      });
      _this2.scrollParent.removeEventListener('scroll', _this2.scrollHandler);
      if (!ev || ev.target !== _this2) {
        console.warn(WARNINGS.STATE_CHANGER);
      }
    });
  },
  destroyed: function destroyed() {
    // this.sub._unsubscribe()
  }
};
/* eslint-disable no-console */

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(440);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(426)("6cbfdd7f", content, true, {});

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(441);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(426)("19e7b262", content, true, {});

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(444)
}
var Component = __webpack_require__(28)(
  /* script */
  __webpack_require__(442),
  /* template */
  __webpack_require__(448),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2e972d0b",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(445)
}
var Component = __webpack_require__(28)(
  /* script */
  __webpack_require__(443),
  /* template */
  __webpack_require__(449),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-86e679b8",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 448:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.spinnerView, {
    tag: "component"
  })
},staticRenderFns: []}

/***/ }),

/***/ 449:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "infinite-loading-container"
  }, [_c('div', {
    staticClass: "spinner-wrapper",
    class: {
      transparent: !_vm.isLoading
    }
  }, [_vm._t("spinner", [_c('spinner', {
    attrs: {
      "spinner": _vm.spinner
    }
  })])], 2), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isNoResults),
      expression: "isNoResults"
    }],
    staticClass: "infinite-status-prompt"
  }, [_vm._t("no-results", [_vm._v("No results :(")])], 2), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isNoMore),
      expression: "isNoMore"
    }],
    staticClass: "infinite-status-prompt"
  }, [_vm._t("no-more", [_vm._v("No more data :)")])], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*
 * default property values
 */

const props = {
  // the default spinner type
  spinner: 'default',

  // the default critical distance
  distance: 100,

  // the default force use infinite wrapper flag
  forceUseInfiniteWrapper: false,
};

/**
 * default system settings
 */

const system = {
  // the default throttle space of time
  throttleLimit: 50,

  // the timeout for check infinite loop, unit: ms
  loopCheckTimeout: 1000,

  // the max allowed number of continuous calls, unit: ms
  loopCheckMaxCalls: 10,
};

/**
 * default slot messages
 */
const slots = {
  noResults: 'No results :(',
  noMore: 'No more data :)',
  error: 'Opps, something went wrong :(',
  errorBtnText: 'Retry',
  spinner: '',
};

/**
 * the 3rd argument for event bundler
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */

const evt3rdArg = (() => {
  let result = false;

  try {
    const arg = Object.defineProperty({}, 'passive', {
      get() {
        result = { passive: true };
        return true;
      },
    });

    window.addEventListener('testpassive', arg, arg);
    window.remove('testpassive', arg, arg);
  } catch (e) { /* */ }

  return result;
})();
/* harmony export (immutable) */ __webpack_exports__["evt3rdArg"] = evt3rdArg;


/**
 * warning messages
 */

const WARNINGS = {
  STATE_CHANGER: [
    'emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):',
    '\ntemplate:',
    '<infinite-loading @infinite="infiniteHandler"></infinite-loading>',
    `
script:
...
infiniteHandler($state) {
  ajax('https://www.example.com/api/news')
    .then((res) => {
      if (res.data.length) {
        $state.loaded();
      } else {
        $state.complete();
      }
    });
}
...`,
    '',
    'more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549',
  ].join('\n'),
  INFINITE_EVENT: '`:on-infinite` property will be deprecated soon, please use `@infinite` event instead.',
  IDENTIFIER: 'the `reset` event will be deprecated soon, please reset this component by change the `identifier` property.',
};
/* harmony export (immutable) */ __webpack_exports__["WARNINGS"] = WARNINGS;


/**
 * error messages
 */

const ERRORS = {
  INFINITE_LOOP: [
    `executed the callback function more than ${system.loopCheckMaxCalls} times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:`,
    `
<!-- add a special attribute for the real scroll wrapper -->
<div infinite-wrapper>
  ...
  <!-- set force-use-infinite-wrapper -->
  <infinite-loading force-use-infinite-wrapper></infinite-loading>
</div>
or
<div class="infinite-wrapper">
  ...
  <!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper -->
  <infinite-loading force-use-infinite-wrapper=".infinite-wrapper"></infinite-loading>
</div>
    `,
    'more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169',
  ].join('\n'),
};
/* harmony export (immutable) */ __webpack_exports__["ERRORS"] = ERRORS;


/**
 * plugin status constants
 */
const STATUS = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3,
};
/* harmony export (immutable) */ __webpack_exports__["STATUS"] = STATUS;


/**
 * default slot styles
 */
const SLOT_STYLES = {
  color: '#666',
  fontSize: '14px',
  padding: '10px 0',
};
/* harmony export (immutable) */ __webpack_exports__["SLOT_STYLES"] = SLOT_STYLES;


/* harmony default export */ __webpack_exports__["default"] = ({
  mode: 'development',
  props,
  system,
  slots,
  WARNINGS,
  ERRORS,
  STATUS,
});


/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(425)(false);
// imports


// module
exports.push([module.i, "#home[data-v-7c2dbdd6]{overflow-y:auto}", ""]);

// exports


/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
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

var _loading = __webpack_require__(150);

var _loading2 = _interopRequireDefault(_loading);

var _video = __webpack_require__(436);

var _video2 = _interopRequireDefault(_video);

var _rxLite = __webpack_require__(149);

var _InfiniteLoading = __webpack_require__(447);

var _InfiniteLoading2 = _interopRequireDefault(_InfiniteLoading);

var _vuex = __webpack_require__(50);

var _mobx = __webpack_require__(103);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: "home",
	components: {
		'thumb-video': _video2.default,
		'loading': _loading2.default,
		'vue-inf': _InfiniteLoading2.default
	},
	computed: _extends({}, (0, _vuex.mapState)(['isConnected', 'thumbnails'])),
	data: function data() {
		return {
			vs: [],
			page: 1
		};
	},

	methods: {
		nextLastPage: function nextLastPage(p) {
			var _this = this;

			setTimeout(function () {
				_this.$socket.emit('last', _this.page);
			});
		}
	},
	sockets: {
		lastEnded: function lastEnded() {
			this.page++;
		}

	},
	mounted: function mounted() {
		var _this2 = this;

		(0, _mobx.when)(function () {
			return _this2.$connState.get() == 'connect';
		}).then(function () {
			_this2.nextLastPage();
		});
		console.log('mobx');
		this.$store.commit('addThumbnail', false);
	}
};

/***/ }),

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(584);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(426)("41a8d488", content, true, {});

/***/ }),

/***/ 606:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "home"
    }
  }, [(_vm.thumbnails.length > 0) ? _c('div', {
    staticClass: "results f fc"
  }, _vm._l((_vm.thumbnails), function(v) {
    return (v._id) ? _c('thumb-video', {
      key: v._id,
      attrs: {
        "v": v
      }
    }) : _vm._e()
  }), 1) : _c('div', [(_vm.isConnected) ? _c('loading') : _vm._e()], 1), (_vm.thumbnails.length > 0) ? _c('vue-inf', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "distance": 0
    },
    on: {
      "infinite": _vm.nextLastPage
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ })

});