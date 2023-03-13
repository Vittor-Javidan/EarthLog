import { Link } from 'expo-router';
import { Href } from 'expo-router/src/link/href';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function CloseButton(props: {
    SvgStyle: StyleProp<ViewStyle>
    LinkStyle: StyleProp<TextStyle>
    route: Href
    height: number
    width: number
}) {

    return (
        <Link
            style={props.LinkStyle}
            href={props.route}
        >
            <Svg 
                style={props.SvgStyle} 
                width={props.width} 
                height={props.height}  
                viewBox="0 0 131 130" fill="none"
            >
                <Path d="M46.6893 65.2326L1.5 20.5491L22.0319 1L66.229 45L110.426 1L129.5 20.5491L85.8411 65.2326L129.5 108.985L110.426 129L66.229 84.7817L22.0319 129L1.5 108.985L46.6893 65.2326Z" fill="white" stroke="white"/>
            </Svg>
        </Link>
    )
}