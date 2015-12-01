module("client", {});

test("test_createclient", 1, function(){
	var db_clt = new drivers.DB("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "NomTest", prenom: "PrenomTest", telephone: "0123456789", rue: "", ville: "", cp: ""});
	
	equal(db_clt.addItem(clt),size);
});
test("test_removeclient", 3, function(){
	var db_clt = new drivers.DB("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "NomTest", prenom: "PrenomTest", telephone: "0123456789", rue: "", ville: "", cp: ""});
	equal(db_clt.addItem(clt),size);
	var cid = size;
	notEqual(db_clt.getItem(cid), null);
	db_clt.removeItem(cid);
	equal(db_clt.getItem(cid), null);
});
test("test_getclient", 2, function(){
	var db_clt = new drivers.DB("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "NomTest", prenom: "PrenomTest", telephone: "0123456789", rue: "", ville: "", cp: ""});
	equal(db_clt.addItem(clt),size);
	var cid = size;
	notEqual(db_clt.getItem(cid), null);
});
test("test_editclient", 5, function(){
	var db_clt = new drivers.DB("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "Nom", prenom: "Prenom", telephone: "9876543210", rue: "", ville: "", cp: ""});
	equal(db_clt.addItem(clt),size);
	var cid = size;
	notEqual(db_clt.getItem(cid), null);
	var clt2 = new application.Client({nom: "NomTest", prenom: "PrenomTest", telephone: "0123456789", rue: "", ville: "", cp: ""});
	db_clt.replaceItem(cid, clt2);
	var clt3 = db_clt.getItem(cid);
	equal(clt3.nom,"NomTest");
	equal(clt3.prenom,"PrenomTest");
	equal(clt3.telephone,"0123456789");
});
test("test_adddog", 3, function(){
	var db_clt = new drivers.DB("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "Nom", prenom: "Prenom", telephone: "9876543210", rue: "", ville: "", cp: ""});
	equal(db_clt.addItem(clt),size);
	var cid = size;
	
	notEqual(db_clt.getItem(cid), null);
	
	var db_dog = new drivers.DB("animaux");
	var size_dog = db_dog.getAll().length;
	var dog = new application.Animal({cid: "" + cid + "", nom: "Tobby", sexe: ""+application.Animal.sexe.Male+"", race: "Caniche", gabarit: ""+application.Animal.gabarit.PETIT+""});
	
	equal(db_dog.addItem(dog),size_dog);
});
test("test_removedog", 5, function(){
	var db_clt = new drivers.DB("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "Nom", prenom: "Prenom", telephone: "9876543210", rue: "", ville: "", cp: ""});
	equal(db_clt.addItem(clt),size);
	var cid = size;
	
	notEqual(db_clt.getItem(cid), null);
	
	var db_dog = new drivers.DB("animaux");
	var size_dog = db_dog.getAll().length;
	var dog = new application.Animal({cid: "" + cid + "", nom: "Tobby", sexe: ""+application.Animal.sexe.Male+"", race: "Caniche", gabarit: ""+application.Animal.gabarit.PETIT+""});
	
	equal(db_dog.addItem(dog),size_dog);
	var did = size_dog;
	notEqual(db_dog.getItem(did), null);
	
	db_dog.removeItem(did);
	equal(db_dog.getItem(did), null);
});
test("test_getdog", 4, function(){
	var db_clt = new drivers.DB("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "Nom", prenom: "Prenom", telephone: "9876543210", rue: "", ville: "", cp: ""});
	equal(db_clt.addItem(clt),size);
	var cid = size;
	
	notEqual(db_clt.getItem(cid), null);
	
	var db_dog = new drivers.DB("animaux");
	var size_dog = db_dog.getAll().length;
	var dog = new application.Animal({cid: "" + cid + "", nom: "Tobby", sexe: ""+application.Animal.sexe.Male+"", race: "Caniche", gabarit: ""+application.Animal.gabarit.PETIT+""});
	
	equal(db_dog.addItem(dog),size_dog);
	var did = size_dog;
	notEqual(db_dog.getItem(did), null);
});
test("test_editdog", 8, function(){
	var db_clt = new drivers.Database("clients");
	var size = db_clt.getAll().length;
	var clt = new application.Client({nom: "Nom", prenom: "Prenom", telephone: "9876543210", rue: "", ville: "", cp: ""});
	equal(db_clt.addItem(clt),size);
	var cid = size;
	
	notEqual(db_clt.getItem(cid), null);
	
	var db_dog = new drivers.Database("animaux");
	var size_dog = db_dog.getAll().length;
	var dog = new application.Animal({cid: "" + cid + "", nom: "Tobby", sexe: ""+application.Animal.sexe.Male+"", race: "Caniche", gabarit: ""+application.Animal.gabarit.PETIT+""});
	
	equal(db_dog.addItem(dog),size_dog);
	var did = size_dog;
	notEqual(db_dog.getItem(did), null);
	
	var dog2 = new application.Animal({cid: "" + cid + "", nom: "Bobby", sexe: ""+application.Animal.sexe.Femelle+"", race: "Yorkshire", gabarit: ""+application.Animal.gabarit.PETIT+""});
	db_dog.replaceItem(did, dog2);
	var dog3 = db_dog.getItem(did);
	equal(dog3.nom,"Bobby");
	equal(dog3.sexe,""+application.Animal.sexe.Femelle+"");
	equal(dog3.race,"Yorkshire");
	equal(dog3.gabarit,""+application.Animal.gabarit.PETIT+"");
});