import { GET_DATA, LOADING_END, LOADING_START, GET_POKE_DATA, GET_POKE_TYPES, TAG_SELECTION, CLEAR_STORE } from "../types";
import pokeTypes from '../constants/pokeTypes.js';

const defaultState = {
    isLoading: false,
    response: [],
    pokeData: [],
    pokeTypes: pokeTypes,
    activeTags: [],
}

export const reducer = (state = defaultState, action) => {
    console.log(state);
    switch (action.type) {
        case GET_DATA:
            return { ...state, response: [...action.payload, ...state.response] };
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
        default: return state;
    }
}