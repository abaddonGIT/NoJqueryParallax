/**
 * Created by Abaddon on 22.08.2016.
 */
"use strict";
(function (d, w) {
    $('.flexslider').flexslider();
    var parallax = new NoJqueryParallax();
    parallax.run();
}(document, window)); 