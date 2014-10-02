var application = {
    properties: {}
};
window.onload = function () {
    u1 = new application.Employe({nom: "LARGET", prenom: "Henri", telephone: "06 81 79 05 20", rue: "14 Avenue de la sablière", ville:"Mons-en-Baroeul", cp: "59370"});
   
    
    u2 = new application.Client({nom: "PEYSSON", prenom: "Florent", telephone: "06 69 24 91 06", rue: "17 Rue des jardins", ville: "Lille", cp: "59800"});

    u2.addAnimal("pikachu","pokemon",application.Animal.sexe.MALE, application.Animal.gabarit.PETIT);
    u2.addAnimal("Caninos","pokemon",application.Animal.sexe.MALE, application.Animal.gabarit.MOYEN);
    

};
