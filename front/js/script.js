// Stockage de l'url de l'API

let url = "http://localhost:3000/api/products";

// Promesse asynchrone via API fetch()

async function displayProducts() {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            const productsList = data;
            // console.log(data);

            // Parcours le [array] contenu dans l'API et intégre les valeurs de celui-ci au DOM

            for (products of productsList) {

                const itemsLink =
                    document.createElement("a")
                    document.querySelector(".items")
                    .appendChild(itemsLink)
                    itemsLink.href = `../html/product.html?id=${products._id}`;

                const itemsArticle =
                    document.createElement("article")
                    itemsLink.appendChild(itemsArticle);

                const itemsImg =
                    document.createElement("img")
                    itemsArticle.appendChild(itemsImg)
                    itemsImg.src = products.imageUrl
                    itemsImg.alt = products.altText;

                const itemsTitle =
                    document.createElement("h3")
                    itemsArticle.appendChild(itemsTitle)
                    itemsTitle.innerText = products.name;

                const itemsDescription =
                    document.createElement("p")
                    itemsArticle.appendChild(itemsDescription)
                    itemsDescription.innerText = products.description;
            }
        })

        // Retourne l'erreur en cas de récupération de l'API échoué

        .catch(error => alert("Erreur : " + error));
}

// Application de la fonction asymétrique "displayProducts()"

displayProducts();