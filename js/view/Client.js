/**
 * Created by Flo on 19/10/2014.
 */
if (typeof (view) === "undefined") {
    var view = {};
}

/**
 *
 * @param rdv Array of Creneau
 * @constructor
 */
view.Client = function () {

};

view.Client.prototype.afficher = function (parent, action) {
    var parent_element = document.getElementById(parent);
    var oThis = this;
    switch (action) {
        case view.Client.action.ADD:
            // Si on souhaite ajouter un client
            var form = document.createElement("div");
            parent_element.appendChild(form);
            parent_element.style.background = "#2c3e50";
            var titre = document.createElement("div");
            titre.innerHTML = "Ajouter un client";
            titre.style.margin = "auto";
            titre.style.color = "#2c3e50";
            titre.style.fontSize = "28px";
            titre.style.textAlign = "center";
            titre.style.fontWeight = "600";
            titre.style.paddingTop = "20px";
            form.appendChild(titre);

            form.setAttribute("class", "new_client_form");
            form.style.width = "400px";
            form.style.margin = "auto";
            form.style.position = "relative";
            form.style.marginTop = "20px";
            form.style.marginBottom = "50px";
            form.style.background = "#ecf0f1";

            var div = document.createElement("div");
            div.style = {
                position: "relative",
                height: "300px"
            };

            var input_lastName = document.createElement("input");
            input_lastName.setAttribute("id", "lastName");
            input_lastName.setAttribute("autofocus", "autofocus");
            input_lastName.setAttribute("placeholder", "Nom");
            input_lastName.style.width = "300px";
            input_lastName.style.height = "30px";
            input_lastName.style.fontSize = "20px";
            input_lastName.style.margin = "10px";
            input_lastName.style.marginTop = "40px";
            input_lastName.style.marginRight = "50px";
            input_lastName.style.marginLeft = "50px";
            input_lastName.style.position = "relative";
            div.appendChild(input_lastName);

            var input_firstName = document.createElement("input");
            input_firstName.setAttribute("id", "firstName");
            input_firstName.setAttribute("placeholder", "Prénom");
            input_firstName.style.width = "300px";
            input_firstName.style.height = "30px";
            input_firstName.style.fontSize = "20px";
            input_firstName.style.margin = "10px";
            input_firstName.style.marginRight = "50px";
            input_firstName.style.marginLeft = "50px";
            div.appendChild(input_firstName);

            var input_phone = document.createElement("input");
            input_phone.setAttribute("id", "phone");
            input_phone.setAttribute("placeholder", "Téléphone");
            input_phone.style.width = "300px";
            input_phone.style.height = "30px";
            input_phone.style.fontSize = "20px";
            input_phone.style.margin = "10px";
            input_phone.style.marginRight = "50px";
            input_phone.style.marginLeft = "50px";
            div.appendChild(input_phone);

            /*
            var input_num_address = document.createElement("input");
            input_num_address.setAttribute("id", "num_address");
            input_num_address.setAttribute("autofocus", "autofocus");
            input_num_address.setAttribute("placeholder", "N°");
            input_num_address.style.width = "300px";
            input_num_address.style.height = "30px";
            input_num_address.style.fontSize = "20px";
            input_num_address.style.margin = "10px";
            input_num_address.style.marginRight = "50px";
            input_num_address.style.marginLeft = "50px";
            div.appendChild(input_num_address);
            */

            var input_address = document.createElement("input");
            input_address.setAttribute("id", "address");
            input_address.setAttribute("placeholder", "Adresse");
            input_address.style.width = "300px";
            input_address.style.height = "30px";
            input_address.style.fontSize = "20px";
            input_address.style.margin = "10px";
            input_address.style.marginRight = "50px";
            input_address.style.marginLeft = "50px";
            div.appendChild(input_address);

            var input_cp = document.createElement("input");
            input_cp.setAttribute("id", "cp");
            input_cp.setAttribute("placeholder", "Code postal");
            input_cp.style.width = "300px";
            input_cp.style.height = "30px";
            input_cp.style.fontSize = "20px";
            input_cp.style.margin = "10px";
            input_cp.style.marginRight = "50px";
            input_cp.style.marginLeft = "50px";
            div.appendChild(input_cp);

            var input_city = document.createElement("input");
            input_city.setAttribute("id", "city");
            input_city.setAttribute("placeholder", "Ville");
            input_city.style.width = "300px";
            input_city.style.height = "30px";
            input_city.style.fontSize = "20px";
            input_city.style.margin = "10px";
            input_city.style.marginRight = "50px";
            input_city.style.marginLeft = "50px";
            div.appendChild(input_city);

            var input_submit = document.createElement("button");
            input_submit.setAttribute("id", "add-btn");

            var text_submit = document.createTextNode("Ajouter");
            input_submit.appendChild(text_submit);

            input_submit.style.width = "100%";
            input_submit.style.height = "50px";
            input_submit.style.fontSize = "25px";
            input_submit.style.background = "#27ae60";
            input_submit.style.color = "white";
            input_submit.style.cursor = "pointer";

            input_submit.style.marginTop = "20px";
            input_submit.style.position = "relative";
            input_submit.style.bottom = "0px";
            input_submit.style.left = "0px";

            input_submit.style.border = "0px";

            div.appendChild(input_submit);

            form.appendChild(div);
            return input_submit;
            break;
        case view.Client.action.DELETE:
            // Si on souhaite supprimer un client



            break;
        case view.Client.action.LIST:
            var form = document.createElement("div");
            parent_element.appendChild(form);
            parent_element.style.background = "#2c3e50";
            var titre = document.createElement("div");
            titre.innerHTML = "Liste des clients";
            titre.style.margin = "auto";
            titre.style.color = "#2c3e50";
            titre.style.fontSize = "28px";
            titre.style.textAlign = "center";
            titre.style.fontWeight = "600";
            titre.style.paddingTop = "20px";
            form.appendChild(titre);

            form.setAttribute("class", "list_clients");
            form.style.width = "400px";
            form.style.margin = "auto";
            form.style.position = "relative";
            form.style.marginTop = "20px";
            form.style.marginBottom = "50px";
            form.style.background = "#ecf0f1";

            var div = document.createElement("div");
            div.style.position = "relative";
            div.style.height = "300px";
            form.appendChild(div);

            var liste_clients = arguments[2];
            var tableau = "<table>";
                for(var i = 0 ; i < liste_clients.length ; i++){
                    if(liste_clients[i] != null){
                        tableau += "<tr>";
                        tableau += "<td>"+liste_clients[i].nom+"</td>";
                        tableau += "<td>"+liste_clients[i].prenom+"</td>";
                        tableau += "<td onclick='changePage(\"clients/edit/"+i+"\", \"subpage\");'>Modifier</td>";
                        tableau += "</tr>";
                    }
                }
            tableau += "</table>";
            div.innerHTML = tableau;

            break;
        case view.Client.action.EDIT:
            var client = arguments[2];

            var form = document.createElement("div");
            parent_element.appendChild(form);
            parent_element.style.background = "#2c3e50";
            var titre = document.createElement("div");
            titre.innerHTML = "Modifier un client";
            titre.style.margin = "auto";
            titre.style.color = "#2c3e50";
            titre.style.fontSize = "28px";
            titre.style.textAlign = "center";
            titre.style.fontWeight = "600";
            titre.style.paddingTop = "20px";
            form.appendChild(titre);

            form.setAttribute("class", "new_client_form");
            form.style.width = "400px";
            form.style.margin = "auto";
            form.style.position = "relative";
            form.style.marginTop = "20px";
            form.style.marginBottom = "50px";
            form.style.background = "#ecf0f1";

            var div = document.createElement("div");
            div.style = {
                position: "relative",
                height: "300px"
            };

            var input_lastName = document.createElement("input");
            input_lastName.setAttribute("id", "lastName");
            input_lastName.setAttribute("autofocus", "autofocus");
            input_lastName.setAttribute("placeholder", "Nom");
            input_lastName.style.width = "300px";
            input_lastName.style.height = "30px";
            input_lastName.style.fontSize = "20px";
            input_lastName.style.margin = "10px";
            input_lastName.style.marginTop = "40px";
            input_lastName.style.marginRight = "50px";
            input_lastName.style.marginLeft = "50px";
            input_lastName.style.position = "relative";
            input_lastName.value = client.nom;
            div.appendChild(input_lastName);

            var input_firstName = document.createElement("input");
            input_firstName.setAttribute("id", "firstName");
            input_firstName.setAttribute("placeholder", "Prénom");
            input_firstName.style.width = "300px";
            input_firstName.style.height = "30px";
            input_firstName.style.fontSize = "20px";
            input_firstName.style.margin = "10px";
            input_firstName.style.marginRight = "50px";
            input_firstName.style.marginLeft = "50px";
            input_firstName.value = client.prenom;
            div.appendChild(input_firstName);

            var input_phone = document.createElement("input");
            input_phone.setAttribute("id", "phone");
            input_phone.setAttribute("placeholder", "Téléphone");
            input_phone.style.width = "300px";
            input_phone.style.height = "30px";
            input_phone.style.fontSize = "20px";
            input_phone.style.margin = "10px";
            input_phone.style.marginRight = "50px";
            input_phone.style.marginLeft = "50px";
            input_phone.value = client.telephone;
            div.appendChild(input_phone);

            var input_address = document.createElement("input");
            input_address.setAttribute("id", "address");
            input_address.setAttribute("placeholder", "Adresse");
            input_address.style.width = "300px";
            input_address.style.height = "30px";
            input_address.style.fontSize = "20px";
            input_address.style.margin = "10px";
            input_address.style.marginRight = "50px";
            input_address.style.marginLeft = "50px";
            input_address.value = client.adresse.rue;
            div.appendChild(input_address);

            var input_cp = document.createElement("input");
            input_cp.setAttribute("id", "cp");
            input_cp.setAttribute("placeholder", "Code postal");
            input_cp.style.width = "300px";
            input_cp.style.height = "30px";
            input_cp.style.fontSize = "20px";
            input_cp.style.margin = "10px";
            input_cp.style.marginRight = "50px";
            input_cp.style.marginLeft = "50px";
            input_cp.value = client.adresse.cp;
            div.appendChild(input_cp);

            var input_city = document.createElement("input");
            input_city.setAttribute("id", "city");
            input_city.setAttribute("placeholder", "Ville");
            input_city.style.width = "300px";
            input_city.style.height = "30px";
            input_city.style.fontSize = "20px";
            input_city.style.margin = "10px";
            input_city.style.marginRight = "50px";
            input_city.style.marginLeft = "50px";
            input_city.value = client.adresse.ville;
            div.appendChild(input_city);

            if(arguments[4])
            {
                var dogs = arguments[4];

                var div_sep = document.createElement("div");
                div_sep.style.width = "300px";
                div_sep.style.height = "1px";
                div_sep.style.backgroundColor = "#CCC";
                div_sep.style.margin = "auto";
                div_sep.style.marginTop = "20px";
                div.appendChild(div_sep);

                var titre = document.createElement("div");
                titre.innerHTML = "Chiens de "+client.nom+" "+client.prenom;
                titre.style.margin = "auto";
                titre.style.color = "#2c3e50";
                titre.style.fontSize = "28px";
                titre.style.textAlign = "center";
                titre.style.fontWeight = "600";
                titre.style.paddingTop = "20px";
                div.appendChild(titre);

                if(dogs.length == 0){
                    var div_addDog_info = document.createElement("div");
                    div_addDog_info.innerHTML = "Aucun chien trouvé";
                    div_addDog_info.style.margin = "auto";
                    div_addDog_info.style.color = "#2c3e50";
                    div_addDog_info.style.fontSize = "14px";
                    div_addDog_info.style.textAlign = "center";
                    div_addDog_info.style.fontWeight = "400";
                    div_addDog_info.style.paddingTop = "20px";
                    div.appendChild(div_addDog_info);
                }
                else {
                    // On affiche la liste des chiens
                    var div_tableau = document.createElement("div");
                    var cid = arguments[3];
                    var tableau = "<table>";
                    for(var i = 0 ; i < dogs.length ; i++){
                        if(dogs[i] != null){
                            tableau += "<tr>";
                            tableau += "<td>"+dogs[i].nom+"</td>";
                            tableau += "<td onclick='changePage(\"clients/edit/"+cid+"/edit_animal/"+i+"\", \"subpage\");'>Modifier</td>";
                            tableau += "</tr>";
                        }
                    }
                    tableau += "</table>";
                    div_tableau.innerHTML = tableau;
                    div.appendChild(div_tableau);
                }
            }


            var div_addDog = document.createElement("div");
            div_addDog.style.width = "100%";
            div_addDog.style.height = "50px";
            div_addDog.style.margin = "auto";
            div_addDog.style.position = "relative";
            div_addDog.style.marginTop = "20px";
            div.appendChild(div_addDog);

            var input_addDog = document.createElement("button");
            input_addDog.setAttribute("id", "add-dog-btn");
            var text_addDog = document.createTextNode("AJOUTER UN CHIEN");
            input_addDog.appendChild(text_addDog);
            input_addDog.style.width = "300px";
            input_addDog.style.height = "50px";
            input_addDog.style.fontSize = "25px";
            input_addDog.style.background = "#2c3e50";
            input_addDog.style.color = "#ecf0f1";
            input_addDog.style.cursor = "pointer";
            input_addDog.style.position = "relative";
            input_addDog.style.margin = "auto";
            input_addDog.style.border = "0px";
            input_addDog.style.display = "block";
            div_addDog.appendChild(input_addDog);

            var input_delete = document.createElement("button");
            input_delete.setAttribute("id", "delete-btn");
            input_delete.setAttribute("title", "Supprimer");
            var text_delete = document.createTextNode("✘");
            input_delete.appendChild(text_delete);
            input_delete.style.width = "20%";
            input_delete.style.height = "50px";
            input_delete.style.fontSize = "25px";
            input_delete.style.background = "#e74c3c";
            input_delete.style.color = "white";
            input_delete.style.cursor = "pointer";
            input_delete.style.marginTop = "20px";
            input_delete.style.position = "relative";
            input_delete.style.bottom = "-1px";
            input_delete.style.left = "0px";
            input_delete.style.border = "0px";
            div.appendChild(input_delete);

            var input_submit = document.createElement("button");
            input_submit.setAttribute("id", "add-btn");

            var text_submit = document.createTextNode("MODIFIER");
            input_submit.appendChild(text_submit);
            input_submit.style.width = "80%";
            input_submit.style.height = "50px";
            input_submit.style.fontSize = "25px";
            input_submit.style.background = "#27ae60";
            input_submit.style.color = "white";
            input_submit.style.cursor = "pointer";
            input_submit.style.marginTop = "20px";
            input_submit.style.position = "relative";
            input_submit.style.bottom = "0px";
            input_submit.style.left = "0px";
            input_submit.style.border = "0px";
            div.appendChild(input_submit);
            form.appendChild(div);

            var buttons = [];
            buttons.push(input_submit);
            buttons.push(input_delete);
            buttons.push(input_addDog);
            console.log(buttons);

            return buttons;
            break;
    }
    return true;
};

view.Client.action = {
    ADD: 1,
    DELETE: 2,
    LIST: 3,
    EDIT: 4
};