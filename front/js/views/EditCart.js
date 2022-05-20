// Controller de gestion des éléments du panier

class editCartController {
    constructor() {
        this.editCart = new ProductService();
    }

    async editCartFunction() {        

        // Récupération de l'API contenant la liste de tout les produits référencé du site

        const getProductList = await this.editCart.getProductAll();

        // Lecture du localStorage

        let getProduct = JSON.parse(localStorage.getItem("product"));

        // Récupère l'input de modulation des quantités de chaques produit dans le DOM

        let quantitySelectedProduct = document.querySelectorAll(".itemQuantity");
        console.log(quantitySelectedProduct);

        // Parcours le array crée par la variable "quantitySelectedProduct" afin de surveiller le click

        for(let quantitySelected of quantitySelectedProduct) {

            // Récupère les informations de l'ID & la couleur du produit dans le DOM
            
            const parent = quantitySelected.closest(".cart__item");
            const parentId = parent.dataset.id;
            const parentColor = parent.dataset.color;
            
            // Surveille le click de l'input visant à changer la quantité d'un produit

            quantitySelected.addEventListener("change", () =>{
                
                // Si la valeur contenu dans quantitySelected product est modifier

                if (quantitySelected.value){
                    let newQuantity = quantitySelected.value;
                    
                    for(let productChoosen of getProduct) {
                        if (parentId == productChoosen.idSelectedProduct && parentColor == productChoosen.colorSelectedProduct) {
                            productChoosen.quantitySelectedProduct = newQuantity;
                            localStorage.setItem("product", JSON.stringify(getProduct));
                        }
                    }

                }
            })

        }
    }
}


const editCartapp = new editCartController;
editCartapp.editCartFunction();