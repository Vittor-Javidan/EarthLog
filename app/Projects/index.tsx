import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import Config from "../../Classes/Config";
import Background from "../../Components/Background";
import { languages } from "./languages";
import { styles } from "./styles";

export default function ProjectsScreen() {

    const texts = languages[Config.language]

    return (
        <Background style={styles.container}>
            <Text style={styles.title}>
                {texts["Projects"]}
            </Text>
            <ScrollView>
            </ScrollView>
            <Link
                style={styles.link}
                href={'/Page2'}
            >
                {texts["New Project"]}
            </Link>
        </Background>
    );
}
