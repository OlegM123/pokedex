import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getData } from "../redux-store/actions";

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
border-bottom: 1px solid #e0e0e0;
width: 100%;
`
const Wrapper = styled.div`
position: fixed;
background-color: white;
width: 100vw;
`

const SearchPanel = () => {

    const pokeCount = useSelector(state => state.response.count) || 0;
    const dispatch = useDispatch();
    const [count, setCount] = useState("10");
    useEffect(() => {
        dispatch(getData(count));
    }, [count])

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
        </Wrapper>
    )
}

export default SearchPanel;