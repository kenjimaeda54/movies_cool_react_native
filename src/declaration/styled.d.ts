import 'styled-components';
import theme from '@/themes/theme';

declare module 'styled-components' {
  type ThemeTypes = typeof theme;
  export interface DefaultTheme extends ThemeTypes { }
}