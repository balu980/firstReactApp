export default function reducer(state={
    gits: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        // loading event when the outbound call is smade
        case "FETCH_GIT": {
            return {...state, fetching: true}
        }
        // event when the UA got the responce
        case "FETCH_GIT_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                gits: action.payload,
            }
        }
        default : {
            // do nothing
        }
    }

    return state
}