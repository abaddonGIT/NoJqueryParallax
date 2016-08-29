(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Abaddon on 23.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _promise = require("promise");

var _promise2 = _interopRequireDefault(_promise);

var _UsesFunction = require("../utility/UsesFunction");

var _UsesFunction2 = _interopRequireDefault(_UsesFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseParallax = function () {
    function BaseParallax() {
        _classCallCheck(this, BaseParallax);
    }

    _createClass(BaseParallax, [{
        key: "start",

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
        key: "setViewProps",
        value: function setViewProps() {
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
        }

        /**
         * Resize event handler
         */

    }, {
        key: "resizeTick",
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
        key: "scrollTick",
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
        key: "getTransformStyles",
        value: function getTransformStyles(position) {
            var ie = _UsesFunction2.default.ieVersion();
            if ((ie === -1 || ie > 9) && !_UsesFunction2.default.isSafari()) {
                return "transform: translate3d(0, " + position + "px, 0);";
            } else {
                return "top: " + position + "px;";
            }
        }

        /**
         * Set element position
         */

    }, {
        key: "setPosition",
        value: function setPosition() {
            this.box.getItem().style.cssText = " width: " + this.view.width + "px; margin-left: " + Math.floor(this.view.width * -0.5) + "px; left: 50%;";
        }

        /**
         * Determine parallax block height
         */

    }, {
        key: "determineBoxHeight",
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
        key: "setInnerStyle",
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

                obj.style.cssText += "width: " + newImgWidth + "px; height: " + newImgHeight + "px; margin-top: " + newImgTop + "px; margin-left: " + newImgLeft + "px;";
            }
        }

        /**
         * Get element position
         */

    }, {
        key: "getOffset",
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
        key: "loadImg",
        value: function loadImg() {
            return new _promise2.default(function (resolve, reject) {
                var _this = this;

                var img = this.createImage();
                img.onload = function () {
                    _this.box.setOricSizes({ width: img.width, height: img.height });
                    _this.setInner();
                    resolve();
                };
                img.onerror = function () {
                    reject();
                };
            }.bind(this));
        }

        /**
         * Create and return image object
         * @returns {*}
         */

    }, {
        key: "createImage",
        value: function createImage() {
            var img = new Image();
            img.src = this.box.getUrl();
            return img;
        }

        /**
         * Create inner structure
         */

    }, {
        key: "setInner",
        value: function setInner() {
            if (!_UsesFunction2.default.isLiteMode()) {
                this.box.getItem().innerHTML = "<div class='parallax-bg-inner'></div>";
                this.box.getInner().style.cssText += "background-image: url(" + this.box.getUrl() + ");";
            } else {
                this.box.getItem().innerHTML = "<img class='parallax-bg-inner' src='" + this.box.getUrl() + "' alt=''/>";
                this.box.setRatio(1);
            }
        }
    }]);

    return BaseParallax;
}();

