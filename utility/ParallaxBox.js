/**
 * Created by Abaddon on 23.08.2016.
 */
class ParallaxBox {
    constructor(box, selector) {
        this.el = box.querySelector(selector);
        this.box = box;
        this.parallax = true;
        this.invert = Boolean(this.el.getAttribute("data-invert"));
        this.sourceType = this.el.getAttribute("data-parallax-type");
        this.speed = this.el.getAttribute("data-speed");
        this.url = this.el.getAttribute("data-img-url");
        this.type = "none";
        this.resize = true;
        this.baseHeight = 0;
    }

    setBaseHeight(value) {
        this.baseHeight = value;
    }

    getBaseHeight() {
        return this.baseHeight;
    }

    setResize(value) {
        this.resize = value;
    }

    isResize() {
        return this.resize;
    }

    setType(value) {
        this.type = value;
    }

    getType() {
        return this.type;
    }

    getItem() {
        return this.el;
    }

    getInner() {
        if (this.inner) {
            return this.inner;
        } else {
            this.inner = this.el.querySelector(".parallax-bg-inner");
            return this.inner;
        }
    }

    setInvert(value) {
        if (value === "true") {
            this.type = "invert";
        } else {
            this.type = "normal";
        }
        this.invert = value;
    }

    isInvert() {
        return this.invert === "true";
    }

    getSpeed() {
        return this.speed;
    }

    setRatio(value) {
        this.bufferRatio = value;
    }

    getRatio() {
        return this.bufferRatio;
    }

    getSourceType() {
        return this.sourceType;
    }

    setParallax(value) {
        this.parallax = value;
    }

    isParallax() {
        return this.parallax;
    }

    getUrl() {
        return this.url;
    }

    setOricSizes(value) {
        this.sizes = value;
    }

    getOricSizes() {
        return this.sizes;
    }
}
export default ParallaxBox;