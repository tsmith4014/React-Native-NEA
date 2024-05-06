import { User } from 'react-native-feather';
import { SvgProps } from 'react-native-svg';

const UserIcon = ({ color = '#5D5D61', width = 20, height = 20, ...props }: SvgProps) => (
    <User color={color} width={width} height={height} {...props} />
);

export default UserIcon;
