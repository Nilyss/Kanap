// Stockage url de l'API

let url = "http://localhost:3000/api/products/";

// Récupération de l'id de l'url via URLSearchParams

let currentUrl = new URL(window.location.href);
let productId = currentUrl.searchParams.get("id");

// Stock adresse API & cible l'ID du produit

let urlProductId = url + productId;

// Récupération donnée du produit depuis l'id

async function extractProduct() {

    return fetch(urlProductId)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(responseData => {
            console.log(responseData)
            return responseData;
        })
        // Retourne l'erreur en cas de récupération de l'API échoué.
        .catch(error => ("Erreur : " + error));
}

// Intégration dans le dom de l'ID extraite de l'API

async function displayProducts(product) {

    const itemImg =
        document.createElement("img")
        document.querySelector(".item__img")
            .appendChild(itemImg);
        itemImg.src = product.imageUrl;
        itemImg.alt = product.altText;

    const itemTitle =
        document.getElementById("title")
        itemTitle.innerHTML = product.name;

    const itemPrice =
        document.getElementById("price")
        itemPrice.innerHTML = product.price;

    const itemDescription =
        document.getElementById("description")
        itemDescription.innerHTML = product.description;

    for(color of product.colors) {
        const itemColors = document.createElement("option");
        document.getElementById("colors")
            .appendChild(itemColors);
        itemColors.value = color;
        itemColors.innerHTML = color;
    }

}


//***********************************************************************************************************/

// Fonction main

async function main() {
   const product = await extractProduct();
   displayProducts(product);
}

main();

