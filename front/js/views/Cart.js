// Création d'un controller pour afficher dans le DOM le contenu du localStorage dans la page cart.html et manipuler les éléments

class cartController {
    constructor() {
        this.cart = new ProductService();
    }

    async showCart() {
        
        // Intégration dans le DOM du contenu récupérer depuis le localStorage

        const addProduct = JSON.parse(localStorage.getItem("product")); // récupération du contenu du localStorage
        

        if (addProduct === null) {    // En cas de localStorage vide, renvois un message de panier vide
            document.getElementById("cart__items").innerHTML +=
                `<div class="cart__item__img">
                <p>Aucun article(s) dans le panier</p>
            </div>` ;

        } else {        // En cas de produit présent dans le localStorage

            for (let item of addProduct) {  // Parcours le localStorage via une boucle et incrémente chaque élément dans le DOM

                const getProductdetails = await this.cart.getProduct(item.idSelectedProduct); // Récupère les détails du produit extrait depuis le localStorage via la méthode qui contacte l'API

                document.getElementById("cart__items").innerHTML +=
                    `
                <article class="cart__item" data-id=${item.idSelectedProduct} data-color=${item.colorSelectedProduct}>
                    <div class="cart__item__img">
                        <img src=${getProductdetails.imageUrl} alt=${getProductdetails.altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${getProductdetails.name}</h2>
                            <p>${item.colorSelectedProduct}</p>
                            <p>${getProductdetails.price}</p>
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
        }
    }
}

const cartApp = new cartController;
cartApp.showCart();