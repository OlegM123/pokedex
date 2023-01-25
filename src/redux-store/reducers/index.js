import { GET_DATA, LOADING_END, LOADING_START, GET_POKE_DATA, GET_POKE_TYPES, TAG_SELECTION } from "../types";

const defaultState = {
    isLoading: true,
    response: 0,
    pokeData: [],
    pokeTypes: [
        { type: 'bug', bgcolor: '#399950', fcolor: '#3BC950', isActive: false, id: 1},
        { type: 'dark', bgcolor: '#040706', fcolor: '#5A5979', isActive: false, id: 2},
        { type: 'dragon', bgcolor: '#448B95', fcolor: '#61CAD9', isActive: false, id: 3},
        { type: 'electric', bgcolor: '#E3E32B', fcolor: '#FB7272', isActive: false, id: 4},
        { type: 'fairy', bgcolor: '#981844', fcolor: '#E81467', isActive: false, id: 5},
        { type: 'fighting', bgcolor: '#973F28', fcolor: '#EF6138', isActive: false, id: 6},
        { type: 'fire', bgcolor: '#A82023', fcolor: '#FC4C5A', isActive: false, id: 7},
        { type: 'flying', bgcolor: '#4A677D', fcolor: '#93B2C7', isActive: false, id: 8},
        { type: 'ghost', bgcolor: '#313469', fcolor: '#906790', isActive: false, id: 9},
        { type: 'grass', bgcolor: '#147B3D', fcolor: '#27CB4F', isActive: false, id: 10},
        { type: 'ground', bgcolor: '#AB6E2B', fcolor: '#6E491F', isActive: false, id: 11},
        { type: 'ice', bgcolor: '#84D2F1', fcolor: '#5555CC', isActive: false, id: 12},
        { type: 'normal', bgcolor: '#735359', fcolor: '#CA98A7', isActive: false, id: 13},
        { type: 'poison', bgcolor: '#5E2D86', fcolor: '#9B69D7', isActive: false, id: 14},
        { type: 'psychic', bgcolor: '#A32B6C', fcolor: '#F61D91', isActive: false, id: 15},
        { type: 'rock', bgcolor: '#601D0C', fcolor: '#8B3E21', isActive: false, id: 16},
        { type: 'steel', bgcolor: '#5E766D', fcolor: '#42BD94', isActive: false, id: 17},
        { type: 'water', bgcolor: '#1751E2', fcolor: '#86A8FC', isActive: false, id: 18},
        { type: 'unknown', bgcolor: '#a5a5a5', fcolor: '#000000', isActive: false, id: 10001},
        { type: 'shadow', bgcolor: '#000000', fcolor: '#fc56ff', isActive: false, id: 10002},
    ],
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
            return { ...state, pokeData: [...state.pokeData, action.payload] };
        case GET_POKE_TYPES:
            return { ...state, pokeTypes: [...state.pokeTypes, action.payload] };
        case TAG_SELECTION:
            return { ...state, pokeData: [], pokeTypes: state.pokeTypes.map(item => item.type === action.name ? { ...item, isActive: action.isActive } : item)};
        default: return state;
    }
}