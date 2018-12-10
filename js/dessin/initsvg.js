
function initSVG() {
	var xmlns = "http://www.w3.org/2000/svg";
	
/*
<svg width="600" height="656" id="mainSVG">
	<title>Carte de l'île</title>
	<defs></defs>
	<g id="tiles"></g>
	<g id="ports"></g>
	<g id="road"></g>
	<g id="urban"></g>
	<g id="survol"></g>
</svg>
*/
	
	var svgElmt = document.createElementNS(xmlns, "svg");
	svgElmt.setAttributeNS (null, "width", 600);
	svgElmt.setAttributeNS (null, "height", 656);
	svgElmt.setAttributeNS (null, "id", "mainSVG");
	svgElmt.style.display = "block";
	
	var title = document.createElementNS(xmlns, "title");
	title.appendChild(document.createTextNode("Carte de l'île"));
	svgElmt.appendChild(title);
	
	var defs = document.createElementNS(xmlns, "defs");
	svgElmt.appendChild(defs);
	
	function newG(id, pere) {
		let g = document.createElementNS(xmlns, "g");
		pere.appendChild(g);
		g.setAttributeNS (null, "id", id);
		return g;
	}
	
	initTiles(newG("tiles", svgElmt));
	initPorts(newG("ports", svgElmt));
	newG("road", svgElmt);
	newG("urban", svgElmt);
	initSurvol(newG("survol", svgElmt));
	
	document.getElementById("dessins").appendChild(svgElmt);
	
	svgDoc = svgElmt;
	
}

function initTiles(g) {
	// g: groupe des tuiles
	var xmlns = "http://www.w3.org/2000/svg";
	var X = [-.5*rayon, .5*rayon, rayon, .5*rayon, -.5*rayon, -rayon],
		Y = [.5*r3, .5*r3, 0, -.5*r3, -.5*r3, 0];
	var pts = "";
	for (let k=0; k<5; k++)
		pts += X[k]+","+Y[k]+" ";
	pts += X[5]+","+Y[5];
	
	function newTile(hx, hy, g) {
		var x = (hy-hx)*1.5*rayon+origine.x, y = .5*r3*(hx+hy)+origine.y;
		
		var gr = document.createElementNS(xmlns, "g");
		gr.setAttributeNS (null, "id", "TILEx"+hx+"y"+hy);
		gr.setAttributeNS (null, "transform", "translate("+x+", "+y+")");
		
		var c = document.createElementNS(xmlns, "polygon");
		c.setAttributeNS (null, "class", "tile desert");
		c.setAttributeNS (null, "points", pts);
		gr.appendChild(c);
		
		c = document.createElementNS(xmlns, "circle");
		c.setAttributeNS (null, "cx", 0);
		c.setAttributeNS (null, "cy", 0);
		c.setAttributeNS (null, "r", 12);
		c.setAttributeNS (null, "class", "token blanc");
		gr.appendChild(c);
		
		c = document.createElementNS(xmlns, "text");
		c.setAttributeNS (null, "x", 0);
		c.setAttributeNS (null, "y", 1);
		c.setAttributeNS (null, "class", "num");
		c.appendChild(document.createTextNode("!"));
		gr.appendChild(c);
		
		g.appendChild(gr);
	}
	
	var my = [-2, -2, -2, -1, 0], My = [0, 1, 2, 2, 2];
	for (let i=0; i<5; i++) {
		let hx = i-2;
		for (let hy = my[i]; hy <= My[i]; hy++)
			newTile(hx, hy, g);
	}
}

function initPorts(g) {
	// g: groupe des ports
	var xmlns = "http://www.w3.org/2000/svg";
	var hX = [-3, -3, -2, 0, 2, 3, 3, 1, -1],
		hY = [-3, -1, 1, 3, 3, 2, 0, -2, -3],
		A = [0, 60, 60, 120, 180, 180, 240, 300, 300],
		href = imageDir+ressourceImage[5]; // 5: none.png
	
	function newPort(g, i, x, y, a) {
		var gr = document.createElementNS(xmlns, "g");
		gr.setAttributeNS (null, "id", "PORT"+i);
		gr.setAttributeNS (null, "transform", "translate("+x+", "+y+") rotate("+a+", 0, 0)");
		
		var c = document.createElementNS(xmlns, "line");
		c.setAttributeNS (null, "x1", 0);
		c.setAttributeNS (null, "y1", 0);
		c.setAttributeNS (null, "x2", -.5*rayon);
		c.setAttributeNS (null, "y2", .5*r3);
		c.setAttributeNS (null, "class", "lignePort");
		gr.appendChild(c);
		
		c = document.createElementNS(xmlns, "line");
		c.setAttributeNS (null, "x1", 0);
		c.setAttributeNS (null, "y1", 0);
		c.setAttributeNS (null, "x2", .5*rayon);
		c.setAttributeNS (null, "y2", .5*r3);
		c.setAttributeNS (null, "class", "lignePort");
		gr.appendChild(c);
		
		c = document.createElementNS(xmlns, "text");
		c.setAttributeNS (null, "x", -10);
		c.setAttributeNS (null, "y", 30);
		c.setAttributeNS (null, "class", "portTaux");
		c.appendChild(document.createTextNode("3:1"));
		gr.appendChild(c);
		
		c = document.createElementNS(xmlns, "circle");
		c.setAttributeNS (null, "cx", 0);
		c.setAttributeNS (null, "cy", 0);
		c.setAttributeNS (null, "r", 12);
		c.setAttributeNS (null, "class", "token blanc");
		gr.appendChild(c);
		
		c = document.createElementNS(xmlns, "image");
		c.setAttributeNS (null, "href", href);
		c.setAttributeNS (null, "x", -8);
		c.setAttributeNS (null, "y", -8);
		c.setAttributeNS (null, "height", "16px");
		c.setAttributeNS (null, "width", "16px");
		gr.appendChild(c);
		
		g.appendChild(gr);
		
	}
	
	for (let i=0; i<9; i++)
		newPort(g, i, (hY[i]-hX[i])*1.5*rayon+origine.x, (hX[i]+hY[i])*.5*r3+origine.y, A[i]);
	
}

function initSurvol(g) {
	// g: groupe des ports
	var xmlns = "http://www.w3.org/2000/svg",
		X = [-.5*rayon, .5*rayon, rayon, .5*rayon, -.5*rayon, -rayon],
		Y = [.5*r3, .5*r3, 0, -.5*r3, -.5*r3, 0],
		x = (-1)*1.5*rayon+origine.x, y = .5*r3*(-1)+origine.y;
	
	var pts = "";
	for (let k=0; k<5; k++)
		pts += X[k]+","+Y[k]+" ";
	pts += X[5]+","+Y[5];
	
	var p = document.createElementNS(xmlns, "polygon");
	p.setAttributeNS (null, "id", "SURVOLh");
	p.setAttributeNS (null, "class", "survol");
	p.setAttributeNS (null, "points", pts);
	p.setAttributeNS (null, "transform", "translate("+x+", "+y+")");
	p.style.display = "none";
	g.appendChild(p);
	
	// p = document.createElementNS(xmlns, "path");
	// p.setAttributeNS (null, "d", "M 10,150 Q 100,20 180,180 T 390,100");
	// <path d="M 10,150 Q 100,20 180,180 T 390,100"/>
	// g.appendChild(p);
}



