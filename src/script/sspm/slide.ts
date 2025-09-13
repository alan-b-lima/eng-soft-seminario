import { Coordinator } from "./coodinator.ts"

export class SlideShow {
    #coordinator: Coordinator
    #current: number

    #names: string[]
    #slides: Slide[]

    constructor(...pages: Page[]) {
        this.#coordinator = new Coordinator()
        this.#current = undefined as any as number

        this.#names = []
        this.#slides = []

        pages.forEach(page => {
            this.#coordinator.add(page.name, page.location)
            this.#names.push(page.name)
            this.#slides.push(page.slide)
        })

        this.goto(0)
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

        if (this.#current !== undefined) {
            this.#slides[this.#current].leave()
        }

        this.#current = index
        this.#slides[this.#current].enter()
        this.#coordinator.to(this.#names[this.#current])
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
        } else {
            this.goto(this.#current - 1)
        }
    }
}

export type Page = {
    name: string
    location: string
    slide: Slide
}

export class Slide {
    #animation: Animation

    #generator: AnimationGenerator
    #frame: number
    #done: boolean

    constructor(animation?: Animation) {
        if (animation === undefined) {
            animation = empty_generator
        }

        this.#animation = animation

        this.#generator = undefined as any as AnimationGenerator
        this.#frame = undefined as any as number
        this.#done = undefined as any as boolean
    }

    done(): boolean {
        return this.#done === true
    }

    frame(): number {
        return this.#frame
    }

    enter(): void {
        this.#generator = this.#animation()
        this.#frame = 0
    }

    advance(): void {
        const { done } = this.#generator.next()
        if (done === true) {
            this.#done = true
        } else {
            this.#frame++
        }
    }

    revert(): void {
        const frame = this.#frame - 1

        this.enter()
        this.#generator.drop(frame)
    }

    leave(): void {
        while (!this.#done) {
            this.advance()
        }
    }
}

export type AnimationGenerator = Generator<void, void, void>

export type Animation = () => AnimationGenerator

function* empty_generator() { }