if (typeof (application) === "undefined") {
    var application = {};
}


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
application.Personne.prototype = {
    getNom: function () {
        return this.nom;
    }

};