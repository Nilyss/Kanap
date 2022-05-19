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
            } 

            else if (selectedProduct.quantitySelectedProduct < 1) { // Vérifie le choix d'une quantité
                alert("Veuillez renseigner la quantité");
            } 

            else {

                if (productArray == null) {     // Si aucun produit n'est présent dans le panier
                    productArray = [];
                    productArray.push(selectedProduct);
                    localStorage.setItem("product", JSON.stringify(productArray));
                    alert("Produit ajouté au panier !");
                }
                else if (productArray != null) {    // Si le panier comprends déjà des éléments

                    // Parcours le localStorage avec une map

                    let findProducts = productArray.find(
                        (element) =>
                        element.idSelectedProduct === selectedProduct.idSelectedProduct
                        &&
                        element.colorSelectedProduct === selectedProduct.colorSelectedProduct
                    );

                    // Si un produit avec la même ID et la même couleur est trouvé, incrémente le localStorage avec la nouvelle quantitée    

                    if (findProducts) {

                        let newQuantity = parseInt(findProducts.quantitySelectedProduct) + parseInt(selectedProduct.quantitySelectedProduct);
                            findProducts.quantitySelectedProduct = newQuantity;
                            localStorage.setItem("product", JSON.stringify(productArray));
                        alert(`Ce produit est actuellement en ${findProducts.quantitySelectedProduct} exemplaires dans le panier`)
                    }

                    // Si aucun produit avec la même ID est trouvé, ajoute le nouveau produit au localStorage déjà crée précédement

                    else {
                        productArray.push(selectedProduct);
                        localStorage.setItem("product", JSON.stringify(productArray));
                        alert("Produit également ajouté au panier !")
                    }
                }
            }        
        })
    }
}

const addCartApp = new addToCartController;
addCartApp.addToCart();