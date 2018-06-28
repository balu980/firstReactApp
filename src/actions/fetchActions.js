export function fetchGit(querry) {
    var urlParams = "language:"+querry.lang+"+topic:"+querry.topic
    return function(dispatch) {
        dispatch({type: "FETCH_GIT"});

        /*
           search the git with the REST API
        */
        fetch("https://api.github.com/search/repositories?q="+urlParams)
            .then(response => response.json())
            .then((response) => {
                dispatch({type: "FETCH_GIT_FULFILLED", payload: response})
            })
            .catch((err) => {
                dispatch({type: "FETCH_GIT_REJECTED", payload: err})
            })
    }
}
