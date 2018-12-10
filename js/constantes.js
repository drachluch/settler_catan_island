
// utilisé par dessin. svgDoc prend une valeur après l'appel de initSVG.
var rayon = 50, r3 = 50*Math.sqrt(3), origine = {x: 300, y: 328}, svgDoc;


var ressourceName = ["bois", "argile", "laine", "blé", "minerai"];
var fieldName = ["forêt", "colline", "pâturage", "champ", "montagne", "désert", "port", "mer"];

var imageDir = "image/";
var ressourceImage = ["bois.png", "argile.png", "laine.png", "ble.png", "minerai.png", "none.png"];
var tokenClass = ["foret", "colline", "paturage", "champ", "montagne", "blanc"];
var fieldClass = ["foret", "colline", "paturage", "champ", "montagne", "desert"];