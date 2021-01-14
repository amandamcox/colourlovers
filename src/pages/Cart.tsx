import * as React from "react";
import Layout from "../components/Layout";
import { StyledGrid } from "../components/SwatchGrid";
import SwatchCard from "../components/SwatchCard";
import { SwatchContext, SwatchDispatch } from "../contexts/SwatchContext";

export default function Cart() {
	const swatchState = React.useContext(SwatchContext);
	const swatchDispatch = React.useContext(SwatchDispatch);

	React.useEffect(() => {
		const savedSwatches = JSON.parse(
			localStorage.getItem("swatches") as string
		);
		if (savedSwatches?.length) {
			swatchDispatch({ type: "REPLACE_SWATCHES", payload: savedSwatches });
		}
	}, []); //eslint-disable-line

	return (
		<Layout>
			<h1>Your current color cart palette</h1>
			<StyledGrid>
				{swatchState.selectedColors.map((color, index) => (
					<SwatchCard
						key={`card-${index}`}
						isCart={true}
						hex={color}
						onClick={() => {
							localStorage.setItem(
								"swatches",
								JSON.stringify(
									swatchState.selectedColors.filter(
										(selected) => selected !== color
									)
								)
							);
							swatchDispatch({ type: "REMOVE_SWATCH", payload: color });
						}}
					/>
				))}
			</StyledGrid>
		</Layout>
	);
}
