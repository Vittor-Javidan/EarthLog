import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import Settings from "../../Classes/Settings";
import Background from "../../Components/Background";
import SettingsButton from "../../Components/SettingsButton";
import { styles } from "./styles";
import { languages } from "./translations";

export default function ProjectsScreen() {

    const texts = languages[Settings.language]  

    return (
        <Background style={styles.container}>
            <SettingsButton 
                route={'/GeneralSettings'}
                LinkStyle={styles.settingsLink}
                SvgStyle={styles.settingsSvg} 
                width={50}
                height={50}
            />
            <Text style={styles.title}>
                {texts["Projects"]}
            </Text>
            <ScrollView>
            </ScrollView>
            <Link style={styles.link}
                href={'/GeneralSettings'}
            >
                {texts["New Project"]}
            </Link>
        </Background>
    );
}
