
function generateMap() {
	
	function kiemeElement(T, k) {
		// k doit être entier naturel non nul
		for (var i = 0, l = T.length, s = k; i < l && s > 0; i++)
			s -= T[i];
		return i-1;
	}
	
	var innerTiles = [4, 3, 4, 4, 3, 1],
		innerX = [-2,-1, 0, 1, 2, 2, 2, 1, 0,-1,-2,-2,-1, 0, 1, 1, 0,-1, 0],
		innerY = [-2,-2,-2,-1, 0, 1, 2, 2, 2, 1, 0,-1,-1,-1, 0, 1, 1, 0, 0],
		nums = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11],
		portToken = [1, 1, 1, 1, 1, 4],
		portX  = [-3,-3,-3,-3,-2,-1, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0,-1,-2],
		portY  = [-3,-2,-1, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0,-1,-2,-3,-3,-3],
		angle1 = [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
		angle2 = [ 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 0, 0];
		// les angles sont à multiplier par 60.
	
	var m = {};
	for (let i = -3; i < 4; i++)
		m[i] = {};
	
	// terrains intérieurs
	for (let i = 0, j = 0; i < 19; i++) {
		// let k = Math.floor(Math.random() * (19-i)) +1; // nb tuile restantes = 19-i
		// fId comme fieldId
		let fId = kiemeElement(innerTiles, Math.floor(Math.random() * (19-i)) +1);
		innerTiles[fId]--;
		
		if (fId == 5) { // si c'est un désert
			m[innerX[i]][innerY[i]] = {fieldId: fId};
			m["thief"] = {x: innerX[i], y: innerY[i]};
		} else {
			m[innerX[i]][innerY[i]] = {fieldId: fId, tokenNb: nums[j]};
			j++;
		}
	}
	
	// terrains périphériques
	var k = Math.floor(Math.random() * 2);
	// ports
	for (let i = k; i < 18; i += 2) {
		let tId = kiemeElement(portToken, Math.floor(Math.random() * (9 - i*.5)) +1);
		portToken[tId]--;
		
		m[portX[i]][portY[i]] = {
			fieldId: 6,
			angle: (angle1[i] === angle2[i] || Math.random() < .5)
				? angle1[i]*60
				: angle2[i]*60,
			tokenId: tId
		};
	}
	// mers
	for (let i = 1 - k; i < 18; i += 2)
		m[portX[i]][portY[i]] = {fieldId: 7};
	
	return m;
}
