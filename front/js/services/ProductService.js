// Création class ayant pour but de retrouner chaque fonction.

class ProductService extends Api {
    constructor() {
        super();
    }

    async getProductAll() {
        return this.fetch("products");
    }
    async getProduct(id) {
        return this.fetch("products/" + id);
    }
}