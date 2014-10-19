if (typeof (application) === "undefined") {
    var application = {};
}
application.Routes = {
    "/": function () {
        var is_logged = session.get("logged", false);
        if (is_logged) {
            page = new view.Main();
            changePage("", "page");
            page.afficher("page");
        } else {
            page = new view.Login();
            var btn = page.afficher("page");
            btn.addEventListener("click", function () {
                var users = new application.Users();
                if (users.connect(document.getElementById("nickname").value, document.getElementById("password").value)) {
                    session.set("logged", true);
                    changePage("", "page");
                    route.proceed();
                } else {
                    alert("mauvais identifiants!");
                }
            });
        }
    },
    "/logout": function () {
        session.set("logged", false);
        changePage("", "page");
    },
    "/calendar/{date}": function (date) {
        //prendre à partir d'une autre date
    },
    "/add-event/{date}": function (date) {

    },
    "/delete-event/{id}": function (eid) {

    },
    "/clients": function () {

    },
    "/clients/add": function () {

    },
    "/clients/edit/{id}":function (cid) {

    }










};
