import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getData, getPokesByTag, tagSelection, handleSearch, updatePaginationData } from "../redux-store/actions";
import { FcSearch } from 'react-icons/fc';
import pokedex from "../img/pokedex logo.png";

const SearchPanel = ({ countOfPokemons }) => {

    const pokeTypes = useSelector(state => state.pokeTypes);
    const activeTags = useSelector(state => state.activeTags);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(getData());
    }, [])

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
                <div>
                    <input type={"text"}
                        placeholder="search! but it takes some time"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <SearchButton onClick={() => { searchText.length && dispatch(handleSearch(searchText)) }}>
                        <FcSearch />
                    </SearchButton>
                </div>
            </StyledDiv>
            <PaginationSelector>
                <NavButton
                    onClick={() => setOffset(offset - limit)}
                    disabled={offset - limit < 0}
                >
                    Previous
                </NavButton>
                <NavButton
                    onClick={() => setOffset(offset + limit)}
                    disabled={offset + limit > countOfPokemons}
                >
                    Next
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
            <Border />
            <TagContainer>
                {pokeTypes.map((item, index) => {
                    return (
                        <Tag
                            key={index}
                            bgcolor={item.bgcolor}
                            fcolor={item.fcolor}
                            onClick={
                                () => {
                                    dispatch(tagSelection(item.type));
                                    setOffset(0);
                                }
                            }
                            name={item.type}
                            activeTags={activeTags}
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

const NavButton = styled.button`
    border-radius: 3px;
    height: 25px;
    margin: 0 5px;
    border: 1px solid rgb(133, 133, 133);
    cursor: pointer;
    &:hover {
        background-color: #e0fce0;
    }
`

const StyledDiv = styled.div`
    height: 25px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    max-width: 700px;
    margin: 0 auto;
`
const PaginationSelector = styled(StyledDiv)`
    justify-content: flex-end;
`
const Border = styled.div`
    border-bottom: 2px solid #e0e0e0;
    width: 100%;
`
const SearchButton = styled.button`
    height: 20px;
    width: 30px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid rgb(133, 133, 133);
    margin-left: 10px;
    &:hover {
        background-color: #e0fce0;
    }
`

const Wrapper = styled.div`
    position: fixed;
    background-color: white;
    width: 100vw;
    top: 0;
`
const Tag = styled.div`
    background-color: ${props => props.bgcolor};
    color: ${props => props.activeTags.includes(props.name) ? 'white' : props.fcolor};
    border: 2px ${props => props.activeTags.includes(props.name) ? 'dashed' : 'solid'} ${props => props.fcolor};
    width: fit-content;
    padding: 2px 5px;
    margin: 2px;
    border-radius: 15px;
    cursor: pointer;
    text-transform: capitalize;
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
    width: 40px;
    cursor: pointer;
`

const PokedexLogo = styled.div`
    background-image: url('${pokedex}');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 200px;
    height: 70px;
`

export default SearchPanel;