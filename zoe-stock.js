const reportName = "Stockmarket";
const transactionCost = 100000;
let controllers = [];
let allowedServers = [];
let manipulatorHackPercent = 0.02;
let manipulatorMaxScripts = 200;
 
/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("sleep");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerRequiredHackingLevel");
	ns.disableLog("getServerNumPortsRequired");
	ns.disableLog("exec");
	ns.clearLog();
	controllers = [];
	allowedServers = [];
	manipulatorHackPercent = 0.02;
	manipulatorMaxScripts = 200;
	let stocks = [];
	let hasAccess = ns.getPlayer().has4SDataTixApi;
	for (const stockName of ns.stock.getSymbols()) {
		let pos = ns.stock.getPosition(stockName);
		stocks.push({
			name: stockName,
			maxStocks: ns.stock.getMaxShares(stockName),
			price: ns.stock.getPrice(stockName),
			forecast: 0,
			volatility: 0,
			bought: pos[0] - pos[2],
			allowed: true,
			volatilityCounter: new VolatilityCounter(200),
			forecastEstimator: new ForecastEstimator(),
			buyPrice: 0,
			manipulationStarted: false,
			boughtThisCycle: false
		});
		let s = stocks[stocks.length - 1];
		s.forecast = getForecast(ns, s, hasAccess);
		s.volatility = getVolatility(ns, s, hasAccess);
	}
	await ns.sleep(1);
	const trustClock = ns.args.length > 0 && ns.args[0];
	let x = -1;
	if (trustClock) {
		let intervals = Math.floor(ns.getTimeSinceLastAug() / 6000);
		intervals %= 75;
		x = intervals;
	}
	while (true) {
		if (x === -1 || stocks[0].price !== ns.stock.getPrice(stocks[0].name)) {
			x++;
			hasAccess = ns.getPlayer().has4SDataTixApi;
			updateStocksEstimation(ns, stocks, hasAccess, x === 75);
			x %= 75;
			updateStocks(ns, stocks, hasAccess);
			await ns.sleep(1);
			if (x === 0) {
				ns.clearLog();
				listStocks(ns, stocks);
				console.log("Stockvalue: " + totalStockValue(ns, stocks));
				await ns.sleep(100);
			}
			sellStocks(ns, stocks);
			await ns.sleep(100);
			if (x <= 35) {
				buyStocks(ns, stocks, ns.getServerMoneyAvailable("home"));
			}
 
			if (ns.args.length > 1 && ns.args[1]) {
				//stockManipulation(ns, stocks);
			}
			//evaluateStockManipulation(ns, x, stocks);
			console.log(x);
		}
		await ns.sleep(100);
	}
}
 
function totalStockValue(ns, stocks) {
	return stocks.reduce((prev, cur) => {
		return cur.bought === 0 ? prev :
			prev + ns.stock.getSaleGain(cur.name, Math.abs(cur.bought),
				cur.bought > 0 ? "long" : "short");
	}, 0)
}
 
function getForecast(ns, stock, hasAccess) {
	if (hasAccess) {
		return ns.stock.getForecast(stock.name);
	}
	else {
		return stock.forecastEstimator.getEstimatedForecast();
	}
}
 
function getVolatility(ns, stock, hasAccess) {
	if (hasAccess) {
		return ns.stock.getVolatility(stock.name);
	}
	else {
		return stock.volatilityCounter.getAverage();
	}
}
 
function updateStocksEstimation(ns, stocks, hasAccess, flipped) {
	for (const s of stocks) {
		let prevPrice = s.price;
		let newPrice = ns.stock.getPrice(s.name)
		let vol = prevPrice > newPrice ? prevPrice / newPrice : newPrice / prevPrice;
		s.volatilityCounter.addElement((vol - 1) * 2);
		if (flipped) {
			s.forecastEstimator.possibleFlip();
			s.manipulationStarted = false;
			s.boughtThisCycle = false;
		}
		s.forecastEstimator.addForecast(newPrice > prevPrice);
		s.allowed = hasAccess || (s.volatilityCounter.isCertain() && s.forecastEstimator.isCertain());
		s.price = newPrice;
	}
}
 
function updateStocks(ns, stocks, hasAccess) {
	for (const s of stocks) {
		s.price = ns.stock.getPrice(s.name);
		s.forecast = getForecast(ns, s, hasAccess);
		s.volatility = getVolatility(ns, s, hasAccess);
		let pos = ns.stock.getPosition(s.name);
		s.bought = pos[0] - pos[2];
	}
}
 
