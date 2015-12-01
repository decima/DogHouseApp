if (typeof (application) === "undefined") {
    var application = {};
}

application.Creneau = function (data) {
    this.heure_debut = data.heure.debut ? data.heure.debut.split(":") : "9:00".split(":");
    this.heure_fin = data.heure.fin ? data.heure.fin.split(":") : "18:00".split(":");
    this.date = data.date;
    this.type = data.type ? data.type : application.Creneau.type.EN_SALON;
    this.client = data.client;
    this.toiletteur = data.toiletteur;
    this.animal = data.animal;

};
application.Creneau.okTime = function (oThis, tmp) {
    heure_courante = tmp.split(":");
    if (parseInt(oThis.heure_debut[0]) < parseInt(heure_courante[0])
            && parseInt(oThis.heure_fin[0]) > parseInt(heure_courante[0])) {
        return true;
    }

    if (parseInt(oThis.heure_debut[0]) == parseInt(oThis.heure_fin[0])
        &&parseInt(heure_courante[0]) == parseInt(oThis.heure_fin[0])
            && parseInt(heure_courante[1]) < parseInt(oThis.heure_fin[1])
            && parseInt(heure_courante[1]) >= parseInt(oThis.heure_debut[1])) {
        return true;
    }
    if (oThis.heure_debut[0] == heure_courante[0]
            && oThis.heure_debut[1] <= heure_courante[1]){
        return oThis.heure_fin[0] == heure_courante[0]?oThis.heure_fin[1] > heure_courante[1]:true;
    }
    if (oThis.heure_fin[0] == heure_courante[0]
            && oThis.heure_fin[1] > heure_courante[1]){
        return oThis.heure_debut[0] == heure_courante[0]?oThis.heure_debut[1] <= heure_courante[1]:true;
    }
    return false;
};

application.Creneau.isLastQuarter = function (oThis, tmp) {
    var hf = oThis.heure_fin;
    var hc = tmp.split(":");
    if (hf[1] > 0) {
        if (hf[0] == hc[0]) {
            return ((hf[1] - 15) == hc[1]);
        }
    } else {
        if (hf[0] - 1 == hc[0]) {
            return  hc[1] == "45";
        }
    }
    return false;
};
application.Creneau.prototype = {};


application.Creneau.type = {
    EN_SALON: 0,
    A_DOMICILE: 1
};
application.Creneau.prototype.toObject = function () {
    var obj = {
        toiletteur: {nom: this.toiletteur.getNom()},
        okTime: this.okTime,
        isLastQuarter: this.isLastQuarter,
        heure_debut: this.heure_debut,
        heure_fin: this.heure_fin
    };
    return obj;
}
