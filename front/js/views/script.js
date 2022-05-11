// Insertion dans le DOM des multiples produit extrait depuis l'API.


class ProductsController {
    constructor() {
        this.product = new ProductService();
    }
    async display() {
        const insertDisplay = await this.product.getProductAll();
        insertDisplay
            .forEach(p => {
                const itemsLink =
                    document.createElement("a")
                    document.querySelector(".items")
                        .appendChild(itemsLink)
                    itemsLink.href = `../html/product.html?id=${p._id}`;

                const itemsArticle =
                    document.createElement("article")
                    itemsLink.appendChild(itemsArticle);

                const itemsImg =
                    document.createElement("img")
                    itemsArticle.appendChild(itemsImg)
                    itemsImg.src = p.imageUrl
                    itemsImg.alt = p.altText;

                const itemsTitle =
                    document.createElement("h3")
                    itemsArticle.appendChild(itemsTitle)
                    itemsTitle.innerText = p.name;

                const itemsDescription =
                    document.createElement("p")
                    itemsArticle.appendChild(itemsDescription)
                    itemsDescription.innerText = p.description;
            });
    }
}

const app = new ProductsController();
app.display();