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
        //prendre à partir d'une date
        page = new view.Calendar(date);
        page.afficher("subpage");
    },
    "/add-event/{date}": function (date) {
        page = new view.Event(date);
        page.afficher("subpage", view.Event.action.ADD);
    },
    "/delete-event/{id}": function (eid) {

    },
    "/clients": function () {
        page = new view.Client();
        var db_clt = new drivers.DB("clients");
        var all_clt = db_clt.getAll();
        console.log(all_clt);
        page.afficher("subpage", view.Client.action.LIST);
    },
    "/clients/add": function () {
        page = new view.Client();
        var btn = page.afficher("subpage", view.Client.action.ADD);
        btn.addEventListener("click", function () {
            var nom = document.getElementById("lastName").value;
            var prenom = document.getElementById("firstName").value;
            var tel = document.getElementById("phone").value;
            var adresse = document.getElementById("address").value;
            var cp = document.getElementById("cp").value;
            var ville = document.getElementById("city").value;

            if(nom != "" && prenom != "" && tel != "") {
                var db_clt = new drivers.DB("clients");
                var clt = new application.Client({nom: "'"+nom+"'", prenom: "'"+prenom+"'", telephone: "'"+tel+"'", rue: "'"+adresse+"'", ville: "'"+ville+"'", cp: "'"+cp+"'"});
                db_clt.addItem(clt);
            }
            else {
                alert("Informations incomplètes !");
            }
        });
    },
    "/clients/edit/{id}":function (cid) {

    }










};
