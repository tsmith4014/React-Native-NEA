import { AlertCircle } from 'react-native-feather';
import { SvgProps } from 'react-native-svg';

const WarningIcon = ({ color = '#FFA000', width = 20, height = 20, ...props }: SvgProps) => (
    <AlertCircle color={color} width={width} height={height} {...props} />
);

export default WarningIcon;
