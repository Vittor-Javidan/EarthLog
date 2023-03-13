import { getLocales } from "expo-localization"
import { Languages } from "../Classes/Settings"
import { languageTags } from "../Types/languageTags"

export function getDeviceLanguage(): Languages {

    const languageTag = getLocales()[0].languageTag as Languages

    if(languageTags.includes(languageTag)) {
        return languageTag
    }
    return "en-US"
}