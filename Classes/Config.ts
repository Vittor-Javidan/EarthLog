export default class Config {
    
    static language: "eng" | "pt-br" =  "eng"

    static setLanguage(language: "eng" | "pt-br") {
        this.language = language
    }
}