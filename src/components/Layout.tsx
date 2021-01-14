import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/NewEngen-Logo.svg";
import CartIcon from "../assets/CartIcon.svg";
import { SwatchContext } from "../contexts/SwatchContext";

const LayoutGrid = styled.article`
	height: 100vh;
	display: grid;
	grid-template-rows: auto 1fr auto;
	grid-template-columns: 1fr;
	align-items: center;
	row-gap: 20px;
	main {
		align-self: start;
	}
`;

const Navigation = styled.nav`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.primary};
	padding: 7px 15px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	a {
		max-height: 48px;
	}
	div.notification {
		position: relative;
	}
	span.badge {
		position: absolute;
		top: -3px;
		right: -5px;
		padding: 3px 8px;
		border-radius: 50px;
		background: ${(props) => props.theme.secondary};
		color: ${(props) => props.theme.fonts.light};
		font-weight: 600;
		font-size: 12px;
	}
`;

const StyledFooter = styled.footer`
	padding: 20px;
	text-align: center;
	font-size: 0.95rem;
`;

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
	const swatchState = React.useContext(SwatchContext);

	return (
		<LayoutGrid>
			<header>
				<Navigation>
					<Link to="/">
						<img src={Logo} alt="Home link" style={{ padding: 0 }} />
					</Link>
					<Link to="/cart">
						<div className="notification">
							<img src={CartIcon} alt="Go to cart" />
							<span className="badge">{swatchState.cartCount}</span>
						</div>
					</Link>
				</Navigation>
			</header>
			<main
				style={{
					padding: "10px 20px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{children}
			</main>
			<StyledFooter>
				&copy; {new Date().getFullYear()} New Engen & Amanda Cox
			</StyledFooter>
		</LayoutGrid>
	);
}
