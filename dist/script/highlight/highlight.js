import Prism from "../lib/prism.min.js";
export function highlight(source, language) {
    try {
        return Prism.highlight(source, Prism.languages[language]);
    }
    catch (err) {
        return `the language ${language} is not defined`;
    }
}
