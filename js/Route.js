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

drivers.Route.prototype.assignRoute = function (path, action) {
    path = "/" + path + "/";
    var path1 = path.replace(/\/+/g, "\/").toLowerCase();
    path1 = path1.replace(/^\//, "");
    path1 = path1.replace(/\/$/, "");
    if (path1.match(/\{[a-zA-Z0-9_]+\}/g) !== null) {
        var path2 = path1.replace(/{[a-zA-Z0-9-_]+\}/, "_var");
        this.routes.variables[path2] = action;
    } else {
        path2 = path1.replace(/{[a-zA-Z0-9_]+\}/, "_var");
        this.routes.fixed[path2] = action;
    }
};


drivers.Route.prototype.proceed = function () {
    var path = "/";
    if (location.hash.length > 0) {
        path = location.hash.replace("#", "");
    }
    var path1 = path.replace(/\/+/g, "\/").toLowerCase();
    path1 = path1.replace(/^\//, "");
    path1 = path1.replace(/\/$/, "");
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
                }else{
                    params.push(url[key]);
                }
            });
        }
        
        if(is_path){
            return this.routes.variables[index].apply(null,params);
        }
    }


};




drivers.Route.prototype.enableProceedEvent = function () {
    var o_this = this;
    if (drivers.Route.listener === null) {
        drivers.Route.listener = window.addEventListener("hashchange", function () {
            o_this.proceed();
        }, false);
    }
};

drivers.Route.prototype.disableProceedEvent = function () {
    if (drivers.Route.listener !== null) {
        window.removeEventListener("hashchange", drivers.Route.listener);
        drivers.Route.listener = null;
    }
};
