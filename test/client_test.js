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