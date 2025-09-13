import Prism, { Language } from "../lib/prism.min.js"

export function highlight(source: string, language: Language): string {
    try {
        return Prism.highlight(source, Prism.languages[language])
    } catch (err) {
        return `the language ${language} is not defined`
    }
}

export { Language }