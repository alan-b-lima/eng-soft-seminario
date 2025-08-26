namespace slide {
    type Options = {
        startAt: number,
        counterSelector: string,
    }

    export class SlideShow {
        #slides: Slide[]
        #current: number

        static DefaultOptions: Options = {
            startAt: 0,
            counterSelector: ".counter",
        }

        constructor(options: { [K in keyof Options]?: Options[K] }, ...slides: Slide[]) {
            if (slides.length === 0) {
                throw new Error("empty slide show")
            }

            this.#slides = slides
            const selector = options.counterSelector ?? SlideShow.DefaultOptions.counterSelector

            for (let i = 0; i < this.#slides.length; i++) {
                const counter = this.#slides[i].root().querySelectorAll(selector)
                for (let i = 0; i < counter.length; i++) {
                    counter[i].textContent = `${i + 1}`
                }
            }

            this.#current = -1
            this.goto(options.startAt ?? SlideShow.DefaultOptions.startAt)
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
            if (!current.next()) {
                this.goto(this.#current + 1)
            }

            current.advance()
        }

        revert(): void {
            this.goto(this.#current - 1)
        }
    }

    export class Slide {
        #root: HTMLElement
        #animations: Animation[]
        #frame: number

        static CURRENT_CLASS_NAME = "current-slide"

        constructor(root: HTMLElement, ...animation: Animation[]) {
            this.#root = root
            this.#animations = animation
            this.#frame = 0
        }

        root(): HTMLElement {
            return this.#root
        }

        #current(): boolean {
            return this.#root.classList.contains(Slide.CURRENT_CLASS_NAME)
        }

        #setCurrent(visible: boolean): void {
            if (visible) {
                this.#root.classList.add(Slide.CURRENT_CLASS_NAME)
            } else {
                this.#root.classList.remove(Slide.CURRENT_CLASS_NAME)
            }
        }

        enter(): void {
            if (this.#current()) {
                return
            }

            this.#setCurrent(true)
            this.#frame = 0
            this.advance()
        }

        next(): boolean {
            return this.#frame < this.#animations.length
        }

        advance(): void {
            if (!this.next()) {
                return
            }

            this.#animations[this.#frame](this)
            this.#frame++
        }

        leave(): void {
            while (this.next()) {
                this.advance()
            }

            this.#setCurrent(false)
        }
    }

    export type Animation = Action

    export type Action = (s: Slide) => void

    export function bundleActions(...actions: Action[]): Action {
        return (s: Slide) => {
            for (let i = 0; i < actions.length; i++) {
                actions[i](s)
            }
        }
    }

    export function emptyAction(s: Slide): void { }
}

export default slide