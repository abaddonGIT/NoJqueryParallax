(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Abaddon on 23.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _UsesFunction = require('../utility/UsesFunction');

var _UsesFunction2 = _interopRequireDefault(_UsesFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseParallax = function () {
    function BaseParallax() {
        _classCallCheck(this, BaseParallax);
    }

    _createClass(BaseParallax, [{
        key: 'start',

        /**
         * Start parallax
         */
        value: function start() {
            this.setViewProps();
        }

        /**
         * Set window properties
         */

    }, {
        key: 'setViewProps',
        value: function setViewProps() {
            this.view = _UsesFunction2.default.getView();
        }

        /**
         * Resize event handler
         */

    }, {
        key: 'resizeTick',
        value: function resizeTick() {
            this.view.width = this.view.element.offsetWidth;
            this.view.height = this.view.element.clientHeight;

            this.setPosition();
            if (this.box.isResize()) {
                this.box.setBaseHeight(this.determineBoxHeight());
                this.setInnerStyle();
            }
            this.scrollTick();
        }

        /**
         * Scroll event handler
         * @private
         */

    }, {
        key: 'scrollTick',
        value: function scrollTick() {
            if (this.box.isParallax() && !_UsesFunction2.default.isLiteMode() && this.box.getInner()) {
                var scrollTop = void 0,
                    start = void 0,
                    end = void 0,
                    offsetTop = void 0;

                offsetTop = this.getOffset(this.box.getItem()).top;
                scrollTop = this.view.w.pageYOffset || this.view.element.scrollTop;

                start = scrollTop + this.view.height;
                end = scrollTop - this.box.getItem().offsetHeight;

                if (start > offsetTop && end < offsetTop) {
                    var y = scrollTop - offsetTop,
                        newPosition = void 0;

                    if (!this.box.isInvert()) {
                        newPosition = parseInt(y / this.box.getRatio());
                    } else {
                        newPosition = -parseInt(y / this.box.getRatio()) - parseInt(this.view.height / this.box.getRatio());
                    }

                    this.box.getInner().style.cssText += this.getTransformStyles(newPosition);
                }
            }
        }

        /**
         * Get position styles
         * @param position
         * @returns {string}
         */

    }, {
        key: 'getTransformStyles',
        value: function getTransformStyles(position) {
            var ie = _UsesFunction2.default.ieVersion();
            if ((ie === -1 || ie > 9) && !_UsesFunction2.default.isSafari()) {
                return 'transform: translate3d(0, ' + position + 'px, 0);';
            } else {
                return 'top: ' + position + 'px;';
            }
        }

        /**
         * Set element position
         */

    }, {
        key: 'setPosition',
        value: function setPosition() {
            this.box.getItem().style.cssText = ' width: ' + this.view.width + 'px; margin-left: ' + Math.floor(this.view.width * -0.5) + 'px; left: 50%;';
        }

        /**
         * Determine parallax block height
         */

    }, {
        key: 'determineBoxHeight',
        value: function determineBoxHeight() {
            var newHeight = 0,
                height = this.box.getItem().offsetHeight;
            switch (this.box.getType()) {
                case 'normal':
                    newHeight = height + parseInt((this.view.height - height) / this.box.getRatio());
                    break;
                case 'invert':
                    newHeight = height + parseInt((this.view.height + height) / this.box.getRatio());
                    break;
            }
            return newHeight;
        }

        /**
         * Set inner bg style
         */

    }, {
        key: 'setInnerStyle',
        value: function setInnerStyle() {
            if (this.box.getInner() && this.box.getOricSizes()) {
                var obj = this.box.getInner(),
                    sizes = this.box.getOricSizes(),
                    imageRatio = void 0,
                    newImgWidth = void 0,
                    newImgHeight = void 0,
                    newImgTop = void 0,
                    newImgLeft = void 0;

                imageRatio = sizes.height / sizes.width;
                var containerRatio = this.box.getBaseHeight() / this.view.width;

                if (containerRatio > imageRatio) {
                    newImgHeight = this.box.getBaseHeight();
                    newImgWidth = Math.round(newImgHeight * sizes.width / sizes.height);
                } else {
                    newImgWidth = this.view.width;
                    newImgHeight = Math.round(newImgWidth * sizes.height / sizes.width);
                }

                newImgLeft = -(newImgWidth - this.view.width) * .5;
                newImgTop = -(newImgHeight - this.box.getBaseHeight()) * .5;

                obj.style.cssText += 'width: ' + newImgWidth + 'px; height: ' + newImgHeight + 'px; margin-top: ' + newImgTop + 'px; margin-left: ' + newImgLeft + 'px;';
            }
        }

        /**
         * Get element position
         */

    }, {
        key: 'getOffset',
        value: function getOffset() {
            var box = this.box.getItem().getBoundingClientRect(),
                body = this.view.d.body,
                docElem = this.view.element;

            var scrollTop = this.view.w.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = this.view.w.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0;

            return {
                top: Math.round(box.top + scrollTop - clientTop),
                left: Math.round(box.left + scrollLeft - clientLeft)
            };
        }

        /**
         * Load background image
         */

    }, {
        key: 'loadImg',
        value: function loadImg(resolve, reject) {
            var _this = this;

            var img = this.createImage(),
                self = this;
            img.onload = function () {
                self.box.setOricSizes({ width: img.width, height: img.height });
                self.setInner();
                resolve.call(_this);
            };
            img.onerror = function () {
                reject();
            };
        }

        /**
         * Create and return image object
         * @returns {*}
         */

    }, {
        key: 'createImage',
        value: function createImage() {
            var img = new Image();
            img.src = this.box.getUrl();
            return img;
        }

        /**
         * Create inner structure
         */

    }, {
        key: 'setInner',
        value: function setInner() {
            if (!_UsesFunction2.default.isLiteMode()) {
                this.box.getItem().innerHTML = "<div class='parallax-bg-inner'></div>";
                this.box.getInner().style.cssText += 'background-image: url(' + this.box.getUrl() + ');';
            } else {
                this.box.getItem().innerHTML = '<img class=\'parallax-bg-inner\' src=\'' + this.box.getUrl() + '\' alt=\'\'/>';
                this.box.setRatio(1);
            }
        }
    }]);

    return BaseParallax;
}();

exports.default = BaseParallax;

},{"../utility/UsesFunction":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseParallax = require("./BaseParallax");

var _BaseParallax2 = _interopRequireDefault(_BaseParallax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Abaddon on 23.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ContentParallax = function (_Base) {
    _inherits(ContentParallax, _Base);

    function ContentParallax(box) {
        _classCallCheck(this, ContentParallax);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContentParallax).call(this));

        _this.box = box;
        return _this;
    }

    /**
     * Start parallax
     */


    _createClass(ContentParallax, [{
        key: "start",
        value: function start() {
            _get(Object.getPrototypeOf(ContentParallax.prototype), "start", this).call(this);
        }

        /**
         * Load content
         */

    }, {
        key: "loadContent",
        value: function loadContent() {
            this.setBlock();
        }

        /**
         * Calc and set sizes for block
         */

    }, {
        key: "setBlock",
        value: function setBlock() {
            this.resizeTick();
        }
    }]);

    return ContentParallax;
}(_BaseParallax2.default);

exports.default = ContentParallax;

},{"./BaseParallax":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseParallax = require("./BaseParallax");

var _BaseParallax2 = _interopRequireDefault(_BaseParallax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Abaddon on 23.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ImageParallax = function (_Base) {
    _inherits(ImageParallax, _Base);

    function ImageParallax(box) {
        _classCallCheck(this, ImageParallax);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageParallax).call(this));

        _this.box = box;
        return _this;
    }

    /**
     * Start parallax
     */


    _createClass(ImageParallax, [{
        key: "start",
        value: function start() {
            _get(Object.getPrototypeOf(ImageParallax.prototype), "start", this).call(this);
            this.loadImg(function () {
                this.setBlock();
            }, function () {
                console.error("Source load error!");
            });
        }

        /**
         * Calc and set sizes for block
         */

    }, {
        key: "setBlock",
        value: function setBlock() {
            this.resizeTick();
        }
    }]);

    return ImageParallax;
}(_BaseParallax2.default);

