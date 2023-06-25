import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';


export default function Layout_Content(props: {
	children: ReactNode,
	style?: StyleProp<ViewStyle>
}): JSX.Element {
	return (
		<View
			style={[props.style, {
				gap: 10,
				padding: 10,
			}]}
		>
			{props.children}
		</View>
	);
}
