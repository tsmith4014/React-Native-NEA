import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../spacer/spacer.component';
import { Text } from '../typography/text.component';
// import { CompactRestaurantInfo } from '../restaurant/compact-restaurant-info.component';
import type { Provider } from '../../utils/provider';

const ProvidersWrapper = styled.View`
    padding: 10px;
`;

export const FavoritesBar = ({
    providers,
    onNavigate,
}: {
    providers: Provider[];
    onNavigate: (screen: string, params: any) => void;
}) => {
    if (!providers.length) {
        return null;
    }
    return (
        <ProvidersWrapper>
            <Spacer position="left" size="large">
                <Text variant="caption">Favorites</Text>
                <Text variant="caption">
                    I need counseling. I want answers.
                </Text>
            </Spacer>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {providers.map((provider) => {
                    const key = provider.username;
                    return (
                        <Spacer position="left" size="medium" key={key}>
                            <TouchableOpacity
                                onPress={() =>
                                    onNavigate('ProviderDetail', {
                                        provider,
                                    })
                                }
                            >
                                {/* <CompactProviderInfo provider={provider} /> */}
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView>
        </ProvidersWrapper>
    );
};
