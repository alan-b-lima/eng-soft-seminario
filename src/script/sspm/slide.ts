export type Options = {
    start_at: number,
    counter_selector: string,
}

export class SlideShow {
    #slides: Slide[]
    #current: number

    static DEFAULT_OPTIONS: Options = {
        start_at: 0,
        counter_selector: ".counter",
    }

    constructor(options: Partial<Options>, ...slides: Slide[]) {
        if (slides.length === 0) {
            throw new Error("empty slide show")
        }

        this.#slides = slides
        const selector = options.counter_selector ?? SlideShow.DEFAULT_OPTIONS.counter_selector

        for (let i = 0; i < this.#slides.length; i++) {
            const counter = this.#slides[i].element().querySelectorAll(selector)
            for (let i = 0; i < counter.length; i++) {
                counter[i].textContent = `${i + 1}`
            }
        }

        this.#current = -1
        this.goto(options.start_at ?? SlideShow.DEFAULT_OPTIONS.start_at)
    }

    slides(): Slide[] {
        return this.#slides
    }

    length(): number {
        return this.#slides.length
    }

    current(): number {
        return this.#current
    }

    goto(to: number): void {
        const index = Math.max(0, Math.min(to, this.#slides.length - 1))
        if (this.#current == index) {
            return
        }

        if (this.#current >= 0) {
            this.#slides[this.#current].leave()
        }

        this.#current = index
        this.#slides[this.#current].enter()
    }

    advance(): void {
        const current = this.#slides[this.#current]
        if (current.done()) {
            this.goto(this.#current + 1)
            current.advance()

            return
        }

        current.advance()
        if (current.done()) {
            this.goto(this.#current + 1)
        }
    }

    revert(): void {
        const slide = this.#slides[this.#current]
        if (slide.frame() > 1) {
            slide.revert()
            return
        }

        this.goto(this.#current - 1)
    }
}

export class Slide {
    #element: HTMLElement
    #animation: Animation
    #visible: boolean
    
    #frame: number
    #generator: AnimationGenerator
    #done: boolean

    static HIDE_SLIDE = (s: Slide) => {
        s.element().classList.remove("current-slide")
    }

    static SHOW_SLIDE = (s: Slide) => {
        s.element().classList.add("current-slide")
    }

    constructor(element: HTMLElement, animation?: Animation) {
        if (animation === undefined) {
            animation = empty_generator
        }

        this.#element = element
        this.#animation = animation
        this.#visible = false
        
        this.#frame = 0
        this.#generator = undefined as any as AnimationGenerator
        this.#done = false
    }

    element(): HTMLElement {
        return this.#element
    }

    animation(animation?: Animation): Animation {
        if (animation !== undefined) {
            const old = this.#animation
            this.#animation = animation
            return old
        }

        return this.#animation
    }

    visible(): boolean {
        return this.#visible
    }

    frame(): number {
        return this.#frame
    }

    enter(): void {
        if (!this.#visible) {
            Slide.SHOW_SLIDE(this)
            this.#visible = true
        }

        this.#generator = this.#animation()
        this.#done = false
        this.#frame = 0
        this.advance()
    }

    done(): boolean {
        return this.#done
    }

    advance(): void {
        if (!this.#visible) {
            return
        }

        const { done } = this.#generator.next()
        if (done === true) {
            this.#done = true
        } else {
            this.#frame++
        }
    }

    revert(): void {
        if (!this.#visible) {
            return
        }

        const frame = this.#frame - 1
        while (!this.#done) {
            this.advance()
        }

        this.enter()
        for (let i = 1; i < frame; i++) {
            this.advance()
        }
    }

    leave(): void {
        while (!this.#done) {
            this.advance()
        }

        Slide.HIDE_SLIDE(this)
        this.#visible = false
    }
}

export type Animation = () => AnimationGenerator

export type AnimationGenerator = Generator<void, void, void>

export function* empty_generator() { }