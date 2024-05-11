import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';

const AppleIcon = ({ width = 20, height = 20, ...props }: SvgProps) => (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...props}>
        <G clipPath="url(#clip0_3879_9322)">
            <Path
                d="M5.36035 11.7389L4.78021 13.9047L2.6598 13.9495C2.02611 12.7742 1.66667 11.4294 1.66667 10.0004C1.66667 8.61852 2.00273 7.3154 2.59844 6.16797H2.59889L4.48665 6.51406L5.31361 8.39049C5.14053 8.89508 5.04619 9.43675 5.04619 10.0004C5.04626 10.6121 5.15706 11.1982 5.36035 11.7389Z"
                fill="#FBBB00"
            />
            <Path
                d="M18.1877 8.44336C18.2834 8.94746 18.3333 9.46807 18.3333 10.0001C18.3333 10.5967 18.2706 11.1787 18.1511 11.7401C17.7454 13.6503 16.6855 15.3184 15.2171 16.4988L15.2166 16.4983L12.8389 16.377L12.5023 14.2762C13.4767 13.7048 14.2382 12.8106 14.6393 11.7401H10.1832V8.44336H14.7043H18.1877Z"
                fill="#518EF8"
            />
            <Path
                d="M15.2166 16.4989L15.217 16.4993C13.7889 17.6472 11.9748 18.334 10 18.334C6.82646 18.334 4.06732 16.5602 2.6598 13.9499L5.36035 11.7393C6.06409 13.6174 7.87591 14.9545 10 14.9545C10.913 14.9545 11.7683 14.7076 12.5023 14.2768L15.2166 16.4989Z"
                fill="#28B446"
            />
            <Path
                d="M15.3191 3.58548L12.6195 5.79564C11.8599 5.32083 10.962 5.04655 10 5.04655C7.82784 5.04655 5.98214 6.44489 5.31365 8.39043L2.5989 6.1679H2.59844C3.98536 3.49391 6.7793 1.66699 10 1.66699C12.022 1.66699 13.8759 2.38724 15.3191 3.58548Z"
                fill="#F14336"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_3879_9322">
                <Rect width="16.6667" height="16.6667" fill="white" transform="translate(1.66667 1.66699)" />
            </ClipPath>
        </Defs>
    </Svg>
);

export default AppleIcon;
