import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateModal } from "../redux-store/actions";

const Modal = () => {

    const modalData = useSelector(state => state.modalData);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(updateModal({ pokeName: '', types: [], pokeDesc: '', isOpen: false }))
    }

    return (
        <ModalWindow isOpen={modalData.isOpen}>
            <Avatar avatar={modalData.avatar} />
            <div>{modalData.pokeName || 'name'}</div>
            <div>{modalData.types ? modalData.types : 'type'}</div>
            <div>{modalData.pokeDesc || 'desc'}</div>
            <button onClick={closeModal}>close</button>
        </ModalWindow>
    )
}

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
`

const Avatar = styled.div`
    background-image: url(${props => props.avatar});
    height: 150px;
    width: 150px;
    background-repeat: no-repeat;
    background-size: cover;
`

export default Modal;