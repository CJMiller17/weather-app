import axios from "axios";

function axiosSwanson() {
    axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes/1")
        .then(response => console.log("data: ", response.data))
        .catch(error => {
            console.log("error": error)
    });
}

function fetchSwanson() {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes/1")
    .then(response => response.json())
    .then(data => console.log("data: ", data))
        .catch(error => {
        console.log("error: ", error)
    })
}