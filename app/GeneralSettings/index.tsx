import { ScrollView, Text } from "react-native";
import Settings from "../../Classes/Settings";
import Background from "../../Components/Background";
import CloseButton from "../../Components/CloseButton";
import { styles } from "./styles";
import { languages } from "./translations";

export default function GeneralSettingScreen() {

    const text = languages[Settings.language]

    return (
        <Background style={styles.container}>
            <CloseButton 
                route={'/Projects'}
                LinkStyle={styles.closeLink}
                SvgStyle={styles.closeSvg} 
                width={50}
                height={50}
            />
            <Text style={styles.title}>
                {text["General Settings"]}
            </Text>
            <ScrollView contentContainerStyle={styles.scrollView}>
            </ScrollView>
        </Background>
    )
}
