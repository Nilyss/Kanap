




// TEST CREATION CLASS API





class Api {
    constructor(url) {
        this._url = url;
    }

    productList() {
        fetch(this._url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                return data;
            })
            .catch(erreur => ("Erreur :" + erreur))
    }
    
    // get product() {
    //     return this.productList();
    // }
}





async function extractProduct () {
    const product = new Api("http://localhost:3000/api/products");
}
















// "http://localhost:3000/api/products"