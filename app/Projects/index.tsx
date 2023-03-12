import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import Config from "../../Classes/Config";
import { languages } from "./languages";
import { styles } from "./styles";

export default function ProjectsScreen() {

    const [language, setLanguage] = useState<"eng" | "pt-br">(Config.language)
    const texts = languages[language]

    function handleLanguageChange(language: "eng" | "pt-br") {
        setLanguage(language)
        Config.setLanguage(language)
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>
                    {texts["Hello World"]}
                </Text>
                <Text style={styles.subtitle}>
                    {texts["This is the first page of your app."]}
                </Text>
                
            </View>
            <Link
                style={styles.link}
                href={"/Page2"}
            >
                {texts["Page 2"]}
            </Link>
            <Button
                onPress={() => handleLanguageChange("pt-br")}
                title="Português"
            />
            <Button
                onPress={() => handleLanguageChange("eng")}
                title="English"
            />
        </View>
    );
}
