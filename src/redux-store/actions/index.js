import { GET_POKE_DESC, UPDATE_MODAL } from "../types";

export const getData = (count) => {
    return dispatch => {
        dispatch(loadingStarted())
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`)
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
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1500')
            .then(response => {
                return response.json();
            })
            .then(data => {        
                dispatch(addDataToStore(data.results.filter(item => item.name.includes(text))));
            })
    }
}

const clearResults = () => {
    return {
        type: 'CLEAR_STORE',
    }
}

export const getPokesByTag = (name, count) => {
    return dispatch => {
        dispatch(loadingStarted());
        fetch(!!name ? `https://pokeapi.co/api/v2/type/${name}` : `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(addDataToStore(data.pokemon));
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
        payload: payload.flavor_text_entries[0].flavor_text.replace('', ''),
    }
}