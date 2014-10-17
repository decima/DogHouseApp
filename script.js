var employes = null;
var clients = null;

var u1;
var u2;
var u3;
window.onload = function () {

    drivers.Database.sampleSearch();
    console.log("--------------------------");
    employes = new drivers.DB("employes");
    clients = new drivers.DB("clients");

    u3 = new application.Employe({nom: "BOB", prenom: "Henri", telephone: "06 81 79 05 20", rue: "14 Avenue de la sablière", ville: "Mons-en-Baroeul", cp: "59370"});
    u1 = new application.Employe({nom: "LARGET", prenom: "Henri", telephone: "06 81 79 05 20", rue: "14 Avenue de la sablière", ville: "Mons-en-Baroeul", cp: "59370"});

    u2 = new application.Client({nom: "PEYSSON", prenom: "Florent", telephone: "06 69 24 91 06", rue: "17 Rue des jardins", ville: "Lille", cp: "59800"});
    u2.addAnimal("pikachu", "pokemon", application.Animal.sexe.MALE, application.Animal.gabarit.PETIT);
    u2.addAnimal("Caninos", "pokemon", application.Animal.sexe.MALE, application.Animal.gabarit.MOYEN);


    var tmp1 = clients.addItem(u2);
    /*
     console.log(tmp1);
     console.log(clients.getItem(tmp1));
     */
    employes.addItem(u1);
    employes.addItem(u3);
    /*
     console.log(employes.getAll());*/
    var cdt =
            DBC.OR(
                    DBC.EQ("nom", "LARGET"),
                    DBC.EQ("prenom", "Henri"));
//console.log(employes.atomicSearchItem(DBC.EQ("prenom","Henri")));

    console.log(employes.searchItem(cdt));



    clients.destroy();
    employes.destroy();



};
