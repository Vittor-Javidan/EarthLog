import { Link } from "expo-router";
import { Href } from "expo-router/src/link/href";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from 'react-native-svg';
import Settings from "../../../Classes/Settings";
import Background from "../../../Components/Background";
import { closeButtonStyles, generalSettingScreenStyles } from "./styles";
import { languages } from "./translations";

export default function GeneralSettingScreen() {

    const [language, setLanguage] = useState(Settings.language)
    const text = languages[language]

    return (
        <Background style={generalSettingScreenStyles.background}>
            <CloseButton 
                route={'/GeneralSettings'}
            />
            <Text style={generalSettingScreenStyles.title}>
                {text["Languages"]}
            </Text>
            <ScrollView contentContainerStyle={generalSettingScreenStyles.scrollView}>
                <TouchableOpacity style={generalSettingScreenStyles.touchableOpacity}
                    onPress={() => {
                        Settings.setLanguage("en-US")
                        setLanguage("en-US")
                    }}
                >
                    <Text style={generalSettingScreenStyles.text}>
                        {text["English"]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={generalSettingScreenStyles.touchableOpacity}
                    onPress={() => {
                        Settings.setLanguage("pt-BR")
                        setLanguage("pt-BR")
                    }}
                >
                    <Text style={generalSettingScreenStyles.text}>
                        {text["Português-Brasil"]}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </Background>
    )
}

function CloseButton(props: {
    route: Href
}) {

    return (<>
        <Link
            style={closeButtonStyles.link}
            href={props.route}
        >
            <Svg
                style={closeButtonStyles.svg} 
                width={closeButtonStyles.svg.width} 
                height={closeButtonStyles.svg.height} 
                viewBox="0 0 131 130" fill="none"
            >
                <Path d="M46.6893 65.2326L1.5 20.5491L22.0319 1L66.229 45L110.426 1L129.5 20.5491L85.8411 65.2326L129.5 108.985L110.426 129L66.229 84.7817L22.0319 129L1.5 108.985L46.6893 65.2326Z" fill="white" stroke="white"/>
            </Svg>
        </Link>
        <Image
            style={closeButtonStyles.image}
            source={require('../../../assets/icons/closeIcon_WithShadow.png')}
        />
    </>)
}