import { Languages } from "../../Classes/Settings";

export const languages: Record<Languages, {
    "General Settings": string,
    "This is the second page of your app.": string,
    "Back Home": string
}> = {
    "en-US": {
        "General Settings": "General Settings",
        "This is the second page of your app.": "This is the second page of your app.",
        "Back Home": "Back Home"
    },
    "pt-BR": {
        "General Settings": "Configurações",
        "This is the second page of your app.": "Essa é a segunda página do seu app",
        "Back Home": "Voltar ao início"
    }
}