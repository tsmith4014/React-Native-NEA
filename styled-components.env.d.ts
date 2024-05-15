import { Theme } from '@/infrastructure/theme';
import 'styled-components/native';

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {}
}
