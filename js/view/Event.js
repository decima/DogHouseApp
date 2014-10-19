/**
 * Created by Flo on 19/10/2014.
 */
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
view.Event = function (date) {
    var oThis = this;
    if(date != null) {
        oThis.date = date;
    }
    else {
        // on crée la date du jour
        var d = new Date();
        oThis.date = d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate();
    }
};

view.Event.prototype.afficher = function (parent, action) {
    var parent_element = document.getElementById(parent);
    var oThis = this;
    switch (action) {
        case view.Event.action.ADD:
            // Si on souhaite ajouter un évènement
            var db = new drivers.DB("clients");
            var res = db.getAll();
            console.log(res);

            var form = document.createElement("div");
            parent_element.appendChild(form);
            parent_element.style.background = "#2c3e50";
            var titre = document.createElement("div");
            titre.innerHTML = "Ajouter un évènement";
            titre.style.margin = "auto";
            titre.style.color = "#2c3e50";
            titre.style.fontSize = "28px";
            titre.style.textAlign = "center";
            titre.style.fontWeight = "600";
            titre.style.top = "20px";
            titre.style.position = "relative";
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
            input_firstName.setAttribute("autofocus", "autofocus");
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
            input_phone.setAttribute("autofocus", "autofocus");
            input_phone.setAttribute("placeholder", "Téléphone");
            input_phone.style.width = "300px";
            input_phone.style.height = "30px";
            input_phone.style.fontSize = "20px";
            input_phone.style.margin = "10px";
            input_phone.style.marginRight = "50px";
            input_phone.style.marginLeft = "50px";
            div.appendChild(input_phone);

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

            var input_address = document.createElement("input");
            input_address.setAttribute("id", "address");
            input_address.setAttribute("autofocus", "autofocus");
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
            input_cp.setAttribute("autofocus", "autofocus");
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
            input_city.setAttribute("autofocus", "autofocus");
            input_city.setAttribute("placeholder", "Ville");
            input_city.style.width = "300px";
            input_city.style.height = "30px";
            input_city.style.fontSize = "20px";
            input_city.style.margin = "10px";
            input_city.style.marginRight = "50px";
            input_city.style.marginLeft = "50px";
            div.appendChild(input_city);

            var input_submit = document.createElement("button");
            input_submit.setAttribute("id", "login-btn");

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
            break;
        case view.Event.action.DELETE:
            // Si on souhaite supprimer un évènement



            break;
    }
    return true;
};

view.Event.action = {
    ADD: 1,
    DELETE: 2
};