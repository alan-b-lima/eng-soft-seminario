namespace slide {
    export type Options = {
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
        #visible: boolean
        #frame: number

        static HIDE_SLIDE = (s: Slide) => {
            s.root().classList.remove("current-slide")
        }
        
        static SHOW_SLIDE = (s: Slide) => {
            s.root().classList.add("current-slide")
        }

        constructor(root: HTMLElement, ...animation: Animation[]) {
            this.#root = root
            this.#animations = animation
            this.#visible = false
            this.#frame = 0
        }

        root(): HTMLElement {
            return this.#root
        }

        visible(): boolean {
            return this.#visible
        }

        #setVisible(visible: boolean): void {
            this.#visible = visible
            if (visible) {
                Slide.SHOW_SLIDE(this)
            } else {
                Slide.HIDE_SLIDE(this)
            }
        }

        frame(): number {
            return this.#frame
        }

        enter(): void {
            if (this.visible()) {
                return
            }

            this.#setVisible(true)
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

            this.#setVisible(false)
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