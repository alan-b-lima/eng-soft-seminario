import { setup_event_listenters } from "./sspm/listeners.ts"
import { Slide, SlideShow } from "./sspm/slide.ts"

function main() {
    const ss = new SlideShow(
        {
            name: "home", 
            location: "/slides/home.html", 
            slide: new Slide()
        },
        {
            name: "solid", 
            location: "/slides/solid.html", 
            slide: new Slide()
        },
    )

    setup_event_listenters(ss)
}

window.addEventListener("DOMContentLoaded", main)