import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import client from "./lib/gqlClient";
import { theme, GlobalStyle } from "./styles";
import Routes from "./Routes";
import { SwatchProvider } from "./contexts/SwatchContext";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Router>
				<ApolloProvider client={client}>
					<SwatchProvider>
						<Routes />
					</SwatchProvider>
				</ApolloProvider>
			</Router>
		</ThemeProvider>
	);
}
