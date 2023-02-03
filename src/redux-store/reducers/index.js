import { GET_DATA, LOADING_END, LOADING_START, GET_POKE_DATA, GET_POKE_TYPES, TAG_SELECTION, CLEAR_STORE, UPDATE_MODAL, GET_POKE_DESC, UPDATE_PAGINATION_DATA, SEARCH_COMPLETED } from "../types";
import pokeTypes from '../constants/pokeTypes.js';

const defaultState = {
    isLoading: false,
    response: [],
    pokeData: [],
    pokeTypes: pokeTypes,
    activeTags: [],
    modalData: {
        isOpen: false,
        pokeName: '',
        types: [],
        pokeDesc: '',
        avatar: '',
    },
    paginationData: {
        offset: 0,
        limit: 10,
    },
}

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state, response: [...action.payload.filter(item => !state.response.includes(item)), ...state.response] };
        case LOADING_START:
            return { ...state, isLoading: true, response: [] };
        case LOADING_END:
            return { ...state, isLoading: false };
        case GET_POKE_DATA:
            return { ...state, pokeData: [...state.pokeData, action.payload] };
        case GET_POKE_TYPES:
            return { ...state, pokeTypes: [...state.pokeTypes, action.payload] };
        case TAG_SELECTION:
            return { ...state, activeTags: state.activeTags.includes(action.name) ? state.activeTags.filter(item => item !== action.name) : [...state.activeTags, action.name], response: [], pokeData: [] };
        case CLEAR_STORE:
            return { ...state, activeTags: [], response: [], pokeData: [] };
        case UPDATE_MODAL:
            return { ...state, modalData: action.payload };
        case GET_POKE_DESC:
            return { ...state, modalData: { ...state.modalData, pokeDesc: action.payload } };
        case UPDATE_PAGINATION_DATA:
            return { ...state, paginationData: {offset: action.offset, limit: action.limit}};
        case SEARCH_COMPLETED:
            return {...state, response: action.payload}
        default: return state;
    }
}