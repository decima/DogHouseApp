/**
 * Singleton drivers.Session
 * @author H. Larget <henri@larget.fr>
 */
if (typeof (drivers) === "undefined") {
    var drivers = {};
}

drivers.Session = function () {
    if (typeof (Storage) === "undefined") {
        throw new drivers.Session.NoStorageException();
    }
    if (drivers.Session.singleton === null) {
        drivers.Session.singleton = this;
    }
    return drivers.Session.singleton;
};
drivers.Session.singleton = null;


drivers.Session.prototype.set = function (key, val) {
    window.localStorage.setItem("session_"+key, JSON.stringify(val));
};

drivers.Session.prototype.get = function (key, _default) {
    mv = JSON.parse(window.localStorage.getItem("session_"+key));
    if (mv === null || typeof (mv) === "undefined"){
        mv = _default;}
    return mv;
};
drivers.Session.prototype.unset = function (key) {
    window.localStorage.removeItem("session_"+key);
};



drivers.Session.NoStorageException = function () {
};

drivers.Session.NoStorageException.prototype.toString = function () {
    return "No Storage found";
};
