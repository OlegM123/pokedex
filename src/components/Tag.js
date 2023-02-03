import styled from "styled-components";

const Tag = styled.div`
    background-color: ${props => props.bgcolor};
    color: ${props => props.fcolor};
    border: 2px ${props => props.active ? 'dashed' : 'solid'} ${props => props.bcolor};
    width: fit-content;
    padding: 2px 5px;
    margin: 2px;
    border-radius: 15px;
    cursor: pointer;
    text-transform: capitalize;     
`

export default Tag;