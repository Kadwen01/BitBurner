/** @param {NS} ns **/

export function refreshStocks(ns, stock) {
    return ns.stock.getSymbols().map((sym)=> {
        const position = ns.stock.getPosition(sym);
        const price = ns.stock.getPrice(sym);
        const shares = position[0];
        const avgBuyPrice = position[1];
        const prob = ns.stock.getForecast(sym);
        const remainingShares = ns.stock.getMaxShares(sym) - shares;
        return {
            sym,
            price,
            shares,
            avgBuyPrice,
            prob,
            remainingShares
        };
    }).sort(function (a, b) { return b.prob - a.prob });
}




export async function main(ns, stock) {

    	function getOwnedStocks() {
		const stockSymbols = ns.stock.getSymbols();
		const stocks = [];
		    for (const sym of stockSymbols) {
			    const pos = ns.stock.getPosition(sym);
			    const stock = {
				    sym,
				    longShares: pos[0],
				    shortShares: pos[2],
			};
			stocks.push(stock);
		}
		return stocks;
	    }

        const myStocks = getOwnedStocks().filter((stock) => stock.longShares > 0);
        ns.tprint(myStocks);
         
        for (const disp of myStocks ){
            
            const stockSym = myStocks(sym);
            const stockLS = myStocks(longShares);
            
        ns.tprint (`${stockSym}  ${stockLS}`);
        }
    //const allStocks = refreshStocks(ns);
    //const myStocks = allStocks.filter((stock) => stock.shares > 0).sort(function (a, b) { return a.prob - b.prob });
    //const cStocks = myStocks.filter(sym, shares);
    //ns.tprint (cStocks);





}