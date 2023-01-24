import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPokeData } from "../redux-store/actions";

const StyledDiv = styled.div`
    font-size: 15px;
    width: 90%;
    max-height: 184px;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0px 0px 10px #ededed;
    text-align: center;
    margin-bottom: 10px;
`
const PokeImg = styled.div`
    background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
    background-position: center;
    background-size: contain;
    width: 96px;
    height: 96px;
    box-shadow: 0px 0px 10px #ededed;
`


const StyledPokeCard = ({ pokeName, url }) => {

    const dispacth = useDispatch();
    const isLoading = !!useSelector(state => state.response)

    useEffect(() => {
    !isLoading && dispacth(getPokeData(url))
    },[isLoading])

    return (
        <StyledDiv>
            <PokeImg />
            Name: {pokeName}
            <br />
            URL: {url}
        </StyledDiv>
    )
}

export default StyledPokeCard;