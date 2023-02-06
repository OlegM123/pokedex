import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPokeData, updateModal } from "../redux-store/actions";
import placeholder from '../img/pokemon-pikachu.gif';
import loader from '../img/loader.gif';
import Tag from "./Tag";

const StyledPokeCard = ({ name, url }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokeData(url));
    }, [url])

    const pokeTypes = useSelector(state => state.pokeTypes);
    const pokeInfo = useSelector(state => state.pokeData.filter(item => item.name === name))[0];
    const tags = pokeInfo && pokeInfo.types.map(item => { return item.type.name })
    return (
        <StyledDiv onClick={() => dispatch(updateModal({ pokeName: `${pokeInfo.name}`, types: tags, pokeDesc: '', avatar: pokeInfo.sprites.front_default, isOpen: true }))}>
            <PokeImg url={pokeInfo && pokeInfo.sprites.front_default} />
            <PokeStats>
                {(name[0].toUpperCase() + name.slice(1))}
                <TagContainer>
                    {tags ? tags.map((item, index) => {
                        return (
                            <Tag
                                key={index}
                                bgcolor={pokeTypes.filter((elem) => elem.type === item)[0].bgcolor}
                                fcolor={pokeTypes.filter((elem) => elem.type === item)[0].fcolor}>
                                {item}
                            </Tag>
                        )
                    }) : 'Loading...'}
                </TagContainer>
            </PokeStats>
        </StyledDiv>
    )
}

const TagContainer = styled.div`
    display: flex;
    justify-content: center;
`
const StyledDiv = styled.div`
    font-size: 15px;
    width: 100%;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    text-align: center;
    display: flex;
    cursor: pointer;
    background-color: #fff;
    &:hover {
        background-color: #BDF4FF;
        border-color: #02D4FF;
        box-shadow: 0px 0px 10px #356ABC;
    }
`
const PokeImg = styled.div`
    background-image: url(${props => props.url === null ? placeholder : props.url || loader});
    background-color: white;
    background-position: center;
    background-size: contain;
    border-radius: 5px;
    width: 96px;
    height: 96px;
    /* box-shadow: 0px 0px 10px #ededed; */
    background-repeat: no-repeat;
`

const PokeStats = styled.div`
    margin: auto;
`
export default StyledPokeCard;