function listStocks(ns, stocks) {
	for (const s of stocks) {
		if (s.bought === 0) {
			continue;
		}
		console.log("Has " + s.name);
		console.log("Forecast " + s.forecast)
		console.log("Bayes " + s.forecastEstimator.estimatedProbabilityFlipped);
	}
}
 
function sellStocks(ns, stocks) {
	for (const s of stocks) {
		if (!s.allowed || s.bought === 0) {
			continue;
		}
		if (s.bought > 0) {
			if (s.forecast >= 0.57) {
				continue;
			}
			sellStock(ns, s);
		}
		else {
			if (s.forecast <= 0.43) {
				continue;
			}
			sellStock(ns, s);
		}
	}
}
 
function sellStock(ns, s) {
	if (s.bought > 0) {
		ns.stock.sell(s.name, s.bought);
	}
	else {
		ns.stock.sellShort(s.name, Math.abs(s.bought));
	}
	s.bought = 0;
	s.buyPrice = 0;
	s.boughtThisCycle = false;
	console.log("Sold " + s.name);
	console.log("Bayes " + s.forecastEstimator.estimatedProbabilityFlipped);
}
 
function buyStocks(ns, stocks, spendableCash) {
	let initMoney = ns.getServerMoneyAvailable("home");
	stocks.sort((a, b) => stockRating(b) - stockRating(a));
	let stockMoney = totalStockValue(ns, stocks);
	let optimalStocks = optimalPortfolio(ns, stocks, spendableCash + stockMoney);
	for (const s of stocks) {
		if (!s.allowed) {
			continue;
		}
		if (!s.boughtThisCycle && s.bought !== 0 && !optimalStocks.includes(s.name)) {
			sellStock(ns, s);
		}
	}
	spendableCash += ns.getServerMoneyAvailable("home") - initMoney;
	let stockIndex = 0;
	let skippedStocks = 0;
	while (spendableCash > 100 * transactionCost && stockIndex < stocks.length) {
		let stock = stocks[stockIndex++];
		let maxBuyable = stock.maxStocks - Math.abs(stock.bought);
		if (!stock.allowed || skippedStocks >= 3) {
			skippedStocks++;
			continue;
		}
		if (maxBuyable <= 0) {
			continue;
		}
		if (stock.forecast > 0.6) {
			spendableCash -= transactionCost;
			let price = ns.stock.getAskPrice(stock.name);
			let buyAmount = Math.min(maxBuyable, Math.floor(spendableCash / price));
			if (buyAmount > 0) {
				ns.stock.buy(stock.name, buyAmount);
				stock.bought += buyAmount;
				spendableCash -= buyAmount * price;
				stock.buyPrice = price;
				stock.boughtThisCycle = true;
			}
			console.log("Bought " + stock.name);
			console.log("Forecast " + stock.forecast)
			console.log("Volatility " + stock.volatility)
			console.log("Bayes " + stock.forecastEstimator.estimatedProbabilityFlipped);
		}
		else if (stock.forecast < 0.4) {
			spendableCash -= transactionCost;
			let price = ns.stock.getBidPrice(stock.name);
			let buyAmount = Math.min(maxBuyable, Math.floor(spendableCash / price));
			if (buyAmount > 0) {
				ns.stock.short(stock.name, buyAmount);
				stock.bought -= buyAmount;
				spendableCash -= buyAmount * price;
				stock.buyPrice = price;
				stock.boughtThisCycle = true;
			}
			console.log("Bought " + stock.name);
			console.log("Forecast " + stock.forecast)
			console.log("Volatility " + stock.volatility)
			console.log("Bayes " + stock.forecastEstimator.estimatedProbabilityFlipped);
		}
	}
}
 
function optimalPortfolio(ns, stocks, spendableCash) {
	let optimalStocks = [];
	let stockIndex = 0;
	while (spendableCash > 100 * transactionCost && stockIndex < stocks.length) {
		let stock = stocks[stockIndex++];
		let maxBuyable = stock.maxStocks;
		if (!stock.allowed || maxBuyable <= 0) {
			continue;
		}
		if (stock.forecast > 0.6) {
			spendableCash -= transactionCost;
			let price = ns.stock.getAskPrice(stock.name);
			let buyAmount = Math.min(maxBuyable, Math.floor(spendableCash / price));
			if (buyAmount > 0) {
				optimalStocks.push(stock.name);
				spendableCash -= buyAmount * price;
			}
		}
		else if (stock.forecast < 0.4) {
			spendableCash -= transactionCost;
			let price = ns.stock.getBidPrice(stock.name);
			let buyAmount = Math.min(maxBuyable, Math.floor(spendableCash / price));
			if (buyAmount > 0) {
				optimalStocks.push(stock.name);
				spendableCash -= buyAmount * price;
			}
		}
	}
	return optimalStocks;
}
 
