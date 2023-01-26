import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPokeData } from "../redux-store/actions";
import placeholder from '../img/pokemon-pikachu.gif';
import loader from '../img/loader.gif';

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
    display: flex;
    cursor: pointer;
    &:hover {
        background-color: #e0fce0;
    }
`
const PokeImg = styled.div`
    background-image: url(${props => props.url === null ? placeholder : props.url || loader});
    background-color: white;
    background-position: center;
    background-size: contain;
    width: 96px;
    height: 96px;
    box-shadow: 0px 0px 10px #ededed;
    background-repeat: no-repeat;
`

const PokeStats = styled.div`
    margin: auto;
`

const StyledPokeCard = ({ name, url }) => {

    const dispacth = useDispatch();

    useEffect(() => {
       dispacth(getPokeData(url));        
    }, [])

    const pokeInfo = useSelector(state => state.pokeData.filter(item => item.name === name))[0];
    const tags = pokeInfo && pokeInfo.types.map(item => {return item.type.name}).join(' ')
    return (
        <StyledDiv>
            <PokeImg url={pokeInfo && pokeInfo.sprites.front_default} />
            <PokeStats>
                Name: {(name[0].toUpperCase() + name.slice(1))}
                <br />
                Type: {tags || 'Loading...'}
            </PokeStats>
        </StyledDiv>
    )
}



export default StyledPokeCard;