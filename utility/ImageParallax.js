/**
 * Created by Abaddon on 23.08.2016.
 */
import Base from "./BaseParallax";
import Promise from "promise";

class ImageParallax extends Base {
    constructor(box) {
        super(box);
    }

    /**
     * Start parallax
     */
    start() {
        super.start();
        this.load().then(() => {
            this.setBlock();
        }, function () {
            console.error("Source load error!");
        });
    }

    /**
     * Load background image
     */
    load() {
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
        if (!Base.isLiteMode()) {
            this.box.getItem().innerHTML = "<div class='parallax-bg-inner'></div>";
            this.box.getInner().style.cssText += `background-image: url(${this.box.getUrl()});`;
        } else {
            this.box.getItem().innerHTML = `<img class='parallax-bg-inner' src='${this.box.getUrl()}' alt=''/>`;
            this.box.setRatio('none');
        }
    }

    /**
     * Calc and set sizes for block
     */
    setBlock() {
        
    }
}


export default ImageParallax;