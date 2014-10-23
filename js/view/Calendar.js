/**
 * Created by Flo on 19/10/2014.
 */

if (typeof (view) === "undefined") {
    var view = {};
}

/**
 *
 * @param rdv Array of Creneau
 * @constructor
 */
view.Calendar = function (date) {
    var oThis = this;
    if (date != null) {
        oThis.date = date;
    }
    else {
        // on crée la date du jour
        var d = new Date();
        oThis.date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
};
view.Calendar.prototype = {
    getPreviousDate: function (date) {
        d = date.split("-");
        int_d = new Date(d[0], d[1]-1, d[2]);
        int_d.setDate(int_d.getDate() - 1);
        de = int_d;
        return de.getFullYear() + "-" + (de.getMonth()+1) + "-" + de.getDate();
    },
    getNextDate: function (date) {
        d = date.split("-");
        int_d = new Date(d[0], d[1]-1, d[2]);
        int_d.setDate(int_d.getDate() + 1);
        de = int_d;

        //de = new Date(int_d);
        return de.getFullYear() + "-" + (de.getMonth()+1) + "-" + de.getDate();


    },
    afficher: function (parent) {
        var parent_element = document.getElementById(parent);

        var cal = document.createElement("div");
        
        var tbl = "<center><a onclick='changePage(\"add-event/" +
                this.date +
                "\",\"subpage\")'><button>Ajouter un évenement</button></a><br/><a onclick='changePage(\"calendar/" +
                this.getPreviousDate(this.date) +
                "\",\"subpage\")'><button>< Jour précédent</button></a><a onclick='changePage(\"calendar/" +
                this.getNextDate(this.date) +
                "\",\"subpage\")'><button>Jour suivant ></button></a></center>";
        parent_element.innerHTML = tbl;
        parent_element.appendChild(cal);
        // On part chercher les données en base de données
        var db_cre = new drivers.DB("creneaux");
        creneaux = db_cre.searchItem(drivers.DBC.EQ("date", this.date));
        // On affiche le calendrier
        var calendrier = new view.Calendrier(creneaux, this.date);
        calendrier.afficher(parent);
        return true;
    }};