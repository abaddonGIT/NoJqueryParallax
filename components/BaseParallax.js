/**
 * Created by Abaddon on 23.08.2016.
 */
import Promise from "promise";
import Uses from "../utility/UsesFunction";

class BaseParallax {
    /**
     * Start parallax
     */
    start() {
        this.setViewProps();
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
                    this.height = this.element.clientHeight;
                },
                get: function () {
                    return this._element;
                }
            }
        });
        this.view.element = this.view.d.documentElement;
    }

    /**
     * Resize event handler
     */
    resizeTick() {
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
    scrollTick() {
        if (this.box.isParallax() && !Uses.isLiteMode() && this.box.getInner()) {
            let scrollTop, start, end, offsetTop;

            offsetTop = this.getOffset(this.box.getItem()).top;
            scrollTop = this.view.w.pageYOffset || this.view.element.scrollTop;

            start = scrollTop + this.view.height;
            end = scrollTop - this.box.getItem().offsetHeight;

            if ((start > offsetTop) && (end < offsetTop)) {
                let y = scrollTop - offsetTop, newPosition;

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
    getTransformStyles(position) {
        let ie = Uses.ieVersion();
        if ((ie === -1 || ie > 9) && !Uses.isSafari()) {
            return `transform: translate3d(0, ${position}px, 0);`;
        } else {
            return `top: ${position}px;`;
        }
    }

    /**
     * Set element position
     */
    setPosition() {
        this.box.getItem().style.cssText = ` width: ${this.view.width}px; margin-left: ${Math.floor(this.view.width * -0.5)}px; left: 50%;`;
    }

    /**
     * Determine parallax block height
     */
    determineBoxHeight() {
        let newHeight = 0, height = this.box.getItem().offsetHeight;
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
    setInnerStyle() {
        if (this.box.getInner() && this.box.getOricSizes()) {
            let obj = this.box.getInner(),
                sizes = this.box.getOricSizes(),
                imageRatio,
                newImgWidth,
                newImgHeight,
                newImgTop,
                newImgLeft;

            imageRatio = sizes.height / sizes.width;
            var containerRatio = this.box.getBaseHeight() / this.view.width;


            if (containerRatio > imageRatio) {
                newImgHeight = this.box.getBaseHeight();
                newImgWidth = Math.round((newImgHeight * sizes.width) / sizes.height);
            } else {
                newImgWidth = this.view.width;
                newImgHeight = Math.round((newImgWidth * sizes.height) / sizes.width);
            }

            newImgLeft = -(newImgWidth - this.view.width) * .5;
            newImgTop = -(newImgHeight - this.box.getBaseHeight()) * .5;

            obj.style.cssText += `width: ${newImgWidth}px; height: ${newImgHeight}px; margin-top: ${newImgTop}px; margin-left: ${newImgLeft}px;`;
        }
    }

    /**
     * Get element position
     */
    getOffset() {
        let box = this.box.getItem().getBoundingClientRect(),
            body = this.view.d.body,
            docElem = this.view.element;

        let scrollTop = this.view.w.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = this.view.w.pageXOffset || docElem.scrollLeft || body.scrollLeft,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0;

        return {
            top: Math.round((box.top + scrollTop - clientTop)),
            left: Math.round((box.left + scrollLeft - clientLeft))
        };
    }

    /**
     * Load background image
     */
    loadImg() {
        return new Promise(function (resolve, reject) {
            let img = this.createImage();
            img.onload = () => {
                this.box.setOricSizes({width: img.width, height: img.height});
                this.setInner();
                resolve();
            };
            img.onerror = () => {
                reject();
            };
        }.bind(this));
    }

    /**
     * Create and return image object
     * @returns {*}
     */
    createImage() {
        let img = new Image();
        img.src = this.box.getUrl();
        return img;
    }

    /**
     * Create inner structure
     */
    setInner() {
        if (!Uses.isLiteMode()) {
            this.box.getItem().innerHTML = "<div class='parallax-bg-inner'></div>";
            this.box.getInner().style.cssText += `background-image: url(${this.box.getUrl()});`;
        } else {
            this.box.getItem().innerHTML = `<img class='parallax-bg-inner' src='${this.box.getUrl()}' alt=''/>`;
            this.box.setRatio(1);
        }
    }
}

export default BaseParallax;