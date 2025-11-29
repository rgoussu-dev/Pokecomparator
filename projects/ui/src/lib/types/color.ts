export type Color = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
export type ColorShade = 'light' | 'main' | 'dark' | 'contrast';
export type ColorVariant = `${Color}-${ColorShade}` | Color;
