/**
 * Created by Abaddon on 23.08.2016.
 */
import Base from "./BaseParallax";

class ImageParallax extends Base {
    constructor(box, config) {
        super();
        this.box = box;
        this.config = config;
    }

    /**
     * Start parallax
     */
    start() { 
        super.start();
        this.loadImg(function () {
            this.setBlock();
            this.config.loadBox(this);
        }, function () {
            console.error("Source load error!");
        });
    }

    /**
     * Calc and set sizes for block
     */
    setBlock() {
        this.resizeTick();
    }
}


export default ImageParallax;