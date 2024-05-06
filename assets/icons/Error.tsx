import Svg, { Path, SvgProps, G, ClipPath, Defs, Rect } from 'react-native-svg';

const ErrorIcon = ({color = "#FF5722", width = 20, height=20, ...props}: SvgProps) => (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...props}>
        <G clip-path="url(#clip0_100_1129)">
            <Path
                d="M6.55008 1.66699H13.4501L18.3334 6.55033V13.4503L13.4501 18.3337H6.55008L1.66675 13.4503V6.55033L6.55008 1.66699Z"
                stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M10 6.66699V10.0003" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M10 13.333H10.0083" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </G>
        <Defs>
            <ClipPath id="clip0_100_1129">
                <Rect width={width} height={height} fill="white"/>
            </ClipPath>
        </Defs>
    </Svg>
);

export default ErrorIcon;