exports.default = ImageParallax;

},{"./BaseParallax":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Abaddon on 23.08.2016.
 */
var ParallaxBox = function () {
    function ParallaxBox(box, selector) {
        _classCallCheck(this, ParallaxBox);

        this.el = box.querySelector(selector);
        this.box = box;
        this.parallax = true;
        this.type = "none";
        this.setInvert(this.el.getAttribute("data-invert"));
        this.sourceType = this.el.getAttribute("data-parallax-type");
        this.setSpeed(this.el.getAttribute("data-speed"));
        this.url = this.el.getAttribute("data-img-url");
        this.resize = true;
        this.baseHeight = 0;
    }

    /**
     * Remove video element
     */


    _createClass(ParallaxBox, [{
        key: "removeVideo",
        value: function removeVideo() {
            this.el.removeChild(this.getInner());
        }

        /**
         * Save block height
         * @param value
         */

    }, {
        key: "setBaseHeight",
        value: function setBaseHeight(value) {
            this.baseHeight = value;
        }

        /**
         * Return block height
         * @returns {number|*}
         */

    }, {
        key: "getBaseHeight",
        value: function getBaseHeight() {
            return this.baseHeight;
        }

        /**
         * Set resize flag
         * @param value
         */

    }, {
        key: "setResize",
        value: function setResize(value) {
            this.resize = value;
        }

        /**
         * Check resize flag
         * @returns {boolean|*}
         */

    }, {
        key: "isResize",
        value: function isResize() {
            return this.resize;
        }

        /**
         * Save parallax type
         * @param value
         */

    }, {
        key: "setType",
        value: function setType(value) {
            this.type = value;
        }

        /**
         * Return parallax type
         * @returns {string|string|*|string}
         */

    }, {
        key: "getType",
        value: function getType() {
            return this.type;
        }

        /**
         * Return parallax dom element
         * @returns {Element|*}
         */

    }, {
        key: "getItem",
        value: function getItem() {
            return this.el;
        }

        /**
         * Return parallax inner dom element
         * @returns {Element|*}
         */

    }, {
        key: "getInner",
        value: function getInner() {
            if (this.inner) {
                return this.inner;
            } else {
                switch (this.sourceType) {
                    case "video":
                        this.inner = this.el.querySelector("video");
                        this.sources = this.inner.querySelectorAll("source");
                        break;
                    case "image":
                        this.inner = this.el.querySelector(".parallax-bg-inner");
                        break;
                    case "content":
                        this.inner = this.el.querySelector(".js-parallax-inner");
                        break;
                }
                return this.inner;
            }
        }

        /**
         * Save parallax invert flag
         * @param value
         */

    }, {
        key: "setInvert",
        value: function setInvert(value) {
            if (value === "true") {
                this.type = "invert";
            } else {
                this.type = "normal";
            }
            this.invert = value;
        }

        /**
         * Check invert flag
         * @returns {boolean}
         */

    }, {
        key: "isInvert",
        value: function isInvert() {
            return this.invert === "true";
        }

        /**
         * Set parallax effect speed
         * @param value
         */

    }, {
        key: "setSpeed",
        value: function setSpeed(value) {
            switch (value) {
                case "low":
                    this.setRatio(3);
                    break;
                case "normal":
                    this.setRatio(2.25);
                    break;
                case "hight":
                    this.setRatio(1.5);
                    break;
                default:
                    this.setRatio(2.25);
            }
            this.speed = value;
        }

        /**
         * Return current speed
         * @returns {*}
         */

    }, {
        key: "getSpeed",
        value: function getSpeed() {
            return this.speed;
        }

        /**
         * Set source ratio
         * @param value
         */

    }, {
        key: "setRatio",
        value: function setRatio(value) {
            this.bufferRatio = value;
        }

        /**
         * Get current ratio
         * @returns {*}
         */

    }, {
        key: "getRatio",
        value: function getRatio() {
            return this.bufferRatio;
        }

        /**
         * Parallax source type
         * @returns {string|*}
         */

    }, {
        key: "getSourceType",
        value: function getSourceType() {
            return this.sourceType;
        }

        /**
         * Set parallax flag
         * @param value
         */

    }, {
        key: "setParallax",
        value: function setParallax(value) {
            this.parallax = value;
        }

        /**
         * Run parallax flag
         * @returns {*|boolean}
         */

    }, {
        key: "isParallax",
        value: function isParallax() {
            return this.parallax;
        }

        /**
         * Get source url
         * @returns {string|*}
         */

    }, {
        key: "getUrl",
        value: function getUrl() {
            return this.url;
        }

        /**
         * Save original size
         * @param value
         */

    }, {
        key: "setOricSizes",
        value: function setOricSizes(value) {
            this.sizes = value;
        }

        /**
         * Return original size source
         * @returns {*}
         */

    }, {
        key: "getOricSizes",
        value: function getOricSizes() {
            return this.sizes;
        }
    }]);

    return ParallaxBox;
}();

exports.default = ParallaxBox;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Abaddon on 29.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _UsesFunction = require("../utility/UsesFunction");

var _UsesFunction2 = _interopRequireDefault(_UsesFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmoothScroll = function () {
    function SmoothScroll() {
        _classCallCheck(this, SmoothScroll);

        this.handler = null;
        this.targetY = 0;
        this.oldY = 0;
        this.currentY = 0;
        this.minScrollTop = 0;
        this.running = false;
        this.vy = 0;
        this.stepAmt = 1;
        this.minMove = 0.1;
        this.fricton = 0.97;
        this.direction = null;
        this.maxScrollTop = 0;

        window.requestAnimFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        }();
    }

    /**
     * Run
     */


    _createClass(SmoothScroll, [{
        key: "run",
        value: function run() {
            if (!_UsesFunction2.default.isLiteMode()) {
                this.handler = this.wheel.bind(this);
                _UsesFunction2.default.getView().element.addEventListener("mousewheel", this.handler, false);
                _UsesFunction2.default.getView().element.addEventListener("DOMMouseScroll", this.handler, false);

                this.targetY = this.oldY = window.pageYOffset || _UsesFunction2.default.getView().element.scrollTop;
                this.currentY = -this.targetY;
                this.minScrollTop = this.getMinScrollTop();
                this.running = true;
                this.animateTick();
            }
        }

        /**
         * Stop smooth scrolling
         */

    }, {
        key: "stop",
        value: function stop() {
            _UsesFunction2.default.getView().element.removeEventListener("mousewheel", this.handler, false);
            _UsesFunction2.default.getView().element.removeEventListener("DOMMouseScroll", this.handler, false);
            this.running = false;
        }

        /**
         * Update min scroll height
         */

    }, {
        key: "update",
        value: function update() {
            this.minScrollTop = this.getMinScrollTop();
        }

        /**
         * Resize window handler
         */

    }, {
        key: "resizeTick",
        value: function resizeTick() {
            this.minScrollTop = this.getMinScrollTop();
        }

        /**
         * Wheel handler
         */

    }, {
        key: "wheel",
        value: function wheel(evt) {
            evt.preventDefault();
            var wheelDelta = evt.wheelDelta;
            var delta = evt.detail ? evt.detail * -1 : wheelDelta / 40,
                dir = delta < 0 ? -1 : 1;
            if (dir != this.direction) {
                this.vy = 0;
                this.direction = dir;
            }

            this.currentY = -(window.pageYOffset || _UsesFunction2.default.getView().element.scrollTop);
            this.updateScrollTarget(delta);
        }

        /**
         * Get min scroll
         * @returns {number}
         */

    }, {
        key: "getMinScrollTop",
        value: function getMinScrollTop() {
            return Math.max(_UsesFunction2.default.getView().body.clientHeight, _UsesFunction2.default.getView().element.clientHeight) - _UsesFunction2.default.getScrollHeight();
        }

        /**
         * Animate handler
         */

    }, {
        key: "animateTick",
        value: function animateTick() {
            if (!this.running) return;
            requestAnimFrame(this.animateTick.bind(this));
            this.render();
        }

        /**
         * Update scroll position
         * @param delta
         */

    }, {
        key: "updateScrollTarget",
        value: function updateScrollTarget(delta) {
            this.targetY += delta;
            this.vy += (this.targetY - this.oldY) * this.stepAmt;
            this.oldY = this.targetY;
        }

        /**
         * Render scroll
         */

    }, {
        key: "render",
        value: function render() {
            if (this.vy < -this.minMove || this.vy > this.minMove) {
                this.currentY = this.currentY + this.vy;
                if (this.currentY > this.maxScrollTop) {
                    this.currentY = this.vy = 0;
                } else if (this.currentY < this.minScrollTop) {
                    this.vy = 0;
                    this.currentY = this.minScrollTop;
                }

                window.scrollTo(0, -this.currentY);
                this.vy *= this.fricton;
            }
        }
    }]);

    return SmoothScroll;
}();

exports.default = SmoothScroll;

},{"../utility/UsesFunction":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseParallax = require("./BaseParallax");

var _BaseParallax2 = _interopRequireDefault(_BaseParallax);

var _UsesFunction = require("../utility/UsesFunction");

var _UsesFunction2 = _interopRequireDefault(_UsesFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Abaddon on 23.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var VideoParallax = function (_Base) {
    _inherits(VideoParallax, _Base);

    function VideoParallax(box) {
        _classCallCheck(this, VideoParallax);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoParallax).call(this));

        _this.box = box;
        return _this;
    }

    /**
     * Start parallax
     */


    _createClass(VideoParallax, [{
        key: "start",
        value: function start() {
            _get(Object.getPrototypeOf(VideoParallax.prototype), "start", this).call(this);
            if (!_UsesFunction2.default.isLiteMode()) {
                this.loadVideo(function () {
                    this.setBlock();
                }, function () {
                    console.error("Source load error!");
                });
            } else {
                this.loadImg(function () {
                    this.setBlock();
                }, function () {
                    console.error("Source load error!");
                });
            }
        }

        /**
         * Load video source
         */

    }, {
        key: "loadVideo",
        value: function loadVideo(resolve, reject) {
            var _this2 = this;

            var video = this.box.getInner();
            video.load();
            video.play();
            this.setVideoTagSettings();
            video.onloadeddata = function () {
                _this2.box.setOricSizes({ width: video.videoWidth, height: video.videoHeight });
                resolve.call(_this2);
            };
            video.onerror = function () {
                reject();
            };
            //set sources error handlers
            var sourceLn = this.box.sources.length;
            if (sourceLn) {
                while (sourceLn--) {
                    var source = this.box.sources[sourceLn];
                    source.onerror = function () {
                        reject();
                    };
                }
            }
        }

        /**
         * Set video settings
         */

    }, {
        key: "setVideoTagSettings",
        value: function setVideoTagSettings() {
            var video = this.box.getInner(),
                loop = video.getAttribute("data-loop"),
                volume = parseInt(video.getAttribute("data-volume"));

            if (!isNaN(volume)) {
                video.volume = volume / 100;
            }

            if (loop === "true") {
                video.onended = function () {
                    video.pause();
                    video.currentTime = 0;
                    video.load();
                    video.play();
                };
            }
        }

        /**
         * Load img source
         */

    }, {
        key: "loadImg",
        value: function loadImg(resolve, reject) {
            this.box.removeVideo();
            return _get(Object.getPrototypeOf(VideoParallax.prototype), "loadImg", this).call(this, resolve, reject);
        }

        /**
         * Calc and set sizes for block
         */

    }, {
        key: "setBlock",
        value: function setBlock() {
            this.resizeTick();
        }
    }]);

    return VideoParallax;
}(_BaseParallax2.default);

