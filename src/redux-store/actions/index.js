import { GET_POKE_DESC, UPDATE_MODAL, UPDATE_PAGINATION_DATA, SEARCH_COMPLETED } from "../types";

const defaultUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000';

export const getData = (count) => {
    return dispatch => {
        dispatch(loadingStarted())
        fetch(defaultUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(addDataToStore(data.results));
                dispatch(loadingEnded());
            });
    }
}

const addDataToStore = (payload) => {
    return {
        type: 'GET_DATA',
        payload
    }
}

const loadingStarted = () => {
    return {
        type: 'LOADING_START',
    }
}

export const loadingEnded = () => {
    return {
        type: 'LOADING_END',
    }
}

export const getPokeData = (url) => {
    return dispacth => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(pokeData => {
                dispacth(addPokeData(pokeData));
            })
    }
}

const addPokeData = (payload) => {
    return {
        type: 'GET_POKE_DATA',
        payload: payload,
    }
}

export const getPokeTypes = () => {
    return dispatch => {
        dispatch(loadingStarted())
        fetch('https://pokeapi.co/api/v2/type')
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(addPokeTypes(data));
                dispatch(loadingEnded());
            })
    }
}

const addPokeTypes = (payload) => {
    return {
        type: 'GET_POKE_TYPES',
        payload
    }
}

export const handleSearch = (text) => {
    return dispatch => {
        dispatch(clearResults());
        fetch(defaultUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(addSearchResultToStore(data.results.filter(item => item.name.includes(text))));
            })
    }
}

const addSearchResultToStore = (payload) => {
    return {
        type: SEARCH_COMPLETED,
        payload,
    }
}

const clearResults = () => {
    return {
        type: 'CLEAR_STORE',
    }
}

export const getPokesByTag = (name) => {
    return dispatch => {
        dispatch(loadingStarted());
        fetch(!!name ? `https://pokeapi.co/api/v2/type/${name}` : defaultUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(addDataToStore([...data.pokemon.map((item) => { return item.pokemon })]));
            })
            .then(() => {
                dispatch(loadingEnded());
            })
    }
}

export const tagSelection = (name) => {
    return {
        type: 'TAG_SELECTION',
        name: name,
    }
}

export const updateModal = (payload) => {
    return {
        type: UPDATE_MODAL,
        payload,
    }
}

export const getPokeDesc = (pokeName) => {
    return dispatch => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(addPokeDesc(data));
            })
    }
}

const addPokeDesc = (payload) => {
    return {
        type: GET_POKE_DESC,
        payload: payload?.flavor_text_entries[0]?.flavor_text.replace('', ' '),
    }
}

export const updatePaginationData = (offset, limit) => {
    return {
        type: UPDATE_PAGINATION_DATA,
        offset,
        limit,
    }
}