/**
 * @class Employe
 *
 */
application.Employe = function (data) {
    application.Personne.apply(this, arguments);
};
application.Employe.prototype = application.Personne.prototype;
