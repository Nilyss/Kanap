// Insertion dans le DOM de l'ID du produit sélectionée

class ProductController {
    constructor() {
        this.product = new ProductService();

        // Récupération de l'ID du produit séléctionée

        this.currentUrl = new URL(window.location.href);
        this.productId = this.currentUrl.searchParams.get("id");
    }

    async display() {
        const getProduct = await this.product.getProduct(this.productId);
        const itemImg =
            document.createElement("img")
            document.querySelector(".item__img")
                .appendChild(itemImg);
            itemImg.src = getProduct.imageUrl;
            itemImg.alt = getProduct.altTxt;
        const itemTitle =
            document.getElementById("title")
            itemTitle.innerText = (getProduct.name);

        const itemPrice =
            document.getElementById("price")
            itemPrice.innerText = getProduct.price;

        const itemDescription =
            document.getElementById("description")
            itemDescription.innerText = getProduct.description;  
        
        for (const color of getProduct.colors) {
            const itemColors = document.createElement("option");
            document.getElementById("colors")
                .appendChild(itemColors);
            itemColors.value = color;
            itemColors.innerHTML = color;
        }
        
    }
}

const productApp = new ProductController();
productApp.display();
