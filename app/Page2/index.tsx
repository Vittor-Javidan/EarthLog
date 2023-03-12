import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Page2Component() {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Page 2</Text>
                <Text style={styles.subtitle}>This is the second page of your app.</Text>
            </View>
            <Link
                href={"/"}
                style={styles.link}
            >
                Back Home
            </Link>
        </View>
    )
}
