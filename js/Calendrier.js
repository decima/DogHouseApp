/**
 * Created by Flo on 16/10/2014.
 * @class Calendrier
 */


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
application.Calendrier = function (creaneaux) {
    this.creaneaux = creaneaux;
    // On récupère le nombre d'employés
    var employes = [];
    this.creaneaux.forEach(function(c){
        if (!employes.inArray(c.toiletteur.nom))
            employes.push(c.toiletteur.nom);
    });

    this.nb_employes = employes.length;
    this.creneaux_par_employe = [nb_employes];
    this.creneaux_par_employe.forEach(function(c){
        c = [];
    });
    this.creaneaux.forEach(function(c){
        creneaux_par_employe[employes.indexOf(c.toiletteur.nom)].push(c);
    });
};

application.Calendrier.prototype = {
    afficher:function(parent){
        var parent_element = document.getElementById(parent);
        if (parent_element) {
            // On construit notre emploi du temps
            var i_heure_debut = "9:00";
            var creneau_ouvert = [];
            employes.forEeach(function(e){
               creneau_ouvert[e] = 0;
            });

            var ligne_vierge = [employes.length];
            for (var i = 0 ; h < employes.length ; h++) {
                ligne_vierge[i] = [];
            }

            var c_par_e = this.creneaux_par_employe;
            var edt = [];
            while (i_heure_debut != "19:15") {
                var ligne = ligne_vierge;
                for (var i = 0 ; i < employes.length ; i++) {       // Pour chaque employé
                    ligne[i]["occupe"] = 0;
                    ligne[i]["creneau"] = null;
                    for (var j = 0 ; j < c_par_e[i].length ; j++){  // Pour chaque créneau de cet employé
                        if(c_par_e[i].okTime(i_heure_debut)) {      // Si la tranche horaire est dans le créneau
                            ligne[i]["creneau"] = c_par_e[i];
                            (creneau_ouvert[i] == 0) ? ligne[i]["occupe"] = 1 : ligne[i]["occupe"] = 2;
                            (creneau_ouvert[i] == 0) ? creneau_ouvert[i] = 1 : "";
                            break;
                        }
                        else if (!c_par_e[i].okTime(i_heure_debut) && creneau_ouvert[i] != 0) {
                            // Si le créneau vient de se terminer
                            ligne[i]["occupe"] = 3;
                            ligne[i]["creneau"] = c_par_e[i];
                            c_par_e[i].shift();
                            creneau_ouvert[i] = 0;
                            break;
                        }
                    }
                }
                edt.push(ligne);
                i_heure_debut = incremente_quart_heure(i_heure_debut);
            }
            console.log(edt);
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