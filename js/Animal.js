
if (typeof (application) === "undefined") {
    var application = {};
}
/**
 * @class Animal
 */
application.Animal = function (data) {
    this.cid = data.cid;
    this.nom = data.nom;
    this.sexe = data.sexe ? data.sexe : application.Animal.sexe.MALE;
    this.race = data.race;
    this.gabarit = data.gabarit ? data.gabarit : application.Animal.gabarit.MOYEN;
};

application.Animal.gabarit = {
    PETIT: 0,
    MOYEN: 1,
    GRAND: 2
};
application.Animal.sexe = {
    MALE: 0,
    FEMELLE: 1
};
