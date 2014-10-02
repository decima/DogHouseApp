/**
 * Created by university on 21/09/14.
 */
var application = {
    properties : {}
};
application.properties.gabarit = {
    PETIT : 0,
    MOYEN : 1,
    GRAND : 2
};

/**
 * @class adresse
 */
application.Adresse = function (rue, ville, cp) {
    this.rue = rue;
    this.ville = ville;
    this.cp = cp;
};
application.Adresse.prototype = {
};

/**
 * @class Personne
 *
 */
application.Personne = function (data) {
    this.nom = data.nom ? data.nom : "";
    this.prenom = data.prenom ? data.prenom : "";
    this.telephone = data.telephone ? data.telephone : "";
    this.adresse = new application.Adresse(data.rue ? data.rue : "", data.ville ? data.ville : "", data.cp ? data.cp : "");
};
application.Personne.prototype = {};


/**
 * @class Client
 *
 */
application.Client = function (data) {
    application.Personne.apply(this, arguments);
    this.animal = new Animal(data.animal.nom, data.animal.sexe, data.animal.race, data.animal.gabarit);
};
application.Client.prototype = new application.Personne({});


/**
 * @class Employe
 *
 */
application.Employe = function (data) {
    application.Personne.apply(this, arguments);
};
application.Employe.prototype = new application.Personne({});



/**
 * @class Animal
 */
application.Animal = function (nom, sexe, race, gabarit) {
    this.nom = nom;
    this.sexe = sexe;
    this.race = race;
    this.gabarit = gabarit ? gabarit : application.properties.gabarit.MOYEN;
};
application.Adresse.prototype = {
};



application.Creneau = function () {

};