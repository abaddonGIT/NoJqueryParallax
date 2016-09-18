/**
 * Created by Abaddon on 22.08.2016.
 */
"use strict";
(function (d, w) {
    $('.flexslider').flexslider();
    var parallax = new NoJqueryParallax({
        smooth: true,
        loadBox: boxLoad
    });
    document.addEventListener("DOMContentLoaded", function () {
        parallax.run();
    });

    document.querySelector("#add").addEventListener("click", function (e) {
        let div = document.createElement("div");
        div.innerHTML = '<div style="height: 300px; background-color: blue;"></div>';
        document.querySelector("body").appendChild(div);
        div = null;
        e.preventDefault();
        e.stopPropagation();
    }, false);


    function boxLoad(item) {
        console.log(item);
    }


}(document, window));