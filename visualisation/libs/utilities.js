var utilities = {
changeHueLight: function(color, hue, saturation, light) {
	var r = parseInt(color.substr(1,2), 16);
	var g = parseInt(color.substr(3,2), 16);
	var b = parseInt(color.substr(5,2), 16);
			
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if(max == min) {
		h = s = 0;
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	
	h = ((h*360 + hue)%360)/360;
	l = ((l*100 + light)%100)/100;
	
	if(s == 0) {
		r = g = b = l; // achromatic
	} else {
		function hue2rgb (p, q, t) {
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = Math.trunc(hue2rgb(p, q, h + 1/3)*255);
		g = Math.trunc(hue2rgb(p, q, h)*255);
		b = Math.trunc(hue2rgb(p, q, h - 1/3)*255);
	}
	console.log("before returninng #" +r+" "+g+" "+b);
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
},

colorGenerator: function(color, tree) {
	var c = 0,counter1=1;
	tree.children[0].children.forEach(function(node){
	c = c + 12;
	color[node.processId] = utilities.changeHueLight(color['general'], c, 100, 0);
	//color[node.processId] =colors[counter1++];
	console.log(node.processId+":"+color[node.processId]);
	});
	return color;
	}
}
