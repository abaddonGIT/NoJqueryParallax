/**
 * Created by Abaddon on 23.08.2016.
 */
import Base from "./BaseParallax";

class ContentParallax extends Base {
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
        this.config.loadBox(this);
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