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
view.Calendar = function (date) {
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

view.Calendar.prototype.afficher = function (parent) {
    var parent_element = document.getElementById(parent);
    var cal = document.createElement("div");
    parent_element.appendChild(cal);
    // On part chercher les données en base de données

    // On affiche le calendrier

    return true;
};