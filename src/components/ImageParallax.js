/**
 * Created by Abaddon on 23.08.2016.
 */
import Base from "./BaseParallax";

class ImageParallax extends Base {
    constructor(box) {
        super();
        this.box = box;
    }

    /**
     * Start parallax
     */
    start() {
        super.start();
        this.loadImg(function () {
            this.setBlock();
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