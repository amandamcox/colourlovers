import * as React from "react";
import styled from "styled-components";
import SwatchCard from "./SwatchCard";

export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	grid-gap: 20px;
`;

type ColorObjectTypes = {
	id: number;
	hex: string;
	__typename: string | undefined;
};
type SwatchGridProps = {
	colors: ColorObjectTypes[];
	onClick: (hex: string) => void;
};

export default function SwatchGrid({ colors, onClick }: SwatchGridProps) {
	return (
		<StyledGrid>
			{colors.map((color: ColorObjectTypes) => (
				<SwatchCard
					key={color.id}
					hex={color.hex}
					onClick={onClick}
					isCart={false}
				/>
			))}
		</StyledGrid>
	);
}
