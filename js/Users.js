if (typeof (application) === "undefined") {
    var application = {};
}
/**
 * @class User
 */
application.User = function (user, pass, role) {
    this.user = user;
    this.pass = pass;
    this.role = role;
};
application.User.prototype.getUser = function () {
    return this.user;
};
application.User.prototype.getPass = function () {
    return this.pass;
};
application.User.prototype.getRole = function () {
    return this.role;
};
/**
 * @class Users
 */
application.Users = function () {
    this.users = new drivers.DB("users");
};
application.Users.roles = {
    RESPONSABLE: 1,
    EMPLOYE: 2
};
application.Users.prototype.create = function (login, password, role) {
    var db = new drivers.DB("users");
    var b = new application.User(login, password, role);
    return db.addItem(b);
};


application.Users.prototype.connect = function (login, passwd) {
    var db = new drivers.DB("users");
    var res = db.searchItem(drivers.DBC.AND(drivers.DBC.EQ("user", login), drivers.DBC.EQ("pass", passwd)));
    console.log(res);
    if (res.length > 0)
        return true;
    return false;
};

