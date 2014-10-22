var DEBUG_MODE = window.location.search.toLowerCase() == "?debug";
var changePage = function (url) {
    if (arguments[1] != "undefined") {

        var parent_element = document.getElementById(arguments[1]);
            parent_element.innerHTML = "";
    }
    window.location.hash = url;
};
drivers.Route.prototype.connected_function = function () {
    return session.get("logged", false);
};
var route = new drivers.Route();
var session = new drivers.Session();
window.onload = function () {
    //drivers.DB.sampleSearch(true);

    var t = new drivers.DB("users");
    if (t.getAll().length < 1) {
        createData();
    }

    if (DEBUG_MODE) {
        var btn_refresh = document.createElement("button");
        btn_refresh.appendChild(document.createTextNode("refresh"));
        btn_refresh.style.position = "fixed";
        btn_refresh.style.top = "0px";
        btn_refresh.style.right = "0px";
        var tmp = document.getElementsByTagName("body");
        tmp[0].appendChild(btn_refresh);
        btn_refresh.addEventListener("click", function () {
            changePage("", "page");
            route.proceed();
        });
    }
    session.set("logged", false);
    if (typeof (application.Routes) !== "undefined")
        for (index in application.Routes)
            route.assignRoute(index, application.Routes[index]);

    route.proceed();
    route.enableProceedEvent();
};

function dbtest() {

}

function createData() {
    var users = new application.Users();
    users.create("henri", "123456", application.Users.roles.EMPLOYE);
    users.create("florent", "654321", application.Users.roles.EMPLOYE);
    users.create("admin", "pass", application.Users.roles.RESPONSABLE);
}