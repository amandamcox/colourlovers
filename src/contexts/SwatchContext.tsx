import * as React from "react";

type SwatchContextType = {
	selectedColors: string[];
	cartCount: number;
};

const initialState: SwatchContextType = {
	selectedColors: [],
	cartCount: 0,
};

const SwatchContext = React.createContext<SwatchContextType>(initialState);

type ACTIONTYPE =
	| { type: "ADD_SWATCH"; payload: string }
	| { type: "REMOVE_SWATCH"; payload: string }
	| { type: "REPLACE_SWATCHES"; payload: string[] };

const swatchReducer = (state: typeof initialState, action: ACTIONTYPE) => {
	switch (action.type) {
		case "ADD_SWATCH":
			return {
				...state,
				selectedColors: [...state.selectedColors, action.payload],
				cartCount: state.selectedColors.length + 1,
			};
		case "REMOVE_SWATCH":
			return {
				...state,
				selectedColors: state.selectedColors.filter(
					(color) => color !== action.payload
				),
				cartCount: state.selectedColors.length - 1,
			};
		case "REPLACE_SWATCHES":
			return {
				...state,
				selectedColors: [...action.payload],
				cartCount: action.payload.length,
			};
		default:
			return state;
	}
};

const SwatchDispatch = React.createContext<React.Dispatch<ACTIONTYPE>>(
	() => null
);

type SwatchProviderProps = { children: React.ReactNode };

const SwatchProvider = ({ children }: SwatchProviderProps) => {
	const [state, dispatch] = React.useReducer(swatchReducer, initialState);

	return (
		<SwatchContext.Provider value={state}>
			<SwatchDispatch.Provider value={dispatch}>
				{children}
			</SwatchDispatch.Provider>
		</SwatchContext.Provider>
	);
};

export { SwatchContext, SwatchDispatch, SwatchProvider };
