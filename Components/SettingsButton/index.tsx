import { Link } from 'expo-router';
import { Href } from 'expo-router/src/link/href';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SettingsButton(props: {
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
                viewBox="0 0 130 130" fill="none"
            >
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M1 55.8571V74.1429L17.9796 78.0612L21.898 89.8163L12.7551 104.184L25.8163 117.245L40.1837 108.102L51.9388 112.02L55.8571 129H74.1429L78.0612 112.02L89.8163 108.102L104.184 117.245L117.245 104.184L108.102 89.8163L112.02 78.0612L129 74.1429V55.8571L112.02 51.9388L108.102 40.1837L117.245 25.8163L102.878 12.7551L89.8163 21.898L78.0612 17.9796L74.1429 1H55.8571L51.9388 17.9796L45 20.2925L40.1837 21.898L25.8163 12.7551L12.7551 25.8163L21.898 40.1837L17.9796 51.9388L1 55.8571ZM43.5 68C41.5 51.5 55.5 45.5 55.5 45.5C73.5 37.5 84.436 52.2228 86 59C88.7692 71 83 81 74 85C59.5 90.5 46 82.5 43.5 68Z" fill="white"/>
                <Path d="M45 20.2925L51.9388 17.9796L55.8571 1H74.1429L78.0612 17.9796L89.8163 21.898L102.878 12.7551L117.245 25.8163L108.102 40.1837L112.02 51.9388L129 55.8571V74.1429L112.02 78.0612L108.102 89.8163L117.245 104.184L104.184 117.245L89.8163 108.102L78.0612 112.02L74.1429 129H55.8571L51.9388 112.02L40.1837 108.102L25.8163 117.245L12.7551 104.184L21.898 89.8163L17.9796 78.0612L1 74.1429V55.8571L17.9796 51.9388L21.898 40.1837L12.7551 25.8163L25.8163 12.7551L40.1837 21.898L45 20.2925ZM45 20.2925L55.5 45.5M55.5 45.5C55.5 45.5 41.5 51.5 43.5 68C46 82.5 59.5 90.5 74 85C83 81 88.7692 71 86 59C84.436 52.2228 73.5 37.5 55.5 45.5Z" stroke="white"/>
            </Svg>
        </Link>
    )
}