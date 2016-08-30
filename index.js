/**
 * Created by Abaddon on 22.08.2016.
 */
"use strict";
import Item from "./components/ParallaxBox";
import Uses from "./utility/UsesFunction";
import SmoothScroll from "./utility/SmoothScroll";
import ImageParallax from "./components/ImageParallax";
import VideoParallax from "./components/VideoParallax";
import ContentParallax from "./components/ContentParallax";

class NoJqueryParallax {
    constructor(options) {
        this.parallaxInstances = [];
        this.smooth = {};
        this.resizeDelay = null;
        //Set plugin options
        this.config = NoJqueryParallax.merge({
            box: ".js-parallax-box",
            bg: ".js-parallax-bg",
            smooth: true
        }, options);
    }

    /**
     * Run parallax effect
     */
    run() {
        this.sections = document.querySelectorAll(this.config.box);
        let ln = this.sections.length;
        if (!ln) return false;

        setTimeout(() => {
            for (let i = 0; i < ln; i++) {
                let item = new Item(this.sections[i], this.config.bg), instance = null;
                switch (item.getSourceType()) {
                    case "image":
                        instance = new ImageParallax(item);
                        break;
                    case "video":
                        instance = new VideoParallax(item);
                        break;
                    case "content":
                        instance = new ContentParallax(item);
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
        }, 500);
    }

    /**
     * Ext object
     * @param self
     * @param source
     * @returns {*}
     */
    static merge(self, source) {
        for (let i in source) {
            if (source.hasOwnProperty(i)) {
                self[i] = source[i];
            }
        }
        return self;
    }

    /**
     * Subscribe plugin for window events
     * @private
     */
    _subscribe() {
        //Smooth scroll
        if (this.config.smooth) {
            this.smooth = new SmoothScroll();
            this.smooth.run();
        }
        //Scroll window
        if (!Uses.isLiteMode()) {
            this.scFn = this._scrollTic.bind(this);
            window.addEventListener("scroll", this.scFn, false);
        }
        //Resize window
        this.rezFn = this._resizeTic.bind(this);
        window.addEventListener("resize", this.rezFn, false)
    }

    /**
     * Call handlers for scroll
     * @private
     */
    _scrollTic() {
        let ln = this.parallaxInstances.length;
        for (let i = 0; i < ln; i++) {
            this.parallaxInstances[i].scrollTick();
        }
    }

    /**
     * Call handlers when window change sizes
     * @private
     */
    _resizeTic() {
        let ln = this.parallaxInstances.length;
        clearTimeout(this.resizeDelay);
        this.resizeDelay = setTimeout(() => {
            for (let i = 0; i < ln; i++) {
                this.parallaxInstances[i].resizeTick();
            }
            this.smooth.resizeTick();
        }, 500);
    }

    /**
     * Remove event handlers
     */
    stop() {
        window.removeEventListener("scroll", this.scFn, false);
        window.removeEventListener("resize", this.rezFn, false);
    }

    /**
     * Stop smooth scrolling
     */
    stopSmooth() {
        this.smooth.stop();
    }
}

global.NoJqueryParallax = NoJqueryParallax;

export default NoJqueryParallax;