import { memo, ReactNode } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TutorialScreen = memo((props: {
  children: ReactNode
}) => {

  const {top, bottom}    = useSafeAreaInsets();
  const {width, height } = Dimensions.get("screen");

  return (
    <View
      style={{
        marginTop: top,
        height: height - top - bottom,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingVertical: 20,
        gap: 20,
      }}
    >
      {props.children}
    </View>
  )
})