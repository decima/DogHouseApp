if (typeof (application) === "undefined") {
    var application = {};
}

application.Creneau = function (data) {
    this.heure_debut = data.heure.debut ? data.heure.debut.split(":") : "9:00".split(":");
    this.heure_fin = data.heure.fin ? data.heure.fin.split(":") : "18:00".split(":");
    this.date = data.date;
    this.type = data.type ? data.type : application.Creneau.EN_SALON;
    this.client = data.client;
    this.toiletteur = data.toiletteur;
    this.animal = data.animal;
}
application.Creneau.prototype = {};
application.Creneau.prototype.okTime = function (tmp) {
    heure_courante = tmp.split(":");
    if (this.heure_debut[0] < heure_courante[0]
            && this.heure_fin[0] > heure_courante[0])
        return true;
    if (this.heure_debut[0] === this.heure_fin[0]
            && heure_courante[1] < this.heure_fin[1]
            && heure_courante[1] >= this.heure_debut[1])
        return true;
    if (this.heure_debut[0] === heure_courante[0]
            && this.heure_debut[1] <= heure_courante[1])
        return true;
    if (this.heure_fin[0] === heure_courante[0]
            && this.heure_fin[1] > heure_courante[1])
        return true;
    return false;
};
application.Creneau.prototype.isLastTime = function (tmp) {
    hf = this.heure_fin;
    hc = tmp.split(":");
    if (hf[1] > 0) {
        if (hf[0] == hc[0]) {
            return ((hf[1] - 15) == hc[1]);
        }
    } else {
        if (hf[0] - 1 == hc[0]) {
            return  hc[0] == "45";
        }
    }
    return false;
};
application.Creneau.type = {
    EN_SALON: 0,
    A_DOMICILE: 1
};
application.Creneau.prototype.toObject = function () {
    var obj = {
        toiletteur: {nom: this.toiletteur.getNom()},
        okTime: this.okTime,
        isLastQuarter:this.isLastTime,
        heure_debut: this.heure_debut,
        heure_fin: this.heure_fin,
    };
    return obj;
}