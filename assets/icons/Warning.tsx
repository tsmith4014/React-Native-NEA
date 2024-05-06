import Svg, { Path, SvgProps } from 'react-native-svg';

const WarningIcon = ({ color = '#FFA000', width = 20, height = 20, ...props }: SvgProps) => {
    return (
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...props}>
            <Path
                d="M8.5749 3.21635L1.51656 14.9997C1.37104 15.2517 1.29403 15.5374 1.29322 15.8284C1.2924 16.1195 1.3678 16.4056 1.51192 16.6585C1.65603 16.9113 1.86383 17.122 2.11465 17.2696C2.36547 17.4171 2.65056 17.4965 2.94156 17.4997H17.0582C17.3492 17.4965 17.6343 17.4171 17.8851 17.2696C18.136 17.122 18.3438 16.9113 18.4879 16.6585C18.632 16.4056 18.7074 16.1195 18.7066 15.8284C18.7058 15.5374 18.6288 15.2517 18.4832 14.9997L11.4249 3.21635C11.2763 2.97144 11.0672 2.76895 10.8176 2.62842C10.568 2.48789 10.2863 2.41406 9.9999 2.41406C9.71345 2.41406 9.43184 2.48789 9.18223 2.62842C8.93263 2.76895 8.72345 2.97144 8.5749 3.21635Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path d="M10 6.66699V11.667" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M10 14.167H10.0083" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

export default WarningIcon;