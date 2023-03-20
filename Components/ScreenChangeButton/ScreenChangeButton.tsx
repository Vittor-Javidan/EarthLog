import { useRouter } from "expo-router"
import { Href } from "expo-router/src/link/href"
import { Image, ImageSourcePropType, ImageStyle, Pressable, StyleProp, ViewStyle } from "react-native"

export default function ScreenChangeButton(props: {
    route: Href
    imgRelativePath: ImageSourcePropType
    containerStyle?: StyleProp<ViewStyle>
    imageStyle?: StyleProp<ImageStyle>
}) {

    const router = useRouter()

    return (<>
        <Pressable
            style={props.containerStyle}
            onPress={() => router.replace(props.route)}
        >
            <Image
                style={props.imageStyle}
                source={props.imgRelativePath}
            />
        </Pressable>
    </>)
}