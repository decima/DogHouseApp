/**
 * Created by Flo on 16/10/2014.
 * @class Calendrier
 */

if (typeof (view) === "undefined") {
    var view = {};
}

/**
 * On défini la fonction inArray
 * @param needle
 * @returns {boolean}
 */
Array.prototype.inArray = function (needle) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
        if (this[i].toLowerCase() === needle.toLowerCase())
            return true;
    }
    return false;
}


/**
 *
 * @param rdv Array of Creneau
 * @constructor
 */
view.Calendrier = function (creneaux) {
    var oThis = this;
    oThis.creneaux = creneaux;
    // On récupère le nombre d'employés
    oThis.employes = [];
    var db_emp = new drivers.DB("employes");
    var emp = db_emp.getAll();

    this.creneaux.forEach(function(c){
        if (!oThis.employes.inArray(emp[c.toiletteur].nom))
            oThis.employes.push(emp[c.toiletteur].nom);
    });

    oThis.nb_employes = oThis.employes.length;
    oThis.creneaux_par_employe = new Array(oThis.nb_employes)
    for (var i = 0 ; i < oThis.nb_employes ; i++) {
        oThis.creneaux_par_employe[i] = [];
    }
    oThis.creneaux.forEach(function(c){
        oThis.creneaux_par_employe[oThis.employes.indexOf(emp[c.toiletteur].nom)].push(c);
    });
};

