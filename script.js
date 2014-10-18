var employes = null;
var clients = null;

var u1;
var u2;
var u3;
window.onload = function () {

    //drivers.Database.sampleSearch();
    console.log("--------------------------");
    employes = new drivers.DB("employes");
    clients = new drivers.DB("clients");

    u3 = new application.Employe({nom: "BOB", prenom: "Edwards", telephone: "06 81 79 05 20", rue: "14 Avenue de la sablière", ville: "Mons-en-Baroeul", cp: "59370"});
    u1 = new application.Employe({nom: "LARGET", prenom: "Henri", telephone: "06 81 79 05 20", rue: "14 Avenue de la sablière", ville: "Mons-en-Baroeul", cp: "59370"});
    u2 = new application.Client({nom: "PEYSSON", prenom: "Florent", telephone: "06 69 24 91 06", rue: "17 Rue des jardins", ville: "Lille", cp: "59800"});
    var a1 = u2.addAnimal("pikachu", "pokemon", application.Animal.sexe.MALE, application.Animal.gabarit.PETIT);
    var a2 = u2.addAnimal("Caninos", "pokemon", application.Animal.sexe.MALE, application.Animal.gabarit.MOYEN);

    var creneaux = [];

    creneaux.push(new application.Creneau({
        heure: {debut: "9:30", fin: "10:30"},
        date: "18/10/2014",
        client: u2,
        type: application.Creneau.EN_SALON,
        toiletteur: u1,
        animal: a1
    }).toObject());
    creneaux.push(new application.Creneau({
        heure: {debut: "17:00", fin: "18:30"},
        date: "18/10/2014",
        client: u2,
        type: application.Creneau.A_DOMICILE,
        toiletteur: u3,
        animal: a2
    }).toObject());

   creneaux.push(new application.Creneau({
        heure: {debut: "14:30", fin: "15:45"},
        date: "18/10/2014",
        client: u2,
        type: application.Creneau.A_DOMICILE,
        toiletteur: u1,
        animal: a1
    }).toObject());

   creneaux.push(new application.Creneau({
        heure: {debut: "14:00", fin: "15:30"},
        date: "18/10/2014",
        client: u2,
        type: application.Creneau.EN_SALON,
        toiletteur: u3,
        animal: a1
    }).toObject());



   creneaux.push(new application.Creneau({
        heure: {debut: "14:30", fin: "15:45"},
        date: "18/10/2014",
        client: u2,
        type: application.Creneau.A_DOMICILE,
        toiletteur: u1,
        animal: a1
    }).toObject());

    console.log(creneaux[0].okTime("10:45"));


    cal = new application.Calendrier(creneaux);
    cal.afficher("cal");
/*

    var tmp1 = clients.addItem(u2);
    
     console.log(tmp1);
     console.log(clients.getItem(tmp1));
     
    employes.addItem(u1);
    employes.addItem(u3);
    
     console.log(employes.getAll());
    var cdt =
            DBC.OR(
                    DBC.EQ("nom", "LARGET"),
                    DBC.EQ("prenom", "Henri"));
//console.log(employes.atomicSearchItem(DBC.EQ("prenom","Henri")));

    //console.log(employes.searchItem(cdt));



    clients.destroy();
    employes.destroy();
*/


};
