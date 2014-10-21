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
view.Animal = function () {

};

view.Animal.prototype.afficher = function (parent, action) {
    var parent_element = document.getElementById(parent);
    var oThis = this;
    switch (action) {
        case view.Animal.action.ADD:
            // Si on souhaite ajouter un animal
            var form = document.createElement("div");
            parent_element.appendChild(form);
            parent_element.style.background = "#2c3e50";
            var titre = document.createElement("div");
            titre.innerHTML = "Ajouter un animal";
            titre.style.margin = "auto";
            titre.style.color = "#2c3e50";
            titre.style.fontSize = "28px";
            titre.style.textAlign = "center";
            titre.style.fontWeight = "600";
            titre.style.paddingTop = "20px";
            form.appendChild(titre);

            form.setAttribute("class", "new_animal_form");
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

            var input_nom = document.createElement("input");
            input_nom.setAttribute("id", "nom");
            input_nom.setAttribute("autofocus", "autofocus");
            input_nom.setAttribute("placeholder", "Nom");
            input_nom.style.width = "300px";
            input_nom.style.height = "30px";
            input_nom.style.fontSize = "20px";
            input_nom.style.margin = "10px";
            input_nom.style.marginTop = "40px";
            input_nom.style.marginRight = "50px";
            input_nom.style.marginLeft = "50px";
            input_nom.style.position = "relative";
            div.appendChild(input_nom);

            var select_sexe = document.createElement("select");
            select_sexe.setAttribute("id", "sexe");
            select_sexe.style.width = "300px";
            select_sexe.style.height = "30px";
            select_sexe.style.fontSize = "20px";
            select_sexe.style.margin = "10px";
            select_sexe.style.marginRight = "50px";
            select_sexe.style.marginLeft = "50px";
            div.appendChild(select_sexe);
            var option_sexe = document.createElement("option");
            option_sexe.setAttribute("value", "-1");
            option_sexe.innerHTML = "Sexe";
            select_sexe.appendChild(option_sexe);
            var option_sexe = document.createElement("option");
            option_sexe.setAttribute("value", application.Animal.sexe.MALE);
            option_sexe.innerHTML = "Male";
            select_sexe.appendChild(option_sexe)
            ;var option_sexe = document.createElement("option");
            option_sexe.setAttribute("value", application.Animal.sexe.FEMELLE);
            option_sexe.innerHTML = "Femelle";
            select_sexe.appendChild(option_sexe);

            var input_race = document.createElement("input");
            input_race.setAttribute("id", "race");
            input_race.setAttribute("placeholder", "Race");
            input_race.style.width = "300px";
            input_race.style.height = "30px";
            input_race.style.fontSize = "20px";
            input_race.style.margin = "10px";
            input_race.style.marginRight = "50px";
            input_race.style.marginLeft = "50px";
            div.appendChild(input_race);

            var select_gabarit = document.createElement("select");
            select_gabarit.setAttribute("id", "gabarit");
            select_gabarit.style.width = "300px";
            select_gabarit.style.height = "30px";
            select_gabarit.style.fontSize = "20px";
            select_gabarit.style.margin = "10px";
            select_gabarit.style.marginRight = "50px";
            select_gabarit.style.marginLeft = "50px";
            div.appendChild(select_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", "-1");
            option_gabarit.innerHTML = "Gabarit";
            select_gabarit.appendChild(option_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", application.Animal.gabarit.PETIT);
            option_gabarit.innerHTML = "Petit";
            select_gabarit.appendChild(option_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", application.Animal.gabarit.MOYEN);
            option_gabarit.innerHTML = "Moyen";
            select_gabarit.appendChild(option_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", application.Animal.gabarit.GRAND);
            option_gabarit.innerHTML = "Grand";
            select_gabarit.appendChild(option_gabarit);


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
        case view.Animal.action.EDIT:
            var dog = arguments[2];

            var form = document.createElement("div");
            parent_element.appendChild(form);
            parent_element.style.background = "#2c3e50";
            var titre = document.createElement("div");
            titre.innerHTML = "Modifier un animal";
            titre.style.margin = "auto";
            titre.style.color = "#2c3e50";
            titre.style.fontSize = "28px";
            titre.style.textAlign = "center";
            titre.style.fontWeight = "600";
            titre.style.paddingTop = "20px";
            form.appendChild(titre);

            form.setAttribute("class", "new_animal_form");
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

            var input_nom = document.createElement("input");
            input_nom.setAttribute("id", "nom");
            input_nom.setAttribute("autofocus", "autofocus");
            input_nom.setAttribute("placeholder", "Nom");
            input_nom.style.width = "300px";
            input_nom.style.height = "30px";
            input_nom.style.fontSize = "20px";
            input_nom.style.margin = "10px";
            input_nom.style.marginTop = "40px";
            input_nom.style.marginRight = "50px";
            input_nom.style.marginLeft = "50px";
            input_nom.style.position = "relative";
            input_nom.value = dog.nom;
            div.appendChild(input_nom);

            var select_sexe = document.createElement("select");
            select_sexe.setAttribute("id", "sexe");
            select_sexe.style.width = "300px";
            select_sexe.style.height = "30px";
            select_sexe.style.fontSize = "20px";
            select_sexe.style.margin = "10px";
            select_sexe.style.marginRight = "50px";
            select_sexe.style.marginLeft = "50px";
            div.appendChild(select_sexe);
            var option_sexe = document.createElement("option");
            option_sexe.setAttribute("value", "-1");
            option_sexe.innerHTML = "Sexe";
            select_sexe.appendChild(option_sexe);
            var option_sexe = document.createElement("option");
            option_sexe.setAttribute("value", application.Animal.sexe.MALE);
            option_sexe.innerHTML = "Male";
            if(dog.sexe == 0) {
                option_sexe.setAttribute("selected","selected");
            }
            select_sexe.appendChild(option_sexe);
            var option_sexe = document.createElement("option");
            option_sexe.setAttribute("value", application.Animal.sexe.FEMELLE);
            if(dog.sexe == 1) {
                option_sexe.setAttribute("selected","selected");
            }
            option_sexe.innerHTML = "Femelle";
            select_sexe.appendChild(option_sexe);

            var input_race = document.createElement("input");
            input_race.setAttribute("id", "race");
            input_race.setAttribute("placeholder", "Race");
            input_race.style.width = "300px";
            input_race.style.height = "30px";
            input_race.style.fontSize = "20px";
            input_race.style.margin = "10px";
            input_race.style.marginRight = "50px";
            input_race.style.marginLeft = "50px";
            input_race.value = dog.race;
            div.appendChild(input_race);

            var select_gabarit = document.createElement("select");
            select_gabarit.setAttribute("id", "gabarit");
            select_gabarit.style.width = "300px";
            select_gabarit.style.height = "30px";
            select_gabarit.style.fontSize = "20px";
            select_gabarit.style.margin = "10px";
            select_gabarit.style.marginRight = "50px";
            select_gabarit.style.marginLeft = "50px";
            div.appendChild(select_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", "-1");
            option_gabarit.innerHTML = "Gabarit";
            select_gabarit.appendChild(option_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", application.Animal.gabarit.PETIT);
            option_gabarit.innerHTML = "Petit";
            if(dog.gabarit == 0) {
                option_gabarit.setAttribute("selected","selected");
            }
            select_gabarit.appendChild(option_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", application.Animal.gabarit.MOYEN);
            option_gabarit.innerHTML = "Moyen";
            if(dog.gabarit == 1) {
                option_gabarit.setAttribute("selected","selected");
            }
            select_gabarit.appendChild(option_gabarit);
            var option_gabarit = document.createElement("option");
            option_gabarit.setAttribute("value", application.Animal.gabarit.GRAND);
            option_gabarit.innerHTML = "Grand";
            if(dog.gabarit == 2) {
                option_gabarit.setAttribute("selected","selected");
            }
            select_gabarit.appendChild(option_gabarit);


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

            return buttons;
            break;
    }
    return true;
};

view.Animal.action = {
    ADD: 1,
    LIST: 2,
    EDIT: 3
};