exports.default = VideoParallax;

},{"../utility/UsesFunction":8,"./BaseParallax":1}],7:[function(require,module,exports){
(function (global){
/**
 * Created by Abaddon on 22.08.2016.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParallaxBox = require("./components/ParallaxBox");

var _ParallaxBox2 = _interopRequireDefault(_ParallaxBox);

var _UsesFunction = require("./utility/UsesFunction");

var _UsesFunction2 = _interopRequireDefault(_UsesFunction);

var _SmoothScroll = require("./components/SmoothScroll");

var _SmoothScroll2 = _interopRequireDefault(_SmoothScroll);

var _ImageParallax = require("./components/ImageParallax");

var _ImageParallax2 = _interopRequireDefault(_ImageParallax);

var _VideoParallax = require("./components/VideoParallax");

var _VideoParallax2 = _interopRequireDefault(_VideoParallax);

var _ContentParallax = require("./components/ContentParallax");

var _ContentParallax2 = _interopRequireDefault(_ContentParallax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoJqueryParallax = function () {
    function NoJqueryParallax(options) {
        _classCallCheck(this, NoJqueryParallax);

        this.parallaxInstances = [];
        this.smooth = {};
        this.observer = {};
        this.resizeDelay = null;
        //Set plugin options
        this.config = NoJqueryParallax.merge({
            box: ".js-parallax-box",
            bg: ".js-parallax-bg",
            smooth: true,
            observe: true
        }, options);
    }

    /**
     * Run parallax effect
     */


    _createClass(NoJqueryParallax, [{
        key: "run",
        value: function run() {
            this.sections = document.querySelectorAll(this.config.box);
            var ln = this.sections.length;
            if (!ln) return false;

            for (var i = 0; i < ln; i++) {
                var item = new _ParallaxBox2.default(this.sections[i], this.config.bg),
                    instance = null;
                switch (item.getSourceType()) {
                    case "image":
                        instance = new _ImageParallax2.default(item);
                        break;
                    case "video":
                        instance = new _VideoParallax2.default(item);
                        break;
                    case "content":
                        instance = new _ContentParallax2.default(item);
                        break;
                    default:
                }
                if (instance) {
                    instance.start();
                    this.parallaxInstances.push(instance);
                }
            }
            //Bind events
            this._subscribe();
        }

        /**
         * Ext object
         * @param self
         * @param source
         * @returns {*}
         */

    }, {
        key: "_subscribe",


        /**
         * Subscribe plugin for window events
         * @private
         */
        value: function _subscribe() {
            //Smooth scroll
            if (this.config.smooth) {
                this.smooth = new _SmoothScroll2.default();
                this.smooth.run();
                //Set dom observe
                if (this.config.observe) {
                    this.setObserve();
                }
            }
            //Scroll window
            if (!_UsesFunction2.default.isLiteMode()) {
                this.scFn = this._scrollTic.bind(this);
                window.addEventListener("scroll", this.scFn, false);
            }
            //Resize window
            this.rezFn = this._resizeTic.bind(this);
            window.addEventListener("resize", this.rezFn, false);
        }

        /**
         * Call handlers for scroll
         * @private
         */

    }, {
        key: "_scrollTic",
        value: function _scrollTic() {
            var ln = this.parallaxInstances.length;
            for (var i = 0; i < ln; i++) {
                this.parallaxInstances[i].scrollTick();
            }
        }

        /**
         * Set dom observe for rebuild smooth scroll
         * @private
         */

    }, {
        key: "setObserve",
        value: function setObserve() {
            var _this = this;

            try {
                (function () {
                    var self = _this;
                    _this.observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            if (mutation.type === "childList") {
                                self.smooth.update();
                            }
                        });
                    });

                    _this.observer.observe(document.body, {
                        childList: true
                    });
                })();
            } catch (e) {
                console.warn("Your browser not supported MutationObserve!");
            }
        }

        /**
         * Stop document observer
         */

    }, {
        key: "stopObserve",
        value: function stopObserve() {
            this.observer.disconnect();
        }

        /**
         * Call handlers when window change sizes
         * @private
         */

    }, {
        key: "_resizeTic",
        value: function _resizeTic() {
            var _this2 = this;

            var ln = this.parallaxInstances.length;
            clearTimeout(this.resizeDelay);
            this.resizeDelay = setTimeout(function () {
                for (var i = 0; i < ln; i++) {
                    _this2.parallaxInstances[i].resizeTick();
                }
                _this2.smooth.resizeTick();
            }, 500);
        }

        /**
         * Remove event handlers
         */

    }, {
        key: "stop",
        value: function stop() {
            window.removeEventListener("scroll", this.scFn, false);
            window.removeEventListener("resize", this.rezFn, false);
        }

        /**
         * Stop smooth scrolling
         */

    }, {
        key: "stopSmooth",
        value: function stopSmooth() {
            this.smooth.stop();
        }
    }], [{
        key: "merge",
        value: function merge(self, source) {
            for (var i in source) {
                if (source.hasOwnProperty(i)) {
                    self[i] = source[i];
                }
            }
            return self;
        }
    }]);

    return NoJqueryParallax;
}();

