import { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Settings from "../../Classes/Settings";
import Background from "../../Components/Background";
import ScreenChangeButton from "../../Components/ScreenChangeButton/ScreenChangeButton";
import { styles } from "./styles";
import { languages } from "./translations";

export default function LanguageSelectionScreen() {

    const [language, setLanguage] = useState(Settings.language)
    const text = languages[language]

    return (
        <Background style={styles.background}>
            <ScreenChangeButton 
                route={'/GeneralSettingsScreen'}
                imgRelativePath={require('../../assets/icons/closeIcon_WithShadow.png')}
                containerStyle={styles.container_CLoseButton}
                imageStyle={styles.image_CLoseButton}
            />
            <Text style={styles.title}>
                {text["Languages"]}
            </Text>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <TouchableOpacity style={styles.touchableOpacity}
                    onPress={() => {
                        Settings.setLanguage("en-US")
                        setLanguage("en-US")
                    }}
                >
                    <Text style={styles.text}>
                        {text["English"]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpacity}
                    onPress={() => {
                        Settings.setLanguage("pt-BR")
                        setLanguage("pt-BR")
                    }}
                >
                    <Text style={styles.text}>
                        {text["Português-Brasil"]}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </Background>
    )
}
