export default class Config {
    
    static language: Languages =  "eng"

    static setLanguage(language: Languages) {
        this.language = language
    }
}

const languages = [
    "eng", 
    "pt-br"
] as const

export type Languages = typeof languages[number]