class confirmationController {
    constructor() {
        this.confirmation = new ProductService();

        // Récupération de l'ID de la commande

        this.currentUrl = new URL(window.location.href);
        this.productId = this.currentUrl.searchParams.get("orderid");
    }

        // Affichage du numéro de la commande

    async showOrder() {
        let showOrderId = document.querySelector("#orderId");
        showOrderId.innerText = (this.productId);

        // Suppression du contenu du localStorage

        localStorage.clear();
    };
}

const confirmationApp = new confirmationController();
confirmationApp.showOrder();