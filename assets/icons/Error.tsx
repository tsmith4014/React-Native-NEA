import { AlertOctagon } from 'react-native-feather';
import { SvgProps } from 'react-native-svg';

const ErrorIcon = ({ color = '#FF5722', width = 20, height = 20, ...props }: SvgProps) => (
    <AlertOctagon color={color} width={width} height={height} {...props} />
);

export default ErrorIcon;