exports.default = BaseParallax;

},{"../utility/UsesFunction":18,"promise":9}],2:[function(require,module,exports){
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
            var _this2 = this;

            _get(Object.getPrototypeOf(ImageParallax.prototype), "start", this).call(this);
            this.loadImg().then(function () {
                _this2.setBlock();
            }, function () {
                console.error("Image source load error!");
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseParallax = require("./BaseParallax");

var _BaseParallax2 = _interopRequireDefault(_BaseParallax);

var _UsesFunction = require("../utility/UsesFunction");

var _UsesFunction2 = _interopRequireDefault(_UsesFunction);

var _promise = require("promise");

var _promise2 = _interopRequireDefault(_promise);

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
            var _this2 = this;

            _get(Object.getPrototypeOf(VideoParallax.prototype), "start", this).call(this);
            if (!_UsesFunction2.default.isLiteMode()) {
                this.loadVideo().then(function () {
                    _this2.setBlock();
                }, function () {
                    console.error("Source load error!");
                });
            } else {
                this.loadImg().then(function () {
                    _this2.setBlock();
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
        value: function loadVideo() {
            return new _promise2.default(function (resolve, reject) {
                var _this3 = this;

                var video = this.box.getInner();
                video.load();
                video.play();
                this.setVideoTagSettings();
                video.onloadeddata = function () {
                    _this3.box.setOricSizes({ width: video.videoWidth, height: video.videoHeight });
                    resolve();
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
            }.bind(this));
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
        value: function loadImg() {
            this.box.removeVideo();
            return _get(Object.getPrototypeOf(VideoParallax.prototype), "loadImg", this).call(this);
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

},{"../utility/UsesFunction":18,"./BaseParallax":1,"promise":9}],6:[function(require,module,exports){
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

var _SmoothScroll = require("./utility/SmoothScroll");

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
        this.smooth = null;
        this.resizeDelay = null;
        //Set plugin options
        this.config = NoJqueryParallax.merge({
            box: ".js-parallax-box",
            bg: ".js-parallax-bg"
        }, options);
    }

    /**
     * Run parallax effect
     */


    _createClass(NoJqueryParallax, [{
        key: "run",
        value: function run() {
            var _this = this;

            this.sections = document.querySelectorAll(this.config.box);
            var ln = this.sections.length;
            if (!ln) return false;

            setTimeout(function () {
                for (var i = 0; i < ln; i++) {
                    var item = new _ParallaxBox2.default(_this.sections[i], _this.config.bg),
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
                        _this.parallaxInstances.push(instance);
                    }
                }
                //Bind events
                _this._subscribe();
            }, 500);
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
            this.smooth = new _SmoothScroll2.default();
            this.smooth.run();
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
},{"./components/ContentParallax":2,"./components/ImageParallax":3,"./components/ParallaxBox":4,"./components/VideoParallax":5,"./utility/SmoothScroll":17,"./utility/UsesFunction":18}],7:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":8}],8:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
'use strict';

module.exports = require('./lib')

},{"./lib":14}],10:[function(require,module,exports){
'use strict';

var asap = require('asap/raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('not a function');
  }
  this._45 = 0;
  this._81 = 0;
  this._65 = null;
  this._54 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._10 = null;
Promise._97 = null;
Promise._61 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
};
function handle(self, deferred) {
  while (self._81 === 3) {
    self = self._65;
  }
  if (Promise._10) {
    Promise._10(self);
  }
  if (self._81 === 0) {
    if (self._45 === 0) {
      self._45 = 1;
      self._54 = deferred;
      return;
    }
    if (self._45 === 1) {
      self._45 = 2;
      self._54 = [self._54, deferred];
      return;
    }
    self._54.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._81 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._81 === 1) {
        resolve(deferred.promise, self._65);
      } else {
        reject(deferred.promise, self._65);
      }
      return;
    }
    var ret = tryCallOne(cb, self._65);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._81 = 3;
      self._65 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._81 = 1;
  self._65 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._81 = 2;
  self._65 = newValue;
  if (Promise._97) {
    Promise._97(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._45 === 1) {
    handle(self, self._54);
    self._54 = null;
  }
  if (self._45 === 2) {
    for (var i = 0; i < self._54.length; i++) {
      handle(self, self._54[i]);
    }
    self._54 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  })
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}

},{"asap/raw":8}],11:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

},{"./core.js":10}],12:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require('./core.js');

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._61);
  p._81 = 1;
  p._65 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._81 === 3) {
            val = val._65;
          }
          if (val._81 === 1) return res(i, val._65);
          if (val._81 === 2) reject(val._65);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

},{"./core.js":10}],13:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};

},{"./core.js":10}],14:[function(require,module,exports){
'use strict';

module.exports = require('./core.js');
require('./done.js');
require('./finally.js');
require('./es6-extensions.js');
require('./node-extensions.js');
require('./synchronous.js');

},{"./core.js":10,"./done.js":11,"./es6-extensions.js":12,"./finally.js":13,"./node-extensions.js":15,"./synchronous.js":16}],15:[function(require,module,exports){
'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise = require('./core.js');
var asap = require('asap');

module.exports = Promise;

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  if (
    typeof argumentCount === 'number' && argumentCount !== Infinity
  ) {
    return denodeifyWithCount(fn, argumentCount);
  } else {
    return denodeifyWithoutCount(fn);
  }
}

var callbackFn = (
  'function (err, res) {' +
  'if (err) { rj(err); } else { rs(res); }' +
  '}'
);
function denodeifyWithCount(fn, argumentCount) {
  var args = [];
  for (var i = 0; i < argumentCount; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'return new Promise(function (rs, rj) {',
    'var res = fn.call(',
    ['self'].concat(args).concat([callbackFn]).join(','),
    ');',
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');
  return Function(['Promise', 'fn'], body)(Promise, fn);
}
function denodeifyWithoutCount(fn) {
  var fnLength = Math.max(fn.length - 1, 3);
  var args = [];
  for (var i = 0; i < fnLength; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'var args;',
    'var argLength = arguments.length;',
    'if (arguments.length > ' + fnLength + ') {',
    'args = new Array(arguments.length + 1);',
    'for (var i = 0; i < arguments.length; i++) {',
    'args[i] = arguments[i];',
    '}',
    '}',
    'return new Promise(function (rs, rj) {',
    'var cb = ' + callbackFn + ';',
    'var res;',
    'switch (argLength) {',
    args.concat(['extra']).map(function (_, index) {
      return (
        'case ' + (index) + ':' +
        'res = fn.call(' + ['self'].concat(args.slice(0, index)).concat('cb').join(',') + ');' +
        'break;'
      );
    }).join(''),
    'default:',
    'args[argLength] = cb;',
    'res = fn.apply(self, args);',
    '}',
    
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');

  return Function(
    ['Promise', 'fn'],
    body
  )(Promise, fn);
}

Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
}

},{"./core.js":10,"asap":7}],16:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.enableSynchronous = function () {
  Promise.prototype.isPending = function() {
    return this.getState() == 0;
  };

  Promise.prototype.isFulfilled = function() {
    return this.getState() == 1;
  };

  Promise.prototype.isRejected = function() {
    return this.getState() == 2;
  };

  Promise.prototype.getValue = function () {
    if (this._81 === 3) {
      return this._65.getValue();
    }

    if (!this.isFulfilled()) {
      throw new Error('Cannot get a value of an unfulfilled promise.');
    }

    return this._65;
  };

  Promise.prototype.getReason = function () {
    if (this._81 === 3) {
      return this._65.getReason();
    }

    if (!this.isRejected()) {
      throw new Error('Cannot get a rejection reason of a non-rejected promise.');
    }

    return this._65;
  };

  Promise.prototype.getState = function () {
    if (this._81 === 3) {
      return this._65.getState();
    }
    if (this._81 === -1 || this._81 === -2) {
      return 0;
    }

    return this._81;
  };
};

