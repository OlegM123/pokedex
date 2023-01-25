import { LOADING_START } from "../types";

export const getData = (count) => {
    return dispatch => {
        dispatch(loadingStarted())
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(addDataToStore(data));
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

const loadingEnded = () => {
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
        payload
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

export const getPokesByTag = (name, isActive) => {
    return dispatch => {
        dispatch(loadingStarted());
        fetch(`https://pokeapi.co/api/v2/type/${name}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            dispatch(addDataToStore(data));
        })
        .then(() => {
            dispatch(tagSelection(name, isActive));
            dispatch(loadingEnded());
        })
    }
}

const tagSelection = (name, isActive) => {
    return {
        type: 'TAG_SELECTION',
        name: name,
        isActive: isActive,
    }
}