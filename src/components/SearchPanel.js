import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getData, getPokesByTag, tagSelection, handleSearch, updatePaginationData } from "../redux-store/actions";
import { FcSearch } from 'react-icons/fc';
import pokedex from "../img/pokedex logo.png";
import Tag from "./Tag";

const SearchPanel = ({ countOfPokemons }) => {

    const pokeTypes = useSelector(state => state.pokeTypes);
    const activeTags = useSelector(state => state.activeTags);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(updatePaginationData(offset, limit));
    }, [limit, offset]);

    useEffect(() => {
        activeTags.length ?
            activeTags.forEach((item) => dispatch(getPokesByTag(item))) :
            !searchText.length && dispatch(getData());
    }, [activeTags])

    return (
        <Wrapper>
            <StyledDiv>
                <PokedexLogo />
                <PaginationSelector>
                    <NavButton
                        onClick={() => {
                            setOffset(0);
                        }}
                        disabled={offset - limit < 0}
                    >
                        {'<<'}
                    </NavButton>
                    <NavButton
                        onClick={() => {
                            setOffset(offset - limit);
                        }}
                        disabled={offset - limit < 0}
                    >
                        {'<'}
                    </NavButton>
                    {`Page ${offset / limit + 1} of ${Math.ceil(countOfPokemons / limit)}`}
                    <NavButton
                        onClick={() => {
                            setOffset(offset + limit);
                        }}
                        disabled={offset + limit > countOfPokemons}
                    >
                        {'>'}
                    </NavButton>
                    <NavButton
                        onClick={() => {
                            setOffset(limit * (Math.ceil(countOfPokemons / limit) - 1));
                        }}
                        disabled={offset + limit > countOfPokemons}
                    >
                        {'>>'}
                    </NavButton>
                    pokes on the page
                    <StyledSelect onChange={(e) => {
                        setLimit(Number(e.target.value))
                        setOffset(0);
                    }}>
                        <option value={10}>{10}</option>
                        <option value={20}>{20}</option>
                        <option value={50}>{50}</option>
                    </StyledSelect>
                </PaginationSelector>
                <PaginationSelector>
                    <StyledInput type={"text"}
                        placeholder="enter pokemon name..."
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <SearchButton onClick={() => {
                        searchText.length && dispatch(handleSearch(searchText));
                        setOffset(0);
                    }}>
                        <FcSearch />
                    </SearchButton>
                </PaginationSelector>
            </StyledDiv>
            <Border />
            <TagContainer>
                {pokeTypes.map((item, index) => {
                    return (
                        <Tag
                            key={index}
                            bgcolor={item.bgcolor}
                            fcolor={activeTags.includes(item.type) ? 'white' : item.fcolor}
                            bcolor={item.fcolor}
                            active={!!activeTags.includes(item.type)}
                            onClick={
                                () => {
                                    dispatch(tagSelection(item.type));
                                    setOffset(0);
                                }
                            }
                        >
                            {item.type}
                        </Tag>
                    )
                })}
            </TagContainer>
            <Border />
        </Wrapper>
    )
}

const StyledInput = styled.input`
    border: 1px solid #356ABC;
    border-radius: 3px;
    outline: none;
    height: 22px;
    margin-left: 10px;
`;

const NavButton = styled.button`
    background-color: #fff;
    border-radius: 3px;
    height: 25px;
    margin: 0 5px;
    border: 1px solid #356ABC;
    color: #356ABC;
    cursor: pointer;
    &:hover:enabled {
        background-color: #BDF4FF;
    }
    &:active:enabled {
        background-color: #02D4FF
    }
    &:disabled {
        background-color: #e0e0e0;
        color: #999;
        cursor: default;
    }    
`

const StyledDiv = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    max-width: 700px;
    margin: 0 auto;
    @media (max-width: 600px) {
        justify-content: left;
    }
    @media (max-width: 650px) {
        flex-direction: column ;
    }
`
const PaginationSelector = styled(StyledDiv)`
    justify-content: flex-end;
    align-items: center;
    height: 25px;
    flex-direction: row;
`
const Border = styled.div`
    border-bottom: 2px solid #e0e0e0;
    width: 100%;
`
const SearchButton = styled.button`
    height: 25px;
    width: 30px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #356ABC;
    margin-left: 10px;
    &:hover {
        background-color: #BDF4FF;
    }
    &:active {
        background-color: #02D4FF
    }
`

const Wrapper = styled.div`
    position: fixed;
    background-color: white;
    width: 100vw;
    top: 0;
`

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 700px;
    margin: 0 auto;
`

const StyledSelect = styled.select`
    margin-left: 5px;
    border-radius: 3px;
    max-width: 40px;
    height: 25px;
    cursor: pointer;
    border: 1px solid #356ABC;
    outline: none;
    &:hover {
        background-color: #BDF4FF;
    }
`

const PokedexLogo = styled.div`
    background-image: url('${pokedex}');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 200px;
    height: 70px;
    @media (max-width: 720px) {
        display: none;
    }
`

export default SearchPanel;