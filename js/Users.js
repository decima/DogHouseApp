if (typeof (application) === "undefined") {
    var application = {};
}
/**
 * @class User
 */
application.User = function (user, pass, role, user_id) {
    this.user = user;
    this.pass = pass;
    this.role = role;
    this.user_id = user_id;
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
application.User.getCurrent=null;

application.User.reload=function(data){    
    console.log(data);
    application.User.apply(application.User.getCurrent,data);
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
    if (res.length > 0) {
        application.User.reload(res[0]);
        return true;
    }
    return false;
};

