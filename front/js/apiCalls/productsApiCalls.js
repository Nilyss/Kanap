




// TEST CREATION CLASS API





class Api {
    constructor(url) {
        this._url = url;
    }

    productList() {
        fetch(this._url)
            .then(response => response.json())
            .then(data => {
                const productList = data;
            })
            .catch(erreur => ("Erreur :" + erreur))
            return this.url;
    }
    
    get product() {
        return this.productList();
    }
}

const apiUrl = "http://localhost:3000/api/products";























// "http://localhost:3000/api/products"