import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getData, getPokesByTag } from "../redux-store/actions";

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
const Wrapper = styled.div`
position: fixed;
background-color: white;
width: 100vw;
`
const Tag = styled.div`
    background-color: ${props => props.bgcolor};
    color: ${props => props.isActive && 'white' || props.fcolor};
    border: 2px ${props => props.isActive ? 'dashed' : 'solid'} ${props => props.fcolor};
    width: fit-content;
    padding: 2px 5px;
    margin: 2px;
    border-radius: 15px;
    cursor: pointer;
`
const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const SearchPanel = () => {

    const pokeCount = useSelector(state => state.response.count)||  0;
    const pokeTypes = useSelector(state => state.pokeTypes);
    const dispatch = useDispatch();
    const [count, setCount] = useState("10");
    useEffect(() => {
        dispatch(getData(count));
    }, [count]);

    return (
        <Wrapper>
            <StyledDiv>
                <a>There is a {pokeCount} pokemons!</a>
                <input type={"text"}></input>
            </StyledDiv>
            <PaginationSelector>
                pokes on the page
                <select onChange={(e) => {
                    setCount(e.target.value)
                }
                }>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </PaginationSelector>
            <Border />
            <TagContainer>
                {pokeTypes.map((item, index) => {
                    return (
                        <Tag
                            key={index}
                            bgcolor={item.bgcolor}
                            fcolor={item.fcolor}
                            onClick={() => dispatch(getPokesByTag(item.type, !item.isActive))}
                            isActive={item.isActive}
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

export default SearchPanel;