global.NoJqueryParallax = NoJqueryParallax;
exports.default = NoJqueryParallax;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/ContentParallax":2,"./components/ImageParallax":3,"./components/ParallaxBox":4,"./components/SmoothScroll":5,"./components/VideoParallax":6,"./utility/UsesFunction":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Abaddon on 28.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


require("./device");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsesFunction = function () {
    function UsesFunction() {
        _classCallCheck(this, UsesFunction);

        this.view = Object.defineProperties({}, {
            w: {
                value: window
            },
            d: {
                value: document
            },
            element: {
                set: function set(value) {
                    this._element = value;
                    this.width = this.element.offsetWidth;
                    this.height = this.element.clientHeight;
                },
                get: function get() {
                    return this._element;
                }
            }
        });
        this.view.element = this.view.d.documentElement;
        this.view.body = this.view.d.body;
    }

    /**
     * Return current page view
     * @returns {Object|*}
     */


    _createClass(UsesFunction, [{
        key: "getView",
        value: function getView() {
            return this.view;
        }

        /**
         * Return ie version
         * @returns {number}
         */

    }, {
        key: "ieVersion",
        value: function ieVersion() {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

                if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
            } else if (navigator.appName == 'Netscape') {
                var _ua = navigator.userAgent,
                    _re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");

                if (_re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
            }
            return rv;
        }

        /**
         * Check parallax mode
         * @returns {boolean}
         */

    }, {
        key: "isLiteMode",
        value: function isLiteMode() {
            return !(!device.mobile() && !device.tablet());
        }

        /**
         * Is safary
         * @returns {boolean}
         */

    }, {
        key: "isSafari",
        value: function isSafari() {
            var safari = false;
            if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) safari = true;
            return safari;
        }

        /**
         * Get window height with scroll
         */

    }, {
        key: "getScrollHeight",
        value: function getScrollHeight() {
            var view = this.getView();
            return Math.max(view.body.scrollHeight, view.element.scrollHeight, view.body.offsetHeight, view.element.offsetHeight, view.body.clientHeight, view.element.clientHeight);
        }
    }]);

    return UsesFunction;
}();

