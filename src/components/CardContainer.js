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
    grid-template-columns: auto;
    grid-template-rows: auto;
    max-width: 700px;
    margin: 0 auto;
    justify-items: stretch;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 660px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 450px) {
        grid-template-columns: repeat(1, 1fr);
    }
    margin-top: 136px;
    @media (max-width: 549px) {
        margin-top: 95px;
    }
`
export default CardContainer;