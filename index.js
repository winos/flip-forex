var bars = []
var volatility = 50

x =  (93-88);


function fillVol (x) {
	var vol = (x / 50)
	return (x * vol ) + x
}


function direction(x, alpha) {
	var w = 0

	if  (x.h > x.l)	
		w = x.vol / 75
	else 	
		w = x.vol / 60
	return w * alpha	
} 

function predict (x) {
	 var v = x.vol + 0.50;

	var high = 0; //x.h + v;
	var low = 0; //x.l - v;

	
	if (x.direction >= 0.07) {
		//console.log("x es bullish", x.direction);
		high = x.h + v;
		low = x.h - (v*(24/volatility)) 
	} 

	return {h: high, l: low, vol: v, index: (24/volatility)}
}

var barsReal = [
	{h: 0586, l: 0578, vol: 5, direction: 0.07},
	//{h: 0592, l: 0584, vol: 8.3, direction: 0.07},
	//{h: 0595, l: 0591}
] 

var x1 = barsReal[0]; //fillVol(barsReal[0].h - barsReal[0].l)

bars.push(x1)

var total = 0

for (var i=0; i <= 10; i++) {

	// var actual = barsReal[i]
	var last   = bars[bars.length - 1]

	var x = predict(last)
	total += x.vol
	//console.log("total: "+total)
	var alpha = total / bars.length
	//console.log("alpha: "+alpha)

	x.direction =  direction(x, alpha).toFixed(2)

	x.accumulated = total
	console.log("x"+i, x)
	bars.push(x)

}



function setup (index) {
	var selectedBar = bars[index]
	console.log("execute buy", selectedBar)
}

//console.log(bars);
//console.log(setup(8));
