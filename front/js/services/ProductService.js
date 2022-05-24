// Création class ayant pour but de retrouner chaque fonction.

class ProductService extends Api { // Récupération de l'API
    constructor() {
        super();
    }

    async getProductAll() { // Récupération de tout les produits de l'API
        return await this.fetch("products");
    }


    async getProduct(id) { // Récupération des porduits de l'API filtré par ID
        return await this.fetch("products/" + id);
    }

    // Récupération du contenu du localStorage 

    getProductStorage() {
        return JSON.parse(localStorage.getItem("product"));
    }
}