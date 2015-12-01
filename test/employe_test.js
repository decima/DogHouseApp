module("employe", {});

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
function getDB(db){
	return new drivers.DB(db);
}

test("test_employeconnect_ok", 1, function(){
	var t = getDB("employes");
    if (t.getAll().length < 1) {
        createData();
    }
	equal(application.Employe.connect("hlarget","123456"),true);
});

test("test_employeconnect_wrongpwd", 1, function(){
	var t = getDB("employes");
    if (t.getAll().length < 1) {
        createData();
    }
	equal(application.Employe.connect("hlarget","654321"),false);
});

test("test_employeconnect_wronguser", 1, function(){
	var t = getDB("employes");
    if (t.getAll().length < 1) {
        createData();
    }
	equal(application.Employe.connect("tomcat","654321"),false);
});