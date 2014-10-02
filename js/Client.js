
/**
 * @class Client
 *
 */
application.Client = function (data) {
    application.Personne.apply(this, arguments);
    this.animals = [];
};
application.Client.prototype = application.Personne.prototype;
application.Client.prototype.addAnimal = function (nom, sexe,race,gabarit) {
    animal = new application.Animal(nom, sexe, race,gabarit);
    this.animals.push(animal);
};