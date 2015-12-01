
if (typeof (application) === "undefined") {
    var application = {};
}
/**
 * @class adresse
 */
application.Adresse = function (rue, ville, cp) {
    this.rue = rue;
    this.ville = ville;
    this.cp = cp;
};

application.Adresse.prototype = {
    toString: function () {
        return this.rue + "\n" + this.ville + " " + this.cp;
    }
};  