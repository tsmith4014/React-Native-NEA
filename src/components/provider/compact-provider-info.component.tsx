import React from 'react';
import styled from 'styled-components/native';
// import WebView from 'react-native-webview';
import { Platform } from 'react-native';
import { Text } from '../typography/text.component';
import type { Provider } from '../../utils/provider';

const CompactImage = styled.Image`
    border-radius: 10px;
    width: 120px;
    height: 100px;
`;

const Item = styled.View`
    padding: 10px;
    max-width: 120px;
    align-items: center;
`;

const isAndroid = Platform.OS === 'android';

export const CompactProviderInfo = ({ provider }: { provider: Provider }) => {
    return (
        <Item>
            <CompactImage source={{ uri: provider.photos[0] }} />
            <Text variant="caption" numberOfLines={3}>
                {provider.username}
            </Text>
        </Item>
    );
};
