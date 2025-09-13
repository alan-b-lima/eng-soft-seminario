declare var Prism: {
    manual: boolean,
    highlight(code: string, language: LanguageGrammar): string
    languages: Record<Language, LanguageGrammar>
}

export type Language = "c" | "clike" | "cpp" | "go" | "java" | "javascript" | "js" | "python" | "py" | (string & {})

type LanguageGrammar = "#language grammar"

export default Prism