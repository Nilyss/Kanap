// Controller ajout d'un produit au panier 

class addToCartController {
    constructor() {
        this.addToCartProduct = new ProductService();

        // Récupération de l'ID du produit séléctionée

        this.currentUrl = new URL(window.location.href);
        this.productId = this.currentUrl.searchParams.get("id");
    }

    async addToCart() {

        // Récupération des informations contenu dans l'API nécessaire à l'ajout au panier : ID / Couleur / quantitée

        const getProductId = await this.addToCartProduct.getProduct(this.productId);
        const getProductColor = document.getElementById("colors");
        const getProductQuantity = document.getElementById("quantity");

        // Surveille le click du bouton HTML ajouter au panier

        const button = document.getElementById("addToCart");
        button.addEventListener("click", async function () {

            // Selectionne les références du produit choisi

            const selectedProduct = {
                idSelectedProduct: getProductId._id,
                colorSelectedProduct: getProductColor.value,
                quantitySelectedProduct: getProductQuantity.value,
            };

            // Création du localStorage 

            let productArray = JSON.parse(localStorage.getItem("product"));

            if (selectedProduct.colorSelectedProduct == "") { // Vérifie le choix d'une couleur
                alert("Vous n'avez séléctioné aucune couleur");
            } else if (selectedProduct.quantitySelectedProduct < 1) { // Vérifie le choix d'une quantité
                alert("Veuillez renseigner la quantité");
            } else {
                if (productArray == null)
                    productArray = [];
                    productArray.push(selectedProduct);
                    localStorage.setItem("product", JSON.stringify(productArray));

                    console.log(productArray);  
            }        
        })
    }
}

const addCartApp = new addToCartController;
addCartApp.addToCart();