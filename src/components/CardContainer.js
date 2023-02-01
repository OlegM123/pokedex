import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: grid;
    place-items: center;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
    margin: 0 auto;
`

const CardContainer = ({ content }) => {
    return (
        <StyledDiv>
            {content}
        </StyledDiv>
    )
};

export default CardContainer;