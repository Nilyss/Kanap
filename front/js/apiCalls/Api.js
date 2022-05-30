// Création class API. Extraction de celle-ci via Fetch au format json

class Api {
    constructor() {
        this._url = "http://localhost:3000/api/";
    }

   async fetch(val) {
        return fetch(this._url + val)
            .then(response => {
                return response.json()
            })
            .then(data => {
                return data;
            })
            .catch(erreur => ("Erreur :" + erreur))
    }

    async post(val, userOrder) {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userOrder)
        };

        fetch(this._url + val, options)
            .then(response => response.json())
            .then(data => {
                window.location = `./confirmation.html?orderid=${data.orderId}`;
            })
            .catch(error => ("Erreur : " + error))
    }

}