import { Link } from "expo-router";
import { Text, View } from "react-native";
import Config from "../../Classes/Config";
import { languages } from "./languages";
import { styles } from "./styles";

export default function Page2Screen() {

    const text = languages[Config.language]

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>
                    {text["Page 2"]}
                </Text>
                <Text style={styles.subtitle}>
                    {text["This is the second page of your app."]}
                </Text>
            </View>
            <Link
                href={"/Projects"}
                style={styles.link}
            >
                {text["Back Home"]}
            </Link>
        </View>
    )
}
