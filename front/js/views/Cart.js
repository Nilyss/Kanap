// Création d'un controller pour afficher dans le DOM le contenu du localStorage dans la page cart.html et manipuler les éléments

class cartController {
    constructor() {
        this.product = new ProductService();
    }

    async showCart() {
        
        // Intégration dans le DOM du contenu récupérer depuis le localStorage

        let getProduct = this.product.getProductStorage(); // récupération du contenu du localStorage
        console.log(getProduct, "getProduct");

        // En cas de localStorage vide, renvois un message de panier vide

        if (getProduct === null) {
            document.getElementById("cart__items").innerHTML +=
                `<div class="cart__item__img">
                <p>Aucun article(s) dans le panier</p>
            </div>`;
            

        // En cas de produit présent dans le localStorage

        } else { 

            for (let item of getProduct) {  // Parcours le localStorage via une boucle et incrémente chaque élément dans le DOM

                const getProductDetails = await this.product.getProduct(item.idSelectedProduct); // Récupère les détails du produit extrait depuis le localStorage via la méthode qui contacte l'API

                document.getElementById("cart__items").innerHTML +=  // Incrémentation dans le DOM des informations relatives au produits grace au interpolated string

                    `
                <article class="cart__item" data-id=${item.idSelectedProduct} data-color=${item.colorSelectedProduct}>
                    <div class="cart__item__img">
                        <img src=${getProductDetails.imageUrl} alt=${getProductDetails.altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${getProductDetails.name}</h2>
                            <p>${item.colorSelectedProduct}</p>
                            <p>${getProductDetails.price} €</p>
                         </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${item.quantitySelectedProduct}>
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>

                `
            }


            // Récupère l'input contenant la quantité d'un produit

            let itemQuantity = document.querySelectorAll(".itemQuantity");

            // Récupère le bouton de suppression du produit

            let deleteProduct = document.querySelectorAll(".cart__item__content__settings__delete");
            
            // Crée un array récupérant les informations relatives à chaques input de quantité

            Array.prototype.filter.call(itemQuantity, (element) => {
                let parent = element.closest("article");
                let parentId = parent.dataset.id;
                let parentColor = parent.dataset.color;


                // écoute l'input modifier par l'utilisateur

                element.addEventListener("change", (e) => {

                    // Stock la nouvelle valeur de quantité sélectionnée 

                    let newQuantity = element.value;

                    /* Récupère le produit en question dans le localStorage (filtre la couleur ainsi que l'id) et remplace la valeur
                    de la quantité dans le localStorage */

                    let productChoosen = getProduct.filter(p => p.colorSelectedProduct === parentColor && p.idSelectedProduct === parentId)[0];
                    productChoosen.quantitySelectedProduct = newQuantity;
                    localStorage.setItem("product", JSON.stringify(getProduct));                
                })
            })

            // Crée un array récupérant les informations relatives à chaques bouton de suppression

            Array.prototype.filter.call(deleteProduct, (element) => {
                let parent = element.closest("article");
                let parentId = parent.dataset.id;
                let parentColor = parent.dataset.color;

                // écoute le bouton de suppression cliqué par l'utilisateur

                element.addEventListener("click", (e) => {
                    
                    // Supprime l'élément du localStorage
                    
                    let productChoosen = getProduct.filter(p => p.colorSelectedProduct === parentColor && p.idSelectedProduct === parentId)[0];
                    let index = getProduct.indexOf(productChoosen);
                    getProduct.splice(index, 1);
                    localStorage.setItem("product", JSON.stringify(getProduct));

                    // Recharge la page pour mettre à jour le DOM après suppression du produit

                    window.location.reload();

                    // Si plus aucun produit n'est présent dans le localStorage, supprime la clé "product".

                    if(getProduct.length < 1) {
                        localStorage.clear();
                    }
                })
            })
        }
    }
}

const cartApp = new cartController;
cartApp.showCart();