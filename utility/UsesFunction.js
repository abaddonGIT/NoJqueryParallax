/**
 * Created by Abaddon on 28.08.2016.
 */
import "./device";

class UsesFunction {
    constructor() {
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
                    this.height = this.element.clientHeight;
                },
                get: function () {
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
    getView() {
        return this.view;
    }

    /**
     * Return ie version
     * @returns {number}
     */
    ieVersion() {
        let rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            let ua = navigator.userAgent,
                re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        else if (navigator.appName == 'Netscape') {
            let ua = navigator.userAgent,
                re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");

            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    /**
     * Check parallax mode
     * @returns {boolean}
     */
    isLiteMode() {
        return !(!device.mobile() && !device.tablet());
    }

    /**
     * Is safary
     * @returns {boolean}
     */
    isSafari() {
        var safari = false;
        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) safari = true;
        return safari;
    }

    /**
     * Get window height with scroll
     */
    getScrollHeight() {
        let view = this.getView();
        return Math.max(view.body.scrollHeight, view.element.scrollHeight,
            view.body.offsetHeight, view.element.offsetHeight,
            view.body.clientHeight, view.element.clientHeight);
    }
}

export default new UsesFunction();