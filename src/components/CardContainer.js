import React from "react";
import styled from "styled-components";

import { device } from "../redux-store/constants/device";

const CardContainer = ({ content }) => {
    return (
        <StyledDiv>
            {content}
        </StyledDiv>
    )
};

const StyledDiv = styled.div`
    display: grid;
    place-items: center;
    gap: 5px;
    grid-template-columns: repeat(1, 1fr);
    max-width: 700px;
    margin: 0 auto;
    padding-top: 10px;
    @media ${device.mobileL} {
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${device.tablet} {
        grid-template-columns: repeat(3, 1fr);
    }
`

export default CardContainer;