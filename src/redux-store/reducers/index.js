import { GET_DATA, LOADING_END, LOADING_START, GET_POKE_DATA } from "../types";

const defaultState = {
    isLoading: true,
    response: 0,
    pokeData: [],
}

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state, response: action.payload };
        case LOADING_START:
            return { ...state, isLoading: true, response: 0, pokeData: [] };
        case LOADING_END:
            return { ...state, isLoading: false };
        case GET_POKE_DATA:
            return { ...state, pokeData: /*action.payload*/[...state.pokeData, action.payload] };
        default: return state
    }
}