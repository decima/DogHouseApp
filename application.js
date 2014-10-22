var DEBUG_MODE = window.location.search.toLowerCase() == "?debug";
var route = new drivers.Route();

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
var session = new drivers.Session();
window.onload = function () {
    //drivers.DB.sampleSearch(true);

    var t = new drivers.DB("employes");
    if (t.getAll().length < 1) {
        createData();
    } /*else {
        var e = t.getAll();
        if(e[0]==null){
            createData();
        }
        if (typeof (e[0].passwd) == "undefined") {
            createData();

        }
    }*/


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
        var db_clt = new drivers.DB("employes");
db_clt.destroy();
    var a = new application.Employe({
        nom: "larget",
        prenom: "henri",
        telephone: "0123456789",
        login: "hlarget",
        password: "123456"
    });
    var b = new application.Employe({
        nom: "peysson",
        prenom: "florent",
        telephone: "0987654321",
        login: "fpeysson",
        password: "654321"
    });
    db_clt.addItem(a);
    db_clt.addItem(b);


}