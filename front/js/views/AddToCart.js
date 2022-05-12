// Controller ajout d'un produit au panier 

class CartController {
    constructor(){
        this.cart = new ProductService();
        
// Récupération de l'ID du produit séléctionée

        this.currentUrl = new URL(window.location.href);
        this.productId = this.currentUrl.searchParams.get("id");
    }

    async addToCart() {

// Récupération des informations contenu dans l'API nécessaire à l'ajout au panier : ID / Couleur / quantitée

        const getProductId = await this.cart.getProduct(this.productId);
        const getProductColor = document.getElementById("colors");
        const getProductQuantity = document.getElementById("quantity");
        
// Surveille le click du bouton HTML ajouter au panier
        
        const button = document.getElementById("addToCart");
        button.addEventListener("click", async function() {  

// Selectionne les références du produit choisi

            const selectedProduct = {
                idSelectedProduct: getProductId._id,
                colorSelectedProduct: getProductColor.value,
                quantitySelectedProduct: getProductQuantity.value,
            };

 // Création du localStorage 
 
            const localStorageProduct = [];

// Si les conditions de couleurs et de quantité sont valides, utilise les informations extraites de l'API précédement.

            if(selectedProduct.colorSelectedProduct == "") {
                alert("Vous n'avez séléctioné aucune couleur");
            } else if (selectedProduct.quantitySelectedProduct < 1) {
                alert("Veuillez renseigner la quantité");
            } else {
                localStorageProduct.push(selectedProduct);
                localStorage.setItem("Product", JSON.stringify(localStorageProduct))
            };
            console.log(localStorageProduct);
            console.log(localStorage.length);
        })
    } 
}

const cartApp = new CartController;
cartApp.addToCart();












// if (getProductColor !== "" && getProductQuantity != 0) {
//     const productId = getProductId;
//     const productColor = getProductColor;
//     const productQuantity = getProductQuantity;

//     // Crée un objet pour les informations ID Couleur et Quantitée

//     const productArray = { productId, productColor, productQuantity };

//     // Création du localStorage 

//     if (productLocalStorage == null) {
//         const productLocalStorage = [];
//         productLocalStorage.push(productArray);
//         localStorage.setItem(productArray, JSON.stringify(productLocalStorage));
//         alert("Article(s) ajoutés au panier");
//         console.log(productLocalStorage);
//     } else {

//     }
// } else {

// }