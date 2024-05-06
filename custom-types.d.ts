import { Theme } from '@/infrastructure/theme';
import 'styled-components/native';

declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {}
}
