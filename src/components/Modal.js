import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPokeDesc, updateModal } from "../redux-store/actions";
import placeholder from "../img/pokemon-pikachu.gif"

const Modal = () => {

    const modalData = useSelector(state => state.modalData);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(updateModal({ pokeName: '', types: [], pokeDesc: '', isOpen: false }))
    }
    const pokeTypes = useSelector(state => state.pokeTypes);
    const pokeInfo = useSelector(state => state.pokeData.filter(item => item.name === modalData.name))[0];
    const tags = modalData.types;
    
    useEffect(() => {
        !!modalData.pokeName.length && dispatch(getPokeDesc(modalData.pokeName));
        console.log(pokeInfo)
    }, [modalData.pokeName]);

    return (
        <ModalWindow isOpen={modalData.isOpen}>
            <AvatarContainer>
                <Avatar avatar={modalData.avatar || placeholder} />
            </AvatarContainer>
            <DataContainer>
                <Name>{modalData.pokeName || 'name'}</Name>
                <Border />
                <TagContainer>
                    {tags ? tags.map((item) => {
                    return (
                        <Tag
                            bgcolor={pokeTypes.filter((elem) => elem.type === item)[0].bgcolor}
                            fcolor={pokeTypes.filter((elem) => elem.type === item)[0].fcolor}>
                            {item}
                        </Tag>
                    )

                }) : 'Loading...'}
                </TagContainer>                
                <Border />
                <div>{modalData.pokeDesc}</div>
            </DataContainer>
            <Close onClick={closeModal}>X</Close>
        </ModalWindow>
    )
}

const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    
`

const Name = styled.div`
    text-transform: capitalize;
    font-size: 20px;
`

const Border = styled.div`
width: 100%;
border-bottom: 1px solid #e0e0e0;
margin: 10px 0; 
`

const AvatarContainer = styled.div`
    max-width: 35%;
    display: flex;
    align-items: center;
`

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
    padding: 30px 0;
`
const Close = styled.button`
    max-height: 21px;
    border: none;
    background-color: white;
    margin: 5px;
    cursor: pointer;
    &:hover {
        background-color: red;
        color: white;
        font-weight: bold;
    }
`

const ModalWindow = styled.div`
    max-width: 450px;
    width: 300ex;
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    height: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    font-size: 15px;
    border: 1px solid #e0e0e0;
    box-shadow: 0px 0px 10px #ededed;
    display: flex;
    padding: 5px;
`

const Avatar = styled.div`
    background-image: url(${props => props.avatar});
    height: 150px;
    width: 150px;
    background-repeat: no-repeat;
    background-size: cover;
`
const Tag = styled.div`
    background-color: ${props => props.bgcolor};
    color: ${props => props.fcolor};
    border: 2px solid ${props => props.fcolor};
    width: fit-content;
    padding: 2px 5px;
    margin: 2px;
    border-radius: 15px;
    cursor: pointer;
    text-transform: capitalize;
`

export default Modal;