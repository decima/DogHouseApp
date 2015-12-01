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
            var form = document.createElement("div");
            parent_element.appendChild(form);
            parent_element.style.background = "#2c3e50";
            var titre = document.createElement("div");
            titre.innerHTML = "Ajouter un créneau";
            titre.style.margin = "auto";
            titre.style.color = "#2c3e50";
            titre.style.fontSize = "28px";
            titre.style.textAlign = "center";
            titre.style.fontWeight = "600";
            titre.style.paddingTop = "20px";
            form.appendChild(titre);

            form.setAttribute("class", "new_creneau_form");
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

            var db_clt = new drivers.DB("clients");
            var clt = db_clt.getAll();

            var db_emp = new drivers.DB("employes");
            var emp = db_emp.getAll();


            // Employé
            var select_employe = document.createElement("select");
            select_employe.setAttribute("id", "employe");
            select_employe.style.width = "300px";
            select_employe.style.height = "30px";
            select_employe.style.fontSize = "20px";
            select_employe.style.margin = "10px";
            select_employe.style.marginRight = "50px";
            select_employe.style.marginLeft = "50px";
            div.appendChild(select_employe);
            var option_employe = document.createElement("option");
            option_employe.setAttribute("value", "-1");
            option_employe.innerHTML = "Employé";
            select_employe.appendChild(option_employe);
            for(var i = 0 ; i < emp.length ; i++){
                if(emp[i] != null){
                    var option_employe = document.createElement("option");
                    option_employe.setAttribute("value", i);
                    option_employe.innerHTML = emp[i].nom + " " + emp[i].prenom;
                    select_employe.appendChild(option_employe);
                }
            }


            // Client
            var select_client = document.createElement("select");
            select_client.setAttribute("id", "client");
            select_client.onchange = function(){
                if(select_chien.style.display == "none")
                    select_chien.style.display = "block";
                var cid = select_client.value;
                console.log(cid);
                var db_dog = new drivers.DB("animaux");
                var dogs = db_dog.getAll();
                for(var i = 0 ; i < dogs.length ; i++){
                    if(dogs[i] != null && dogs[i].cid == cid){
                        var option_chien = document.createElement("option");
                        option_chien.setAttribute("value", i);
                        option_chien.innerHTML = dogs[i].nom;
                        select_chien.appendChild(option_chien);
                    }
                }
            }
            select_client.style.width = "300px";
            select_client.style.height = "30px";
            select_client.style.fontSize = "20px";
            select_client.style.margin = "10px";
            select_client.style.marginRight = "50px";
            select_client.style.marginLeft = "50px";
            div.appendChild(select_client);
            var option_client = document.createElement("option");
            option_client.setAttribute("value", "-1");
            option_client.innerHTML = "Client";
            select_client.appendChild(option_client);
            console.log(clt);
            for(var i = 0 ; i < clt.length ; i++){
                console.log(clt[i]);
                if(clt[i] != null){
                    var option_client = document.createElement("option");
                    option_client.setAttribute("value", i);
                    option_client.innerHTML = clt[i].nom + " " + clt[i].prenom;
                    select_client.appendChild(option_client);
                }
            }


            // Chien
            var select_chien = document.createElement("select");
            select_chien.setAttribute("id", "chien");
            select_chien.style.width = "300px";
            select_chien.style.height = "30px";
            select_chien.style.fontSize = "20px";
            select_chien.style.margin = "10px";
            select_chien.style.marginRight = "50px";
            select_chien.style.marginLeft = "50px";
            select_chien.style.display = "none";
            div.appendChild(select_chien);

            var input_date = document.createElement("input");
            input_date.setAttribute("id", "date");
            input_date.setAttribute("placeholder", "Date AAAA-MM-JJ");
            input_date.style.width = "300px";
            input_date.style.height = "30px";
            input_date.style.fontSize = "20px";
            input_date.style.margin = "10px";
            input_date.style.marginRight = "50px";
            input_date.style.marginLeft = "50px";
            input_date.value=arguments[2];
            div.appendChild(input_date);

            // Heure début
            var select_heure_debut = document.createElement("select");
            select_heure_debut.setAttribute("id", "heure_debut");
            select_heure_debut.style.width = "300px";
            select_heure_debut.style.height = "30px";
            select_heure_debut.style.fontSize = "20px";
            select_heure_debut.style.margin = "10px";
            select_heure_debut.style.marginRight = "50px";
            select_heure_debut.style.marginLeft = "50px";
            div.appendChild(select_heure_debut);
            var option_heure_debut = document.createElement("option");
            option_heure_debut.setAttribute("value", "-1");
            option_heure_debut.innerHTML = "Heure du début";
            select_heure_debut.appendChild(option_heure_debut);
            for(var i = 9 ; i < 20 ; i++){
                var option_heure_debut = document.createElement("option");
                option_heure_debut.setAttribute("value", i);
                option_heure_debut.innerHTML = i;
                select_heure_debut.appendChild(option_heure_debut);
            }

            // Minute début
            var select_minute_debut = document.createElement("select");
            select_minute_debut.setAttribute("id", "minute_debut");
            select_minute_debut.style.width = "300px";
            select_minute_debut.style.height = "30px";
            select_minute_debut.style.fontSize = "20px";
            select_minute_debut.style.margin = "10px";
            select_minute_debut.style.marginRight = "50px";
            select_minute_debut.style.marginLeft = "50px";
            div.appendChild(select_minute_debut);
            var option_minute_debut = document.createElement("option");
            option_minute_debut.setAttribute("value", "-1");
            option_minute_debut.innerHTML = "Minute";
            select_minute_debut.appendChild(option_minute_debut);
            for(var i = 0 ; i <= 45 ; i = i+15){
                var option_minute_debut = document.createElement("option");
                var minutes = i;
                if(i == 0)
                    minutes = "00";

                option_minute_debut.setAttribute("value", minutes);
                option_minute_debut.innerHTML = minutes;
                select_minute_debut.appendChild(option_minute_debut);
            }

            // Heure début
            var select_heure_fin = document.createElement("select");
            select_heure_fin.setAttribute("id", "heure_fin");
            select_heure_fin.style.width = "300px";
            select_heure_fin.style.height = "30px";
            select_heure_fin.style.fontSize = "20px";
            select_heure_fin.style.margin = "10px";
            select_heure_fin.style.marginRight = "50px";
            select_heure_fin.style.marginLeft = "50px";
            div.appendChild(select_heure_fin);
            var option_heure_fin = document.createElement("option");
            option_heure_fin.setAttribute("value", "-1");
            option_heure_fin.innerHTML = "Heure du fin";
            select_heure_fin.appendChild(option_heure_fin);
            for(var i = 9 ; i < 20 ; i++){
                var option_heure_fin = document.createElement("option");
                option_heure_fin.setAttribute("value", i);
                option_heure_fin.innerHTML = i;
                select_heure_fin.appendChild(option_heure_fin);
            }

            // Minute fin
            var select_minute_fin = document.createElement("select");
            select_minute_fin.setAttribute("id", "minute_fin");
            select_minute_fin.style.width = "300px";
            select_minute_fin.style.height = "30px";
            select_minute_fin.style.fontSize = "20px";
            select_minute_fin.style.margin = "10px";
            select_minute_fin.style.marginRight = "50px";
            select_minute_fin.style.marginLeft = "50px";
            div.appendChild(select_minute_fin);
            var option_minute_fin = document.createElement("option");
            option_minute_fin.setAttribute("value", "-1");
            option_minute_fin.innerHTML = "Minute";
            select_minute_fin.appendChild(option_minute_fin);
            for(var i = 0 ; i <= 45 ; i = i+15){
                var option_minute_fin = document.createElement("option");
                var minutes = i;
                if(i == 0)
                    minutes = "00";

                option_minute_fin.setAttribute("value", minutes);
                option_minute_fin.innerHTML = minutes;
                select_minute_fin.appendChild(option_minute_fin);
            }

            // Type de créneau
            var select_type = document.createElement("select");
            select_type.setAttribute("id", "type");
            select_type.style.width = "300px";
            select_type.style.height = "30px";
            select_type.style.fontSize = "20px";
            select_type.style.margin = "10px";
            select_type.style.marginRight = "50px";
            select_type.style.marginLeft = "50px";
            div.appendChild(select_type);
            var option_type = document.createElement("option");
            option_type.setAttribute("value", "-1");
            option_type.innerHTML = "Type";
            select_type.appendChild(option_type);
            var option_type = document.createElement("option");
            option_type.setAttribute("value", application.Creneau.type.EN_SALON);
            option_type.innerHTML = "En salon";
            select_type.appendChild(option_type);
            var option_type = document.createElement("option");
            option_type.setAttribute("value", application.Creneau.type.A_DOMICILE);
            option_type.innerHTML = "A domicile";
            select_type.appendChild(option_type);

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
            return input_submit;
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