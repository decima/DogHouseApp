

application.Creneau = function (data) {
    this.heure_debut = data.heure.debut ? data.heure.debut : "11:00";
    this.heure_fin = data.heure.fin ? data.heure.fin : "12:00";
    this.date = data.date;
    this.type = data.type ? data.type : application.Creneau.EN_SALON;
    this.client = data.client;
    this.toiletteur = data.toiletteur;
    this.animal = data.animal;
}
application.Creneau.prototype = {


};


application.Creneau.type = {
    EN_SALON: 0,
    A_DOMICILE: 1
}
