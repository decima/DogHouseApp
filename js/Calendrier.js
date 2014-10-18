/**
 * Created by Flo on 16/10/2014.
 * @class Calendrier
 */

if (typeof (application) === "undefined") {
    var application = {};
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
application.Calendrier = function (creneaux) {
    var oThis = this;
    oThis.creneaux = creneaux;
    // On récupère le nombre d'employés
    oThis.employes = [];
    this.creneaux.forEach(function(c){
        if (!oThis.employes.inArray(c.toiletteur.nom))
            oThis.employes.push(c.toiletteur.nom);
    });

    oThis.nb_employes = oThis.employes.length;
    oThis.creneaux_par_employe = new Array(oThis.nb_employes)
    for (var i = 0 ; i < oThis.nb_employes ; i++) {
        oThis.creneaux_par_employe[i] = [];
    }
    oThis.creneaux.forEach(function(c){
        oThis.creneaux_par_employe[oThis.employes.indexOf(c.toiletteur.nom)].push(c);
    });
};

application.Calendrier.prototype = {
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
                        if(c_par_e[i][j].okTime(i_heure_debut)) {      // Si la tranche horaire est dans le créneau
                            ligne[i]["creneau"] = c_par_e[i][j];
                            if(c_par_e[i][j].isLastQuarter(i_heure_debut)) {
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
                    var heure = "9:00";
                    for (var i = 0 ; i < edt.length ; i++) {
                        tableau += "<tr>";
                            var ligne = edt[i];
                            tableau += "<td class='heure'>"+heure+"</td>";
                            for (var j = 0 ; j < ligne.length ; j++) {
                                tableau += "<td class='creneau"
                                if(ligne[j]["creneau"] != null) {
                                    console.log(ligne[j]["creneau"]);
                                    console.log("Type : "+ligne[j]["creneau"].type+ " | Salon : "+application.Creneau.type.EN_SALON+ " | Salon : "+application.Creneau.type.A_DOMICILE);
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
                                tableau += "'>"+ligne[j]["occupe"]+"</td>";
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
    }
};