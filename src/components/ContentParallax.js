/**
 * Created by Abaddon on 23.08.2016.
 */
import Base from "./BaseParallax";

class ContentParallax extends Base {
    constructor(box) {
        super();
        this.box = box;
    }

    /**
     * Start parallax
     */
    start() {
        super.start();
    }

    /**
     * Load content
     */
    loadContent() {
        this.setBlock();
    }

    /**
     * Calc and set sizes for block
     */
    setBlock() {
        this.resizeTick();
    }
}


export default ContentParallax;