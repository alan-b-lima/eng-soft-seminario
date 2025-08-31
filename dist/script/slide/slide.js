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
                const counter = this.#slides[i].element().querySelectorAll(selector);
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
        #element;
        #animations;
        #visible;
        #frame;
        static HIDE_SLIDE = (s) => {
            s.element().classList.remove("current-slide");
        };
        static SHOW_SLIDE = (s) => {
            s.element().classList.add("current-slide");
        };
        constructor(element, ...animation) {
            this.#element = element;
            this.#animations = animation;
            this.#visible = false;
            this.#frame = 0;
        }
        element() {
            return this.#element;
        }
        visible() {
            return this.#visible;
        }
        #setVisible(visible) {
            this.#visible = visible;
            if (visible) {
                Slide.SHOW_SLIDE(this);
            }
            else {
                Slide.HIDE_SLIDE(this);
            }
        }
        frame() {
            return this.#frame;
        }
        enter() {
            if (this.visible()) {
                return;
            }
            this.#setVisible(true);
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
            this.#setVisible(false);
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
