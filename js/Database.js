/**
 * drivers.Database
 * @author H. Larget <henri@larget.fr>
 */
if (typeof (drivers) === "undefined") {
    var drivers = {};
}
if (typeof (Array.prototype.intersect) == "undefined") {
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
}
if (typeof (Array.prototype.union) == "undefined") {
    Array.prototype.union = function (arr2) {
        var temp = [];
        for (var i = 0; i < this.length; i++) {
            temp.push(this[i]);
        }
        for (var j = 0; j < arr2.length; j++) {
            var add = true;
            for (var k = 0; k < temp.length; k++) {
                if (temp[k] === arr2[j])
                    add = false;
            }
            if (add)
                temp.push(arr2[j]);
        }
        return temp;
    };
}
drivers.Database = function (tableName) {
    if (typeof (Storage) !== "undefined") {
        this.datas = [];
        this.tableName = tableName.toLowerCase();
        this.is_loaded = false;
    } else {
        throw new drivers.Database.NoStorageException();
    }
};
drivers.Database.NoStorageException = function () {
};
drivers.Database.NoStorageException.prototype.toString = function () {
    return "No Storage found";
};
drivers.Database.prototype.load = function () {
    this.datas = JSON.parse(window.localStorage.getItem(this.tableName));
    if (this.datas === null) {
        this.datas = [];
    }
    return this;
};

drivers.Database.prototype.save = function () {
    this.is_loaded = false;
    window.localStorage.setItem(this.tableName, JSON.stringify(this.datas));
    return this;
};

drivers.Database.prototype.destroy = function () {
    window.localStorage.removeItem(this.tableName);
    this.load();
    return this;
};

drivers.Database.prototype.addItem = function (e) {
    this.load();
    this.datas.push(e);
    this.save();
    return this.datas.length - 1;

};

drivers.Database.prototype.removeItem = function (index) {
    this.load();
    this.datas[index] = undefined;
    return this.save();
};
drivers.Database.prototype.getItem = function (index) {
    this.load();
    if (this.datas[index] !== undefined && this.datas.length > index) {
        return this.datas[index];
    }
    return null;
};
drivers.Database.prototype.replaceItem = function (index, item) {
    if (this.getItem(index) != null) {
        this.datas[index] = item;
        this.save();
        return index;
    } else if (typeof arguments[2] === undefined || arguments[2] === false) {
        return false;
    } else {
        var idex = this.addItem(item);
        this.save();
        return idex;
    }
};

drivers.Database.prototype.getAll = function () {
    this.load();
    return this.datas;
};


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

drivers.Database.Conditions.AND = function (cdt1, cdt2) {
    return new drivers.Database.Conditions(this.type.AND, arguments);
};
drivers.Database.Conditions.OR = function (cdt1, cdt2) {
    return new drivers.Database.Conditions(this.type.OR, arguments)
};
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

drivers.Database.prototype.atomicSearchItem = function (cdt) {
    var ret = [];
    this.datas.forEach(function (a, b, c) {
        switch (cdt.getType()) {
            case drivers.Database.Conditions.type.EQ:
                if (a[cdt.getData().field] === cdt.getData().value)
                    ret.push(a);
                break;
            case drivers.Database.Conditions.type.NEQ:
                if (a[cdt.getData().field] !== cdt.getData().value)
                    ret.push(a);
                break;
            case drivers.Database.Conditions.type.LT:
                if (a[cdt.getData().field] <= cdt.getData().value)
                    ret.push(a);
                break;
            case drivers.Database.Conditions.type.GT:
                if (a[cdt.getData().field] >= cdt.getData().value)
                    ret.push(a);
                break;
            case drivers.Database.Conditions.type.SLT:
                if (a[cdt.getData().field] < cdt.getData().value)
                    ret.push(a);
                break;
            case drivers.Database.Conditions.type.SGT:
                if (a[cdt.getData().field] > cdt.getData().value)
                    ret.push(a);
                break;
        }
    });
    return ret;

};

drivers.Database.prototype.searchItem = function (cdt) {
    var ret = [];
    if (cdt.isCombiner()) {
        switch (cdt.getType()) {
            case drivers.Database.Conditions.type.AND:
                ret = this.searchItem(cdt.getData()[0]);
                for (var i = 1; i < cdt.getData().length; i++) {
                    ret = ret.intersect(this.searchItem(cdt.getData()[i]));
                }
                break;
            case drivers.Database.Conditions.type.OR:
                ret = this.searchItem(cdt.getData()[0]);
                for (var i = 1; i < cdt.getData().length; i++) {
                    ret = ret.union(this.searchItem(cdt.getData()[i]));
                }
                break;
        }
        return ret;
    } else {
        return this.atomicSearchItem(cdt);
    }
};



drivers.DB = drivers.Database;
drivers.DBC = drivers.Database.Conditions;
var DBC = drivers.DBC;

drivers.Database.sampleSearch = function (output) {
    var s = new drivers.DB("sample");
    s.addItem({prenom: "Henri", nom: "Larget", age: 22, sexe: "h"});
    s.addItem({prenom: "John", nom: "Doe", age: 23, sexe: "h"});
    s.addItem({prenom: "Diana", nom: "Miasgou", age: 21, sexe: "f"});
    s.addItem({prenom: "Bella", nom: "Gray", age: 17, sexe: "f"});
    s.addItem({prenom: "Steve", nom: "Gray", age: 15, sexe: "h"});
    s.addItem({prenom: "Edward", nom: "Alphone", age: 16, sexe: "h"});

    if (arguments[0]) {
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
        console.log(s.searchItem(DBC.EQ("prenom", "Henri")));
    }
    s.destroy();
};