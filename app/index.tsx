import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Hello World</Text>
                <Text style={styles.subtitle}>This is the first page of your app.</Text>
            </View>
            <Link
                href={"/Page2"}
                style={styles.link}
            >
                Page 2
            </Link>
        </View>
    );
}
