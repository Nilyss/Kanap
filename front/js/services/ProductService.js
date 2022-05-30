// Création class ayant pour but de retrouner chaque fonction.

class ProductService extends Api { // Récupération de l'API
    constructor() {
        super();
    }

    // Récupération de tout les produits de l'API

    async getProductAll() { 
        return await this.fetch("products");
    }

    // Récupération des produits de de l'API filtré par ID

    async getProduct(id) { 
        return await this.fetch("products/" + id);
    }

    // Méthode POST qui se charge d'envoyer les array contact et ID de chaques produit commandé

    async postContact(orderContact) {
        await this.post('products/order', orderContact);
    };

    // Récupération du contenu du localStorage 

    getProductStorage() {
        return JSON.parse(localStorage.getItem("product"));
    }

    // Fonction pour le calcul des totaux de quantités et de prix du panier

    async totalSum() {

        let quantityArray = []; // Création d'un Array pour le stockage du nombre d'articles séléctioné
        let priceArray = []; // Création Array pour le stockage du prix total de chaque produit


        // Parcours le localStorage via une boucle et incrémente chaque élément dans le DOM & le calcul du prix de chaque ID

        for(let item of this.getProductStorage()) {  

            // Récupère les détails du produit extrait depuis le localStorage via la méthode qui contacte l'API

            const getProductDetails = await this.getProduct(item.idSelectedProduct); 

            
            // Push de la quantité du produit dans le array "quantityArray"

            let totalIdQuantity = item.quantitySelectedProduct;
            quantityArray.push(totalIdQuantity);

            // Push du prix total d'un produit en fonction de la quantité de celui-ci

            let totalIdPrice = (getProductDetails.price) * (item.quantitySelectedProduct);
            priceArray.push(totalIdPrice);
        }

        // Calcul des totaux avec les éléments sélectionné en aditionant le contenu des Array "quantityArray" et "priceArray"

        let orderInitialValue = 0;

        let quantityCalculate = quantityArray.reduce(
            (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue)
        );

        let orderPriceCalculate = priceArray.reduce(
            (previousValue, currentValue) => previousValue + currentValue, orderInitialValue
        );

        // Récupère le paragraphe quantité totale du DOM et incrémente les valeur calculer de quantité et de prix total

        let getOrderQuantity = document.getElementById("totalQuantity");
        getOrderQuantity.innerText = `${quantityCalculate}`;

        let getOrderPrice = document.getElementById("totalPrice");
        getOrderPrice.innerText = `${orderPriceCalculate}`;

    }
}