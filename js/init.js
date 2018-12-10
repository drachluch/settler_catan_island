
initSVG();
initMap(generateMap());


function addEvent(element, event, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } else {
        element.attachEvent("on" + event, func);
    }
}

addEvent(document, "keydown", function(e) {
	if (e.which == 32)
		initMap(generateMap());
});
