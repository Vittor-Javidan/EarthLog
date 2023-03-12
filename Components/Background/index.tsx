import { ReactNode } from "react";
import { ImageBackground, StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./styles";

export default function Background(props: { 
    children: ReactNode 
    style: StyleProp<ViewStyle>
}) {
    return(
        <View style={props.style}>
            <ImageBackground
                style={styles.backgroundImage}
                source={require("../../assets/background/everest.jpg")}
            >
                {props.children}
            </ImageBackground>
        </View>
    )
}