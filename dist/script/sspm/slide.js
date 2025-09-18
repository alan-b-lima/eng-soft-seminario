export class SlideShow {
    #slides;
    #current;
    static DEFAULT_OPTIONS = {
        start_at: 0,
        counter_selector: ".counter",
    };
    constructor(options, ...slides) {
        if (slides.length === 0) {
            throw new Error("empty slide show");
        }
        this.#slides = slides;
        const selector = options.counter_selector ?? SlideShow.DEFAULT_OPTIONS.counter_selector;
        for (let i = 0; i < this.#slides.length; i++) {
            const counter = this.#slides[i].element().querySelectorAll(selector);
            for (let i = 0; i < counter.length; i++) {
                counter[i].textContent = `${i + 1}`;
            }
        }
        this.#current = -1;
        this.goto(options.start_at ?? SlideShow.DEFAULT_OPTIONS.start_at);
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
        if (this.#current >= 0) {
            this.#slides[this.#current].leave();
        }
        this.#current = index;
        this.#slides[this.#current].enter();
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
            return;
        }
        this.goto(this.#current - 1);
    }
}
export class Slide {
    #element;
    #animation;
    #visible;
    #frame;
    #generator;
    #done;
    static HIDE_SLIDE = (s) => {
        s.element().classList.remove("current-slide");
    };
    static SHOW_SLIDE = (s) => {
        s.element().classList.add("current-slide");
    };
    constructor(element, animation) {
        if (animation === undefined) {
            animation = empty_generator;
        }
        this.#element = element;
        this.#animation = animation;
        this.#visible = false;
        this.#frame = 0;
        this.#generator = undefined;
        this.#done = false;
    }
    element() {
        return this.#element;
    }
    animation(animation) {
        if (animation !== undefined) {
            const old = this.#animation;
            this.#animation = animation;
            return old;
        }
        return this.#animation;
    }
    visible() {
        return this.#visible;
    }
    frame() {
        return this.#frame;
    }
    enter() {
        if (!this.#visible) {
            Slide.SHOW_SLIDE(this);
            this.#visible = true;
        }
        this.#generator = this.#animation();
        this.#done = false;
        this.#frame = 0;
        this.advance();
    }
    done() {
        return this.#done;
    }
    advance() {
        if (!this.#visible) {
            return;
        }
        const { done } = this.#generator.next();
        if (done === true) {
            this.#done = true;
        }
        else {
            this.#frame++;
        }
    }
    revert() {
        if (!this.#visible) {
            return;
        }
        const frame = this.#frame - 1;
        while (!this.#done) {
            this.advance();
        }
        this.enter();
        for (let i = 1; i < frame; i++) {
            this.advance();
        }
    }
    leave() {
        while (!this.#done) {
            this.advance();
        }
        Slide.HIDE_SLIDE(this);
        this.#visible = false;
    }
}
export function* empty_generator() { }
