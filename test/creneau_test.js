module("client", {});

test("test_addcreneau", 1, function(){
	var db_cre = new drivers.DB("creneaux");
	var db_clt = new drivers.DB("clients");
	var db_dog = new drivers.DB("animaux");
	var db_emp = new drivers.DB("employes");
	var size = db_cre.getAll().length;
	var cre = new application.Creneau({heure: {debut: "9:30", fin: "11:00"}, date: "2014-11-28", type: ""+application.Creneau.type.EN_SALON+"", client: ""+db_clt.getAll().length-1+"", animal: ""+db_dog.getAll().length-1+"", toiletteur: ""+db_emp.getAll().length-1+""});
	equal(db_cre.addItem(cre),size);
});
test("test_removecreneau", 3, function(){
	var db_cre = new drivers.DB("creneaux");
	var db_clt = new drivers.DB("clients");
	var db_dog = new drivers.DB("animaux");
	var db_emp = new drivers.DB("employes");
	var size = db_cre.getAll().length;
	var cre = new application.Creneau({heure: {debut: "9:30", fin: "11:00"}, date: "2014-11-28", type: ""+application.Creneau.type.EN_SALON+"", client: ""+db_clt.getAll().length-1+"", animal: ""+db_dog.getAll().length-1+"", toiletteur: ""+db_emp.getAll().length-1+""});
	equal(db_cre.addItem(cre),size);
	
	var cid = size;
	notEqual(db_cre.getItem(cid), null);
	db_cre.removeItem(cid);
	equal(db_cre.getItem(cid), null);
});
test("test_getcreneau", 2, function(){
	var db_cre = new drivers.DB("creneaux");
	var db_clt = new drivers.DB("clients");
	var db_dog = new drivers.DB("animaux");
	var db_emp = new drivers.DB("employes");
	var size = db_cre.getAll().length;
	var cre = new application.Creneau({heure: {debut: "9:30", fin: "11:00"}, date: "2014-11-28", type: ""+application.Creneau.type.EN_SALON+"", client: ""+db_clt.getAll().length-1+"", animal: ""+db_dog.getAll().length-1+"", toiletteur: ""+db_emp.getAll().length-1+""});
	equal(db_cre.addItem(cre),size);
	
	var cid = size;
	notEqual(db_cre.getItem(cid), null);
});