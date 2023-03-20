import { Pressable, ScrollView, Text } from "react-native";

import Settings from "../../Classes/Settings";
import Background from "../../Components/Background";
import ScreenChangeButton from "../../Components/ScreenChangeButton/ScreenChangeButton";

import { styles } from "./styles";
import { languages } from "./translations";

export default function ProjectsScreen() {

    const texts = languages[Settings.language]  

    return (
        <Background style={styles.background}>
            <ScreenChangeButton 
                route={'/GeneralSettings'}
                imgRelativePath={require('../../assets/icons/settingsGear_WithShadow.png')}
                containerStyle={styles.container_SettingButton}
                imageStyle={styles.image_SettingButton}
            />
            <Text style={styles.screenTitle}>
                {texts["Projects"]}
            </Text>
            <ScrollView>        
                {/* 
                    Space dedicated for projects components - It's where saved
                    projects will be displayed.
                */}
            </ScrollView>
            <Pressable
                style={styles.view_NewProjectButton}
                onPress={() => alert('Project Created')}
            >
                <Text
                    style={styles.text_NewProjectButton}
                >
                    {texts["New Project"]}
                </Text>
            </Pressable>
        </Background>
    );
}
