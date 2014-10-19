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
    header.style.height = "150px";
    if (DEBUG_MODE !== "undefined" && DEBUG_MODE) {
        
    }
    var title = document.createElement("h1");
    title.appendChild(document.createTextNode("DogHouse"));
    title.style.marginTop = "0px";
    header.appendChild(title);

    var deconnexion = document.createElement("div");
    deconnexion.setAttribute("onclick", "changePage(\"logout\", \"page\");");
    deconnexion.innerHTML = "Déconnexion";
    header.appendChild(deconnexion);

    var add_event = document.createElement("div");
    add_event.setAttribute("onclick", "changePage(\"add-event/2014-10-18\", \"subpage\");");
    add_event.innerHTML = "Ajouter un créneau";
    header.appendChild(add_event);

    var add_client = document.createElement("div");
    add_client.setAttribute("onclick", "changePage(\"clients/add\", \"subpage\");");
    add_client.innerHTML = "Ajouter un client";
    header.appendChild(add_client);

    var list_client = document.createElement("div");
    list_client.setAttribute("onclick", "changePage(\"clients\", \"subpage\");");
    list_client.innerHTML = "Liste des clients";
    header.appendChild(list_client);

    parent_element.appendChild(header);

    var contenu = document.createElement("div");
    contenu.setAttribute("id", "subpage");
    header.style.width = "100%";
    if (DEBUG_MODE !== "undefined" && DEBUG_MODE) {

    }
    parent_element.appendChild(contenu);
};