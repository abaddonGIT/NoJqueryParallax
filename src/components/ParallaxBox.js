/**
 * Created by Abaddon on 23.08.2016.
 */
class ParallaxBox {
    constructor(box, selector) {
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
    removeVideo() {
        this.el.removeChild(this.getInner());
    }

    /**
     * Save block height
     * @param value
     */
    setBaseHeight(value) {
        this.baseHeight = value;
    }

    /**
     * Return block height
     * @returns {number|*}
     */
    getBaseHeight() {
        return this.baseHeight;
    }

    /**
     * Set resize flag
     * @param value
     */
    setResize(value) {
        this.resize = value;
    }

    /**
     * Check resize flag
     * @returns {boolean|*}
     */
    isResize() {
        return this.resize;
    }

    /**
     * Save parallax type
     * @param value
     */
    setType(value) {
        this.type = value;
    }

    /**
     * Return parallax type
     * @returns {string|string|*|string}
     */
    getType() {
        return this.type;
    }

    /**
     * Return parallax dom element
     * @returns {Element|*}
     */
    getItem() {
        return this.el;
    }

    /**
     * Return parallax inner dom element
     * @returns {Element|*}
     */
    getInner() {
        if (this.inner) {
            return this.inner;
        } else {
            switch (this.sourceType) {
                case "video":
                    this.inner = this.el.querySelector("video");
                    this.sources = this.inner.querySelectorAll("source");
                    break
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
    setInvert(value) {
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
    isInvert() {
        return this.invert === "true";
    }

    /**
     * Set parallax effect speed
     * @param value
     */
    setSpeed(value) {
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
    getSpeed() {
        return this.speed;
    }

    /**
     * Set source ratio
     * @param value
     */
    setRatio(value) {
        this.bufferRatio = value;
    }

    /**
     * Get current ratio
     * @returns {*}
     */
    getRatio() {
        return this.bufferRatio;
    }

    /**
     * Parallax source type
     * @returns {string|*}
     */
    getSourceType() {
        return this.sourceType;
    }

    /**
     * Set parallax flag
     * @param value
     */
    setParallax(value) {
        this.parallax = value;
    }

    /**
     * Run parallax flag
     * @returns {*|boolean}
     */
    isParallax() {
        return this.parallax;
    }

    /**
     * Get source url
     * @returns {string|*}
     */
    getUrl() {
        return this.url;
    }

    /**
     * Save original size
     * @param value
     */
    setOricSizes(value) {
        this.sizes = value;
    }

    /**
     * Return original size source
     * @returns {*}
     */
    getOricSizes() {
        return this.sizes;
    }
}
export default ParallaxBox;