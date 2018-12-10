
function initMap(m) {
	var my = [-2, -2, -2, -1, 0], My = [0, 1, 2, 2, 2];
	for (let i=0; i<5; i++) {
		let hx = i-2;
		for (let hy = my[i]; hy <= My[i]; hy++)
			setInnerTile(hx, hy, m[hx][hy]);
	}
	
	var portX = [-3,-3,-3,-3,-2,-1, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0,-1,-2],
		portY = [-3,-2,-1, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0,-1,-2,-3,-3,-3];
	var k = m[portX[0]][portY[0]].fieldId === 6 ? 0 : 1; // si c'est un port.
	for (let i = k; i < 18; i += 2)
		setPort(Math.floor(.5*i), portX[i], portY[i], m[portX[i]][portY[i]]);
	
}

function setInnerTile(hx, hy, tile) {
	var g = svgDoc.getElementById("TILEx"+hx+"y"+hy);
	var c = g.getElementsByTagName('circle')[0],
		t = g.getElementsByTagName('text')[0],
		p = g.getElementsByTagName('polygon')[0];
	
	if (tile.fieldId === 5) { // désert. fieldId est inférieur ou égal à 5.
		c.style.display = "none";
		t.style.display = "none";
		t.replaceChild(document.createTextNode("!"), t.firstChild);
	} else {
		c.style.display = "block";
		t.style.display = "block";
		t.replaceChild(document.createTextNode(tile.tokenNb), t.firstChild);
	}
	p.setAttributeNS(null, "class", "tile "+fieldClass[tile.fieldId]);
}

function setPort(portId, hx, hy, portTile) {
	// rezId entier compris entre 0 et 5
	
	var g = svgDoc.getElementById("PORT"+portId);
	var t = g.getElementsByTagName('text')[0],
		i = g.getElementsByTagName('image')[0],
		c = g.getElementsByTagName('circle')[0],
		x = (hy-hx)*1.5*rayon+origine.x, y = (hy+hx)*.5*r3+origine.y;
	
	t.replaceChild(document.createTextNode(portTile.tokenId === 5 ? "3:1" : "2:1"), t.firstChild);
	i.setAttributeNS(null, "href", imageDir+ressourceImage[portTile.tokenId]);
	c.setAttributeNS(null, "class", "token "+tokenClass[portTile.tokenId]);
	g.setAttributeNS(null, "transform", "translate("+x+", "+y+") rotate("+portTile.angle+", 0, 0)");
	 
}


