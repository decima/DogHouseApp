if (typeof (view) === "undefined") {
    var view = {};
}
view.Main = function () {

};
view.Main.prototype.afficher = function (parent) {
    var parent_element = document.getElementById(parent);
    var header = document.createElement("div");
    //document.style.background = "#2c3e50";
    header.setAttribute("id", "header");
    header.style.background = "#ecf0f1";
    header.style.width = "100%";
    header.style.height = "100px";

    var bandeau_milieu = document.createElement("div");
    bandeau_milieu.setAttribute("id", "header_interne");
    bandeau_milieu.style.width = "1000px";
    bandeau_milieu.style.height = "100px";
    bandeau_milieu.style.margin = "auto";
    header.appendChild(bandeau_milieu);

    var title = document.createElement("h1");
    title.appendChild(document.createTextNode("DogHouse"));
    title.style.marginTop = "0px";
    bandeau_milieu.appendChild(title);

    

    var accueil = document.createElement("div");
    accueil.setAttribute("onclick", "changePage(\"\", \"subpage\");");
    accueil.innerHTML = "Accueil";
    bandeau_milieu.appendChild(accueil);

    var add_event = document.createElement("div");
    add_event.setAttribute("onclick", "changePage(\"add-event/2014-10-18\", \"subpage\");");
    add_event.innerHTML = "Ajouter un créneau";
    bandeau_milieu.appendChild(add_event);


    var list_client = document.createElement("div");
    list_client.setAttribute("onclick", "changePage(\"clients\", \"subpage\");");
    list_client.innerHTML = "Clients";
    bandeau_milieu.appendChild(list_client);

    var list_employes = document.createElement("div");
    list_employes.setAttribute("onclick", "changePage(\"employes\", \"subpage\");");
    list_employes.innerHTML = "Employés";
    bandeau_milieu.appendChild(list_employes);
    parent_element.appendChild(header);
   
    var deconnexion = document.createElement("div");
    deconnexion.setAttribute("onclick", "changePage(\"logout\", \"page\");");
    deconnexion.innerHTML = "Déconnexion";
    bandeau_milieu.appendChild(deconnexion);
    
    parent_element.appendChild(header);

    var contenu = document.createElement("div");
    contenu.setAttribute("id", "subpage");
    header.style.width = "100%";
    if (DEBUG_MODE !== "undefined" && DEBUG_MODE) {

    }
    parent_element.appendChild(contenu);
};