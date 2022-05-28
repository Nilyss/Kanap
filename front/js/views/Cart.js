// Création d'un controller pour afficher dans le DOM le contenu du localStorage dans la page cart.html et manipuler les éléments

class cartController {
    constructor() {
        this.product = new ProductService();
    }

    async showCart() {
        
        // Intégration dans le DOM du contenu récupérer depuis le localStorage

        let getProduct = this.product.getProductStorage(); // récupération du contenu du localStorage
        
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

        // ************* Envois de la demande de commande *************

        // Récupération de chaque élément du form dans le DOM

        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let address = document.getElementById("address");
        let city = document.getElementById("city");
        let email = document.getElementById("email");

        let submitOrder = document.getElementById("order");

        // Création des Regex et les stocks dans des variables

        let validateFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        let validateLastName = validateFirstName;
        let validateAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
        let validateCity = validateFirstName;
        let validateEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

        //  Récupération de chaque <p> indiquant une erreur en cas de validation d'un input du form refusé

        let errorFirstName = document.getElementById("firstNameErrorMsg");
        let errorLastName = document.getElementById("lastNameErrorMsg");
        let errorAddress = document.getElementById("addressErrorMsg");
        let errorCity = document.getElementById("cityErrorMsg");
        let errorEmail = document.getElementById("emailErrorMsg");

        // Si le localStorage contient des éléments, passe à la validation du formulaire depuis le button

        submitOrder.addEventListener("click", function (event) {

            // Récupère la valeur entrée dans l'input de chaque élément du formulaire

            let checkFirstName = firstName.value;
            let checkLastName = lastName.value;
            let checkAddress = address.value;
            let checkCity = city.value;
            let checkEmail = email.value;

            function validationForm() {

                // Si le localStorage est vide, renvois une erreur à l'utilisateur

                if (getProduct === null) {
                    alert("Vous n'avez séléctionné aucun produit !")
                    return false;
                }
                else if (validateFirstName.test(checkFirstName) == false || checkFirstName === null) {
                    errorFirstName.innerHTML = "Veillez renseigner votre prénom";
                    return false;
                }
                else if (validateLastName.test(checkLastName) == false || checkLastName === null) {
                    errorLastName.innerHTML = "Veillez renseigner votre nom";
                    return false;
                }
                else if (validateAddress.test(checkAddress) == false) {
                    errorAddress.innerHTML = "Veillez renseigner votre adresse avec les informations suivantes : Numéro, voie, nom de la voie, code postal";
                    return false;
                }
                else if (validateCity.test(checkCity) == false) {
                    errorCity.innerHTML = "Veuillez renseigner votre ville";
                    return false;
                }
                else if (validateEmail.test(checkEmail) == false) {
                    errorEmail.innerHTML = "Saisie de l'adresse mail incorrect";
                    return false;
                }

                // Si chaque input passe la validation des Regex

                else {

                    // Création d'un objet contact

                    let contact = {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: address.value,
                        city: city.value,
                        email: email.value
                    }

                    // Création d'un array afin d'y push tout les produits de la commande ainsi que leurs quantitée

                    let products = [];

                    // Parcours le localStorage et push les ID dans la variable products
                    for (let product of getProduct) {
                        products.push(product.idSelectedProduct)
                    };

                    // Crée un objet contenant la liste des informations du formulaire et des produits de la commande

                    let userOrder = {contact, products};

                    // Création de la requete de POST sur l'API afin d'y envoyer l'objet userOrder & récupéré l'id de la commande

                    let options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userOrder)
                    };
                    
                    fetch("http://localhost:3000/api/products/order/", options)
                        .then(response => response.json())
                        .then(data => {
                            window.location = `./confirmation.html?orderid=${data.orderId}`;                            
                        })
                        .catch(error => ("Erreur : " + error))
                }
            }
            validationForm();
        })
    }
}

const cartApp = new cartController;
cartApp.showCart();