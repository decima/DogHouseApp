
if (typeof (view) === "undefined") {
    var view = {};
}

/**
 *
 * @param rdv Array of Creneau
 * @constructor
 */
view.Login = function () {

};

view.Login.prototype.afficher = function (parent) {
    var parent_element = document.getElementById(parent);
    var form = document.createElement("div");
    //document.style.background = "#2c3e50";
    parent_element.appendChild(form);
    var intViewportHeight = window.innerHeight;
    var intViewportWidth = window.innerWidth;
    parent_element.style.background = "#2c3e50";
    parent_element.style.width = intViewportWidth + "px";
    parent_element.style.height = intViewportHeight + "px";
    form.setAttribute("class", "login_form");

    form.style.width = "400px";
    form.style.height = "300px";
    form.style.position = "absolute";
    form.style.background = "#ecf0f1";

    var div = document.createElement("div");
    div.style = {
        position: "relative",
        height: "300px"
    };
    form.style.top = (Math.round(intViewportHeight / 2) - 150) + "px";
    form.style.left = (Math.round(intViewportWidth / 2) - 200) + "px";

    var input_login = document.createElement("input");
    input_login.setAttribute("id", "nickname");
        input_login.setAttribute("autofocus", "autofocus");

    input_login.setAttribute("placeholder", "Votre identifiant");
    input_login.style.width = "300px";
    input_login.style.height = "30px";
    input_login.style.fontSize = "20px";
    input_login.style.margin = "50px";
    div.appendChild(input_login);

    var input_pass = document.createElement("input");
    input_pass.setAttribute("type", "password");
    input_pass.setAttribute("id", "password");
    input_pass.setAttribute("placeholder", "Votre mot de passe");
    input_pass.style.width = "300px";
    input_pass.style.height = "30px";

    input_pass.style.fontSize = "20px";
    input_pass.style.marginLeft = "50px";
    div.appendChild(input_pass);

    var input_submit = document.createElement("button");
    input_submit.setAttribute("id", "login-btn");

    var text_submit = document.createTextNode("SE CONNECTER");
    input_submit.appendChild(text_submit);

    input_submit.style.width = "100%";
    input_submit.style.height = "80px";
    input_submit.style.fontSize = "25px";
    input_submit.style.background = "#27ae60";
    input_submit.style.color = "white";
    input_submit.style.cursor = "pointer";


    input_submit.style.position = "absolute";
    input_submit.style.bottom = "0px";
    input_submit.style.left = "0px";

    input_submit.style.border = "0px";

    div.appendChild(input_submit);

    form.appendChild(div);
    return input_submit;

};