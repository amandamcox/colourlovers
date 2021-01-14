/// <reference types="react-scripts" />
import "styled-components";
import "colors";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    fonts: {
      light: string;
      dark: string;
    };
    background: string;
  }
}

declare module "colors";
