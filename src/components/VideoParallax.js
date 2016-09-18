/**
 * Created by Abaddon on 23.08.2016.
 */
import Base from "./BaseParallax";
import Uses from "../utility/UsesFunction";

class VideoParallax extends Base {
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
        if (!Uses.isLiteMode()) {
            this.loadVideo(function () {
                this.setBlock();
                this.config.loadBox(this);
            }, function () {
                console.error("Source load error!");
            });
        } else {
            this.loadImg(function () {
                this.setBlock();
            }, function () {
                console.error("Source load error!");
            });
        }
    }

    /**
     * Load video source
     */
    loadVideo(resolve, reject) {
        let video = this.box.getInner();
        video.load();
        video.play();
        this.setVideoTagSettings();
        video.onloadeddata = () => {
            this.box.setOricSizes({width: video.videoWidth, height: video.videoHeight});
            resolve.call(this);
        };
        video.onerror = function () {
            reject();
        };
        //set sources error handlers
        let sourceLn = this.box.sources.length;
        if (sourceLn) {
            while (sourceLn--) {
                let source = this.box.sources[sourceLn];
                source.onerror = function () {
                    reject();
                }
            }
        }
    }

    /**
     * Set video settings
     */
    setVideoTagSettings() {
        let video = this.box.getInner(),
            loop = video.getAttribute("data-loop"),
            volume = parseInt(video.getAttribute("data-volume"));

        if (!isNaN(volume)) {
            video.volume = volume / 100;
        }

        if (loop === "true") {
            video.onended = function () {
                video.pause();
                video.currentTime = 0;
                video.load();
                video.play();
            }
        }
    }

    /**
     * Load img source
     */
    loadImg(resolve, reject) {
        this.box.removeVideo();
        return super.loadImg(resolve, reject);
    }

    /**
     * Calc and set sizes for block
     */
    setBlock() {
        this.resizeTick();
    }
}


export default VideoParallax;