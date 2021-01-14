import * as React from "react";
import styled from "styled-components";
// @ts-ignore
import Color from "color";
import { SwatchContext } from "../contexts/SwatchContext";
import TrashIcon from "../assets/TrashIcon.svg";

type StyledCardProps = {
	background: string;
	lightColor: boolean;
	hoverColor: string;
	selected: boolean;
};

const StyledCard = styled.div<StyledCardProps>`
	border-radius: 4px;
	height: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #${(props) => props.background};
	color: ${(props) =>
		props.lightColor ? props.theme.fonts.dark : props.theme.fonts.light};
	font-weight: 600;
	border: ${(props) =>
		props.selected ? `4px solid ${props.hoverColor}` : `4px solid transparent`};
	:hover {
		border: ${(props) =>
			props.hoverColor
				? `4px solid ${props.hoverColor}`
				: `4px solid transparent`};
		cursor: pointer;
	}
`;

const HoverContainer = styled.div<{ isCart: boolean }>`
	position: relative;
	img {
		position: absolute;
		top: 5px;
		right: 5px;
		opacity: 0;
		transition: 0.3s ease;
	}
	:hover img {
		opacity: ${(props) => (props.isCart ? 1 : 0)};
	}
`;

type SwatchCardProps = {
	hex: string;
	onClick: (hex: string) => void | undefined;
	isCart: boolean;
};
export default function SwatchCard({
	hex,
	onClick,
	isCart = false,
}: SwatchCardProps) {
	const swatchState = React.useContext(SwatchContext);
	const currentColor = Color(`#${hex}`);
	const lightColor = currentColor.isLight();
	const hoverColor = isCart ? null : currentColor.darken(0.5);

	return (
		<HoverContainer isCart={isCart}>
			<StyledCard
				background={hex}
				lightColor={lightColor}
				hoverColor={hoverColor}
				selected={isCart ? false : swatchState.selectedColors.includes(hex)}
				onClick={() => onClick(hex)}
			>
				{`#${hex}`}
			</StyledCard>
			<img src={TrashIcon} alt="Delete" />
		</HoverContainer>
	);
}
