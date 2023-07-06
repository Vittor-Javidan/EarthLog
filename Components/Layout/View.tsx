import React, { ReactNode } from 'react';
import { StyleProp, View as ReactNative_View, ViewStyle } from 'react-native';


export default function View(props: {
	children: ReactNode,
	style?: StyleProp<ViewStyle>
}): JSX.Element {
	return (
		<ReactNative_View
			style={[props.style, {
				gap: 10,
				padding: 10,
			}]}
		>
			{props.children}
		</ReactNative_View>
	);
}
