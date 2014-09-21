/**
 * Created by university on 21/09/14.
 */
var application = {};
/**
 * @class adresse
 */
application.Adresse = function(rue,ville,cp){
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
application.Personne = function(data){
    this.nom = data.nom?data.nom:"";
    this.prenom = data.prenom?data.prenom:"";
    this.telephone = data.telephone?data.telephone:"";
};
application.Personne.prototype = {};


/**
 * @class Client
 *
 */
application.Client = function(data){
    this.animal = data.animal?data.animal:"";
    this.raceAnimal = data.race?data.race:"";
    this.nom = data.nom?data.nom:"";
    this.prenom = data.prenom?data.prenom:"";
    this.telephone = data.telephone?data.telephone:"";
};
application.Client.prototype = new application.Personne({});


/**
 * @class Employe
 *
 */
application.Employe = function(data){
    this.nom = data.nom?data.nom:"";
    this.prenom = data.prenom?data.prenom:"";
    this.telephone = data.telephone?data.telephone:"";
};
application.Employe.prototype = new application.Personne({});


application.Creneau=function(){
    
}