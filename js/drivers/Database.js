if (typeof (drivers) === "undefined") {
    var drivers = {};
}
/* intersection de deux tableaux */
Array.prototype.intersect = function (arr2) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        for (var k = 0; k < arr2.length; k++) {
            if (this[i] === arr2[k]) {
                temp.push(this[i]);
                break;
            }
        }
    }
    return temp;
};
/* Union de deux tableaux */
Array.prototype.union = function (arr2) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        temp.push(this[i]);
    }
    for (var j = 0; j < arr2.length; j++) {
        var add = true;
        for (var k = 0; k < temp.length; k++) {
            if (temp[k] === arr2[j])
              {  add = false;}
        }
        if (add)
            {temp.push(arr2[j]);}
    }
    return temp;
};
/* Système de bases de données */
drivers.Database = function (tableName) {
    if (typeof (Storage) !== "undefined") {
        this.datas = [];
        this.tableName = tableName.toLowerCase();
        this.is_loaded = false;
        this.load();
    } else {
        throw new drivers.Database.NoStorageException();
    }
};
/* Exception si Storage n'existe pas */
drivers.Database.NoStorageException = function () {
};
drivers.Database.NoStorageException.prototype.toString = function () {
    return "No Storage found";
};
/* chargement de la base de données */
drivers.Database.prototype.load = function () {
    this.datas = JSON.parse(window.localStorage.getItem(this.tableName));
    if (this.datas === null) {
        this.datas = [];
    }
    for(index in this.datas){
        if(this.datas[index]!=null){
        this.datas[index].identifier = index;
      }
    }
    return this;
};
/* déchargement de la base de données */
drivers.Database.prototype.save = function () {
    this.is_loaded = false;
    window.localStorage.setItem(this.tableName, JSON.stringify(this.datas));
    return this;
};
/* vide toute la base de données */
drivers.Database.prototype.destroy = function () {
    window.localStorage.removeItem(this.tableName);
    this.load();
    return this;
};
/* ajoute un élément */
drivers.Database.prototype.addItem = function (e) {
    this.load();
    this.datas.push(e);
    this.save();
    return this.datas.length - 1;

};
/* retirer un élément */
drivers.Database.prototype.removeItem = function (index) {
    this.load();
    this.datas[index] = undefined;
    return this.save();
};
/* récupérer l'item par l'index */
drivers.Database.prototype.getItem = function (index) {
    this.load();
    if (this.datas[index] !== undefined && this.datas.length > index) {
        return this.datas[index];
    }
    return null;
};
/* remplacer l'objet (index/item) */
drivers.Database.prototype.replaceItem = function (index, item) {
    if (this.getItem(index) != null) {
        this.datas[index] = item;
        this.save();
        return index;
    } else if (typeof arguments[2] === undefined || !arguments[2]) {
        return false;
    } else {
        var idex = this.addItem(item);
        this.save();
        return idex;
    }
};
/* récupérer toutes les données de la base */
drivers.Database.prototype.getAll = function () {
    this.load();
    return this.datas;
};

/* création de conditions de recherche*/
drivers.Database.Conditions = function (type, data) {
    this.typed = type;
    this.data = data;
};
drivers.Database.Conditions.prototype = {
    getData: function () {
        return this.data;
    },
    getType: function () {
        return this.typed;
    },
    isCombiner: function () {
        return this.typed === drivers.Database.Conditions.type.AND || this.typed === drivers.Database.Conditions.type.OR;
    }

};

