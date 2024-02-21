import { ApplicationTheme } from '@/themes';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ApplicationTheme {}
}
