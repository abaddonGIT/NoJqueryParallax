/**
 * Created by Abaddon on 22.08.2016.
 */
"use strict";
import merge from "object-assign";
import Item from "./utility/ParallaxBox";
import ImageParallax from "./utility/ImageParallax";

class NoJqueryParallax {
    constructor(options) {
        //Set plugin options
        this.config = merge({
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
}

global.NoJqueryParallax = NoJqueryParallax;

export default NoJqueryParallax;