Promise.disableSynchronous = function() {
  Promise.prototype.isPending = undefined;
  Promise.prototype.isFulfilled = undefined;
  Promise.prototype.isRejected = undefined;
  Promise.prototype.getValue = undefined;
  Promise.prototype.getReason = undefined;
  Promise.prototype.getState = undefined;
};

},{"./core.js":10}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Abaddon on 29.08.2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _UsesFunction = require("./UsesFunction");

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
        this.ts = 0.1;
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
            if (!('ontouchstart' in window)) {
                this.handler = this.wheel.bind(this);
                document.documentElement.addEventListener("wheel", this.handler, false);

                this.targetY = this.oldY = window.pageYOffset || document.documentElement.scrollTop;
                this.currentY = -this.targetY;
                this.minScrollTop = this.getMinScrollTop();
                this.running = true;
                this.animateTick();
            }
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
            console.log(evt.wheelDelta + '||' + evt.deltaY);

            var delta = evt.detail ? evt.detail * -1 : wheelDelta / 40,
                dir = delta < 0 ? -1 : 1;
            if (dir != this.direction) {
                this.vy = 0;
                this.direction = dir;
            }

            this.currentY = -(window.pageYOffset || document.documentElement.scrollTop);
            this.updateScrollTarget(delta);
        }

        /**
         * Get min scroll
         * @returns {number}
         */

    }, {
        key: "getMinScrollTop",
        value: function getMinScrollTop() {
            return Math.max(document.body.clientHeight, document.documentElement.clientHeight) - _UsesFunction2.default.getScrollHeight();
        }

        /**
         * Animate handler
         */

    }, {
        key: "animateTick",
        value: function animateTick() {
            if (!this.running) return;
            requestAnimationFrame(this.animateTick.bind(this));
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

},{"./UsesFunction":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("./device");

exports.default = {
    /**
     * Return ie version
     * @returns {number}
     */
    ieVersion: function ieVersion() {
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
    },
    /**
     * Check parallax mode
     * @returns {boolean}
     */
    isLiteMode: function isLiteMode() {
        return !(!device.mobile() && !device.tablet());
    },
    /**
     * Is safary
     * @returns {boolean}
     */
    isSafari: function isSafari() {
        var safari = false;
        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) safari = true;
        return safari;
    },
    /**
     * Get window height with scroll
     */
    getScrollHeight: function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    }
}; /**
    * Created by Abaddon on 28.08.2016.
    */

},{"./device":19}],19:[function(require,module,exports){
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

},{}]},{},[6]);
