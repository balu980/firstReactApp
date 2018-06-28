export default function reducer(state={
    gits: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_GIT": {
            return {...state, fetching: true}
        }

        case "FETCH_GIT_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                gits: action.payload,
            }
        }
    }

    return state
}