view.Calendrier.prototype = {
    afficher:function(parent){
        var oThis = this;
        var parent_element = document.getElementById(parent);
        if (parent_element) {
            // On construit notre emploi du temps
            var i_heure_debut = "9:00";
            var creneau_ouvert = [];
            for (var i = 0 ; i < oThis.employes.length ; i++) {
               creneau_ouvert[i] = 0;
            }

            var c_par_e = oThis.creneaux_par_employe;
            var edt = [];
            while (i_heure_debut != "19:15") {
                var ligne = new Array(oThis.employes.length);
                for (var i = 0 ; i < oThis.employes.length ; i++) {
                    ligne[i] = new Array();
                }
                for (var i = 0 ; i < oThis.employes.length ; i++) {      // Pour chaque employé
                    ligne[i]["occupe"] = 0;
                    ligne[i]["creneau"] = null;
                    for (var j = 0 ; j < c_par_e[i].length ; j++){      // Pour chaque créneau de cet employé
                        //console.log(i_heure_debut);
                        //console.log("["+i+"]["+j+"] : "+creneau_ouvert[i]+" | "+c_par_e[i][j].okTime(i_heure_debut) + " | " +c_par_e[i][j].isLastQuarter(i_heure_debut));
                        if(application.Creneau.okTime(c_par_e[i][j],i_heure_debut)) {      // Si la tranche horaire est dans le créneau
                            ligne[i]["creneau"] = c_par_e[i][j];
                            if(application.Creneau.isLastQuarter(c_par_e[i][j],i_heure_debut)) {
                                ligne[i]["occupe"] = 3;
                                creneau_ouvert[i] = 0;
                            }
                            else {
                                (creneau_ouvert[i] == 0) ? ligne[i]["occupe"] = 1 : ligne[i]["occupe"] = 2;
                                (creneau_ouvert[i] == 0) ? creneau_ouvert[i] = 1 : "";
                            }
                            break;
                        }
                    }
                }
                edt.push(ligne);
                i_heure_debut = oThis.incremente_quart_heure(i_heure_debut);
            }

            // on gère l'affichage
            var tableau = "";
            tableau += "<table class='edt'>";
                tableau += "<tbody>";
                    tableau += "<thead>";
                        tableau += "<td></td>";
                        console.log()
                        for (var i = 0 ; i < oThis.employes.length ; i++) {
                            tableau += "<td>"+oThis.employes[i]+"</td>";
                        }
                    tableau += "</thead>";
                    var heure = "9:00";
                    for (var i = 0 ; i < edt.length ; i++) {
                        tableau += "<tr>";
                            var ligne = edt[i];
                            tableau += "<td class='heure'>"+(heure.split(":")[1]==15||heure.split(":")[1]==45?"":heure)+"</td>";
                            for (var j = 0 ; j < ligne.length ; j++) {
                                tableau += "<td class='creneau"
                                if(ligne[j]["creneau"] != null) {
                                    //console.log(ligne[j]["creneau"]);
                                    //console.log("Type : "+ligne[j]["creneau"].type+ " | Salon : "+application.Creneau.type.EN_SALON+ " | Salon : "+application.Creneau.type.A_DOMICILE);
                                    if (ligne[j]["creneau"].type == application.Creneau.type.EN_SALON) {
                                        tableau += " creneau_salon";
                                    }
                                    else if (ligne[j]["creneau"].type == application.Creneau.type.A_DOMICILE) {
                                        tableau += " creneau_domicile";
                                    }

                                    switch(ligne[j]["occupe"]){
                                        case 1:
                                            tableau += " creneau_debut";
                                            break;
                                        case 2:
                                            tableau += " creneau_encours";
                                            break;
                                        case 3:
                                            tableau += " creneau_fin";
                                            break;
                                        default :
                                            break;
                                    }
                                }
                                tableau += "'>";
                                if(ligne[j]["occupe"] == 1){
                                    // On ajoute le bouton Supprimer
                                    var div_suppr = document.createElement("div");
                                    div_suppr.addEventListener("click", function () {
                                        changePage("/delete-event/"+cid+"/"+j, "subpage");
                                    });
                                    div_suppr.setAttribute("id", "delete-btn-"+j);
                                    div_suppr.setAttribute("title", "supprimer");
                                    var text_delete = document.createTextNode("✘");
                                    div_suppr.appendChild(text_delete);
                                    div_suppr.style.width = "20%";
                                    div_suppr.style.height = "100%";
                                    div_suppr.style.fontSize = "25px";
                                    div_suppr.style.background = "#e74c3c";
                                    div_suppr.style.color = "white";
                                    div_suppr.style.cursor = "pointer";
                                    div_suppr.style.marginTop = "20px";
                                    div_suppr.style.position = "relative";
                                    div_suppr.style.bottom = "-1px";
                                    div_suppr.style.left = "0px";
                                    div_suppr.style.border = "0px";

                                    tableau += div_suppr;
                                }
                                else if(ligne[j]["occupe"] == 3){
                                    // On affiche les informations
                                    var db_dog = new drivers.DB("animaux");
                                    var dog = db_dog.getItem(ligne[j]["creneau"].animal);

                                    var db_clt = new drivers.DB("clients");
                                    var clt = db_clt.getItem(ligne[j]["creneau"].client);

                                    //tableau += ligne[j]["creneau"].client.nom + " : " + ligne[j]["creneau"].animal.nom;
                                    tableau += clt.nom + " : " + dog.nom;
                                }
                                tableau += "</td>";
                            }
                        tableau += "</tr>";
                        heure = oThis.incremente_quart_heure(heure);
                    }
                tableau += "</tbody>";
            tableau += "</table>";
            parent_element.innerHTML = tableau;
        }
    },
    incremente_quart_heure:function(heure){
        var pos_deuxpoints = heure.indexOf(":");
        var m = heure.substr(pos_deuxpoints+1);
        var h = heure.substr(0,pos_deuxpoints);
        switch (m){
            case "00":
                m = "15";
                break;
            case "15":
                m = "30";
                break;
            case "30":
                m = "45";
                break;
            case "45":
                m = "00";
                h = parseInt(h, 10);
                h++;
                break;
        }
        var new_heure = h+":"+m;
        return new_heure;
    },
    toString:function(){
        return this.creaneaux;
    },
    getCreneauxByUserAndDate:function(user, date){
        var db = new drivers.DB("creneaux");
        var res = db.searchItem(drivers.DBC.AND(drivers.DBC.EQ("toiletteur['nom']", user), drivers.DBC.EQ("pass", passwd)));
        if (res.length > 0)
            return true;
        return false;
    }
};