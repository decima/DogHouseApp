if (typeof (view) === "undefined") {
    var view = {};
}
view.Main = function () {

};
view.Main.prototype.afficher = function (parent) {
    var parent_element = document.getElementById(parent);
    var header = document.createElement("div");
    //document.style.background = "#2c3e50";
    header.setAttribute("id", "header");
    header.style.background = "#ecf0f1";
    header.style.width = "100%";
    header.style.height = "150px";
    if (DEBUG_MODE !== "undefined" && DEBUG_MODE) {
        
    }
    var title = document.createElement("h1");
    title.appendChild(document.createTextNode("DogHouse"));
    title.style.marginTop = "0px";
    header.appendChild(title);
    parent_element.appendChild(header);


};