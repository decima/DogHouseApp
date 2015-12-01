/**
 * Route
 * @author H. Larget <henri@larget.fr>
 */
if (typeof (drivers) === "undefined") {
    var drivers = {};
}

drivers.Route = function () {
    this.routes = {
        fixed: {},
        variables: {}
    };
};

drivers.Route.listener = null;
// assigner un chemin /page/{variable}
drivers.Route.prototype.assignRoute = function (path, action) {
    path = "/" + path + "/";
    var path1 = path.replace(/\/+/g, "\/").toLowerCase();
    path1 = path1.replace(/^\//, "");
    path1 = path1.replace(/\/$/, "");
    if (path1 === "") {
        this.routes.fixed["HOME"] = action;
    }
    else if (path1.match(/\{[a-zA-Z0-9_]+\}/g) !== null) {
        var path2 = path1.replace(/{[a-zA-Z0-9-_]+\}/g, "_var");
        this.routes.variables[path2] = action;
    } else {
        path2 = path1.replace(/{[a-zA-Z0-9_]+\}/, "_var");
        this.routes.fixed[path2] = action;
    }
};
if (typeof (drivers.Route.prototype.connected_function) == "undefined") {
    drivers.Route.prototype.connected_function = function () {
        return true;
    }
}
/* calcul de la route */
drivers.Route.prototype.proceed = function () {
    var v = this.connected_function();

    var path = "/";
    if (location.hash.length > 0) {
        path = location.hash.replace("#", "");
    }
    if (!v) {
        path = "/";
    }
    var path1 = path.replace(/\/+/g, "\/").toLowerCase();
    path1 = path1.replace(/^\//, "");
    path1 = path1.replace(/\/$/, "");
    if (path1 == "") {
        path1 = "HOME";
    }
    if (typeof (this.routes.fixed[path1]) === "function") {
        return this.routes.fixed[path1]();
    }
    var url = path1.split("/");
    for (index in this.routes.variables) {
        var base = index.split("/");
        var is_path = false;
        var params = [];
        if (base.length === url.length) {
            is_path = true;
            base.forEach(function (element, key, array) {
                if (element !== "_var") {
                    if (element !== url[key]) {
                        is_path = false;
                    }
                } else {
                    params.push(url[key]);
                }
            });
        }

        if (is_path) {
            return this.routes.variables[index].apply(null, params);
        }
    }


};



/*actier le hashchange evenement */
drivers.Route.prototype.enableProceedEvent = function () {
    var o_this = this;
    var fnc = function () {
        o_this.proceed();
    };
    if (drivers.Route.listener === null) {
        drivers.Route.listener = fnc;
        fnc();
        window.addEventListener("hashchange", fnc, false);
    }
};
/*désactiver le hashchange evenement */
drivers.Route.prototype.disableProceedEvent = function () {
    if (drivers.Route.listener !== null) {
        window.removeEventListener("hashchange", drivers.Route.listener);
        drivers.Route.listener = null;
    }
};
