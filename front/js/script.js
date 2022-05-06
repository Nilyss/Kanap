// Stockage de l'url de l'API

let url = "http://localhost:3000/api/products";

// Promesse asynchrone via API fetch()

async function displayProducts () {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const productsList = data;

// Parcours le [array] contenu dans l'API et intégre les valeurs de celui-ci au DOM

        for (product of productsList) {

            const itemLink = 
                document.createElement("a")
                document.querySelector(".items")
                .appendChild(itemLink)
                itemLink.href =`../html/product.html?id=${product._id}`;                
            const itemArticle = 
                document.createElement("article")
                itemLink.appendChild(itemArticle);
            const itemImg =
                document.createElement("img")
                itemArticle.appendChild(itemImg)
                itemImg.src = product.imageUrl
                itemImg.alt = product.altText;                
            const itemTitle = 
                document.createElement("h3")
                itemArticle.appendChild(itemTitle)
                itemTitle.innerText = product.name;
                
            const itemDescription =
                document.createElement("p")
                itemArticle.appendChild(itemDescription)  
                itemDescription.innerText = product.description;                           
        }
    })

// Retourne l'erreur en cas de récupération de l'API échoué

    .catch (error => alert("Erreur : " + error));
    return displayProducts;
};

// Application de la fonction asymétrique "displayProducts()"

displayProducts();