/**
 * Created by Abaddon on 22.08.2016.
 */
"use strict";
import Item from "./utility/ParallaxBox";
import ImageParallax from "./utility/ImageParallax";

class NoJqueryParallax {
    constructor(options) {
        //Set plugin options
        this.config = NoJqueryParallax.merge({
            box: ".js-parallax-box", 
            bg: ".js-parallax-bg"
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
                let item = new Item(this.sections[i], this.config.bg);
                switch (item.getSourceType()) {
                    case "image":
                        new ImageParallax(item).start();
                        break;
                    case "video":
                        //Для видео
                        break;
                    default:

                }
            }
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
}

global.NoJqueryParallax = NoJqueryParallax;

export default NoJqueryParallax;