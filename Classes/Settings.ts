import { getLocales } from "expo-localization"

const languages = [
    "pt-BR",
    "en-US"
] as const

export default class Settings {
    
    static language: Languages =  getDeviceLanguage()

    static setLanguage(language: Languages) {
        this.language = language
    }
}

function getDeviceLanguage() {

    const languageTag = getLocales()[0].languageTag as Languages

    if(languages.includes(languageTag)) {
        return languageTag
    }
    return "en-US"
}

export type Languages = typeof languages[number]