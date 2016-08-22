/**
 * Created by Abaddon on 23.08.2016.
 */
import "./device";
import Promise from "promise";

class BaseParallax {
    constructor(box) {
        this.box = box;
    }

    /**
     * Start parallax
     */
    start() {
        this.setViewProps();
    }

    /**
     * Load source for block
     */
    load() {

    }

    /**
     * Check parallax mode
     * @returns {boolean}
     */
    static isLiteMode() {
        return !(!device.mobile() && !device.tablet());
    }

    /**
     * Set window properties
     */
    setViewProps() {
        this.view = Object.defineProperties({}, {
            w: {
                value: window
            },
            d: {
                value: document
            },
            element: {
                set: function (value) {
                    this._element = value;
                    this.width = this.element.offsetWidth;
                    this.height = this.element.offsetHeight;
                },
                get: function () {
                    return this._element;
                }
            }
        });
        this.view.element = this.view.d.documentElement;
    }
}

export default BaseParallax;