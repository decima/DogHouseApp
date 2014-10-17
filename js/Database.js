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
drivers.Database.prototype.searchItem = function (searchParameters) {
    this.load();
    var ret = [];
    if (this.datas !== undefined & this.datas.length > 0) {

        var bk = false;
        var index;
        this.datas.forEach(function (a, b, c) {

            bk = 1;
            for (index in searchParameters) {
                var attr = searchParameters[index];
                if (a[index] === attr) {
                    bk *=1;
                } else if (a[index] !== attr) {
                    bk *=0;
                }

            }
            if (bk==1) {
                ret.push(a);
            }



        });



    }
    return ret;

};

drivers.Database.prototype.getAll = function () {
    this.load();
    return this.datas;
};
