import { DefaultTheme, createGlobalStyle } from "styled-components";

const theme: DefaultTheme = {
  primary: "#1E4091",
  secondary: "#F13757",
  fonts: {
    light: "#FFFFFF",
    dark: "#282828",
  },
  background: "#EFEFEF",
};

const GlobalStyle = createGlobalStyle`
	html, body {
		padding: 0;
		margin: 0;
		-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
		font-weight: 400;
		color: ${(props) => props.theme.fonts.dark};
		background-color: ${(props) => props.theme.background};
	}
	h1, h2, h3, h4 {
		font-weight: 700;
		font-size: 24px;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
`;

export { theme, GlobalStyle };
