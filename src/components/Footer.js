import React from "react"
import styled from "styled-components"
import { UilGithub, UilLinkedin } from "@iconscout/react-unicons"

export const Footer = () => {
	return (
		<Container>
			<Copyright>
				Built by{" "}
				<a
					style={{ color: "black" }}
					href="https://www.loganbertrand.com/"
					aria-label="Personal Portfolio link for Logan Bertrand"
				>
					Logan Bertrand
				</a>{" "}
				{new Date().getFullYear()}
			</Copyright>
			<IconWrapper>
				<a
					href="https://github.com/loganbertrand"
					style={{ color: "black" }}
					target="_blank"
					rel="noreferrer"
					aria-label="View Logan Bertrand's Github Profile"
				>
					<UilGithub fontSize="medium" />
				</a>
				<a
					href="https://www.linkedin.com/in/logan-bertrand-/"
					style={{ color: "black" }}
					target="_blank"
					rel="noreferrer"
					aria-label="View Logan Bertrand's LinkedIn Profile"
				>
					<UilLinkedin fontSize="medium" />
				</a>
			</IconWrapper>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 15vh;
	width: 100%;
	background-color: whitesmoke;
`
const Copyright = styled.p`
	font-size: 12px;
`
const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1%;
`
