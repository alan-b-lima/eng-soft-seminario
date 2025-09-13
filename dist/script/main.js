import { setup_event_listenters } from "./sspm/listeners.js";
import { Slide, SlideShow } from "./sspm/slide.js";
function main() {
    const ss = new SlideShow({
        name: "home",
        location: "/slides/home.html",
        slide: new Slide()
    }, {
        name: "solid",
        location: "/slides/solid.html",
        slide: new Slide()
    });
    setup_event_listenters(ss);
}
window.addEventListener("DOMContentLoaded", main);
