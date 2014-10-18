/**
 * Singleton drivers.Session
 * @author H. Larget <henri@larget.fr>
 */
if (typeof (drivers) === "undefined") {
    var drivers = {};
}

drivers.Session = function (name) {
    if (typeof (Storage) === "undefined") {
        throw new drivers.Session.NoStorageException();
    }
    if (drivers.Session.singleton == null) {
        drivers.Session.singleton = this;
    }
    return drivers.Session.singleton;
};
drivers.Session.singleton = null;


drivers.Session.prototype.set = function (key, val) {
    sessionStorage.setItem(key, val);
};

drivers.Session.prototype.get = function (key, _default) {
    mv = sessionStorage[key];
    if (mv == null || typeof (mv) == "undefined")
        mv = _default;
    return mv;
};
drivers.Session.prototype.unset = function (key) {
    sessionStorage.removeItem(key);
};



drivers.Session.NoStorageException = function () {
};

drivers.Session.NoStorageException.prototype.toString = function () {
    return "No Storage found";
};
