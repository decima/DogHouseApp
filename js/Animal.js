
if (typeof (application) === "undefined") {
    var application = {};
}
/**
 * @class Animal
 */
application.Animal = function (nom, race, sexe, gabarit) {
    this.nom = nom;
    this.sexe = sexe ? sexe : application.Animal.sexe.MALE;
    this.race = race;
    this.gabarit = gabarit ? gabarit : application.Animal.gabarit.MOYEN;
};

application.Animal.gabarit = {
    PETIT: 0,
    MOYEN: 1,
    GRAND: 2
};
application.Animal.sexe = {
    MALE: 0,
    FEMELLE: 1,
};
