// Récupération de l'id de l'url via URLSearchParams

let str = ("window.location.href")
let url = new URL(str);
let productUrl = url.searchParams.get("id");

//*********************/

