import { Coordinator } from "./coodinator.js";
export class SlideShow {
    #coordinator;
    #current;
    #names;
    #slides;
    constructor(...pages) {
        this.#coordinator = new Coordinator();
        this.#current = undefined;
        this.#names = [];
        this.#slides = [];
        pages.forEach(page => {
            this.#coordinator.add(page.name, page.location);
            this.#names.push(page.name);
            this.#slides.push(page.slide);
        });
        this.goto(0);
    }
    slides() {
        return this.#slides;
    }
    length() {
        return this.#slides.length;
    }
    current() {
        return this.#current;
    }
    goto(to) {
        const index = Math.max(0, Math.min(to, this.#slides.length - 1));
        if (this.#current == index) {
            return;
        }
        if (this.#current !== undefined) {
            this.#slides[this.#current].leave();
        }
        this.#current = index;
        this.#slides[this.#current].enter();
        this.#coordinator.to(this.#names[this.#current]);
    }
    advance() {
        const current = this.#slides[this.#current];
        if (current.done()) {
            this.goto(this.#current + 1);
            current.advance();
            return;
        }
        current.advance();
        if (current.done()) {
            this.goto(this.#current + 1);
        }
    }
    revert() {
        const slide = this.#slides[this.#current];
        if (slide.frame() > 1) {
            slide.revert();
        }
        else {
            this.goto(this.#current - 1);
        }
    }
}
export class Slide {
    #animation;
    #generator;
    #frame;
    #done;
    constructor(animation) {
        if (animation === undefined) {
            animation = empty_generator;
        }
        this.#animation = animation;
        this.#generator = undefined;
        this.#frame = undefined;
        this.#done = undefined;
    }
    done() {
        return this.#done === true;
    }
    frame() {
        return this.#frame;
    }
    enter() {
        this.#generator = this.#animation();
        this.#frame = 0;
    }
    advance() {
        const { done } = this.#generator.next();
        if (done === true) {
            this.#done = true;
        }
        else {
            this.#frame++;
        }
    }
    revert() {
        const frame = this.#frame - 1;
        this.enter();
        this.#generator.drop(frame);
    }
    leave() {
        while (!this.#done) {
            this.advance();
        }
    }
}
function* empty_generator() { }
