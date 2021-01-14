import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	width: 150px;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.fonts.light};
	font-size: 14px;
	border-radius: 50px;
	border: none;
	padding: 15px;
	margin-top: 30px;
	font-weight: 600;
	:hover {
		cursor: pointer;
	}
`;

type ButtonProps = {
	children: React.ReactNode;
	style: object;
	onClick: () => void;
};
export default function Button({ children, ...props }: ButtonProps) {
	return <StyledButton {...props}>{children}</StyledButton>;
}
