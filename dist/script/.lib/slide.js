var slide;
(function (slide) {
    class SlideShow {
        #slides;
        #current;
        static DefaultOptions = {
            startAt: 0,
            counterSelector: ".counter",
        };
        constructor(options, ...slides) {
            if (slides.length === 0) {
                throw new Error("empty slide show");
            }
            this.#slides = slides;
            const selector = options.counterSelector ?? SlideShow.DefaultOptions.counterSelector;
            for (let i = 0; i < this.#slides.length; i++) {
                const counter = this.#slides[i].root().querySelectorAll(selector);
                for (let i = 0; i < counter.length; i++) {
                    counter[i].textContent = `${i + 1}`;
                }
            }
            this.#current = -1;
            this.goto(options.startAt ?? SlideShow.DefaultOptions.startAt);
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
            if (!current.next()) {
                this.goto(this.#current + 1);
            }
            current.advance();
        }
        revert() {
            this.goto(this.#current - 1);
        }
    }
    slide.SlideShow = SlideShow;
    class Slide {
        #root;
        #animations;
        #frame;
        static CURRENT_CLASS_NAME = "current-slide";
        constructor(root, ...animation) {
            this.#root = root;
            this.#animations = animation;
            this.#frame = 0;
        }
        root() {
            return this.#root;
        }
        #current() {
            return this.#root.classList.contains(Slide.CURRENT_CLASS_NAME);
        }
        #setCurrent(visible) {
            if (visible) {
                this.#root.classList.add(Slide.CURRENT_CLASS_NAME);
            }
            else {
                this.#root.classList.remove(Slide.CURRENT_CLASS_NAME);
            }
        }
        enter() {
            if (this.#current()) {
                return;
            }
            this.#setCurrent(true);
            this.#frame = 0;
            this.advance();
        }
        next() {
            return this.#frame < this.#animations.length;
        }
        advance() {
            if (!this.next()) {
                return;
            }
            this.#animations[this.#frame](this);
            this.#frame++;
        }
        leave() {
            while (this.next()) {
                this.advance();
            }
            this.#setCurrent(false);
        }
    }
    slide.Slide = Slide;
    function bundleActions(...actions) {
        return (s) => {
            for (let i = 0; i < actions.length; i++) {
                actions[i](s);
            }
        };
    }
    slide.bundleActions = bundleActions;
    function emptyAction(s) { }
    slide.emptyAction = emptyAction;
})(slide || (slide = {}));
export default slide;
