if (typeof (application) === "undefined") {
    var application = {};
}
/**
 * @class Employe
 *
 */
application.Employe = function (data) {
    application.Personne.apply(this, arguments);
    this.login = data.login;
    this.passwd = data.password;
};
application.Employe.prototype = application.Personne.prototype;

application.Employe.getCurrent = null;
application.Employe.connect = function (login, passwd) {
    var db = new drivers.DB("employes");
    var res = db.searchItem(drivers.DBC.AND(drivers.DBC.EQ("login", login), drivers.DBC.EQ("passwd", passwd)));
    if (res.length > 0) {
        application.Employe.getCurrent = res[0];
        return true;
    }
    return false;
};
