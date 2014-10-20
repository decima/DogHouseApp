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
        page.afficher("subpage", view.Client.action.LIST, all_clt);
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

            if (nom != "" && prenom != "" && tel != "") {
                var db_clt = new drivers.DB("clients");
                var clt = new application.Client({nom: "" + nom + "", prenom: "" + prenom + "", telephone: "" + tel + "", rue: "" + adresse + "", ville: "" + ville + "", cp: "" + cp + ""});
                db_clt.addItem(clt);
                changePage("/clients/add", "subpage");
            }
            else {
                alert("Informations incomplètes !");
            }
        });
    },
    "/clients/edit/{id}": function (cid) {
        page = new view.Client();
        var db_clt = new drivers.DB("clients");
        var clt = db_clt.getItem(cid);
        if (clt == null) {
            alert("Client introuvable");
        }
        else {
            var db_dog = new drivers.DB("animaux");
            console.log(db_dog.getAll());
            var dogs = db_dog.searchItem(drivers.DBC.AND(drivers.DBC.EQ("cid", cid)));

            var buttons = page.afficher("subpage", view.Client.action.EDIT, clt, cid, dogs);
            buttons[0].addEventListener("click", function () {
                // Modifier
                var nom = document.getElementById("lastName").value;
                var prenom = document.getElementById("firstName").value;
                var tel = document.getElementById("phone").value;
                var adresse = document.getElementById("address").value;
                var cp = document.getElementById("cp").value;
                var ville = document.getElementById("city").value;

                if (nom != "" && prenom != "" && tel != "") {
                    var db_clt = new drivers.DB("clients");
                    var clt = new application.Client({nom: "" + nom + "", prenom: "" + prenom + "", telephone: "" + tel + "", rue: "" + adresse + "", ville: "" + ville + "", cp: "" + cp + ""});
                    db_clt.replaceItem(cid, clt);
                    changePage("/clients", "subpage");
                }
                else {
                    alert("Informations incomplètes !");
                }
            });
            buttons[1].addEventListener("click", function () {
                // Supprimer
                db_clt.removeItem(cid);
                changePage("/clients", "subpage");
            });
            buttons[2].addEventListener("click", function () {
                // Ajouter un chien
                changePage("/clients/edit/"+cid+"/add_animal", "subpage");
            });

            /*
             var db_clt = new drivers.DB("clients");
             db_clt.destroy();
             */
        }
    },
    "/employes": function () {
        page = new view.Employe();
        var db_clt = new drivers.DB("employes");
        var all_clt = db_clt.getAll();
        page.afficher("subpage", view.Employe.action.LIST, all_clt);

    },
    "/employes/add": function () {
        page = new view.Employe();
        var btn = page.afficher("subpage", view.Employe.action.ADD);
        btn.addEventListener("click", function () {
            var nom = document.getElementById("lastName").value;
            var prenom = document.getElementById("firstName").value;
            var tel = document.getElementById("phone").value;
            var adresse = document.getElementById("address").value;
            var cp = document.getElementById("cp").value;
            var ville = document.getElementById("city").value;

            if (nom != "" && prenom != "" && tel != "") {
                var db_clt = new drivers.DB("employes");
                var clt = new application.Employe({nom: "" + nom + "", prenom: "" + prenom + "", telephone: "" + tel + "", rue: "" + adresse + "", ville: "" + ville + "", cp: "" + cp + ""});
                db_clt.addItem(clt);
                changePage("/employes", "subpage");
            }
            else {
                alert("Informations incomplètes !");
            }
        });
    },
    "/employes/edit/{id}": function (cid) {
        page = new view.Employe();
        var db_clt = new drivers.DB("employes");
        var clt = db_clt.getItem(cid);
        if (clt == null) {
            alert("Employé introuvable");
            changePage("/employes", "subpage");
        } else {
            var buttons = page.afficher("subpage", view.Employe.action.EDIT, clt);
            buttons[0].addEventListener("click", function () {
                // Modifier
                var nom = document.getElementById("lastName").value;
                var prenom = document.getElementById("firstName").value;
                var tel = document.getElementById("phone").value;
                var adresse = document.getElementById("address").value;
                var cp = document.getElementById("cp").value;
                var ville = document.getElementById("city").value;

                if (nom != "" && prenom != "" && tel != "") {
                    var db_clt = new drivers.DB("employes");
                    var clt = new application.Employe({nom: "" + nom + "", prenom: "" + prenom + "", telephone: "" + tel + "", rue: "" + adresse + "", ville: "" + ville + "", cp: "" + cp + ""});
                    db_clt.replaceItem(cid, clt);
                    changePage("/employes", "subpage");
                }
                else {
                    alert("Informations incomplètes !");
                }
            });
            buttons[1].addEventListener("click", function () {
                // Supprimer
                db_clt.removeItem(cid);
                changePage("/employes", "subpage");
            });
        }
    },
    "/clients/edit/{id}/add_animal": function (cid) {
        page = new view.Animal();
        var button = page.afficher("subpage", view.Animal.action.ADD);
        button.addEventListener("click", function () {
            // Ajouter
            var nom = document.getElementById("nom").value;
            var sexe = document.getElementById("sexe").selectedIndex;
            var race = document.getElementById("race").value;
            var gabarit = document.getElementById("gabarit").selectedIndex;

            if (nom != "" && sexe != "-1" && race != "" && gabarit != "-1") {
                var db_dog = new drivers.DB("animaux");
                //db_dog.destroy();
                var dog = new application.Animal({cid: "" + cid + "", nom: "" + nom + "", sexe: "" + sexe + "", race: "" + race + "", gabarit: "" + gabarit + ""});
                db_dog.addItem(dog);
                changePage("/clients/edit/"+cid, "subpage");
            }
            else {
                alert("Informations incomplètes !");
            }
        });
    },
    "/clients/edit/{id}/edit_animal/{id}": function (cid, aid) {
        page = new view.Animal();
        var db_dog = new drivers.DB("animaux");
        var dog = db_dog.getItem(aid);
        if (dog == null) {
            alert("Chien introuvable");
            changePage("/clients/edit/"+cid, "subpage");
        } else {
            var buttons = page.afficher("subpage", view.Animal.action.EDIT, dog);
            buttons[0].addEventListener("click", function () {
                // Modifier
                var nom = document.getElementById("nom").value;
                var sexe = document.getElementById("sexe").selectedIndex;
                var race = document.getElementById("race").value;
                var gabarit = document.getElementById("gabarit").selectedIndex;

                if (nom != "" && sexe != "-1" && race != "" && gabarit != "-1") {
                    var dog2 = new application.Animal({cid: "" + cid + "", nom: "" + nom + "", sexe: "" + sexe + "", race: "" + race + "", gabarit: "" + gabarit + ""});
                    db_dog.replaceItem(aid, dog2);
                    changePage("/clients/edit/" + cid, "subpage");
                }
                else {
                    alert("Informations incomplètes !");
                }
            });
            buttons[1].addEventListener("click", function () {
                // Supprimer
                db_dog.removeItem(aid);
                changePage("/clients/edit/" + cid, "subpage");
            });
        }
    }










};