drivers.Database.Conditions.type = {
    AND: 220,
    OR: 221,
    LT: 222,
    GT: 223,
    SLT: 224,
    SGT: 225,
    EQ: 226,
    NEQ: 227
};
/* conditions combinatoires*/
drivers.Database.Conditions.AND = function (cdt1, cdt2) {
    return new drivers.Database.Conditions(this.type.AND, arguments);
};
drivers.Database.Conditions.OR = function (cdt1, cdt2) {
    return new drivers.Database.Conditions(this.type.OR, arguments);
};
/* conditions standard*/
drivers.Database.Conditions.LT = function (field, value) {
    var a = {field: field, value: value};
    return new drivers.Database.Conditions(this.type.LT, a);
};
drivers.Database.Conditions.GT = function (field, value) {
    var a = {field: field, value: value};
    return new drivers.Database.Conditions(this.type.GT, a);
};
drivers.Database.Conditions.SLT = function (field, value) {
    var a = {field: field, value: value};
    return new drivers.Database.Conditions(this.type.SLT, a);
};
drivers.Database.Conditions.SGT = function (field, value) {
    var a = {field: field, value: value};
    return new drivers.Database.Conditions(this.type.SGT, a);
};
drivers.Database.Conditions.EQ = function (field, value) {
    var a = {field: field, value: value};
    return new drivers.Database.Conditions(this.type.EQ, a);
};
drivers.Database.Conditions.NEQ = function (field, value) {
    var a = {field: field, value: value};
    return new drivers.Database.Conditions(this.type.NEQ, a);
};

/* rechercher par condition standard */
drivers.Database.prototype.atomicSearchItem = function (cdt) {
    ret = [];
    this.datas.forEach(function (a, b, c) {
        if (a != null) {
            switch (cdt.getType()) {
                case drivers.Database.Conditions.type.EQ:
                    if (a[cdt.getData().field] === cdt.getData().value){
                        ret.push(a);}
                    break;
                case drivers.Database.Conditions.type.NEQ:
                    if (a[cdt.getData().field] !== cdt.getData().value){
                            ret.push(a);}
                    break;
                case drivers.Database.Conditions.type.LT:
                    if (a[cdt.getData().field] <= cdt.getData().value){
                            ret.push(a);}
                    break;
                case drivers.Database.Conditions.type.GT:
                    if (a[cdt.getData().field] >= cdt.getData().value){
                            ret.push(a);}
                    break;
                case drivers.Database.Conditions.type.SLT:
                    if (a[cdt.getData().field] < cdt.getData().value){
                            ret.push(a);}
                    break;
                case drivers.Database.Conditions.type.SGT:
                    if (a[cdt.getData().field] > cdt.getData().value){
                            ret.push(a);}
                    break;
                default:
                    ret.push(a);

            }
        }
    });
    return ret;

};
/* recherche par conditions */
drivers.Database.prototype.searchItem = function (cdt) {
    var ret = [];
    var i = 1;
    if (cdt.isCombiner()) {
        switch (cdt.getType()) {
            case drivers.Database.Conditions.type.AND:
                ret = this.searchItem(cdt.getData()[0]);
                for (i = 1; i < cdt.getData().length; i++) {
                    ret = ret.intersect(this.searchItem(cdt.getData()[i]));
                }
                break;
            case drivers.Database.Conditions.type.OR:
                ret = this.searchItem(cdt.getData()[0]);
                for (i = 1; i < cdt.getData().length; i++) {
                    ret = ret.union(this.searchItem(cdt.getData()[i]));
                }
                break;
            default:
              ret = ret;
        }
        return ret;
    } else {
        return this.atomicSearchItem(cdt);
    }
};



drivers.DB = drivers.Database;
drivers.DBC = drivers.Database.Conditions;
var DBC = drivers.DBC;

/*exemple de database */
drivers.Database.sampleSearch = function () {
    var s = new drivers.DB("sample");
    s.addItem({prenom: "Henri", nom: "Larget", age: 22, sexe: "h"});
    s.addItem({prenom: "John", nom: "Doe", age: 23, sexe: "h"});
    s.addItem({prenom: "Diana", nom: "Miasgou", age: 21, sexe: "f"});
    s.addItem({prenom: "Bella", nom: "Gray", age: 17, sexe: "f"});
    s.addItem({prenom: "Steve", nom: "Gray", age: 15, sexe: "h"});
    s.addItem({prenom: "Edward", nom: "Alphone", age: 16, sexe: "h"});


    console.log(s.searchItem(DBC.EQ("prenom", "Pierre")));
    console.log(
            s.searchItem(
                    DBC.OR(
                            DBC.AND(
                                    DBC.EQ("sexe", "f"),
                                    DBC.GT("age", 18)
                                    ),
                            DBC.AND(
                                    DBC.EQ("sexe", "h"),
                                    DBC.GT("age", 16)
                                    )
                            )
                    )
            );
    console.log(s.searchItem(DBC.EQ("nom", "Gray")));

    s.destroy();
};
