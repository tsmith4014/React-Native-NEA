// import React, { useContext } from 'react';
// import styled from 'styled-components';
// import { AntDesign } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native';
// import { FavoritesContext } from '../../services/favorites/favorites.context';
// import type { Provider } from '../../utils/provider';

// const FavoriteButton = styled(TouchableOpacity)`
//     position: absolute;
//     top: 25px;
//     right: 25px;
//     z-index: 9;
// `;

// export const Favorite = ({ restaurant }: { restaurant: Restaurant }) => {
//     const { favorites, addToFavorites, removeFromFavorites } =
//         useContext(FavoritesContext);
//     const isFavorite = favorites.find((r) => r.placeId === restaurant.placeId);

//     return (
//         <FavoriteButton
//             onPress={() => {
//                 !isFavorite
//                     ? addToFavorites(restaurant)
//                     : removeFromFavorites(restaurant);
//             }}
//         >
//             <AntDesign
//                 name={isFavorite ? 'heart' : 'hearto'}
//                 size={24}
//                 color={isFavorite ? 'red' : 'white'}
//             />
//         </FavoriteButton>
//     );
// };
