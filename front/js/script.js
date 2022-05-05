// adresse de l'API
let url = "http://localhost:3000/api/products";

// Remplissage du DOM via API fetch

async function displayProducts () {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const productsList = data;
        console.log(productsList);
        for (product of productsList) {

            const itemLink = 
                document.createElement("a")
                document.querySelector(".items")
                .appendChild(itemLink);
                itemLink.href =`"../html/product.html?id=${product._id}"`
                
            const itemArticle = 
                document.createElement("article")
                itemLink.appendChild(itemArticle);
            const itemImg =
                document.createElement("img")
                itemImg.src = product.imageUrl
                itemImg.alt = product.altText
                itemArticle.appendChild(itemImg);
            const itemTitle = 
                document.createElement("h3")
                itemTitle.innerText = product.name
                itemArticle.appendChild(itemTitle);
            const itemDescription =
                document.createElement("p")
                itemDescription.innerText = product.description 
                itemArticle.appendChild(itemDescription);            
        }
    })
    return displayProducts;
};
console.log(displayProducts())