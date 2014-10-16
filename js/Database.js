drivers.Database = function (tableName) {
    if (typeof (Storage) !== "undefined") {
        this.datas = [];
        this.tableName = tableName.toLowerCase();
        this.is_loaded = false;
    } else {
        throw "No Storage";
    }
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

drivers.Database.prototype.getAll = function () {
    this.load();
    return this.datas;
};
