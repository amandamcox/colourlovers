import * as React from "react";
import { ApolloQueryResult, gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import { SwatchContext, SwatchDispatch } from "../contexts/SwatchContext";
import SwatchGrid from "../components/SwatchGrid";
import Button from "../components/Button";

const GET_SWATCHES = gql`
	query($resultOffset: Int!) {
		colors(numResults: 14, sortBy: "rank", resultOffset: $resultOffset) {
			id
			hex
		}
	}
`;

export default function Swatches() {
	const [allSwatches, setAllSwatches] = React.useState<any>([]);
	const swatchState = React.useContext(SwatchContext);
	const swatchDispatch = React.useContext(SwatchDispatch);
	const api = useQuery(GET_SWATCHES, {
		variables: { resultOffset: 0 },
		notifyOnNetworkStatusChange: true,
	});

	React.useEffect(() => {
		const savedSwatches = JSON.parse(
			localStorage.getItem("swatches") as string
		);
		if (savedSwatches?.length) {
			swatchDispatch({ type: "REPLACE_SWATCHES", payload: savedSwatches });
		}
	}, []); //eslint-disable-line

	React.useEffect(() => {
		if (api.data?.colors && !allSwatches.length) {
			setAllSwatches(api.data.colors);
		}
	}, [api.data?.colors]);

	const handleSwatchClick = (hex: string) => {
		if (swatchState.selectedColors.includes(hex)) {
			localStorage.setItem(
				"swatches",
				JSON.stringify(
					swatchState.selectedColors.filter((color) => color !== hex)
				)
			);
			return swatchDispatch({ type: "REMOVE_SWATCH", payload: hex });
		}
		localStorage.setItem(
			"swatches",
			JSON.stringify([...swatchState.selectedColors, hex])
		);
		return swatchDispatch({ type: "ADD_SWATCH", payload: hex });
	};

	if (api.loading) return <Loading />;
	if (api.error) return <Error message={api.error} />;

	return (
		<Layout>
			<h1>Swatch Gallery</h1>
			<SwatchGrid
				colors={allSwatches || []}
				onClick={(hex) => handleSwatchClick(hex)}
			/>
			<Button
				style={{ alignSelf: "center" }}
				onClick={() =>
					api
						.fetchMore({ variables: { resultOffset: allSwatches.length } })
						.then((fetchMoreResult: ApolloQueryResult<any>) =>
							setAllSwatches([...allSwatches, ...fetchMoreResult.data?.colors])
						)
				}
			>
				Load More
			</Button>
		</Layout>
	);
}

const Loading = () => (
	<Layout>
		<h1>Loading...</h1>
	</Layout>
);

const Error = (message: any) => (
	<Layout>
		<h1>Error!</h1>
		<p>{message}</p>
	</Layout>
);
