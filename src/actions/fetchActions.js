export function fetchGitProject(querry) {
    var urlParams = querry.text+"+language:"+querry.lang+"+topic:"+querry.topic
    return function(dispatch) {
        /*
        to add a loading text
         */
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
export function fetchGitCode(querry) {
    var urlParams = querry.text+"+in:file+repo:"+querry.topic
    return function(dispatch) {
        /*
        to add a loading text
         */
        dispatch({type: "FETCH_GIT"});
        /*
           search the git with the REST API
        */
        fetch("https://api.github.com/search/code?q="+urlParams)
            .then(response => response.json())
            .then((response) => {
                dispatch({type: "FETCH_GIT_FULFILLED", payload: response})
            })
            .catch((err) => {
                dispatch({type: "FETCH_GIT_REJECTED", payload: err})
            })
    }
}