function stockRating(stock) {
	return stock.volatility * Math.pow(Math.abs(stock.forecast - 0.5), 1.25) *
		(stock.forecast > 0.5 ? 1.1 : 1) * (stock.bought >= 0 ? 1 : Math.min(1,
			stock.price / stock.buyPrice));
}
 
class VolatilityCounter {
	constructor(length) {
		this.length = length;
		this.elements = [];
		this.sum = 0;
	}
 
	addElement(element) {
		if (this.elements.length >= this.length) {
			this.sum -= this.elements.shift();
		}
		this.elements.push(element);
		this.sum += element;
	}
 
	isCertain() {
		return this.elements.length >= Math.min(50, this.length);
	}
 
	getAverage() {
		return this.elements.length > 0 ? this.sum / this.elements.length : 0;
	}
 
}
 
class ForecastEstimator {
	constructor() {
		this.forecasts = [];
		this.prevForecasts = [];
		this.prevAvgForecast = -1;
		this.estimatedProbabilityFlipped;
	}
 
	doBayesStuff(forecast) {
		if (this.prevAvgForecast !== -1) {
			let pRise = (1 - this.estimatedProbabilityFlipped) * this.prevAvgForecast +
				this.estimatedProbabilityFlipped * (1 - this.prevAvgForecast);
			if (forecast) {
				this.estimatedProbabilityFlipped = ((1 - this.prevAvgForecast) *
					this.estimatedProbabilityFlipped) / pRise;
			}
			else {
				this.estimatedProbabilityFlipped = (this.prevAvgForecast *
					this.estimatedProbabilityFlipped) / (1 - pRise);
			}
		}
	}
 
	addForecast(forecast) {
		this.forecasts.push(forecast);
		this.doBayesStuff(forecast);
	}
 
	possibleFlip() {
		this.estimatedProbabilityFlipped = 0.45;
		this.prevForecasts = this.forecasts;
		this.prevAvgForecast = this.prevForecasts.filter(Boolean).length
			/ this.prevForecasts.length;
		this.forecasts = [];
	}
 
	isCertain() {
		if (this.prevAvgForecast === -1) {
			return this.forecasts.length >= 40;
		}
		return this.estimatedProbabilityFlipped >= 0.95 ||
			this.estimatedProbabilityFlipped <= 0.05;
	}
 
	getEstimatedForecast() {
		return this.prevAvgForecast === -1 ? this.forecasts.filter(Boolean).length
			/ this.forecasts.length
			: this.calcCurrentForecast(this.estimatedProbabilityFlipped >= 0.5);
	}
 
	calcCurrentForecast(flip) {
		let prev = flip ? 1 - this.prevAvgForecast : this.prevAvgForecast;
		return (prev * this.prevForecasts.length + this.forecasts.filter(Boolean).length)
			/ (this.prevForecasts.length + this.forecasts.length);
	}
 
}
 
let stockServers = {
	"ECP": "ecorp",
	"FNS": "foodnstuff",
	"SGC": "sigma-cosmetics",
	"OMGA": "omega-net",
	"CTK": "computek",
	"NTLK": "netlink",
	"SYSC": "syscore",
	"CTYS": "catalyst",
	"LXO": "lexo-corp",
	"APHE": "alpha-ent",
	"RHOC": "rho-construction",
	"AERO": "aerocorp",
	"GPH": "global-pharm",
	"OMN": "omnia",
	"DCOMM": "defcomm",
	"SLRS": "solaris",
	"ICRS": "icarus",
	"UNV": "univ-energy",
	"NVMD": "nova-med",
	"TITN": "titan-labs",
	"MDYN": "microdyne",
	"STM": "stormtech",
	"JGN": "joesguns",
	"HLS": "helios",
	"VITA": "vitalife",
	"FLCM": "fulcrumtech",
	"FSIG": "4sigma",
	"KGI": "kuai-gong",
	"OMTK": "omnitek",
	"BLD": "blade",
	"CLRK": "clarkinc",
	"MGCP": "megacorp"
};