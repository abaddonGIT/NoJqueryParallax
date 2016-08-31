/**
 * Created by Abaddon on 29.08.2016.
 */
import Uses from "../utility/UsesFunction";

class SmoothScroll {
    constructor() {
        this.handler = null;
        this.targetY = 0;
        this.oldY = 0;
        this.currentY = 0;
        this.minScrollTop = 0;
        this.running = false;
        this.vy = 0;
        this.stepAmt = 1;
        this.minMove = 0.1;
        this.fricton = 0.97;
        this.direction = null;
        this.maxScrollTop = 0;

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }

    /**
     * Run
     */
    run() {
        if (!Uses.isLiteMode()) {
            this.handler = this.wheel.bind(this);
            Uses.getView().element.addEventListener("mousewheel", this.handler, false);
            Uses.getView().element.addEventListener("DOMMouseScroll", this.handler, false);

            this.targetY = this.oldY = window.pageYOffset || Uses.getView().element.scrollTop;
            this.currentY = -this.targetY;
            this.minScrollTop = this.getMinScrollTop();
            this.running = true;
            this.animateTick();
        }
    }

    /**
     * Stop smooth scrolling
     */
    stop() {
        Uses.getView().element.removeEventListener("mousewheel", this.handler, false);
        Uses.getView().element.removeEventListener("DOMMouseScroll", this.handler, false);
        this.running = false;
    }

    /**
     * Update min scroll height
     */
    update() {
        this.minScrollTop = this.getMinScrollTop();
    }

    /**
     * Resize window handler
     */
    resizeTick() {
        this.minScrollTop = this.getMinScrollTop();
    }

    /**
     * Wheel handler
     */
    wheel(evt) {
        evt.preventDefault();
        let wheelDelta = evt.wheelDelta;
        let delta = evt.detail ? evt.detail * -1 : wheelDelta / 40,
            dir = delta < 0 ? -1 : 1;
        if (dir != this.direction) {
            this.vy = 0;
            this.direction = dir;
        }

        this.currentY = -(window.pageYOffset || Uses.getView().element.scrollTop);
        this.updateScrollTarget(delta);
    }

    /**
     * Get min scroll
     * @returns {number}
     */
    getMinScrollTop() {
        return Math.max(Uses.getView().body.clientHeight, Uses.getView().element.clientHeight) - Uses.getScrollHeight();
    }

    /**
     * Animate handler
     */
    animateTick() {
        if (!this.running) return;
        requestAnimFrame(this.animateTick.bind(this));
        this.render();
    }

    /**
     * Update scroll position
     * @param delta
     */
    updateScrollTarget(delta) {
        this.targetY += delta;
        this.vy += (this.targetY - this.oldY) * this.stepAmt;
        this.oldY = this.targetY;
    }

    /**
     * Render scroll
     */
    render() {
        if (this.vy < -(this.minMove) || this.vy > this.minMove) {
            this.currentY = (this.currentY + this.vy);
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
}

export default SmoothScroll;