exports.default = new UsesFunction();

},{"./device":9}],9:[function(require,module,exports){
"use strict";

/*! device.js 0.1.58 */
(function () {
    var a, b, c, d, e, f, g, h, i, j;
    a = window.device, window.device = {}, c = window.document.documentElement, j = window.navigator.userAgent.toLowerCase(), device.ios = function () {
        return device.iphone() || device.ipod() || device.ipad();
    }, device.iphone = function () {
        return d("iphone");
    }, device.ipod = function () {
        return d("ipod");
    }, device.ipad = function () {
        return d("ipad");
    }, device.android = function () {
        return d("android");
    }, device.androidPhone = function () {
        return device.android() && d("mobile");
    }, device.androidTablet = function () {
        return device.android() && !d("mobile");
    }, device.blackberry = function () {
        return d("blackberry") || d("bb10") || d("rim");
    }, device.blackberryPhone = function () {
        return device.blackberry() && !d("tablet");
    }, device.blackberryTablet = function () {
        return device.blackberry() && d("tablet");
    }, device.windows = function () {
        return d("windows");
    }, device.windowsPhone = function () {
        return device.windows() && d("phone");
    }, device.windowsTablet = function () {
        return device.windows() && d("touch");
    }, device.fxos = function () {
        return (d("(mobile;") || d("(tablet;")) && d("; rv:");
    }, device.fxosPhone = function () {
        return device.fxos() && d("mobile");
    }, device.fxosTablet = function () {
        return device.fxos() && d("tablet");
    }, device.meego = function () {
        return d("meego");
    }, device.mobile = function () {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
    }, device.tablet = function () {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
    }, device.portrait = function () {
        return 90 !== Math.abs(window.orientation);
    }, device.landscape = function () {
        return 90 === Math.abs(window.orientation);
    }, device.noConflict = function () {
        return window.device = a, this;
    }, d = function d(a) {
        return -1 !== j.indexOf(a);
    }, f = function f(a) {
        var b;
        return b = new RegExp(a, "i"), c.className.match(b);
    }, b = function b(a) {
        return f(a) ? void 0 : c.className += " " + a;
    }, h = function h(a) {
        return f(a) ? c.className = c.className.replace(a, "") : void 0;
    }, device.ios() ? device.ipad() ? b("ios ipad tablet") : device.iphone() ? b("ios iphone mobile") : device.ipod() && b("ios ipod mobile") : device.android() ? device.androidTablet() ? b("android tablet") : b("android mobile") : device.blackberry() ? device.blackberryTablet() ? b("blackberry tablet") : b("blackberry mobile") : device.windows() ? device.windowsTablet() ? b("windows tablet") : device.windowsPhone() ? b("windows mobile") : b("desktop") : device.fxos() ? device.fxosTablet() ? b("fxos tablet") : b("fxos mobile") : device.meego() ? b("meego mobile") : b("desktop"), e = function e() {
        return device.landscape() ? (h("portrait"), b("landscape")) : (h("landscape"), b("portrait"));
    }, i = "onorientationchange" in window, g = i ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(g, e, !1) : window.attachEvent ? window.attachEvent(g, e) : window[g] = e, e();
}).call(undefined);

},{}]},{},[7]);
