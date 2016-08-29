/**
 * Created by Abaddon on 28.08.2016.
 */
import "./device";

export default {
    /**
     * Return ie version
     * @returns {number}
     */
    ieVersion: function () {
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
    },
    /**
     * Check parallax mode
     * @returns {boolean}
     */
    isLiteMode: function () {
        return !(!device.mobile() && !device.tablet());
    },
    /**
     * Is safary
     * @returns {boolean}
     */
    isSafari: function () {
        var safari = false;
        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) safari = true;
        return safari;
    },
    /**
     * Get window height with scroll
     */
    getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight);
    }
}