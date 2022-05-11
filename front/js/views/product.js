// Insertion dans le DOM de l'ID du produit sélectionée

class ProductController {
    constructor() {
        this.product = new ProductService();

        // Récupération de l'ID du produit séléctionée

        this.currentUrl = new URL(window.location.href);
        this.productId = this.currentUrl.searchParams.get("id");
    }

    async display() {
        const insertProduct = await this.product.getProduct(this.productId);
        const itemImg =
            document.createElement("img")
            document.querySelector(".item__img")
                .appendChild(itemImg);
            itemImg.src = insertProduct.imageUrl;
            itemImg.alt = insertProduct.altText;

        const itemTitle =
            document.getElementById("title")
            itemTitle.innerText = insertProduct.name;

        const itemPrice =
            document.getElementById("price")
            itemPrice.innerText = insertProduct.price;

        const itemDescription =
            document.getElementById("description")
            itemDescription.innerText = insertProduct.description;  
        
        for (const color of insertProduct.colors) {
            const itemColors = document.createElement("option");
            document.getElementById("colors")
                .appendChild(itemColors);
            itemColors.value = color;
            itemColors.innerHTML = color;
        }      
    }
}

const app = new ProductController();
app.display();